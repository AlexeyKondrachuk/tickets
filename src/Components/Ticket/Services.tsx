import React, { useEffect, useState } from "react";
import { ServiceState, TooltipState } from "../../Redux/Types/types";
import ServiceItem from "./iconService";
import { svgIcons } from "../../utils/svgIcons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setIsLinens,
  setIsWifi,
} from "../../Redux/Slice/NumberPassengersSlice";

interface ServiceProps {
  conditioning: boolean;
  wifi: boolean;
  linens: boolean;
  direction: "arrival" | "departure";
}

export const Services: React.FC<ServiceProps> = ({
  conditioning,
  wifi,
  linens,
  direction,
}) => {
  const fourthClass = useAppSelector(
    (state) => state.classType.classTypeDeparture
  );
  const dispatch = useAppDispatch();

  const [serviceState, setServiceState] = useState<ServiceState>({
    condicioner: false,
    wifi: false,
    bedlinen: false,
    cofe: false,
  });

  const [tooltipStates, setTooltipStates] = useState<TooltipState>({
    tooltip1: false,
    tooltip2: false,
    tooltip3: false,
    tooltip4: false,
  });

  const handleMouseEnter = (tooltip: keyof TooltipState) => {
    setTooltipStates((prevState) => ({
      ...prevState,
      [tooltip]: true,
    }));
  };

  // Функция для обработки ухода курсора с элемента (отключение тултипа)
  const handleMouseLeave = (tooltip: keyof TooltipState) => {
    setTooltipStates((prevState) => ({
      ...prevState,
      [tooltip]: false,
    }));
  };

  const toggleService = (service: keyof ServiceState) => {
    setServiceState((prevState) => ({
      ...prevState,
      [service]: !prevState[service],
    }));
  };

  console.log(serviceState.wifi, direction);
  useEffect(() => {
    dispatch(setIsLinens({ direction, value: serviceState.bedlinen }));
    dispatch(setIsWifi({ direction, value: serviceState.wifi }));
  }, [serviceState.wifi, direction, serviceState.bedlinen]);

  return (
    <div className="icons-service">
      <ServiceItem
        feature="condicioner"
        included={conditioning}
        serviceState={serviceState}
        toggleService={toggleService}
        tooltipState={tooltipStates.tooltip1}
        onMouseEnter={() => handleMouseEnter("tooltip1")}
        onMouseLeave={() => handleMouseLeave("tooltip1")}
        svgIcon={svgIcons[0].icons}
        nameToolTip={svgIcons[0].name}
      />
      <ServiceItem
        feature="wifi"
        included={wifi}
        serviceState={serviceState}
        toggleService={toggleService}
        tooltipState={tooltipStates.tooltip2}
        onMouseEnter={() => handleMouseEnter("tooltip2")}
        onMouseLeave={() => handleMouseLeave("tooltip2")}
        svgIcon={svgIcons[1].icons}
        nameToolTip={svgIcons[1].name}
      />
      {fourthClass !== "fourth" && (
        <ServiceItem
          feature="bedlinen"
          included={linens}
          serviceState={serviceState}
          toggleService={toggleService}
          tooltipState={tooltipStates.tooltip3}
          onMouseEnter={() => handleMouseEnter("tooltip3")}
          onMouseLeave={() => handleMouseLeave("tooltip3")}
          svgIcon={svgIcons[2].icons}
          nameToolTip={svgIcons[2].name}
        />
      )}
      <ServiceItem
        feature="cofe"
        included={false}
        serviceState={serviceState}
        toggleService={toggleService}
        tooltipState={tooltipStates.tooltip4}
        onMouseEnter={() => handleMouseEnter("tooltip4")}
        onMouseLeave={() => handleMouseLeave("tooltip4")}
        svgIcon={svgIcons[3].icons}
        nameToolTip={svgIcons[3].name}
      />
    </div>
  );
};
