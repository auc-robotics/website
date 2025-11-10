"use client";
import { Link as RacLink } from "react-aria-components";
import type { LinkProps } from "react-aria-components";

export default function CTALink({ children, ...props }: LinkProps) {
  return (
    <RacLink
      {...props}
      // TODO: add hover effect
      className="text-secondary font-display bg-primary cursor-pointer rounded-lg px-4 py-3 pt-1 text-4xl font-bold text-slate-50 transition"
    >
      {children}
    </RacLink>
  );
}
