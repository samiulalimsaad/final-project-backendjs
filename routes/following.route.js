const { Router } = require("express");
const {
    getAllFollowing,
    addFollowing,
    removeFollowing,
} = require("../controllers/following.controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const followingRoute = Router();

followingRoute.get("/:id", findUserMiddleware, getAllFollowing);

followingRoute.post("/:id/:followingId", findUserMiddleware, addFollowing);

followingRoute.delete("/:id/:followingId", findUserMiddleware, removeFollowing);

module.exports = followingRoute;
