const { Router } = require("express");

const { getStory, findStoryMiddleware, createStory, deleteStory } = require("../controllers/story.controller");

const { findUserMiddleware } = require("../controllers/user.Controller");

const storyRoute = Router();

storyRoute.get("/:id", findUserMiddleware, getStory);

storyRoute.post("/:id", findUserMiddleware, createStory);

storyRoute.delete("/:id", findUserMiddleware, findStoryMiddleware, deleteStory);

module.exports = storyRoute;
