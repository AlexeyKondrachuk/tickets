import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { routeId } from "../Types/types";

const initialState: routeId = {
  routeId: "",
  coach_id_departure: "",
};

export const getIdSlice = createSlice({
  name: "GetId",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.routeId = action.payload;
    },
  },
});

export const { setId } = getIdSlice.actions;
export default getIdSlice.reducer;
