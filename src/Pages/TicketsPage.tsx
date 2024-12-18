import { useEffect, useState } from "react";
import FilterTickets from "../Components/TicketsPageComponents/FilterTickets";
import { RouteItem } from "../Components/TicketsPageComponents/RouteItem";
import SortItems from "../Components/TicketsPageComponents/SortItems";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchLastTickets } from "../Redux/fetchApi/fetckLustTickets";
import { useSearchMainFormQuery } from "../Redux/fetchApi/ApiCity";
import PaginatedList from "../Components/TicketsPageComponents/pagination";
import { LastTikets } from "../Components/TicketsPageComponents/LastTikets";
import { setIsLoading } from "../Redux/Slice/IsStatusQwery";
import { MessageInfo } from "../Components/messageTooltip/MessageInfo";
import "../styles/TicketsPage.scss";

export default function TicketsPage() {
  const dispatch = useAppDispatch();

  const searchParams = useAppSelector((state) => state.searchMainForm);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: itemsTickets,
    error,
    isLoading,
  } = useSearchMainFormQuery(searchParams, {
    skip: !searchParams.from_city_id && !searchParams.to_city_id,
  });

  useEffect(() => {
    if (!isLoading) {
      dispatch(setIsLoading(false));
    }

    if (error) {
      const errorMessage =
        "status" in error
          ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
          : error.message || "An unknown error occurred";
      setErrorMessage("Нет ответа от сервера, повторите попытку позже");
      console.error("Произошла ошибка:", errorMessage);
    }
  }, [isLoading, error, dispatch]);

  useEffect(() => {
    dispatch(fetchLastTickets());
  }, []);

  const count = () => {
    if (itemsTickets?.total_count === undefined) {
      return 0;
    } else return itemsTickets?.total_count;
  };

  const handlerClose = () => {
    setErrorMessage(null);
  };

  console.log(itemsTickets);

  return (
    <section className="ticketspage">
      {errorMessage !== null && (
        <MessageInfo
          onClose={handlerClose}
          message={errorMessage}
          type="error"
        />
      )}

      <div>
        <FilterTickets />
        <LastTikets />
      </div>

      <div className="page_wrapper">
        <SortItems total_count={count()} />
        <div className="items-Tickets-wrapper">
          {itemsTickets?.items.map((item) => (
            <RouteItem
              key={item.departure._id}
              _id={item.departure._id}
              _id_a={item.arrival?._id}
              number_train_a={item.arrival?.train.name}
              number_train={item.departure.train.name}
              dataTimeFrom_d={item.departure.from.datetime}
              dataTimeTo_d={item.departure.to.datetime}
              dataTimeFrom_a={item.arrival?.from.datetime}
              dataTimeTo_a={item.arrival?.to.datetime}
              duration_d={item.departure.duration}
              duration_a={item.arrival?.duration}
              city_info_from_departure={item.departure.from.city.name}
              city_info_to_departure={item.departure.to.city.name}
              city_info_from_arrival={item.arrival?.from.city.name}
              city_info_to_arrival={item.arrival?.to.city.name}
              railway_st_from_departure={
                item.departure.from.railway_station_name
              }
              railway_st_to_departure={item.departure.to.railway_station_name}
              railway_st_from_arival={item.arrival?.from.railway_station_name}
              railway_st_to_arival={item.arrival?.to.railway_station_name}
              first_seat_type={item.available_seats_info.first}
              second_seat_type={item.available_seats_info.second}
              third_seat_type={item.available_seats_info.third}
              fourth_seat_type={item.available_seats_info.fourth}
              min_first_seat_type_price_d={
                item.departure.price_info.first?.bottom_price
              }
              min_second_seat_type_price_d={
                item.departure.price_info.second?.bottom_price
              }
              min_third_seat_type_price_d={
                item.departure.price_info.third?.bottom_price
              }
              min_fourth_seat_type_price_d={
                item.departure.price_info.fourth?.bottom_price
              }
              min_first_seat_type_price_a={
                item.arrival?.price_info.first?.bottom_price
              }
              min_second_seat_type_price_a={
                item.arrival?.price_info.second?.bottom_price
              }
              min_third_seat_type_price_a={
                item.arrival?.price_info.third?.bottom_price
              }
              min_fourth_seat_type_price_a={
                item.arrival?.price_info.fourth?.bottom_price
              }
            />
          ))}
        </div>
        <div className="pagination">
          <PaginatedList total_count={count()} />
        </div>
      </div>
    </section>
  );
}
