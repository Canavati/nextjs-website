'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Lightning, UsersFour, Crown, User, Users, WifiHigh, DeviceMobile } from '@phosphor-icons/react';
import { useState } from 'react';

const packs = [
  {
    id: 'single',
    title: 'Pack Single',
    description: 'Fibra 300 Megas + Llamadas Ilimitadas',
    price: '33,00',
    speed: '300',
    gb: '50',
    lines: 1,
    delay: 0.1
  },
  {
    id: 'duo',
    title: 'Pack Duo',
    description: 'FIBRA 500 Megas + Llamadas Ilimitadas',
    price: '50,00',
    speed: '500',
    gb: '100',
    lines: 2,
    delay: 0.2
  },
  {
    id: 'tetra',
    title: 'Pack Tetra',
    description: 'Fibra 500 Megas + Llamadas Ilimitadas',
    price: '60,00',
    speed: '500',
    gb: '175',
    lines: 4,
    delay: 0.3
  },
  {
    id: 'pro',
    title: 'Pack Pro',
    description: 'Fibra 1000 Megas + Llamadas Ilimitadas',
    price: '67,00',
    speed: '1000',
    gb: '175',
    lines: 2,
    isPopular: true,
    delay: 0.4
  }
];

export default function HeroPacks() {
  const [selectedPack, setSelectedPack] = useState(packs[0]);
  const [previewPack, setPreviewPack] = useState(packs[0]);
  const [isSelected, setIsSelected] = useState(false);

  const handlePackSelect = (pack: typeof packs[0]) => {
    setSelectedPack(pack);
    setIsSelected(true);
  };

  const handlePackHover = (pack: typeof packs[0]) => {
    if (!isSelected) {
      setPreviewPack(pack);
    }
  };

  const getPackIcon = (title: string) => {
    if (title.includes('Single')) return <Lightning size={24} weight="duotone" className="text-[#51fcff]" />;
    if (title.includes('Duo')) return <Users size={24} weight="duotone" className="text-[#51fcff]" />;
    if (title.includes('Tetra')) return <UsersFour size={24} weight="duotone" className="text-[#51fcff]" />;
    if (title.includes('Pro')) return <Crown size={24} weight="duotone" className="text-[#51fcff]" />;
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
              key={currentPack.id}
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
                {currentPack.isPopular && (
                  <span className="ml-auto text-xs font-matter text-[#51fcff] font-medium px-2 py-1 bg-[#51fcff]/10 rounded-full">
                    Más Potente
                  </span>
                )}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <WifiHigh size={20} weight="duotone" className="text-[#51fcff]" />
                    <span className="text-sm font-matter text-white/60">Fibra</span>
                  </div>
                  <div className="text-3xl font-black text-white">
                    {currentPack.speed}<span className="text-sm font-matter ml-1">Mb</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DeviceMobile size={20} weight="duotone" className="text-[#51fcff]" />
                    <span className="text-sm font-matter text-white/60">Datos</span>
                  </div>
                  <div className="text-3xl font-black text-white">
                    {currentPack.gb}<span className="text-sm font-matter ml-1">GB</span>
                  </div>
                </div>
              </div>

              {/* Lines Info */}
              <div className="flex items-center gap-2 mb-6">
                {currentPack.lines === 1 ? (
                  <User size={20} weight="duotone" className="text-[#51fcff]" />
                ) : currentPack.lines === 4 ? (
                  <UsersFour size={20} weight="duotone" className="text-[#51fcff]" />
                ) : (
                  <Users size={20} weight="duotone" className="text-[#51fcff]" />
                )}
                <span className="text-base font-matter text-white/60">
                  {currentPack.lines} {currentPack.lines === 1 ? 'Línea' : 'Líneas'} Móviles
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-black text-white">
                {currentPack.price}€
                <span className="text-base font-matter font-normal text-white/60 ml-2">/mes</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Pack Selector */}
        <div className="grid grid-cols-4 gap-3">
          {packs.map((pack) => (
            <motion.button
              key={pack.id}
              onClick={() => handlePackSelect(pack)}
              onMouseEnter={() => handlePackHover(pack)}
              className={`relative p-3 rounded-xl transition-all duration-300 group ${
                selectedPack.id === pack.id && isSelected
                  ? 'bg-white/20'
                  : 'bg-white/10 hover:bg-white/15'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-2">
                {getPackIcon(pack.title)}
                <span className="text-sm font-matter text-white font-medium">{pack.title.split(' ')[1]}</span>
              </div>
              {selectedPack.id === pack.id && isSelected && (
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
} 