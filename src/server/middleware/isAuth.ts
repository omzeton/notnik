import { Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

declare const process: {
    env: {
        TOKEN_SECRET: string;
    };
};

export default (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error: any = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error: any = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};
