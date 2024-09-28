"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ListingController_1 = require("controller/ListingController");
const AuthUserCookie_1 = require("utils/AuthUserCookie");
const router = express_1.default.Router();
router.get('/get/:id', ListingController_1.getListing);
// router.get('/get', getListings);
router.post('/get-listing/:id', ListingController_1.getListingById);
router.post('/available-listings', ListingController_1.getListings);
router.post('/create', AuthUserCookie_1.verifyToken, ListingController_1.createListing);
router.post('/update/:id', AuthUserCookie_1.verifyToken, ListingController_1.updateListing);
router.delete('/delete/:id', AuthUserCookie_1.verifyToken, ListingController_1.deleteListing);
exports.default = router;
