import express from 'express';
import { 
    updateUser, 
    deleteUser, 
    getUserListing, 
    getUser, 
    smallUserDetails 
 } from  "../controllers/UserController.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListing);
router.get('/:id', verifyToken, getUser);
router.get('/get/user-details', smallUserDetails);

export default router;