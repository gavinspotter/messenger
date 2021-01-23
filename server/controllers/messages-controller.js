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
        sender,
        chat
    } = req.body

    const createdMessage = new Message({
        message,
        messageboard,
        sender
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

    let theuser


    try {
        theuser = await User.findById(sender)
    } catch (err) {
        const error = new HttpError(
            "not a user",
            500
        )
        return next(error)
    }


    try {
        let find1
        let find2
        let find3
        try {
            find1 = await MessageBoard.findOne({ chat: chat[0] })
        } catch (err) {
            console.log(err)
        }

        try {
            find2 = await MessageBoard.findOne({ chat: chat[1] })
        } catch (err) {
            console.log(err)
        }



        try {
            find3 = await MessageBoard.findOne({ chat: chat[2] })
        } catch (err) {
            console.log(err)
        }



        if (find3) {
            try {
                await createdMessage.save()
            } catch (err) {
                console.log(err)
            }

            try {
                user.messages.push(createdMessage)
            } catch (err) {
                console.log(err)
            }

            try {
                await user.save()
            } catch (err) {
                console.log(err)
            }

            try {
                theuser.messages.push(createdMessage)
            } catch (err) {

            }

            try {
                await theuser.save()
            } catch (err) {

            }



        } else {

            if (find1 || find2) {




                try {
                    await createdMessage.save()
                } catch (err) {
                    console.log(err)
                }

                try {
                    user.messages.push(createdMessage)
                } catch (err) {
                    console.log(err)
                }

                try {
                    await user.save()
                } catch (err) {
                    console.log(err)
                }

                try {
                    theuser.messages.push(createdMessage)
                } catch (err) {

                }

                try {
                    await theuser.save()
                } catch (err) {

                }


            }
        }

    } catch (err) {
        const error = new HttpError(
            "couldnt find users",
            404
        )
        return next(error)
    }

    res.status(201).json({ message: createdMessage })

}

const getMessages = async (req, res, next) => {

    const mid = req.params.mid

    let message

    try {
        message = await Message.findById(mid)
    } catch (err) {
        const error = new HttpError(
            "couldnt find the message, sorry",
            500
        )
        return next(error)
    }

    if (!message || message.length === 0) {
        return next(new HttpError("no message found"))
    }

    res.json({ message })


}

const getMessageBoards = async (req, res, next) => {


    const userId = req.params.uid



    let messageboards

    try {
        messageboards = await MessageBoard.find({ chat: userId })

    } catch (err) {
        const error = new HttpError(
            "couldnt find message board by user id", 500
        )
        return next(error)
    }

    //messageboards.find(stuff => stuff === chatuser)

    if (!messageboards || messageboards.length === 0) {
        return next(new HttpError("no message board found"))
    }

    res.json({ messageboards })



}

const getMessageBoardById = async (req, res, next) => {

    const userId = req.params.mbid

    let messageboard

    try {
        messageboard = await MessageBoard.findById(userId)
    } catch (err) {
        const error = new HttpError(
            "couldnt find messageboard by id",
            500
        )
        return next(error)
    }

    if (!messageboard || messageboard.length === 0) {
        return next(new HttpError("no messageboard found"))
    }

    res.json({ messageboard })


}

const getUserById = async (req, res, next) => {
    const userId = req.params.uid

    let message


}


exports.getUserById = getUserById
exports.getMessageBoardById = getMessageBoardById
exports.getMessageBoards = getMessageBoards
exports.getMessages = getMessages
exports.createMessageBoard = createMessageBoard
exports.createMessage = createMessage