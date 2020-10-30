const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: [true, "Please provide an image in post"],
        },
        caption: {
            type: String,
            maxlength: 400,
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        locationName: {
            type: String,
            default: "",
        },

        location: {
            type: {
                type: String,
                default: "Point",
            },
            coordinates: {
                type: [Number],
                default: [],
            }
        },

    },
    {
        timeStamp: true,
        toJSON: {virtual: true},
        toObject: { virtual: true }
    }
)

// Indexing the location coordinates
postSchema.index(
    { location: "2dsphere" },
    {
        sparse: true,
    }
);

//Virtaul property to get number of likes
postSchema.virtual("likers", {
    ref: "Like",
    foreignField: "post",
    localField: "_id"
})


postSchema.virtual("likes", {
    ref: "Like",
    foreignField: "post",
    localField: "_id",
})

postSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "post",
    localField: "_id"
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
