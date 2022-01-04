const { Schema, model } = require("mongoose");

const nameSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            default: "",
        },
        fullName: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

const addressSchema = new Schema(
    {
        city: String,
        street: String,
        state: String,
        country: String,
        zip: String,
    },
    { timestamps: true }
);

const contactSchema = new Schema(
    {
        tel: String,
        email: String,
        website: String,
        address: addressSchema,
    },
    { timestamps: true }
);
const storySchema = new Schema(
    {
        image: {
            type: String,
            trim: true,
            required: true,
        },
        user: { type: Schema.Types.String, ref: "User" },
        expired: String,
    },
    { timestamps: true }
);

const userSchema = new Schema(
    {
        _id: String,
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        active: Boolean,
        gender: {
            type: String,
            trim: true,
        },
        name: nameSchema,
        contact: contactSchema,
        post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
        bookmark: [{ type: Schema.Types.ObjectId, ref: "Post" }],
        story: [storySchema],
        assistant: String,
        message: [String],
        unreadMessage: [String],
        bio: {
            type: String,
            trim: true,
        },
        profilePic: {
            type: String,
            trim: true,
        },
        coverPic: {
            type: String,
            trim: true,
        },
        following: [{ type: Schema.Types.String, ref: "User" }],
        follower: [{ type: Schema.Types.String, ref: "User" }],
    },
    { timestamps: true, _id: false }
);

const userModel = model("User", userSchema);

module.exports = userModel;
