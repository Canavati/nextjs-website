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
    price: '28',
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
    price: '30',
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
    price: '4.90',
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
    <section 
      id="hero" 
      className="relative h-screen w-full bg-dark overflow-hidden flex items-center"
    >
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
        {/* Background UNIMOVIL Text - Changed from fixed to absolute positioning */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {[
            { top: '20%', left: '15%', scale: 0.9, delay: 0 },
            { top: '65%', left: '25%', scale: 1.1, delay: 0.5 },
            { top: '35%', left: '65%', scale: 0.85, delay: 1 },
            { top: '70%', left: '70%', scale: 1.2, delay: 1.5 },
            { top: '15%', left: '85%', scale: 0.95, delay: 2 }
          ].map((position, i) => (
            <motion.div
              key={`bg-text-${i}`}
              className="absolute whitespace-nowrap text-[3rem] sm:text-[4rem] font-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              style={{
                top: position.top,
                left: position.left,
                transform: `scale(${position.scale})`,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [-5, 5, -5],
                  rotate: [-3, 3, -3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8,
                  delay: position.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex items-center"
              >
                <span 
                  className="text-[--primary] relative mr-0"
                  style={{
                    filter: 'drop-shadow(0 0 15px rgba(255, 49, 179, 0.5))',
                    textShadow: '0 0 30px rgba(255, 49, 179, 0.8)'
                  }}
                >
                  UNI
                </span>
                <span
                  className="text-[--secondary] relative"
                  style={{
                    filter: 'drop-shadow(0 0 15px rgba(81, 252, 255, 0.5))',
                    textShadow: '0 0 30px rgba(81, 252, 255, 0.8)'
                  }}
                >
                  MOVIL
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr,1fr] gap-8 lg:gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 lg:space-y-8"
          >
            {/* Main UNIMOVIL text with white copies below */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative mb-6"
            >
              {/* Main glowing text */}
              <div className="flex flex-col items-start text-[4.5rem] font-black leading-[0.8]">
                <div className="flex items-center">
                  <span 
                    className="text-[--primary] relative mr-0"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 49, 179, 0.8))',
                      textShadow: '0 0 0px rgba(255, 49, 179, 0.8)'
                    }}
                  >
                    UNI
                  </span>
                  <span
                    className="text-[--secondary] relative"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(81, 252, 255, 0.8))',
                      textShadow: '0 0 0px rgba(81, 252, 255, 0.8)'
                    }}
                  >
                    MOVIL
                  </span>
                </div>
                <span className="text-white leading-[1]">UNIMOVIL</span>
                <span className="text-white leading-[0.8]">UNIMOVIL</span>
              </div>
            </motion.div>

            {/* Dynamic Marketing Message based on selected offering */}
            <motion.div
              key={selectedOffering.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                {selectedOffering.id === 'fibra-movil' ? (
                  <>
                    Todo lo que necesitas
                    <br />
                    <span className="bg-gradient-bright bg-clip-text text-transparent">en un solo pack</span>
                  </>
                ) : selectedOffering.id === 'fibra' ? (
                  <>
                    Velocidad sin
                    <br />
                    <span className="bg-gradient-bright bg-clip-text text-transparent">interrupciones</span>
                  </>
                ) : (
                  <>
                    Libertad sin
                    <br />
                    <span className="bg-gradient-bright bg-clip-text text-transparent">límites</span>
                  </>
                )}
              </h2>
              <p className="text-xl text-white/80 mt-4">
                {selectedOffering.id === 'fibra-movil' ? (
                  'Combina fibra y móvil al mejor precio'
                ) : selectedOffering.id === 'fibra' ? (
                  'Navega a la velocidad de la luz'
                ) : (
                  'Datos y llamadas sin preocupaciones'
                )}
              </p>
            </motion.div>

            {/* Offerings Menu - Vertical Redesign */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-[400px]"
            >
              {/* Menu Container */}
              <div className="relative flex flex-col gap-3 p-3 bg-[#1a1f35]/30 backdrop-blur-md rounded-3xl border border-white/5">
                {offerings.map((offering) => (
                  <Link
                    key={offering.id}
                    href={`/${offering.id}`}
                    onMouseEnter={() => setSelectedOffering(offering)}
                    className={`group relative flex items-center gap-4 px-6 py-5 rounded-2xl text-lg font-medium transition-all duration-300 ${
                      selectedOffering.id === offering.id
                        ? 'text-white bg-gradient-to-r from-[#4361ee] to-[#51fcff] shadow-lg shadow-[#51fcff]/20 scale-[1.02]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {/* Button Background */}
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      selectedOffering.id === offering.id
                        ? 'opacity-100'
                        : 'bg-white/5 opacity-0 group-hover:opacity-100'
                    }`} />

                    {/* Icon Container */}
                    <div className="relative flex items-center justify-center">
                      {/* Icon Background Glow */}
                      <div className={`absolute inset-[-8px] rounded-full transition-all duration-300 ${
                        selectedOffering.id === offering.id
                          ? 'bg-white/20'
                          : 'bg-white/0 group-hover:bg-white/10'
                      }`} />
                      
                      {/* Icon */}
                      <offering.Icon 
                        size={32} 
                        weight={selectedOffering.id === offering.id ? "fill" : "duotone"} 
                        className={`relative z-10 transition-all duration-300 ${
                          selectedOffering.id === offering.id
                            ? 'text-white scale-110'
                            : 'text-[#51fcff] group-hover:text-white group-hover:scale-110'
                        }`}
                      />
                    </div>

                    {/* Text Container */}
                    <div className="relative flex-1">
                      <span className="relative text-xl">
                        {offering.title}
                        {/* Animated underline */}
                        <div className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-white/0 via-white to-white/0 transition-all duration-300 ${
                          selectedOffering.id === offering.id
                            ? 'w-full opacity-50'
                            : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-30'
                        }`} />
                      </span>
                    </div>

                    {/* Arrow indicator */}
                    <div className={`transition-all duration-300 ${
                      selectedOffering.id === offering.id
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}>
                      <svg 
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                      selectedOffering.id === offering.id
                        ? 'shadow-[0_0_30px_rgba(81,252,255,0.3)]'
                        : 'shadow-[0_0_20px_rgba(81,252,255,0.1)]'
                    }`} />
                  </Link>
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
              className="relative p-8 lg:p-10 rounded-3xl overflow-hidden group"
            >
              {/* Card Background with Gradient */}
              <div className="absolute inset-0 bg-[#1a1f35]/40 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300 rounded-3xl" />
              
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4361ee]/5 via-transparent to-[#51fcff]/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl" />
              
              {/* Glowing Orbs */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#4361ee] rounded-full mix-blend-soft-light filter blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#51fcff] rounded-full mix-blend-soft-light filter blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

              <div className="relative space-y-6 lg:space-y-8">
                {/* Title Section with Enhanced Design */}
                <div className="space-y-2">
                  <motion.div 
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-4xl lg:text-5xl font-bold">
                      <span className="text-white/90">{selectedOffering.displayTitle.split(' ')[0]}</span>
                      <span className="bg-gradient-to-r from-[#4361ee] to-[#51fcff] bg-clip-text text-transparent ml-3">
                        {selectedOffering.displayTitle.split(' ')[1]}
                      </span>
                    </h2>
                  </motion.div>
                </div>
                
                {/* Features with Enhanced Animations */}
                <div className="space-y-4">
                  {selectedOffering.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-4 text-lg lg:text-xl group/feature"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#51fcff]/20 rounded-full blur-md opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300" />
                        <feature.icon 
                          size={32} 
                          weight="duotone" 
                          className="text-[#51fcff] relative z-10 transform group-hover/feature:scale-110 transition-transform duration-300" 
                        />
                </div>
                      <span className="text-white/90 group-hover/feature:text-white transition-colors duration-300">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
              </div>

                {/* Price Section with Enhanced Animation */}
                <motion.div 
                  className="relative pt-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4361ee]/20 to-[#51fcff]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="text-[4rem] lg:text-[5rem] font-bold leading-none">
                        <span className="text-[#51fcff] drop-shadow-[0_0_8px_rgba(81,252,255,0.5)]">
                          {selectedOffering.price}€
                        </span>
                        <span className="text-xl lg:text-2xl text-white/60 ml-2">/mes</span>
                </div>
              </div>
            </div>
                </motion.div>

                {/* CTA Button with Enhanced Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
            <Link
              href="#planes"
                    className="relative inline-block w-full group/button"
            >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4361ee] to-[#51fcff] rounded-xl opacity-90 group-hover/button:opacity-100 transition-opacity duration-300" />
                    <div className="relative text-center px-8 py-4 text-white font-semibold text-lg transform group-hover/button:-translate-y-1 transition-transform duration-300">
              ¡CONTRATAR AHORA!
                    </div>
                    <div className="absolute inset-0 rounded-xl shadow-lg shadow-[#51fcff]/20 group-hover/button:shadow-[#51fcff]/30 transition-shadow duration-300" />
            </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 