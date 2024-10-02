import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import s from "./DateInput.module.sass";
import calendarIcon from "../../icons/calendar.svg";

registerLocale("ru", ru);

interface DateInputProps {
  name: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder: string;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCalendarIconClick = () => {
    setIsOpen(!isOpen);
  };

  let labelClass = "";
  if (isOpen) {
    labelClass = s.active;
  } else if (value) {
    labelClass = s.inactive;
  }

  return (
    <div className={`${s.inputWrapper} ${error ? s.error : ""}`}>
      <div className={s.inputContainer}>
        <DatePicker
          selected={value}
          onChange={onChange}
          dateFormat="dd.MM.yyyy"
          className={`${s.datePicker} ${error ? s.errorInput : ""}`}
          locale="ru"
          open={isOpen}
          onCalendarOpen={() => setIsOpen(true)}
          onCalendarClose={() => setIsOpen(false)}
          onClickOutside={() => setIsOpen(false)}
        />
        <img
          src={calendarIcon}
          alt="Calendar"
          className={s.calendarIcon}
          onClick={handleCalendarIconClick}
        />
      </div>
      <label className={`${s.label} ${labelClass}`}>{placeholder}</label>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};

export default DateInput;
