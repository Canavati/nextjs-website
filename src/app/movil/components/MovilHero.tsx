'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  DeviceMobile, CellSignalFull, Crown, Lightning, Cloud, Cpu, Database, Globe, 
  Desktop, SimCard, Broadcast, Phone, ChatCircleDots, Users, UsersFour,
  Plus, CaretDown, Star 
} from '@phosphor-icons/react';
import Image from 'next/image';

const MOVIL_PLANS = [
  {
    id: 'basic',
    title: 'Básico',
    data: '10',
    basePrice: 4.90,
    calls: '1000 min + 150 otros operadores',
    icon: Lightning
  },
  {
    id: 'standard',
    title: 'Estándar',
    data: '25',
    basePrice: 7.00,
    calls: 'Llamadas ilimitadas',
    icon: Lightning
  },
  {
    id: 'pro',
    title: 'Pro',
    data: '40',
    basePrice: 9.00,
    calls: 'Llamadas ilimitadas',
    icon: Crown
  },
  {
    id: 'premium',
    title: 'Premium',
    data: '75',
    basePrice: 10.00,
    calls: 'Llamadas ilimitadas',
    icon: Crown
  }
];

const INTERNATIONAL_BONOS = [
  { id: '100min', minutes: '100', price: 3.00 },
  { id: '300min', minutes: '300', price: 9.00 },
  { id: '600min', minutes: '600', price: 12.00 },
];

const DATA_BONOS = [
  { id: '500mb', data: '500MB', price: 2.00 },
  { id: '1gb', data: '1GB', price: 3.00 },
  { id: '3gb', data: '3GB', price: 5.00 },
  { id: '5gb', data: '5GB', price: 6.00 },
  { id: '10gb', data: '10GB', price: 8.00 },
];

interface BonoConfig {
  internationalMinutes: string;
  extraData: string;
}

