import React from "react";
import ClassNameProvider from "../../utils/ClassNameProvider";
import Tooltip from "./ToolTip";

interface ServiceState {
  wifi: boolean;
  condicioner: boolean;
  bedlinen: boolean;
  cofe: boolean;
}

interface ServiceItemProps {
  feature: "wifi" | "condicioner" | "bedlinen" | "cofe";
  included: boolean;
  serviceState: ServiceState;
  toggleService: (service: keyof ServiceState) => void;
  tooltipState: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  svgIcon: JSX.Element;
  nameToolTip: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  feature,
  included,
  serviceState,
  toggleService,
  tooltipState,
  onMouseEnter,
  onMouseLeave,
  svgIcon,
  nameToolTip,
}) => {
  return (
    <ClassNameProvider
      feature={feature}
      included={included}
      serviceState={serviceState}
      onClick={() => toggleService(feature)} // Используем переданный feature
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Tooltip isVisible={tooltipState}>
        <div>{nameToolTip}</div>
      </Tooltip>
      {svgIcon}
    </ClassNameProvider>
  );
};

export default ServiceItem;
