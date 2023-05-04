import { Router } from 'express'
import { addHotel } from '../controllers/hotelsController';
const router = Router();

router.post('/add-hotel', addHotel);

export default router;