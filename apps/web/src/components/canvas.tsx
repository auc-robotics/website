"use client";

import { useEffect, useRef } from "react";

const resolveColor = (color: string) => {
  if (color.startsWith("--")) {
    return getComputedStyle(document.body).getPropertyValue(color);
  }
  return color;
};

type Point = [number, number];

interface CanvasObject {
  draw(canvas: CanvasCtx): void;
  animate(canvas: CanvasCtx, dt: number): void;
}

class Line implements CanvasObject {
  points: Point[] = [];
  lineWidth: number;
  strokeStyle: string;

  gradStart?: number;
  gradEnd?: number;
  gradStops?: [number, string][];

  private prevT: number = 0;
  update?: (line: Line, dt: number) => void;

  constructor(
    options: {
      lineWidth?: number;
      strokeStyle?: string;
      gradStart?: number;
      gradEnd?: number;
      gradStops?: [number, string][];
      update?: (line: Line, dt: number) => void;
    } = {},
  ) {
    options.lineWidth ||= 1;
    options.strokeStyle ||= "black";

    this.lineWidth = options.lineWidth;
    this.strokeStyle = resolveColor(options.strokeStyle);

    if (options.gradStops || options.gradStart || options.gradEnd) {
      this.gradStart = options.gradStart;
      this.gradEnd = options.gradEnd;
      this.gradStops = options.gradStops;
    }

    this.update = options.update;
  }

  totalLength() {
    let total = 0;
    for (let i = 1; i < this.points.length; i++) {
      const [x1, y1] = this.points[i - 1];
      const [x2, y2] = this.points[i];
      total += Math.hypot(x2 - x1, y2 - y1);
    }
    return total;
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

    const isGrad =
      this.gradStart !== undefined &&
      this.gradEnd !== undefined &&
      this.gradStops !== undefined;

    let gs, ge;
    if (isGrad)
      [gs, ge] = [this.gradStart!, this.gradEnd!].map(
        (x) => x * this.totalLength(),
      );
    let currentLength = 0;
    for (let i = 1; i < this.points.length; i++) {
      const [x1, y1] = this.points[i - 1];
      const [x2, y2] = this.points[i];
      const [dx, dy] = [x2 - x1, y2 - y1];
      const segmentLength = Math.hypot(dx, dy);

      if (isGrad) {
        const startFactor = (gs! - currentLength) / segmentLength;
        const endFactor = (ge! - currentLength) / segmentLength;
        currentLength += segmentLength;

        const grad = c.createLinearGradient(
          ...canvas.toCoords(x1 + dx * startFactor, y1 + dy * startFactor),
          ...canvas.toCoords(x1 + dx * endFactor, y1 + dy * endFactor),
        );
        for (const [stop, color] of this.gradStops!) {
          grad.addColorStop(stop, resolveColor(color));
        }
        c.strokeStyle = grad;
      }

      c.beginPath();
      c.moveTo(...canvas.toPixelPerfectCoords(x1, y1));
      c.lineTo(...canvas.toPixelPerfectCoords(x2, y2));
      c.stroke();
    }
  }

  animate(canvas: CanvasCtx, t: number) {
    this.draw(canvas);
    if (this.update) this.update(this, t - this.prevT);
    this.prevT = t;
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
    const ppf = (c.lineWidth % 2) / 2;
    return [Math.floor(cx) + ppf, Math.floor(cy) + ppf];
  }

  animate(t: number) {
    const c = this.ctx;
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    this.objects.forEach((object) => {
      object.animate(this, t);
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
    const line = new Line({
      lineWidth: 5,
      gradStart: 0,
      gradEnd: 0.1,
      gradStops: [
        [0, "--color-slate-100"],
        [0.3, "--color-sky-500"],
        [0.7, "--color-sky-500"],
        [1, "--color-slate-100"],
      ],
      update: (l, dt) => {
        const speed = 0.0005;
        l.gradStart! += dt * speed;
        l.gradEnd! += dt * speed;
        if (l.gradStart! > 1) {
          l.gradStart! = -0.1;
          l.gradEnd! = 0;
        }
      },
    });
    line.addPoint(0, 0);
    line.addPoint(1, 1);
    line.addPoint(2, 1);
    line.addPoint(3, 2);
    ctx.add(line);
    requestAnimationFrame(ctx.animate.bind(ctx));

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
