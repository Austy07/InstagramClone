// Handles user and authentication functions
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTBiMzQzNzRkOThmMDE0Yzc2ZjUyYSIsImlhdCI6MTU5OTEyNDI5MSwiZXhwIjoxNjAxNzE2MjkxfQ.n7DjXQrWCVRpowoq8bIpalJw36h0wJYQWygvxpcLzwo
const {promisify} = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/sendEmails");


//Generate JWT
const generateJWT = (user, res) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    // Send cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
    });

    // Send response
    res.status(200).json({
        status: "success",
        data: {
            token,
            user,
        },
    });
};


// @desc      SIGNUP User
// @route     POST /api/v1/auth/register
// @access    Public

exports.signupUser = catchAsync(async (req, res, next) => {
    const {name, username, email, password, passwordConfirm} = req.body;

    // Create user
    const user = await User.create({
        username,
        name,
        email,
        password,
        passwordConfirm,
    });


    // Censor sensitive data
    user.password = undefined;
    user.passwordChangedAt = undefined;
    user.__v = undefined;

    sendEmail({
        to: email,
        subject: `Welcome to the ${process.env.APP_NAME} family!`,
        html:
            "We are so glad to have you here! Let's do some exciting things together.",
    });


    generateJWT(user, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.loginUser = catchAsync(async (req, res, next) => {
    const {username, password} = req.body;

    // if username and password exist in request
    if (!username || !password) {
        throw new AppError("Please provide username and password!", 400);
    }


    // Check for user
    const tempUser = await User.findOne({username}).select('+password');

    if (!tempUser) {
        throw new AppError("Invalid username and password ", 400)
    }

    // Check if password matches
    const isMatch = await tempUser.comparePassword(password, tempUser.password);

    if (!isMatch) {
        throw new AppError("Invalid uersname or password ")
    }
    //If user deactivated mark him as active again
    tempUser.isActive = true;
    await tempUser.save({
        validateBeforeSave: false,

    })

    tempUser.password = undefined;


    generateJWT(tempUser, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logoutUser = catchAsync(async (req, res, next) => {
    res.cookie('jwt', 'loggedOut', {
        httpOnly: true,
        expires: new Date(Date.now() + 100),
    });

    res.status(200).json({
        success: true,
        data: {}
    });
});

//Middleware protect Route
exports.protectRoute = catchAsync(async (req, res, next) => {
    let token = ''

    //Extract JWT from from request
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        //For Bearer token in API calls
        token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if (!token) {
        throw new AppError("Please Login to access", 401)
    }

    //Verify JWT
    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //Get user from payload user id
    const user = await User.findById(payload.id).select("+passwordChangedAt");

    if (!user || !user.isActive) {
        throw new AppError("this user no longer exist. Please login again", 400)
    }

    //If user changed password after JWT issue
    const passwordChangedAt = Math.floor(
        new Date(user.passwordChangedAt).getTime() / 100
    )

    if (passwordChangedAt > payload.iat) {
        throw new AppError(" You password was changed recently. Please Login again ")
    }

    //Authenticate User
    req.user = user;
    next();


})

/*
*
* password reset and forgot
*
* */

exports.generateResetToken = catchAsync(async (req, res) => {
    const {email} = req.body;

    //If no email in request
    if (!email) {
        throw new AppError("Please provide a registered email id ", 400);
    }

    const foundUser = await User.findOne({email}).select("+passwordResetToken");

    //If email not registered for a user
    if (!foundUser) {
        throw new AppError("No existing user found with this email id. PLease signup if you are new ", 400)
    }

    //Get reset token

    const resetToken = foundUser.generateResetToken();
    foundUser.save({validateBeforeSave: false});


    //Generate email for reset
    const fullUrl = req.protocol + "://" + req.get("host");
    const resetEmailHtml = `We have received a password reset request from this email id. Please use this link to provide a new password. 
	<br> <a target="_blank" href="${fullUrl}/api/v1/users/resetPassword/${resetToken}">Reset Password</a>`;

    sendEmail({
        to: `${foundUser.email}`,
        subject: "Password reset request (expires in 15 minutes)",
        html: resetEmailHtml,
    });

    res.status(200).json({
        status: "success",
        message: `An email with password reset instructions has been sent to ${foundUser.email}`,
    });

})

exports.resetPassword = catchAsync(async (req, res) => {
    const token = req.params.token;

    const hashedToken = crypto.createHash("sha256").update(token).digest('hex');

    //Find user with same and unexpired token
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetValidity: {$gte: Date.now()},

    });

    if (!user) {
        throw new AppError(
            "This token is not valid  or has expired. Please try again ",
            401
        )
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordChangedAt = Date.now();

    user.passwordResetToken = undefined
    user.passwordResetValidity = undefined

    await user.save();


    user.password = undefined;
    user.passwordChangedAt = undefined;
    generateJWT(user, res);
});


exports.isLoggedIn = catchAsync(async (req, res, next) => {
    let token = "";

    //Extract JWT from request

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        //For bearer token
        token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies.jwt) {
        //For web cookies
        token = req.cookies.jwt;
    }

    if (!token || token === "loggedOut") {
        return res.status(401).json({
            status: "failure"
        })
    }

    //Verify JWT

    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //Get user from payload user id
    const user = await User.findById(payload.id).select("+passwordChangedAt");

    if (!user || !user.isActive) {
        return res.status(401).json({
            status: "failure",
        })
    }

    const passwordChangedAt = Math.floor(
        new Date(user.passwordChangedAt).getTime() / 1000
    )

    if (passwordChangedAt > payload.iat) {
        return res.status(401).json({
            status: "faiure",
        })

    }

    //Authenticate User
    return res.status(200).json({
        data: {
            user,
        }

    })
});




