import { Router } from "express";
import { addRoom, deleteSingleRoomById, getAllRooms, getSingleRoomById, updateSingleRoomById } from "../controllers/roomController";


const router = Router();

router.post("/add-room", addRoom);
router.get("/get-all-rooms", getAllRooms);
router.get("/get-room/:id", getSingleRoomById);
router.put("/update-room/:id", updateSingleRoomById);
router.get("/delete-room/:id", deleteSingleRoomById);

export default router;