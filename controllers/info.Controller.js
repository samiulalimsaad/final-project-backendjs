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


exports.getSingleUserInfo = async (req, res) => {
    const user = await userModel
        .findById(req.params.id)
        .select("email gender name bio contact");
    return res.json({ user, success: true, message: "user Found" });
};


exports.updateUserInfo = async (req, res) => {
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
