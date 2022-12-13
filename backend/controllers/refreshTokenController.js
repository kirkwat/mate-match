const jwt = require('jsonwebtoken');
const User = require("../models/user");

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return null;
    }
    const refreshToken = cookies.jwt;

    //TODO find user using refresh token
    //const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    //TODO retun null if user is not found
    //if (!foundUser) return res.sendStatus(403); //Forbidden

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            //TODO change to emails
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            //TODO change to emails
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }