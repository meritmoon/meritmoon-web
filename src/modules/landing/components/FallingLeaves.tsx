import React, { useEffect, useRef } from "react";

export const FallingLeaves: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let rafId: number | null = null;
    let isVisible = true;
    let isTabActive = !document.hidden;

    const leafColors = ["#4DBF82", "#7ABD90", "#C8D8C0", "#D4A853"];
    const count = 3;

    interface ILeafInstance {
      el: HTMLDivElement;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      duration: number;
      startTime: number;
      swayAmp: number;
      swayFreq: number;
      rotSpeedZ: number;
      rotSpeedY: number;
    }

    const leaves: ILeafInstance[] = [];

    const leafSvg = `
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 12C2.5 12 6.5 4 15.5 3C17.5 7 17 14 12 18C7 22 2.5 12 2.5 12Z" fill="currentColor" fill-opacity="0.72"/>
        <path d="M2.5 12C6.5 12.5 11 10.5 15.5 3" stroke="rgba(255,255,255,0.4)" stroke-width="0.75" stroke-linecap="round"/>
        <path d="M7 11.5L9.5 9" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
        <path d="M10 13.5L13 10.5" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
      </svg>
    `;

    const resetLeaf = (leaf: ILeafInstance, offsetTime: number) => {
      const size = 16 + Math.random() * 10;
      const color = leafColors[Math.floor(Math.random() * leafColors.length)];
      leaf.el.style.width = `${size}px`;
      leaf.el.style.height = `${size}px`;
      leaf.el.style.color = color;

      leaf.startX = Math.random() * (window.innerWidth * 0.7);
      leaf.startY = -40 - Math.random() * 40;
      leaf.endX = leaf.startX + (Math.random() * 160 + 60);
      leaf.endY = window.innerHeight + 50;
      leaf.duration = 14000 + Math.random() * 8000;
      leaf.startTime = performance.now() + offsetTime;
      leaf.swayAmp = 30 + Math.random() * 25;
      leaf.swayFreq = 0.0015 + Math.random() * 0.001;
      leaf.rotSpeedZ = (Math.random() - 0.5) * 0.003;
      leaf.rotSpeedY = 0.002 + Math.random() * 0.002;
    };

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "falling-leaf";
      el.innerHTML = leafSvg;
      container.appendChild(el);

      const leaf: ILeafInstance = {
        el,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        duration: 0,
        startTime: 0,
        swayAmp: 0,
        swayFreq: 0,
        rotSpeedZ: 0,
        rotSpeedY: 0,
      };
      resetLeaf(leaf, i * 4500 + Math.random() * 2000);
      leaves.push(leaf);
    }

    const startLoop = () => {
      if (!rafId && isVisible && isTabActive) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const tick = (now: number) => {
      if (isDisposed || !isVisible || !isTabActive) {
        rafId = null;
        return;
      }

      leaves.forEach((leaf) => {
        if (now < leaf.startTime) return;
        const elapsed = now - leaf.startTime;
        const progress = elapsed / leaf.duration;

        if (progress >= 1) {
          resetLeaf(leaf, 0);
          return;
        }

        const currentY = leaf.startY + progress * (leaf.endY - leaf.startY);
        const currentX =
          leaf.startX + progress * (leaf.endX - leaf.startX) + Math.sin(now * leaf.swayFreq) * leaf.swayAmp;
        const rotZ = now * leaf.rotSpeedZ * 180;
        const rotY = Math.sin(now * leaf.rotSpeedY) * 65;
        const opacity =
          progress < 0.1
            ? progress / 0.1
            : progress > 0.85
              ? (1 - progress) / 0.15
              : 0.75;

        leaf.el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateZ(${rotZ}deg) rotateY(${rotY}deg)`;
        leaf.el.style.opacity = `${opacity}`;
      });

      rafId = requestAnimationFrame(tick);
    };

    startLoop();

    // Viewport intersection observer to pause when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry ? entry.isIntersecting : true;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isDisposed = true;
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      leaves.forEach((l) => l.el.remove());
    };
  }, []);

  return <div className="falling-leaves" id="falling-leaves" ref={containerRef} aria-hidden="true" />;
};

export default FallingLeaves;
