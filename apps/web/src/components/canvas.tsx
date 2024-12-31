"use client";

import { useEffect, useRef } from "react";

class CanvasCtx {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  afId: number = 0;

  constructor(
    canvas: HTMLCanvasElement,
    options: { width?: number; height?: number } = {},
  ) {
    this.ctx = canvas.getContext("2d")!;
    this.width = options.width || canvas.clientWidth;
    this.height = options.height || canvas.clientHeight;
    this.updateSize();
  }

  updateSize() {
    this.ctx.canvas.width = this.ctx.canvas.clientWidth;
    this.ctx.canvas.height = this.ctx.canvas.clientHeight;
  }

  toCoords(x: number, y: number): [number, number] {
    return [
      (x / this.width) * this.ctx.canvas.width,
      (y / this.height) * this.ctx.canvas.height,
    ];
  }

  toPixelPerfectCoords(x: number, y: number): [number, number] {
    const c = this.ctx;
    const [cx, cy] = this.toCoords(x, y);
    const ppf = (c.lineWidth % 2) / 2;
    return [Math.floor(cx) + ppf, Math.floor(cy) + ppf];
  }

  animate() {
    const c = this.ctx;
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    this.afId = requestAnimationFrame(this.animate.bind(this));
  }

  stopAnimate() {
    window.cancelAnimationFrame(this.afId);
    this.afId = 0;
  }
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = new CanvasCtx(canvasRef.current!, { width: 100, height: 100 });
    console.log(ctx);
    ctx.animate();

    return () => {
      ctx.stopAnimate();
    };
  });

  return <canvas ref={canvasRef} className="size-full"></canvas>;
}
