// src/routes/vehicleRoutes.ts
import { Router } from "express";
import * as vehicleController from "./../controllers/vehicleController";

const router = Router();
router
  .route("/")
  .get(vehicleController.getVehicles)
  .post(vehicleController.addVehicle);
router.route("/:id").patch(vehicleController.updateVehicleStatus);

// router.get("/id", vehicleController.getVehicle);

export default router;
