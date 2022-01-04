const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const { sendError } = require("../utils/sendError");

exports.findUserMiddleware = async (req, res, next) => {
    const user = await userModel.findById(req.params.id);
    if (user) next();
    else
        return res.json({
            message: "User Not Found / Unauthenticated User",
            success: false,
        });
};

exports.getAllUser = async (_req, res) => {
    const users = await userModel
        .find()
        .populate(["post", "follower", "following"]);
    return res.json({ users, success: true, message: "All Users" });
};

exports.getSingleUser = async (req, res) => {
    const user = await userModel
        .findById(req.params.id)
        .populate("post follower following");
    return res.json({ user, success: true, message: "user Found" });
};

exports.getSingleUserPosts = async (req, res) => {
    const user = await userModel.findById(req.params.id).select("post");
    const postIds = [...new Set(user.post.map((v) => v._id))];
    const post = (
        await postModel
            .find({
                _id: { $in: [...postIds] },
            })
            .populate("user")
    ).reverse();
    return res.json({ post, success: true, message: "Post Found" });
};

exports.createUser = async (req, res) => {
    try {
        const data = req.body;
        const user = new userModel(data);
        await user.save((error, v) => {
            if (error) {
                console.error({ error });
                return res.json({ message: error.message, success: false });
            }
            return res.json({
                user: v,
                success: true,
                message: "User Created Successfully",
            });
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "User Updated Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        return res.json({
            user,
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
