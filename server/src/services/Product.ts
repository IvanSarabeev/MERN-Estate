import xssFilters from "xss-filters"
import Listing from "models/Listing";

export const getProduct = async (id: string) => {
    const data = id;
    const sanitizedId = xssFilters.inHTMLData(data);

    try {
        if (!sanitizedId ) return { success: false, statusCode: 404, messegae: "Product Not Found!"};

        const product = await Listing.findById(sanitizedId);

        if (!product) return { success: false, statusCode: 404, message: "Product Not Found!"};

        return { success: true, statusCode: 200, data: product };
    } catch (error) {
        console.error(error);
        
        return { success: false, statusCode: 500, message: "Internal Server Error" };
    }
};