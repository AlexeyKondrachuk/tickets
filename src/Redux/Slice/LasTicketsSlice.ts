import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicket, Status } from "../Types/types";
import { fetchLastTickets } from "../fetchApi/fetckLustTickets";

interface Ticket {
  LastTicket: ITicket[];
  status: Status;
}

const initialState: Ticket = {
  LastTicket: [],
  status: Status.null,
};

const lastTicketsSlice = createSlice({
  name: "lastTickets",
  initialState,
  reducers: {
    setTickets(state, action) {
      state.LastTicket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLastTickets.pending, (state, _action) => {
      state.status = Status.LOADING;
    });

    builder.addCase(
      fetchLastTickets.fulfilled,
      (state, action: PayloadAction<ITicket[]>) => {
        state.LastTicket = action.payload;
        state.status = Status.SUCCESS;
      }
    );

    builder.addCase(fetchLastTickets.rejected, (state, _action) => {
      state.status = Status.ERROR;
      state.LastTicket = [];
    });
  },
});

export const { setTickets } = lastTicketsSlice.actions;
export default lastTicketsSlice.reducer;
