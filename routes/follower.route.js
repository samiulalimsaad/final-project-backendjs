const { Router } = require("express");
const {
    getAllFollowers,
    addFollower,
    removeFollower,
} = require("../controllers/follower.controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const followerRoute = Router();

followerRoute.get("/:id", findUserMiddleware, getAllFollowers);

followerRoute.post("/:id/:followerId", findUserMiddleware, addFollower);

followerRoute.delete("/:id/:followerId", findUserMiddleware, removeFollower);

module.exports = followerRoute;
