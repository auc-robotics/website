"use client";

import {
  SiFacebook,
  SiInstagram,
  SiFacebookHex,
  SiInstagramHex,
} from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col gap-8 border-t border-t-slate-600 bg-slate-950 px-8 py-4 text-white md:px-32">
      <nav>
        <ul className="flex gap-4 max-md:flex-col md:justify-center">
          <li>
            <Link
              href="https://www.facebook.com/AUCRoboticsClub/"
              target="_blank"
              className="flex gap-2 transition hover:text-[color:var(--color-hover)]"
              style={{ "--color-hover": SiFacebookHex } as React.CSSProperties}
            >
              <SiFacebook />
              <span>AUCRoboticsClub</span>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/robotics_auc/"
              target="_blank"
              className="flex gap-2 transition hover:text-[color:var(--color-hover)]"
              style={{ "--color-hover": SiInstagramHex } as React.CSSProperties}
            >
              <SiInstagram />
              <span>robotics_auc</span>
            </Link>
          </li>
          <li>
            <Link
              href="mailto:robotics@aucegypt.edu"
              target="_blank"
              className="hover:text-primary flex gap-2 transition"
            >
              <Mail />
              <span>robotics@aucegypt.edu</span>
            </Link>
          </li>
        </ul>
      </nav>
      <p className="text-center">
        © 2025 AUC Robotics Club. All rights reserved.
      </p>
    </div>
  );
}
