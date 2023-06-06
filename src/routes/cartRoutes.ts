import { Router } from "express";
import { addCart, deleteSingleCartById, getAllCarts, getSingleCartById } from "../controllers/cartController";



const router = Router();

router.post("/add-cart", addCart);
router.get("/get-all-carts", getAllCarts);
router.get("/get-cart/:id", getSingleCartById);
router.get("/delete-cart/:id", deleteSingleCartById);

export default router;