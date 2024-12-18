export interface ITicket {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  available_seats: number;
  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
  departure: DepartureDetails;
  arrival?: ArrivalDetails;
}

export interface DepartureDetails {
  _id: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  duration: number; // in seconds
  available_seats: number;
  available_seats_info: {
    second: number;
    third: number;
  };
  train: {
    _id: string;
    name: string;
  };
  from: LocationDetails;
  to: LocationDetails;
  price_info: PriceInfo;
}

export interface ArrivalDetails {
  _id: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  duration: number; // in seconds
  available_seats: number;
  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
  train: {
    _id: string;
    name: string;
  };
  from: LocationDetails;
  to: LocationDetails;
  price_info: PriceInfo;
}

export interface LocationDetails {
  railway_station_name: string;
  city: {
    _id: string;
    name: string;
  };
  datetime: number; // timestamp
}

export interface PriceInfo {
  first?: {
    top_price?: number;
    bottom_price?: number;
    side_price?: number;
  };
  second?: {
    top_price?: number;
    side_price?: number;
    bottom_price?: number;
  };
  third?: {
    top_price?: number;
    bottom_price?: number;
    side_price?: number;
  };
  fourth?: {
    top_price?: number;
    bottom_price?: number;
    side_price?: number;
  };
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
  null = "",
}

export interface LastTicketProps {
  fromCity: string;
  toCity: string;
  railway_station_from: string;
  railway_station_to: string;
  min_price: number;
}

interface SearchCityResultFrom {
  _id: string;
  name: string;
}

interface SearchCityResultTo {
  _id: string;
  name: string;
}

