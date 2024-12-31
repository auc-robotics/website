"use client";

import { useEffect, useRef } from "react";

class CanvasCtx {
  ctx: CanvasRenderingContext2D;
  afId: number = 0;
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
    this.updateSize();
  }

  updateSize() {
    this.ctx.canvas.width = this.ctx.canvas.clientWidth;
    this.ctx.canvas.height = this.ctx.canvas.clientHeight;
  }

  animate() {
    const c = this.ctx;
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
    const ctx = new CanvasCtx(canvasRef.current!);
    console.log(ctx);
    ctx.animate();

    return () => {
      ctx.stopAnimate();
    };
  });

  return <canvas ref={canvasRef} className="size-full"></canvas>;
}
