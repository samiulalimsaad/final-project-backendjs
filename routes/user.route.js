const { Router } = require("express");
const {
    getAllUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    findUserMiddleware,
    getSingleUserPosts,
} = require("../controllers/user.Controller");

const userRoute = Router();

userRoute.get("/all/:id", findUserMiddleware, getAllUser);

userRoute.get("/:id", findUserMiddleware, getSingleUser);

userRoute.get("/posts/:id", findUserMiddleware, getSingleUserPosts);

userRoute.post("/", createUser);

userRoute.put("/:id", findUserMiddleware, updateUser);

userRoute.delete("/:id", findUserMiddleware, deleteUser);

module.exports = userRoute;
