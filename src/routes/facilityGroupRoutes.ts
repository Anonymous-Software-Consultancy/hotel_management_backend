import { Router } from "express";
import { addFacilityGroup, getFacilityGroupById } from "../controllers/facilityGroupController";

const router = Router();

router.post("/add-facility-group", addFacilityGroup);
router.get("/get-facility-group/:id", getFacilityGroupById);
// router.post("/update-facility-group/:id", updateFacilityGroupById);
// router.get("/delete-facility-group/:id", deleteFacilityGroupById);

export default router;