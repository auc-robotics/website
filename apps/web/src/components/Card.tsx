"use client";
import { useEffect, useRef } from "react";

export default function Card({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay?: string;
}) {
  if (!delay) delay = "0";
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0");
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      }
    });
    observer.observe(divRef.current!);
  }, []);

  return (
    <div
      ref={divRef}
      className="slide-in-from-top-4 fade-in w-full max-w-md rounded-xl border border-slate-400 bg-slate-50 opacity-0 duration-500"
      style={{ animationDelay: delay, transitionDelay: delay }}
    >
      {children}
    </div>
  );
}
