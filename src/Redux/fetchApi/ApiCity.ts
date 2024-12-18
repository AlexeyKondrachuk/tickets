import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ISeatQueryParams,
  SearchCityResponseFrom,
  SearchCityResponseTo,
  itemsCarriageResponce,
  itemsTicketsResponce,
} from "../Types/types";
import { SearchMainForm } from "../Types/types";

export const searchCityApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://students.netoservices.ru/fe-diplom",
  }),

  endpoints: (builder) => ({
    from: builder.query<SearchCityResponseFrom, string>({
      query: (searchCityFrom) => `/routes/cities?name=${searchCityFrom}`,
    }),
    to: builder.query<SearchCityResponseTo, string>({
      query: (searchCityTo) => `/routes/cities?name=${searchCityTo}`,
    }),
    searchMainForm: builder.query<itemsTicketsResponce, SearchMainForm>({
      query: (searchParams) => ({
        url: "/routes",
        params: searchParams,
      }),
    }),
    getSeats: builder.query<itemsCarriageResponce[], ISeatQueryParams>({
      query: (params) => ({
        url: `/routes/${params.id}/seats`,
        params,
      }),
    }),

    subscribe: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `/subscribe`,
        method: "POST",
        params: { email }, // Передаем email в параметры запроса
      }),
    }),

    orderTickets: builder.mutation<void, any>({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData, // Отправляем данные заказа
      }),
    }),
  }),
});

export const {
  useFromQuery,
  useToQuery,
  useSearchMainFormQuery,
  useGetSeatsQuery,
  useSubscribeMutation,
  useOrderTicketsMutation,
} = searchCityApi;
