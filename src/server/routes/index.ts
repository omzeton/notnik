import express from "express";

import authRoutes from "./auth";
import journalRoutes from "./journal";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/journal", journalRoutes);

export default router;
