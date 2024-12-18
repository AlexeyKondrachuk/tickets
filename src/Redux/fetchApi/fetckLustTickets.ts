import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITicket } from "../Types/types";

export const fetchLastTickets = createAsyncThunk(
  "LastTickets/fetchLastTickets",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<ITicket[]>(
        "https://students.netoservices.ru/fe-diplom/routes/last"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Не удалось загрузить билеты");
    }
  }
);
