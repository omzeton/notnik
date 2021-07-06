import { Request, Response, NextFunction } from "express";
import User from "../models/user";

const getEntries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uId: string = res.locals.userId;
        const user = await User.findById(uId);
        if (!user) throw new Error("Could not connect to the user.");
        const entries = user.entries;
        if (!entries) throw new Error("Error when fetching entries.");
        res.status(200).json({ entries });
    } catch {
        next({ statusCode: 500, msg: "Error when fetching entries." });
    }
};

const syncEntries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uId: string = res.locals.userId;
        const user = await User.findById(uId);
    } catch {
        next({ statusCode: 500, msg: "Error when syncing entries with user" });
    }
};

export { getEntries, syncEntries };
