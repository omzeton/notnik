import express from "express";

import isAuth from "../middleware/isAuth";
import { getEntries, addNewEntry, syncEntry, deleteEntry } from "../controllers/journal.controller";

const router = express.Router();

router.get("/entries", isAuth, getEntries);
router.post("/new", isAuth, addNewEntry);
router.post("/sync", isAuth, syncEntry);
router.post("/remove-entry", isAuth, deleteEntry);

export default router;
