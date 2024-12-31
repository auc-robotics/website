import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo.svg";

export default function Header() {
  return (
    <div className="flex border-b border-b-slate-100">
      <Link href="/" className="flex items-center gap-4 px-4 py-2">
        <Image src={Logo} alt="AUC Robotics Logo" className="size-16" />
        {/* HACK: -translate-y-[5%] makes it look more centered vertically */}
        <h1 className="font-display text-primary -translate-y-[5%] text-5xl">
          AUC ROBOTICS
        </h1>
      </Link>
    </div>
  );
}
