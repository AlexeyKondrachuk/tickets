import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { processSeats } from "../../utils/processSeats";
import { useEffect, useState } from "react";
import { Services } from "./Services";
import { CarriageFirstClass } from "./CarriageFirstClass";
import { CarriageTypeClassProps } from "../../Redux/Types/types";
import {
  setAvailableSeats,
  setLinensPrice,
  setPriceClass,
  setWifiPrice,
} from "../../Redux/Slice/NumberPassengersSlice";
import { setCoachId } from "../../Redux/Slice/GetIdSlice";
import "../../styles/CarriageClass.scss";

export const CarriageTypeFirstClass: React.FC<CarriageTypeClassProps> = ({
  direction,
}) => {
  const { arrivalClass, departureClass } = useAppSelector(
    (state) => state.ClassSeats
  );
  const seatsDeparture = useAppSelector(
    (state) => state.NumberPassengers.departure.selectedSeats
  );
  const [selectedCoachIndex, setSelectedCoachIndex] = useState<number>(0);

  const dispatch = useAppDispatch();
  const selectedDep = direction === "arrival" ? arrivalClass : departureClass;

  const selectedCoach = selectedDep[selectedCoachIndex];

  const wifiPrice = selectedCoach.coach.wifi_price;
  const linens_price = selectedCoach.coach.linens_price;

  console.log(selectedCoach.coach._id);

  const conditioning = selectedCoach.coach.have_air_conditioning;
  const wifi = selectedCoach.coach.have_wifi;
  const linens = selectedCoach.coach.is_linens_included;

  const result = processSeats(selectedCoach?.seats ?? []);
  const taken = 18 - result.availableCount;

  useEffect(() => {
    dispatch(setAvailableSeats({ direction, value: result.availableCount }));
  }, [result.availableCount, direction, dispatch]);

  const Price = selectedCoach.coach.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  useEffect(() => {
    dispatch(
      setCoachId({
        direction: direction === "departure" ? "departure" : "arrival",
        coach_id: selectedCoach.coach._id,
      })
    );
    dispatch(setWifiPrice({ direction, value: wifiPrice }));
    dispatch(setLinensPrice({ direction, value: linens_price }));
    dispatch(
      setPriceClass({
        direction: "departure",
        index: 0,
        value: selectedCoach.coach.price,
      })
    );
  }, [direction, selectedCoach, seatsDeparture]);
  console.log(direction, selectedCoach);

  const formattedIndex = (selectedCoachIndex + 1).toString().padStart(2, "0");

  return (
    <div className="carriage">
      <div className="selected_carriage">
        <h3>
          Вагоны
          {selectedDep &&
            selectedDep.map((items, index) => (
              <button
                key={items.coach._id}
                className="selected"
                onClick={() => setSelectedCoachIndex(index)}
                style={{
                  color: selectedCoachIndex === index ? "#fff" : "#000",
                }}
              >
                {index + 1}
              </button>
            ))}
        </h3>{" "}
        <p>Нумерация вагонов начинается с головы поезда</p>
      </div>

      <div className="carriage_wrapper">
        <div className="number_carriage">
          <span className="carriage_nbr">{formattedIndex}</span>
          <span>вагон</span>
        </div>

        <div className="parameters-wrapper">
          <div className="seats">
            <h4>
              Места <span>{result.availableCount}</span>
            </h4>
          </div>

          <div className="cost">
            <h4>Стоимость</h4>

            <span>{Price} &#8381;</span>
          </div>

          <div className="service">
            <h4>Обслуживание ФПК</h4>
            <Services
              conditioning={conditioning}
              wifi={wifi}
              linens={linens}
              direction={direction}
            />
          </div>
        </div>
      </div>

      <CarriageFirstClass
        selectedCoach={selectedCoach}
        taken={taken}
        carriageNum={selectedCoachIndex + 1}
        direction={direction}
      />
    </div>
  );
};
