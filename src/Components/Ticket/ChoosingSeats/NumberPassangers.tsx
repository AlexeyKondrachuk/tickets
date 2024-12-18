import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setAdults,
  setChildren,
  setChildrenNotSeat,
} from "../../../Redux/Slice/NumberPassengersSlice";

interface NumberPassengersProps {
  direction: "arrival" | "departure";
}

export const NumberPassangers: React.FC<NumberPassengersProps> = ({
  direction,
}) => {
  const dispatch = useAppDispatch();
  const { adults, availableSeats, children, childrenNotSeat } = useAppSelector(
    (state) => state.NumberPassengers[direction]
  );

  useEffect(() => {
    if (availableSeats === 0) {
      dispatch(setChildren({ direction, value: "" })); // Обнуляем детей, если мест нет
    }
  }, [availableSeats, dispatch, direction]);

  const canAdd =
    availableSeats - (Number(adults) || 0) - (Number(children) || 0);

  const handleSeatsChangeAdults = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Проверка, что введено только число
      const numValue = Number(value);
      setTimeout(() => {
        if (numValue > 0 && numValue < 64) {
          // Проверка, что число больше нуля
          dispatch(setAdults({ direction, value: numValue }));
        } else {
          dispatch(setAdults({ direction, value: "" }));
        }
      }, 5);
    }
  };

  const handleSeatsChangeChildren = (
    e: React.ChangeEvent<HTMLInputElement>,
    direction: "departure" | "arrival"
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Проверка, что введено только число
      const numValue = Number(value);
      if (Number(adults) > 0 && numValue > 0) {
        dispatch(setChildren({ direction, value: numValue }));
      } else {
        dispatch(setChildren({ direction, value: "" }));
      }
    }
  };

  const handleChildrenNotSeats = (
    e: React.ChangeEvent<HTMLInputElement>,
    direction: "departure" | "arrival"
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Проверка, что введено только число
      const numValue = Number(value);
      if (
        numValue > 0 &&
        numValue <= availableSeats &&
        numValue <= Number(adults)
      ) {
        // Проверка, что число больше нуля
        dispatch(setChildrenNotSeat({ direction, value: numValue }));
      } else {
        dispatch(setChildrenNotSeat({ direction, value: "" })); // Если число меньше или равно нулю, устанавливаем 1
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault(); // Запретить ввод любых символов, кроме цифр, Backspace и Tab
    }
  };

  return (
    <div className="number_tickets-wrapper">
      <h3>Количество билетов</h3>

      <div className="input-wrapper">
        <div className="adults-wrapper">
          <label htmlFor="adults">Взрослых - </label>
          <input
            type="number"
            id="adults"
            className="input-adults"
            min="1"
            onChange={(e) => handleSeatsChangeAdults(e)}
            onKeyDown={handleKeyDown}
            value={adults || ""}
          />
          <p>
            Можно добавить еще
            {` ${canAdd > 0 ? canAdd : 0}`} пассажиров
          </p>
        </div>

        <div className="children-wrapper">
          <label htmlFor="children">Детских - </label>
          <input
            type="number"
            id="children"
            className="input-children"
            min="0"
            max="10"
            onChange={(e) => handleSeatsChangeChildren(e, direction)}
            onKeyDown={handleKeyDown}
            value={children || ""}
          />
          <p>
            Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у
            взрослых, но дешевле в среднем на 50-65%
          </p>
        </div>
        <div className="children-wrapper">
          <label htmlFor="children_w">Детских "без места" - </label>
          <input
            type="number"
            id="children_w"
            className="input-children-w"
            min="0"
            onChange={(e) => handleChildrenNotSeats(e, direction)}
            onKeyDown={handleKeyDown}
            value={childrenNotSeat}
          />
        </div>
      </div>
    </div>
  );
};
