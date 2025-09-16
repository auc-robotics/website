import { useEffect, useRef } from "react";
export * from "../canvasObject";

class CanvasCtx {
  ctx: CanvasRenderingContext2D;
  ox: number;
  oy: number;
  width: number;
  height: number;
  preserveAspectRatio: boolean;
  afId: number = 0; // animation frame id
  objects: CanvasObject[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    options: {
      width?: number;
      height?: number;
      ox?: number;
      oy?: number;
      preserveAspectRatio?: boolean;
    } = {},
  ) {
    this.ctx = canvas.getContext("2d")!;
    this.ox = options.ox || 0;
    this.oy = options.oy || 0;
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
      const unit = Math.max(cw / this.width, ch / this.height);
      this.width = cw / unit;
      this.height = ch / unit;
    }
  }

  toCoords(x: number, y: number): Point {
    return [
      ((x + this.ox) / this.width) * this.ctx.canvas.width,
      ((y + this.oy) / this.height) * this.ctx.canvas.height,
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
    for (const object of this.objects) {
      object.animate(this, t);
    }
    this.afId = requestAnimationFrame(this.animate.bind(this));
  }

  stopAnimate() {
    cancelAnimationFrame(this.afId);
    this.afId = 0;
  }
}

export default function Canvas({
  children,
  ox,
  oy,
  width,
  height,
  ref,
}: {
  children?: (ctx: CanvasCtx) => void;
  ox?: number;
  oy?: number;
  width?: number;
  height?: number;
  ref?: React.Ref<CanvasCtx>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasCtx | null>(null);

  useEffect(() => {
    ctxRef.current = new CanvasCtx(canvasRef.current!, {
      ox,
      oy,
      width,
      height,
      preserveAspectRatio: true,
    });
    const c = ctxRef.current;
    if (ref) ref.current = c;
    if (children) children(c);
    requestAnimationFrame(c.animate.bind(c));

    return () => {
      c.stopAnimate();
    };
  }, []);
  useEffect(() => {
    const c = ctxRef.current;
    if (c) {
      c.width = width;
      c.height = height;
      c.updateSize();
    }
  }, [width, height]);

  return (
    <div className="size-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
