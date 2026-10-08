import React, { useEffect, useRef } from "react";

const C = {
  silver: "#C8D8C0",
  emerald: "#2E8B57",
  emeraldDim: "#1A5235",
};

interface Star {
  x: number;
  y: number;
  sz: number;
  base: number;
  speed: number;
  phase: number;
  tint: string;
}

interface DriftCloud {
  x: number;
  y: number;
  rx: number;
  ry: number;
  angle: number;
  color: string;
  alpha: number;
}

interface Shooter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  op: number;
  decay: number;
}

export const ForestCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let stars: Star[] = [];
    let driftClouds: DriftCloud[] = [];
    let shooters: Shooter[] = [];
    let frame = 0;
    let raf: number;

    const rand = (a: number, b: number) => Math.random() * (b - a) + a;

    const hex2rgb = (hex: string) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    });

    const rgba = (hex: string, a: number) => {
      const { r, g, b } = hex2rgb(hex);
      return `rgba(${r},${g},${b},${a})`;
    };

    const buildStars = () => {
      stars = [];
      const n = Math.floor((W * H) / 2800);
      for (let i = 0; i < n; i++) {
        const t = Math.random();
        let sz: number;
        let base: number;
        let speed: number;
        if (t < 0.6) {
          sz = rand(0.25, 0.65);
          base = rand(0.08, 0.25);
          speed = rand(0.002, 0.005);
        } else if (t < 0.88) {
          sz = rand(0.65, 1.1);
          base = rand(0.2, 0.5);
          speed = rand(0.004, 0.008);
        } else {
          sz = rand(1.1, 1.8);
          base = rand(0.45, 0.85);
          speed = rand(0.007, 0.013);
        }
        stars.push({
          x: rand(0, W),
          y: rand(0, H * 0.72),
          sz,
          base,
          speed,
          phase: rand(0, Math.PI * 2),
          tint:
            Math.random() < 0.09
              ? Math.random() < 0.6
                ? C.silver
                : C.emeraldDim
              : "#FFFFFF",
        });
      }
    };

    const buildClouds = () => {
      driftClouds = [];
      for (let i = 0; i < 4; i++) {
        driftClouds.push({
          x: rand(W * 0.05, W * 0.95),
          y: rand(H * 0.05, H * 0.55),
          rx: rand(W * 0.12, W * 0.22),
          ry: rand(H * 0.06, H * 0.14),
          angle: rand(-0.3, 0.3),
          color: i % 2 === 0 ? C.emerald : C.silver,
          alpha: rand(0.012, 0.026),
        });
      }
    };

    let nextShooterTime = performance.now() + rand(2500, 6000);

    const spawnShooter = () => {
      const angle = rand(Math.PI * 0.68, Math.PI * 0.82);
      const spd = rand(7, 13);
      shooters.push({
        x: rand(W * 0.52, W * 0.96),
        y: rand(H * 0.02, H * 0.36),
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        len: rand(70, 140),
        op: 0.95,
        decay: rand(0.01, 0.017),
      });
      nextShooterTime = performance.now() + rand(6000, 16000);
    };

    const drawSky = () => {
      const g = ctx.createRadialGradient(
        W * 0.5,
        H * 0.28,
        0,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.9,
      );
      g.addColorStop(0, "rgba(8,20,12,0.97)");
      g.addColorStop(0.3, "rgba(5,14,8,0.99)");
      g.addColorStop(0.7, "rgba(3,9,5,1)");
      g.addColorStop(1, "rgba(2,6,3,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    };

    const drawClouds = () => {
      driftClouds.forEach((c) => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.angle);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(c.rx, c.ry));
        g.addColorStop(0, rgba(c.color, c.alpha));
        g.addColorStop(0.5, rgba(c.color, c.alpha * 0.4));
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(0, 0, c.rx, c.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const drawStars = () => {
      frame++;
      stars.forEach((s) => {
        const op = s.base + Math.sin(frame * s.speed + s.phase) * s.base * 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.sz, 0, Math.PI * 2);
        ctx.fillStyle =
          s.tint === "#FFFFFF"
            ? `rgba(255,255,255,${op})`
            : rgba(s.tint, op);
        ctx.fill();

        if (s.sz > 1.3 && op > 0.55) {
          const arm = s.sz * 2.8;
          ctx.strokeStyle = `rgba(255,255,255,${op * 0.28})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(s.x - arm, s.y);
          ctx.lineTo(s.x + arm, s.y);
          ctx.moveTo(s.x, s.y - arm);
          ctx.lineTo(s.x, s.y + arm);
          ctx.stroke();
        }
      });
    };

    const drawShooters = () => {
      if (performance.now() >= nextShooterTime) {
        spawnShooter();
      }
      shooters = shooters.filter((s) => s.op > 0);
      shooters.forEach((s) => {
        const tx = s.x - s.vx * (s.len / 12);
        const ty = s.y - s.vy * (s.len / 12);
        const g = ctx.createLinearGradient(tx, ty, s.x, s.y);
        g.addColorStop(0, "rgba(200, 216, 192, 0)");
        g.addColorStop(0.7, `rgba(200, 216, 192, ${s.op * 0.5})`);
        g.addColorStop(1, `rgba(255, 255, 255, ${s.op})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = s.op * 1.3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.op})`;
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;
        s.op -= s.decay;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      drawSky();
      drawClouds();
      drawStars();
      drawShooters();
      raf = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildStars();
      buildClouds();
    };

    buildStars();
    buildClouds();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas id="forest-canvas" ref={canvasRef} />;
};

export default ForestCanvas;
