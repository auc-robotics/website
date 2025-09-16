import { clamp, resolveColor } from "@/util";
export type Point = [number, number];

export interface CanvasObject {
  draw(canvas: CanvasCtx): void;
  animate(canvas: CanvasCtx, dt: number): void;
}

export interface Gradient {
  start: number;
  end: number;
  stops: [number, string][];
}

export class Line implements CanvasObject {
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
      points?: Point[];
      gradients?: Gradient[];
      update?: (line: Line, dt: number) => void;
    } = {},
  ) {
    options.lineWidth ||= 1;
    options.strokeStyle ||= "black";

    this.points = options.points || [];

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
