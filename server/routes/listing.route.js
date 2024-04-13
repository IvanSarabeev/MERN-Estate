import express from "express";
import { 
    createListing, 
    deleteListing, 
    updateListing, 
    getListing,
    getListings
} from "../controller/listing.controller.js";
import { verifyToken } from './../utils/verifyUser.js';

const router = express.Router();

router.get('/get/:id', getListing);
router.get('/get', getListings);
router.post('/create', verifyToken, createListing);
router.post('/update/:id', verifyToken, updateListing);
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;