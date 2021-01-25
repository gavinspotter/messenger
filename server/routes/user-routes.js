const express = require("express")

const userController = require("../controllers/user-controller")

const checkAuth = require('../middleware/check-auth');

const router = express.Router()


router.post("/signup", userController.signup)

router.post("/login", userController.login)

router.use(checkAuth);

router.post("/email", userController.getUserByEmail)

router.get("/findemail/:uid", userController.getUserById)



module.exports = router

