'use client';

import { motion } from 'framer-motion';
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          {...motionConfig}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-shimmer"
        >
          Nuestros Planes
        </motion.h2>

        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-2 shadow-md w-full max-w-[400px] md:max-w-fit"
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
          className="relative w-full min-h-[650px] md:min-h-[750px]"
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