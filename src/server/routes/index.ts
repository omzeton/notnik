import express from "express";

import journalRoutes from "./journal";
import authRoutes from "./auth";

const router = express.Router();

router.use("/journal", journalRoutes);
router.use("/auth", authRoutes);

export default router;
