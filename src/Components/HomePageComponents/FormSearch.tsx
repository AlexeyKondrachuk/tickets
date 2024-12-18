import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useFromQuery, useToQuery } from "../../Redux/fetchApi/ApiCity";
import {
  setCitySearchFrom,
  setCitySearchFromId,
  setCitySearchTo,
  setCitySearchToId,
} from "../../Redux/Slice/CitySearchSlice";
import {
  setIdFrom,
  setIdTo,
  setDateFrom,
  setDateTo,
} from "../../Redux/Slice/MainFormSearchSlice";
import useClickOutside from "../../hooks/useClickOutside";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";

import CustomDatePicker from "./CostumDatePicker";
import { MessageInfo } from "../messageTooltip/MessageInfo";
import Arrows from "../../assets/arrows.png";
import "../../styles/FormSearch.scss";

registerLocale("ru", ru);

type City = {
  _id: string;
  name: string;
};

export default function FormSearch() {
  const location = useLocation();

  const [localSt, setlocalSt] = useState<boolean>(false);
  const [citiesFrom, setCitiesFrom] = useState<Array<City>>([]);
  const [citiesTo, setCitiesTo] = useState<Array<City>>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname !== "/") {
      setlocalSt(true);
    } else {
      setlocalSt(false);
    }
  }, [location.pathname]);

  const dispatch = useAppDispatch();
  const { searchCityFrom, searchCityTo } = useAppSelector(
    (state) => state.searchCity
  );

  const [inputValueFrom, setInputValueFrom] = useState<string>(searchCityFrom);
  const [inputValueTo, setInputValueTo] = useState<string>(searchCityTo);

  const [showDropDownFrom, setShowDropdownFrom] = useState(false);

  const [showDropDownTo, setShowDropdownTo] = useState(false);

  const [isSwapped, setIsSwapped] = useState<boolean>(false);

  const containerRefFrom = useRef<HTMLDivElement | null>(null);
  const containerRefTo = useRef<HTMLDivElement | null>(null);

  const searchParams = useAppSelector((state) => state.searchMainForm);

  const {
    data: dataFrom,
    error: errorFrom,
    isLoading: isLoadingFrom,
  } = useFromQuery(inputValueFrom || "", {
    skip: !inputValueFrom,
  });

  const {
    data: dataTo,
    error: errorTo,
    isLoading: isLoadingTo,
  } = useToQuery(inputValueTo || "", {
    skip: !inputValueTo,
  });

  const navigate = useNavigate();

  const handleInputFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueFrom(e.target.value);
  };

  const handleInputTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueTo(e.target.value);
  };

  const handleDateFrom = (date: Date | null) => {
    if (date) {
      dispatch(setDateFrom(date.toISOString().split("T")[0])); // ISO строка для сохранения формата YYYY-MM-DD
    } else {
      dispatch(setDateFrom("")); // Очищаем дату
    }
  };

  const handleDateTo = (date: Date | null) => {
    if (date) {
      dispatch(setDateTo(date.toISOString().split("T")[0]));
    } else {
      dispatch(setDateTo("")); // Очищаем дату
    }
  };

  const handleCitySelectFrom = (city: string, id: string) => {
    dispatch(setCitySearchFrom(city));
    dispatch(setCitySearchFromId(id));
    setInputValueFrom(city);
    dispatch(setIdFrom(id));
    setShowDropdownFrom(false);
  };

  const handleCitySelectTo = (city: string, id: string) => {
    dispatch(setCitySearchTo(city));
    dispatch(setCitySearchToId(id));
    setInputValueTo(city);
    dispatch(setIdTo(id));
    setShowDropdownTo(false);
  };

  console.log(searchCityFrom, searchCityTo);

  const handlerClose = () => {
    setErrorMessage(null);
  };

  const handlerSearchTickets = () => {
    if (inputValueFrom && inputValueTo) {
      navigate("tickets");
    } else {
      setErrorMessage("Выберите город отправления и прибытия");
    }
  };

  useClickOutside(containerRefFrom, () => setShowDropdownFrom(false));
  useClickOutside(containerRefTo, () => setShowDropdownTo(false));

  useEffect(() => {
    if (inputValueFrom === "") {
      setShowDropdownFrom(false);
    } else if (inputValueFrom !== searchCityFrom && dataFrom?.length > 0) {
      setShowDropdownFrom(true);
    } else if (inputValueFrom === searchCityFrom) {
      setShowDropdownFrom(false);
    }
  }, [inputValueFrom, searchCityFrom, dataFrom]);

  useEffect(() => {
    if (inputValueTo === "") {
      setShowDropdownTo(false);
    } else if (inputValueTo !== searchCityTo && dataTo?.length > 0) {
      setShowDropdownTo(true);
    } else if (inputValueTo === searchCityTo) {
      setShowDropdownTo(false);
    }
  }, [inputValueTo, searchCityTo, dataTo]);

  useEffect(() => {
    if (Array.isArray(dataFrom)) {
      const filteredAndSortedCities = [...dataFrom]

        .filter((city) =>
          city.name.startsWith(inputValueFrom?.toLocaleLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      setCitiesFrom(filteredAndSortedCities);
    }
  }, [dataFrom, inputValueFrom]);

  useEffect(() => {
    if (Array.isArray(dataTo)) {
      const filteredAndSortedCities = [...dataTo]

        .filter((city) =>
          city.name.startsWith(inputValueTo?.toLocaleLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      setCitiesTo(filteredAndSortedCities);
    }
  }, [dataTo, inputValueTo]);

  return (
    <section
      className={!localSt ? "form-search-ticket" : "form-search-ticket_page"}
    >
      {errorMessage !== null && (
        <MessageInfo
          onClose={handlerClose}
          message={errorMessage}
          type="info"
        />
      )}
      <form
        action=""
        className={!localSt ? "main-form" : "main-form_ticket_page"}
      >
        <label
          htmlFor=""
          className={!localSt ? "form-label-text" : "form-label-text_page"}
        >
          Направление
          <div
            className="input-wrapper"
            style={{ flexDirection: isSwapped ? "row-reverse" : "row" }}
          >
            <div className="input_from">
              <svg
                width="21"
                height="30"
                viewBox="0 0 21 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4669 30C7.57111 26.692 5.0677 23.2905 2.99398 19.59C1.76095 17.4034 0.696068 15.1606 0.229013 12.6936C-0.574321 8.41378 0.733433 4.82543 4.18964 2.20891C7.66452 -0.407596 11.5131 -0.706626 15.3429 1.3492C19.2101 3.40503 21.0597 6.8065 20.8541 11.1798C20.7981 12.5254 20.4245 13.8898 19.9387 15.1606C17.865 20.7301 14.3341 25.365 10.4669 30ZM10.4295 6.8065C8.37445 6.8065 6.69305 8.48854 6.71173 10.5444C6.71173 12.6002 8.39313 14.2822 10.4482 14.2822C12.5032 14.2822 14.1846 12.6002 14.1846 10.5444C14.1659 8.48854 12.5032 6.8065 10.4295 6.8065Z"
                  fill="#E5E5E5"
                />
              </svg>

              <input
                className="input_city-value"
                type="text"
                placeholder="Откуда"
                onInput={handleInputFrom}
                value={inputValueFrom}
                name="inputValueFrom"
                autoComplete="off"
                required
              />
              {showDropDownFrom && (
                <div ref={containerRefFrom} className="city-list-wrapper">
                  {isLoadingFrom && <p>Загрузка...</p>}
                  {errorFrom && <p>Ошибка: {(errorFrom as any).message}</p>}

                  {citiesFrom.length > 0 && (
                    <>
                      <div className="first-city">
                        <span>{citiesFrom[0].name}</span>
                      </div>
                      <ul>
                        {citiesFrom.map((city) => (
                          <li
                            key={city._id}
                            onClick={() =>
                              handleCitySelectFrom(city.name, city._id)
                            }
                          >
                            {city.name}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="replace-input"
              onClick={() => setIsSwapped(!isSwapped)}
            >
              <img src={Arrows} alt="Arrows" />
            </button>

            <div className="input_from">
              <svg
                width="21"
                height="30"
                viewBox="0 0 21 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4669 30C7.57111 26.692 5.0677 23.2905 2.99398 19.59C1.76095 17.4034 0.696068 15.1606 0.229013 12.6936C-0.574321 8.41378 0.733433 4.82543 4.18964 2.20891C7.66452 -0.407596 11.5131 -0.706626 15.3429 1.3492C19.2101 3.40503 21.0597 6.8065 20.8541 11.1798C20.7981 12.5254 20.4245 13.8898 19.9387 15.1606C17.865 20.7301 14.3341 25.365 10.4669 30ZM10.4295 6.8065C8.37445 6.8065 6.69305 8.48854 6.71173 10.5444C6.71173 12.6002 8.39313 14.2822 10.4482 14.2822C12.5032 14.2822 14.1846 12.6002 14.1846 10.5444C14.1659 8.48854 12.5032 6.8065 10.4295 6.8065Z"
                  fill="#E5E5E5"
                />
              </svg>

              <input
                className="input_city-value"
                type="text"
                placeholder="Куда"
                onInput={handleInputTo}
                value={inputValueTo}
                name="inputValueTo"
                autoComplete="off"
                required
              />
              {showDropDownTo && (
                <div ref={containerRefTo} className="city-list-wrapper">
                  {isLoadingTo && <p>Загрузка...</p>}
                  {errorTo && <p>Ошибка: {(errorTo as any).message}</p>}

                  {citiesTo.length > 0 && (
                    <>
                      <div className="first-city">
                        <span>{citiesTo[0].name}</span>
                      </div>
                      <ul className="city-list">
                        {citiesTo.map((city) => (
                          <li
                            key={city._id}
                            onClick={() =>
                              handleCitySelectTo(city.name, city._id)
                            }
                            className="city-item"
                          >
                            {city.name}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </label>

        <label
          htmlFor=""
          className={!localSt ? "form-label-text" : "form-label-text_page"}
        >
          Дата
          <div className="input-wrapper" id="date">
            <CustomDatePicker
              selectedDate={
                searchParams.date_start
                  ? new Date(searchParams.date_start)
                  : null
              }
              onChange={handleDateFrom}
              placeholder={!localSt ? "ДД/ММ/ГГ" : ""}
              locale="ru"
              className="custom-input"
            />

            <CustomDatePicker
              selectedDate={
                searchParams.date_end ? new Date(searchParams.date_end) : null
              }
              onChange={handleDateTo}
              placeholder={!localSt ? "ДД/ММ/ГГ" : ""}
              locale="ru"
              className="custom-input"
            />
          </div>
        </label>

        <div className="btn-search-tickets-wrapper">
          <button
            type="button"
            className="btn-search"
            onClick={handlerSearchTickets}
          >
            найти билеты
          </button>
        </div>
      </form>
    </section>
  );
}
