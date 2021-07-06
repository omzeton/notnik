import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { APIError, EntryData } from "./../types";
import Entry from "../models/entry";
import User from "../models/user";
import getCurrentDate from "../utils/date";

const getEntries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uId: string = res.locals.userId;
        const entries = await Entry.find({ uId });
        if (!entries) throw new Error("Error when fetching entries.");
        res.status(200).json({ entries });
    } catch {
        next({ statusCode: 500, msg: "Error when fetching entries." });
    }
};

const syncEntries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uId: string = res.locals.userId;
        const user: typeof User = await User.findById(uId);
    } catch {
        next({ statusCode: 500, msg: "Error when syncing entries with user" });
    }
};

const createEntry = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error: APIError = new Error("Validation error - felonious submission data.");
        error.statusCode = 422;
        throw error;
    }
    let imgUrl = req.body.imgUrl;
    if (!req.file) {
        imgUrl = "noimage";
    } else {
        imgUrl = req.file.path.replace("\\", "/");
    }
    try {
        const title = req.body.title;
        const body = req.body.body;
        const date = getCurrentDate();
        const uId = req.body.uId;
        const entry = new Entry({
            title: title,
            body: body,
            date: date,
            imgUrl: imgUrl,
            uId: uId,
        });
        const newEntry = await entry.save();
        const user = await User.findById(uId);
        user.posts.push(entry);
        await user.save();
        res.status(201).json({
            message: "Entry created successfully!",
            entry: newEntry,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const getEntry = (req: Request, res: Response, next: NextFunction) => {
    const entryId = req.params.entryId;
    Entry.findById(entryId)
        .then((entry: EntryData) => {
            res.status(200).json({
                message: "Singular entry fetched successfully!",
                entry: entry,
            });
        })
        .catch((err: APIError) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

export { getEntries, syncEntries };
