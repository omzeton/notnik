const express = require("express");
const { body } = require("express-validator");

const journalController = require("../controllers/journal");
const isAuth = require("../middleware/is-auth");
const { bodyValidator } = require("../utils/validators");

const router = express.Router();

router.get("/entries", isAuth, journalController.getEntries);
router.post("/entry", bodyValidator, isAuth, journalController.createEntry);
router.get("/entry/:entryId", isAuth, journalController.getEntry);
router.put("/entry/:entryId", bodyValidator, isAuth, journalController.updateEntry);
router.delete("/entry/:entryId", isAuth, journalController.deleteEntry);
router.post("/font-size", journalController.postFontSize);
router.post("/menu-position", journalController.postMenuPosition);

module.exports = router;
