import { FC, ReactElement, useState } from "react";

export interface CustomSelectControl<T> {
  selectValue: T;
  setSelectValue: (newValue: T) => void;
}

export const useCustomSelect = (
  initialValue?: any
): CustomSelectControl<any> => {
  const [selectValue, setSelectValue] = useState<any>(initialValue);

  return {
    selectValue,
    setSelectValue,
  };
};

export const CustomSelect: FC<{
  controller: CustomSelectControl<any>;
  label?: string;
  defaultValue?: string;
  children: ReactElement[];
}> = ({ controller, label, children, defaultValue }) => {
  return (
    <div className="text-start">
      <label htmlFor={label} className="form-label mt-2">
        {label}
      </label>
      <select
        id={label}
        className="form-select"
        value={controller.selectValue}
        defaultValue={defaultValue}
        onChange={(e) => {
          e.preventDefault();
          controller.setSelectValue(e.target.value);
        }}
      >
        {children}
      </select>
    </div>
  );
};
