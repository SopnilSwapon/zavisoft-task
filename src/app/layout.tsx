import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import AppFooter from "./components/shared/AppFooter";
import AppNavbar from "./components/shared/AppNavbar";
import { CartProvider } from "@/context/CardContext";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "KICKS APP",
  description: "KIcks app is an e-commerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} antialiased  bg-[#E7E7E3] max-w-330 w-full mx-auto p-4 pb-0 md:p-0`}
      >
        <CartProvider>
          <AppNavbar />
          <div className="mt-22.5 sm:mt-30 xl:mt-36">{children}</div>
          <AppFooter />
        </CartProvider>
      </body>
    </html>
  );
}
