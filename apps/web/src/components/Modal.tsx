import { ModalOverlay as RacModalOverlay } from "react-aria-components";
import type { ModalOverlayProps } from "react-aria-components";

export function ModalOverlay({ children, ...props }: ModalOverlayProps) {
  return (
    <RacModalOverlay
      {...props}
      className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out fixed inset-0 bg-black/25"
    >
      {children}
    </RacModalOverlay>
  );
}
