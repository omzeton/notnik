const fs = require("fs");
const path = require("path");

const express = require("express");
const multer = require("multer");
const { v4 } = require("uuid");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");

module.exports = router => {
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

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/gif" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
        }
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

    app.use((error, req, res, next) => {
        let newError;
        if (error.data) {
            newError = error.data[0];
        } else {
            newError = error;
        }
        const status = newError.statusCode || 500;
        const message = newError.msg;
        res.status(status).json({ message: message });
    });

    return app;
};
