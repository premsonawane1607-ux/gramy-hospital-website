import type { Metadata } from "next";
import { Libre_Franklin, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gramy Hospital",
  description: "Expertise You Trust. Care You Deserve. Gramy Hospital delivers world-class healthcare.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${inter.variable}`}>
      <head>
        <link rel="stylesheet" href="/vendor/tabler-icons.css" />
        <link rel="stylesheet" href="/vendor/flaticon_hospa.css" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
