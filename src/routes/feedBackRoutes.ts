import { Router } from "express";
import { addFeedBacks, deleteSingleFeedBackById, getAllFeedBacks, getSingleFeedBackById, updateSingleFeedBackById } from "../controllers/feedbacksController";


const router = Router();

router.post("/add-feed-back", addFeedBacks);
router.get("/get-all-feed-backs", getAllFeedBacks);
router.get("/get-feed-back/:id", getSingleFeedBackById);
router.put("/update-feed-back/:id", updateSingleFeedBackById);
router.get("/delete-feed-back/:id", deleteSingleFeedBackById);

export default router;