import express from "express"
import loginController from "../controllers/userControllers.js/loginController.js"
import registerController from "../controllers/userControllers.js/registerController.js"
import logoutController from "../controllers/userControllers.js/logoutController.js"
import getUserDetailsController from "../controllers/userControllers.js/getUserDetailsController.js"
import suggestPasswordController from "../controllers/userControllers.js/suggestPasswordController.js"

const router = express.Router()

router.route("/register").post(registerController)
router.route("/login").post(loginController)
router.route("/logout").get(logoutController)
router.route("/user-details").get(getUserDetailsController)
router.route("/suggest").get(suggestPasswordController)

export default router