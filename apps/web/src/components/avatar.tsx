"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Canvas, { Line } from "./canvas";

export default function Avatar({
  src,
  name,
  position,
  description,
  orientation = "left",
}: {
  src: string;
  name: string;
  position: string;
  description: string;
  orientation?: "left" | "right";
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [ox, setOx] = useState(0);
  const [oy, setOy] = useState(0);
  useEffect(() => {
    if (imageRef.current) {
      const i = imageRef.current;
      const rect = i.getBoundingClientRect();
      setOx(i.offsetLeft + rect.width / 2);
      setOy(i.offsetTop + rect.height / 2);
      console.log(i.offsetLeft, i.offsetTop);
    }
  }, []);
  return (
    <div
      className={`text-secondary relative -z-50 flex w-min items-center gap-8 rounded-xl p-2 ${orientation === "right" ? "flex-row-reverse" : ""}`}
    >
      <div className="flex w-64 flex-col items-center">
        <Image
          ref={imageRef}
          src={src}
          className="mb-2 size-64 rounded-full border-5 border-slate-400 object-cover object-center"
          alt={`Photo of ${name}.`}
          width={500}
          height={500}
        />
        <div className="text-primary text-xl">
          <h3>
            <span className="font-bold">{name}</span>, {position}
          </h3>
        </div>
      </div>

      <p className="w-86 text-center text-xl">{description}</p>
      <div className="absolute inset-0 -z-40">
        <Canvas width={80} ox={ox} oy={oy}>
          {(ctx) => {
            const gradLen = 12;
            const line = new Line({
              strokeStyle: "--color-slate-400",
              lineWidth: 5,
              gradients: [
                {
                  start: -gradLen,
                  end: 0,
                  stops: [
                    [0, "--color-slate-400"],
                    [0.3, "--color-sky-400"],
                    [0.7, "--color-sky-400"],
                    [1, "--color-slate-400"],
                  ],
                },
              ],
              update: (l, dt) => {
                const speed = -40 / 1000;
                for (const g of l.grads) {
                  g.start += dt * speed;
                  g.end += dt * speed;
                  if (g.end < 0) {
                    g.start = l.totalLength();
                    g.end = l.totalLength() + gradLen;
                  }
                }
              },
            });
            if (orientation === "right") {
              line.addPoint(0, 0);
              line.addPoint(-16, 16);
              line.addPoint(-62, 16);
            } else {
              line.addPoint(0, 0);
              line.addPoint(16, 16);
              line.addPoint(62, 16);
            }
            ctx.add(line);
          }}
        </Canvas>
      </div>
    </div>
  );
}
