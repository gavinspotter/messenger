const express = require("express")

const messageController = require("../controllers/messages-controller")

const router = express.Router()

const checkAuth = require('../middleware/check-auth');

router.get("/messageboards/:uid", messageController.getMessageBoards)

router.use(checkAuth);



router.get("/findmb/:mbid", messageController.getMessageBoardById)

router.get("/findmessenger/:mid", messageController.getMessengerByMessageId)

router.get("/getuserbyemail/:ue", messageController.getUserIDByEmail)

router.post("/createMessage", messageController.createMessage)

router.post("/createmb", messageController.createMessageBoard)

router.get("/getmessages/:mid", messageController.getMessages)

router.delete("/:mid")



module.exports = router
