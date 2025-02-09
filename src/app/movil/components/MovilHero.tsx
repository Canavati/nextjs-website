'use client';

import { motion } from 'framer-motion';
import { 
  DeviceMobile, CellSignalFull, Crown, Lightning, Cloud, Cpu, Database, Globe, 
  Desktop, SimCard, Broadcast, Phone, ChatCircleDots 
} from '@phosphor-icons/react';
import Image from 'next/image';

export const MovilHero = () => {
  const floatingIcons = [
    // Left side
    { Icon: DeviceMobile, top: '15%', left: '10%', duration: 8, delay: 0, size: 42 },
    { Icon: CellSignalFull, top: '70%', left: '15%', duration: 10, delay: 1, size: 36 },
    { Icon: Cloud, top: '40%', left: '8%', duration: 12, delay: 2, size: 48 },

    { Icon: Cpu, bottom: '15%', left: '20%', duration: 9, delay: 1.5, size: 32 },
    { Icon: Database, top: '25%', left: '22%', duration: 11, delay: 0.5, size: 38 },
    
    // Center
    { Icon: Globe, top: '10%', left: '45%', duration: 15, delay: 2, size: 52 },
    { Icon: Desktop, bottom: '20%', left: '48%', duration: 13, delay: 1, size: 44 },
    { Icon: SimCard, top: '35%', left: '35%', duration: 10, delay: 3, size: 34 },
    
    // Right side
    { Icon: Crown, top: '20%', right: '15%', duration: 9, delay: 2, size: 40 },
    { Icon: Lightning, bottom: '25%', right: '12%', duration: 11, delay: 3, size: 36 },
    { Icon: Phone, top: '45%', right: '18%', duration: 12, delay: 1.5, size: 46 },
    { Icon: ChatCircleDots, top: '15%', right: '25%', duration: 14, delay: 0.8, size: 38 }
  ];

  return (
    <section className="relative min-h-[50vh] bg-dark overflow-hidden flex items-center">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-new opacity-95" />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, duration, delay, size, ...position }, index) => (
        <motion.div
          key={index}
          className={`absolute pointer-events-none ${index > 7 ? 'hidden md:block' : ''}`}
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
        {/* Grid pattern removed */}
      </motion.div>

      <div className="relative container mx-auto px-4 pt-12 md:pt-16 pb-8 md:pb-12">
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
              LÍNEAS MÓVILES
              <br />
              <span className="bg-gradient-bright bg-clip-text text-transparent">SIN LÍMITES</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-white/80 max-w-3xl"
            >
              Mantente conectado con planes móviles flexibles que se adaptan a ti. Disfruta de la mejor cobertura 5G y llamadas ilimitadas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#planes"
                className="inline-block bg-gradient-new text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300 hover:-translate-y-1"
              >
                Ver Planes
              </a>
              <a
                href="#proceso"
                className="inline-block bg-white/10 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/20"
              >
                ¿Cómo Funciona?
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Móvil
                <span className="bg-gradient-bright bg-clip-text text-transparent"> Premium+</span>
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-lg md:text-xl">
                  <DeviceMobile size={32} weight="duotone" className="text-[#51fcff]" />
                  <span>175GB Datos 5G</span>
                </div>
                <div className="flex items-center gap-4 text-lg md:text-xl">
                  <Phone size={32} weight="duotone" className="text-[#51fcff]" />
                  <span>Llamadas Ilimitadas</span>
                </div>
                <div className="flex items-center gap-4 text-lg md:text-xl">
                  <CellSignalFull size={32} weight="duotone" className="text-[#51fcff]" />
                  <span>Máxima Cobertura</span>
                </div>
              </div>


              <div className="flex items-end gap-4 mt-6 md:mt-8">
                <div className="text-[3.5rem] md:text-[5rem] font-black leading-none text-[#51fcff] animate-pulse-subtle drop-shadow-[0_0_8px_rgba(81,252,255,0.5)]">
                  20€
                  <span className="text-xl md:text-2xl text-white/60 ml-2">/mes</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 