import { Router } from 'express';
import { addAddress, deleteSingleAddressById, getAllAddresses, getSingleAddressById, updateSingleAddressById } from '../controllers/addressController';

const router = Router();

router.post('/add-address', addAddress);
router.get('/get-all-addresses', getAllAddresses);
router.get('/find-address/:id', getSingleAddressById);
router.put('/update-address/:id', updateSingleAddressById);
router.get('/delete-address/:id', deleteSingleAddressById);

export default router;