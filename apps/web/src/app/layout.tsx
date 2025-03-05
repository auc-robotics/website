import "./globals.css";
import Header from "@/components/header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import { ClientProvider } from "@/components/client-provider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});
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
    <html
      lang="en"
      className={`scroll-smooth antialiased ${roboto.variable} ${bourgeouisRounded.variable}`}
    >
      <body className="bg-slate-50">
        <ClientProvider>
          <Header />
          <div>{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
}
