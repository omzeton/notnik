const express = require("express");

const journalController = require("../controllers/journal");
const isAuth = require("../middleware/is-auth");
const { bodyValidator } = require("../utils/validators");

const router = express.Router();

router.get("/entries", isAuth, journalController.getEntries);
router.post("/entry", bodyValidator, isAuth, journalController.createEntry);
router.get("/entry/:entryId", isAuth, journalController.getEntry);
router.put("/entry/:entryId", bodyValidator, isAuth, journalController.updateEntry);
router.delete("/entry/:entryId", isAuth, journalController.deleteEntry);

module.exports = router;
