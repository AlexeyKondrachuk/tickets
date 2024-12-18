import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface validate {
  validityState: boolean;
}

const initialState: validate = {
  validityState: false,
};

export const ckeckPesonInfoSlice = createSlice({
  name: "ckeckPesonInfo",
  initialState,
  reducers: {
    setValidityState: (state, action: PayloadAction<boolean>) => {
      state.validityState = action.payload;
    },
    resetCheckPersonInfo: () => initialState,
  },
});

export const { setValidityState, resetCheckPersonInfo } =
  ckeckPesonInfoSlice.actions;
export default ckeckPesonInfoSlice.reducer;
