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
        user1.messageboards.push(createdMessageBoard)
    } catch (err) {

    }

    try {
        await user1.save()
    } catch (err) {

    }

    //

    let user2

    try {
        user2 = await User.findById(chat[1])
    } catch (err) {
        const error = new HttpError("couldnt find user", 500)
        return next(error)
    }


    try {
        await createdMessageBoard.save()
    } catch (err) {

    }

    try {
        user2.messageboards.push(createdMessageBoard)
    } catch (err) {

    }

    try {
        await user2.save()
    } catch (err) {

    }

    //

    let user3

    try {
        user3 = await User.findById(chat[2])
    } catch (err) {
        const error = new HttpError("couldnt find user", 500)
        return next(error)
    }


    try {
        user3.messageboards.push(createdMessageBoard)
    } catch (err) {

    }

    try {
        await user3.save()
    } catch (err) {

    }





}

const createMessage = async (req, res, next) => {





}



exports.createMessageBoard = createMessageBoard
exports.createMessage = createMessage