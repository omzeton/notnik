const express = require('express');
const router = express.Router();

const entriesController = require('../controllers/entries');

router.get('/get-all-entries', entriesController.getAllEntries);
router.get('/entry/:entryId', entriesController.getEntry);

module.exports = router;
