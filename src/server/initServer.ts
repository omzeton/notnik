import path from "path";
import express, { Router, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import { APIError } from "./types";

export default (router: Router) => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(helmet());
    app.use(compression());

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, Authorization");
        next();
    });

    app.use(express.static(path.join(__dirname, "../../dist/")));
    app.use("/api", router);
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../dist/index.html"));
    });

    app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
        const status = error.statusCode || 500;
        res.status(status).json({ message: error.msg });
    });

    return app;
};
