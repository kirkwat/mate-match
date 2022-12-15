const User = require("../models/user");

const handleLogout = async (cookies) => {
    const refreshToken=cookies.jwt;

    const users = await User.findUserByRT(refreshToken);
    if (users.length === 0) return "invalid refreshtoken";

    await User.createRefreshToken(users[0].email, null);

    return "logged out";
}

module.exports = { handleLogout }