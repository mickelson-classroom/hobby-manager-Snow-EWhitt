import { FC } from "react";

export const CustomInput: FC<{
  id: string;
  type?: string;
  value: string | number;
  required?: boolean;
  onChange?: (i: string) => void;
  children?: string | never[];
}> = ({ id, type, value, onChange, children: labelName, required }) => {
  const handleOnChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="text-start">
      <label htmlFor={id} className="form-label mt-2">
        {labelName}
      </label>
      <input
        id={id}
        type={type}
        className="form-control mb-2"
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        required={required}
      />
      {value && required ? (
        <div className="valid-feedback">Looks good!</div>
      ) : (
        <div className="invalid-feedback">Required</div>
      )}
    </div>
  );
};
