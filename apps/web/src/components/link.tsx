import NextLink from "next/link";
import type { LinkProps } from "next/link";

export default function Link({
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  return (
    <NextLink
      {...props}
      className="text-secondary hover:text-primary transition"
    >
      {children}
    </NextLink>
  );
}
