import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LastTicketsReducer from "../Redux/Slice/LasTicketsSlice";
import searchCityReducer from "../Redux/Slice/CitySearchSlice";
import searchMainFormReducer from "./Slice/MainFormSearchSlice";
import { searchCityApi } from "../Redux/fetchApi/ApiCity";
import priceValueReducer from "./Slice/priceRangeSlice";
import getIdSliceReducer from "./Slice/GetIdSlice";
import selectedRouteSliceReducer from "../Redux/Slice/SelectedRouteSlice";
import ClassSeatsSliceReducer from "./Slice/ClassSeatsSlice";
import classTypeReducer from "./Slice/ClassTypeStateSlice";
import NumberPassengersReducer from "./Slice/NumberPassengersSlice";
import totalPriceReducer from "./Slice/totalPrice";
import checkFormReducer from "./Slice/CheckFormSlice";
import userInfoReducer from "./Slice/userInfo";
import personInfoReducer from "./Slice/PersonInfo";
import passengersReducer from "./Slice/Passengers";
import checkPersonalInfoReducer from "./Slice/CheckPersonalInfo";
import isStatusQweryReducer from "./Slice/IsStatusQwery";

const rootReducer = combineReducers({
  LastTicketsReducer,
  searchMainForm: searchMainFormReducer,
  searchCity: searchCityReducer,
  priceValue: priceValueReducer,
  getId: getIdSliceReducer,
  selectedRoute: selectedRouteSliceReducer,
  ClassSeats: ClassSeatsSliceReducer,
  classType: classTypeReducer,
  NumberPassengers: NumberPassengersReducer,
  totalPrice: totalPriceReducer,
  checkFrorm: checkFormReducer,
  userInfo: userInfoReducer,
  personInfo: personInfoReducer,
  pasenger: passengersReducer,
  checkPersonalInfo: checkPersonalInfoReducer,
  isStatusQwery: isStatusQweryReducer,

  [searchCityApi.reducerPath]: searchCityApi.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchCityApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
