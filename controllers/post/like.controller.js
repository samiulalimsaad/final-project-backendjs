const postModel = require("../../models/post.model");
const { sendError } = require("../../utils/sendError");

exports.getAllLikes = async (req, res) => {
    const likes = await postModel
        .findById(req.body.postId)
        .select("like")
        .populate("like")
    return res.json({
        likes: likes,
        success: true,
        message: "All likes",
    });
};

const isLike = (res) => {
    return res.json({
        success: false,
        message: "Only like Allow",
    });
};

exports.addLike = async (req, res) => {
    try {
        if (!req.body.like) isLike(res);
        const data = {
            like: [req.body.like],
        };
        const post = await postModel.findByIdAndUpdate(
            req.body.postId,
            {
                $push: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            post,
            success: true,
            message: "like Added Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.removeLike = async (req, res) => {
    try {
        if (!req.params.id) isLike(res);
        const data = {
            like: [req.params.id],
        };
        const post = await postModel.findByIdAndUpdate(
            req.params.postId,
            {
                $pullAll: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            post,
            success: true,
            message: "like Removed Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
