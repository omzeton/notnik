import express from "express";

import { getEntries, addNewEntry } from "../controllers/journal";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.get("/entries", isAuth, getEntries);
router.post("/new", isAuth, addNewEntry);

export default router;
