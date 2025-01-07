import Image from "next/image";
import Link from "@/components/link";
import NextLink from "next/link";
import Logo from "@/../public/logo.svg";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-b-slate-100 px-4">
      <NextLink href="/" className="flex items-center gap-4 py-2">
        <Image src={Logo} alt="AUC Robotics Logo" className="size-16" />
        {/* HACK: -translate-y makes it look more centered vertically */}
        <h1 className="font-display text-primary -translate-y-[8%] text-5xl">
          AUC ROBOTICS
        </h1>
      </NextLink>
      <nav className="text-secondary pr-4 text-lg font-bold">
        <ul className="flex gap-8">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="#">Events</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
