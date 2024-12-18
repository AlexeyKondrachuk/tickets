import { DirectionsInfoProps } from "../../../Redux/Types/types";
import "../../../styles/DirectionsInfo.scss";

export const DirectionsInfo: React.FC<DirectionsInfoProps> = ({
  number_train,
  duration,
  dataFrom,
  dataTo,
  city_info_from,
  city_info_to,
  railway_st_from,
  railway_st_to,
  direction,
}) => {
  const station = "вокзал";

  return (
    <div className="directioninfo-wrapper">
      <div className="number_train-wrapper">
        <h4>№ Поезда</h4>
        <span>{number_train}</span>
      </div>

      <div className="name_ditections-wrapper">
        <h4>Название</h4>
        <div className="directions-info">
          <span>{city_info_from}</span>
          <span>{city_info_to}</span>
        </div>
      </div>

      <div className="all_time-wrapper">
        <div className="time_departure-wrapper">
          <div className="time_and_data-wrapper">
            <h4>
              {dataFrom?.hours}:{dataFrom?.minutes}
            </h4>
            <span>
              {dataFrom?.day}.{dataFrom?.month}.{dataFrom?.year}
            </span>
          </div>
        </div>

        <div className="duration_and_direction">
          <h4>
            {duration?.hours}:{duration?.minutes}
          </h4>
          <svg
            className={direction === "arrival" ? "direction_arrival" : ""}
            width="30"
            height="20"
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3627 20C19.3627 17.8073 19.3627 15.3821 19.3627 12.8239C12.8621 12.8239 6.46582 12.8239 0 12.8239C0 11.0299 0 9.36877 0 7.57475C6.32677 7.57475 12.7231 7.57475 19.3279 7.57475C19.3279 4.91694 19.3279 2.42525 19.3279 0C22.9432 3.3887 26.5238 6.77741 30 10.0664C26.5585 13.2558 22.9432 16.6445 19.3627 20Z"
              fill="#FFA800"
            />
          </svg>
        </div>

        <div className="time_departure-wrapper">
          <div className="time_and_data-wrapper">
            <h4 className="arrival_time">
              {dataTo?.hours}:{dataTo?.minutes}
            </h4>
            <span>
              {dataTo?.day}.{dataTo?.month}.{dataTo?.year}
            </span>
          </div>
        </div>
      </div>

      <div className="from_to_directions-wrapper">
        <div className="from_info_direction">
          <h4 className="city">{city_info_from}</h4>
          <span className="from-station">
            {`${railway_st_from} ${station}`}
          </span>
        </div>
        <div className="to_info_direction">
          <h4 className="city">{city_info_to}</h4>
          <span className="to-station">{`${railway_st_to} ${station}`}</span>
        </div>
      </div>
    </div>
  );
};
