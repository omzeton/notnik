import fs from "fs";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { thirtyDayCookie } from "../utils/consts";
import { APIError } from "../types";

declare const process: {
    env: {
        TOKEN_SECRET: string;
    };
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // express-validator validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: APIError = new Error("Validation failed.");
            error.statusCode = 422;
            error.msg = errors.array()[0].msg;
            throw error;
        }

        // If validation succeeded create new user
        const { email, password } = req.body;
        const hashedPw = await bcrypt.hash(password, 12);
        const newUser = new User({ email: email, password: hashedPw, posts: [] });
        const result = await newUser.save();

        // Create new session token with user id
        const token = jwt.sign({ email: result.email, userId: result._id.toString() }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        res.status(201).json({ userId: result._id.toString(), token });
    } catch ({ statusCode, msg }) {
        next({ statusCode, msg });
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // express-validator validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw new Error();

        // User validation was already done but check if user exists just in case
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error(`Couldn't find user ${email}`);

        // If validation passes create new
        const token = jwt.sign({ email, userId: user._id.toString() }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        res.cookie("userAccessToken", token, thirtyDayCookie);
        res.status(200).json({ userId: user._id.toString() });
    } catch {
        next({ statusCode: 401, msg: "Invalid email or password" });
    }
};

const deleteFile = (filePath: string) => {
    fs.unlink(filePath, err => {
        if (err) {
            throw err;
        }
    });
};

export { signup, login, deleteFile };
