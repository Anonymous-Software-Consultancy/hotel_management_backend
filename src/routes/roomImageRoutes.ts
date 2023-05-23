import { Router } from "express";
import { addRoomImage, deleteSingleRoomImageById, getAllRoomImages, getSingleRoomImageById, updateSingleRoomImageById } from "../controllers/roomImagesController";



const router = Router();

router.post("/add-room-image", addRoomImage);
router.get("/get-all-room-images", getAllRoomImages);
router.get("/get-room-image/:id", getSingleRoomImageById);
router.put("/update-room-image/:id", updateSingleRoomImageById);
router.get("/delete-room-image/:id", deleteSingleRoomImageById);

export default router;