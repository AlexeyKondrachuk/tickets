import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { itemsCarriageResponce } from "../Types/types";

export interface ICoachs {
  departureClass: itemsCarriageResponce[];
  arrivalClass: itemsCarriageResponce[];
}

const initialState: ICoachs = {
  departureClass: [],
  arrivalClass: [],
};

export const ClassSeatsSlice = createSlice({
  name: "ClassSeats",
  initialState,
  reducers: {
    setClassSeatsDeparture: (
      state,
      action: PayloadAction<itemsCarriageResponce[]>
    ) => {
      state.departureClass = action.payload;
    },
    setClassSeatsArrival: (
      state,
      action: PayloadAction<itemsCarriageResponce[]>
    ) => {
      state.arrivalClass = action.payload;
    },
  },
});

export const { setClassSeatsDeparture, setClassSeatsArrival } =
  ClassSeatsSlice.actions;
export default ClassSeatsSlice.reducer;
