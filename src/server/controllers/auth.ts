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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: APIError = new Error("Validation failed.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { email, password } = req.body;
        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPw,
            posts: [],
        });
        const result = await user.save();
        const token = jwt.sign(
            {
                email: result.email,
                userId: result._id.toString(),
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        res.status(201).json({
            message: "New user created",
            userId: result._id.toString(),
            token: token,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            const error: APIError = new Error("A user with this email could not be found!");
            error.statusCode = 401;
            res.status(401).json({ errMessage: "Invalid email or password" });
            next(error);
            throw error;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            const error: APIError = new Error("Wrong password!");
            error.statusCode = 401;
            res.status(401).json({ errMessage: "Invalid email or password" });
            next(error);
            throw error;
        }

        const token = jwt.sign({ email: user.email, userId: user._id.toString() }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        res.cookie("userAccessToken", token, thirtyDayCookie);
        res.status(200).json({
            userId: user._id.toString(),
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
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
