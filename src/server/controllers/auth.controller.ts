import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

import UserSchema from "../models/user.model";
import TokenSchema from "../models/token.model";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await UserSchema.findOne();
    if (!user) {
        const error = createHttpError(500, "Account already linked with this email already exists");
        next(error);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await new UserSchema({ email, password: hashedPassword, entries: [] }).save();

    res.status(201).json({ message: "User created successfully" });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) {
        const error = createHttpError(500, "No user with such email found");
        next(error);
        return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        const error = createHttpError(500, "Wrong password");
        next(error);
        return;
    }

    const userID = user._id.toString();

    const accessToken = jwt.sign({ userID }, <string>process.env["TOKEN_SECRET"], {
        expiresIn: "12h",
    });
    const refreshToken = jwt.sign({ userID }, <string>process.env["TOKEN_SECRET"], {
        expiresIn: "20d",
    });

    await new TokenSchema({ refreshToken, userID }).save();

    res.status(200).json({ accessToken, refreshToken });
};

const logout = async (req: Request, res: Response) => {
    res.locals["accessToken"] = "";
    res.status(200).send({ message: "User logged out successfully" });
};

export { register, login, logout };
