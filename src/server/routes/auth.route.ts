import express from "express";

import { register, login, logout } from "../controllers/auth.controller";
import { registerValidator, loginValidator } from "../utils/validators";

const router = express.Router();

router.put("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/logout", logout);

export default router;
