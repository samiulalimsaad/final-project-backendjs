const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        user: { type: Schema.Types.String, ref: "User" },
        body: String,
    },
    { timestamps: true }
);
const commentModel = model("Comment", commentSchema);

module.exports = commentModel;
