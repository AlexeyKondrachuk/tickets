import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейс состояния для поискового термина
interface SearchCityState {
  searchCityFrom: string;
  searchCityTo: string;
  searchCityFromId: string;
  searchCityToId: string;
}

// Начальное состояние
const initialState: SearchCityState = {
  searchCityFrom: "",
  searchCityTo: "",
  searchCityFromId: "",
  searchCityToId: "",
};

// Создаем слайс
export const searchCitySlice = createSlice({
  name: "searchCity",
  initialState,
  reducers: {
    setCitySearchFrom: (state, action: PayloadAction<string>) => {
      state.searchCityFrom = action.payload;
    },
    setCitySearchTo: (state, action: PayloadAction<string>) => {
      state.searchCityTo = action.payload;
    },
    setCitySearchFromId: (state, action: PayloadAction<string>) => {
      state.searchCityFromId = action.payload;
    },
    setCitySearchToId: (state, action: PayloadAction<string>) => {
      state.searchCityToId = action.payload;
    },
  },
});

export const {
  setCitySearchFrom,
  setCitySearchTo,
  setCitySearchFromId,
  setCitySearchToId,
} = searchCitySlice.actions;
export default searchCitySlice.reducer;
