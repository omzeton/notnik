const express = require("express");
const { body } = require("express-validator");

const journalController = require("../controllers/journal");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/entries", isAuth, journalController.getEntries);
router.post(
    "/entry",
    [
        body("title")
            .trim()
            .isLength({ min: 1 }),
        body("body")
            .trim()
            .isLength({ min: 1 }),
        body("uId")
            .trim()
            .isLength({ min: 1 }),
    ],
    isAuth,
    journalController.createEntry
);
router.get("/entry/:entryId", isAuth, journalController.getEntry);
router.put(
    "/entry/:entryId",
    [
        body("title")
            .trim()
            .isLength({ min: 1 }),
        body("body")
            .trim()
            .isLength({ min: 1 }),
        body("uId")
            .trim()
            .isLength({ min: 1 }),
    ],
    isAuth,
    journalController.updateEntry
);
router.delete("/entry/:entryId", isAuth, journalController.deleteEntry);
router.post("/font-size", journalController.postFontSize);
router.post("/menu-position", journalController.postMenuPosition);

module.exports = router;
