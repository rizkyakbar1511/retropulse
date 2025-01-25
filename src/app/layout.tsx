import type { Metadata } from "next";
import { Dela_Gothic_One, Inter } from "next/font/google";
import "./globals.css";
import ProgressBarProvider from "@/providers/ProgressBarProvider";

const delaGothicFont = Dela_Gothic_One({
  variable: "--heading-font",
  subsets: ["latin"],
  weight: "400",
});

const interFont = Inter({
  variable: "--body-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RetroPulse - Your Gateway to Classic Gaming",
  description:
    "Experience the golden age of gaming with RetroPulse. Play classic arcade, console, and retro games all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${delaGothicFont.variable} ${interFont.variable} antialiased bg-main`}>
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </body>
    </html>
  );
}
