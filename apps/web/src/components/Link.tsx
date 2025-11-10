"use client";
import { Link as RacLink } from "react-aria-components";
import type { LinkProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export default function Link({ children, className, ...props }: LinkProps) {
  return (
    <RacLink
      {...props}
      className={twMerge(
        "text-secondary hover:text-primary transition",
        className,
      )}
    >
      {children}
    </RacLink>
  );
}
