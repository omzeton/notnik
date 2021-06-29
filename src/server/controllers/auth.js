const fs = require("fs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { thirtyDayCookie } = require("../utils/consts");

const signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.");
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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("A user with this email could not be found!");
            error.statusCode = 401;
            throw error;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            const error = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ email: user.email, userId: user._id.toString() }, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        res.cookie("userAccessToken", token, thirtyDayCookie);
        res.status(200).json({
            userId: user._id.toString(),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const deleteFile = filePath => {
    fs.unlink(filePath, err => {
        if (err) {
            throw err;
        }
    });
};

module.exports = {
    signup,
    login,
    deleteFile,
};
