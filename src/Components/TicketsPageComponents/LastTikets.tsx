import { LastTicketItem } from "./LastTicketItem";
import { ITicket } from "../../Redux/Types/types";
import { useAppSelector } from "../../hooks/redux";
import "../../styles/LastTickets.scss";

export const LastTikets = () => {
  const tickets: ITicket[] = useAppSelector(
    (state) => state.LastTicketsReducer.LastTicket
  );
  return (
    <div>
      <div className="title-lastTickts">
        <h3>последние билеты</h3>
      </div>

      <div className="lastTickets-wrapper">
        {tickets.map((item) => (
          <LastTicketItem
            key={item.departure._id}
            fromCity={item.departure.from.city.name}
            toCity={item.departure.to.city.name}
            railway_station_from={item.departure.from.railway_station_name}
            railway_station_to={item.departure.to.railway_station_name}
            min_price={item.min_price}
          />
        ))}
      </div>
    </div>
  );
};