export const HeroConfigurator = () => {
  const [selectedPlan, setSelectedPlan] = useState(MOVIL_PLANS[0]);
  const [previewPlan, setPreviewPlan] = useState(MOVIL_PLANS[0]);
  const [isSelected, setIsSelected] = useState(false);
  const [activeSection, setActiveSection] = useState<'plan' | 'bonos'>('plan');
  const [config, setConfig] = useState<BonoConfig>({
    internationalMinutes: '',
    extraData: '',
  });

  const handlePlanSelect = (plan: typeof MOVIL_PLANS[0]) => {
    setSelectedPlan(plan);
    setPreviewPlan(plan);
    setIsSelected(true);
  };

  const handlePlanHover = (plan: typeof MOVIL_PLANS[0]) => {
    if (!isSelected) {
      setPreviewPlan(plan);
    }
  };

  const handleBonoChange = (type: 'internationalMinutes' | 'extraData', value: string) => {
    setConfig(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }));
  };

  const currentPlan = isSelected ? selectedPlan : previewPlan;
  const selectedBonosCount = (config.internationalMinutes ? 1 : 0) + (config.extraData ? 1 : 0);

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Section Switcher */}
      <div className="flex gap-2 mb-6">
        <motion.button
          onClick={() => setActiveSection('plan')}
          className={`flex-1 py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 ${
            activeSection === 'plan'
              ? 'bg-gradient-new text-white shadow-lg shadow-[#51fcff]/20'
              : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Plan Móvil
          {isSelected && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">
              {currentPlan.title}
            </span>
          )}
        </motion.button>
        <motion.button
          onClick={() => setActiveSection('bonos')}
          className={`flex-1 py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 ${
            activeSection === 'bonos'
              ? 'bg-gradient-new text-white shadow-lg shadow-[#51fcff]/20'
              : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Bonos Extra
          {selectedBonosCount > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">
              {selectedBonosCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative space-y-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {activeSection === 'plan' ? (
            /* Plan Section */
            <motion.div
              key="plan"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Dynamic Card */}
              <motion.div
                layoutId="plan-card"
                className="w-full relative p-6 rounded-xl backdrop-blur-sm bg-white/10"
                animate={{
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Title and Icon */}
                <div className="flex items-center gap-2 mb-6">
                  <currentPlan.icon size={24} weight="duotone" className="text-[#51fcff]" />
                  <h3 className="text-2xl font-medium text-white">{currentPlan.title}</h3>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DeviceMobile size={20} weight="duotone" className="text-[#51fcff]" />
                      <span className="text-sm text-white/60">Datos</span>
                    </div>
                    <div className="text-5xl font-medium text-white">
                      {currentPlan.data}<span className="text-lg ml-1">GB</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone size={20} weight="duotone" className="text-[#51fcff]" />
                      <span className="text-sm text-white/60">Llamadas</span>
                    </div>
                    <div className="text-sm font-medium text-white leading-tight">
                      {currentPlan.calls}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-between">
                  <div className="text-5xl font-medium text-white">
                    {currentPlan.basePrice.toFixed(2)}€
                    <span className="text-lg font-normal text-white/60 ml-2">/mes</span>
                  </div>
                </div>
              </motion.div>

              {/* Plan Selector */}
              <div className="grid grid-cols-4 gap-3">
                {MOVIL_PLANS.map((plan) => (
                  <motion.button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan)}
                    onMouseEnter={() => handlePlanHover(plan)}
                    className={`relative p-3 rounded-xl transition-all duration-300 ${
                      selectedPlan.id === plan.id && isSelected
                        ? 'bg-white/20'
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <plan.icon size={24} weight="duotone" className="text-[#51fcff]" />
                      <span className="text-sm font-medium text-white">{plan.title}</span>
                    </div>
                    {selectedPlan.id === plan.id && isSelected && (
                      <motion.div
                        layoutId="selected-indicator"
                        className="absolute inset-0 rounded-xl border-2 border-[#51fcff]"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Bonos Section */
            <motion.div
              key="bonos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* International Minutes */}
              <div className="relative p-6 rounded-xl backdrop-blur-sm bg-white/10 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={24} weight="duotone" className="text-[#51fcff]" />
                  <h3 className="text-xl font-medium text-white">Minutos Internacionales</h3>
                </div>
                <div className="space-y-3">
                  {INTERNATIONAL_BONOS.map((bono) => (
                    <motion.button
                      key={bono.id}
                      onClick={() => handleBonoChange('internationalMinutes', bono.id)}
                      className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                        config.internationalMinutes === bono.id
                          ? 'bg-white/20 border-2 border-[#51fcff]'
                          : 'bg-white/10 hover:bg-white/15'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          config.internationalMinutes === bono.id
                            ? 'bg-[#51fcff]/20'
                            : 'bg-white/10'
                        }`}>
                          {config.internationalMinutes === bono.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 rounded-full bg-[#51fcff]"
                            />
                          )}
                        </div>
                        <span className="text-lg font-medium text-white">{bono.minutes} min</span>
                      </div>
                      <span className="text-xl font-medium text-[#51fcff]">
                        +{bono.price.toFixed(2)}€
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Extra Data */}
              <div className="relative p-6 rounded-xl backdrop-blur-sm bg-white/10 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={24} weight="duotone" className="text-[#51fcff]" />
                  <h3 className="text-xl font-medium text-white">Datos Extra</h3>
                </div>
                <div className="space-y-3">
                  {DATA_BONOS.map((bono) => (
                    <motion.button
                      key={bono.id}
                      onClick={() => handleBonoChange('extraData', bono.id)}
                      className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                        config.extraData === bono.id
                          ? 'bg-white/20 border-2 border-[#51fcff]'
                          : 'bg-white/10 hover:bg-white/15'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          config.extraData === bono.id
                            ? 'bg-[#51fcff]/20'
                            : 'bg-white/10'
                        }`}>
                          {config.extraData === bono.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 rounded-full bg-[#51fcff]"
                            />
                          )}
                        </div>
                        <span className="text-lg font-medium text-white">{bono.data}</span>
                      </div>
                      <span className="text-xl font-medium text-[#51fcff]">
                        +{bono.price.toFixed(2)}€
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <a
            href="#contacto"
            className={`block text-center py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
              (activeSection === 'plan' && isSelected) || (activeSection === 'bonos' && selectedBonosCount > 0)
                ? 'bg-gradient-new text-white shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30'
                : 'bg-white/10 text-white/60 cursor-not-allowed'
            }`}
          >
            {activeSection === 'plan'
              ? isSelected ? 'Contratar Plan' : 'Selecciona un Plan'
              : selectedBonosCount > 0 ? 'Contratar Bonos' : 'Selecciona un Bono'}
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const MovilHero = () => {
  const floatingIcons = [
    // Left side
    { Icon: DeviceMobile, top: '15%', left: '10%', duration: 8, delay: 0, size: 42 },
    { Icon: CellSignalFull, top: '70%', left: '15%', duration: 10, delay: 1, size: 36 },
    { Icon: Cloud, top: '40%', left: '8%', duration: 12, delay: 2, size: 48 },

    { Icon: Cpu, bottom: '15%', left: '20%', duration: 9, delay: 1.5, size: 32 },
    { Icon: Database, top: '25%', left: '22%', duration: 11, delay: 0.5, size: 38 },
    
    // Center
    { Icon: Globe, top: '10%', left: '45%', duration: 15, delay: 2, size: 52 },
    { Icon: Desktop, bottom: '20%', left: '48%', duration: 13, delay: 1, size: 44 },
    { Icon: SimCard, top: '35%', left: '35%', duration: 10, delay: 3, size: 34 },
    
    // Right side
    { Icon: Crown, top: '20%', right: '15%', duration: 9, delay: 2, size: 40 },
    { Icon: Lightning, bottom: '25%', right: '12%', duration: 11, delay: 3, size: 36 },
    { Icon: Phone, top: '45%', right: '18%', duration: 12, delay: 1.5, size: 46 },
    { Icon: ChatCircleDots, top: '15%', right: '25%', duration: 14, delay: 0.8, size: 38 }
  ];

  return (
    <section id="hero" className="relative min-h-[100vh] pt-[115px] -mt-[115px] bg-dark overflow-hidden flex items-center">
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

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 md:space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[2.5rem] md:text-[4rem] font-black leading-none text-white"
            >
              LÍNEAS MÓVILES
              <br />
              <span className="bg-gradient-bright bg-clip-text text-transparent">SIN LÍMITES</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-white/80 max-w-3xl"
            >
              Disfruta de la mejor cobertura 5G y llamadas ilimitadas. Elige el plan que mejor se adapte a ti.
            </motion.p>
          </motion.div>

          {/* Right Column - Configurator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <HeroConfigurator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 