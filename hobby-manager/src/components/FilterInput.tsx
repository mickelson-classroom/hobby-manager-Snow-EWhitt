import { FC, useState } from "react";

export interface FilterInputControl {
  filterValue: string;
  setFilterValue: (newValue: string) => void;
}

export const useFilterInput = (): FilterInputControl => {
  const [filterValue, setFilterValue] = useState<string>("");

  return {
    filterValue,
    setFilterValue,
  };
};

export const FilterInput: FC<{ inputBar: FilterInputControl }> = ({
  inputBar,
}) => {
  return (
    <div className="">
      <label
        id="filterInput"
        className="form-label">
        Filter by Title
      </label>
      <input
        id="filterInput"
        className="form-control mb-2"
        value={inputBar.filterValue}
        onChange={(e) => inputBar.setFilterValue(e.target.value)}
      />
    </div>
  );
};
