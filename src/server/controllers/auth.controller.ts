import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import UserSchema from "../models/user.model";
import TokenSchema from "../models/token.model";
import { RegisterPayload, tRequest } from "@server/types";

const register = async (req: tRequest<RegisterPayload>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await new UserSchema({ email, password: hashedPassword, entries: [] }).save();
        res.status(201).json({ userId: newUser._id.toString() });
    } catch ({ statusCode, msg }) {
        next({ statusCode, msg });
    }
};

const logout = async (req: Request, res: Response) => {
    res.status(200).send({ message: "Logged out" });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const user = await UserSchema.findOne({ email });
        const accessToken = jwt.sign({ email }, process.env["TOKEN_SECRET"] as string, {
            expiresIn: "12h",
        });
        const refreshToken = jwt.sign({ email }, process.env["TOKEN_SECRET"] as string, {
            expiresIn: "20d",
        });
        await new TokenSchema({ tokenID: refreshToken, userID: user?._id.toString() }).save();
        res.status(200).json({ accessToken, refreshToken });
    } catch {
        next({ statusCode: 401, msg: "Invalid email or password" });
    }
};

const token = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.header("x-auth-token");

        if (!refreshToken) {
            throw new Error("Refresh token not found");
        }

        const dbRefreshToken = await TokenSchema.findOne({ tokenID: refreshToken });

        if (!dbRefreshToken) {
            throw new Error("Token not found in database");
        }

        const accessToken = jwt.sign(
            { userId: dbRefreshToken.userID.toString() },
            process.env["TOKEN_SECRET"] as string,
            { expiresIn: "13500" }
        );

        res.status(200).json({ accessToken });
    } catch {
        next({ statusCode: 401, msg: "Can't renew refresh token" });
    }
};

export { register, login, logout, token };
