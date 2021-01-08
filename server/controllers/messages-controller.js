const Message = require("../models/messages")

const HttpError = require("../models/HttpError")

const User = require("../models/user")


const createMessage = async (req, res, next) => {
    const { message, chat } = req.body

    const createAMessage = new Message({
        message,
        chat,
    })
}

exports.createMessage = createMessage