import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { Response, NextFunction, Request } from "express";

dotenv.config();

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        const error = createHttpError(401, "Incorrect authorization header");
        next(error);
        return;
    }

    const accessToken = authHeader.split(" ")[1];
    const tokenIsVerified = jwt.verify(accessToken, <string>process.env["TOKEN_SECRET"]);

    if (!tokenIsVerified) {
        const error = createHttpError(401, "Access token is incorrect or expired");
        next(error);
        return;
    }

    res.locals["accessToken"] = tokenIsVerified;

    next();
};

export default isAuth;
