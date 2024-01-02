import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/nav/Navbar";
import { Nunito_Sans } from "next/font/google";
import Providers from "@/components/providers";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", font.className)}
      >
        <Providers>
          <Toaster position="top-center" richColors />

          <main className="relative min-h-screen flex flex-col">
            {/* @ts-ignore */}
            <Navbar />

            <div className="flex-1 flex-grow">{children}</div>

            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
