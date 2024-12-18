import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchMainForm } from "../Types/types";



const initialState: SearchMainForm = {
  from_city_id: "",
  to_city_id: "",
  date_start: "",
  date_end: "",
  date_start_arrival: "",
  date_end_arrival: "",
  have_first_class: false,
  have_second_class: true,
  have_third_class: false,
  have_fourch_class: false,
  have_wifi: false,
  have_air_conditioning: undefined,
  have_express: false,
  price_from: undefined,
  price_to: undefined,
  start_departure_hour_from: undefined,
  start_departure_hour_to: undefined,
  start_arrival_hour_from: undefined,
  start_arrival_hour_to: undefined,
  end_departure_hour_from: undefined,
  end_departure_hour_to: undefined,
  end_arrival_hour_from: undefined,
  end_arrival_hour_to: undefined,
  limit: 5,
  offset: 0,
  sort: "date",
};

// Создаем слайс
export const searchMainFormSlice = createSlice({
  name: "searchMainForm",
  initialState,
  reducers: {
    setIdFrom: (state, action: PayloadAction<string>) => {
      state.from_city_id = action.payload;
    },
    setIdTo: (state, action: PayloadAction<string>) => {
      state.to_city_id = action.payload;
    },
    setDateFrom: (state, action: PayloadAction<string>) => {
      state.date_start = action.payload;
    },
    setDateTo: (state, action: PayloadAction<string>) => {
      state.date_end = action.payload;
    },

    setHaveFirstClass: (state, action: PayloadAction<boolean>) => {
      state.have_first_class = action.payload;
    },
    setHaveSecondClass: (state, action: PayloadAction<boolean>) => {
      state.have_second_class = action.payload;
    },
    setHaveThirdClass: (state, action: PayloadAction<boolean>) => {
      state.have_third_class = action.payload;
    },
    setHaveFourchClass: (state, action: PayloadAction<boolean>) => {
      state.have_fourch_class = action.payload;
    },
    setHaveWifi: (state, action: PayloadAction<boolean>) => {
      state.have_wifi = action.payload;
    },
    setHaveExpress: (state, action: PayloadAction<boolean>) => {
      state.have_express = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setPrice_from: (state, action: PayloadAction<number>) => {
      state.price_from = action.payload;
    },
    setPrice_to: (state, action: PayloadAction<number>) => {
      state.price_to = action.payload;
    },
  },
});

export const {
  setIdFrom,
  setIdTo,
  setDateFrom,
  setDateTo,
  setHaveFirstClass,
  setHaveSecondClass,
  setHaveThirdClass,
  setHaveFourchClass,
  setHaveWifi,
  setHaveExpress,
  setLimit,
  setOffset,
  setSort,
  setPrice_from,
  setPrice_to,
} = searchMainFormSlice.actions;

export default searchMainFormSlice.reducer;
