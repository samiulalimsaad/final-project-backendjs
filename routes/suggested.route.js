const { Router } = require("express");
const { getSuggestedUser } = require("../controllers/suggested.controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const suggestedUserRoute = Router();

suggestedUserRoute.get("/:id", findUserMiddleware, getSuggestedUser);

module.exports = suggestedUserRoute;
