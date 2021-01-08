const express = require("express")

const messageController = require("../controllers/messages-controller")

const router = express.Router()

router.get("/user/:uid")

router.post("/", messageController.createMessage)

router.delete("/:mid")



module.exports = router
