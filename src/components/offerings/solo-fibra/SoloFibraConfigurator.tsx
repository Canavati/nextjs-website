'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { WifiHigh, Broadcast, Rocket, Crown } from '@phosphor-icons/react';
import { TarifasDropdown } from '@/components/ui/TarifasDropdown';

const SOLO_FIBRA_PLANS = [
  {
    title: 'Estándar',
    speed: '500',
    basePrice: 30.00,
    features: [
      'Velocidad simétrica',
      'Router WiFi 6',
      'Atención 24/7',
      'Instalación profesional'
    ]
  },
  {
    title: 'Pro',
    speed: '1000',
    basePrice: 40.00,
    features: [
      'Velocidad simétrica',
      'Router WiFi 6',
      'Atención 24/7',
      'Instalación profesional'
    ]
  }
];

export const HeroFibraPacks = () => {
  const [selectedPack, setSelectedPack] = useState(SOLO_FIBRA_PLANS[0]);
  const [previewPack, setPreviewPack] = useState(SOLO_FIBRA_PLANS[0]);
  const [isSelected, setIsSelected] = useState(false);

  const handlePackSelect = (pack: typeof SOLO_FIBRA_PLANS[0]) => {
    setSelectedPack(pack);
    setIsSelected(true);
  };

  const handlePackHover = (pack: typeof SOLO_FIBRA_PLANS[0]) => {
    if (!isSelected) {
      setPreviewPack(pack);
    }
  };

  const getPackIcon = (title: string) => {
    if (title === 'Estándar') return <Rocket size={24} weight="duotone" className="text-[#51fcff]" />;
    if (title === 'Pro') return <Crown size={24} weight="duotone" className="text-[#51fcff]" />;
    return null;
  };

  const currentPack = isSelected ? selectedPack : previewPack;

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative space-y-6"
      >
        {/* Dynamic Card */}
        <motion.div
          layoutId="pack-card"
          className="w-full relative p-6 rounded-xl backdrop-blur-sm bg-white/10"
          animate={{
            backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Hover/Selected Gradient */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20"
            animate={{
              opacity: isSelected ? 1 : 0.5
            }}
          />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPack.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Title and Icon */}
              <div className="flex items-center gap-2 mb-6">
                {getPackIcon(currentPack.title)}
                <h3 className="text-2xl font-cal text-white">{currentPack.title}</h3>
                {currentPack.title === 'Pro' && (
                  <span className="ml-auto text-xs font-matter text-[#51fcff] font-medium px-2 py-1 bg-[#51fcff]/10 rounded-full">
                    Más Potente
                  </span>
                )}
              </div>

              {/* Features Grid */}
              <div className="mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <WifiHigh size={20} weight="duotone" className="text-[#51fcff]" />
                    <span className="text-sm font-matter text-white/60">Fibra</span>
                  </div>
                  <div className="text-3xl font-black text-white">
                    {currentPack.speed}<span className="text-sm font-matter ml-1">Mb</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-4xl font-black text-white">
                {currentPack.basePrice.toFixed(2)}€
                <span className="text-base font-matter font-normal text-white/60 ml-2">/mes</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Pack Selector */}
        <div className="grid grid-cols-2 gap-3">
          {SOLO_FIBRA_PLANS.map((pack) => (
            <motion.button
              key={pack.title}
              onClick={() => handlePackSelect(pack)}
              onMouseEnter={() => handlePackHover(pack)}
              className={`relative p-3 rounded-xl transition-all duration-300 group ${
                selectedPack.title === pack.title && isSelected
                  ? 'bg-white/20'
                  : 'bg-white/10 hover:bg-white/15'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-2">
                {getPackIcon(pack.title)}
                <span className="text-sm font-matter text-white font-medium">{pack.title}</span>
              </div>
              {selectedPack.title === pack.title && isSelected && (
                <motion.div
                  layoutId="selected-indicator"
                  className="absolute inset-0 rounded-xl border-2 border-[#51fcff]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="#contacto"
            className={`block text-center py-4 rounded-xl font-matter font-semibold text-lg transition-all duration-300 ${
              isSelected
                ? 'bg-gradient-new text-white shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30'
                : 'bg-white/10 text-white/60 cursor-not-allowed'
            }`}
          >
            {isSelected ? 'Contratar Ahora' : 'Selecciona un Pack'}
          </Link>
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Elements */}
      <div className="absolute -z-10 inset-0 pointer-events-none">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#292cf6]/10 via-[#51fcff]/10 to-[#292cf6]/10 animate-gradient-xy opacity-30" />
        
        {/* Dynamic Glowing Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-32 h-32 bg-[#51fcff] rounded-full mix-blend-soft-light filter blur-xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#292cf6] rounded-full mix-blend-soft-light filter blur-xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </div>
  );
};

export default function SoloFibraConfigurator() {
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
      className="space-y-6"
    >
      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mb-4 md:hidden">
        {SOLO_FIBRA_PLANS.map((_, index) => (
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

      {/* Mobile Layout */}
      <div className="md:hidden">
        {SOLO_FIBRA_PLANS.map((plan, index) => (
          <div key={index} className="relative">
            {/* Title and Icon */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-shrink-0">
                {plan.title === 'Estándar' && <Rocket size={28} weight="duotone" className="text-[#ed54ba]" />}
                {plan.title === 'Pro' && <Crown size={28} weight="duotone" className="text-[#ed54ba]" />}
              </div>
              <h3 className="text-xl font-medium text-dark">{plan.title}</h3>
            </div>

            {/* Features and Price */}
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <WifiHigh size={24} weight="duotone" className="text-[#ed54ba]" />
                  <span className="text-3xl font-medium text-[#79C4CD]">{plan.speed}<span className="text-xl text-[#666666]">Mb</span></span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-medium text-[#79C4CD]">
                  {plan.basePrice.toFixed(2)}€
                  <span className="text-base font-normal text-[#666666] ml-1">/mes</span>
                </div>
                <span className="text-sm text-[#666666]">IVA incluido</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {SOLO_FIBRA_PLANS.map((plan, index) => (
          <motion.div
            key={index}
            className="group relative p-6 rounded-xl text-left transition-all duration-300"
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
            <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Content */}
            <div className="relative">
              {/* Title and Icon at top */}
              <div className="flex items-center justify-center gap-3">
                {plan.title === 'Estándar' && <Rocket size={32} weight="duotone" className="text-[#ed54ba]" />}
                {plan.title === 'Pro' && <Crown size={32} weight="duotone" className="text-[#ed54ba]" />}
                <h3 className="text-2xl font-medium text-dark">{plan.title}</h3>
              </div>

              {/* Light Divider */}
              <hr className="border-[#adadad] my-6" />

              <div className="space-y-8">
                {/* Main Feature - Speed */}
                <div className="text-center">
                  <div className="text-2xl font-medium text-[#444444] mb-3">Fibra</div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-6xl font-medium text-[#79C4CD]">{plan.speed}</span>
                    <span className="text-2xl text-[#666666]">Mb</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-col items-start mx-auto w-fit space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ed54ba]/40 flex-shrink-0" />
                      <span className="text-lg text-[#444444] max-w-[180px] leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Light Divider */}
                <hr className="border-[#adadad]" />

                {/* Price */}
                <div className="text-center">
                  <div className="text-6xl font-medium text-[#79C4CD]">
                    {plan.basePrice.toFixed(2)}€
                    <span className="text-2xl font-normal text-[#666666] ml-1">/mes</span>
                  </div>
                  <p className="text-sm text-[#666666] mt-1">IVA incluido</p>
                </div>

                {/* Action Button */}
                <Link
                  href="#contacto"
                  className="block text-center bg-gradient-new text-white py-3 px-8 rounded-xl font-medium text-base transition-all duration-300 hover:shadow-lg hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
                >
                  ¡Lo quiero!
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add TarifasDropdown */}
      <div className="px-[5%] md:px-0">
        <TarifasDropdown />
      </div>
    </motion.div>
  );
} 
