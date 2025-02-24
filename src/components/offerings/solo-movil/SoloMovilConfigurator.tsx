'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { DeviceMobile, Phone, Lightning, Rocket, Star, Crown } from '@phosphor-icons/react';
import { TarifasDropdown } from '@/components/ui/TarifasDropdown';
import MovilBonos from './MovilBonos';

const SOLO_MOVIL_PLANS = [
  {
    title: 'Básico',
    data: '10',
    basePrice: 4.90,
    calls: '1000 min + 150 otros operadores'
  },
  {
    title: 'Estándar',
    data: '25',
    basePrice: 7.00,
    calls: 'Llamadas ilimitadas'
  },
  {
    title: 'Pro',
    data: '40',
    basePrice: 9.00,
    calls: 'Llamadas ilimitadas'
  },
  {
    title: 'Premium',
    data: '75',
    basePrice: 10.00,
    calls: 'Llamadas ilimitadas'
  },
  {
    title: 'Premium+',
    data: '200',
    basePrice: 20.00,
    calls: 'Llamadas ilimitadas'
  }
];

export default function SoloMovilConfigurator() {
  const [activeSection, setActiveSection] = useState<'plans' | 'bonos'>('plans');
  const [currentCard, setCurrentCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update current card based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = 280 + 24; // card width + gap
        const newCard = Math.round(scrollLeft / cardWidth);
        setCurrentCard(newCard);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Handle dot click
  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 280 + 24; // card width + gap
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full">
      {/* Section Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-2 shadow-md w-fit">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection('plans')}
              className={`px-6 py-2 rounded-2xl font-medium transition-all duration-300 ${
                activeSection === 'plans'
                  ? 'bg-gradient-new text-white'
                  : 'text-[#1e3a5f] hover:bg-[#f8fafc]'
              }`}
            >
              Planes Móviles
            </button>
            <button
              onClick={() => setActiveSection('bonos')}
              className={`px-6 py-2 rounded-2xl font-medium transition-all duration-300 ${
                activeSection === 'bonos'
                  ? 'bg-gradient-new text-white'
                  : 'text-[#1e3a5f] hover:bg-[#f8fafc]'
              }`}
            >
              Bonos Extra
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeSection === 'plans' ? (
          // Plans Section
          <motion.div
            key="plans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mb-4 md:hidden">
              {SOLO_MOVIL_PLANS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ed54ba]"
                  style={{
                    background: currentCard === index ? 'var(--gradient-primary)' : '#E5E7EB',
                    transform: currentCard === index ? 'scale(1.2)' : 'scale(1)'
                  }}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            <div 
              ref={scrollRef}
              className="flex overflow-x-auto pb-6 pt-4 gap-6 snap-x snap-mandatory hide-scrollbar"
            >
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 min-w-max md:min-w-0 md:w-full px-[10%] md:px-0">
                {SOLO_MOVIL_PLANS.map((plan, index) => (
                  <div key={index} className="w-[280px] md:w-auto snap-center">
                    <motion.div
                      className="group relative p-3 md:p-4 rounded-3xl text-left transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      style={{
                        border: '2px solid transparent',
                        background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
                      }}
                    >
                      {/* Selection/Hover Gradient */}
                      <div className="absolute inset-[1px] rounded-[1.75rem] bg-gradient-to-tr from-[#ed54ba]/20 to-[#51fcff]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      {/* Content */}
                      <div className="relative flex flex-col h-full">
                        {/* Title and Icon at top */}
                        <div className="flex items-center justify-center gap-2 mb-4 h-[32px]">
                          {plan.title === 'Básico' && <Lightning size={24} weight="duotone" className="text-[#ed54ba]" />}
                          {plan.title === 'Estándar' && <Rocket size={24} weight="duotone" className="text-[#ed54ba]" />}
                          {plan.title === 'Pro' && <Crown size={24} weight="duotone" className="text-[#ed54ba]" />}
                          {plan.title === 'Premium' && <Crown size={24} weight="duotone" className="text-[#ed54ba]" />}
                          {plan.title === 'Premium+' && <Crown size={24} weight="duotone" className="text-[#ed54ba]" />}
                          <h3 className="text-xl font-medium text-dark">{plan.title}</h3>
                        </div>

                        {/* Light Divider */}
                        <hr className="border-[#adadad] mb-4" />

                        {/* Main Feature - Data */}
                        <div className="text-center mb-4 h-[48px] flex items-center justify-center">
                          <div className="inline-flex items-center justify-center gap-2">
                            <DeviceMobile size={24} weight="duotone" className="text-[#ed54ba]" />
                            <span className="text-4xl font-medium text-[#79C4CD]">{plan.data}</span>
                            <span className="text-lg text-[#666666]">GB</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="text-center mb-4 h-[48px] flex items-center justify-center">
                          <div className="flex items-center justify-center gap-3">
                            <Phone size={24} weight="duotone" className="text-[#ed54ba]" />
                            <span className="text-base text-[#444444] max-w-[180px] leading-tight">{plan.calls}</span>
                          </div>
                        </div>

                        {/* Light Divider */}
                        <hr className="border-[#adadad] mb-4" />

                        {/* Price */}
                        <div className="text-center mt-auto h-[80px] flex flex-col items-center justify-center">
                          <div className="text-6xl font-medium text-[#79C4CD]">
                            {plan.basePrice.toFixed(2)}€
                            <span className="text-lg font-normal text-[#666666] ml-1">/mes</span>
                          </div>
                          <p className="text-xs text-[#666666] mt-1">IVA incluido</p>
                        </div>

                        {/* Action Button */}
                        <Link
                          href="#contacto"
                          className="block text-center bg-gradient-new text-white py-2 px-6 rounded-2xl font-medium text-sm mt-4 transition-all duration-300 hover:shadow-lg hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
                        >
                          ¡Lo quiero!
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          // Bonos Section
          <motion.div
            key="bonos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MovilBonos />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add TarifasDropdown with matching container */}
      <div className="px-[5%] md:px-0 mt-12">
        <TarifasDropdown />
      </div>
    </div>
  );
} 