import React, { useState, ChangeEvent, FormEvent } from "react";
import s from "./Form.module.sass";
import BaseInput from "../../atoms/BaseInput/BaseInput";
import DateInput from "../../atoms/DateInput/DateInput";
import EmailInput from "../../atoms/EmailInput/EmailInput";
import GenderInput from "../../atoms/GenderInput/GenderInput";
import PhoneInput from "../../atoms/PhoneInput/PhoneInput";

interface FormData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date | null;
  phone: string;
  email: string;
  gender: string;
  address: string;
  job: string;
}

interface Errors {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  gender?: string;
  address?: string;
  job?: string;
}

const PersonForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: null,
    phone: "",
    email: "",
    gender: "",
    address: "",
    job: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.lastName) newErrors.lastName = "Поле является обязательным";
    if (!formData.firstName) newErrors.firstName = "Поле является обязательным";
    if (!formData.middleName)
      newErrors.middleName = "Поле является обязательным";
    if (!formData.birthDate) newErrors.birthDate = "Поле является обязательным";
    if (!formData.phone) newErrors.phone = "Поле является обязательным";
    if (!formData.email) newErrors.email = "Поле является обязательным";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Введен некорректный адрес почты";
    if (!formData.gender) newErrors.gender = "Поле является обязательным";
    if (!formData.address) newErrors.address = "Поле является обязательным";
    if (!formData.job) newErrors.job = "Поле является обязательным";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      birthDate: date,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Форма валидна, отправляется запрос");
    }
  };

  return (
    <div className={s.personForm}>
      <h1>Информация о сотруднике</h1>
      <form onSubmit={handleSubmit}>
        <div className={s.formGrid}>
          <BaseInput
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Фамилия"
            error={errors.lastName}
          />
          <BaseInput
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Имя"
            error={errors.firstName}
          />
          <BaseInput
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Отчество"
            error={errors.middleName}
          />
          <div className={s.twoElements}>
            <GenderInput
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Пол"
              error={errors.gender}
            />
            <DateInput
              name="birthDate"
              value={formData.birthDate}
              onChange={handleDateChange}
              placeholder="Дата рождения"
              error={errors.birthDate}
            />
          </div>
          <div className={s.twoElements}>
            <PhoneInput
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Мобильный телефон"
              error={errors.phone}
            />
            <EmailInput
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              error={errors.email}
            />
          </div>
          <BaseInput
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Адрес постоянной регистрации"
            error={errors.address}
          />
          <BaseInput
            name="job"
            value={formData.job}
            onChange={handleChange}
            placeholder="Название работодателя"
            error={errors.job}
          />
          <button type="submit" className={s.submitButton}>
            СОХРАНИТЬ
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
