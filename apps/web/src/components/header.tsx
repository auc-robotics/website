"use client";

import Image from "next/image";
import Link from "@/components/link";
import NextLink from "next/link";
import Logo from "@/../public/logo.svg";
import { Heading, DialogTrigger, Dialog, Button } from "react-aria-components";
import { MenuIcon, XIcon } from "lucide-react";
import { ModalOverlay } from "@/components/modal";
import SidebarModal from "@/components/sidebar";
import LoginButton from "./loginButton";

const NavItems = () => (
  <>
    <li>
      <Link href="/meet-the-team">About</Link>
    </li>
    <li>
      <Link href="#">Events</Link>
    </li>
    <li>
      <Link href="#">Articles</Link>
    </li>
  </>
);

export default function Header() {
  return (
    <div className="flex h-18 items-center gap-4 border-b border-b-slate-200 px-4 sm:justify-between">
      <div className="sm:hidden">
        <DialogTrigger>
          <Button
            aria-label="Menu"
            className="flex cursor-pointer items-center text-2xl"
          >
            <MenuIcon size="40" />
          </Button>
          <ModalOverlay isDismissable>
            <SidebarModal side="left">
              <Dialog className="outline-none">
                <div className="flex h-18 w-full items-center gap-4 border-b border-b-slate-200 px-4">
                  <Button slot="close">
                    <XIcon size="40" />
                  </Button>
                  <Heading
                    slot="title"
                    className="text-secondary text-2xl font-bold"
                  >
                    Navigation
                  </Heading>
                </div>
                <nav>
                  <ul className="flex flex-col gap-8 px-6 pt-8 text-xl">
                    <NavItems />
                  </ul>
                </nav>
              </Dialog>
            </SidebarModal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
      <NextLink href="/" className="flex items-center gap-4 py-2">
        <Image src={Logo} alt="AUC Robotics Logo" className="size-16" />
        {/* HACK: -translate-y makes it look more centered vertically */}
        <Heading
          level={1}
          className="font-display text-primary -translate-y-[8%] text-4xl sm:text-5xl"
        >
          AUC ROBOTICS
        </Heading>
      </NextLink>
      <nav className="flex items-center gap-4 text-xl">
        <div className="max-sm:hidden">
          <ul className="flex gap-8">
            <NavItems />
          </ul>
        </div>
        <LoginButton />
      </nav>
    </div>
  );
}
