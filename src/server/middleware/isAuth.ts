import { Response, NextFunction, Request } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { APIError } from "../types";
dotenv.config();

declare const process: {
    env: {
        TOKEN_SECRET: string;
    };
};

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userToken: any = jwt.verify(req.cookies.userAccessToken, process.env.TOKEN_SECRET);
        if (!userToken) {
            const error: APIError = new Error("User token invalid or expired.");
            error.statusCode = 401;
            error.msg = "User token invalid or expired.";
            throw error;
        }
        res.locals.userId = userToken.userId;
        next();
    } catch ({ statusCode, msg }) {
        next({ statusCode, msg });
    }
};

export default isAuth;
