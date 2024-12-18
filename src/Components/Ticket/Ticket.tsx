import { useEffect } from "react";
import FilterTickets from "../TicketsPageComponents/FilterTickets";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchLastTickets } from "../../Redux/fetchApi/fetckLustTickets";
import {
  ISeatQueryParams,
  itemsCarriageResponce,
} from "../../Redux/Types/types";
import { ChoosingPlace } from "./ChoosingSeats/ChoosingPlace";
import { useGetSeatsQuery } from "../../Redux/fetchApi/ApiCity";
import {
  setClassSeatsArrival,
  setClassSeatsDeparture,
} from "../../Redux/Slice/ClassSeatsSlice";
import { LastTikets } from "../TicketsPageComponents/LastTikets";
import { useNavigate } from "react-router-dom";
import "../../styles/Ticket.scss";

export const Ticket = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLastTickets());
  }, []);

  const { routeId } = useAppSelector((state) => state.getId);
  const selectedRoute = useAppSelector((state) => state.selectedRoute);
  const disabledBtnD = useAppSelector(
    (state) => state.NumberPassengers.departure.disabledBtn
  );
  const disabledBtnA = useAppSelector(
    (state) => state.NumberPassengers.arrival.disabledBtn
  );
  const { classTypeDeparture, classTypeArrival } = useAppSelector(
    (state) => state.classType
  );

  const queryParamsSeats: ISeatQueryParams = {
    id: routeId,
    have_first_class: undefined,
    have_second_class: undefined,
    have_third_class: undefined,
    have_fourth_class: undefined,
    have_wifi: undefined,
    have_air_conditioning: undefined,
    have_express: undefined,
  };

  const { data, error, isLoading } = useGetSeatsQuery(queryParamsSeats);

  console.log(data);
  function filterCoachesByClass(
    data: itemsCarriageResponce[],
    classType: string
  ): itemsCarriageResponce[] {
    return data.filter((item) => item.coach.class_type === classType);
  }

  const handleNextClick = () => {
    navigate(`/tickets/${routeId}/passengers`); // Navigate to the new URL
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredDeparture: itemsCarriageResponce[] = filterCoachesByClass(
        data,
        classTypeDeparture
      );
      const filteredAriival: itemsCarriageResponce[] = filterCoachesByClass(
        data,
        classTypeArrival
      );
      console.log("Class Coaches:", filteredDeparture);
      dispatch(setClassSeatsDeparture(filteredDeparture));
      dispatch(setClassSeatsArrival(filteredAriival));
    } else {
      console.log("No data available");
    }
  }, [data, classTypeDeparture, classTypeArrival, dispatch]);

  return (
    <section className="wrapper-ticket">
      <aside className="asside-wrapper">
        <FilterTickets />
        <LastTikets />
      </aside>
      <section className="selectSeats-wrapper">
        <h3 className="select-title">Выбор мест</h3>
        <ChoosingPlace selectedRoute={selectedRoute} />
        <button
          className="next-steps"
          disabled={disabledBtnD && disabledBtnA}
          onClick={handleNextClick}
        >
          далее
        </button>
      </section>
    </section>
  );
};
