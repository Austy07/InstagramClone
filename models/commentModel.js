const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.ObjectId,
            ref: "Post",
            required: true,
        },
        body: {
            type: String,
            required: true,
        }
    }
)


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
