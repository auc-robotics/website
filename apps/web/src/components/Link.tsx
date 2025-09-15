import { Link as RacLink } from "react-aria-components";
import type { LinkProps } from "react-aria-components";

export default function Link({ children, ...props }: LinkProps) {
  return (
    <RacLink
      {...props}
      className="text-secondary hover:text-primary transition"
    >
      {children}
    </RacLink>
  );
}
