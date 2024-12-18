import { useNavigate } from "react-router-dom";
import { CheckPayType } from "../Components/CheckPageComponents/CheckPayType";
import PassengersPersonInfo from "../Components/CheckPageComponents/PassengersPersonInfo";
import { TrainInfo } from "../Components/CheckPageComponents/TrainInfo";
import { DetailsTrip } from "../Components/PassengersPageComponents/DetailsTrip/DetailsTrip";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useOrderTicketsMutation } from "../Redux/fetchApi/ApiCity";
import { useState } from "react";
import { MessageInfo } from "../Components/messageTooltip/MessageInfo";
import { resetPassengersRedux } from "../Redux/Slice/Passengers";
import "../styles/chekPage.scss";

export const CheckPage = () => {
  const [orderTickets, { isLoading }] = useOrderTicketsMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { routeId } = useAppSelector((state) => state.getId);
  const orderData = useAppSelector((state) => state.userInfo);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handelConfirmClick = async () => {
    try {
      await orderTickets(orderData).unwrap();
      navigate(`/tickets/${routeId}/passengers/payment/check/order`);
      dispatch(resetPassengersRedux());
    } catch (error) {
      setErrorMessage(
        "Произошла ошибка при отправке заказа. Попробуйте ещё раз."
      );
      console.error("Failed to send order:", error);
    }
  };

  const handlerClose = () => {
    setErrorMessage(null);
  };
  console.log(errorMessage);
  return (
    <section className="checkPage-wrapper">
      {errorMessage !== null && (
        <MessageInfo
          onClose={handlerClose}
          message={errorMessage}
          type="error"
        />
      )}
      <DetailsTrip />

      <div className="infoCheck-wrapper">
        <TrainInfo />
        <PassengersPersonInfo />
        <CheckPayType />
        <button className="buy-steps" onClick={handelConfirmClick}>
          Подтвердить
        </button>
      </div>
    </section>
  );
};
