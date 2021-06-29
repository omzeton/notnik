const express = require("express");

const journalRoutes = require("./journal");
const authRoutes = require("./auth");

const router = express.Router();

router.use("/journal", journalRoutes);
router.use("/auth", authRoutes);

module.exports = router;
