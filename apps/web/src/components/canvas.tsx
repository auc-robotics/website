"use client";

import { useEffect, useRef } from "react";

type Point = [number, number];

interface CanvasObject {
  draw(canvas: CanvasCtx): void;
}

class Line implements CanvasObject {
  points: Point[] = [];
  lineWidth: number;
  strokeStyle: string;

  constructor(options: { lineWidth?: number; strokeStyle?: string } = {}) {
    options.lineWidth ||= 1;
    options.strokeStyle ||= "black";

    this.lineWidth = options.lineWidth;
    if (options.strokeStyle.startsWith("--")) {
      this.strokeStyle = getComputedStyle(document.body).getPropertyValue(
        options.strokeStyle,
      );
    } else {
      this.strokeStyle = options.strokeStyle;
    }
  }

  addPoint(x: number, y: number) {
    this.points.push([x, y]);
  }

  draw(canvas: CanvasCtx) {
    const c = canvas.ctx;
    c.lineWidth = this.lineWidth;
    c.strokeStyle = this.strokeStyle;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.beginPath();
    const cPoints = this.points.map(([x, y]) =>
      canvas.toPixelPerfectCoords(x, y),
    );
    c.moveTo(...cPoints[0]);
    cPoints.slice(1).forEach(([x, y]) => {
      c.lineTo(x, y);
    });
    c.stroke();
  }
}

class CanvasCtx {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  preserveAspectRatio: boolean;
  afId: number = 0;
  objects: CanvasObject[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    options: {
      width?: number;
      height?: number;
      preserveAspectRatio?: boolean;
    } = {},
  ) {
    this.ctx = canvas.getContext("2d")!;
    this.width = options.width || 1;
    this.height = options.height || 1;
    this.preserveAspectRatio = options.preserveAspectRatio || false;
    this.updateSize();
  }

  add(object: CanvasObject) {
    this.objects.push(object);
  }

  updateSize() {
    const [cw, ch] = [
      this.ctx.canvas.parentElement!.clientWidth,
      this.ctx.canvas.parentElement!.clientHeight,
    ].map(Math.floor);

    this.ctx.canvas.width = cw;
    this.ctx.canvas.height = ch;
    if (this.preserveAspectRatio) {
      const unit = Math.min(cw / this.width, ch / this.height);
      this.width = cw / unit;
      this.height = ch / unit;
    }
  }

  toCoords(x: number, y: number): Point {
    return [
      (x / this.width) * this.ctx.canvas.width,
      (y / this.height) * this.ctx.canvas.height,
    ];
  }
  toPixelPerfectCoords(x: number, y: number): Point {
    const c = this.ctx;
    const [cx, cy] = this.toCoords(x, y);
    const ppf = ((c.lineWidth + 1) % 2) / 2;
    return [Math.floor(cx) + ppf, Math.floor(cy) + ppf];
  }

  animate() {
    const c = this.ctx;
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    this.objects.forEach((object) => {
      object.draw(this);
    });
    this.afId = requestAnimationFrame(this.animate.bind(this));
  }

  stopAnimate() {
    cancelAnimationFrame(this.afId);
    this.afId = 0;
  }
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = new CanvasCtx(canvasRef.current!, {
      height: 5,
      preserveAspectRatio: true,
    });
    const line = new Line({ lineWidth: 5, strokeStyle: "--color-slate-100" });
    line.addPoint(0, 0);
    line.addPoint(1, 1);
    line.addPoint(2, 1);
    line.addPoint(3, 2);
    ctx.add(line);
    ctx.animate();

    return () => {
      ctx.stopAnimate();
    };
  });

  return (
    <div className="size-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
