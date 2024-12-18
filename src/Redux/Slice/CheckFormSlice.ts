import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FormState {
  formId: number;
  isCheckValid: boolean;
}

interface CheckFormState {
  checkForms: FormState[];
}

const initialState: CheckFormState = {
  checkForms: [{ formId: 1, isCheckValid: false }],
};

const checkFormSlice = createSlice({
  name: "checkForms",
  initialState,
  reducers: {
    addFormCheckValid: (state, action: PayloadAction<boolean>) => {
      const formId = state.checkForms.length + 1;
      state.checkForms.push({ formId, isCheckValid: action.payload });
    },

    removeFormCheckValid: (state, action: PayloadAction<number>) => {
      state.checkForms = state.checkForms.filter(
        (form) => form.formId !== action.payload
      );
    },

    setFormCheckValid: (
      state,
      action: PayloadAction<{ formId: number; isValid: boolean }>
    ) => {
      const form = state.checkForms.find(
        (form) => form.formId === action.payload.formId
      );
      if (form) {
        form.isCheckValid = action.payload.isValid;
      }
    },

    resetCheckForms: () => initialState,
  },
});

export const selectIsButtonDisabled = (state: RootState): boolean => {
  // Явная типизация параметра form
  return state.checkFrorm.checkForms.some(
    (form: FormState) => !form.isCheckValid
  );
};

export const {
  addFormCheckValid,
  removeFormCheckValid,
  setFormCheckValid,
  resetCheckForms,
} = checkFormSlice.actions;
export default checkFormSlice.reducer;
