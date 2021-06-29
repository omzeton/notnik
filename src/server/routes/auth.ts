import express from "express";

import { signup, login } from "../controllers/auth";
import { signupValidator } from "../utils/validators";

const router = express.Router();

router.put("/signup", signupValidator, signup);
router.post("/login", login);

export default router;
