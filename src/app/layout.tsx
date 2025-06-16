import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import QueryProvider from "@/components/QueryClient";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Multikart",
  description: "Your one stop shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <StoreProvider>
          <QueryProvider>
            {children}
            <Toaster richColors />
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
