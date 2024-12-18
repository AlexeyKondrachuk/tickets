import { useState } from "react";

interface ValidationErrors {
  surname?: string;
  name?: string;
  patronymic?: string;
  birthday?: string;
  document_series?: string;
  document_number?: string;
  certificate?: string;
  email?: string;
  phone?: string;
  payment_method?: string;
}

type ValidationType = "FIO_BIRTHDAY_DOC" | "FIO_EMAIL_PHONE";

const useValidation = (
  values: {
    surname: string;
    name: string;
    patronymic: string;
    birthday?: string;
    document_series?: string;
    document_number?: string;
    certificate?: string;
    email?: string;
    phone?: string;
    payment_method?: "cash" | "online" | "";
  },
  typeDoc: string = "",
  validationType: ValidationType = "FIO_BIRTHDAY_DOC"
) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = () => {
    const newErrors: ValidationErrors = {};
    const namePattern = /^[A-Za-zА-Яа-яЁё\-']+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const seriesPattern = /^\d{4}$/;
    const numberPattern = /^\d{6}$/;

    // Валидация ФИО (общая для всех типов)
    if (
      !values.surname ||
      values.surname.length < 2 ||
      values.surname.length > 25 ||
      !namePattern.test(values.surname)
    ) {
      newErrors.surname = "Фамилия заполнена некорректно или отсутствует";
    }

    if (
      !values.name ||
      values.name.length < 2 ||
      values.name.length > 25 ||
      !namePattern.test(values.name)
    ) {
      newErrors.name = "Имя заполнено некорректно или отсутствует";
    }

    if (
      !values.patronymic ||
      values.patronymic.length < 2 ||
      values.patronymic.length > 25 ||
      !namePattern.test(values.patronymic)
    ) {
      newErrors.patronymic = "Отчество заполнено некорректно или отсутствует";
    }

    if (validationType === "FIO_BIRTHDAY_DOC") {
      // Валидация даты рождения
      if (!values.birthday) {
        newErrors.birthday = "Дата рождения не выбрана";
      }

      // Валидация документа в зависимости от типа
      if (typeDoc === "passport") {
        if (
          !values.document_series ||
          !seriesPattern.test(values.document_series)
        ) {
          newErrors.document_series = "Серия паспорта должна содержать 4 цифры";
        }

        if (
          !values.document_number ||
          !numberPattern.test(values.document_number)
        ) {
          newErrors.document_number = "Номер паспорта должен содержать 6 цифр";
        }
      } else if (typeDoc === "certificate") {
        if (!values.certificate || values.certificate.length !== 14) {
          newErrors.certificate =
            "Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456";
        }
      }
    } else if (validationType === "FIO_EMAIL_PHONE") {
      // Валидация email
      if (!values.email || !emailPattern.test(values.email)) {
        newErrors.email = "Email указан некорректно или отсутствует";
      }

      // Валидация телефона
      if (!values.phone || values.phone?.length < 13) {
        newErrors.phone =
          "Телефон указан некорректно или отсутствует. Пример: +79991234567";
      }
      if (
        !values.payment_method ||
        (values.payment_method !== "cash" && values.payment_method !== "online")
      ) {
        newErrors.payment_method = "Не выбран способ оплаты";
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  return { errors, validate, setErrors };
};

export default useValidation;
