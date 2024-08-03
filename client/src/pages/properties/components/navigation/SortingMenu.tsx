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

const SortingMenu: React.FC = () => {
  return (
    <Select>
      <SelectTrigger className="min-w-44 w-fit">
        <SelectValue placeholder="Default Sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Latest</SelectLabel>
          <SelectItem value="0">Average</SelectItem>
          <SelectItem value="1">DownFall</SelectItem>
          <SelectItem value="2">Latest</SelectItem>
          <SelectItem value="3">Latest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const MemoSortingMenu = memo(SortingMenu);

export default MemoSortingMenu;
