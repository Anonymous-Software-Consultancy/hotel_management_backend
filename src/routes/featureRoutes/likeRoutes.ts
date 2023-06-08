import { Router } from 'express';
import { getAllLikesByPackageId, getAllLikesByUserId, like, unLike } from '../../controllers/featuresController';

const router = Router();

router.post('/like', like);
router.get('/all-likes', getAllLikesByUserId);
router.get('/all-likedPackages', getAllLikesByPackageId);
router.delete('/unlike', unLike);
// router.get('/get-liked-user', getAllBookings);

export default router;