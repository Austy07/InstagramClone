const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require("validator");


const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: [true, "This username is already taken!"],
            lowercase: true,
        },
        name: {
            type: String,
            required: [true, 'Please add name ']
        },
        email: {
            type: String,
            required: true,
            unique: [true, "This email id is already in use."],
            validate: [(val) => validator.isEmail(val)],
        },
        photo: {
            type: String,
            default: "https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png",
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password should have at least 8 characters"],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: true,
            minLength: [8, "Password should have at least 8 characters."],
            validate: {
                validator: function (val) {
                    return this.password === val;
                },
                message: "Provided passwords must match. Please try again",
            },

        },
        passwordChangedAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        passwordResetToken: {
            type: String,
            select: false,
        },
        passwordResetValidity: {
            type: Date,
            select: false,
        },
        isActive: {
            type: Boolean,
            default: true
        },
        lastPostAt: {
            type: Date,
            default: 0,
        },
        lastSeenAt: {
            type: Date,
            default: 0,
        },

    },

    {
        timeStamp: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
);

//Indexing names and usernames
UserSchema.index({ name: 1, username: 1});

//Virtual property to store user followers
UserSchema.virtual("followers",{
    ref: "Follow",
    foreignField: "follows",
    localField: "_id"
})

UserSchema.virtual("follows", {
    ref: "Follows",
    foreignField: "user",
    localField: "_id"
})

UserSchema.virtual("posts", {
    ref: "Post",
    foreignField: "createdBy",
    localField: "_id",
})

UserSchema.virtual("followersCount", {
    ref: "Follow",
    foreignField: "follows",
    localField: "_id",
    count: true
})

UserSchema.virtual("followCount", {
    ref: "Follow",
    foreignField: "user",
    localField: "_id",
    count: true
})

UserSchema.virtual("postsCount", {
    ref: "Post",
    foreignField: "createdBy",
    localField: "_id",
    count: true
})

//Middleware to hash password before save
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();

    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
})

//Method to compare password
UserSchema.methods.comparePassword = async function (
    candidatePassword,
    hashedPassword
) {
    return await bcrypt.compare(candidatePassword, hashedPassword)

}

//Method to generate reset tokens
UserSchema.methods.generateResetToken = function () {
    const plainResetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(plainResetToken)
        .digest("hex")

    this.passwordResetValidity = new Date(Date.now() + 15 * 60 * 1000);
    return plainResetToken
}

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
