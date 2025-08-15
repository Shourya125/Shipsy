import express from "express"
import loginController from "../controllers/userControllers.js/loginController.js"
import registerController from "../controllers/userControllers.js/registerController.js"
import logoutController from "../controllers/userControllers.js/logoutController.js"
import getUserDetailsController from "../controllers/userControllers.js/getUserDetailsController.js"

const router = express.Router()

router.route("/register").post(registerController)
router.route("/login").post(loginController)
router.route("/logout").get(logoutController)
router.route("/user-details").get(getUserDetailsController)

export default router