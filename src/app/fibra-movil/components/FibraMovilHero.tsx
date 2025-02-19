'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  WifiHigh, DeviceMobile, Phone, Cloud, Cpu, Database, Globe, 
  Desktop, SimCard, Broadcast, Lightning, ChatCircleDots 
} from '@phosphor-icons/react';
import { HeroConfigurator } from '@/components/offerings/fibra-movil/FibraMovilConfigurator';
import HeroPacks from '@/components/offerings/packs/HeroPacks';

export const FibraMovilHero = () => {
  const [activeTab, setActiveTab] = useState<'packs' | 'configurator'>('configurator');
  
  const floatingIcons = [
    // Left side
    { Icon: WifiHigh, top: '15%', left: '10%', duration: 8, delay: 0, size: 42 },
    { Icon: DeviceMobile, top: '70%', left: '15%', duration: 10, delay: 1, size: 36 },
    { Icon: Cloud, top: '40%', left: '8%', duration: 12, delay: 2, size: 48 },
    { Icon: Cpu, bottom: '15%', left: '20%', duration: 9, delay: 1.5, size: 32 },
    { Icon: Database, top: '25%', left: '22%', duration: 11, delay: 0.5, size: 38 },
    
    // Center
    { Icon: Globe, top: '10%', left: '45%', duration: 15, delay: 2, size: 52 },
    { Icon: Desktop, bottom: '20%', left: '48%', duration: 13, delay: 1, size: 44 },
    { Icon: SimCard, top: '35%', left: '35%', duration: 10, delay: 3, size: 34 },
    
    // Right side
    { Icon: Phone, top: '20%', right: '15%', duration: 9, delay: 2, size: 40 },
    { Icon: Lightning, bottom: '25%', right: '12%', duration: 11, delay: 3, size: 36 },
    { Icon: Broadcast, top: '45%', right: '18%', duration: 12, delay: 1.5, size: 46 },
    { Icon: ChatCircleDots, top: '15%', right: '25%', duration: 14, delay: 0.8, size: 38 }
  ];

  return (
    <section id="hero" className="relative min-h-[100vh] pt-[115px] -mt-[115px] bg-dark overflow-hidden flex items-center">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-new opacity-95" />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, duration, delay, size, ...position }, index) => (
        <motion.div
          key={index}
          className={`absolute pointer-events-none ${
            index > 5 ? 'hidden sm:block' : index > 10 ? 'hidden lg:block' : ''
          }`}
          style={{ ...position }}
          animate={{
            y: [0, -20, 0],
            x: [-5, 5, -5],
            rotate: [-3, 3, -3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-lg" />
            <div className="relative">
              <Icon 
                size={size} 
                weight="regular" 
                className="text-white/40 transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(81, 252, 255, 0.3))'
                }}
              />
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          backgroundPosition: ["0px 0px", "100px 100px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
      </motion.div>

      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 md:space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[2.5rem] md:text-[4rem] font-black leading-none text-white"
            >
              FIBRA + MÓVIL
              <br />
              <span className="bg-gradient-bright bg-clip-text text-transparent">TODO EN UNO</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-white/80 max-w-3xl"
            >
              Combina la potencia de la fibra óptica con la libertad de datos móviles ilimitados. La solución completa para tu hogar y tu vida en movimiento.
            </motion.p>

            {/* Tab Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex relative z-10"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-md w-fit">
                <div className="grid grid-cols-2 md:flex md:flex-row gap-3">
                  <button
                    onClick={() => setActiveTab('configurator')}
                    className={`flex items-center justify-center gap-2 rounded-xl px-6 md:px-8 py-3 text-base font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === 'configurator'
                        ? 'bg-gradient-new text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    Configurador
                  </button>
                  <button
                    onClick={() => setActiveTab('packs')}
                    className={`flex items-center justify-center gap-2 rounded-xl px-6 md:px-8 py-3 text-base font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === 'packs'
                        ? 'bg-gradient-new text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    Packs
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Configurator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {activeTab === 'packs' ? (
              <div className="space-y-6">
                <HeroPacks />
              </div>
            ) : (
              <div className="space-y-6">
                <HeroConfigurator />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 