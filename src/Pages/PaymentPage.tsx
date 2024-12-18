import { DetailsTrip } from "../Components/PassengersPageComponents/DetailsTrip/DetailsTrip";
import { PersonaIinfo } from "../Components/PaymentPageComponent/PersonaIinfo";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { copyPassengersToSeats } from "../Redux/Slice/userInfo";
import { useEffect } from "react";
import "../styles/payment_page.scss";

export const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const validity = useAppSelector(
    (state) => state.checkPersonalInfo.validityState
  );
  const { routeId } = useAppSelector((state) => state.getId);
  const passArray = useAppSelector((state) => state.pasenger.passengers);
  const coach_id = useAppSelector((state) => state.getId.coach_id_departure);
  const numbers_seats = useAppSelector(
    (state) => state.NumberPassengers.departure.selectedSeats
  );

  useEffect(() => {
    if (passArray.length > 0) {
      dispatch(
        copyPassengersToSeats({
          passengers: passArray,
          coach_id: coach_id,
          seatNumbers: numbers_seats,
        })
      );
    }
  }, [passArray, coach_id]);

  const handelNextClick = () => {
    navigate(`/tickets/${routeId}/passengers/payment/check`);
  };

  return (
    <section className="payment_page-wrapper">
      <DetailsTrip />

      <div className="section_info-wrapper">
        <PersonaIinfo />
        <button
          className="buy-steps"
          onClick={handelNextClick}
          disabled={!validity}
        >
          Купить билеты
        </button>
      </div>
    </section>
  );
};
