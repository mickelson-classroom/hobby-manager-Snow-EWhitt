import { FC, useState } from "react";

export interface CustomInputControl<T> {
  inputValue: T;
  setInputValue: (newValue: T) => void;
}

export const useCustomInput = (initialValue: any): CustomInputControl<any> => {
  const [inputValue, setInputValue] = useState<any>(initialValue);

  return {
    inputValue,
    setInputValue,
  };
};

export const CustomInput: FC<{
  controller: CustomInputControl<any>;
  label?: string;
  type?: string;
}> = ({ controller, label, type }) => {
  return (
    <div className="text-start">
      {label && (
        <label htmlFor={label} className="form-label mt-2">
          {label}
        </label>
      )}
      <input
        id={label}
        className="form-control mb-2"
        type={type}
        value={controller.inputValue}
        onChange={(e) => controller.setInputValue(e.target.value)}
      />
    </div>
  );
};
