import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/web/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinedMyPet",
  description: "A central and community-driven platform that helps pet owners report lost pets and allows community members to browse and search for reported cases",
};

// Root layout is used for all pages in the app
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <body className="min-h-full px-10 bg-yellow-100 w-full text-2xl">
          <main>
              <Navbar />
              {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
