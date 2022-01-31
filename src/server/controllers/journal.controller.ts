import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

import { AccessToken, Entry } from "../types";
import User from "../models/user.model";

const getEntries = async (req: Request, res: Response, next: NextFunction) => {
    const userID = res.locals["accessToken"].userID as string;

    const user = await User.findById(userID);
    if (!user) {
        const error = createHttpError(404, "Cannot find user by this id");
        next(error);
        return;
    }

    res.status(200).json({ entries: user.entries });
};

const addNewEntry = async (
    req: Request,
    res: Response<{ entries: Entry[] }, { accessToken: AccessToken }>,
    next: NextFunction
) => {
    try {
        const uId = res.locals.accessToken.userID;
        const user = await User.findById(uId);
        if (!user) throw new Error("Could not connect to the user");

        await user.entries.push({
            body: "<p>New note</p>",
            date: +new Date(),
        });
        user.save(err => {
            if (err) {
                console.log(JSON.stringify(err));
                return;
            }
            res.status(200).json({ entries: user.entries });
        });
    } catch (err) {
        next({ statusCode: 500, msg: "Error when creating new entry" });
        throw err;
    }
};

const syncEntry = async (
    req: Request,
    res: Response<{ entries: Entry[] }, { accessToken: AccessToken }>,
    next: NextFunction
) => {
    try {
        const uId = res.locals.accessToken.userID;
        const user = await User.findById(uId);
        if (!user) throw new Error("Could not connect to the user");

        const updatedEntry = req.body.entry;
        await user.entries.map(entry => {
            if (entry._id && entry._id.toString() === updatedEntry._id) {
                entry.body = updatedEntry.body;
            }
            return entry;
        });

        user.save(err => {
            if (err) {
                console.log(JSON.stringify(err));
                return;
            }
            res.status(200).json({ entries: user.entries });
        });
    } catch (err) {
        next({ statusCode: 500, msg: "Error when updating entry" });
        throw err;
    }
};

const deleteEntry = async (
    req: Request,
    res: Response<{ entries: Entry[] }, { accessToken: AccessToken }>,
    next: NextFunction
) => {
    try {
        if (!req.body.id) throw new Error("No ID was provided in payload!");
        const uId = res.locals.accessToken.userID;
        const user = await User.findById(uId);
        if (!user) throw new Error("Could not connect to the user");
        user.entries = user.entries.filter(entry => {
            if (entry._id) {
                return entry._id.toString() !== req.body.id;
            }
        });
        user.save(err => {
            if (err) {
                console.log(JSON.stringify(err));
                return;
            }
            res.status(200).json({ entries: user.entries });
        });
    } catch (err) {
        next({ statusCode: 500, msg: "Couldn't delete entry in database" });
        throw err;
    }
};

export { getEntries, addNewEntry, syncEntry, deleteEntry };
