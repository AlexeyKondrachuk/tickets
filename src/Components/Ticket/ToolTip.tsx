import React from "react";
import "../../styles/ToolTip.scss";

interface TooltipProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ isVisible, children }) => {
  if (!isVisible) return null;

  return <div className="tooltip">{children}</div>;
};

export default Tooltip;
