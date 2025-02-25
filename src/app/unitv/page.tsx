'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Contact from '@/components/sections/Contact';
import { useState, useEffect } from 'react';
import {
  Television,
  PlayCircle,
  FilmStrip,
  MonitorPlay,
  DeviceMobile,
  Broadcast,
  WifiHigh,
  House,
  VideoCamera,
  Desktop,
  Laptop,
  DeviceTablet,
} from '@phosphor-icons/react';

export default function UniTVPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    name: "CERO BÁSICO",
    price: 2.99
  });
  const [selectedAddons, setSelectedAddons] = useState<{
    title: string;
    price: number;
  }[]>([]);

  const mainPlans = [
    { name: "CERO BÁSICO", price: 2.99 },
    { name: "CINE", price: 6.99 },
    { name: "DEPORTES", price: 8.99 },
    { name: "PREMIUM TOTAL", price: 9.99 }
  ];

  const calculateTotal = () => {
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return (selectedPlan.price + addonsTotal).toFixed(2);
  };

  const toggleAddon = (addon: { title: string; price: string }) => {
    setSelectedAddons(prev => {
      const exists = prev.find(item => item.title === addon.title);
      if (exists) {
        return prev.filter(item => item.title !== addon.title);
      } else {
        return [...prev, { title: addon.title, price: parseFloat(addon.price) }];
      }
    });
  };

  const slides = [
    { src: '/unitv/MASMEDIA_BASICO_2025.jpg', alt: 'UNITV Básico' },
    { src: '/unitv/MASMEDIA_CINE-2025.jpg', alt: 'UNITV Cine' },
    { src: '/unitv/MASMEDIA_DEPORTES-2025.jpg', alt: 'UNITV Deportes' },
    { src: '/unitv/MASMEDIA_HOT.png', alt: 'UNITV Hot' },
    { src: '/unitv/MASMEDIA_PLAYBOY.png', alt: 'UNITV Playboy' },
    { src: '/unitv/MASMEDIA_PREMIUM_TOTAL-2025.jpg', alt: 'UNITV Premium Total' },
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPaused, slides.length]);

  const floatingIcons = [
    // Left side
    { Icon: Television, top: '15%', left: '10%', duration: 8, delay: 0, size: 42 },
    { Icon: PlayCircle, top: '70%', left: '15%', duration: 10, delay: 1, size: 36 },
    { Icon: FilmStrip, top: '40%', left: '8%', duration: 12, delay: 2, size: 48 },
    { Icon: MonitorPlay, bottom: '15%', left: '20%', duration: 9, delay: 1.5, size: 32 },
    { Icon: DeviceMobile, top: '25%', left: '22%', duration: 11, delay: 0.5, size: 38 },
    
    // Center
    { Icon: Broadcast, top: '10%', left: '45%', duration: 15, delay: 2, size: 52 },
    { Icon: House, bottom: '20%', left: '48%', duration: 13, delay: 1, size: 44 },
    { Icon: WifiHigh, top: '35%', left: '35%', duration: 10, delay: 3, size: 34 },
    
    // Right side
    { Icon: VideoCamera, top: '20%', right: '15%', duration: 9, delay: 2, size: 40 },
    { Icon: Desktop, bottom: '25%', right: '12%', duration: 11, delay: 3, size: 36 },
    { Icon: Laptop, top: '45%', right: '18%', duration: 12, delay: 1.5, size: 46 },
    { Icon: DeviceTablet, top: '15%', right: '25%', duration: 14, delay: 0.8, size: 38 }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] pt-[115px] -mt-[115px] bg-dark overflow-hidden flex items-center">
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

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:sticky lg:top-[140px] -ml-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[2.5rem] md:text-[4rem] font-black leading-none text-white"
              >
                UNITV
                <br />
                <span className="bg-gradient-bright bg-clip-text text-transparent">STREAMING</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-white/80 max-w-2xl"
              >
                Disfruta del mejor contenido en streaming con UNITV. Series, películas, deportes y mucho más, todo en una única plataforma y con la mejor calidad.
              </motion.p>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 gap-3 pt-2 max-w-[400px]"
              >
                {[
                  { icon: Television, title: 'Contenido HD', description: 'Máxima calidad' },
                  { icon: DeviceMobile, title: 'Multiplataforma', description: 'En todos tus dispositivos' },
                  { icon: PlayCircle, title: 'Sin publicidad', description: 'Disfruta sin interrupciones' },
                  { icon: FilmStrip, title: 'Contenido exclusivo', description: 'Series y películas únicas' },
                ].map((feature, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <feature.icon size={24} weight="duotone" className="text-[#51fcff] mb-1.5" />
                    <h3 className="text-white font-medium text-base">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <a
                  href="#planes"
                  className="inline-block bg-gradient-new text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Ver Planes
                </a>
                <a
                  href="#contacto"
                  className="inline-block bg-white/10 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/20"
                >
                  Contactar
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full lg:flex lg:items-center lg:justify-center lg:ml-8 hidden"
            >
              {/* Carousel Container - Desktop */}
              <div 
                className="relative w-[160%] -mr-28 flex items-center"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="relative w-full"
                  >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <Image
                        src={slides[currentIndex].src}
                        alt={slides[currentIndex].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                        priority
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Indicators - Moved outside AnimatePresence */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-30 bg-black/40 px-3 py-2 rounded-full backdrop-blur-sm">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-white w-5' : 'bg-white/70 hover:bg-white/90'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mobile Carousel - NEW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full mt-8 lg:hidden"
            >
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="relative w-full"
                  >
                    <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                      <Image
                        src={slides[currentIndex].src}
                        alt={slides[currentIndex].alt}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Mobile Swipe Indicators */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 z-20">
                  <button 
                    onClick={() => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
                    aria-label="Previous slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                    className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
                    aria-label="Next slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planes" className="relative py-24 bg-gradient-to-r from-[#b8e5ea] via-[#dbeef2] to-[#b8e5ea] overflow-hidden">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#b8e5ea] via-[#dbeef2] to-[#b8e5ea] opacity-90" />

        {/* Deep Blue Base Layer */}
        <div className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{ 
            backgroundImage: `linear-gradient(to bottom right, var(--quinary) 0%, var(--quinary) 10%, transparent 50%)`
          }}
        />

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--quinary)_0%,_var(--quaternary)_20%,_transparent_60%)] blur-3xl opacity-60" />
        </div>

        {/* Static Background Patterns */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ 
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
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ 
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-shimmer-dark relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,1)] [text-shadow:0_2px_15px_rgba(255,255,255,0.3),0_-1px_1px_rgba(0,0,0,0)]">
              Nuestros Planes
            </h2>
            <p className="text-xl text-gray-800 relative z-10">
              Elige el plan que mejor se adapte a tus necesidades
            </p>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setSelectedPlan({ name: "CERO BÁSICO", price: 2.99 })}
              className={`bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col relative cursor-pointer group ${
                selectedPlan.name === "CERO BÁSICO" 
                  ? 'ring-2 ring-[#51fcff] shadow-[#51fcff]/20' 
                  : 'hover:scale-[1.02] hover:ring-2 hover:ring-[#51fcff]/50'
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-1">CERO BÁSICO</h3>
              <p className="text-2xl font-bold text-[#0066FF] mb-3">2.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-2 mb-4 flex-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Canales Generalistas (La 1, La 2, Antena 3)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Canales Regionales y TDT</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Canales Deportivos Básicos</span>
                </li>
              </ul>
              {selectedPlan.name === "CERO BÁSICO" && (
                <div className="absolute -top-2 -right-2 bg-[#51fcff] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  ✓
                </div>
              )}
            </motion.div>

            {/* Cine Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setSelectedPlan({ name: "CINE", price: 6.99 })}
              className={`bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col relative cursor-pointer group ${
                selectedPlan.name === "CINE" 
                  ? 'ring-2 ring-[#51fcff] shadow-[#51fcff]/20' 
                  : 'hover:scale-[1.02] hover:ring-2 hover:ring-[#51fcff]/50'
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-1">CINE</h3>
              <p className="text-2xl font-bold text-[#0066FF] mb-3">6.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-2 mb-4 flex-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Incluye Plan Básico + Canales Premium</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Paramount, Clover Channel, Classic Movies</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Discovery Channel y Documentales</span>
                </li>
              </ul>
              {selectedPlan.name === "CINE" && (
                <div className="absolute -top-2 -right-2 bg-[#51fcff] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  ✓
                </div>
              )}
            </motion.div>

            {/* Deportes Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => setSelectedPlan({ name: "DEPORTES", price: 8.99 })}
              className={`bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col relative cursor-pointer group ${
                selectedPlan.name === "DEPORTES" 
                  ? 'ring-2 ring-[#51fcff] shadow-[#51fcff]/20' 
                  : 'hover:scale-[1.02] hover:ring-2 hover:ring-[#51fcff]/50'
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-1">DEPORTES</h3>
              <p className="text-2xl font-bold text-[#0066FF] mb-3">8.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-2 mb-4 flex-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Incluye Plan Básico + Deportes Premium</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Eurosport, DAZN, Real Madrid TV</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Todos los deportes en directo</span>
                </li>
              </ul>
              {selectedPlan.name === "DEPORTES" && (
                <div className="absolute -top-2 -right-2 bg-[#51fcff] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  ✓
                </div>
              )}
            </motion.div>

            {/* Premium Total Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => setSelectedPlan({ name: "PREMIUM TOTAL", price: 9.99 })}
              className={`bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col relative cursor-pointer group ${
                selectedPlan.name === "PREMIUM TOTAL" 
                  ? 'ring-2 ring-[#51fcff] shadow-[#51fcff]/20' 
                  : 'hover:scale-[1.02] hover:ring-2 hover:ring-[#51fcff]/50'
              }`}
            >
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#51fcff] to-[#0066FF] px-3 py-0.5 rounded-full text-xs font-medium text-white">
                Más Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">PREMIUM TOTAL</h3>
              <p className="text-2xl font-bold text-[#0066FF] mb-3">9.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-2 mb-4 flex-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Todos los canales incluidos</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Warner TV, TCM, COSMO</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#51fcff] text-base mt-0.5">♦</span>
                  <span className="text-gray-600 text-sm">Contenido Adulto y SVOD</span>
                </li>
              </ul>
              {selectedPlan.name === "PREMIUM TOTAL" && (
                <div className="absolute -top-2 -right-2 bg-[#51fcff] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  ✓
                </div>
              )}
            </motion.div>
          </div>

          {/* Additional Packages Configurator */}
          <div className="max-w-6xl mx-auto mt-8 bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-xl relative">
            {/* Selected Plan Preview */}
            <div className="bg-gradient-to-r from-[#51fcff]/10 to-[#0066FF]/10 rounded-xl p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#51fcff] text-white text-sm px-2.5 py-0.5 rounded-full font-medium">Plan Base</span>
                  <h4 className="font-bold text-gray-800 text-base">{selectedPlan.name}</h4>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-600">Base: <span className="font-bold text-[#0066FF]">{selectedPlan.price}€</span></span>
                  <span className="text-gray-600">Extra: <span className="font-bold text-[#0066FF]">+{(parseFloat(calculateTotal()) - selectedPlan.price).toFixed(2)}€</span></span>
                  <span className="text-gray-600">Total: <span className="font-bold text-[#0066FF]">{calculateTotal()}€</span></span>
                </div>
              </div>
              {selectedAddons.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAddons.map((addon, idx) => (
                    <div key={idx} className="bg-[#51fcff]/10 rounded-full px-2.5 py-0.5 text-sm text-gray-600 font-medium">
                      {addon.title} (+{addon.price}€)
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 py-3">
              <div>
                <h3 className="text-base font-bold text-gray-800">Personaliza tu plan con paquetes adicionales</h3>
                <p className="text-sm text-gray-600 mt-0.5">Selecciona los paquetes para tu plan base {selectedPlan.name}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#51fcff] text-white flex items-center justify-center text-xs font-medium">1</div>
                  <span className="text-gray-600">Plan base</span>
                </div>
                <div className="w-4 h-px bg-gray-200"></div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#51fcff] text-white flex items-center justify-center text-xs font-medium">2</div>
                  <span className="text-gray-600">Extras</span>
                </div>
              </div>
            </div>

            {/* Additional Packages Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
              {[
                {
                  title: "Internacionales",
                  price: "5.99",
                  features: [
                    "BBC, CNN, Al Jazeera, TeleFe",
                    "Canales temáticos Fox/Star Network",
                    "+ de 50 canales internacionales"
                  ]
                },
                {
                  title: "Musicales",
                  price: "3.99",
                  features: [
                    "MTV, VH1, MCM SpaceFest",
                    "Canales de música en directo",
                    "Conciertos y festivales exclusivos"
                  ]
                },
                {
                  title: "SVOD Cocina",
                  price: "2.99",
                  features: [
                    "Recetas de Javier Romero",
                    "Tutoriales de cocina",
                    "Programas de gastronomía"
                  ]
                },
                {
                  title: "Hot Playboy",
                  price: "5.99",
                  features: [
                    "Playboy TV, Venus",
                    "Penthouse, Sextreme",
                    "Contenido a la carta"
                  ]
                },
                {
                  title: "Pride SVOD",
                  price: "3.99",
                  features: [
                    "Cine gay",
                    "Series LGBTQ+",
                    "Contenido exclusivo"
                  ]
                }
              ].map((pack, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{pack.title}</h3>
                      <p className="text-base font-bold text-[#0066FF]">
                        {pack.price}€<span className="text-sm font-normal text-gray-400">/mes</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => toggleAddon(pack)}
                      className={`w-5 h-5 rounded-full transition-colors duration-300 flex items-center justify-center ${
                        selectedAddons.some(addon => addon.title === pack.title)
                          ? 'bg-[#51fcff] border border-[#51fcff]'
                          : 'bg-white border border-[#51fcff] hover:bg-[#51fcff]/10'
                      }`}
                    >
                      <span className={`text-sm ${
                        selectedAddons.some(addon => addon.title === pack.title)
                          ? 'text-white'
                          : 'text-[#51fcff]'
                      }`}>
                        {selectedAddons.some(addon => addon.title === pack.title) ? '✓' : '+'}
                      </span>
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {pack.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#51fcff] text-xs mt-1">♦</span>
                        <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Checkout Button */}
            <div className="mt-4 text-center">
              <button className="inline-block bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white px-5 py-2.5 rounded-xl font-semibold text-base shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300 hover:-translate-y-1">
                Contratar Plan Personalizado
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 relative overflow-hidden bg-gray-900">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03091e] to-[#051c40] opacity-90" />
        <div className="absolute inset-0 bg-[url('/unitv/grid-pattern.png')] bg-repeat opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Categorías de Canales
            </h2>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
              Disfruta de una amplia selección de canales organizados en estas categorías
            </p>
          </motion.div>

          {/* Categories only */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { name: "TDT y Generalistas", icon: "📺", color: "from-[#2196F3] to-[#03A9F4]" },
                { name: "Cine y Series", icon: "🎬", color: "from-[#673AB7] to-[#9C27B0]" },
                { name: "Deportes", icon: "🏆", color: "from-[#FF5722] to-[#FF9800]" },
                { name: "Internacionales", icon: "🌍", color: "from-[#4CAF50] to-[#8BC34A]" }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`bg-gradient-to-r ${category.color} rounded-xl p-5 text-center text-white shadow-lg`}
                >
                  <div className="text-5xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </main>
  );
} 