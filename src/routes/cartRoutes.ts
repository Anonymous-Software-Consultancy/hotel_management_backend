import { Router } from "express";



const router = Router();

router.post("/add-cart", addCart);
// router.get("/get-all-carts", getAllHotelImages);
// router.get("/get-cart/:id", getSingleHotelImageById);
// router.put("/update-cart/:id", updateSingleHotelImageById);
// router.get("/delete-cart/:id", deleteSingleHotelImageById);

export default router;