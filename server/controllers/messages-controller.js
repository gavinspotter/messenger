const Message = require("../models/messages")

const MessageBoard = require("../models/messageboards")

const HttpError = require("../models/HttpError")

const User = require("../models/user")


const createMessageBoard = async (req, res, next) => {

    const {
        chat
    } = req.body

    const createdMessageBoard = new MessageBoard({
        chat
    })

    let user1

    try {
        user1 = await User.findById(chat[0])
    } catch (err) {
        const error = new HttpError("couldnt find user", 500)
        return next(error)
    }

    if (!user1) {
        const error = new HttpError(
            "there are no users",
            404
        )
        return next(error)
    }

    try {
        await createdMessageBoard.save()
    } catch (err) {

    }



}

const createMessage = async (req, res, next) => {





}



exports.createMessageBoard = createMessageBoard
exports.createMessage = createMessage