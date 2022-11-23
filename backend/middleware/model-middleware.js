const User = require('../models/user');
const Request = require('../models/request');
const Algorithm = require('../models/algorithm');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      user: User,
      request: Request,
      algorithm: Algorithm
  }
  next();
}
module.exports = {
  createModelsMiddleware
}