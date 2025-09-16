"use client"; // HACK: remove

import Carousel from "@/components/Carousel";
import MailchimpForm from "@/components/MailchimpForm";
import Typewriter from "@/components/Typewriter";
import Canvas, { Line } from "@/components/Canvas";
import { useState, useRef } from "react";

export default function Home() {
  const ctxRef = useRef<CanvasCtx | null>(null);

  const translateGradients = (line: Line, dt: number) => {
    const speed = 0.006;
    for (let i = 0; i < line.grads.length; i++) {
      const grad = line.grads[i];
      grad.start += speed * dt;
      grad.end += speed * dt;
      if (grad.start > line.totalLength()) {
        line.grads.splice(i, 1);
        // const l = grad.end - grad.start;
        // grad.end = 0;
        // grad.start = -l;
      }
    }
  };

  return (
    <div className="*:px-8 *:py-6 md:*:px-32">
      <section className="relative md:h-[80svh]">
        <div
          className="absolute inset-0 z-10 bg-red-600/20"
          onClick={(e) => {
            const line = ctxRef.current!.objects[0] as Line;
            line.grads.push({
              start: 0,
              end: 0.5,
              stops: [
                [0, "red"],
                [1, "red"],
              ],
            });
          }}
        >
          <Canvas ox={0} oy={0} width={20} ref={ctxRef}>
            {(ctx) => {
              const line1 = new Line({
                lineWidth: 6,
                points: [
                  [1, 1],
                  [3, 3],
                  [10, 3],
                ],
                gradients: [
                  {
                    start: 1,
                    end: 2,
                    stops: [
                      [0, "red"],
                      [1, "red"],
                    ],
                  },
                  {
                    start: 4,
                    end: 5,
                    stops: [
                      [0, "blue"],
                      [1, "blue"],
                    ],
                  },
                ],
                update: translateGradients,
              });
              ctx.add(line1);
            }}
          </Canvas>
        </div>
        <div className="relative flex h-full flex-col items-center justify-around gap-8 md:flex-row">
          <h2 className="font-display text-secondary animate-in fade-in slide-in-from-top-4 text-7xl leading-[0.85] transition-none duration-500 md:text-8xl">
            UNLEASH THE LIMITLESS POSSIBILITIES OF{" "}
            <span className="text-primary">ROBOTICS</span>
          </h2>

          <div className="flex aspect-square max-h-full min-w-80 flex-1 items-center justify-center rounded-md bg-neutral-500/10 font-bold text-white">
            CAROUSEL PLACEHOLDER
          </div>
        </div>
      </section>
      <section className="relative flex flex-col bg-slate-950 text-white">
        <h2 className="mt-16 mb-4 text-4xl font-black md:mt-32 lg:text-7xl">
          LEARN <br className="md:hidden" />
          <Typewriter
            words={[
              { word: "PROGRAMMING", className: "text-green-400" },
              { word: "PCB DESIGN", className: "text-sky-400" },
              { word: "3D MODELLING", className: "text-purple-500" },
              { word: "ELECTRONICS", className: "text-yellow-300" },
            ]}
          />
          &nbsp;
        </h2>
        <p className="mb-16 text-xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
          facilis et corrupti, blanditiis deleniti impedit quam debitis cum
          eaque amet, nulla, illo esse natus asperiores doloremque commodi
          voluptatibus voluptatum? Qui.
        </p>
        <div className="-mx-8 md:-mx-32">
          <Carousel>
            <div className="h-50 w-80 rounded-md bg-red-300"></div>
            <div className="h-50 w-80 rounded-md bg-blue-300"></div>
            <div className="h-50 w-80 rounded-md bg-yellow-200"></div>
            <div className="h-50 w-80 rounded-md bg-green-300"></div>
            <div className="h-50 w-80 rounded-md bg-purple-300"></div>
          </Carousel>
        </div>
      </section>
      <section className="flex flex-col gap-4 bg-slate-800 text-white">
        <h2 className="text-center text-5xl font-bold">
          Sign up for our newsletter!
        </h2>
        <p className="text-center text-lg">
          Get the latest robotics news delivered straight to your inbox.
        </p>
        <MailchimpForm />
      </section>
    </div>
  );
}
