import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { routeId } from "../Types/types";

const initialState: routeId = {
  routeId: "",
  coach_id_departure: "",
  coach_id_arrival: "",
};

export const getIdSlice = createSlice({
  name: "GetId",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.routeId = action.payload;
    },
    setCoachId: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        coach_id: string;
      }>
    ) => {
      if (action.payload.direction === "departure") {
        state.coach_id_departure = action.payload.coach_id;
      } else {
        state.coach_id_arrival = action.payload.coach_id;
      }
    },
  },
});

export const { setId, setCoachId } = getIdSlice.actions;
export default getIdSlice.reducer;
