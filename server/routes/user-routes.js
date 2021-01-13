const express = require("express")

const userController = require("../controllers/user-controller")

const router = express.Router()

router.post("/email", userController.getUserByEmail)

router.get("/:uid", userController.getUserById)

router.post("/signup", userController.signup)

router.post("/login", userController.login)


module.exports = router

