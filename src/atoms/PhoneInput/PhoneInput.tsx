import React, { ChangeEvent, useState } from "react";
import InputMask from "react-input-mask";
import s from "./PhoneInput.module.sass";

interface PhoneInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
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

  let labelClass = "";
  if (isFocused) {
    labelClass = s.active;
  } else if (value) {
    labelClass = s.inactive;
  }

  return (
    <div className={`${s.inputWrapper} ${error ? s.error : ""}`}>
      <InputMask
        mask="+7 (999) 999-99-99"
        maskChar="_"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={error ? s.errorInput : ""}
      />
      <label className={`${s.label} ${labelClass}`}>{placeholder}</label>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};

export default PhoneInput;
