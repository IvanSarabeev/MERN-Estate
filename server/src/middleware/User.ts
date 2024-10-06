import express from 'express';
import { 
    updateUser, 
    deleteUser, 
    getUserListing, 
    getUser, 
} from  "controller/UserController";
import { verifyToken } from 'utils/AuthUserCookie';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListing);
router.get('/:id', verifyToken, getUser);

export default router;