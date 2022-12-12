const jwt = require("jsonwebtoken");
//const accessTokenSecret = 'mysupercoolsecret';
const accessTokenSecret = process.env.WEB_TOKEN;
const authenticateJWT = (req, res, next) => {
 const authHeader = req.headers.authorization;
 if (!authHeader) {
   return res.sendStatus(401);
 }
 const token = authHeader.split(" ")[1];
 jwt.verify(token, accessTokenSecret, (err, user) => {
   if (err) {
     return res.sendStatus(403);
   }
   req.user = user;
   next();
 });
};
module.exports = authenticateJWT;