const express = require("express")

const userController = require("../controllers/user-controller")

const router = express.Router()

router.post("/signup")

router.post("/login")


module.exports = router

