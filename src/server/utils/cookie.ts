const accessCookie = {
    maxAge: 60 * 60 * 1000 * 24 * 30,
    secure: process.env["NODE_ENV"] === "production",
    httpOnly: true,
    sameSite: true,
};

export { accessCookie };
