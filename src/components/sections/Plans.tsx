'use client';

import { motion } from 'framer-motion';
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
import { useState } from 'react';
import PacksGrid from '../offerings/packs/PacksGrid';
import FibraMovilConfigurator from '../offerings/fibra-movil/FibraMovilConfigurator';
import SoloFibraConfigurator from '../offerings/solo-fibra/SoloFibraConfigurator';
import SoloMovilConfigurator from '../offerings/solo-movil/SoloMovilConfigurator';

const motionConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

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
  const [selectedOffering, setSelectedOffering] = useState('packs');

  const offerings = [
    { id: 'packs', label: 'Packs' },
    { id: 'fibra-movil', label: 'Fibra + Móvil' },
    { id: 'solo-fibra', label: 'Solo Fibra' },
    { id: 'solo-movil', label: 'Solo Móvil' }
  ];

  return (
    <section className="py-20">
      {/* Title with gradient animation */}
      <div className="container mx-auto px-4 mb-12">
        <motion.h2
          {...motionConfig}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-shimmer"
        >
          Nuestros Planes
        </motion.h2>

        {/* Pills Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100/80 backdrop-blur-sm rounded-2xl p-1.5 flex flex-wrap justify-center gap-1 max-w-[95%] mx-auto">
            {offerings.map((offering) => (
              <button
                key={offering.id}
                onClick={() => setSelectedOffering(offering.id)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedOffering === offering.id
                    ? 'bg-white shadow-sm text-[--quaternary]'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {offering.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Container with adjusted padding and snap alignment */}
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          {selectedOffering === 'packs' && <PacksGrid />}
          {selectedOffering === 'fibra-movil' && <FibraMovilConfigurator />}
          {selectedOffering === 'solo-fibra' && <SoloFibraConfigurator />}
          {selectedOffering === 'solo-movil' && <SoloMovilConfigurator />}
        </div>
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