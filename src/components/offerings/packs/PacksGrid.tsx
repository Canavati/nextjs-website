'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Lightning, UsersThree, UsersFour, Crown, User, Users, Phone, FilePdf, WifiHigh, DeviceMobile } from '@phosphor-icons/react';
import PackCard from './PackCard';
import { useState, useRef, useEffect } from 'react';
import { TarifasDropdown } from '@/components/ui/TarifasDropdown';
import { useConfigurator } from '@/context/ConfiguratorProvider';
import { PACK_PLANS } from '@/data/plans-data';

const packs = [
  {
    id: 'single',
    title: 'Pack Single',
    description: 'Fibra 300 Megas + Llamadas Ilimitadas',
    features: [
      'Fibra 300 Megas + Llamadas Ilimitadas',
      '1 línea móvil de 50GB'
    ],
    price: '28',
    speed: '300',
    gb: '50',
    lines: 1,
    delay: 0.1
  },
  {
    id: 'duo',
    title: 'Pack Duo',
    description: 'FIBRA 500 Megas + Llamadas Ilimitadas',
    features: [
      'Fibra 500 Megas + Llamadas Ilimitadas',
      '2 líneas móviles con 100GB compartidos'
    ],
    price: '50',
    speed: '500',
    gb: '100',
    lines: 2,
    delay: 0.2
  },
  {
    id: 'tetra',
    title: 'Pack Tetra',
    description: 'Fibra 500 Megas + Llamadas Ilimitadas',
    features: [
      'Fibra 500 Megas + Llamadas Ilimitadas',
      '4 líneas móviles con 175GB compartidos'
    ],
    price: '60',
    speed: '500',
    gb: '175',
    lines: 4,
    delay: 0.3
  },
  {
    id: 'pro',
    title: 'Pack Pro',
    description: 'Fibra 1000 Megas + Llamadas Ilimitadas',
    features: [
      'Fibra 1000 Megas + Llamadas Ilimitadas',
      '2 líneas móviles con 175GB compartidos'
    ],
    price: '67',
    speed: '1000',
    gb: '175',
    lines: 2,
    isPopular: true,
    delay: 0.4
  }
];

interface HeroPackCardProps {
  pack: typeof packs[0];
  isSelected: boolean;
  onClick: () => void;
}

const HeroPackCard = ({ pack, isSelected, onClick }: HeroPackCardProps) => {
  const getPackIcon = () => {
    if (pack.title.includes('Single')) return <Lightning size={24} weight="duotone" className="text-[#51fcff]" />;
    if (pack.title.includes('Duo')) return <Users size={24} weight="duotone" className="text-[#51fcff]" />;
    if (pack.title.includes('Tetra')) return <UsersFour size={24} weight="duotone" className="text-[#51fcff]" />;
    if (pack.title.includes('Pro')) return <Crown size={24} weight="duotone" className="text-[#51fcff]" />;
    return null;
  };

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: pack.delay }}
      className={`w-full group relative p-4 rounded-3xl text-left transition-all duration-300 ${
        isSelected ? 'bg-white/20' : 'bg-white/10'
      } backdrop-blur-sm hover:bg-white/20`}
      whileHover={{ y: -4 }}
    >
      {/* Hover/Selected Gradient */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 ${
        isSelected ? 'opacity-100' : 'group-hover:opacity-100'
      } transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative">
        {/* Title and Icon */}
        <div className="flex items-center gap-2 mb-4">
          {getPackIcon()}
          <h3 className="text-xl font-medium text-white">{pack.title}</h3>
          {isSelected && (
            <div className="ml-auto w-5 h-5 rounded-full bg-gradient-new flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <WifiHigh size={18} weight="duotone" className="text-[#51fcff]" />
              <span className="text-sm text-white/60">Fibra</span>
            </div>
            <div className="text-2xl font-medium text-white">
              {pack.speed}<span className="text-sm ml-1">Mb</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DeviceMobile size={18} weight="duotone" className="text-[#51fcff]" />
              <span className="text-sm text-white/60">Datos</span>
            </div>
            <div className="text-2xl font-medium text-white">
              {pack.gb}<span className="text-sm ml-1">GB</span>
            </div>
          </div>
        </div>

        {/* Lines Info */}
        <div className="flex items-center gap-2 mb-4">
          {pack.lines === 1 ? (
            <User size={18} weight="duotone" className="text-[#51fcff]" />
          ) : pack.lines === 4 ? (
            <UsersFour size={18} weight="duotone" className="text-[#51fcff]" />
          ) : (
            <Users size={18} weight="duotone" className="text-[#51fcff]" />
          )}
          <span className="text-sm text-white/60">
            {pack.lines} {pack.lines === 1 ? 'Línea' : 'Líneas'} Móviles
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-medium text-white">
            {Number.isInteger(parseFloat(pack.price)) ? 
              pack.price : 
              parseFloat(pack.price).toFixed(2)}€
            <span className="text-sm font-normal text-white/60 ml-1">/mes</span>
          </div>
          {pack.isPopular && (
            <span className="text-xs text-[#51fcff] font-medium px-2 py-1 bg-[#51fcff]/10 rounded-full">
              Más Potente
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export const HeroPacks = () => {
  const [selectedPack, setSelectedPack] = useState(packs[0].id);
  const { setPackSelection, openForm } = useConfigurator();

  const handleContractClick = () => {
    // Find the corresponding pack in PACK_PLANS from plans-data.ts
    const selectedPackData = PACK_PLANS.find(p => p.id === selectedPack);
    if (selectedPackData) {
      // Set the selected pack in the configurator state
      setPackSelection(selectedPackData);
      // Open the form
      openForm();
    }
  };

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative space-y-3"
      >
        {packs.map((pack) => (
          <HeroPackCard
            key={pack.id}
            pack={pack}
            isSelected={selectedPack === pack.id}
            onClick={() => setSelectedPack(pack.id)}
          />
        ))}

        {/* CTA Button */}
        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={handleContractClick}
            className="w-full text-center bg-gradient-new text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300"
          >
            Contratar Ahora
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute -z-10 inset-0 pointer-events-none">
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#51fcff] rounded-full mix-blend-soft-light filter blur-xl opacity-40 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#292cf6] rounded-full mix-blend-soft-light filter blur-xl opacity-40 animate-float" style={{ animationDelay: '-2s' }} />
        
        {/* Particles */}
        <PackParticles count={5} />
      </div>
    </div>
  );
};

// Client-side only particles component
const PackParticles = ({ count }: { count: number }) => {
  const [particles, setParticles] = useState<Array<{ top: string; left: string; delay: number; duration: number }>>([]);
  
  useEffect(() => {
    // Only run in browser after hydration
    const newParticles = Array.from({ length: count }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#51fcff] rounded-full"
          style={{
            top: particle.top,
            left: particle.left,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
};

export default function PacksGrid() {
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
    <div>
      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mb-4 md:hidden">
        {packs.map((_, index) => (
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
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0 md:w-full px-[10%] md:px-0">
          {packs.map((pack) => (
            <div key={pack.id} className="w-[280px] md:w-auto snap-center">
              <PackCard 
                {...pack} 
                id={pack.id}  
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Add TarifasDropdown with adjusted padding */}
      <div className="px-[5%] md:px-0">
        <TarifasDropdown />
      </div>
    </div>
  );
} 
