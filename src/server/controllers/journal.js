const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const Entry = require("../models/entry");
const User = require("../models/user");
const getCurrentDate = require("../utils/date");

const getEntries = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation error - incorrect user id.");
        error.statusCode = 422;
        throw error;
    }
    Entry.find({ uId: req.userId })
        .then(entries => {
            res.status(200).json({
                message: "Entries fetched successfully!",
                entries: entries,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

const createEntry = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation error - felonious submission data.");
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

const getEntry = (req, res, next) => {
    const entryId = req.params.entryId;
    Entry.findById(entryId)
        .then(entry => {
            res.status(200).json({
                message: "Singular entry fetched successfully!",
                entry: entry,
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

const updateEntry = async (req, res, next) => {
    const errors = validationResult(req);
    let imageUrl;
    if (!errors.isEmpty()) {
        const error = new Error("Validation error - felonious submission data.");
        error.statusCode = 422;
        throw error;
    }
    try {
        if (req.file) {
            imageUrl = req.file.path.replace("\\", "/");
        }
        const title = req.body.title;
        const body = req.body.body;
        const date = req.body.date;
        const uId = req.body.uId;
        const entryId = req.params.entryId;
        const entry = await Entry.findById(entryId);
        if (imageUrl && entry.imgUrl !== imageUrl) {
            clearImage(entry.imgUrl);
        }
        entry.title = title;
        entry.body = body;
        entry.date = date;
        if (imageUrl) {
            entry.imgUrl = imageUrl;
        }
        entry.uId = uId;
        await entry.save();
        res.status(201).json({
            message: "Entry updated successfully!",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const deleteEntry = async (req, res, next) => {
    const entryId = req.params.entryId;
    try {
        const entry = await Entry.findById(entryId);
        const userId = entry.uId;
        const imgUrl = entry.imgUrl;
        await Entry.findByIdAndDelete(entryId);
        await User.findByIdAndUpdate({ _id: userId }, { $pullAll: { posts: [entryId] } });
        if (imgUrl !== "noimage") {
            clearImage(imgUrl);
        }
        res.status(201).json({
            message: "Entry successfully deleted!",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const clearImage = filePath => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, err => console.log(err));
};

module.exports = {
    getEntries,
    createEntry,
    getEntry,
    updateEntry,
    deleteEntry,
};
