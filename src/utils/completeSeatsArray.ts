import { ISeat } from "../Redux/Types/types";

export function completeSeatsArray(seats: ISeat[], totalSeats: number): ISeat[] {
    const seatMap = new Map<number, boolean>();
  
    
    seats.forEach(seat => seatMap.set(seat.index, seat.available));
  
    const completedSeats: ISeat[] = [];
  
    for (let i = 1; i <= totalSeats; i++) {
      if (seatMap.has(i)) {
        completedSeats.push({ index: i, available: seatMap.get(i)! });
      } else {
        completedSeats.push({ index: i, available: false });
      }
    }
  
    return completedSeats;
  }