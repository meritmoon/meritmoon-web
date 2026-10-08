import React from "react";
import { LANDING_CONFIG, LandingMode } from "../constants";

export interface ITickerSectionProps {
  mode?: LandingMode;
}

export const TickerSection: React.FC<ITickerSectionProps> = ({
  mode = LANDING_CONFIG.mode,
}) => {
  const activeMode = mode || LANDING_CONFIG.mode;
  const config = LANDING_CONFIG[activeMode] || LANDING_CONFIG.waitlist;
  const items = config.tickerItems;

  return (
    <div className="ticker-wrap">
      <div className="ticker-inner" id="ticker">
        {items.map((phrase, i) => (
          <span key={`t1-${i}`}>{phrase}</span>
        ))}
        {items.map((phrase, i) => (
          <span key={`t2-${i}`}>{phrase}</span>
        ))}
      </div>
    </div>
  );
};

export default TickerSection;
