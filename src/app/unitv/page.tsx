'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Contact from '@/components/sections/Contact';
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
  Globe,
  MusicNotes,
  Flame,
  Lightning,
  Heart,
  X,
  CaretRight,
  CheckCircle,
  Package,
  Devices
} from '@phosphor-icons/react';

// Add custom animation keyframes for the plans
const customAnimations = `
@keyframes pulse-glow {
  0% {
    opacity: 0.3;
    box-shadow: 0 0 5px rgba(81, 252, 255, 0.2);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 15px rgba(81, 252, 255, 0.4);
  }
  100% {
    opacity: 0.3;
    box-shadow: 0 0 5px rgba(81, 252, 255, 0.2);
  }
}

@keyframes ping-slow {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes ping-slower {
  75%, 100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.pulse-glow {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-ping-slower {
  animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
`;

export default function UniTVPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
  } | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<{
    title: string;
    price: number;
    channels: string;
  }[]>([]);
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Touch swipe functionality
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Check if we're in mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      
      // Auto-clear configurator when switching to mobile if no plan selected
      if (isMobile && !selectedPlan) {
        setShowConfigurator(false);
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [selectedPlan]);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50; // Minimum distance to be considered a swipe
    
    if (swipeDistance > minSwipeDistance) {
      // Swiped right, go to previous slide
      setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    } else if (swipeDistance < -minSwipeDistance) {
      // Swiped left, go to next slide
      setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }
    
    setIsPaused(false);
  };

  const mainPlans = [
    { name: "BÁSICO", price: 2.99 },
    { name: "CINE", price: 6.99 },
    { name: "DEPORTES", price: 8.99 },
    { name: "PREMIUM TOTAL", price: 9.99 }
  ];

  const calculateTotal = () => {
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return ((selectedPlan?.price || 0) + addonsTotal).toFixed(2);
  };

  const toggleAddon = (addon: { title: string; price: number; channels: string }) => {
    setSelectedAddons(prev => {
      const exists = prev.find(item => item.title === addon.title);
      if (exists) {
        return prev.filter(item => item.title !== addon.title);
      } else {
        return [...prev, { 
          title: addon.title, 
          price: addon.price,
          channels: addon.channels
        }];
      }
    });
  };

  const handlePlanSelect = (plan: { name: string; price: number }) => {
    setSelectedPlan(plan);
    if (isMobileView) {
      setShowConfigurator(true); // Only open the modal on mobile
    } else {
      // Scroll to the configurator section when a plan is selected
      setTimeout(() => {
        const configuratorSection = document.querySelector('#addons-configurator');
        if (configuratorSection) {
          configuratorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const closeConfigurator = () => {
    setShowConfigurator(false);
  };

  const saveConfiguration = () => {
    setShowConfigurator(false);
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
      <section className="relative min-h-[90vh] md:min-h-[100vh] pt-[80px] md:pt-[115px] -mt-[80px] md:-mt-[115px] bg-dark overflow-hidden flex items-center">
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
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-5 md:space-y-8 pt-4 md:pt-0"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[2.2rem] md:text-[4rem] font-black leading-none text-white"
              >
                UNITV
                <br />
                <span className="bg-gradient-bright bg-clip-text text-transparent">STREAMING</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-xl text-white/80 max-w-2xl"
              >
                Disfruta del mejor contenido en streaming con UNITV. Series, películas, deportes y mucho más, todo en una única plataforma y con la mejor calidad.
              </motion.p>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 gap-2 md:gap-3 pt-2 max-w-[400px]"
              >
                {[
                  { icon: Television, title: 'Contenido HD', description: 'Máxima calidad' },
                  { icon: DeviceMobile, title: 'Multiplataforma', description: 'En todos tus dispositivos' },
                  { icon: PlayCircle, title: 'Sin publicidad', description: 'Disfruta sin interrupciones' },
                  { icon: FilmStrip, title: 'Contenido exclusivo', description: 'Series y películas únicas' },
                ].map((feature, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-2.5 md:p-3 backdrop-blur-sm">
                    <feature.icon size={20} weight="duotone" className="text-[#51fcff] mb-1" />
                    <h3 className="text-white font-medium text-sm md:text-base">{feature.title}</h3>
                    <p className="text-white/60 text-xs md:text-sm">{feature.description}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-3 md:gap-4 pt-4"
              >
                <a
                  href="#planes"
                  className="inline-block bg-gradient-new text-white px-5 md:px-8 py-2.5 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Ver Planes
                </a>
                <a
                  href="#contacto"
                  className="inline-block bg-white/10 text-white px-5 md:px-8 py-2.5 md:py-4 rounded-xl font-semibold text-sm md:text-lg transition-all duration-300 hover:bg-white/20"
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
              className="relative w-full mt-4 lg:hidden"
            >
              <div 
                className="relative overflow-hidden rounded-lg shadow-lg"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
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
                    <div className="relative w-full bg-black/10 rounded-lg" style={{ paddingBottom: '60%' }}>
                      <Image
                        src={slides[currentIndex].src}
                        alt={slides[currentIndex].alt}
                        fill
                        className="object-contain p-1"
                        sizes="100vw"
                        priority
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Mobile Swipe Indicators - Fixed position */}
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center z-20">
                  <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <button 
                      onClick={() => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                      className="h-6 w-6 rounded-full bg-black/40 flex items-center justify-center text-white"
                      aria-label="Previous slide"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <div className="flex gap-1.5">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-white scale-110' : 'bg-white/50'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                      className="h-6 w-6 rounded-full bg-black/40 flex items-center justify-center text-white"
                      aria-label="Next slide"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planes" className="relative py-12 md:py-24 bg-gradient-to-r from-[#b8e5ea] via-[#dbeef2] to-[#b8e5ea] overflow-hidden">
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
          {/* Custom style for mobile swiper */}
          <style jsx global>{`
            .mobile-plan-swiper {
              display: flex;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none; /* IE and Edge */
              padding: 20px 0;
              -webkit-overflow-scrolling: touch;
            }
            
            .mobile-plan-swiper::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
            
            .mobile-plan-card {
              scroll-snap-align: center;
              flex: 0 0 85%;
              margin-right: 15px;
              background: white;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease;
            }
            
            .mobile-plan-card:last-child {
              margin-right: 0;
            }
          `}</style>

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

          {/* Mobile Swipeable Plans */}
          <div className={`${!isMobileView ? 'hidden' : 'block'} mb-8`}>
            <div className="mobile-plan-swiper">
              {mainPlans.map((plan, idx) => (
                <div 
                  key={idx} 
                  className="mobile-plan-card"
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="p-5">
                    {/* Plan Title */}
                    <div className="flex items-center mb-3">
                      <div className="text-pink-500 mr-2">
                        {idx === 0 && <Television weight="bold" size={24} />}
                        {idx === 1 && <FilmStrip weight="bold" size={24} />}
                        {idx === 2 && <PlayCircle weight="bold" size={24} />}
                        {idx === 3 && <Package weight="bold" size={24} />}
                      </div>
                      <h3 className="text-xl font-bold text-[#333]">{plan.name}</h3>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 w-full my-4"></div>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-4">
                      {idx === 0 && (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Canales Generalistas (La 1, La 2, Antena 3)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Canales Regionales y TDT</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Canales Deportivos Básicos</span>
                          </li>
                        </>
                      )}
                      {idx === 1 && (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Incluye Plan Básico + Canales Premium</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Paramount, Clover Channel, Classic Movies</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Discovery Channel y Documentales</span>
                          </li>
                        </>
                      )}
                      {idx === 2 && (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Incluye Plan Básico + Deportes Premium</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Eurosport, DAZN, Real Madrid TV</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Todos los deportes en directo</span>
                          </li>
                        </>
                      )}
                      {idx === 3 && (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Todos los canales incluidos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Warner TV, TCM, COSMO</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 text-lg mt-0.5 flex-shrink-0">•</span>
                            <span className="text-gray-700 text-sm">Contenido Adulto y SVOD</span>
                          </li>
                        </>
                      )}
                    </ul>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 w-full my-4"></div>

                    {/* Price */}
                    <div className="text-center mb-4">
                      <div className="text-5xl font-bold bg-gradient-to-r from-[#9c5adb] to-[#51fcff] bg-clip-text text-transparent">
                        {plan.price.toFixed(2)}€
                        <span className="text-sm text-gray-500 font-normal">/mes</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">IVA incluido</div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full py-3 bg-gradient-to-r from-[#9c5adb] to-[#51fcff] text-white text-lg font-medium rounded-full">
                      ¡Lo quiero!
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Plans Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto ${isMobileView ? 'hidden' : 'block'}`}>
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => handlePlanSelect({ name: "BÁSICO", price: 2.99 })}
              className={`bg-gradient-to-b from-[#e0f7fc] to-[#c4e9ff] rounded-3xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 flex flex-col relative cursor-pointer group border-2 border-white/70 ${
                selectedPlan?.name === "BÁSICO" 
                  ? 'ring-4 ring-[#51fcff] shadow-[0_0_20px_rgba(81,252,255,0.5)]' 
                  : 'hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,102,255,0.2)]'
              }`}
            >
              {/* Enhanced vibrant pulsing glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#51fcff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-glow"></div>
              
              {/* Enhanced spark animations on hover */}
              <div className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-[#51fcff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow"></div>
              <div className="absolute -left-1 -bottom-1 w-4 h-4 rounded-full bg-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slower"></div>

              {/* Title with emoji */}
              <div className="mb-3 pb-2 border-b-2 border-white/50 text-center">
                <div className="text-4xl mb-2">📺</div>
                <h3 className="text-2xl font-black text-[#051c40]">BÁSICO</h3>
              </div>

              <ul className="space-y-2 mb-4 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Canales Generalistas (La 1, La 2, Antena 3)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Canales Regionales y TDT</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Canales Deportivos Básicos</span>
                </li>
              </ul>
              
              {/* Price at the bottom - much bigger */}
              <div className="mt-auto bg-white/50 rounded-xl p-3 text-center">
                <p className="text-4xl font-bold text-[#0066FF]">2.99€<span className="text-sm font-normal text-gray-500">/mes</span></p>
              </div>
              
              {/* Only show "TOCA PARA CONFIGURAR" in mobile view */}
              {isMobileView && (
                <>
                  <div className="w-full h-[3px] bg-gradient-to-r from-[#ffa500] via-[#51fcff] to-[#ff00ff] my-2 opacity-100"></div>
                  <div className="text-sm text-center font-bold text-[#0066FF] py-1.5 group-hover:animate-pulse group-hover:scale-105 transition-all duration-300">
                    <span className="inline-block relative">
                      ¡TOCA PARA CONFIGURAR! 
                      <span className="absolute -right-4 top-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </>
              )}
              
              {selectedPlan?.name === "BÁSICO" && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-pulse">
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
              onClick={() => handlePlanSelect({ name: "CINE", price: 6.99 })}
              className={`bg-gradient-to-b from-[#e0f7fc] to-[#c4e9ff] rounded-3xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 flex flex-col relative cursor-pointer group border-2 border-white/70 ${
                selectedPlan?.name === "CINE" 
                  ? 'ring-4 ring-[#51fcff] shadow-[0_0_20px_rgba(81,252,255,0.5)]' 
                  : 'hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,102,255,0.2)]'
              }`}
            >
              {/* Enhanced vibrant pulsing glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#51fcff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-glow"></div>
              
              {/* Enhanced spark animations on hover */}
              <div className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-[#51fcff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow"></div>
              <div className="absolute -left-1 -bottom-1 w-4 h-4 rounded-full bg-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slower"></div>

              {/* Title with emoji */}
              <div className="mb-3 pb-2 border-b-2 border-white/50 text-center">
                <div className="text-4xl mb-2">🎬</div>
                <h3 className="text-2xl font-black text-[#051c40]">CINE</h3>
              </div>

              <ul className="space-y-2 mb-4 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Incluye Plan Básico + Canales Premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Paramount, Clover Channel, Classic Movies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Discovery Channel y Documentales</span>
                </li>
              </ul>
              
              {/* Price at the bottom - much bigger */}
              <div className="mt-auto bg-white/50 rounded-xl p-3 text-center">
                <p className="text-4xl font-bold text-[#0066FF]">6.99€<span className="text-sm font-normal text-gray-500">/mes</span></p>
              </div>
              
              {/* Only show "TOCA PARA CONFIGURAR" in mobile view */}
              {isMobileView && (
                <>
                  <div className="w-full h-[3px] bg-gradient-to-r from-[#ffa500] via-[#51fcff] to-[#ff00ff] my-2 opacity-100"></div>
                  <div className="text-sm text-center font-bold text-[#0066FF] py-1.5 group-hover:animate-pulse group-hover:scale-105 transition-all duration-300">
                    <span className="inline-block relative">
                      ¡TOCA PARA CONFIGURAR! 
                      <span className="absolute -right-4 top-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </>
              )}
              
              {selectedPlan?.name === "CINE" && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-pulse">
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
              onClick={() => handlePlanSelect({ name: "DEPORTES", price: 8.99 })}
              className={`bg-gradient-to-b from-[#e0f7fc] to-[#c4e9ff] rounded-3xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 flex flex-col relative cursor-pointer group border-2 border-white/70 ${
                selectedPlan?.name === "DEPORTES" 
                  ? 'ring-4 ring-[#51fcff] shadow-[0_0_20px_rgba(81,252,255,0.5)]' 
                  : 'hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,102,255,0.2)]'
              }`}
            >
              {/* Enhanced vibrant pulsing glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#51fcff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-glow"></div>
              
              {/* Enhanced spark animations on hover */}
              <div className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-[#51fcff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow"></div>
              <div className="absolute -left-1 -bottom-1 w-4 h-4 rounded-full bg-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slower"></div>

              {/* Title with emoji */}
              <div className="mb-3 pb-2 border-b-2 border-white/50 text-center">
                <div className="text-4xl mb-2">⚽</div>
                <h3 className="text-2xl font-black text-[#051c40]">DEPORTES</h3>
              </div>

              <ul className="space-y-2 mb-4 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Incluye Plan Básico + Deportes Premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Eurosport, DAZN, Real Madrid TV</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Todos los deportes en directo</span>
                </li>
              </ul>
              
              {/* Price at the bottom - much bigger */}
              <div className="mt-auto bg-white/50 rounded-xl p-3 text-center">
                <p className="text-4xl font-bold text-[#0066FF]">8.99€<span className="text-sm font-normal text-gray-500">/mes</span></p>
              </div>
              
              {/* Only show "TOCA PARA CONFIGURAR" in mobile view */}
              {isMobileView && (
                <>
                  <div className="w-full h-[3px] bg-gradient-to-r from-[#ffa500] via-[#51fcff] to-[#ff00ff] my-2 opacity-100"></div>
                  <div className="text-sm text-center font-bold text-[#0066FF] py-1.5 group-hover:animate-pulse group-hover:scale-105 transition-all duration-300">
                    <span className="inline-block relative">
                      ¡TOCA PARA CONFIGURAR! 
                      <span className="absolute -right-4 top-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </>
              )}
              
              {selectedPlan?.name === "DEPORTES" && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-pulse">
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
              onClick={() => handlePlanSelect({ name: "PREMIUM TOTAL", price: 9.99 })}
              className={`bg-gradient-to-b from-[#e0f7fc] to-[#c4e9ff] rounded-3xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 flex flex-col relative cursor-pointer group border-2 border-white/70 ${
                selectedPlan?.name === "PREMIUM TOTAL" 
                  ? 'ring-4 ring-[#51fcff] shadow-[0_0_20px_rgba(81,252,255,0.5)]' 
                  : 'hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,102,255,0.2)]'
              }`}
            >
              {/* Enhanced vibrant pulsing glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#51fcff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-glow"></div>
              
              {/* Enhanced spark animations on hover */}
              <div className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-[#51fcff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow"></div>
              <div className="absolute -left-1 -bottom-1 w-4 h-4 rounded-full bg-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slower"></div>

              <div className="absolute -top-4 right-3 bg-gradient-to-r from-[#ff3f3f] to-[#ff8a00] px-2.5 py-1 rounded-full text-sm font-bold text-white shadow-lg">
                Más Popular
              </div>
              
              {/* Title with emoji */}
              <div className="mb-3 pb-2 border-b-2 border-white/50 text-center">
                <div className="text-4xl mb-2">🌟</div>
                <h3 className="text-2xl font-black text-[#051c40]">PREMIUM TOTAL</h3>
              </div>

              <ul className="space-y-2 mb-4 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Todos los canales incluidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Warner TV, TCM, COSMO</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0066FF] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-base">Contenido Adulto y SVOD</span>
                </li>
              </ul>
              
              {/* Price at the bottom - much bigger */}
              <div className="mt-auto bg-white/50 rounded-xl p-3 text-center">
                <p className="text-4xl font-bold text-[#0066FF]">9.99€<span className="text-sm font-normal text-gray-500">/mes</span></p>
              </div>
              
              {/* Only show "TOCA PARA CONFIGURAR" in mobile view */}
              {isMobileView && (
                <>
                  <div className="w-full h-[3px] bg-gradient-to-r from-[#ffa500] via-[#51fcff] to-[#ff00ff] my-2 opacity-100"></div>
                  <div className="text-sm text-center font-bold text-[#0066FF] py-1.5 group-hover:animate-pulse group-hover:scale-105 transition-all duration-300">
                    <span className="inline-block relative">
                      ¡TOCA PARA CONFIGURAR! 
                      <span className="absolute -right-4 top-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </>
              )}
              
              {selectedPlan?.name === "PREMIUM TOTAL" && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  ✓
                </div>
              )}
            </motion.div>
          </div>

          {/* Add Extra Channels CTA - Simplified and compact */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`mt-8 mb-8 max-w-3xl mx-auto ${isMobileView ? 'hidden' : 'block'}`}
          >
            <div 
              onClick={() => {
                const configuratorSection = document.querySelector('#addons-configurator');
                if (configuratorSection) {
                  configuratorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-gradient-to-r from-[#FF6B00] to-[#FF9500] rounded-lg px-5 py-4 shadow-md flex justify-between items-center cursor-pointer group hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="text-3xl mr-4">📺</div>
                <div>
                  <h3 className="text-white font-bold text-2xl mb-1">
                    Añade canales adicionales
                  </h3>
                  <p className="text-white/90 text-lg">
                    Personaliza tu plan con extras
                  </p>
                </div>
              </div>
              <div className="text-5xl text-white animate-bounce group-hover:animate-none group-hover:scale-125 group-hover:translate-y-2 transition-transform duration-300">
                ↓
              </div>
            </div>
          </motion.div>

          {/* Desktop inline configurator */}
          <div id="addons-configurator" className={`mt-8 p-4 bg-gradient-to-b from-[#e0f7fc] to-[#c4e9ff] rounded-xl border border-gray-200 ${isMobileView ? 'hidden' : 'block'}`}>
            <h3 className="text-3xl font-bold mb-4 text-center text-[#0066FF] bg-gradient-to-r from-[#0066FF] to-[#51fcff] bg-clip-text text-transparent">Configura tu Plan {selectedPlan?.name || "BÁSICO"}</h3>

            <div className="mb-4">
              <h4 className="text-xl font-semibold mb-3 text-center text-gray-800">Paquetes Adicionales</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { 
                    title: "Internacionales", 
                    price: 5.99, 
                    icon: Globe, 
                    feature: "8 canales",
                    channels: "BBC, CNN, Al Jazeera, Euronews, Bloomberg, France 24, RT, DW"
                  },
                  { 
                    title: "Musicales", 
                    price: 3.99, 
                    icon: MusicNotes, 
                    feature: "5 canales",
                    channels: "MTV, VH1 Classical, VH1 Flamenco, VH1 Dance, Latino"
                  },
                  { 
                    title: "SVOD Cocina", 
                    price: 2.99, 
                    icon: Flame, 
                    feature: "Recetas exclusivas",
                    channels: "Canal de Javier Romano con recetas exclusivas y contenido culinario premium"
                  },
                  { 
                    title: "Hot Playboy", 
                    price: 5.99, 
                    icon: Lightning, 
                    feature: "Contenido adulto",
                    channels: "Playboy TV, Venus y otros canales de entretenimiento para adultos"
                  },
                  { 
                    title: "Pride SVOD", 
                    price: 3.99, 
                    icon: Heart, 
                    feature: "Cine temático",
                    channels: "Cine gay y contenido especializado LGBTQ+"
                  }
                ].map((addon, idx) => {
                  const isSelected = selectedAddons.some(item => item.title === addon.title);
                  return (
                    <div 
                      key={idx} 
                      onClick={() => toggleAddon({ title: addon.title, price: addon.price, channels: addon.channels })}
                      className={`bg-white border rounded-lg py-2 px-3 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md relative ${isSelected ? 'border-pink-500 border-2 bg-pink-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-start">
                        {/* Left Column: Icon and Title */}
                        <div className="flex-grow mr-2">
                          <div className="flex items-center">
                            <addon.icon className="w-4 h-4 text-pink-500 mr-1" />
                            <h5 className="text-base font-bold text-[#051c40]">{addon.title}</h5>
                            
                            {/* Selection checkmark */}
                            {isSelected && (
                              <CheckCircle weight="fill" className="w-4 h-4 text-pink-500 ml-1" />
                            )}
                          </div>
                          <p className="text-gray-700 text-xs">{addon.feature}</p>
                          <p className="text-gray-600 text-xs line-clamp-1">{addon.channels}</p>
                        </div>
                        
                        {/* Right Column: Price only (no button) */}
                        <div className="flex flex-col items-end">
                          <div className="bg-gradient-to-r from-[#9c5adb] to-[#51fcff] text-white rounded-lg px-2.5 py-1 text-base font-bold">
                            {addon.price}€<span className="text-xs font-normal">/mes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Configurator summary and button - MUCH BIGGER */}
            <div className="border-t border-gray-300 pt-3 sticky bottom-0 bg-gradient-to-b from-[#e0f7fc] to-[#c4e9ff] pb-2 mt-2">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base font-bold text-gray-800">Total mensual:</span>
                  <span className="text-3xl font-extrabold bg-gradient-to-r from-[#9c5adb] to-[#51fcff] bg-clip-text text-transparent">
                    {((selectedPlan?.price || 0) + selectedAddons.reduce((sum, addon) => sum + addon.price, 0)).toFixed(2)}€
                  </span>
                </div>
                <button 
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-[#9c5adb] text-white font-bold rounded-lg shadow-md text-xl"
                  onClick={() => {
                    setShowConfigurator(false);
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-gray-900">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
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

      {/* Mobile configurator modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center transition-opacity ${showConfigurator ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-gradient-to-b from-[#e0f7fc] to-[#c4e9ff] rounded-xl w-[95%] max-w-lg max-h-[70vh] overflow-y-auto p-3 relative mx-auto shadow-2xl border-2 border-white/20">
          {/* Fixed position close button to ensure it's always visible */}
          <button 
            onClick={() => setShowConfigurator(false)} 
            className="absolute top-2 right-2 z-50 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="text-lg font-bold text-center text-[#0066FF] bg-gradient-to-r from-[#0066FF] to-[#51fcff] bg-clip-text text-transparent pr-6">
            Paquetes Adicionales
          </h3>
          
          <div className="mb-1">
            <div className="grid grid-cols-1 gap-1.5 mt-1">
              {[
                { 
                  title: "Internacionales", 
                  price: 5.99, 
                  icon: Globe, 
                  feature: "8 canales",
                  channels: "BBC, CNN, Al Jazeera, Euronews, Bloomberg, France 24, RT, DW"
                },
                { 
                  title: "Musicales", 
                  price: 3.99, 
                  icon: MusicNotes, 
                  feature: "5 canales",
                  channels: "MTV, VH1 Classical, VH1 Flamenco, VH1 Dance, Latino"
                },
                { 
                  title: "SVOD Cocina", 
                  price: 2.99, 
                  icon: Flame, 
                  feature: "Recetas exclusivas",
                  channels: "Canal de Javier Romano con recetas exclusivas y contenido culinario premium"
                },
                { 
                  title: "Hot Playboy", 
                  price: 5.99, 
                  icon: Lightning, 
                  feature: "Contenido adulto",
                  channels: "Playboy TV, Venus y otros canales de entretenimiento para adultos"
                },
                { 
                  title: "Pride SVOD", 
                  price: 3.99, 
                  icon: Heart, 
                  feature: "Cine temático",
                  channels: "Cine gay y contenido especializado LGBTQ+"
                }
              ].map((addon, idx) => {
                const isSelected = selectedAddons.some(item => item.title === addon.title);
                return (
                  <div 
                    key={idx} 
                    onClick={() => toggleAddon({ title: addon.title, price: addon.price, channels: addon.channels })}
                    className={`bg-white border rounded-lg py-2 px-3 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md relative ${isSelected ? 'border-pink-500 border-2 bg-pink-50' : 'border-gray-200'}`}
                  >
                    <div className="flex items-start">
                      {/* Left Column: Icon and Title */}
                      <div className="flex-grow mr-2">
                        <div className="flex items-center">
                          <addon.icon className="w-4 h-4 text-pink-500 mr-1" />
                          <h5 className="text-base font-bold text-[#051c40]">{addon.title}</h5>
                          
                          {/* Selection checkmark */}
                          {isSelected && (
                            <CheckCircle weight="fill" className="w-4 h-4 text-pink-500 ml-1" />
                          )}
                        </div>
                        <p className="text-gray-700 text-xs">{addon.feature}</p>
                        <p className="text-gray-600 text-xs line-clamp-1">{addon.channels}</p>
                      </div>
                      
                      {/* Right Column: Price only (no button) */}
                      <div className="flex flex-col items-end">
                        <div className="bg-gradient-to-r from-[#9c5adb] to-[#51fcff] text-white rounded-lg px-2.5 py-1 text-base font-bold">
                          {addon.price}€<span className="text-xs font-normal">/mes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Configurator summary and button - MUCH BIGGER */}
          <div className="border-t border-gray-300 pt-3 sticky bottom-0 bg-gradient-to-b from-[#e0f7fc] to-[#c4e9ff] pb-2 mt-2">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-bold text-gray-800">Total mensual:</span>
                <span className="text-3xl font-extrabold bg-gradient-to-r from-[#9c5adb] to-[#51fcff] bg-clip-text text-transparent">
                  {((selectedPlan?.price || 0) + selectedAddons.reduce((sum, addon) => sum + addon.price, 0)).toFixed(2)}€
                </span>
              </div>
              <button 
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-[#9c5adb] text-white font-bold rounded-lg shadow-md text-xl"
                onClick={() => {
                  setShowConfigurator(false);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}