import { bgSVG } from "../../utils/svgIcons";
import { useLocation } from "react-router-dom";
import "../../styles/Steps.scss";

export default function Steps() {
  const location = useLocation();
  const isPassengerPage =
    location.pathname.includes("passengers") &&
    !location.pathname.includes("payment");
  const isPaymentPage = location.pathname.includes("payment");
  const isCheckPage = location.pathname.includes("check");

  return (
    <div className={isCheckPage ? "steps-container_check" : "steps-container"}>
      <div className="bgr-wrapper">
        {isPassengerPage
          ? bgSVG[1].bgIcons
          : isPaymentPage
          ? bgSVG[2].bgIcons
          : bgSVG[0].bgIcons}
        <svg
          className="next_step_arrow"
          width="38"
          height="99"
          viewBox="0 0 38 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L36.6208 48.1734C37.4353 49.2521 37.4279 50.7422 36.6027 51.8128L1 98"
            stroke="#E5E5E5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="next_step_arrow"
          width="38"
          height="99"
          viewBox="0 0 38 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L36.6208 48.1734C37.4353 49.2521 37.4279 50.7422 36.6027 51.8128L1 98"
            stroke="#E5E5E5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="next_step_arrow"
          width="38"
          height="99"
          viewBox="0 0 38 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L36.6208 48.1734C37.4353 49.2521 37.4279 50.7422 36.6027 51.8128L1 98"
            stroke="#E5E5E5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="next_step_arrow"
          width="38"
          height="99"
          viewBox="0 0 38 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L36.6208 48.1734C37.4353 49.2521 37.4279 50.7422 36.6027 51.8128L1 98"
            stroke="#E5E5E5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="step_number">
        <div className="number-wrapper">
          <span className="n-steps">1</span>
          <h3>Билеты</h3>
        </div>
      </div>

      <div className="step_number">
        <div className="number-wrapper">
          <span className="n-steps">2</span>
          <h3>Пассажиры</h3>
        </div>
      </div>

      <div className="step_number">
        <div className="number-wrapper">
          <span className="n-steps">3</span>
          <h3>Оплата</h3>
        </div>
      </div>

      <div className="step_number">
        <div className="number-wrapper">
          <span className="n-steps">4</span>
          <h3>Проверка</h3>
        </div>
      </div>
    </div>
  );
}
