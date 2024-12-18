import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsStarusQwery {
  isLoading: boolean;
  isError: string | undefined;
}

const initialState: IsStarusQwery = {
  isLoading: false,
  isError: undefined,
};

export const IsStarusQwerySlice = createSlice({
  name: "IsStarusQwery",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action: PayloadAction<string>) => {
      state.isError = action.payload;
    },
  },
});

export const { setIsLoading, setIsError } = IsStarusQwerySlice.actions;
export default IsStarusQwerySlice.reducer;
