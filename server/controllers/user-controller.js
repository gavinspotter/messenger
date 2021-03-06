const HttpError = require("../models/HttpError")
const User = require("../models/user")


const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const getUserByEmail = async (req, res, next) => {
    const { email } = req.body

    let user

    try {
        user = await User.findOne({ email }, "id")
    } catch (err) {
        const error = new HttpError(
            "couldnt find email",
            500
        )
        return next(error)
    }

    res.status(201).json({ user: user.toObject({ getters: true }) })

}

const getUserById = async (req, res, next) => {

    const userId = req.params.uid

    let user

    try {
        user = await User.findById(userId, "email")
    } catch (err) {
        const error = new HttpError(
            "couldnt find user id",
            500
        )
    }

    res.status(201).json({ user })


}

const signup = async (req, res, next) => {

    const { name, email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError("couldnt find email", 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }


    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
        );
        return next(error);
    }


    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        messageboards: [],
        messages: []
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError("couldnt save to database", 500)
        return next(error)
    }

    let token;
    try {
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token })



}

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError("couldnt find email in our database", 500)
    }

    if (!existingUser) {
        const error = new HttpError(
            "wrong stuff",
            401
        )
        return next(error)
    }
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please check your credentials and try again.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let token;

    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            'supersecret_dont_share',
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    })

}


exports.getUserById = getUserById
exports.getUserByEmail = getUserByEmail
exports.signup = signup
exports.login = login