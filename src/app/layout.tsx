import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

const font = Space_Grotesk({ subsets: ["latin"] });

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
          <Footer />
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
