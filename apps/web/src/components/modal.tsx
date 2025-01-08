import {
  Modal as RacModal,
  ModalOverlay as RacModalOverlay,
} from "react-aria-components";
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

export function Modal({ children, ...props }: ModalOverlayProps) {
  return (
    <RacModal
      {...props}
      className="fill-mode-forwards entering:animate-in entering:slide-in-from-right exiting:animate-out exiting:slide-out-to-right absolute top-0 right-0 h-screen w-64 bg-slate-950 text-white duration-300 ease-in-out"
    >
      {children}
    </RacModal>
  );
}
