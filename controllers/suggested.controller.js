const userModel = require("../models/user.model");

exports.getSuggestedUser = async (req, res) => {
    const allUsers = await userModel.find().select("_id");
    const user = await userModel.findById(req.params.id).select("following");

    const temp = allUsers.map((v) => {
        if (!user.following.includes(v._id)) return v._id;
    });
    const pullUsers = temp.filter((v) => v).filter((v) => v !== req.params.id);
    const userIds = [...new Set(pullUsers)];
    const suggestedUser = await userModel
        .find({
            _id: { $in: [...userIds] },
        })
        .select("name.fullName profilePic following");
    return res.json({
        suggestedUser,
        success: true,
        message: "Suggested Users",
    });
};
