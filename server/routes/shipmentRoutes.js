import express from "express"
import createShipmentController from "../controllers/shipmentControllers.js/createShipmentController.js"
import getShipmentsController from "../controllers/shipmentControllers.js/getShipments.js"
import shipmentDetailController from "../controllers/shipmentControllers.js/shipmentDetailController.js"
import updateShipmentDetailController from "../controllers/shipmentControllers.js/updateShipmentDetailController.js"
import deleteShipmentController from "../controllers/shipmentControllers.js/deleteShipment.js"
import searchShipmentController from "../controllers/shipmentControllers.js/searchShipmentController.js"
import sortShipmentController from "../controllers/shipmentControllers.js/sortShipmentController.js"
import aiController from "../controllers/shipmentControllers.js/aiController.js"
import getSloganController from "../controllers/shipmentControllers.js/getSloganController.js"
import botController from "../controllers/shipmentControllers.js/botController.js"


const router = express.Router()

router.route("/create-shipment").post(createShipmentController)
router.route("/shipments-list").get(getShipmentsController)
router.route("/shipment-details/:sid").get(shipmentDetailController)
router.route("/update-shipment/:sid").put(updateShipmentDetailController)
router.route("/delete-shipment/:sid").delete(deleteShipmentController)
router.route("/search").post(searchShipmentController)
router.route("/sort").get(sortShipmentController)
router.route("/ai").post(aiController)
router.route("/slogan").get(getSloganController)
router.route("/bot").post(botController)


export default router