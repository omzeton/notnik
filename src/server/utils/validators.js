const { body } = require("express-validator");

const bodyValidator = [
    body("title")
        .trim()
        .isLength({ min: 1 }),
    body("body")
        .trim()
        .isLength({ min: 1 }),
    body("uId")
        .trim()
        .isLength({ min: 1 }),
];

const signupValidator = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject("E-Mail address already exists!");
                }
            });
        })
        .normalizeEmail(),
    body("password", "Password must be 5+ chars long.")
        .trim()
        .isLength({ min: 5 }),
    body("repeatPassword", "Password must be 5+ chars long.")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords don't match");
            }
            return true;
        }),
];

module.exports = {
    bodyValidator,
    signupValidator,
};
