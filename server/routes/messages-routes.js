const express = require("express")

const messageController = require("../controllers/messages-controller")

const router = express.Router()

router.get("/user/:uid")

router.post("/createMessage", messageController.createMessage)

router.post("/createmb", messageController.createMessageBoard)

router.post("/getmessages")

router.delete("/:mid")



module.exports = router
