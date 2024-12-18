import carriage from "../../assets/1class.png";
import { useEffect, useState } from "react";
import { selectedProps } from "../../Redux/Types/types";
import { completeSeatsArray } from "../../utils/completeSeatsArray";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSelectedSeatsRedux } from "../../Redux/Slice/NumberPassengersSlice";
import { MessageInfo } from "../messageTooltip/MessageInfo";
import "../../styles/carriageLux.scss";

export const CarriageFirstClass: React.FC<selectedProps> = ({
  selectedCoach,
  taken,
  carriageNum,
  direction,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const { adults, children, childrenNotSeat } = useAppSelector(
    (state) => state.NumberPassengers[direction]
  );
  const totalPassengers =
    Number(adults) + Number(children) + Number(childrenNotSeat);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const seatsData = completeSeatsArray(selectedCoach.seats ?? [], 18);

  // Обработчик выбора места
  const handleSeatClick = (seatNumber: number) => {
    if (totalPassengers === 0) {
      setErrorMessage("Укажите необходимое количество билетов");
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((num) => num !== seatNumber)
        : [...prevSelectedSeats, seatNumber];

      return newSelectedSeats;
    });
  };

  useEffect(() => {
    if (selectedSeats.length > 0) {
      dispatch(setSelectedSeatsRedux({ direction, selectedSeats }));
    } else {
      dispatch(setSelectedSeatsRedux({ direction, selectedSeats: [] }));
    }
  }, [selectedSeats, dispatch, direction]);

  const handlerClose = () => {
    setErrorMessage(null);
  };

  return (
    <div className="scheme">
      {errorMessage !== null && (
        <MessageInfo
          onClose={handlerClose}
          message={errorMessage}
          type="info"
        />
      )}
      <div className="notification">
        <p>{taken} человек выбирают места в этом поезде</p>
      </div>
      <div className="seats_sheme_lux">
        {Array.from({ length: 8 }, (_, rowIndex) => (
          <div className="cell" key={rowIndex}>
            {Array.from({ length: 2 }, (_, seatIndex) => {
              const seatNumber = rowIndex * 2 + seatIndex + 1;
              const seat = seatsData[seatNumber - 1];

              return (
                <div className={`seat_n${seatIndex + 1}`} key={seatIndex}>
                  <button
                    onClick={() => handleSeatClick(seatNumber)}
                    style={{
                      backgroundColor: seat.available ? "#F7F6F6" : "grey",
                      cursor: seat.available ? "pointer" : "not-allowed",
                      border: selectedSeats.includes(seatNumber)
                        ? "2px solid #FFA800"
                        : "none",
                      color: seat.available ? "black" : "white",
                    }}
                    disabled={!seat.available}
                  >
                    {seat.index}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="scheme-img">
        <img src={carriage} alt="схема вагона" />
        <div className="carriage-num">{carriageNum}</div>
      </div>
    </div>
  );
};
