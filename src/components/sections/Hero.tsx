'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, WifiHigh, DeviceMobile, Rocket, Lightning, Crown, UsersThree, 
  Cloud, Cpu, Database, Globe, Desktop, SimCard, Broadcast, WifiHigh as WifiSignal, 
  GameController, House, ChatCircleDots
} from '@phosphor-icons/react';
import { useState } from 'react';

const offerings = [
  {
    id: 'fibra-movil',
    title: 'Fibra + Móvil',
    displayTitle: 'Pack Single',
    Icon: WifiHigh,
    price: '33,00',
    features: [
      { icon: WifiHigh, text: 'Fibra 300Mb' },
      { icon: DeviceMobile, text: '1 Línea Móvil 50GB' },
      { icon: Phone, text: 'Llamadas ilimitadas' }
    ]
  },
  {
    id: 'fibra',
    title: 'Solo Fibra',
    displayTitle: 'Fibra Estándar',
    Icon: Broadcast,
    price: '30,00',
    features: [
      { icon: WifiHigh, text: 'Fibra 500Mb' },
      { icon: Broadcast, text: 'Router WiFi 6' },
      { icon: Rocket, text: 'Instalación profesional' }
    ]
  },
  {
    id: 'movil',
    title: 'Solo Móvil',
    displayTitle: 'Móvil Básico',
    Icon: DeviceMobile,
    price: '4,90',
    features: [
      { icon: DeviceMobile, text: '10GB Datos' },
      { icon: Phone, text: '1000 min + 150 otros operadores' },
      { icon: WifiSignal, text: 'Cobertura 5G' }
    ]
  }
];

export default function Hero() {
  const [selectedOffering, setSelectedOffering] = useState(offerings[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const floatingIcons = [
    // Left side
    { Icon: WifiHigh, top: '15%', left: '10%', duration: 8, delay: 0, size: 42 },
    { Icon: Lightning, top: '70%', left: '15%', duration: 10, delay: 1, size: 36 },
    { Icon: Cloud, top: '40%', left: '8%', duration: 12, delay: 2, size: 48 },
    { Icon: Cpu, bottom: '15%', left: '20%', duration: 9, delay: 1.5, size: 32 },
    { Icon: Database, top: '25%', left: '22%', duration: 11, delay: 0.5, size: 38 },
    
    // Center
    { Icon: Globe, top: '10%', left: '45%', duration: 15, delay: 2, size: 52 },
    { Icon: Desktop, bottom: '20%', left: '48%', duration: 13, delay: 1, size: 44 },
    { Icon: SimCard, top: '35%', left: '35%', duration: 10, delay: 3, size: 34 },
    
    // Right side
    { Icon: DeviceMobile, top: '20%', right: '15%', duration: 9, delay: 2, size: 40 },
    { Icon: Crown, bottom: '25%', right: '12%', duration: 11, delay: 3, size: 36 },
    { Icon: UsersThree, top: '45%', right: '18%', duration: 12, delay: 1.5, size: 46 },
    { Icon: Broadcast, top: '15%', right: '25%', duration: 14, delay: 0.8, size: 38 },
    { Icon: WifiSignal, bottom: '35%', right: '22%', duration: 10, delay: 2.5, size: 42 },
    { Icon: GameController, top: '60%', right: '15%', duration: 13, delay: 1.2, size: 36 },
    { Icon: House, bottom: '15%', right: '28%', duration: 11, delay: 0.3, size: 44 },
    { Icon: ChatCircleDots, top: '30%', right: '10%', duration: 12, delay: 1.8, size: 34 }
  ];

  return (
    <section id="hero" className="relative min-h-[100vh] pt-[115px] -mt-[115px] bg-dark overflow-hidden flex items-center">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-new opacity-95" />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating Icons - Improved responsive hiding */}
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
        {/* Grid pattern removed */}
      </motion.div>

      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 lg:gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 lg:space-y-8"
          >
            <div className="space-y-0">
              {[...Array(4)].map((_, i) => (
                <motion.h2
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem] font-black leading-[0.85] flex"
                  style={{
                    opacity: 1 - (i * 0.25),
                    color: i === 0 ? '#51fcff' : '#ffffff',
                    textShadow: i === 0 ? '0 0 20px rgba(81, 252, 255, 0.3)' : 'none'
                  }}
                >
                  {i === 0 ? (
                    <>
                      <span 
                        className="text-[--primary]"
                        style={{
                          textShadow: '0 0 20px rgba(255, 49, 98, 0.5)'
                        }}
                      >UNI</span>
                      <span
                        style={{
                          textShadow: '0 0 20px rgba(81, 252, 255, 0.3)'
                        }}
                      >MOVIL</span>
                    </>
                  ) : (
                    'UNIMOVIL'
                  )}
                </motion.h2>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 text-lg lg:text-xl"
            >
              Tu operador móvil de confianza
            </motion.p>

            {/* Offerings Menu - Redesigned */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative mt-12"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                {offerings.map((offering) => (
                  <button
                    key={offering.id}
                    onClick={() => {
                      setSelectedOffering(offering);
                      setIsMenuOpen(true);
                    }}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                      selectedOffering.id === offering.id
                        ? 'bg-gradient-to-r from-[#4361ee] to-[#51fcff] text-white shadow-lg shadow-[#51fcff]/20'
                        : 'bg-white/5 backdrop-blur-sm text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <offering.Icon size={24} weight="duotone" />
                    <span>{offering.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Selected Offering */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              key={selectedOffering.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 lg:p-10 rounded-3xl bg-[#1a1f35]/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="space-y-6 lg:space-y-8">
                <div className="space-y-2">
                  <h2 className="text-4xl lg:text-5xl font-bold flex items-baseline gap-3">
                    <span className="text-white">{selectedOffering.displayTitle.split(' ')[0]}</span>
                    <span className="bg-gradient-to-r from-[#4361ee] to-[#51fcff] bg-clip-text text-transparent">
                      {selectedOffering.displayTitle.split(' ')[1]}
                    </span>
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {selectedOffering.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 text-lg lg:text-xl">
                      <feature.icon size={32} weight="duotone" className="text-[#51fcff]" />
                      <span className="text-white/90">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <div className="text-[4rem] lg:text-[5rem] font-black leading-none text-[#51fcff] animate-pulse-subtle drop-shadow-[0_0_8px_rgba(81,252,255,0.5)]">
                    {selectedOffering.price}€
                    <span className="text-xl lg:text-2xl text-white/60 ml-2">/mes</span>
                  </div>
                </div>

                <Link
                  href="#planes"
                  className="inline-block w-full text-center bg-gradient-to-r from-[#4361ee] to-[#51fcff] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  ¡CONTRATAR AHORA!
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 