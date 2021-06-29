const isProduction = process.env.NODE_ENV === "production";
const thirtyDayCookie = {
    maxAge: 60 * 60 * 1000 * 24 * 30,
    secure: isProduction,
    httpOnly: true,
    sameSite: true,
};

module.exports = thirtyDayCookie;
