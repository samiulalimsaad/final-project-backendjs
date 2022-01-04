const { Router } = require("express");
const { getAllBookmarks, addBookmark, removeBookmark } = require("../controllers/bookmark.controller");
const {
    removeFollower,
} = require("../controllers/follower.controller");
const { findUserMiddleware } = require("../controllers/user.Controller");

const bookmarkRoute = Router();

bookmarkRoute.get("/:id", findUserMiddleware, getAllBookmarks);

bookmarkRoute.post("/:id/:bookmarkId", findUserMiddleware, addBookmark);

bookmarkRoute.delete("/:id/:bookmarkId", findUserMiddleware, removeBookmark);

module.exports = bookmarkRoute;
