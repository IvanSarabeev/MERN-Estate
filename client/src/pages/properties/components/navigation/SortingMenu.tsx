import React, { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

type SortingMenuProps = {
  handleSortingOption: (newSortOption: string) => void;
};

const SortingMenu: React.FC<SortingMenuProps> = ({ handleSortingOption }) => {
  const handleSelectChange = (value: string) => {
    handleSortingOption(value);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="min-w-44 w-fit">
        <SelectValue placeholder="Default Sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chose ...</SelectLabel>
          <SelectItem value="Type: sell">Sell</SelectItem>
          <SelectItem value="Type: rent">Rent</SelectItem>
          <SelectItem value="Price: lowest cost">Lowest Price</SelectItem>
          <SelectItem value="Price: highest cost">Maximum Price</SelectItem>
          <SelectItem value="clear">Clear Sorting</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const MemoSortingMenu = memo(SortingMenu);

export default MemoSortingMenu;
