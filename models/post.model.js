const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        postBody: String,
        postImage: String,
        like: [{ type: Schema.Types.String, ref: "User" }],
        share: [{ type: Schema.Types.String, ref: "User" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        user: { type: Schema.Types.String, ref: "User" },
    },
    { timestamps: true }
);

const postModel = model("Post", postSchema);

module.exports = postModel;
