import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClassTypeState {
  classTypeDeparture: string;
  classTypeArrival: string; // Хранит активный класс как строку
}

const initialState: ClassTypeState = {
  classTypeDeparture: "second",
  classTypeArrival: "",
};

const classTypeSlice = createSlice({
  name: "classType",
  initialState,
  reducers: {
    setClassTypeDeparture: (state, action: PayloadAction<string>) => {
      state.classTypeDeparture = action.payload;
    },
    setClassTypeArrival: (state, action: PayloadAction<string>) => {
      state.classTypeArrival = action.payload;
    },
  },
});

// Экспортируем actions и reducer
export const { setClassTypeDeparture, setClassTypeArrival } =
  classTypeSlice.actions;
export default classTypeSlice.reducer;
