import { body } from "express-validator";
import user from "../models/user";

const bodyValidator = [
    body("title")
        .trim()
        .isLength({ min: 1 }),
    body("body")
        .trim()
        .isLength({ min: 1 }),
    body("uId")
        .trim()
        .isLength({ min: 1 }),
];

const signupValidator = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom((value, { req }) => {
            return user.findOne({ email: value }).then((userDoc: boolean) => {
                if (userDoc) {
                    return Promise.reject("E-Mail address already exists!");
                }
            });
        })
        .normalizeEmail(),
    body("password", "Password must be 5+ chars long.")
        .trim()
        .isLength({ min: 5 }),
    body("repeatPassword", "Password must be 5+ chars long.")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords don't match");
            }
            return true;
        }),
];

export { bodyValidator, signupValidator };
