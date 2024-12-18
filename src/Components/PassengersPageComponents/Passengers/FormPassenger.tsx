import { ReactNode, useState } from "react";
import "../../../styles/formPassenger.scss";

interface FormPassengerProps {
  children: ReactNode;
  passengerNumber: number;
  onRemove: () => void;
}

export const FormPassenger = ({
  children,
  passengerNumber,
  onRemove,
}: FormPassengerProps) => {
  const [isOpenForm, setIsOpen] = useState<boolean>(true);

  const handlerSwitch = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="form_pass-wrapper">
      <div className="header_form_pass">
        <button onClick={handlerSwitch}>
          {isOpenForm ? (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="15" stroke="#928F94" strokeWidth="2" />
              <line
                x1="8"
                y1="16"
                x2="24"
                y2="16"
                stroke="#928F94"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9444 8.46381L14.9444 14.9449L8.46329 14.9449C7.8604 14.9449 7.40823 15.3971 7.40823 16C7.40823 16.6029 7.8604 17.0551 8.46329 17.0551L14.9444 17.0551L14.9444 23.5362C14.9444 24.1391 15.3966 24.5913 15.9241 24.5159L16.0748 24.5159C16.6777 24.5159 17.1299 24.0637 17.0546 23.5362L17.0546 17.0551L23.385 17.0551C23.9878 17.0551 24.44 16.6029 24.44 16C24.44 15.3971 23.9878 14.9449 23.385 14.9449L17.0546 14.9449L17.0546 8.46381C17.0546 7.86091 16.6024 7.40874 16.0748 7.4841L15.9241 7.4841C15.3212 7.4841 14.8691 7.93628 14.9444 8.46381Z"
                fill="#FFA800"
              />
              <circle
                cx="16"
                cy="16"
                r="15"
                stroke="#FFA800"
                stroke-width="2"
              />
            </svg>
          )}
        </button>
        <h3>Пассажир {passengerNumber}</h3>
        {isOpenForm && passengerNumber !== 1 && (
          <button className="delete-pass" onClick={onRemove}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3 0.3L6 4.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L4.6 6L0.3 10.3C-0.1 10.7 -0.1 11.3 0.3 11.6L0.4 11.7C0.8 12.1 1.4 12.1 1.7 11.7L6 7.4L10.2 11.6C10.6 12 11.2 12 11.6 11.6C12 11.2 12 10.6 11.6 10.2L7.4 6L11.7 1.7C12.1 1.3 12.1 0.7 11.7 0.4L11.6 0.3C11.2 -0.1 10.6 -0.1 10.3 0.3Z"
                fill="#928F94"
              />
            </svg>
          </button>
        )}
      </div>
      {isOpenForm && (
        <div className={`form_pass-content ${isOpenForm ? "open" : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
};
