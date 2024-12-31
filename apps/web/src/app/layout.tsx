import "./globals.css";
import Header from "@/components/header";
import type { Metadata } from "next";
import localFont from "next/font/local";

const bourgeouisRounded = localFont({
  src: [
    {
      path: "./BourgeoisRounded-UltraBoldCondensed.woff2",
      weight: "800",
    },
  ],
  variable: "--font-bourgeois-rounded",
});

export const metadata: Metadata = {
  title: "AUC Robotics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`antialiased ${bourgeouisRounded.variable}`}>
      <body className="bg-slate-50">
        <Header />
        {children}
      </body>
    </html>
  );
}
