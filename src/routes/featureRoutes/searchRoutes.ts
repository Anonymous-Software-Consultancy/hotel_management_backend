import { Router } from 'express';
import { searchByHotelName } from '../../controllers/featuresController';
const router = Router();

router.get('/search', searchByHotelName);

export default router;