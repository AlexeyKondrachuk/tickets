import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  locale?: string;
  className: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onChange,
  placeholder = "ДД/ММ/ГГ",
  locale = "ru",
  className,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="dd.MM.yyyy"
      className={className}
      locale={locale}
      placeholderText={placeholder}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
      }: {
        date: Date;
        decreaseMonth: () => void;
        increaseMonth: () => void;
      }) => (
        <div className="custom-header">
          <button onClick={decreaseMonth} type="button">
            &#9664;
          </button>
          <span>
            {date
              .toLocaleString(locale, { month: "long" })
              .replace(/^./, (char) => char.toUpperCase())}
          </span>
          <button onClick={increaseMonth} type="button">
            &#9654;
          </button>
        </div>
      )}
    />
  );
};

export default CustomDatePicker;
