const User = require('../models/user');
const Request = require('../models/request');
const Algorithm = require('../models/algorithm');
const Roommate = require('../models/roommate');
const createModelsMiddleware = async (req, res, next) => {
   req.models = {
      user: User,
      request: Request,
      algorithm: Algorithm,
      roommate: Roommate
  }

  next();
}
module.exports = {
  createModelsMiddleware
}