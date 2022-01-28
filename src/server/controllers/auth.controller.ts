import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import UserSchema from "../models/user.model";
import { accessCookie } from "../utils/cookie";
import { SignupRequestPayload, tRequest } from "../types";

const signup = async (req: tRequest<SignupRequestPayload>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const hashedPw = await bcrypt.hash(password, 12);
        const newUser = new UserSchema({ email: email, password: hashedPw, entries: [] });
        const result = await newUser.save();

        const token = jwt.sign({ email: result.email, userId: result._id.toString() }, process.env["TOKEN_SECRET"], {
            expiresIn: "1d",
        });
        res.status(201).json({ userId: result._id.toString(), token });
    } catch ({ statusCode, msg }) {
        next({ statusCode, msg });
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserSchema.findOne({ email: req.body.email });
        if (!user) throw new Error(`Couldn't find user ${req.body.email}`);

        const token = jwt.sign(
            {
                email: req.body.email,
                userId: user._id.toString(),
            },
            process.env["TOKEN_SECRET"],
            { expiresIn: "12h" }
        );
        if (!token) throw new Error("Retrieving token failed! Check env variables!");

        res.cookie("userAccessToken", token, accessCookie);
        res.status(200).json({ userId: user._id.toString() });
    } catch {
        next({ statusCode: 401, msg: "Invalid email or password" });
    }
};

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.cookies.userAccessToken) {
            res.status(200).json({ tokenIsValid: false });
            return;
        }
        const tokenExists = await jwt.verify(req.cookies.userAccessToken, process.env["TOKEN_SECRET"]);
        res.status(200).json({ tokenIsValid: !!tokenExists });
    } catch {
        next({ statusCode: 401, msg: "Unable to validate access token" });
    }
};

const logout = async (req: Request, res: Response) => {
    res.clearCookie("userAccessToken");
    res.status(200).send({ message: "Logged out" });
};

export { signup, login, logout, authenticate };
