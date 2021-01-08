const HttpError = require("../models/HttpError")
const User = require("../models/user")

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


}

const login = async (req, res, next) => {

}




exports.signup = signup
exports.login = login