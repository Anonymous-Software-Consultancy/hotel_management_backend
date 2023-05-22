import { Router } from "express";
import { addFacilityGroup, deleteFacilityGroupById, getAllFacilityGroup, getFacilityGroupById, updateFacilityGroupById } from "../controllers/facilityGroupController";

const router = Router();

router.post("/add-facility-group", addFacilityGroup);
router.get("/get-all-facility-group", getAllFacilityGroup);
router.get("/get-facility-group/:id", getFacilityGroupById);
router.put("/update-facility-group/:id", updateFacilityGroupById);
router.get("/delete-facility-group/:id", deleteFacilityGroupById);

export default router;