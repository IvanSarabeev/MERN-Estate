"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = void 0;
const xss_filters_1 = __importDefault(require("xss-filters"));
const Listing_1 = __importDefault(require("models/Listing"));
const getProduct = async (id) => {
    const data = id;
    const sanitizedId = xss_filters_1.default.inHTMLData(data);
    try {
        if (!sanitizedId)
            return { success: false, statusCode: 404, messegae: "Product Not Found!" };
        const product = await Listing_1.default.findById(sanitizedId);
        if (!product)
            return { success: false, statusCode: 404, message: "Product Not Found!" };
        return { success: true, statusCode: 200, data: product };
    }
    catch (error) {
        console.error(error);
        return { success: false, statusCode: 500, message: "Internal Server Error" };
    }
};
exports.getProduct = getProduct;
