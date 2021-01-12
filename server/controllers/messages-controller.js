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





    try {

        let find1
        let find2
        let find3
        find1 = await MessageBoard.findOne({ chat: chat[0] })
        find2 = await MessageBoard.findOne({ chat: chat[1] })
        find3 = await MessageBoard.findOne({ chat: chat[2] })

        if ((!find1 && !find2)
            || (!find1 && find2)
            || (find1 && !find2)
            || (!find1 && !find2 && !find3)
            || (find1 && !find2 && !find3)
            || (!find1 && !find2 && find3)
            || (!find1 && find2 && !find3)
            || (!find1 && find2 && find3)
            || (find1 && !find2 && find3)
            || (find1 && find2 && !find3)
        ) {
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
                user2.messageboards.push(createdMessageBoard)
            } catch (err) {

            }

            try {
                await user2.save()
            } catch (err) {

            }

            //

            let user3


            if (user3) {

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






        } else {
            const error = new HttpError("this is already a chat room", 500)
            return next(error)
        }


    } catch (err) {

    }



    res.status(201).json({ message: createdMessageBoard })


}

const createMessage = async (req, res, next) => {


    const {
        message,
        messageboard,
    } = req.body

    const createdMessage = new Message({
        message,
        messageboard
    })

    let user

    try {
        user = await MessageBoard.findById(messageboard)
    } catch (err) {
        const error = new HttpError(
            "not a message board",
            500
        )
        return next(error)
    }

    try {
        let find1
        let find2
        let find3
        find1 = await MessageBoard.findOne({ chat: chat[0] })
        find2 = await MessageBoard.findOne({ chat: chat[1] })
        find3 = await MessageBoard.findOne({ chat: chat[2] })



        if (find1 || find2 || find3) {
            try {
                await createdMessage.save()
            } catch (err) {

            }


        }

    } catch (err) {

    }









}



exports.createMessageBoard = createMessageBoard
exports.createMessage = createMessage