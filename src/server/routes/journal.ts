import express from "express";

import { getEntries, createEntry, getEntry, updateEntry, deleteEntry } from "../controllers/journal";
import isAuth from "../middleware/isAuth";
import { bodyValidator } from "../utils/validators";

const router = express.Router();

router.get("/entries", isAuth, getEntries as any);
router.post("/entry", bodyValidator, isAuth, createEntry);
router.get("/entry/:entryId", isAuth, getEntry);
router.put("/entry/:entryId", bodyValidator, isAuth, updateEntry);
router.delete("/entry/:entryId", isAuth, deleteEntry);

export default router;
