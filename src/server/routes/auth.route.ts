import express from "express";
import { body } from "express-validator";

import { register, login, logout, token } from "../controllers/auth.controller";

const router = express.Router();

const loginValidator = [
    body("email")
        .isEmail()
        .normalizeEmail(),
    body("password")
        .trim()
        .isLength({ min: 5 }),
];

const registerValidator = [
    body("email", "Invalid email")
        .isEmail()
        .normalizeEmail(),
    body("password", "Password must be 5+ chars long.")
        .trim()
        .isLength({ min: 5 }),
];

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/refresh-token", token);
router.post("/logout", logout);

export default router;
