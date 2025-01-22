import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unimóvil - Internet y Móvil Sin Límites",
  description: "Descubre nuestros servicios de fibra y móvil sin permanencia. Internet de alta velocidad y tarifas móviles flexibles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} pt-total-nav min-h-screen relative overflow-x-hidden`}>
        <div className="h-1 bg-primary fixed top-0 left-0 z-[1002] transition-all duration-300" id="scroll-progress" />
        <TopBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
