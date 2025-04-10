import { Modal } from "react-aria-components";
import type { ModalOverlayProps } from "react-aria-components";

export default function SidebarModal({
  children,
  side,
  ...props
}: ModalOverlayProps & { side: "left" | "right" }) {
  const sideClasses = {
    left: "entering:slide-in-from-left exiting:slide-out-to-left left-0",
    right: "entering:slide-in-from-right exiting:slide-out-to-right right-0",
  };

  return (
    <Modal
      {...props}
      className={`entering:animate-in exiting:animate-out absolute h-screen w-64 bg-slate-100 duration-300 ease-in-out ${sideClasses[side]}`}
    >
      {children}
    </Modal>
  );
}
