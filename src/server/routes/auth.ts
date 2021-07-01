import express from "express";

import { signup, login, authenticate } from "../controllers/auth";
import { signupValidator, loginValidator } from "../utils/validators";

const router = express.Router();

router.put("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.get("/authenticate", authenticate);

export default router;
