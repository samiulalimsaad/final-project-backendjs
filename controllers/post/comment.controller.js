const commentModel = require("../../models/comment.model");
const postModel = require("../../models/post.model");
const { sendError } = require("../../utils/sendError");

exports.getComments = async (req, res) => {
    const postComments = await postModel
        .findById(req.params.postId)
        .select("comments");
    const commentsIds = [...new Set(postComments.comments.map((v) => v._id))];
    const comment = await commentModel
        .find({
            _id: { $in: [...commentsIds] },
        })
        .populate("user");
    return res.json({
        comment,
        success: true,
        message: "Comment Found",
    });
};

exports.addComment = async (req, res) => {
    try {
        const data = req.body;
        data.user = req.params.id;
        const comment = new commentModel(data);
        await comment.save(async (error, v) => {
            if (error) {
                sendError(res, error);
            }
            const commentPost = await postModel.findById(req.params.postId);
            commentPost.comments.push(comment);
            await commentPost.save();
            return res.json({
                comment: v,
                commentPost,
                success: true,
                message: "Comment Created Successfully",
            });
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.removeComment = async (req, res) => {
    try {
        const comment = await commentModel.findByIdAndDelete(
            req.params.commentId
        );
        const data = {
            comments: [comment._id],
        };
        await postModel.findByIdAndUpdate(
            req.params.postId,
            {
                $pullAll: data,
            },
            {
                new: true,
            }
        );
        return res.json({
            comment,
            success: true,
            message: "Comment Deleted Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
