import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "../../styles/payType.scss";

export const CheckPayType = () => {
  const navigate = useNavigate();

  const typePayment = useAppSelector(
    (state) => state.userInfo.user.payment_method
  );
  const routeId = useAppSelector((state) => state.getId.routeId);
  const payTitle = typePayment === "cash" ? "Наличными" : "Онлайн";

  const handelChangeClick = () => {
    navigate(`/tickets/${routeId}/passengers/payment/`);
  };

  return (
    <div className="payType-wrapper">
      <div className="passengersInfo_title-wrapper">
        <h4>Способ оплаты</h4>
      </div>
      <div className="payment_type_info">
        <span>{payTitle}</span>
        <button className="check_update-btn" onClick={handelChangeClick}>
          Изменить
        </button>
      </div>
    </div>
  );
};
