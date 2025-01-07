"use client";

import { useEffect, useRef } from "react";

const resolveColor = (color: string) => {
  if (color.startsWith("--")) {
    return getComputedStyle(document.body).getPropertyValue(color);
  }
  return color;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

type Point = [number, number];

interface CanvasObject {
  draw(canvas: CanvasCtx): void;
  animate(canvas: CanvasCtx, dt: number): void;
}

interface Gradient {
  start: number;
  end: number;
  stops: [number, string][];
}

class Line implements CanvasObject {
  points: Point[];
  lineWidth: number;
  strokeStyle: string;

  grads: Gradient[];

  private prevT: number = 0;
  update?: (line: Line, dt: number) => void;

  constructor(
    options: {
      lineWidth?: number;
      strokeStyle?: string;
      gradients?: Gradient[];
      update?: (line: Line, dt: number) => void;
    } = {},
  ) {
    options.lineWidth ||= 1;
    options.strokeStyle ||= "black";

    this.points = [];

    this.lineWidth = options.lineWidth;
    this.strokeStyle = resolveColor(options.strokeStyle);

    this.grads = options.gradients || [];

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

    for (let i = 1; i < this.points.length; i++) {
      const [x1, y1] = this.points[i - 1];
      const [x2, y2] = this.points[i];

      c.beginPath();
      c.moveTo(...canvas.toPixelPerfectCoords(x1, y1));
      c.lineTo(...canvas.toPixelPerfectCoords(x2, y2));
      c.stroke();
    }

    for (const { start, end, stops } of this.grads) {
      const [gs, ge] = [start, end];
      let currentLength = 0;
      for (let i = 1; i < this.points.length; i++) {
        const [x1, y1] = this.points[i - 1];
        const [x2, y2] = this.points[i];
        const [dx, dy] = [x2 - x1, y2 - y1];
        const segmentLength = Math.hypot(dx, dy);

        const startFactor = (gs - currentLength) / segmentLength;
        const endFactor = (ge - currentLength) / segmentLength;

        const grad = c.createLinearGradient(
          ...canvas.toCoords(x1 + dx * startFactor, y1 + dy * startFactor),
          ...canvas.toCoords(x1 + dx * endFactor, y1 + dy * endFactor),
        );
        for (const [stop, color] of stops) {
          grad.addColorStop(stop, resolveColor(color));
        }

        c.strokeStyle = grad;
        c.beginPath();
        const [gx1, gy1] = canvas.toPixelPerfectCoords(
          x1 + dx * clamp(startFactor, 0, 1),
          y1 + dy * clamp(startFactor, 0, 1),
        );
        const [gx2, gy2] = canvas.toPixelPerfectCoords(
          x1 + dx * clamp(endFactor, 0, 1),
          y1 + dy * clamp(endFactor, 0, 1),
        );
        if (gx1 !== gx2 || gy1 !== gy2) {
          c.moveTo(gx1, gy1);
          c.lineTo(gx2, gy2);
          c.stroke();
        }

        currentLength += segmentLength;
      }
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
      height: 10,
      preserveAspectRatio: true,
    });
    const gradLen = 1;
    const line = new Line({
      strokeStyle: "--color-slate-100",
      lineWidth: 5,
      gradients: [
        {
          start: -gradLen,
          end: 0,
          stops: [
            [0, "--color-slate-100"],
            [0.3, "--color-sky-400"],
            [0.7, "--color-sky-400"],
            [1, "--color-slate-100"],
          ],
        },
        {
          start: -3 - gradLen,
          end: -3,
          stops: [
            [0, "--color-slate-100"],
            [0.3, "--color-sky-400"],
            [0.7, "--color-sky-400"],
            [1, "--color-slate-100"],
          ],
        },
      ],
      update: (l, dt) => {
        const speed = 4 / 1000;
        l.grads.forEach((g) => {
          g.start += dt * speed;
          g.end += dt * speed;
          if (g.start > l.totalLength()) {
            g.start = -gradLen;
            g.end = 0;
          }
        });
      },
    });
    line.addPoint(1, 1);
    line.addPoint(2, 2);
    line.addPoint(8, 2);
    line.addPoint(9, 3);
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
