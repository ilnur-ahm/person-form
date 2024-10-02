import { Errors, FormData } from "../interfaces/index";
interface Props {
  formData: FormData;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
}

const validate = ({ formData, setErrors }: Props) => {
  const newErrors: Errors = {};
  if (!formData.lastName) newErrors.lastName = "Поле является обязательным";
  if (!formData.firstName) newErrors.firstName = "Поле является обязательным";
  if (!formData.middleName) newErrors.middleName = "Поле является обязательным";
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

export default validate;
