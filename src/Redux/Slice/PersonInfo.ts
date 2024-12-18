import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonInfo } from "../Types/types";

const initialState: PersonInfo = {
  is_adult: true,
  first_name: "",
  last_name: "",
  patronymic: "",
  birthday: "",
  gender: true,
  document_type: "",
  document_data: "",
};

export const personInfodSlice = createSlice({
  name: "GetId",
  initialState,
  reducers: {
    setIs_adult: (state, action: PayloadAction<boolean>) => {
      state.is_adult = action.payload;
    },
    setFirst_name: (state, action: PayloadAction<string>) => {
      state.first_name = action.payload;
    },
    setLast_name: (state, action: PayloadAction<string>) => {
      state.last_name = action.payload;
    },
    setPatronymic: (state, action: PayloadAction<string>) => {
      state.patronymic = action.payload;
    },
    setBrithDay: (state, action: PayloadAction<string>) => {
      state.birthday = action.payload;
    },
    setGender: (state, action: PayloadAction<boolean>) => {
      state.gender = action.payload;
    },

    setDocument_type: (state, action: PayloadAction<string>) => {
      state.document_type = action.payload;
    },
    setDocument_data: (state, action: PayloadAction<string>) => {
      state.document_data = action.payload;
    },
  },
});

export const {
  setIs_adult,
  setFirst_name,
  setLast_name,
  setPatronymic,
  setGender,
  setDocument_type,
  setDocument_data,
  setBrithDay,
} = personInfodSlice.actions;
export default personInfodSlice.reducer;
