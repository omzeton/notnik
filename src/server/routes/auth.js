const express = require("express");

const authController = require("../controllers/auth");
const { signupValidator } = require("../utils/validators");

const router = express.Router();

router.put("/signup", signupValidator, authController.signup);
router.post("/login", authController.login);

module.exports = router;
