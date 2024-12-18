import { useAppSelector } from "../../../hooks/redux";
import { setChildrenNotSeat } from "../../../Redux/Slice/NumberPassengersSlice";
import "../../../styles/QuantityPass.scss";

export const QuantityPass = () => {
  const { adults, children, childrenNotSeat } = useAppSelector(
    (state) => state.NumberPassengers.departure
  );

  const {
    adultsPrice14ClassDeparture,
    totalPriceAdults3ClassDeparture,
    totalPriceAdults2ClassDeparture,

    childrenPrice14ClassDeparture,
    totalPriceChildren2ClassDeparture,
    totalPriceChildren3ClassDeparture,
  } = useAppSelector((state) => state.totalPrice);
  const { classTypeDeparture } = useAppSelector((state) => state.classType);

  const priceForAdults =
    classTypeDeparture === "first" || classTypeDeparture === "fourth"
      ? adultsPrice14ClassDeparture
      : classTypeDeparture === "second"
      ? totalPriceAdults2ClassDeparture
      : classTypeDeparture === "third"
      ? totalPriceAdults3ClassDeparture
      : 0;

  const priceForChildren =
    classTypeDeparture === "first" || classTypeDeparture === "fourth"
      ? childrenPrice14ClassDeparture
      : classTypeDeparture === "second"
      ? totalPriceChildren2ClassDeparture
      : classTypeDeparture === "third"
      ? totalPriceChildren3ClassDeparture
      : 0;

  const formatedPriceForAdults = priceForAdults
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const formatedPriceForChildren = priceForChildren
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className="quantity-wrapper">
      <div className="quantity_pass">
        <span>{adults} </span>
        <span>{adults === 1 ? "\u00A0взрослый" : `\u00A0взрослых`}</span>
        <span>
          {formatedPriceForAdults}
          <span>&#160;&#8381;</span>
        </span>
      </div>
      {children && (
        <div className="quantity_pass">
          <span>{children}</span>
          <span>{children === 1 ? "\u00A0ребенок" : "\u00A0детей"}</span>
          <span>
            {formatedPriceForChildren}
            <span>&#160;&#8381;</span>{" "}
          </span>
        </div>
      )}
      {childrenNotSeat && (
        <div className="quantity_pass">
          <span>
            {typeof setChildrenNotSeat === "number" && childrenNotSeat > 0
              ? childrenNotSeat
              : null}
          </span>
          <span>
            {childrenNotSeat === 1 ? "\u00A0ребенок без метса" : "\u00A0детей"}
          </span>
          <span>
            0<span>&#160;&#8381;</span>
          </span>
        </div>
      )}
    </div>
  );
};
