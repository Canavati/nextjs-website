import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HeroProvider } from '@/contexts/HeroContext';
import { ConfiguratorProvider } from '@/context/ConfiguratorProvider';
import ConfigurationForm from '@/components/ui/ConfigurationForm';

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://unimovil-demo.vercel.app'),
  title: {
    default: "Unimóvil - Internet y Móvil Sin Límites",
    template: "%s | Unimóvil"
  },
  description: "Descubre nuestros servicios de fibra y móvil sin permanencia. Internet de alta velocidad y tarifas móviles flexibles.",
  keywords: ["fibra óptica", "móvil", "internet", "tarifas móviles", "wifi", "telecomunicaciones", "España"],
  authors: [{ name: "Unimóvil" }],
  creator: "Unimóvil",
  publisher: "Unimóvil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://unimovil-demo.vercel.app',
    title: 'Unimóvil - Internet y Móvil Sin Límites',
    description: 'Descubre nuestros servicios de fibra y móvil sin permanencia. Internet de alta velocidad y tarifas móviles flexibles.',
    siteName: 'Unimóvil',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Unimóvil - Internet y Móvil Sin Límites',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unimóvil - Internet y Móvil Sin Límites',
    description: 'Descubre nuestros servicios de fibra y móvil sin permanencia. Internet de alta velocidad y tarifas móviles flexibles.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Create error boundary component
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="error-boundary">
      {children}
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} pt-total-nav min-h-screen relative overflow-x-hidden`}>
        <ErrorBoundary>
          <HeroProvider>
            <ConfiguratorProvider>
              <div className="h-1 bg-primary fixed top-0 left-0 z-[1002] transition-all duration-300" id="scroll-progress" />
              <TopBar />
              <Header />
              <main className="min-h-screen w-full relative overflow-hidden">
                {children}
              </main>
              <Footer />
              <ConfigurationForm />
            </ConfiguratorProvider>
          </HeroProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
