import { Router } from 'express'
import { addHotel, deleteHotelById, getAllHotels, getSingleHotelById, updateSingleHotelById } from '../controllers/hotelsController';
const router = Router();

router.post('/add-hotel', addHotel);
router.get('/all-hotels', getAllHotels);
router.get('/find-hotel/:id', getSingleHotelById);
router.put('/update-hotel/:id', updateSingleHotelById);
router.get('/delete-hotel/:id', deleteHotelById);

export default router;