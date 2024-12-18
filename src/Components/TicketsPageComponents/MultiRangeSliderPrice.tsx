import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setPrice_from,
  setPrice_to,
} from "../../Redux/Slice/MainFormSearchSlice";
import "./../../styles/multyslider.scss";

const MultiRangeSlider = () => {
  const { minValuePrice, maxValuePrice } = useAppSelector(
    (state) => state.priceValue
  );
  const { searchCityFrom, searchCityTo } = useAppSelector(
    (state) => state.searchCity
  );

  const [distance] = useState<number>(10);
  const dispatch = useAppDispatch();
  const [min, setMin] = useState<number>(minValuePrice);
  const [max, setMax] = useState<number>(maxValuePrice);

  const [values, setValues] = useState([min, max]);

  useEffect(() => {
    setMin(minValuePrice);
    setMax(maxValuePrice);
  }, [searchCityFrom, searchCityTo, minValuePrice, maxValuePrice]);

  console.log(min, max, minValuePrice, maxValuePrice);

  const handleChange = (newValues: number[]) => {
    dispatch(setPrice_from(values[0]));
    dispatch(setPrice_to(values[1]));
    setValues(newValues);
  };

  const minLimit = min + (max - min) * 0.11;
  const maxLimit = max - (max - min) * 0.14;

  console.log(min, max, minValuePrice, maxValuePrice);

  return (
    <div className="price-slider-wrapper">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        min={min}
        max={max}
        value={values}
        onChange={handleChange}
        renderThumb={(props, state) => (
          <div {...props}>{<span>{state.valueNow}</span>}</div>
        )}
        pearling
        minDistance={distance}
      />
      <div className="values">
        {values[0] > minLimit ? <span>{min}</span> : <span></span>}
        {values[1] < maxLimit ? <span>{max}</span> : <span></span>}
      </div>
    </div>
  );
};

export default MultiRangeSlider;
