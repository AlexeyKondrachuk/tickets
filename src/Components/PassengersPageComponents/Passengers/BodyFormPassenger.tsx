import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import useValidation from "../../../hooks/validate";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setFormCheckValid } from "../../../Redux/Slice/CheckFormSlice";
import InputField from "./InputField";
import {
  setBrithDay,
  setDocument_data,
  setDocument_type,
  setFirst_name,
  setGender,
  setIs_adult,
  setLast_name,
  setPatronymic,
} from "../../../Redux/Slice/PersonInfo";
import "../../../styles/bodyFormPassenger.scss";

type typePass = "adult" | "children";
type typeDoc = "passport" | "certificate";

interface NameFormValues {
  surname: string;
  name: string;
  patronymic: string;
  birthday: string;
  document_type: "паспорт" | "свидетельство o рождении";
  document_series: string; // для хранения серии
  document_number: string;
  certificate: string;
}

interface BodyFormPassengerProps {
  formId: number;
  addPassenger?: () => void;
}

export const BodyFormPassenger: React.FC<BodyFormPassengerProps> = ({
  formId,
  addPassenger,
}) => {
  const dispatch = useAppDispatch();
  const { gender } = useAppSelector((state) => state.personInfo);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenTypeDoc, setIsOpenTypeDoc] = useState<boolean>(false);
  const [typePass, setTypePass] = useState<string>("adult");
  const [typeDoc, setTypeDoc] = useState<string>("passport");

  const [isCheckValid, setIsCheckValid] = useState<boolean>(false);

  const [values, setValues] = useState<NameFormValues>({
    surname: "",
    name: "",
    patronymic: "",
    birthday: "",
    document_type: "паспорт",
    document_series: "",
    document_number: "",
    certificate: "",
  });

  const { errors, validate, setErrors } = useValidation(
    values,
    typeDoc,
    "FIO_BIRTHDAY_DOC"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (typePass === "adult") {
      dispatch(setIs_adult(true));
      setTypeDoc("passport");
    } else if (typePass === "children") {
      setTypeDoc("certificate");
      dispatch(setIs_adult(false));
    }
  }, [typePass]);

  const TypePassengerRef = useRef<HTMLDivElement | null>(null);
  const TypeDocumentRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(TypePassengerRef, () => setIsOpen(false));
  useClickOutside(TypeDocumentRef, () => setIsOpenTypeDoc(false));

  const handleTypeChange = (options: typePass) => {
    setTypePass(options);
    setIsOpen(false);
  };

  const handleTypeDocChange = (options: typeDoc) => {
    setTypeDoc(options);
    setIsOpenTypeDoc(false);
    setValues((prevState) => ({
      ...prevState,
      document_series: "",
      document_number: "",
    }));
  };

  const handleSeriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    setValues((prevState) => ({
      ...prevState,
      document_series: value.slice(0, 4),
    }));
  };

  // Обработчик для номера
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    setValues((prevState) => ({
      ...prevState,
      document_number: value.slice(0, 6),
    }));
  };

  //---------------------------------------------------------------------------
  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(/\s/g, "")
      .replace(/[^A-Za-zА-Яа-я0-9]/g, "");
    value = value.toUpperCase();

    const latinPart = value.slice(0, 4).replace(/[^A-Z]/g, "");

    const remainingPart = value.slice(4);

    const cyrillicPart = remainingPart.replace(/[^А-Я]/g, "").slice(0, 2);
    const numericPart = remainingPart.replace(/[^0-9]/g, "").slice(0, 6);

    let formattedValue = latinPart;

    if (cyrillicPart) {
      formattedValue += " " + cyrillicPart;
    }

    if (numericPart) {
      formattedValue += " " + numericPart;
    }

    formattedValue = formattedValue.slice(0, 14);

    setValues((prevState) => ({
      ...prevState,
      certificate: formattedValue,
    }));
  };

  console.log(values.certificate);

  useEffect(() => {
    const isNameValid =
      values.surname.length >= 2 &&
      values.name.length >= 2 &&
      values.patronymic.length >= 2 &&
      values.birthday !== "";

    // Проверка документа в зависимости от типа
    const isDocumentValid =
      (typeDoc === "passport" &&
        values.document_series.length === 4 &&
        values.document_number.length === 6) ||
      (typeDoc === "certificate" && values.certificate.length === 14);

    // Устанавливаем статус валидности формы
    if (isNameValid && isDocumentValid) {
      setIsCheckValid(true);
      dispatch(setFormCheckValid({ formId, isValid: true }));
    } else {
      setIsCheckValid(false);
      dispatch(setFormCheckValid({ formId, isValid: false }));
    }
  }, [values, formId, typeDoc, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    dispatch(setFormCheckValid({ formId, isValid: false }));
    setIsCheckValid(false);

    if (Object.keys(validationErrors).length === 0) {
      setIsCheckValid(true);
      dispatch(setFormCheckValid({ formId, isValid: true }));
      addPassenger?.();
    }
  };

  const errorFields = Object.keys(errors).filter(
    (field) => errors[field as keyof typeof errors]
  );

  const errorMessage =
    errorFields.length > 0
      ? `${errorFields
          .map((field) => {
            switch (field) {
              case "surname":
                return "Фамилия";
              case "name":
                return "Имя";
              case "patronymic":
                return "Отчество";
              case "birthday":
                return "Дата рождения";
              default:
                return "";
            }
          })
          .filter((field) => field) // Убираем пустые строки
          .join(", ")} - заполнено некорректно или отсутствует.` +
        (errorFields.includes("certificate")
          ? " Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456."
          : "") +
        (errorFields.includes("document_series")
          ? " Серия паспорта должна содержать 4 цифры."
          : "") +
        (errorFields.includes("document_number")
          ? " Номер паспорта должен содержать 6 цифр."
          : "")
      : "";

  const resetErrors = () => {
    setErrors({}); // Сбрасываем ошибки
  };

  useEffect(() => {
    dispatch(setFirst_name(values.name));
    dispatch(setLast_name(values.surname));
    dispatch(setPatronymic(values.patronymic));
    dispatch(setBrithDay(values.birthday));
    dispatch(setDocument_type(typeDoc));

    if (typeDoc === "passport") {
      dispatch(
        setDocument_data(`${values.document_series} ${values.document_number}`)
      );
    } else {
      dispatch(setDocument_data(values.certificate));
    }
  }, [values, typeDoc]);

  return (
    <form className="passenger-form">
      <div className="typePass-dropdown" ref={TypePassengerRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="typePass-dropdown-btn"
          type="button"
        >
          <div className="triangle-down"></div>
          {typePass === "adult" && <span>Взрослый</span>}
          {typePass === "children" && <span>Детский</span>}
        </button>

        {isOpen && (
          <ul className="typePass-dropdown-menu">
            <li onClick={() => handleTypeChange("adult")}>Взрослый</li>
            <li onClick={() => handleTypeChange("children")}>Детский</li>
          </ul>
        )}
      </div>

      <div className="fio-wrapper">
        <InputField
          label="Фамилия"
          name="surname"
          value={values.surname}
          onChange={handleChange}
          required
          error={errors.surname}
        />
        <InputField
          label="Имя"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          error={errors.name}
        />
        <InputField
          label="Отчество"
          name="patronymic"
          value={values.patronymic}
          onChange={handleChange}
          required
          error={errors.patronymic}
        />
      </div>

      <div className="gender-wrapper">
        <label className="gender-toggle">
          {" "}
          <span className="gender-title">Пол</span>
          <input
            type="checkbox"
            id="gender"
            name="gender"
            onChange={() => dispatch(setGender(!gender))}
          />
          <span className="toggle-slide"></span>
          <span className="label-m">М</span>
          <span className="label-f">Ж</span>
        </label>

        <label htmlFor="" className="pass-birth">
          Дата рождения
          <input
            type="date"
            name="birthday"
            value={values.birthday}
            onChange={(e) => setValues({ ...values, birthday: e.target.value })}
            required
            className={errors.birthday ? "input-error" : ""}
          />
        </label>
      </div>

      <div className="limited-wrapper">
        <label htmlFor="limited-label" className="limited">
          <input
            type="checkbox"
            id="checkbox-limited"
            name="checkbox"
            value="option1"
            className="limited-checkbox"
          />
          Ограниченная подвижность
        </label>
      </div>
      <span className="space-grey"></span>

      <div className="document-wrapper">
        <div className="typePass-dropdown" ref={TypeDocumentRef}>
          <span className="type_document-title">Тип документа</span>
          <button
            onClick={() => setIsOpenTypeDoc(!isOpenTypeDoc)}
            className={
              typeDoc === "passport" ? "doc_passport" : "doc_certificate"
            }
            type="button"
          >
            <div className="triangle-down"></div>
            {typeDoc === "passport" && <span>Паспорт РФ</span>}
            {typeDoc === "certificate" && <span>Свидетельство о рождении</span>}
          </button>

          {isOpenTypeDoc && (
            <ul className="dropdown_doc">
              <li onClick={() => handleTypeDocChange("passport")}>
                Паспорт РФ
              </li>
              <li onClick={() => handleTypeDocChange("certificate")}>
                Свидетельство о рождении
              </li>
            </ul>
          )}
        </div>

        {typeDoc === "passport" && (
          <>
            <label htmlFor="" className="document-series">
              Серия
              <input
                type="text"
                required
                maxLength={4}
                value={values.document_series}
                onChange={handleSeriesChange}
                className={errors.document_series ? "input-error" : ""}
              />
            </label>

            <label htmlFor="" className="document-series">
              Номер
              <input
                type="text"
                required
                maxLength={6}
                value={values.document_number}
                onChange={handleNumberChange}
                className={errors.document_series ? "input-error" : ""}
              />
            </label>
          </>
        )}

        {typeDoc === "certificate" && (
          <label htmlFor="certificate" className="document-series">
            Номер свидетельства
            <input
              type="text"
              required
              maxLength={14}
              value={values.certificate}
              onChange={handleCertificateChange}
              className={errors.certificate ? "input-error" : ""}
            />
          </label>
        )}
      </div>

      <span className="space-grey"></span>
      <div className="form-next-wrapper">
        {errorMessage ? (
          <div className="errors-wrapper">
            <button className="error-close" type="button" onClick={resetErrors}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z"
                  fill="white"
                  fillOpacity="0.81"
                />
              </svg>
            </button>
            <p className="error">{errorMessage}</p>
          </div>
        ) : isCheckValid ? (
          // Если форма валидна, отображаем "Готово" и кнопку "Следующий пассажир"
          <>
            <div className="isValid-wrapper">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM10.2168 15.8293L10.207 15.8401C9.93262 16.1293 9.93262 16.6112 10.1973 16.9111C10.8311 17.5991 11.4551 18.2819 12.0703 18.9553C12.6914 19.6343 13.3037 20.3038 13.9092 20.9598C13.958 21.0134 14.0361 21.0134 14.085 20.9598L22.8018 11.4272C23.0664 11.1381 23.0664 10.6667 22.8018 10.3776L22.665 10.2169C22.4004 9.92773 21.959 9.92773 21.6953 10.2169L13.9189 18.7213C13.8799 18.7642 13.8311 18.7642 13.791 18.7213C12.9297 17.7681 12.0479 16.7933 11.1768 15.8401C10.9121 15.5509 10.4814 15.5509 10.2168 15.8293Z"
                  fill="#F9FEF7"
                />
              </svg>
              <p className="success-message">Готово</p>
              {addPassenger !== undefined && (
                <button
                  className="form-next"
                  type="button"
                  onClick={handleSubmit}
                >
                  Следующий пассажир
                </button>
              )}
            </div>
          </>
        ) : (
          // Если ошибок нет, но форма еще не была отправлена, показываем кнопку
          <button className="form-next" type="button" onClick={handleSubmit}>
            Следующий пассажир
          </button>
        )}
      </div>
    </form>
  );
};
