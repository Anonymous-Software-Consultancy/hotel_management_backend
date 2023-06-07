import { Router } from 'express';
import { addBooking, deleteSingleBookingById, getAllBookings, getSingleBookingById } from '../controllers/bookedByUserController';

const router = Router();

router.post('/add-booking', addBooking);
router.get('/get-all-bookings', getAllBookings);
router.get('/find-booking/:id', getSingleBookingById);
router.get('/delete-booking/:id', deleteSingleBookingById);

export default router;