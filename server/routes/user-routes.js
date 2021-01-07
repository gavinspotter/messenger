const express = require("express")

const userController = require("../controllers/user-controller")

const router = express.Router()

router.post("/signup", userController)

router.post("/login", userController)


module.exports = router

