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
  
  const slides = [
    { src: '/unitv/MASMEDIA_CINE-2025.jpg', alt: 'UNITV Cine' },
    { src: '/unitv/MASMEDIA_DEPORTES-2025.jpg', alt: 'UNITV Deportes' },
    { src: '/unitv/MASMEDIA_HOT.png', alt: 'UNITV Hot' },
    { src: '/unitv/MASMEDIA_PLAYBOY.png', alt: 'UNITV Playboy' },
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
              className="relative w-full lg:flex hidden items-center justify-center ml-8"
            >
              {/* Carousel Container */}
              <div 
                className="relative w-[132%] -mr-20 flex items-center"
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">CERO BÁSICO</h3>
              <p className="text-3xl font-bold text-[#0066FF] mb-4">2.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Canales Generalistas (La 1, La 2, Antena 3)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Canales Regionales y TDT</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Canales Deportivos Básicos</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1">
                Contratar Ahora
              </button>
            </motion.div>

            {/* Cine Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">CINE</h3>
              <p className="text-3xl font-bold text-[#0066FF] mb-4">6.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Incluye Plan Básico + Canales Premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Paramount, Clover Channel, Classic Movies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Discovery Channel y Documentales</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1">
                Contratar Ahora
              </button>
            </motion.div>

            {/* Deportes Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">DEPORTES</h3>
              <p className="text-3xl font-bold text-[#0066FF] mb-4">8.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Incluye Plan Básico + Deportes Premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Eurosport, DAZN, Real Madrid TV</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Todos los deportes en directo</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1">
                Contratar Ahora
              </button>
            </motion.div>

            {/* Premium Total Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#51fcff] to-[#0066FF] px-4 py-1 rounded-full text-sm font-medium text-white">
                Más Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">PREMIUM TOTAL</h3>
              <p className="text-3xl font-bold text-[#0066FF] mb-4">9.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Todos los canales incluidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Warner TV, TCM, COSMO</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Contenido Adulto y SVOD</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1">
                Contratar Ahora
              </button>
            </motion.div>
          </div>

          {/* Additional Packages Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-32 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-shimmer-dark relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,1)] [text-shadow:0_2px_15px_rgba(255,255,255,0.3),0_-1px_1px_rgba(0,0,0,0)]">
              Paquetes Adicionales
            </h2>
            <p className="text-xl text-gray-800 relative z-10">
              Personaliza tu experiencia con contenido extra
            </p>
          </motion.div>

          {/* Additional Packages Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* International Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Internacionales</h3>
              <p className="text-3xl font-bold text-[#0066FF] mb-4">5.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">BBC, CNN, Al Jazeera, TeleFe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Canales temáticos Fox/Star Network</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">+ de 50 canales internacionales</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1">
                Contratar Ahora
              </button>
            </motion.div>

            {/* Music Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Musicales</h3>
              <p className="text-3xl font-bold text-[#0066FF] mb-4">3.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">MTV, VH1, MCM SpaceFest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Canales de música en directo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Conciertos y festivales exclusivos</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1">
                Contratar Ahora
              </button>
            </motion.div>

            {/* Adult Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Contenido Adulto</h3>
              <p className="text-3xl font-bold text-[#0066FF] mb-4">5.99€<span className="text-sm font-normal text-gray-400">/mes</span></p>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Playboy TV, Venus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Penthouse, Sextreme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#51fcff] text-lg mt-1">♦</span>
                  <span className="text-gray-600">Contenido a la carta</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1">
                Contratar Ahora
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </main>
  );
} 