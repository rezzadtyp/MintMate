import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "@/components/ui/sonner";

const font = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MintMate",
  description:
    "On MintMate, the process is celebrated—every brushstroke, every note, every line of code. It&nbsp;s all part of the journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThirdwebProvider>
          <Navbar />
          {children}
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
