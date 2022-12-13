const jwt = require("jsonwebtoken");
const User = require("../models/user");

const handleLogin = async (email, password) => {
  const user = await User.authenticateUser(email, password);
  if (user === null) {
    return user;
  }
  const users = await User.findUserByEmail(email);

  const accessToken = jwt.sign(
    { ...users[0], claims: ["user"] },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m'}
  );
  const refreshToken = jwt.sign(
    { ...users[0], claims: ["user"] },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '2d'}
  );
  //TODO save refreshToken to database
  
  return {accessToken, refreshToken};
};

module.exports = { handleLogin };
