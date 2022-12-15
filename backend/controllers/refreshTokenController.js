const jwt = require('jsonwebtoken');
const User = require("../models/user");

const handleRefreshToken = async (cookies) => {
    const refreshToken=cookies.jwt;

    const users = await User.findUserByRT(refreshToken);
    if (users.length === 0) {
        return null;
    }

    const result = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || users[0].email !== decoded.email){
                return null;
            }
            const accessToken = jwt.sign(
                { "email": decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            return { accessToken };
        }
    );
    return result.accessToken;
}

module.exports = { handleRefreshToken }