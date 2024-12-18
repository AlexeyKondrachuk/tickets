import { useLocation } from "react-router-dom";
import HeaderStepsImg from "../../assets/image_stepsLayout.png";
import OrderPageImage from "../../assets/information_backgraund.png";
import FormSearch from "../HomePageComponents/FormSearch";
import Logo from "../HomePageComponents/Logo";
import Menu from "../HomePageComponents/Menu";
import Steps from "./Steps";
import { useAppSelector } from "../../hooks/redux";

import "../../styles/HeaderStepsPages.scss";

export default function HeaderStepsPages() {
  const { routeId } = useAppSelector((state) => state.getId);
  const location = useLocation();
  const isOrderPath =
    location.pathname === `/tickets/${routeId}/passengers/payment/check/order`;

  return (
    <header
      className={!isOrderPath ? `${"header-steps"}` : `${"header_orderPage"}`}
    >
      <Logo />
      <Menu />
      {!isOrderPath ? (
        <div>
          <img
            className="image_header"
            src={HeaderStepsImg}
            alt="Header Steps Image"
          />
          <FormSearch />
          <Steps />{" "}
        </div>
      ) : (
        <img
          className="image_header_order"
          src={OrderPageImage}
          alt="Order Page Image"
        />
      )}
    </header>
  );
}
