const User = require("../models/user");
const Request = require("../models/request");
const Roommate = require("../models/roommate");
const Avatar = require("../models/avatar");

const createModels = async (req, res, next) => {
  req.models = {
    user: User,
    request: Request,
    roommate: Roommate,
    avatar: Avatar,
  };

  next();
};

module.exports = createModels;
