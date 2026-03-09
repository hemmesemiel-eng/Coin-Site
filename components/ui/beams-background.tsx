"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  opacity: number;
  hue: number;
}

function createBeam(width: number, height: number): Beam {
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 0.5 - height * 0.1,
    width: 50 + Math.random() * 100,
    length: height * 1.8,
    angle: -35 + Math.random() * 10,
    opacity: 0.08 + Math.random() * 0.1,
    hue: Math.random() < 0.8 ? 250 + Math.random() * 25 : 185 + Math.random() * 15,
  };
}

const BEAM_COUNT = 10;

const opacityMap = {
  subtle: 0.7,
  medium: 0.9,
  strong: 1,
};

export function BeamsBackground({
  className,
  children,
  intensity = "strong",
}: BeamsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let resizeTimer: ReturnType<typeof setTimeout>;

    function draw() {
      if (!canvas || !ctx || !container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      const beams = Array.from({ length: BEAM_COUNT }, () =>
        createBeam(w, h)
      );

      beams.forEach((beam) => {
        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate((beam.angle * Math.PI) / 180);

        const o = beam.opacity * opacityMap[intensity];
        const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
        gradient.addColorStop(0, `hsla(${beam.hue}, 90%, 65%, 0)`);
        gradient.addColorStop(0.08, `hsla(${beam.hue}, 90%, 65%, ${o * 0.5})`);
        gradient.addColorStop(0.35, `hsla(${beam.hue}, 90%, 65%, ${o})`);
        gradient.addColorStop(0.65, `hsla(${beam.hue}, 90%, 65%, ${o})`);
        gradient.addColorStop(0.92, `hsla(${beam.hue}, 90%, 65%, ${o * 0.3})`);
        gradient.addColorStop(1, `hsla(${beam.hue}, 90%, 65%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        ctx.restore();
      });
    }

    draw();

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 150);
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimer);
    };
  }, [intensity]);

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ filter: "blur(22px)" }}
      />

      {/* Bottom fade into page background */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-64"
        style={{ background: "linear-gradient(to bottom, transparent, #0a0a0f)" }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
