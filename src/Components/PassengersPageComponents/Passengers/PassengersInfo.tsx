import { useEffect, useState } from "react";
import { AddPassenger } from "./AddPassenger";
import { BodyFormPassenger } from "./BodyFormPassenger";
import { FormPassenger } from "./FormPassenger";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  addFormCheckValid,
  removeFormCheckValid,
  resetCheckForms,
  selectIsButtonDisabled,
} from "../../../Redux/Slice/CheckFormSlice";
import { selectTotalPassengers } from "../../../Redux/Slice/NumberPassengersSlice";
import { useNavigate } from "react-router-dom";
import { setPassengersRedux } from "../../../Redux/Slice/Passengers";
import "../../../styles/PassengersInfo.scss";

export const PassengersInfo = () => {
  const totalPassengers = useAppSelector(selectTotalPassengers);
  const [passengers, setPassengers] = useState<number[]>([1]);
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());

  const isDisabled = useAppSelector(selectIsButtonDisabled);
  const { routeId } = useAppSelector((state) => state.getId);
  const personInfo = useAppSelector((state) => state.personInfo);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handelNextClick = () => {
    navigate(`/tickets/${routeId}/passengers/payment`); 
    dispatch(setPassengersRedux({ personInfo }));
  };

  // Добавить нового пассажира
  const addPassenger = () => {
   
    if (removedIds.size > 0) {
    
      const nextId = Math.min(...Array.from(removedIds));
      setPassengers((prev) => {
        const updatedPassengers = [...prev, nextId];
        updatedPassengers.sort((a, b) => a - b);
        return updatedPassengers;
      });
      setRemovedIds((prev) => {
        const newRemovedIds = new Set(prev);
        newRemovedIds.delete(nextId); 
        return newRemovedIds;
      });
    } else {
     
      setPassengers((prev) => {
        const updatedPassengers = [...prev, prev.length + 1];
        updatedPassengers.sort((a, b) => a - b);
        return updatedPassengers;
      });
    }
    dispatch(addFormCheckValid(false));
    dispatch(setPassengersRedux({ personInfo }));
  };

  // Удалить пассажира
  const removePassenger = (id: number) => {
    setPassengers((prev) => {
      const updatedPassengers = prev.filter(
        (passengerId) => passengerId !== id
      ); // Удаляем по ID
      updatedPassengers.sort((a, b) => a - b); 
      return updatedPassengers;
    });
    setRemovedIds((prev) => new Set(prev).add(id));
    dispatch(removeFormCheckValid(id)); 
  };

  useEffect(() => {
    dispatch(resetCheckForms());
  }, [totalPassengers]);

  const info = useAppSelector((state) => state.pasenger.passengers);
  console.log(info);
  console.log(passengers);

  return (
    <section className="passengersInfo-wrapper">
      {passengers.map((id) => (
        <FormPassenger
          key={id} 
          passengerNumber={id}
          onRemove={() => removePassenger(id)}
        >
          <BodyFormPassenger
            formId={id}
            addPassenger={
              passengers.length !== totalPassengers ? addPassenger : undefined
            }
          />
        </FormPassenger>
      ))}

      {/* Добавляем пассажира только если количество пассажиров меньше totalPassengers */}
      {passengers.length !== totalPassengers && (
        <AddPassenger addPassenger={addPassenger} />
      )}

      <button
        className="next-steps"
        disabled={isDisabled || passengers.length !== totalPassengers}
        onClick={handelNextClick}
      >
        далее
      </button>
    </section>
  );
};
