'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  RocketLaunch, 
  Lightning, 
  Crown, 
  UsersFour, 
  Users, 
  Phone, 
  WifiHigh, 
  DeviceMobile,
  User,
  UsersThree,
  Plus,
  Minus
} from '@phosphor-icons/react';
import Link from 'next/link';
import PacksGrid from '../offerings/packs/PacksGrid';
import FibraMovilConfigurator from '../offerings/fibra-movil/FibraMovilConfigurator';
import SoloFibraConfigurator from '../offerings/solo-fibra/SoloFibraConfigurator';
import SoloMovilConfigurator from '../offerings/solo-movil/SoloMovilConfigurator';
import { useIsMobile } from '@/hooks/useIsMobile';

type ViewType = 'packs' | 'fibra-movil' | 'solo-fibra' | 'solo-movil';

const motionConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const AUTO_SWITCH_DELAY = 5000; // 5 seconds

interface PackCardProps {
  title: string;
  description: string;
  features?: string[];
  price: string;
  isPopular?: boolean;
  delay: number;
  gb: string;
  speed: string;
}

interface FibraMovilCardProps {
  title: string;
  speed: string;
  price: string;
  features: string[];
  delay: number;
}

interface ConfigurablePlanCardProps {
  title: string;
  speed: string;
  basePrice: string;
  mainLineGB: string;
  features: string[];
  delay: number;
}

interface FibraMovilConfig {
  selectedPlan: number;
  additionalLines: {
    line20GB: number;
    line40GB: number;
    line60GB: number;
  };
}

const FIBRA_MOVIL_PLANS = [
  { 
    title: 'Básico',
    speed: '300',
    data: '45',
    basePrice: 33.00,
    features: ['Llamadas ilimitadas', 'Router WiFi 6']
  },
  { 
    title: 'Estándar',
    speed: '500',
    data: '60',
    basePrice: 40.00,
    features: ['Llamadas ilimitadas', 'Router WiFi 6']
  },
  { 
    title: 'Pro',
    speed: '500',
    data: '115',
    basePrice: 45.00,
    features: ['Llamadas ilimitadas', 'Router WiFi 6']
  },
  { 
    title: 'Premium',
    speed: '1000',
    data: '115',
    basePrice: 55.00,
    features: ['Llamadas ilimitadas', 'Router WiFi 6']
  }
];

export default function Plans() {
  const [activeView, setActiveView] = useState<ViewType>('packs');
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Opacity animation only
  const overlayOpacity = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [0, 0.6, 0.6, 0]
  );
  
  // Subtle scale animation
  const overlayScale = useTransform(scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1.1, 1, 1, 1.1]
  );

  const views = [
    { id: 'packs', label: 'Packs' },
    { id: 'fibra-movil', label: 'Fibra + Móvil' },
    { id: 'solo-fibra', label: 'Solo Fibra' },
    { id: 'solo-movil', label: 'Solo Móvil' }
  ];

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d5f2f5] via-[#f8fbfc] to-[#d5f2f5]" />

      {/* Deep Blue Base Layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{ 
          opacity: overlayOpacity,
          backgroundImage: `linear-gradient(to bottom right, var(--quinary) 0%, var(--quinary) 10%, transparent 50%)`
        }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          opacity: overlayOpacity,
          scale: overlayScale,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--quinary)_0%,_var(--quaternary)_20%,_transparent_60%)] blur-3xl opacity-60" />
      </motion.div>

      {/* Static Background Patterns */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ 
          opacity: overlayOpacity,
          scale: overlayScale,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, var(--quinary) 0%, transparent 30%),
            radial-gradient(circle at 80% 80%, var(--quinary) 0%, transparent 30%),
            radial-gradient(circle at 50% 50%, var(--quinary) 0%, transparent 40%),
            radial-gradient(circle at 30% 70%, var(--quaternary) 0%, transparent 30%)
          `,
          backgroundSize: '100% 100%',
        }}
      />

      {/* Additional Deep Blue Accents */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ 
          opacity: overlayOpacity,
          backgroundImage: `
            linear-gradient(45deg, var(--quinary) 0%, transparent 40%),
            linear-gradient(135deg, var(--quinary) 0%, transparent 40%)
          `,
        }}
      />

      {/* Static Dots Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{ 
          backgroundImage: `radial-gradient(var(--quinary) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        <motion.h2
          {...motionConfig}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-shimmer-dark relative z-10 drop-shadow-[0_2px_10px_rgba(41,44,246,0.4)] [text-shadow:0_2px_15px_rgba(255,255,255,0.5),0_-1px_1px_rgba(0,0,0,0.2)]"
        >
          Nuestros Planes
        </motion.h2>

        <div className="flex justify-center mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-md w-full max-w-[400px] md:max-w-fit"
          >
            <div className="grid grid-cols-2 md:flex md:flex-row gap-2">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => handleViewChange(view.id as ViewType)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 md:px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeView === view.id
                      ? 'bg-gradient-new text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full min-h-[650px] md:min-h-[750px] z-10"
        >
          {activeView === 'packs' && <PacksGrid />}
          {activeView === 'fibra-movil' && <FibraMovilConfigurator />}
          {activeView === 'solo-fibra' && <SoloFibraConfigurator />}
          {activeView === 'solo-movil' && <SoloMovilConfigurator />}
        </motion.div>
      </div>

      {/* Add custom styles for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
} 