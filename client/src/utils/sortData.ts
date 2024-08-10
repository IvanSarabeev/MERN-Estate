import _clone from "lodash/clone";
import orderBy from "lodash/orderBy";
import { AvailableProperties } from "types/listing";

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
            return orderBy(sortedItem, ['regularPrice'], ['asc']);
        }

        case "Price: highest cost" : {
            return orderBy(sortedItem, ['regularPrice'], ['desc']);
        }

        default:
            return item;
    }
};