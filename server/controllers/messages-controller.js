const Message = require("../models/messages")

const HttpError = require("../models/HttpError")

const User = require("../models/user")


const createMessage = async (req, res, next) => {
    const { message, chat } = req.body

    const createAMessage = new Message({
        message,
        chat,
    })

    let user

    try {
        user = await User.findById(chat)
    } catch (err) {
        const error = new HttpError("couldnt find user(s)", 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError(
            "there are no users",
            404
        )
        return next(error)
    }

    try {
        await createAMessage.save()
    } catch (err) {

    }

    try {
        user.messages.push(createAMessage)
    } catch (err) {

    }

    try {
        await user.save()
    } catch (err) {

    }



}

exports.createMessage = createMessage