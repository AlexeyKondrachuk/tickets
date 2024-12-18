import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DirectionState } from "../Types/types";
import { RootState } from "../store";

interface PassengersState {
  departure: DirectionState;
  arrival: DirectionState;
}

const initialDirectionState: DirectionState = {
  adults: "",
  children: "",
  childrenNotSeat: 0,
  availableSeats: 0,
  selectedSeats: [],
  isWifi: false,
  isLinens: false,
  priceClass: [0, 0, 0, 0],
  wifiPrice: 0,
  linens_price: 0,
  disabledBtn: true,
};

const initialState: PassengersState = {
  departure: initialDirectionState,
  arrival: initialDirectionState,
};

const updateDisabledBtn = (state: PassengersState) => {
  // Получаем общее количество взрослых и детей для каждого направления
  const totalAdultsDeparture = Number(state.departure.adults);
  const totalChildrenDeparture = Number(state.departure.children);
  const totalPassengersDeparture =
    totalAdultsDeparture + totalChildrenDeparture;

  const totalAdultsArrival = Number(state.arrival.adults);
  const totalChildrenArrival = Number(state.arrival.children);
  const totalPassengersArrival = totalAdultsArrival + totalChildrenArrival;

  // Общее количество выбранных мест
  const totalSelectedSeats =
    state.departure.selectedSeats.length + state.arrival.selectedSeats.length;

  // Проверяем, есть ли хотя бы одно направление с пассажирами
  const hasPassengersDeparture = totalPassengersDeparture > 0;
  const hasPassengersArrival = totalPassengersArrival > 0;

  // Устанавливаем disabledBtn
  const isDisabled =
    (hasPassengersDeparture || hasPassengersArrival) &&
    totalPassengersDeparture + totalPassengersArrival !== totalSelectedSeats;

  // Устанавливаем состояние для обоих направлений
  state.departure.disabledBtn = !hasPassengersDeparture || isDisabled;
  state.arrival.disabledBtn = !hasPassengersArrival || isDisabled;
};

export const NumberPassengersSlice = createSlice({
  name: "NumberPassengers",
  initialState,
  reducers: {
    setAdults: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        value: number | "";
      }>
    ) => {
      const { direction, value } = action.payload;
      state[direction].adults = value;
      updateDisabledBtn(state);
    },
    setChildren: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        value: number | "";
      }>
    ) => {
      const { direction, value } = action.payload;
      state[direction].children = value;
      updateDisabledBtn(state);
    },
    setChildrenNotSeat: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        value: number | "";
      }>
    ) => {
      const { direction, value } = action.payload;
      state[direction].childrenNotSeat = value;
    },
    setWifiPrice: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        value: number;
      }>
    ) => {
      const { direction, value } = action.payload;
      state[direction].wifiPrice = value;
    },
    setLinensPrice: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        value: number;
      }>
    ) => {
      const { direction, value } = action.payload;
      state[direction].linens_price = value;
    },
    setIsWifi: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        value: boolean;
      }>
    ) => {
      const { direction, value } = action.payload;
      state[direction].isWifi = value;
    },

    setIsLinens: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        value: boolean;
      }>
    ) => {
      const { direction, value } = action.payload;
      state[direction].isLinens = value;
    },
    setPriceClass: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        index: number;
        value: number;
      }>
    ) => {
      const { direction, index, value } = action.payload;

      // Если индекс в пределах массива, обновляем элемент
      if (index >= 0 && index < state[direction].priceClass.length) {
        state[direction].priceClass = [
          ...state[direction].priceClass.slice(0, index), // Все элементы до индекса
          value, // Новый элемент по индексу
          ...state[direction].priceClass.slice(index + 1), // Все элементы после индекса
        ];
      }
    },
    setAvailableSeats: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        value: number;
      }>
    ) => {
      const { direction, value } = action.payload;
      state[direction].availableSeats = value;
    },
    setSelectedSeatsRedux: (
      state,
      action: PayloadAction<{
        direction: "departure" | "arrival";
        selectedSeats: number[];
      }>
    ) => {
      const { direction, selectedSeats } = action.payload;
      if (
        state[direction].adults === "" ||
        state[direction].adults === null ||
        state[direction].adults === undefined
      ) {
        state[direction].selectedSeats = [];
      } else {
        state[direction].selectedSeats = selectedSeats;
      }

      updateDisabledBtn(state);
    },
  },
});

export const selectTotalPassengers = (state: RootState): number => {
  const { adults, children, childrenNotSeat } =
    state.NumberPassengers.departure;
  // Приведение значений к числу
  return (
    Number(adults || 0) + Number(children || 0) + Number(childrenNotSeat || 0)
  );
};

export const {
  setAdults,
  setChildren,
  setChildrenNotSeat,
  setWifiPrice,
  setIsWifi,
  setIsLinens,
  setLinensPrice,
  setPriceClass,
  setAvailableSeats,
  setSelectedSeatsRedux,
} = NumberPassengersSlice.actions;

export default NumberPassengersSlice.reducer;
