import express from "express";
import { 
    createListing, 
    deleteListing, 
    updateListing, 
    getListing 
} from "../controller/listing.controller.js";
import { verifyToken } from './../utils/verifyUser.js';

const router = express.Router();

router.get('/get/:id', getListing);
router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);

export default router;