import { Router } from "express";
import { addPackage, deletePackageById, getAllPackages, getSinglePackageById, updateSinglePackageById } from "../controllers/packagesController";

const router = Router();

router.post("/add-package", addPackage);
router.get("/get-all-packages", getAllPackages);
router.get("/get-package/:id", getSinglePackageById);
router.put("/update-package/:id", updateSinglePackageById);
router.get("/delete-package/:id", deletePackageById);

export default router;