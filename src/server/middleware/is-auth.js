const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    console.log(res.cookies);
    // res.cookie("cookieForWicy", "28", {
    //     maxAge: 60 * 60 * 1000,
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: true,
    // });
    next();
};
