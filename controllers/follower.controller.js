const userModel = require("../models/user.model");
const { sendError } = require("../utils/sendError");

exports.getAllFollowers = async (req, res) => {
    const followers = await userModel
        .findById(req.params.id)
        .select("follower").populate("follower");
    return res.json({
        followers: followers.follower,
        success: true,
        message: "All followers",
    });
};

const isFollower = (res) => {
    return res.json({
        success: false,
        message: "Only Follower Allow",
    });
};

exports.addFollower = async (req, res) => {
    try {
        if (!req.params.followerId) isFollower(res);
        const data = {
            follower: [req.params.followerId],
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
            message: "Follower Added Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.removeFollower = async (req, res) => {
    try {
        if (!req.params.followerId) isFollower(res);
        const data = {
            follower: [req.params.followerId],
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
            message: "Follower Removed Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
