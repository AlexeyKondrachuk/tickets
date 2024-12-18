import { ISeat } from "../Redux/Types/types";

export const processSeats = (seats: ISeat[]) => {
    // Фильтрация доступных мест
    const availableSeats = seats.filter(seat => seat.available);
  
    // Разделение на четные и нечетные индексы
    const evenIndexSeats = availableSeats.filter(seat => seat.index % 2 === 0);
    const oddIndexSeats = availableSeats.filter(seat => seat.index % 2 !== 0);
  
    // Возврат объекта с результатами
    return {
      availableCount: availableSeats.length,
      evenIndexSeats,
      oddIndexSeats,
    };
  };