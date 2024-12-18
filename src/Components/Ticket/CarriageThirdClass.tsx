import carriage from '../../assets/3class.png'
import {  useEffect, useMemo, useState } from 'react';
import { selectedProps } from '../../Redux/Types/types';
import { completeSeatsArray } from '../../utils/completeSeatsArray';

import '../../styles/carriagePlazkart.scss'
import { setSelectedSeatsRedux } from '../../Redux/Slice/NumberPassengersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { MessageInfo } from '../messageTooltip/MessageInfo';





export const CarriageThirdClass: React.FC<selectedProps> = ({
  selectedCoach,
  taken,
  carriageNum,
  direction
}) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Состояние выбранных мест
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {adults, children, childrenNotSeat} = useAppSelector((state) => state.NumberPassengers[direction])
  const totalPassengers = Number(adults)  + Number(children) + Number(childrenNotSeat)
  const seatsData = useMemo(() => completeSeatsArray(selectedCoach.seats ?? [], 48), [
    selectedCoach.seats 
  ]);

  // Обработчик клика по месту
  const handleSeatClick = (seatNumber: number) => { 

    if (totalPassengers === 0) {
      setErrorMessage('Укажите необходимое количество билетов');
       return; 
     }

    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((num) => num !== seatNumber) // Удаление из списка выбранных
        : [...prevSelectedSeats, seatNumber]; // Добавление в список

      // Обновление состояния в Redux
    
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
    setErrorMessage(null)
 }

  return (
    <div className="scheme">
      {errorMessage !== null && 
        <MessageInfo onClose={handlerClose}
                     message={errorMessage}
                     type='info'
        />}
      <div className="notification">
        <p>{taken} человек выбирают места в этом поезде</p>
      </div>

      <div className="seats_sheme_plazkart">
        {/* Левая часть: Секции 1–32 */}
        <div className="left-section">
          {Array.from({ length: 8 }, (_, sectionIndex) => (
            <div className="seat-section" key={sectionIndex}>
              {/** Порядок мест внутри секции */}
              {[2, 4, 1, 3].map((offset) => {
                const seatNumber = sectionIndex * 4 + offset;
                const seat = seatsData[seatNumber - 1];

                return (
                  <button className='btn3class'
                    key={seatNumber}
                    onClick={() => handleSeatClick(seatNumber)}
                    style={{
                      backgroundColor: seat.available ? '#F7F6F6' : 'grey',
                      cursor: seat.available ? 'pointer' : 'not-allowed',
                      // color: selectedSeats.includes(seatNumber) ? 'black' : 'white',
                      border: selectedSeats.includes(seatNumber) ? '2px solid #FFA800' : 'none',
                      color: seat.available ? 'black' : 'white'
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

        {/* Нижняя часть: Места 33–48 */}
        <div className="bottom-section">
          {Array.from({ length: 16 }, (_, seatIndex) => {
            const seatNumber = 32 + seatIndex + 1;
            const seat = seatsData[seatNumber - 1];

            return (
              <button className='btn3classSide'
                key={seatIndex}
                onClick={() => handleSeatClick(seatNumber)}
                style={{
                  backgroundColor: seat.available ? '#F7F6F6' : 'grey',
                  cursor: seat.available ? 'pointer' : 'not-allowed',
                  // color: selectedSeats.includes(seatNumber) ? 'black' : 'white',
                  border: selectedSeats.includes(seatNumber) ? '2px solid #FFA800' : 'none',
                  color: seat.available ? 'black' : 'white'
                }}
                disabled={!seat.available}
              >
                {seat.index}
              </button>
            );
          })}
        </div>
      </div>

      <div className="scheme-img">
        <img src={carriage} alt="схема вагона" />
        <div className="carriage-num">{carriageNum}</div>
      </div>
    </div>
  );
};
