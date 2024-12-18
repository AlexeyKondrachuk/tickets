import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setLimit, setSort } from "../../Redux/Slice/MainFormSearchSlice";
import useClickOutside from "../../hooks/useClickOutside";
import "../../styles/sortItem.scss";

type SortOption = "date" | "price_min" | "duration";

interface sortProps {
  total_count: number;
}

const SortItems: React.FC<sortProps> = ({ total_count }) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false); 
  const [activeLimit, setActiveLimit] = useState<number>(5);
  const sortItem = useAppSelector((state) => state.searchMainForm.sort);

  const sortRef = useRef<HTMLDivElement | null>(null);

  const handleSortChange = (option: SortOption) => {
    dispatch(setSort(option)); 
    setIsOpen(false); 
  };

  const handleLimit = (value: number) => {
    dispatch(setLimit(value));
    setActiveLimit(value);
  };

  useClickOutside(sortRef, () => setIsOpen(false));

  return (
    <div className="sortItem-container">
      <span>найдено {total_count}</span>

      <div className="dropdown-wrapper">
        <span>соритировать по:</span>
        <div className="dropdown" ref={sortRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dropdown-button"
          >
            {sortItem === "date" && <span>времени</span>}
            {sortItem === "price_min" && <span>стоимости</span>}
            {sortItem === "duration" && <span>длительности</span>}
          </button>
          {isOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleSortChange("date")}>времени</li>
              <li onClick={() => handleSortChange("price_min")}>стоимости</li>
              <li onClick={() => handleSortChange("duration")}>длительности</li>
            </ul>
          )}
        </div>
      </div>

      <div className="quantity_Items_wrapper">
        <p>показывать по:</p>
        <button
          onClick={() => handleLimit(5)}
          className={`quantity_Items_${activeLimit === 5 ? "active" : ""}`}
          value={5}
        >
          5
        </button>
        <button
          onClick={() => handleLimit(10)}
          className={`quantity_Items_${activeLimit === 10 ? "active" : ""}`}
          value={10}
        >
          10
        </button>
        <button
          onClick={() => handleLimit(20)}
          className={`quantity_Items_${activeLimit === 20 ? "active" : ""}`}
          value={20}
        >
          20
        </button>
      </div>
    </div>
  );
};

export default SortItems;
