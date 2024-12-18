import InputField from "../PassengersPageComponents/Passengers/InputField";
import { useEffect, useState } from "react";
import useValidation from "../../hooks/validate";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUserInfo } from "../../Redux/Slice/userInfo";
import { setValidityState } from "../../Redux/Slice/CheckPersonalInfo";
import { formatString } from "../../utils/formatString";
import "../../styles/personalinfo.scss";

interface persanalInfoFormValues {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  payment_method?: "cash" | "online";
}

export const PersonaIinfo = () => {
  const dispatch = useAppDispatch();

  const { first_name, last_name, patronymic, phone, email } = useAppSelector(
    (state) => state.userInfo.user
  );

  const [infoValues, setInfoValues] = useState<persanalInfoFormValues>({
    surname: "",
    name: "",
    patronymic: "",
    phone: "",
    email: "",
    payment_method: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoValues({ ...infoValues, [name]: value });
    dispatch(setValidityState(false));
  };

  useEffect(() => {
    const phoneFormated = formatString(phone);

    if (first_name || last_name || patronymic || phone || email) {
      setInfoValues((prevValues) => ({
        ...prevValues,
        surname: last_name,
        name: first_name,
        patronymic,
        phone: phoneFormated,
        email,
      }));
    }
  }, []);

  const { errors, validate } = useValidation(
    infoValues,
    "",
    "FIO_EMAIL_PHONE"
  );

  const handlePaymentMethodChange = (method: "online" | "cash") => {
    setInfoValues((prev) => ({
      ...prev,
      payment_method: method,
    }));
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      let digits = value.replace(/\D/g, "");
      digits = digits.slice(0, 10);

      const formatted = digits.replace(
        /(\d{3})(\d{0,3})(\d{0,2})(\d{0,2})/,
        (_, g1, g2, g3, g4) => {
          return [g1, g2, g3, g4].filter(Boolean).join(" ");
        }
      );

      setInfoValues((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setInfoValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (infoValues.payment_method !== undefined) {
      const validationErrors = validate();

      if (Object.keys(validationErrors).length === 0) {
        const formattedValues = {
          first_name: infoValues.surname,
          last_name: infoValues.name,
          patronymic: infoValues.patronymic,
          phone: infoValues.phone,
          email: infoValues.email,
          payment_method: infoValues.payment_method,
        };
        dispatch(setUserInfo(formattedValues));
        dispatch(setValidityState(true));
      }
    }
  }, [infoValues]);

  return (
    <section className="personalifo-wrapper">
      <div className="personalinfo-title">
        <h3>Персональные данные</h3>
      </div>
      <div className="fio-wrapper personalinfo">
        <InputField
          label="Фамилия"
          name="surname"
          value={infoValues.surname}
          onChange={handleChange}
          required
          error={errors.surname}
        />
        <InputField
          label="Имя"
          name="name"
          value={infoValues.name}
          onChange={handleChange}
          required
          error={errors.name}
        />
        <InputField
          label="Отчество"
          name="patronymic"
          value={infoValues.patronymic}
          onChange={handleChange}
          required
          error={errors.patronymic}
        />
      </div>

      <div className="input_phone_email">
        <div className="fio-wrapper phone">
          <h4>+7 ____ ____ ___ __</h4>
          <InputField
            label="Контактный телефон"
            name="phone"
            value={infoValues.phone}
            onChange={handleChangePhone}
            required
            error={errors.phone}
          />
        </div>

        <div className="fio-wrapper emailinfo">
          <InputField
            label="E-mail"
            name="email"
            value={infoValues.email}
            onChange={handleChange}
            required
            error={errors.email}
            placeholder={"info@gmail.com"}
          />
        </div>
      </div>

      <div className="payment-wrapper">
        <div className="typePayment-title">
          <h3>Способ оплаты</h3>
        </div>
        <div className="typePayment-wrapper">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={infoValues.payment_method === "online"}
              onChange={() => handlePaymentMethodChange("online")}
            />
            <span className="checkbox-custom"></span>
            <span>Онлайн</span>
          </label>

          <div className="online_method-wrapper">
            <h4>Банковской картой</h4>
            <h4>PayPal</h4>
            <h4>Visa QIWI Wallet</h4>
          </div>

          <div className="cash_method-wrapper">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={infoValues.payment_method === "cash"}
                onChange={() => handlePaymentMethodChange("cash")}
              />
              <span className="checkbox-custom"></span>
              <span>Наличными</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};
