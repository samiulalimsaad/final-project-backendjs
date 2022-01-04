const { Router } = require("express");
const {
    addComment,
    removeComment,
    getComments,
} = require("../controllers/post/comment.controller");
const { addLike, removeLike } = require("../controllers/post/like.controller");
const {
    getAllPost,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    getPostMiddleware,
} = require("../controllers/post/post.controller");

const { findUserMiddleware } = require("../controllers/user.Controller");

const postRoute = Router();

postRoute.get("/all/:id", findUserMiddleware, getAllPost);
postRoute.get(
    "/:id/:postId",
    findUserMiddleware,
    getPostMiddleware,
    getSinglePost
);
postRoute.post("/:id", findUserMiddleware, createPost);
postRoute.put("/:id", findUserMiddleware, getPostMiddleware, updatePost);
postRoute.delete(
    "/:id/:postId",
    findUserMiddleware,
    getPostMiddleware,
    deletePost
);

postRoute.post("/like/:id", findUserMiddleware, getPostMiddleware, addLike);
postRoute.delete(
    "/like/:id/:postId",
    findUserMiddleware,
    getPostMiddleware,
    removeLike
);

postRoute.get("/comment/:id/:postId", findUserMiddleware, getComments);
postRoute.post("/comment/:id/:postId", findUserMiddleware, addComment);
postRoute.delete(
    "/comment/:id/:postId/:commentId",
    findUserMiddleware,
    getPostMiddleware,
    removeComment
);

module.exports = postRoute;
