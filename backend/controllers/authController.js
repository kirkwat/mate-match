const jwt = require("jsonwebtoken");
const User = require("../models/user");

const handleLogin = async (email, password) => {
  const user = await User.authenticateUser(email, password);
  if (!user) {
    return { accessToken: null, refreshToken: null };
  }
  const users = await User.findUserByEmail(email);

  const accessToken = jwt.sign(
    { email: users[0].email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { email: users[0].email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "2d" }
  );
  await User.createRefreshToken(email, refreshToken);

  return { accessToken, refreshToken };
};

module.exports = { handleLogin };
