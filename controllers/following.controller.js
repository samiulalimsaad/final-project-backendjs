const userModel = require("../models/user.model");
const { sendError } = require("../utils/sendError");

exports.getAllFollowing = async (req, res) => {
    const followings = await userModel
        .findById(req.params.id)
        .select("following")
        .populate("following");
    return res.json({
        followings: followings.following,
        success: true,
        message: "All followings",
    });
};

const isFollowing = (res) => {
    return res.json({
        success: false,
        message: "Only Following Allow",
    });
};

exports.addFollowing = async (req, res) => {
    try {
        if (!req.params.followingId) isFollowing(res);
        const data = {
            following: [req.params.followingId],
        };
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "Following Added Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.removeFollowing = async (req, res) => {
    try {
        if (!req.params.followingId) isFollowing(res);
        const data = {
            following: [req.params.followingId],
        };
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $pullAll: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            user,
            success: true,
            message: "Following Removed Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
