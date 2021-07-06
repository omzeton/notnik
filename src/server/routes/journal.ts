import express from "express";

import { getEntries, addNewEntry, syncEntry } from "../controllers/journal";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.get("/entries", isAuth, getEntries);
router.post("/new", isAuth, addNewEntry);
router.post("/sync", isAuth, syncEntry);

export default router;
