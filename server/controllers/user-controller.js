const HttpError = require("../models/HttpError")
const User = require("../models/user")

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

    const createdUser = new User({
        name,
        email,
        password,
        messages: []
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError("couldnt save to database", 500)
        return next(error)
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) })



}

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError("couldnt find email in our database", 500)
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            "wrong stuff",
            401
        )
        return next(error)
    }

    res.json({
        message: "logged in",
        user: existingUser.toObject({ getters: true })
    })

}



exports.getUserByEmail = getUserByEmail
exports.signup = signup
exports.login = login