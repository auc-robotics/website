"use client";
import Card from "@/components/Card";
import Link from "@/components/Link";
import { ArrowRight, Handshake, Users } from "lucide-react";
import { Button as RacButton } from "react-aria-components";

export default function GetInvolved() {
  return (
    <div className="text-secondary flex flex-col items-center gap-8 px-32">
      <div className="fade-in animate-in slide-in-from-top-4 flex flex-col items-center duration-500">
        <h2 className="font-display mt-12 mb-4 text-7xl leading-[0.85] md:text-8xl">
          Get Involved!
        </h2>
        <p className="max-w-[65ch] text-2xl">
          Whether you&apos;re a student passionate about robotics or an
          organization looking to support innovation, there&apos;s a way for you
          to support our mission.
        </p>
      </div>
      <div className="text-secondary mb-8 flex flex-col justify-center gap-8 md:flex-row">
        <Card delay="50ms">
          <div className="flex h-full flex-col gap-2 p-8">
            <Users size={32} className="mb-8" />
            <h3 className="text-2xl font-bold">Join the Club</h3>
            <p>
              Join the AUC Robotics club and get started developing real-world
              robotics skills through our hands-on workshops and training
              sessions. Take part in collaborative projects and compete to bring
              your robotics solutions to life.
            </p>
            <div className="flex-1" />
            <RacButton className="bg-secondary flex w-full cursor-not-allowed items-center justify-center gap-1 rounded-md p-2 font-bold text-slate-50">
              Applications Closed
            </RacButton>
          </div>
        </Card>
        <Card delay="150ms">
          <div className="flex h-full flex-col gap-2 p-8">
            <Handshake size={32} className="mb-8" />
            <h3 className="text-2xl font-bold">Partner With Us</h3>
            <p>
              Support the next generation of roboticists and innovators. Partner
              with us to increase brand visibility and outreach, foster
              innovation, and make a lasting impact on our students.
            </p>
            <div className="flex-1" />
            <Link
              href="mailto:robotics@aucegypt.com?subject=Sponsorship Inquiry"
              className="bg-secondary flex w-full cursor-pointer items-center justify-center gap-1 rounded-md p-2 font-bold text-slate-50! hover:brightness-120"
            >
              Become a Sponsor
              <ArrowRight />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
