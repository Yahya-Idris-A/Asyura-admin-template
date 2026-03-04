import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "@/components/organisms/ToastContainer";
import { ModalContainer } from "@/components/organisms/ModalContainer";
import { GlobalLoader } from "@/components/organisms/GlobalLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Universal Admin Template",
  description: "Enterprise-grade dashboard architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen`}>
        {children}
        <ToastContainer />
        <ModalContainer />
        <GlobalLoader />
      </body>
    </html>
  );
}