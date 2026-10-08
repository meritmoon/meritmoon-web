import React, { useEffect, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate custom glowing moon cursor if the device has a fine pointer and hover support
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Enable custom cursor mode on body
    document.body.classList.add("has-custom-cursor");

    let cx = -100;
    let cy = -100;
    let tx = -100;
    let ty = -100;
    let rafId: number;
    let hasMoved = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      cx = lerp(cx, tx, 0.2);
      cy = lerp(cy, ty, 0.2);
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        cx = tx;
        cy = ty;
        cursor.classList.remove("hidden");
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Hide custom cursor when hovering over moon mascot so face is never obscured
      if (
        target.closest(
          ".moon-mascot, .hero-moon, .about__big-moon, svg.mascot, .mascot-interactive, #three-moon-mount"
        )
      ) {
        cursor.classList.add("hidden");
        return;
      } else {
        cursor.classList.remove("hidden");
      }

      // Expand glowing halo on interactive clickable elements
      if (
        target.closest(
          'a, button, [role="button"], input, textarea, select, .ccard, .pcard, .vcard, .mcard, .faq-item, .pill-btn, .c-btn, .dot, .store-btn, [tabindex="0"]'
        )
      ) {
        cursor.classList.add("hover");
      } else {
        cursor.classList.remove("hover");
      }
    };

    const handleMouseLeaveWindow = () => {
      cursor.classList.add("hidden");
    };

    const handleMouseEnterWindow = () => {
      cursor.classList.remove("hidden");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeaveWindow
    );
    document.documentElement.addEventListener(
      "mouseenter",
      handleMouseEnterWindow
    );

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeaveWindow
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnterWindow
      );
    };
  }, []);

  return <div id="cursor" ref={cursorRef} aria-hidden="true" />;
};
