"use client";
import { Button as RacButton } from "react-aria-components";
import type { ButtonProps } from "react-aria-components";

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <RacButton
      {...props}
      // TODO: add hover effect
      className="text-secondary font-display bg-primary cursor-pointer rounded-lg px-4 py-3 pt-1 text-4xl font-bold text-slate-50 transition"
    >
      {children}
    </RacButton>
  );
}
