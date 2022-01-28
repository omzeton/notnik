import express from "express";

import { register, login, logout, authenticate } from "../controllers/auth.controller";
import { registerValidator, loginValidator } from "../utils/validators";

const router = express.Router();

router.put("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/logout", logout);
router.get("/authenticate", authenticate);

export default router;
