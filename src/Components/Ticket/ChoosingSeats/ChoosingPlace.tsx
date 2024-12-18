import { ISelectedRoite } from "../../../Redux/Types/types";
import { useEffect, useState } from "react";
import { CarriageTypeSecondClass } from "../CarriageTypeSecondClass";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setClassTypeArrival,
  setClassTypeDeparture,
} from "../../../Redux/Slice/ClassTypeStateSlice";
import { BtnSelectCarriageType } from "../BtnSelectCarriageType";
import { CarriageTypeThirdClass } from "../CarriageTypeThirdClass";
import { CarriageTypeFourthClass } from "../CarriageTypeFourthClass";
import { CarriageTypeFirstClass } from "../CarriageTypeFirstClass";
import TrainInfo from "./TrainIfo";
import { NumberPassangers } from "./NumberPassangers";
import { BtnBack } from "./BtnBack";
import { calculateTotalPrice } from "../../../Redux/Slice/totalPrice";
import "../../../styles/ChoosingPlace.scss";

interface ChoosingPlaceProps {
  selectedRoute: ISelectedRoite;
}

export const ChoosingPlace: React.FC<ChoosingPlaceProps> = ({
  selectedRoute,
}) => {
  const dispatch = useAppDispatch();

  const { arrivalClass, departureClass } = useAppSelector(
    (state) => state.ClassSeats
  );

  const {
    totalPrice14ClassDeparture,
    totalPrice2ClassDeparture,
    totalPrice3ClassDeparture,
  } = useAppSelector((state) => state.totalPrice);

  const {
    adults,
    children,
    isWifi,
    isLinens,
    priceClass,
    wifiPrice,
    linens_price,
    selectedSeats,
  } = useAppSelector((state) => state.NumberPassengers.departure);

  useEffect(() => {
    dispatch(
      calculateTotalPrice({
        adults: adults ?? 0,
        children: children ?? 0,
        isWifi,
        isLinens,
        priceClass,
        wifiPrice,
        linens_price,
        selectedSeats,
      })
    );
  }, [
    adults,
    children,
    isWifi,
    isLinens,
    priceClass,
    wifiPrice,
    linens_price,
    dispatch,
  ]);

  const routeArrival = useAppSelector((state) => state.selectedRoute);
  console.log(routeArrival);

  const departureDir = "departure";
  const arrivalDir = "arrival";

  const [buttonClassStatesDep, setButtonClassStatesDep] = useState({
    fourth_class: false,
    third_class: false,
    second_class: false,
    first_class: false,
  });

  const [buttonClassStatesArr, setButtonClassStatesArr] = useState({
    fourth_class: false,
    third_class: false,
    second_class: false,
    first_class: false,
  });

  const activateButtonDep = (buttonName: string) => {
    const trimmedClass = buttonName.split("_")[0];
    setButtonClassStatesDep({
      fourth_class: false,
      third_class: false,
      second_class: false,
      first_class: false,
      [buttonName]: true,
    });

    dispatch(setClassTypeDeparture(trimmedClass));
  };

  const activateButtonArr = (buttonName: string) => {
    const trimmedClass = buttonName.split("_")[0];
    setButtonClassStatesArr({
      fourth_class: false,
      third_class: false,
      second_class: false,
      first_class: false,
      [buttonName]: true,
    });

    dispatch(setClassTypeArrival(trimmedClass));
  };

  const displayedPrice =
    buttonClassStatesDep.first_class || buttonClassStatesDep.fourth_class
      ? totalPrice14ClassDeparture
      : buttonClassStatesDep.second_class
      ? totalPrice2ClassDeparture
      : buttonClassStatesDep.third_class
      ? totalPrice3ClassDeparture
      : null;

  const formatDisplayedPrice = displayedPrice
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <section className="ChoosingPlace-Wrapper">
      <div className="departure-choosing">
        <BtnBack />

        <TrainInfo
          direction={departureDir}
          id={selectedRoute._id}
          number_train={selectedRoute.number_train}
          city_info_from={selectedRoute.city_info_from_departure}
          city_info_to={selectedRoute.city_info_to_departure}
          duration={selectedRoute.duration_dep}
          dataFrom={selectedRoute.dataFrom_d}
          dataTo={selectedRoute.dataTo_d}
          railway_st_from={selectedRoute.railway_st_to_departure}
          railway_st_to={selectedRoute.railway_st_to_departure}
        />

        <NumberPassangers direction="departure" />
        <span className="line"></span>

        <BtnSelectCarriageType
          buttonClassStates={buttonClassStatesDep}
          activateButton={activateButtonDep}
        />

        {buttonClassStatesDep.first_class &&
          departureClass[0] !== undefined && (
            <CarriageTypeFirstClass direction="departure" />
          )}
        {buttonClassStatesDep.second_class &&
          departureClass[0] !== undefined && (
            <CarriageTypeSecondClass direction="departure" />
          )}
        {buttonClassStatesDep.third_class &&
          departureClass[0] !== undefined && (
            <CarriageTypeThirdClass direction="departure" />
          )}
        {buttonClassStatesDep.fourth_class &&
          departureClass[0] !== undefined && (
            <CarriageTypeFourthClass direction="departure" />
          )}

        <div className="total-cost">
          {formatDisplayedPrice !== "0" && (
            <span>
              {formatDisplayedPrice}
              <span>&#160;&#8381;</span>{" "}
            </span>
          )}
        </div>
      </div>
      {routeArrival._id_a && (
        <div className="arrival-choosing">
          <BtnBack />

          <TrainInfo
            direction={arrivalDir}
            id={selectedRoute._id_a}
            number_train={selectedRoute.number_train_a}
            city_info_from={selectedRoute.city_info_from_arrival}
            city_info_to={selectedRoute.city_info_to_arrival}
            duration={selectedRoute.duration_ar}
            dataFrom={selectedRoute.dataFrom_a}
            dataTo={selectedRoute.dataTo_a}
            railway_st_from={selectedRoute.railway_st_from_arival}
            railway_st_to={selectedRoute.railway_st_to_arival}
          />

          <NumberPassangers direction="arrival" />
          <span className="line"></span>

          <BtnSelectCarriageType
            buttonClassStates={buttonClassStatesArr}
            activateButton={activateButtonArr}
          />

          {buttonClassStatesArr.first_class &&
            arrivalClass[0] !== undefined && (
              <CarriageTypeFirstClass direction="arrival" />
            )}
          {buttonClassStatesArr.second_class &&
            arrivalClass[0] !== undefined && (
              <CarriageTypeSecondClass direction="arrival" />
            )}
          {buttonClassStatesArr.third_class &&
            arrivalClass[0] !== undefined && (
              <CarriageTypeThirdClass direction="arrival" />
            )}
          {buttonClassStatesArr.fourth_class &&
            arrivalClass[0] !== undefined && (
              <CarriageTypeFourthClass direction="arrival" />
            )}

          <div className="total-cost"></div>
        </div>
      )}
    </section>
  );
};
