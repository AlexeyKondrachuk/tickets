import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Passenger, UserDetails, UserState } from "../Types/types";

const initialState: UserState = {
  user: {
    first_name: "",
    last_name: "",
    patronymic: "",
    phone: "",
    email: "",
    payment_method: undefined,
  },
  departure: {
    route_direction_id: "",
    seats: [],
  },
  arrival: {
    route_direction_id: "",
    seats: [],
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<Partial<UserDetails>>) {
      state.user = {
        ...state.user,
        ...action.payload,
        phone: action.payload.phone
          ? `+7${action.payload.phone.replace(/\s+/g, "")}`
          : state.user.phone,
      };
    },
    setId_Departue(state, action: PayloadAction<string>) {
      if (state.departure) {
        state.departure.route_direction_id = action.payload;
      }
    },
    setId_Arrival(state, action: PayloadAction<string>) {
      if (state.arrival) {
        state.arrival.route_direction_id = action.payload;
      }
    },
    copyPassengersToSeats(
      state,
      action: PayloadAction<{
        passengers: Passenger[];
        coach_id: string;
        seatNumbers: number[];
      }>
    ) {
      if (state.departure) {
        const { passengers, coach_id, seatNumbers } = action.payload;
        const seatCount = seatNumbers.length;

        state.departure.seats = passengers.map((passenger, index) => ({
          coach_id: coach_id,
          person_info: passenger.personInfo,
          seat_number: seatNumbers[index % seatCount],
          is_child: !passenger.personInfo.is_adult,
          includes_children_seat: false,
        }));
      }
    },
    resetUserInfo: () => initialState,
  },
});

export const {
  setUserInfo,
  setId_Departue,
  setId_Arrival,
  copyPassengersToSeats,
  resetUserInfo,
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
