const User = require('../models/user');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      user: User
  }
  next();
}
module.exports = {
  createModelsMiddleware
}