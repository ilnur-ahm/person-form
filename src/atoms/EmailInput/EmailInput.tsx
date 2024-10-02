import React, { ChangeEvent, useState } from "react";
import s from "./EmailInput.module.sass";

interface EmailInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
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
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // placeholder={placeholder}
        className={error ? s.errorInput : ""}
      />
      <label className={`${s.label} ${labelClass}`}>{placeholder}</label>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};

export default EmailInput;
