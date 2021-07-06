import express from "express";

import { getEntries, syncEntries } from "../controllers/journal";
import isAuth from "../middleware/isAuth";
import { bodyValidator } from "../utils/validators";

const router = express.Router();

router.get("/entries", isAuth, getEntries);
router.post("/entries", bodyValidator, isAuth, syncEntries);

export default router;
