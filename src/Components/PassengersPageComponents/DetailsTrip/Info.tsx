import React, { useState } from "react";
import { IDate } from "../../../Redux/Types/types";
import "../../../styles/direction_info.scss";

interface ToggleContentProps {
  title: string;
  dateDirections?: IDate;
  children: React.ReactNode;
}

export const Info: React.FC<ToggleContentProps> = ({
  title,
  children,
  dateDirections,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="btn_info-wrapper">
      <div className="directions_title">
        {title !== "Пассажиры" ? (
          <svg
            className={title === "Обратно" ? "svgrotate" : ""}
            width="32"
            height="26"
            viewBox="0 0 32 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 0C2.23877 0 0 2.23853 0 5V21C0 23.7615 2.23877 26 5 26H27C29.7612 26 32 23.7615 32 21V5C32 2.23853 29.7612 0 27 0H5ZM17.8369 14.2236V17.3333C19.3442 15.8793 20.8667 14.4108 22.3154 13.0288C20.8521 11.6035 19.3442 10.135 17.8223 8.66663V11.949H9.68408V14.2236H17.8369Z"
              fill="#FFA800"
            />
          </svg>
        ) : (
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.9721 26C17.2752 26 8.72031 26 0.165369 26C-0.219806 21.9313 -0.260351 20.3648 3.83467 18.4118C9.91638 15.5229 16.0792 15.5839 22.2014 18.4118C22.9921 18.7779 23.7219 19.2865 24.4111 19.8358C25.5058 20.7106 26.0735 21.8499 25.9924 23.2943C25.9518 24.1487 25.9721 25.0235 25.9721 26Z"
              fill="#FFA800"
            />
            <path
              d="M19.4841 6.44946C19.5044 10.0503 16.6054 13.0002 13.0172 13.0206C9.42899 13.0206 6.50977 10.091 6.50977 6.51049C6.50977 2.9503 9.38844 0.0411096 12.9158 0.00042166C16.5243 -0.0402663 19.4638 2.86892 19.4841 6.44946Z"
              fill="#FFA800"
            />
          </svg>
        )}
        <h3 className="title-directions">{title}</h3>

        {dateDirections !== undefined && (
          <span>
            {dateDirections && dateDirections.day}.
            {dateDirections && dateDirections.month}.
            {dateDirections && dateDirections.year}
          </span>
        )}

        <button onClick={toggleContent} className="btn_title">
          {!isOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.22204 4.20293L9.22204 9.18841L4.23656
           9.18841C3.7728 9.18841 3.42497 9.53623 3.42497
            10C3.42497 10.4638 3.7728 10.8116 4.23656 10.8116L9.22204 
            10.8116L9.22204 15.7971C9.22204 16.2608 9.56987 16.6087 
            9.97566 16.5507L10.0916 16.5507C10.5554 16.5507 10.9032 16.2029
             10.8452 15.7971V10.8116H15.7148C16.1785 10.8116 16.5264 10.4638 
             16.5264 10C16.5264 9.53623 16.1785 9.18841 15.7148 9.18841H10.8452V4.
             20293C10.8452 3.73917 10.4974 3.39134 10.0916 3.44931L9.97566
              3.44931C9.5119 3.44931 9.16407 3.79714 9.22204 4.20293Z"
                fill="white"
              />
              <rect
                x="1"
                y="1"
                width="18"
                height="18"
                rx="4"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="18"
                height="18"
                rx="4"
                stroke="#C4C4C4"
                stroke-width="2"
              />
              <line
                x1="5.61523"
                y1="9.76929"
                x2="14.3845"
                y2="9.76929"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
