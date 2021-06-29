import fs from "fs";
import path from "path";
import express, { Router, Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator";
import multer, { FileFilterCallback } from "multer";
import { v4 } from "uuid";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import { APIError } from "./types";

export default (router: Router) => {
    const app = express();
    const isProduction = process.env.NODE_ENV === "production";
    const origin = { origin: isProduction ? false : "*" };

    const fileStorage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "images");
        },
        filename: function(req, file, cb) {
            cb(null, v4());
        },
    });

    const fileFilter = (req: Request, file: { mimetype: string }, cb: FileFilterCallback) => {
        const acceptFile = file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/gif" || file.mimetype === "image/jpeg";
        cb(null, acceptFile);
    };

    const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

    app.set("trust proxy", 1);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors(origin));
    app.use(helmet());
    app.use(compression());
    app.use(morgan("combined", { stream: accessLogStream }));
    app.use(multer({ storage: fileStorage, fileFilter }).single("imgUrl"));
    app.use("/images", express.static(path.join(__dirname, "images")));

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    });

    app.use(express.static(path.join(__dirname, "../../dist/")));
    app.use("/api", router);
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../dist/index.html"));
    });

    app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
        const newError: ValidationError | APIError = error.data ? error.data[0] : error;
        const status = 500;
        const message = newError.msg;
        res.status(status).json({ message: message });
    });

    return app;
};
