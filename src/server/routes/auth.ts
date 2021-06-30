import express from "express";

import { signup, login } from "../controllers/auth";
import { signupValidator, loginValidator } from "../utils/validators";

const router = express.Router();

router.put("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);

export default router;
