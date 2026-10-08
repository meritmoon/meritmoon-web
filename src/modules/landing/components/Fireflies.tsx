import React, { useMemo } from "react";

interface FireflyData {
  id: number;
  left: string;
  top: string;
  style: React.CSSProperties;
}

export const Fireflies: React.FC = () => {
  const fireflies = useMemo<FireflyData[]>(() => {
    const isMobile =
      typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const count = isMobile ? 16 : 32;
    const list: FireflyData[] = [];

    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const y = 5 + Math.random() * 90;
      const dur = 7 + Math.random() * 12;
      const del = Math.random() * 10;
      const dx = (Math.random() - 0.5) * 90;
      const dy = -(20 + Math.random() * 90);
      const dx2 = (Math.random() - 0.5) * 70;
      const dy2 = -(40 + Math.random() * 110);

      const randType = Math.random();
      let bg: string | undefined;
      let shadow: string | undefined;

      if (randType < 0.28) {
        bg = "#4DBF82";
        shadow =
          "0 0 10px 3px rgba(77, 191, 130, 0.95), 0 0 25px 8px rgba(46, 139, 87, 0.5)";
      } else if (randType < 0.42) {
        bg = "#E8F0E0";
        shadow =
          "0 0 10px 3px rgba(232, 240, 228, 0.95), 0 0 25px 8px rgba(200, 216, 192, 0.45)";
      }

      list.push({
        id: i,
        left: `${x}%`,
        top: `${y}%`,
        style: {
          left: `${x}%`,
          top: `${y}%`,
          ["--ff-dur" as string]: `${dur}s`,
          ["--ff-delay" as string]: `${del}s`,
          ["--ff-dx" as string]: `${dx}px`,
          ["--ff-dy" as string]: `${dy}px`,
          ["--ff-dx2" as string]: `${dx2}px`,
          ["--ff-dy2" as string]: `${dy2}px`,
          animationDelay: `${del}s`,
          animationDuration: `${dur}s`,
          ...(bg ? { background: bg } : {}),
          ...(shadow ? { boxShadow: shadow } : {}),
        } as React.CSSProperties,
      });
    }

    return list;
  }, []);

  return (
    <div className="fireflies" id="fireflies" aria-hidden="true">
      {fireflies.map((f) => (
        <div key={f.id} className="firefly" style={f.style} />
      ))}
    </div>
  );
};

export default Fireflies;
