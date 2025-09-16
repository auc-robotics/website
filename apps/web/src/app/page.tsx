import Carousel from "@/components/Carousel";
import MailchimpForm from "@/components/MailchimpForm";
import Typewriter from "@/components/Typewriter";
import PCBBackground from "@/components/PCBBackground";

export default function Home() {
  return (
    <div className="*:px-8 *:py-6 md:*:px-32">
      <section className="relative md:h-[80svh]">
        <div className="absolute inset-0 -z-20 opacity-50">
          <PCBBackground />
        </div>
        <div className="z-10 flex h-full flex-col items-center justify-around gap-8 md:flex-row">
          <h2 className="font-display text-secondary animate-in fade-in slide-in-from-top-4 text-7xl leading-[0.85] transition-none duration-500 md:text-8xl">
            UNLEASH THE LIMITLESS POSSIBILITIES OF{" "}
            <span className="text-primary">ROBOTICS</span>
          </h2>

          <div className="flex aspect-square max-h-full min-w-80 flex-1 items-center justify-center rounded-md bg-neutral-500 font-bold text-white">
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
