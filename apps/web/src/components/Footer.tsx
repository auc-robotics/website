"use client";

import {
  SiFacebook,
  SiInstagram,
  SiFacebookHex,
  SiInstagramHex,
  SiYoutube,
  SiYoutubeHex,
} from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { resolveColor } from "@/lib/util";

function NavLink({
  href,
  children,
  color,
}: {
  href: string;
  children: React.ReactNode;
  color: string;
}) {
  const [resColor, setResColor] = useState(color);
  useEffect(() => {
    setResColor(resolveColor(color));
  }, [color]);
  return (
    <Link
      href={href}
      target="_blank"
      className="flex gap-2 transition hover:text-[color:var(--color-hover)]"
      style={
        {
          "--color-hover": resColor,
        } as React.CSSProperties
      }
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <div className="flex flex-col gap-4 border-t border-t-slate-600 bg-slate-950 px-8 py-4 text-white md:px-32">
      <nav>
        <ul className="grid grid-cols-2 justify-between gap-4 md:flex md:flex-wrap">
          <li>
            <NavLink
              href="https://www.facebook.com/AUCRoboticsClub/"
              color={SiFacebookHex}
            >
              <SiFacebook />
              <span>AUCRoboticsClub</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href="https://www.instagram.com/robotics_auc/"
              color={SiInstagramHex}
            >
              <SiInstagram />
              <span>robotics_auc</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href="https://www.youtube.com/@aucrobotics"
              color={SiYoutubeHex}
            >
              <SiYoutube />
              <span>aucrobotics</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href="mailto:robotics@aucegypt.edu"
              color="--color-primary"
            >
              <Mail />
              <span>robotics@aucegypt.edu</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <p className="text-center">
        © 2025 AUC Robotics Club. All rights reserved.
      </p>
    </div>
  );
}
