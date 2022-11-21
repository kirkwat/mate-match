const User = require('../models/user');
const Request = require('../models/request');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      user: User,
      request: Request
  }
  next();
}
module.exports = {
  createModelsMiddleware
}