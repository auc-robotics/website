import Typewriter from "@/components/Typewriter";

export default function Home() {
  return (
    <div className="*:px-8 *:py-6 md:*:px-32">
      <section className="flex flex-col items-center justify-around gap-8 md:h-[80svh] md:flex-row">
        <h2 className="font-display text-secondary animate-in fade-in slide-in-from-top-4 text-7xl leading-[0.85] transition-none duration-500 md:text-8xl">
          UNLEASH THE LIMITLESS POSSIBILITIES OF{" "}
          <span className="text-primary">ROBOTICS</span>
        </h2>

        <div className="flex aspect-square max-h-full min-w-80 flex-1 items-center justify-center rounded-md bg-neutral-500 font-bold text-white">
          CAROUSEL PLACEHOLDER
        </div>
      </section>
      <section className="relative flex h-[80svh] bg-slate-950 text-white">
        <h2 className="mt-32 text-3xl font-black md:text-7xl">
          LEARN{" "}
          <Typewriter
            words={[
              { word: "PROGRAMMING", className: "text-green-400" },
              { word: "PCB DESIGN", className: "text-sky-400" },
              { word: "3D MODELLING", className: "text-purple-500" },
              { word: "ELECTRONICS", className: "text-yellow-300" },
            ]}
          />
        </h2>
      </section>
    </div>
  );
}
