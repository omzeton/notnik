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

const addNewEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uId: string = res.locals.userId;
        const user = await User.findById(uId);
        if (!user) throw new Error("Could not connect to the user");

        user.entries.push({
            title: "New note",
            body: "New note",
            date: +new Date(),
        });
        user.save(err => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).json({ entries: user.entries });
        });
    } catch {
        next({ statusCode: 500, msg: "Error when creating new entry" });
    }
};

const syncEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uId: string = res.locals.userId;
        const user = await User.findById(uId);
        if (!user) throw new Error("Could not connect to the user");

        const updatedEntry = req.body.entry;

        await user.entries.map(entry => {
            if (entry._id!.toString() === updatedEntry._id) {
                entry.body = updatedEntry.body;
                entry.date = updatedEntry.date;
                entry.title = updatedEntry.title;
            }
            return entry;
        });

        user.save(err => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).json({ entries: user.entries });
        });
    } catch {
        next({ statusCode: 500, msg: "Error when updating entry" });
    }
};

export { getEntries, addNewEntry, syncEntry };
