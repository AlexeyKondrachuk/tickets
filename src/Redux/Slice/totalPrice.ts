import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateClassPrice } from "../../utils/calculateClassPrice";
import { ItotalPrice } from "../Types/types";

const initialState: ItotalPrice = {
  totalPrice14ClassDeparture: 0,
  adultsPrice14ClassDeparture: 0,
  childrenPrice14ClassDeparture: 0,

  totalPrice2ClassDeparture: 0,
  totalPriceAdults2ClassDeparture: 0,
  totalPriceChildren2ClassDeparture: 0,

  totalPrice3ClassDeparture: 0,
  totalPriceAdults3ClassDeparture: 0,
  totalPriceChildren3ClassDeparture: 0,
};

const totalPriceSlice = createSlice({
  name: "totalPrice",
  initialState,
  reducers: {
    calculateTotalPrice: (
      state,
      action: PayloadAction<{
        adults: number | "";
        children: number | "";
        isWifi: boolean;
        isLinens: boolean;
        priceClass: number[];
        wifiPrice: number;
        linens_price: number;
        selectedSeats: number[];
      }>
    ) => {
      const {
        adults,
        children,
        isWifi,
        isLinens,
        priceClass,
        wifiPrice,
        linens_price,
        selectedSeats,
      } = action.payload;

      if (!priceClass || priceClass.length === 0) {
        console.error("Error: priceClass is not provided or is empty");
        return;
      }

      const numberAdults = typeof adults === "number" ? adults : 0;
      const numberChildren = typeof children === "number" ? children : 0;

      const {
        totalPrice14Class,
        priceAdults14Class,
        priceChildren14Class,
        totalPrice2Class,
        priceAdults2Class,
        priceChildren2Class,
        totalPrice3Class,
        priceAdults3Class,
        priceChildren3Class,
      } = calculateClassPrice(
        selectedSeats,
        priceClass,
        numberAdults,
        numberChildren,
        isWifi,
        isLinens,
        wifiPrice,
        linens_price
      );

      state.totalPrice14ClassDeparture = totalPrice14Class;
      state.adultsPrice14ClassDeparture = priceAdults14Class;
      state.childrenPrice14ClassDeparture = priceChildren14Class;

      state.totalPrice2ClassDeparture = totalPrice2Class;
      state.totalPriceAdults2ClassDeparture = priceAdults2Class;
      state.totalPriceChildren2ClassDeparture = priceChildren2Class;

      state.totalPrice3ClassDeparture = totalPrice3Class;
      state.totalPriceAdults3ClassDeparture = priceAdults3Class;
      state.totalPriceChildren3ClassDeparture = priceChildren3Class;
    },
  },
});

export const { calculateTotalPrice } = totalPriceSlice.actions;
export default totalPriceSlice.reducer;
