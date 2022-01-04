const { Router } = require("express");
const { getActiveUser, setDeactive, setActive } = require("../controllers/activeUser.controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const activeUserRoute = Router();

activeUserRoute.get("/:id", findUserMiddleware, getActiveUser);

activeUserRoute.post("/:id", findUserMiddleware, setActive);

activeUserRoute.delete("/:id", findUserMiddleware, setDeactive);

module.exports = activeUserRoute;
