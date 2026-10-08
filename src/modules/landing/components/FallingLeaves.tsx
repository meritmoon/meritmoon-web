import React, { useEffect, useRef } from "react";

export const FallingLeaves: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    const leafColors = ["#4DBF82", "#7ABD90", "#C8D8C0", "#D4A853"];
    const count = 3;
    const activeLeaves: HTMLDivElement[] = [];

    const leafSvg = `
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 12C2.5 12 6.5 4 15.5 3C17.5 7 17 14 12 18C7 22 2.5 12 2.5 12Z" fill="currentColor" fill-opacity="0.72"/>
        <path d="M2.5 12C6.5 12.5 11 10.5 15.5 3" stroke="rgba(255,255,255,0.4)" stroke-width="0.75" stroke-linecap="round"/>
        <path d="M7 11.5L9.5 9" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
        <path d="M10 13.5L13 10.5" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
      </svg>
    `;

    const spawnLeaf = (i: number) => {
      if (isDisposed) return;
      const leaf = document.createElement("div");
      leaf.className = "falling-leaf";
      leaf.innerHTML = leafSvg;

      const size = 16 + Math.random() * 10;
      const color = leafColors[Math.floor(Math.random() * leafColors.length)];
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      leaf.style.color = color;

      container.appendChild(leaf);
      activeLeaves.push(leaf);

      const startX = Math.random() * (window.innerWidth * 0.7);
      const startY = -40 - Math.random() * 40;
      const endX = startX + (Math.random() * 160 + 60);
      const endY = window.innerHeight + 50;
      const duration = 14000 + Math.random() * 8000;
      const startTime = performance.now() + i * 4500 + Math.random() * 2000;
      const swayAmp = 30 + Math.random() * 25;
      const swayFreq = 0.0015 + Math.random() * 0.001;
      const rotSpeedZ = (Math.random() - 0.5) * 0.003;
      const rotSpeedY = 0.002 + Math.random() * 0.002;

      const step = (now: number) => {
        if (isDisposed) {
          leaf.remove();
          return;
        }
        if (now < startTime) {
          requestAnimationFrame(step);
          return;
        }
        const elapsed = now - startTime;
        const progress = elapsed / duration;

        if (progress >= 1) {
          leaf.remove();
          const idx = activeLeaves.indexOf(leaf);
          if (idx > -1) activeLeaves.splice(idx, 1);
          spawnLeaf(0);
          return;
        }

        const currentY = startY + progress * (endY - startY);
        const currentX =
          startX + progress * (endX - startX) + Math.sin(now * swayFreq) * swayAmp;
        const rotZ = now * rotSpeedZ * 180;
        const rotY = Math.sin(now * rotSpeedY) * 65;
        const opacity =
          progress < 0.1
            ? progress / 0.1
            : progress > 0.85
              ? (1 - progress) / 0.15
              : 0.75;

        leaf.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateZ(${rotZ}deg) rotateY(${rotY}deg)`;
        leaf.style.opacity = `${opacity}`;

        requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    for (let i = 0; i < count; i++) {
      spawnLeaf(i);
    }

    return () => {
      isDisposed = true;
      activeLeaves.forEach((l) => l.remove());
    };
  }, []);

  return <div className="falling-leaves" id="falling-leaves" ref={containerRef} aria-hidden="true" />;
};

export default FallingLeaves;
