import { Response, NextFunction, Request } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { APIError } from "../types";
dotenv.config();

const isAuth = async (req: Request, res: Response<never, { accessToken: string }>, next: NextFunction) => {
    try {
        if (!process.env["TOKEN_SECRET"]) {
            const error: APIError = new Error("Environment variable undefined.");
            error.statusCode = 401;
            throw error;
        }
        const accessToken = jwt.verify(req.cookies.userAccessToken, process.env["TOKEN_SECRET"]);
        if (!accessToken) {
            const error: APIError = new Error("User token expired or forged.");
            error.statusCode = 401;
            throw error;
        }
        if (typeof accessToken === "string") {
            res.locals.accessToken = accessToken;
        } else {
            res.locals.accessToken = accessToken["userId"];
        }
        next();
    } catch ({ statusCode, msg }) {
        next({ statusCode, msg });
    }
};

export default isAuth;
