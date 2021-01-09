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
        user = await User.findById(chat[0])
    } catch (err) {
        const error = new HttpError("couldnt find user(s)", 500)
        console.log(chat)
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

    // 

    let usr2

    try {
        usr2 = await User.findById(chat[1])
    } catch (err) {
        const error = new HttpError("couldnt find user(s)", 500)
        return next(error)
    }

    if (!usr2) {
        const error = new HttpError(
            "there are no users",
            404
        )
        return next(error)
    }


    try {
        usr2.messages.push(createAMessage)

    } catch (err) {

    }

    try {
        await usr2.save()
    } catch (err) {

    }

    //

    if (chat[2]) {

        let usr3
        try {
            usr3 = await User.findById(chat[2])
        } catch (err) {
            const error = new HttpError("couldnt find user(s)", 500)
            return next(error)
        }

        if (!usr3) {
            const error = new HttpError(
                "there are no users",
                404
            )
            return next(error)
        }



        try {
            usr3.messages.push(createAMessage)

        } catch (err) {

        }

        try {
            await usr3.save()
        } catch (err) {

        }
    }

    res.status(201).json({ message: createAMessage })


}

exports.createMessage = createMessage