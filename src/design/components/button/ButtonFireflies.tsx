// src/design/components/button/ButtonFireflies.tsx

import React, { useEffect, useRef } from "react";

interface IFireflyParticle {
  el: HTMLDivElement;
  angle: number;
  speed: number;
  radiusX: number;
  radiusY: number;
  orbitCenterX: number;
  orbitCenterY: number;
  wobbleSpeed: number;
  wobblePhase: number;
  driftOutX: number;
  driftOutY: number;
  fadeProgress: number;
}

/**
 * Mindful CTA Button Firefly Swarm
 *
 * Exact easing motion from MeritMoon design template:
 * - 5 gentle fireflies (alternating emerald and gold)
 * - Slowly enter when cursor enters the button
 * - Wander and breathe around the button perimeter
 * - Float away softly into the night when cursor leaves
 */
export const attachButtonFireflySwarm = (btn: HTMLElement): (() => void) => {
  if (!btn) return () => {};

  if (window.getComputedStyle(btn).position === "static") {
    btn.style.position = "relative";
  }

  // Reuse existing wrap or create new one
  let swarmWrap = btn.querySelector<HTMLDivElement>(".btn-firefly-swarm");
  if (!swarmWrap) {
    swarmWrap = document.createElement("div");
    swarmWrap.className = "btn-firefly-swarm";
    swarmWrap.setAttribute("aria-hidden", "true");
    btn.appendChild(swarmWrap);
  } else {
    swarmWrap.innerHTML = "";
  }

  const fireflyCount = 5;
  const flies: IFireflyParticle[] = [];

  for (let i = 0; i < fireflyCount; i++) {
    const fly = document.createElement("div");
    fly.className = "btn-firefly";
    const isEmerald = i % 2 === 0;
    fly.classList.add(isEmerald ? "btn-firefly--emerald" : "btn-firefly--gold");
    swarmWrap.appendChild(fly);

    flies.push({
      el: fly,
      angle: (i / fireflyCount) * Math.PI * 2,
      speed: 0.0016 + Math.random() * 0.0012,
      radiusX: 24 + Math.random() * 28,
      radiusY: 12 + Math.random() * 18,
      orbitCenterX: (Math.random() - 0.5) * 45,
      orbitCenterY: (Math.random() - 0.5) * 16,
      wobbleSpeed: 0.0025 + Math.random() * 0.002,
      wobblePhase: Math.random() * Math.PI * 2,
      driftOutX: (Math.random() - 0.5) * 80,
      driftOutY: -(25 + Math.random() * 55),
      fadeProgress: 0,
    });
  }

  let isHovering = false;
  let animId: number | null = null;

  const renderSwarm = (time: number) => {
    if (!btn.contains(swarmWrap)) {
      btn.appendChild(swarmWrap);
    }

    let anyVisible = false;

    flies.forEach((f, idx) => {
      const targetFade = isHovering ? 1.0 : 0.0;
      const fadeSpeed = isHovering ? 0.04 : 0.022;
      f.fadeProgress += (targetFade - f.fadeProgress) * fadeSpeed;

      if (f.fadeProgress > 0.01) {
        anyVisible = true;
        f.el.style.opacity = Math.min(1, f.fadeProgress * 1.05).toFixed(3);

        const currentAngle = time * f.speed + f.angle;
        const wobble = Math.sin(time * f.wobbleSpeed + f.wobblePhase) * 9;

        const disperseDist = 1 - f.fadeProgress;
        const posX =
          Math.cos(currentAngle) * (f.radiusX + wobble) +
          f.orbitCenterX +
          f.driftOutX * disperseDist;
        const posY =
          Math.sin(currentAngle * 1.4) * (f.radiusY + wobble) +
          f.orbitCenterY +
          f.driftOutY * disperseDist;

        const pulse = 0.85 + Math.sin(time * 0.0035 + idx * 1.3) * 0.35;

        f.el.style.transform = `translate3d(calc(-50% + ${posX.toFixed(1)}px), calc(-50% + ${posY.toFixed(1)}px), 0) scale(${pulse.toFixed(2)})`;
      } else {
        f.el.style.opacity = "0";
      }
    });

    if (anyVisible || isHovering) {
      animId = requestAnimationFrame(renderSwarm);
    } else {
      animId = null;
    }
  };

  const handleMouseEnter = () => {
    isHovering = true;
    if (!animId) {
      animId = requestAnimationFrame(renderSwarm);
    }
  };

  const handleMouseLeave = () => {
    isHovering = false;
  };

  btn.addEventListener("mouseenter", handleMouseEnter);
  btn.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    btn.removeEventListener("mouseenter", handleMouseEnter);
    btn.removeEventListener("mouseleave", handleMouseLeave);
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    if (swarmWrap && btn.contains(swarmWrap)) {
      btn.removeChild(swarmWrap);
    }
  };
};

/**
 * Hook to automatically attach firefly swarms to all matching buttons in a container
 */
export const useButtonFireflies = (
  containerRef?: React.RefObject<HTMLElement | null>,
  selector = ".btn--forest, .nav__pill, .store-btn, [data-firefly-swarm]",
) => {
  useEffect(() => {
    const root = containerRef?.current || document;
    const elements = root.querySelectorAll<HTMLElement>(selector);
    const cleanups = Array.from(elements).map((el) => attachButtonFireflySwarm(el));

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [containerRef, selector]);
};

/**
 * Self-contained firefly swarm component for placing directly inside button elements
 */
export const ButtonFireflySwarm: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    return attachButtonFireflySwarm(parent);
  }, []);

  return <div ref={containerRef} className="btn-firefly-swarm-anchor hidden" aria-hidden="true" />;
};

export default ButtonFireflySwarm;
