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
    } catch (err) {
        next({ statusCode: 500, msg: "Error when fetching entries." });
        throw err;
    }
};

const addNewEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uId: string = res.locals.userId;
        const user = await User.findById(uId);
        if (!user) throw new Error("Could not connect to the user");

        await user.entries.push({
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
    } catch (err) {
        next({ statusCode: 500, msg: "Error when creating new entry" });
        throw err;
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
    } catch (err) {
        next({ statusCode: 500, msg: "Error when updating entry" });
        throw err;
    }
};

const deleteEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.id) throw new Error("No ID was provided for deleted entry");
        const uId: string = res.locals.userId;
        const user = await User.findById(uId);
        if (!user) throw new Error("Could not connect to the user");
        user.entries = user.entries.filter(entry => entry._id!.toString() !== req.body.id);
        user.save(err => {
            if (err) {
                console.log(err);
                return;
            }
            console.log({ entries: user.entries.length });
            res.status(200).json({ entries: user.entries });
        });
    } catch (err) {
        next({ statusCode: 500, msg: "Couldn't delete entry from database" });
        throw err;
    }
};

export { getEntries, addNewEntry, syncEntry, deleteEntry };
