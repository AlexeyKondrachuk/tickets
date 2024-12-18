import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Passenger, PassengerState } from "../Types/types";

const initialState: PassengerState = {
  passengers: [],
};

export const passengersSlice = createSlice({
  name: "passengers",
  initialState,
  reducers: {

    setPassengersRedux: (state, action: PayloadAction<Passenger>) => {
      state.passengers.push(action.payload);
    },
    resetPassengersRedux: () => initialState,
  },
});

export const { setPassengersRedux, resetPassengersRedux } =
  passengersSlice.actions;

export default passengersSlice.reducer;