export interface SearchCityResponseFrom {
  sort(arg0: (a: any, b: any) => any): unknown;
  map(
    arg0: (city: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  results: SearchCityResultFrom[];
  length: any;
}

export interface SearchCityResponseTo {
  map(
    arg0: (city: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  results: SearchCityResultTo[];
  length: any;
}

export interface SearchMainForm {
  from_city_id: string;
  to_city_id: string;
  date_start?: string;
  date_end?: string;
  date_start_arrival?: string;
  date_end_arrival?: string;
  have_first_class?: boolean;
  have_second_class?: boolean;
  have_third_class?: boolean;
  have_fourch_class?: boolean;
  have_wifi?: boolean;
  have_air_conditioning?: boolean;
  have_express?: boolean;
  price_from?: number;
  price_to?: number;
  start_departure_hour_from?: number;
  start_departure_hour_to?: number;
  start_arrival_hour_from?: number;
  start_arrival_hour_to?: number;
  end_departure_hour_from?: number;
  end_departure_hour_to?: number;
  end_arrival_hour_from?: number;
  end_arrival_hour_to?: number;
  limit: number;
  offset: number;
  sort: string;
}

export interface itemsTicketsResponce {
  items: ITicket[];
  total_count: number;
}

export interface ItemsTicketsProps {
  _id: string;
  _id_a?: string;
  number_train: string;
  number_train_a?: string;
  dataTimeFrom_d: number;
  dataTimeTo_d: number;
  dataTimeFrom_a: number | undefined;
  dataTimeTo_a: number | undefined;
  duration_d: number;
  duration_a: number | undefined;
  city_info_from_departure: string;
  city_info_to_departure: string;
  city_info_from_arrival: string | undefined;
  city_info_to_arrival: string | undefined;
  railway_st_from_departure: string;
  railway_st_to_departure: string;
  railway_st_from_arival: string | undefined;
  railway_st_to_arival: string | undefined;
  first_seat_type: number | undefined;
  second_seat_type: number | undefined;
  third_seat_type: number | undefined;
  fourth_seat_type: number | undefined;
  min_first_seat_type_price_d: number | undefined;
  min_first_seat_type_price_a?: number;
  min_second_seat_type_price_d: number | undefined;
  min_second_seat_type_price_a?: number;
  min_third_seat_type_price_d: number | undefined;
  min_third_seat_type_price_a?: number | undefined;
  min_fourth_seat_type_price_d: number | undefined;
  min_fourth_seat_type_price_a?: number;
}

export interface routeId {
  routeId: string;
  coach_id_departure: string;
  coach_id_arrival?: string;
}

export interface ISeatQueryParams {
  id: string;
  have_first_class?: boolean; // Пример значений
  have_second_class?: boolean;
  have_third_class?: boolean;
  have_fourth_class?: boolean;
  have_wifi?: true;
  have_air_conditioning?: true;
  have_express?: false;
}

export interface ISeat {
  index: number;
  available: boolean;
}

export interface itemsCarriageResponce {
  coach: Coach;
  seats: ISeat[];
}

interface Duration {
  hours: number;
  minutes: number;
}

export interface IDate {
  year: number;
  month: string;
  day: string;
  hours: string;
  minutes: string;
}

export interface ISelectedRoite {
  _id: string;
  _id_a?: string;
  number_train: string;
  number_train_a?: string;
  duration_dep: Duration;
  dataFrom_d: IDate | undefined;
  dataTo_d: IDate | undefined;
  dataFrom_a?: IDate;
  dataTo_a?: IDate;
  city_info_from_departure: string;
  city_info_to_departure: string;
  city_info_from_arrival?: string;
  city_info_to_arrival?: string;
  railway_st_from_departure: string;
  railway_st_to_departure: string;
  railway_st_from_arival?: string;
  railway_st_to_arival?: string;
  duration_ar?: Duration;
  // min_first_seat_type_price_d?: number;
  // min_second_seat_type_price_d?: number;
  // min_third_seat_type_price_d?: number;
  // min_fourth_seat_type_price_d?: number;

  first_class_price_d?: string;
  second_class_price_d?: string;
  third_class_price_d?: string;
  fouth_class_price_d?: string;

  first_seat_type?: number;
  second_seat_type?: number;
  third_seat_type?: number;
  fourth_seat_type?: number;
}

export interface TrainInfoProps {
  direction: string;
  id?: string;
  number_train?: string;
  duration?: Duration;
  dataFrom?: IDate;
  dataTo?: IDate;
  city_info_from?: string;
  city_info_to?: string;
  railway_st_from?: string;
  railway_st_to?: string;
}

export interface Coach {
  _id: string;
  name: string;
  class_type: "first" | "second" | "third" | "fourth" | null; 
  have_air_conditioning: boolean;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  is_linens_included: boolean;
  available_seats: number;
  train: string;
}

export interface selectedProps {
  selectedCoach: itemsCarriageResponce;
  taken: number;
  carriageNum: number;
  direction: "arrival" | "departure";
}

export interface CarriageTypeClassProps {
  direction: "arrival" | "departure";
}

export interface CoachWithSeats {
  coach: Coach;
  seats: ISeat[];
}

export type TrainCoaches = CoachWithSeats[];

export interface ServiceState {
  condicioner: boolean;
  wifi: boolean;
  bedlinen: boolean;
  cofe: boolean;
}

export interface TooltipState {
  tooltip1: boolean;
  tooltip2: boolean;
  tooltip3: boolean;
  tooltip4: boolean;
}

export interface DirectionState {
  adults: number | "";
  children?: number | "";
  childrenNotSeat?: number | "";
  availableSeats: number;
  isWifi: boolean;
  isLinens: boolean;
  priceClass: number[];
  wifiPrice: number;
  linens_price: number;
  selectedSeats: number[];
  disabledBtn: boolean;
}

export interface DirectionsInfoProps {
  number_train?: string;
  duration?: Duration;
  dataFrom?: IDate;
  dataTo?: IDate;
  city_info_from?: string;
  city_info_to?: string;
  railway_st_from?: string;
  railway_st_to?: string;
  direction: "arrival" | "departure";
}

export interface ItotalPrice {
  totalPrice14ClassDeparture: number;
  adultsPrice14ClassDeparture: number;
  childrenPrice14ClassDeparture: number;

  totalPrice2ClassDeparture: number;
  totalPriceAdults2ClassDeparture: number;
  totalPriceChildren2ClassDeparture: number;

  totalPrice3ClassDeparture: number;
  totalPriceAdults3ClassDeparture: number;
  totalPriceChildren3ClassDeparture: number;
}

export interface UserDetails {
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  payment_method: "cash" | "online" | undefined;
}

export interface PersonInfo {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  birthday: string;
  gender: boolean;
  document_type: string;
  document_data: string;
}

export interface Passenger {
  personInfo: PersonInfo;
}

export interface PassengerState {
  passengers: Passenger[];
}

export interface Seat {
  coach_id: string;
  person_info: PersonInfo;
  seat_number: number;
  is_child: boolean;
  includes_children_seat: boolean;
}

export interface TicketsDirection {
  route_direction_id: string;
  seats: Seat[];
}

export interface UserState {
  user: UserDetails;
  departure: TicketsDirection;
  arrival?: TicketsDirection;
}
