import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedRoite } from "../Types/types";

const initialState: ISelectedRoite = {
  number_train: "Первый",
  duration_dep: {
    hours: 8,
    minutes: 0,
  },
  dataFrom_d: {
    year: 2024,
    month: "11",
    day: "11",
    hours: "8",
    minutes: "00",
  },
  dataTo_d: {
    year: 2024,
    month: "11",
    day: "11",
    hours: "8",
    minutes: "00",
  },
  city_info_from_departure: "Москва",
  city_info_to_departure: "Санкт-Петербург",
  railway_st_from_departure: "Курский вокзал",
  railway_st_to_departure: "Московский вокзал",
  _id: "",
};

export const selectedRouteSlice = createSlice({
  name: "selectedRoute",
  initialState,
  reducers: {
    setSelectedRoute: (state, action: PayloadAction<ISelectedRoite>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSelectedRoute } = selectedRouteSlice.actions;
export default selectedRouteSlice.reducer;
