import express from "express"
import createShipmentController from "../controllers/shipmentControllers.js/createShipmentController.js"
import getShipmentsController from "../controllers/shipmentControllers.js/getShipments.js"

const router = express.Router()

router.route("/create-shipment").post(createShipmentController)
router.route("/shipments-list").get(getShipmentsController)


export default router