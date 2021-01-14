const express = require("express")

const messageController = require("../controllers/messages-controller")

const router = express.Router()



router.get("/messageboards/:uid", messageController.getMessageBoards)

router.get("/findmb/:mbid", messageController.getMessageBoardById)

router.post("/createMessage", messageController.createMessage)

router.post("/createmb", messageController.createMessageBoard)

router.get("/getmessages/:mid")

router.delete("/:mid")



module.exports = router
