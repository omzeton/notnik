import { Response, NextFunction, RequestHandler as Middleware } from "express";
import * as dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { WithUserIDRequest, APIError } from "../types";
dotenv.config();

declare const process: {
    env: {
        TOKEN_SECRET: string;
    };
};

const isAuth: any = (req: WithUserIDRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error: APIError = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken: string | JwtPayload;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error: APIError = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.userId = typeof decodedToken === "string" ? decodedToken : decodedToken.userId;
    next();
};

export default isAuth;
