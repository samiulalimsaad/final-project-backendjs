const { Router } = require("express");
const {
    getSingleUserInfo,
    updateUserInfo,
} = require("../controllers/info.Controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const infoRoute = Router();

infoRoute.get("/:id", findUserMiddleware, getSingleUserInfo);

infoRoute.put("/:id", findUserMiddleware, updateUserInfo);

module.exports = infoRoute;
