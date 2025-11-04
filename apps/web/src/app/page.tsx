import Carousel from "@/components/Carousel";
import CTAButton from "@/components/CTAButton";
import MailchimpForm from "@/components/MailchimpForm";
import PCBBackground from "@/components/PCBBackground";
import Typewriter from "@/components/Typewriter";
import Image from "next/image";
import { Zap, Trophy, FlaskConical, type LucideIcon } from "lucide-react";

function FeatureCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: string;
}) {
  return (
    <div className="flex w-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-8">
      <Icon size={32} className="mb-8" />
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="text-lg *:px-8 *:py-6 md:text-xl md:*:px-32">
      <section className="relative h-[calc(100vh-var(--spacing)*18)]">
        <div className="absolute inset-0 -z-10 opacity-50">
          <PCBBackground />
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h2 className="font-display text-secondary animate-in fade-in slide-in-from-top-4 mb-4 max-w-4xl text-center text-7xl leading-[0.85] transition-none duration-500 md:text-8xl lg:text-9xl">
            BUILDING THE FUTURE OF{" "}
            <span className="text-primary">ROBOTICS</span> AT AUC
          </h2>
          <p className="text-secondary max-w-[65ch] font-bold">
            Robotics AUC is the hub for robotics innovation at the American
            University in Cairo. We inspire students to explore, create, and
            excel in robotics through hands-on projects, competitions, and a
            vibrant community.
          </p>
          <div>
            <CTAButton>GET INVOLVED</CTAButton>
          </div>
        </div>
      </section>
      <section className="text-secondary relative flex flex-col bg-slate-100">
        <h2 className="mt-16 mb-8 text-center text-5xl font-bold md:mt-24 lg:text-7xl">
          WHAT WE DO
        </h2>
        <div className="flex flex-col gap-8 lg:flex-row">
          <FeatureCard title={"Workshops & Training"} icon={Zap}>
            From line-following robots to fully autonomous vehicles, we run
            hands-on workshops that help students of all levels learn and apply
            robotics skills.
          </FeatureCard>
          <FeatureCard title={"Research & Innovation"} icon={FlaskConical}>
            Our research and development members collaborate on cutting-edge
            projects that push the boundaries of robotics and technology.
          </FeatureCard>
          <FeatureCard title={"Competitions"} icon={Trophy}>
            We represent AUC in national and international competitions,
            designing, building, and showcasing our robotics solutions.
          </FeatureCard>
        </div>
      </section>
      <section className="relative flex flex-col bg-slate-950 text-white">
        <h2 className="mt-16 mb-8 text-5xl font-black md:mt-24 lg:text-7xl">
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
        <p className="mb-16 max-w-[65ch]">
          Robotics is at the heart of many different fields. It&apos;s the
          intersection of everything from programming and artificial
          intelligence, to electronics and mechanics. Our workshops will teach
          you these skills and show you how they fit together to build an
          amazing robot.
        </p>
        <div className="-mx-8 md:-mx-32">
          <Carousel>
            <div className="flex gap-2 *:rounded-lg">
              <Image
                src="/image/level1_car.jpg"
                alt="Students building a line-follower car."
                width={480}
                height={270}
              />
              <Image
                src="/image/programming.jpg"
                alt="Students programming an Arduino board."
                width={480}
                height={270}
              />
              <Image
                src="/image/level1_competition.jpg"
                alt="Contestants after the line-follower competition."
                width={480}
                height={270}
              />
              <Image
                src="/image/soldering.jpg"
                alt="AUC Robotics member soldering on a solderable breadboard."
                width={480}
                height={270}
              />
              <Image
                src="/image/3d_modelling.jpg"
                alt="AUC Robotics insturctor showcasing a 3d model."
                width={480}
                height={270}
              />
              <Image
                src="/image/workshop.jpg"
                alt="Students sitting in a classroom for a workshop."
                width={480}
                height={270}
              />
            </div>
          </Carousel>
        </div>
      </section>
      <section className="flex flex-col gap-4 bg-slate-800 text-white">
        <h2 className="text-center text-5xl font-bold">
          Sign up for our newsletter!
        </h2>
        <p className="text-center">
          Get the latest robotics news delivered straight to your inbox.
        </p>
        <MailchimpForm />
      </section>
    </div>
  );
}
