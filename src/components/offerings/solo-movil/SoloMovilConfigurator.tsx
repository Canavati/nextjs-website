'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { DeviceMobile, Phone, Lightning, Rocket, Star, Crown, Sparkle } from '@phosphor-icons/react';
import { TarifasDropdown } from '@/components/ui/TarifasDropdown';

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
  const [selectedPlan, setSelectedPlan] = useState(0);
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
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
                className="group relative p-3 md:p-4 rounded-xl text-left transition-all duration-300"
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
                <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-tr from-[#ed54ba]/20 to-[#51fcff]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Content */}
                <div className="relative flex flex-col h-full">
                  {/* Title and Icon at top - Updated to match PackCard */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {plan.title === 'Básico' && <Lightning size={32} weight="duotone" className="text-[--primary]" />}
                    {plan.title === 'Estándar' && <Rocket size={32} weight="duotone" className="text-[--primary]" />}
                    {plan.title === 'Pro' && <Star size={32} weight="duotone" className="text-[--primary]" />}
                    {plan.title === 'Premium' && <Sparkle size={32} weight="duotone" className="text-[--primary]" />}
                    {plan.title === 'Premium+' && <Crown size={32} weight="duotone" className="text-[--primary]" />}
                    <h3 className="text-xl font-medium text-dark">{plan.title}</h3>
                  </div>

                  {/* Light Divider */}
                  <hr className="border-[#adadad] mb-6" />

                  {/* Main Feature - Data */}
                  <div className="text-center mb-3">
                    <div className="inline-flex items-center justify-center gap-2">
                      <DeviceMobile size={32} weight="duotone" className="text-[#ed54ba]" />
                      <span className="text-5xl font-bold text-[#79C4CD]">{plan.data}</span>
                      <span className="text-xl font-bold text-gray">GB</span>
                    </div>
                  </div>

                  {/* Secondary Feature - Calls */}
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center gap-2">
                      <Phone size={32} weight="duotone" className="text-[#ed54ba]" />
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-[#79C4CD]">
                          {plan.calls.startsWith('1000') ? '1000' : '∞'}
                        </span>
                        <span className="text-lg font-bold text-gray ml-1">mins</span>
                      </div>
                    </div>
                    {plan.calls.startsWith('1000') ? (
                      <span className="text-base text-gray block mt-1">
                        <span className="text-xl font-bold text-[#79C4CD]">+150</span>
                        <span className="text-base font-bold text-gray"> mins </span>
                        <span className="text-base text-gray">otros operadores</span>
                      </span>
                    ) : (
                      <span className="text-base text-gray block mt-1">
                        Llamadas ilimitadas
                      </span>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="text-center mt-auto mb-4">
                    <div className="text-3xl font-bold text-[#79C4CD]">
                      {plan.basePrice.toFixed(2)}€
                      <span className="text-sm font-normal text-gray ml-1">/mes</span>
                    </div>
                    <p className="text-xs text-gray mt-1">IVA incluido</p>
                  </div>

                  {/* Action Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="#contacto"
                      className="block text-center bg-gradient-new text-white py-2.5 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
                    >
                      ¡Lo quiero!
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add TarifasDropdown with matching container */}
      <div className="px-[5%] md:px-0">
        <TarifasDropdown />
      </div>
    </motion.div>
  );
} 