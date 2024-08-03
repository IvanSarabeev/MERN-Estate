import { AvailableProperties } from "@/types/listing";
import _clone from "lodash/clone";
import orderBy from "lodash/orderBy";
import _OrderBy from "lodash/orderBy";

type SortProps = {
    item: AvailableProperties[],
    options: string,
}

export const handlePropertySorting = ({item, options}: SortProps) => {
    const sortedItem = _clone(item);

    switch (options) {
        case "Type: sell" : {
            return orderBy(sortedItem, ['type'], ['asc']);
        }

        case "Type: rent" : {
            return orderBy(sortedItem, ['type'], ['desc']);
        }

        case "Price: lowest cost" : {
            return _OrderBy(sortedItem, ['regularPrice'], ['asc']);
        }

        case "Price: highest cost" : {
            return _OrderBy(sortedItem, ['regularPrice'], ['desc']);
        }

        default:
            return item;
    }
};