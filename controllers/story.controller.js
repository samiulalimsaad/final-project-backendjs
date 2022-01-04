const moment = require("moment");
const userModel = require("../models/user.model");
const { sendError } = require("../utils/sendError");

exports.findStoryMiddleware = async (req, res, next) => {
    const story = await userModel.findById(req.params.id);
    if (story) next();
    else
        return res.json({
            message: "Story Not Found / Unauthenticated User",
            success: false,
        });
};

const isStory = (res) => {
    return res.json({
        success: false,
        message: "Only image Allow",
    });
};

exports.getStory = async (_req, res) => {
    const allStory = await userModel.find().select("story");
    const story = [];
    allStory.filter((v) =>
        v.story.filter((s) => {
            if (
                moment(s.expired, "MMMM Do YYYY, h:mm:ss a")
                    .endOf("day")
                    .fromNow()
                    .includes("in")
            ) {
                story.push({ id: v._id, ...s });
            }
        })
    );
    console.log({ story });
    return res.json({ story, success: true, message: "All Story" });
};

exports.createStory = async (req, res) => {
    try {
        if (!req.body.story) isStory(res);
        const expired = moment()
            .subtract(1, "days")
            .format("MMMM Do YYYY, h:mm:ss a");
        const data = {
            story: [{ image: req.body.story, expired, user: req.params.id }],
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
            story: user.story,
            success: true,
            message: "Story Added Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};

exports.deleteStory = async (req, res) => {
    try {
        const story = await userModel.findByIdAndDelete(req.params.id);
        return res.json({
            story,
            success: true,
            message: "Story Deleted Successfully",
        });
    } catch (error) {
        sendError(res, error);
    }
};
