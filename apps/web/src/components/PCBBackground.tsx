"use client";

import Canvas, { CanvasCtx, Line } from "@/components/Canvas";
import { useState, useRef, useEffect } from "react";
import { generatePCBDesign } from "@/lib/genPCB";

const translateGradients = (line: Line, dt: number) => {
  const speed = 0.008;
  for (let i = 0; i < line.grads.length; i++) {
    const grad = line.grads[i];
    grad.start += speed * dt;
    grad.end += speed * dt;
    if (grad.start > line.totalLength()) {
      line.grads.splice(i, 1);
    }
  }
};

export default function PCBBackground() {
  const divRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasCtx | null>(null);
  const firstResize = useRef<boolean>(true);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    let debounceTimer: number;
    let interval: number;
    const render = () => {
      const cellSize = 32;
      const div = divRef.current!;

      const h = Math.ceil(div.clientHeight / cellSize);
      const w = Math.ceil(div.clientWidth / cellSize);
      setHeight(h);
      setWidth(w);

      const pcbDesign = generatePCBDesign(w + 2, h + 2);
      const c = ctxRef.current!;
      c.objects = [];
      for (const line of pcbDesign) {
        c.add(
          new Line({
            strokeStyle: "--color-slate-200",
            lineWidth: 8,
            points: line,
            update: translateGradients,
          }),
        );
      }

      interval = window.setInterval(() => {
        const c = ctxRef.current!;
        const l = c.objects.length;
        if (l == 0) return;
        const line = c.objects[Math.floor(Math.random() * l)] as Line;
        line.grads.push({
          start: -2,
          end: 0,
          stops: [
            [0, "--color-slate-200"],
            [0.2, "--color-sky-300"],
            [0.8, "--color-sky-300"],
            [1, "--color-slate-200"],
          ],
        });
      }, 8000 / pcbDesign.length);
    };

    render();
    const observer = new ResizeObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        if (firstResize.current) {
          firstResize.current = false;
          return;
        }
        clearInterval(interval);
        render();
      }, 300);
    });
    observer.observe(divRef.current!);
    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, []);

  return (
    <div ref={divRef} className="size-full">
      <Canvas ox={-0.5} oy={-0.5} width={width} height={height} ref={ctxRef} />
    </div>
  );
}
