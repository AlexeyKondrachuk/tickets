import { useAppSelector } from "../../../hooks/redux";
import { priceFormat } from "../../../utils/priceFormat";
import { DirectionsInfo } from "./DirectionsInfo";
import { Info } from "./Info";
import { QuantityPass } from "./QuantityPass";
import "../../../styles/DetailsTrip.scss";

export const DetailsTrip = () => {
  const routeInfo = useAppSelector((state) => state.selectedRoute);
  const {
    totalPrice14ClassDeparture,
    totalPrice2ClassDeparture,
    totalPrice3ClassDeparture,
  } = useAppSelector((state) => state.totalPrice);
  const { classTypeDeparture } = useAppSelector((state) => state.classType);

  const formattedNumber = priceFormat(classTypeDeparture, {
    totalPrice14ClassDeparture,
    totalPrice2ClassDeparture,
    totalPrice3ClassDeparture,
  });

  return (
    <aside className="details_trip-wrapper">
      <h3>детали поездки</h3>

      <span className="space"></span>

      <Info title="Туда" dateDirections={routeInfo?.dataFrom_d}>
        <DirectionsInfo
          number_train={routeInfo.number_train}
          duration={routeInfo.duration_dep}
          dataFrom={routeInfo.dataFrom_d}
          dataTo={routeInfo.dataTo_d}
          city_info_from={routeInfo.city_info_from_departure}
          city_info_to={routeInfo.city_info_to_departure}
          railway_st_from={routeInfo.railway_st_from_departure}
          railway_st_to={routeInfo.railway_st_to_departure}
          direction="departure"
        />
      </Info>

      <span className="space"></span>

      {routeInfo.dataFrom_a && (
        <Info title="Обратно" dateDirections={routeInfo.dataFrom_a}>
          <DirectionsInfo
            number_train={routeInfo?.number_train_a}
            duration={routeInfo?.duration_ar}
            dataFrom={routeInfo?.dataFrom_a}
            dataTo={routeInfo.dataTo_a}
            city_info_from={routeInfo.city_info_from_arrival}
            city_info_to={routeInfo.city_info_to_arrival}
            railway_st_from={routeInfo.railway_st_from_arival}
            railway_st_to={routeInfo.railway_st_to_arival}
            direction="arrival"
          />
        </Info>
      )}

      <Info title="Пассажиры" dateDirections={undefined}>
        <QuantityPass />
      </Info>

      <span className="space"></span>

      <div className="total_price-wrapper">
        <h4 className="total_price__title">итог</h4>
        <span>
          {formattedNumber}
          <span> &#8381;</span>
        </span>
      </div>
    </aside>
  );
};
