import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface priceValue {
  minValuePrice: number;
  maxValuePrice: number;
}

const initialState: priceValue = {
  minValuePrice: 300,
  maxValuePrice: 7000,
};

export const priceValueSlice = createSlice({
  name: "priceValue",
  initialState,
  reducers: {
    setMinValue: (state, action: PayloadAction<number>) => {
      state.minValuePrice = action.payload;
    },
    setMaxValue: (state, action: PayloadAction<number>) => {
      state.maxValuePrice = action.payload;
    },
  },
});

export const { setMinValue, setMaxValue } = priceValueSlice.actions;
export default priceValueSlice.reducer;
