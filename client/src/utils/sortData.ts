import { AvailableProperties } from 'types/listing';

type SortProps = {
  item: AvailableProperties[],
  options: string,
};

export const handlePropertySorting = ({ item, options }: SortProps): AvailableProperties[] => {
  const sortedItem = [...item]; // Clone the array to avoid mutating the original

  // Define a comparator function for sorting
  const compare = <T>(a: T, b: T, key: keyof T, order: 'asc' | 'desc'): number => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  };

  // Sort the array based on the options
  switch (options) {
    case 'Type: sell':
      return sortedItem.sort((a, b) => compare(a, b, 'type', 'asc'));

    case 'Type: rent':
      return sortedItem.sort((a, b) => compare(a, b, 'type', 'desc'));

    case 'Price: lowest cost':
      return sortedItem.sort((a, b) => compare(a, b, 'regularPrice', 'asc'));

    case 'Price: highest cost':
      return sortedItem.sort((a, b) => compare(a, b, 'regularPrice', 'desc'));

    default:
      return item; // Return the original array if no valid sort option is provided
  }
};
