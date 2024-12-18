import carriage from "../../assets/4class.png";
import { useEffect, useState } from "react";
import { selectedProps } from "../../Redux/Types/types";
import { completeSeatsArray } from "../../utils/completeSeatsArray";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSelectedSeatsRedux } from "../../Redux/Slice/NumberPassengersSlice";
import { MessageInfo } from "../messageTooltip/MessageInfo";
import "../../styles/carriageFourthClass.scss";

export const CarriageFourthClass: React.FC<selectedProps> = ({
  selectedCoach,
  taken,
  carriageNum,
  direction,
}) => {
  const dispatch = useAppDispatch();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { adults, children, childrenNotSeat } = useAppSelector(
    (state) => state.NumberPassengers[direction]
  );
  const totalPassengers =
    Number(adults) + Number(children) + Number(childrenNotSeat);
  const seatsData = completeSeatsArray(selectedCoach.seats ?? [], 62); 

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
    <div className="sheme">
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

      {/* Схема сидений */}
      <div className="seats_sheme_Fourth">
        {/* Первые 16 мест */}
        <div className="top_section">
          {Array.from({ length: 8 }, (_, rowIndex) => (
            <div className="seat_row_top_section" key={rowIndex}>
              {[2, 4, 1, 3].map((offset) => {
                const seatNumber = rowIndex * 4 + offset;
                const seat = seatsData[seatNumber - 1];
                return (
                  <button
                    key={seatNumber}
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
                );
              })}
            </div>
          ))}
        </div>
        <div className="bottom_section">
          {/* Секция с местами 33, 34, 35 */}
          <div className="seat_row_bottom_section">
            {[33, 34, 35].map((seatNumber) => {
              const seat = seatsData[seatNumber - 1];
              return (
                <button
                  key={seatNumber}
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
              );
            })}
          </div>

          {/* Секции с 36 по 59 */}
          {Array.from({ length: 6 }, (_, sectionIndex) => (
            <div
              className="seat_row_bottom_section-center"
              key={sectionIndex + 9}
            >
              {[
                36 + sectionIndex * 4,
                38 + sectionIndex * 4,
                37 + sectionIndex * 4,
                39 + sectionIndex * 4,
              ].map((seatNumber) => {
                const seat = seatsData[seatNumber - 1];
                return (
                  <button
                    key={seatNumber}
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
                );
              })}
            </div>
          ))}

          {/* Секция с местами 60, 61, 62 */}
          <div className="seat_row_right_section">
            {[60, 61, 62].map((seatNumber) => {
              const seat = seatsData[seatNumber - 1];
              return (
                <button
                  key={seatNumber}
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
              );
            })}
          </div>
        </div>
      </div>
      <div className="scheme-img">
        <img src={carriage} alt="схема вагона" />
        <div className="carriage-num">{carriageNum}</div>
      </div>
    </div>
  );
};
