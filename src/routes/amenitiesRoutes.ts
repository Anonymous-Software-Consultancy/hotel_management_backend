import { Router } from 'express';
import { addAmenities, deleteSingleAmenitiesById, getAllAmenities, getSingleAmenitiesById, updateSingleAmenitiesById } from '../controllers/amenitiesController';

const router = Router();

router.post('/add-amenities', addAmenities);
router.get('/get-all-amenities', getAllAmenities);
router.get('/find-amenities/:id', getSingleAmenitiesById);
router.put('/update-amenities/:id', updateSingleAmenitiesById);
router.get('/delete-amenities/:id', deleteSingleAmenitiesById);

export default router;