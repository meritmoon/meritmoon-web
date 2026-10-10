import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroMoonThree — 3D Interactive Mindful Moon Mascot
 *
 * Exact implementation from MeritMoon reference:
 * - 3D Sphere geometry with custom dynamic canvas texture
 * - Smooth 3D head-tracking (turns towards cursor across screen)
 * - Organic micro-blinking (Poisson-spaced natural blink)
 * - Cursor hover / proximity interaction:
 *   * Smoothly morphs into blissful meditating expression with closed joy arches (⌒ ⌒)
 *   * Standout sweet joyful smile ◡ that widens and deepens warmly
 *   * Blooming rosy-ruby blushes and golden Pīti sparkles
 * - Safe fallback: If WebGL is unavailable, CSS moon remains active
 */
export const HeroMoonThree: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check parent #hero-moon
    const heroMoon = mount.closest<HTMLElement>("#hero-moon");

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number | null = null;
    let blinkTimeout: number | null = null;

    try {
      const width = mount.clientWidth || 360;
      const height = mount.clientHeight || 360;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 6.2;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      mount.appendChild(renderer.domElement);

      if (heroMoon) {
        heroMoon.classList.add("has-three");
      }

      // Group for 3D Head Turning & Floating
      const moonGroup = new THREE.Group();
      scene.add(moonGroup);

      // 1. Base Sphere — brilliant radiant incandescent white lunar surface matching OG template
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.55,
        metalness: 0.0,
      });
      const moonSphere = new THREE.Mesh(new THREE.SphereGeometry(2.1, 64, 64), sphereMat);
      moonGroup.add(moonSphere);

      // 2. 3D Scene Lighting
      // Soft ambient moonlight maintains gentle base visibility without tinting the pure white face
      const ambLight = new THREE.AmbientLight(0xe0f5e0, 0.40);
      scene.add(ambLight);

      // Zenith key light (top-left) casts brilliant, incandescent pure white radiance across the entire face
      const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
      keyLight.position.set(-3.6, 3.6, 4.2);
      scene.add(keyLight);

      // Delicate pale mint fill light maintains the luminous 3D crescent shadow along the bottom-right rim
      const fillLight = new THREE.DirectionalLight(0x94c78f, 1.05);
      fillLight.position.set(2.0, -3.0, 1.8);
      scene.add(fillLight);

      // 3. Face Planar Decal (Attached to front of moonGroup at z = 2.08)
      const faceCanvas = document.createElement("canvas");
      faceCanvas.width = 512;
      faceCanvas.height = 512;
      const fCtx = faceCanvas.getContext("2d");

      if (!fCtx) {
        throw new Error("Could not acquire 2D canvas context for Moon face");
      }

      const faceTex = new THREE.CanvasTexture(faceCanvas);
      const faceMat = new THREE.MeshBasicMaterial({
        map: faceTex,
        transparent: true,
        depthWrite: false,
      });
      const facePlane = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 2.9), faceMat);
      facePlane.position.z = 2.08;
      moonGroup.add(facePlane);

      // State Management
      let mouseX = 0;
      let mouseY = 0;
      let targetRotX = 0;
      let targetRotY = 0;
      let isHovered = false;
      let hoverProgress = 0; // 0 = welcoming open eyes, 1 = blissful meditating
      let blinkProgress = 0;
      let isBlinking = false;
      let lookOffsetX = 0;
      let lookOffsetY = 0;

      // Texture dirty-flag tracking to eliminate redundant GPU texture uploads
      let lastDrawnHover = -1;
      let lastDrawnBlink = -1;
      let lastDrawnLookX = -999;
      let lastDrawnLookY = -999;

      const eyeColor = "#020A05";
      const cursorEl = document.getElementById("cursor");

      // Draw crisp face texture on planar canvas
      const drawMoonTexture = () => {
        fCtx.clearRect(0, 0, 512, 512);
        const cx = 256;
        const cy = 256;

        // 1. Rosy-Ruby Glowing Blushes on hover
        if (hoverProgress > 0.05) {
          const blushAlpha = hoverProgress * 0.58;
          const blushRx = 34 + hoverProgress * 10;
          const blushRy = 20 + hoverProgress * 6;

          // Left Blush
          const bLx = cx - 100;
          const bLy = cy + 16;
          const bGradL = fCtx.createRadialGradient(bLx, bLy, 2, bLx, bLy, blushRx);
          bGradL.addColorStop(0, `rgba(225, 95, 115, ${blushAlpha})`);
          bGradL.addColorStop(1, "rgba(225, 95, 115, 0)");
          fCtx.fillStyle = bGradL;
          fCtx.beginPath();
          fCtx.ellipse(bLx, bLy, blushRx, blushRy, 0, 0, Math.PI * 2);
          fCtx.fill();

          // Right Blush
          const bRx = cx + 100;
          const bRy = cy + 16;
          const bGradR = fCtx.createRadialGradient(bRx, bRy, 2, bRx, bRy, blushRx);
          bGradR.addColorStop(0, `rgba(225, 95, 115, ${blushAlpha})`);
          bGradR.addColorStop(1, "rgba(225, 95, 115, 0)");
          fCtx.fillStyle = bGradR;
          fCtx.beginPath();
          fCtx.ellipse(bRx, bRy, blushRx, blushRy, 0, 0, Math.PI * 2);
          fCtx.fill();
        }

        // 2. Eyes — Soulful open eyes by default, morphing to closed joy arches (⌒ ⌒) on hover
        const eyeSpacing = 72;
        const eyeBaseLX = cx - eyeSpacing;
        const eyeBaseRX = cx + eyeSpacing;
        const eyeBaseY = cy - 54;
        const eyeLX = eyeBaseLX + lookOffsetX * (1 - hoverProgress);
        const eyeRX = eyeBaseRX + lookOffsetX * (1 - hoverProgress);
        const eyeY = eyeBaseY + lookOffsetY * (1 - hoverProgress);

        fCtx.strokeStyle = eyeColor;
        fCtx.fillStyle = eyeColor;
        fCtx.lineCap = "round";

        if (hoverProgress > 0.4) {
          // Blissful Meditating Joy Arches (⌒ ⌒)
          const archW = 32;
          const archH = 15 + (hoverProgress - 0.4) * 8;
          fCtx.lineWidth = 6.5;

          // Left Arch
          fCtx.beginPath();
          fCtx.moveTo(eyeLX - archW, eyeY + 4);
          fCtx.quadraticCurveTo(eyeLX, eyeY - archH, eyeLX + archW, eyeY + 4);
          fCtx.stroke();

          // Right Arch
          fCtx.beginPath();
          fCtx.moveTo(eyeRX - archW, eyeY + 4);
          fCtx.quadraticCurveTo(eyeRX, eyeY - archH, eyeRX + archW, eyeY + 4);
          fCtx.stroke();
        } else {
          // Soulful Open Eyes with Catchlights & Micro-Blink
          const eyeRadius = 24;
          const scaleY = isBlinking ? 1 - blinkProgress * 0.92 : 1.0;

          // Left Eye
          fCtx.save();
          fCtx.translate(eyeLX, eyeY);
          fCtx.scale(1, scaleY);
          fCtx.beginPath();
          fCtx.arc(0, 0, eyeRadius, 0, Math.PI * 2);
          fCtx.fill();
          if (scaleY > 0.4) {
            fCtx.fillStyle = "#FFFFFF";
            fCtx.beginPath();
            fCtx.arc(-7, -7, 7.5, 0, Math.PI * 2);
            fCtx.fill();
            fCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
            fCtx.beginPath();
            fCtx.arc(6, 6, 3.5, 0, Math.PI * 2);
            fCtx.fill();
          }
          fCtx.restore();

          // Right Eye
          fCtx.save();
          fCtx.translate(eyeRX, eyeY);
          fCtx.scale(1, scaleY);
          fCtx.fillStyle = eyeColor;
          fCtx.beginPath();
          fCtx.arc(0, 0, eyeRadius, 0, Math.PI * 2);
          fCtx.fill();
          if (scaleY > 0.4) {
            fCtx.fillStyle = "#FFFFFF";
            fCtx.beginPath();
            fCtx.arc(-7, -7, 7.5, 0, Math.PI * 2);
            fCtx.fill();
            fCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
            fCtx.beginPath();
            fCtx.arc(6, 6, 3.5, 0, Math.PI * 2);
            fCtx.fill();
          }
          fCtx.restore();
        }

        // 3. Standout Sweet, Joyful Smile ◡ — lowers and deepens on hover
        const mouthY = cy + 62 + hoverProgress * 4;
        const mouthW = 54 + hoverProgress * 8;
        const mouthDepth = 26 + hoverProgress * 8;

        fCtx.strokeStyle = eyeColor;
        fCtx.lineWidth = 7.0 + hoverProgress * 1.5;
        fCtx.beginPath();
        fCtx.moveTo(cx - mouthW, mouthY);
        fCtx.quadraticCurveTo(cx, mouthY + mouthDepth, cx + mouthW, mouthY);
        fCtx.stroke();

        // 4. Golden Sparkles on Hover (Pīti Aura)
        if (hoverProgress > 0.3) {
          const spAlpha = (hoverProgress - 0.3) / 0.7;
          fCtx.fillStyle = `rgba(240, 200, 112, ${spAlpha * 0.9})`;

          const drawSparkle = (sx: number, sy: number, sz: number) => {
            fCtx.beginPath();
            fCtx.moveTo(sx - sz, sy);
            fCtx.quadraticCurveTo(sx, sy, sx, sy - sz);
            fCtx.quadraticCurveTo(sx, sy, sx + sz, sy);
            fCtx.quadraticCurveTo(sx, sy, sx, sy + sz);
            fCtx.quadraticCurveTo(sx, sy, sx - sz, sy);
            fCtx.fill();
          };

          drawSparkle(cx - 120, cy - 85, 11);
          drawSparkle(cx + 125, cy - 95, 10);
          drawSparkle(cx - 125, cy + 80, 9);
          drawSparkle(cx + 125, cy + 75, 10);
        }

        faceTex.needsUpdate = true;
      };

      // Periodic natural micro-blinking
      const scheduleNextBlink = () => {
        const delay = 3200 + Math.random() * 4500;
        blinkTimeout = window.setTimeout(triggerBlink, delay);
      };

      const triggerBlink = () => {
        if (hoverProgress > 0.5) {
          scheduleNextBlink();
          return;
        }
        isBlinking = true;
        const startTime = performance.now();
        const duration = 130;

        const stepBlink = (now: number) => {
          const elapsed = now - startTime;
          if (elapsed < duration / 2) {
            blinkProgress = elapsed / (duration / 2);
          } else if (elapsed < duration) {
            blinkProgress = 1 - (elapsed - duration / 2) / (duration / 2);
          } else {
            blinkProgress = 0;
            isBlinking = false;
            scheduleNextBlink();
            return;
          }
          requestAnimationFrame(stepBlink);
        };
        requestAnimationFrame(stepBlink);
      };

      scheduleNextBlink();

      // Mouse & Hover Listeners
      const raycaster = new THREE.Raycaster();
      const mouse2D = new THREE.Vector2();

      let cachedRect: DOMRect = renderer.domElement.getBoundingClientRect();
      const updateCachedRect = () => {
        if (renderer) {
          cachedRect = renderer.domElement.getBoundingClientRect();
        }
      };

      const onPointerMove = (e: MouseEvent | Touch) => {
        if (!renderer) return;
        const fcx = cachedRect.left + cachedRect.width / 2;
        const fcy = cachedRect.top + cachedRect.height / 2;

        mouseX = (e.clientX - fcx) / (window.innerWidth * 0.5);
        mouseY = (e.clientY - fcy) / (window.innerHeight * 0.5);

        lookOffsetX = Math.max(-5, Math.min(5, mouseX * 5));
        lookOffsetY = Math.max(-5, Math.min(5, mouseY * 5));

        targetRotY = Math.max(-0.14, Math.min(0.14, mouseX * 0.12));
        targetRotX = Math.max(-0.1, Math.min(0.1, mouseY * 0.09));

        mouse2D.x = ((e.clientX - cachedRect.left) / cachedRect.width) * 2 - 1;
        mouse2D.y = -((e.clientY - cachedRect.top) / cachedRect.height) * 2 + 1;

        raycaster.setFromCamera(mouse2D, camera);
        const intersects = raycaster.intersectObjects([moonSphere, facePlane]);
        isHovered = intersects.length > 0;

        if (cursorEl) {
          if (isHovered) {
            cursorEl.classList.add("hidden");
          } else {
            cursorEl.classList.remove("hidden");
          }
        }
      };

      const handleWindowMouseMove = (e: MouseEvent) => {
        onPointerMove(e);
      };

      const handleCanvasMouseEnter = () => {
        isHovered = true;
        if (cursorEl) cursorEl.classList.add("hidden");
      };

      const handleCanvasMouseLeave = () => {
        isHovered = false;
        if (cursorEl) cursorEl.classList.remove("hidden");
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          onPointerMove(e.touches[0]);
        }
      };

      window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("scroll", updateCachedRect, { passive: true });
      renderer.domElement.addEventListener("mouseenter", handleCanvasMouseEnter);
      renderer.domElement.addEventListener("mouseleave", handleCanvasMouseLeave);

      // Animation Loop with Visibility Culling
      const clock = new THREE.Clock();
      let isVisible = true;
      let isTabActive = !document.hidden;

      const stopLoop = () => {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      };

      const startLoop = () => {
        if (!animId && isVisible && isTabActive) {
          animId = requestAnimationFrame(animate);
        }
      };

      const animate = () => {
        if (!isVisible || !isTabActive) {
          animId = null;
          return;
        }

        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // 3D Rotation Lerp
        moonGroup.rotation.y += (targetRotY - moonGroup.rotation.y) * 0.055;
        moonGroup.rotation.x += (targetRotX - moonGroup.rotation.x) * 0.055;

        // Gentle Floating Motion
        moonGroup.position.y = Math.sin(elapsed * 0.8) * 0.08;

        // Smooth Hover Transition
        const targetHover = isHovered ? 1.0 : 0.0;
        hoverProgress += (targetHover - hoverProgress) * 0.08;

        // Scale on Hover
        const targetScale = 1.0 + hoverProgress * 0.05;
        moonGroup.scale.set(targetScale, targetScale, targetScale);

        // Update Face Canvas Texture ONLY when parameters actually change (dirty-flagged)
        const hoverDelta = Math.abs(hoverProgress - lastDrawnHover);
        const blinkDelta = Math.abs(blinkProgress - lastDrawnBlink);
        const lookDelta =
          Math.abs(lookOffsetX - lastDrawnLookX) +
          Math.abs(lookOffsetY - lastDrawnLookY);

        if (hoverDelta > 0.002 || blinkDelta > 0.002 || lookDelta > 0.05) {
          drawMoonTexture();
          lastDrawnHover = hoverProgress;
          lastDrawnBlink = blinkProgress;
          lastDrawnLookX = lookOffsetX;
          lastDrawnLookY = lookOffsetY;
        }

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      // Draw initial texture once, then start animation loop
      drawMoonTexture();
      lastDrawnHover = hoverProgress;
      lastDrawnBlink = blinkProgress;
      lastDrawnLookX = lookOffsetX;
      lastDrawnLookY = lookOffsetY;
      startLoop();

      // Viewport Intersection Culling: pause Three.js rendering when scrolled away
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
      observer.observe(mount);

      // Tab visibility culling: pause when browser tab is inactive
      const handleVisibilityChange = () => {
        isTabActive = !document.hidden;
        if (isTabActive && isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Handle Resize
      const handleResize = () => {
        if (!mount || !renderer) return;
        const nw = mount.clientWidth || 360;
        const nh = mount.clientHeight || 360;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
        updateCachedRect();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        stopLoop();
        if (blinkTimeout) clearTimeout(blinkTimeout);

        observer.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("mousemove", handleWindowMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("scroll", updateCachedRect);
        window.removeEventListener("resize", handleResize);

        if (cursorEl) cursorEl.classList.remove("hidden");

        if (heroMoon) {
          heroMoon.classList.remove("has-three");
        }

        moonSphere.geometry.dispose();
        sphereMat.dispose();
        facePlane.geometry.dispose();
        faceMat.dispose();
        faceTex.dispose();

        if (renderer) {
          renderer.domElement.removeEventListener("mouseenter", handleCanvasMouseEnter);
          renderer.domElement.removeEventListener("mouseleave", handleCanvasMouseLeave);
          renderer.dispose();
          if (mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
          }
        }
      };
    } catch {
      // Fallback: If WebGL is not available, leave CSS fallback moon intact
      if (heroMoon) {
        heroMoon.classList.remove("has-three");
      }
    }
  }, []);

  return <div id="three-moon-mount" className="three-moon-mount" ref={mountRef} />;
};

export default HeroMoonThree;
