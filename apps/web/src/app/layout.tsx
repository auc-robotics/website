import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import { ClientProvider } from "@/components/ClientProvider";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
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
      className={`antialiased ${roboto.variable} ${bourgeouisRounded.variable}`}
    >
      <body className="bg-slate-100">
        <ClientProvider>
          <div className="flex min-h-screen flex-col text-lg">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
