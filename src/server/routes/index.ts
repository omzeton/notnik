import express from "express";

import authRoutes from "./auth.route";
import journalRoutes from "./journal.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/journal", journalRoutes);

export default router;
