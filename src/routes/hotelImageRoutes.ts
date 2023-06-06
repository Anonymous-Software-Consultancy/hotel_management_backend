import { Router } from "express";
import { addHotelImage, deleteSingleHotelImageById, getAllHotelImages, getSingleHotelImageById, updateSingleHotelImageById } from "../controllers/hotelImagesController";



const router = Router();

router.post("/add-hotel-image", addHotelImage);
router.get("/get-all-hotel-images", getAllHotelImages);
router.get("/get-hotel-image/:id", getSingleHotelImageById);
router.put("/update-hotel-image/:id", updateSingleHotelImageById);
router.get("/delete-hotel-image/:id", deleteSingleHotelImageById);

export default router;