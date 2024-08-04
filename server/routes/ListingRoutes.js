import express from "express";
import { 
    createListing, 
    deleteListing, 
    updateListing, 
    getListing,
    getListings,
    getListingById
} from "../controllers/ListingController.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get/:id', getListing);
router.get('/get', getListings);
router.post('/get-listing/:id', getListingById);
router.post('/available-listings', getListings);
router.post('/create', verifyToken, createListing);
router.post('/update/:id', verifyToken, updateListing);
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;