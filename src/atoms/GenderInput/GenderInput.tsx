import React, { ChangeEvent, useState } from "react";
import Select, { StylesConfig, SingleValue, MultiValue } from "react-select";
import s from "./GenderInput.module.sass";

interface GenderInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  error?: string;
}

interface OptionType {
  value: string;
  label: string;
}

const GenderInput: React.FC<GenderInputProps> = ({
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  let labelClass = s.none;
  if (isFocused) {
    labelClass = s.active;
  } else if (value) {
    labelClass = s.inactive;
  }

  const options: OptionType[] = [
    { value: "male", label: "Мужской" },
    { value: "female", label: "Женский" },
  ];

  const customStyles: StylesConfig<OptionType> = {
    control: (provided, state) => ({
      ...provided,
      width: "280px",
      height: "60px",
      padding: "15px 0 5px",
      boxSizing: "border-box",
      border: error ? "1px solid red" : "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "none",
      fontSize: "16px",
      backgroundColor: state.isFocused ? "#ffffff" : "#f0f0f0",
      transition: "all 0.2s",
      "&:focus-within": {
        borderColor: "#44b766",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#ffffff" : "#000000",
      backgroundColor: state.isSelected ? "#44b766" : "#ffffff",
      textAlign: "left",
      "&:hover": {
        backgroundColor: "#044b1a",
        color: "#ffffff",
        transition: "all 0.2s",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      position: "absolute",
      top: "-1px",
      left: "5px",
      color: "#989898",
    }),
    singleValue: (provided) => ({
      ...provided,
      position: "absolute",
      left: "5px",
      color: "#000000",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "5px",
      width: "100%",
    }),
    menuList: (provided) => ({
      ...provided,
      borderRadius: "5px",
      padding: 0,
    }),
    input: (provided) => ({
      ...provided,
      color: "#000000",
    }),
  };

  const handleSelectChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>
  ) => {
    if (newValue && "value" in newValue) {
      onChange({
        target: { name, value: newValue.value },
      } as ChangeEvent<HTMLSelectElement>);
    } else {
      onChange({
        target: { name, value: "" },
      } as ChangeEvent<HTMLSelectElement>);
    }
  };

  return (
    <div className={`${s.inputWrapper} ${error ? s.error : ""}`}>
      <Select
        name={name}
        value={options.find((option) => option.value === value)}
        onChange={handleSelectChange}
        options={options}
        placeholder={value || isFocused ? "" : placeholder}
        styles={customStyles}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label className={`${s.label} ${labelClass}`}>{placeholder}</label>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};

export default GenderInput;
