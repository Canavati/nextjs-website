'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { WifiHigh, DeviceMobile, Plus, Minus, Lightning, Crown, Rocket, Star, ArrowLeft, X, FilePdf } from '@phosphor-icons/react';
import { TarifasDropdown } from '@/components/ui/TarifasDropdown';

interface FibraMovilConfig {
  selectedPlan: number;
  additionalLines: {
    line20GB: number;
    line40GB: number;
    line60GB: number;
  };
}

const FIBRA_MOVIL_PLANS = [
  {
    title: 'Básico',
    speed: '300',
    data: '45',
    basePrice: 33.00,
    features: [
      'Fibra simétrica garantizada',
      'Router WiFi 6 incluido',
      '1 línea móvil con llamadas ilimitadas',
      '45GB de datos móviles incluidos'
    ]
  },
  {
    title: 'Estándar',
    speed: '500',
    data: '50',
    basePrice: 40.00,
    features: [
      'Fibra simétrica garantizada',
      'Router WiFi 6 incluido',
      '1 línea móvil con llamadas ilimitadas',
      '50GB de datos móviles incluidos'
    ]
  },
  {
    title: 'Pro',
    speed: '500',
    data: '115',
    basePrice: 45.00,
    features: [
      'Fibra simétrica garantizada',
      'Router WiFi 6 incluido',
      '1 línea móvil con llamadas ilimitadas',
      '115GB de datos móviles incluidos'
    ]
  },
  {
    title: 'Premium',
    speed: '1000',
    data: '115',
    basePrice: 55.00,
    features: [
      'Fibra simétrica garantizada',
      'Router WiFi 6 incluido',
      '1 línea móvil con llamadas ilimitadas',
      '115GB de datos móviles incluidos'
    ]
  }
];

// Separate Modal Component
const ConfigurationModal = ({
  plan,
  config,
  onClose,
  onLineChange,
  totalAdditionalLines,
  canAddMore,
  calculateTotalPrice
}: {
  plan: typeof FIBRA_MOVIL_PLANS[0],
  config: FibraMovilConfig,
  onClose: () => void,
  onLineChange: (lineType: keyof typeof config.additionalLines, increment: boolean) => void,
  totalAdditionalLines: number,
  canAddMore: boolean,
  calculateTotalPrice: () => number
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    onClick={() => onClose()}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl"
    >
      {/* Header */}
      <div className="bg-gradient-new p-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {plan.title === 'Básico' && <Lightning size={32} weight="duotone" className="text-white" />}
              {plan.title === 'Estándar' && <Rocket size={32} weight="duotone" className="text-white" />}
              {plan.title === 'Pro' && <Star size={32} weight="duotone" className="text-white" />}
              {plan.title === 'Premium' && <Crown size={32} weight="duotone" className="text-white" />}
              <h3 className="text-lg font-bold">{plan.title}</h3>
            </div>
          </div>
          <button
            onClick={() => onClose()}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={24} weight="bold" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <WifiHigh size={24} weight="duotone" className="text-white/90" />
              <span className="text-base opacity-90">{plan.speed}Mb</span>
            </div>
            <span className="text-white/50">+</span>
            <div className="flex items-center gap-1.5">
              <DeviceMobile size={24} weight="duotone" className="text-white/90" />
              <span className="text-base opacity-90">{plan.data}GB</span>
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">
              {calculateTotalPrice().toFixed(2)}€
              <span className="text-xs font-normal opacity-75 ml-1">/mes</span>
            </div>
            <p className="text-xs opacity-75 text-right">IVA incluido</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-dark">Líneas Adicionales</h3>
            <div className="text-sm text-gray">
              {totalAdditionalLines}/4 líneas
            </div>
          </div>

          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ed54ba] to-[#51fcff]"
              initial={{ width: 0 }}
              animate={{ width: `${(totalAdditionalLines / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {[
            { type: 'line20GB', gb: '20', price: '5,00' },
            { type: 'line40GB', gb: '40', price: '10,00' },
            { type: 'line60GB', gb: '60', price: '12,00' }
          ].map((line) => (
            <div 
              key={line.type}
              className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <DeviceMobile size={18} weight="duotone" className="text-[#ed54ba]" />
                <div>
                  <span className="text-sm font-medium">{line.gb}GB</span>
                  <span className="text-xs text-gray ml-2">{line.price}€/mes</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.button
                  onClick={() => onLineChange(line.type as keyof typeof config.additionalLines, false)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    config.additionalLines[line.type as keyof typeof config.additionalLines] === 0
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  disabled={config.additionalLines[line.type as keyof typeof config.additionalLines] === 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Minus size={14} weight="bold" />
                </motion.button>
                <span className="w-5 text-center text-sm font-medium">
                  {config.additionalLines[line.type as keyof typeof config.additionalLines]}
                </span>
                <motion.button
                  onClick={() => onLineChange(line.type as keyof typeof config.additionalLines, true)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    !canAddMore
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  disabled={!canAddMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={14} weight="bold" />
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
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
  </motion.div>
);

// Section Dropdown Component
const SectionDropdown = ({ title, items, isOpen, onToggle, delay }: { 
  title: string;
  items: string[];
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className="bg-white rounded-xl shadow-sm overflow-hidden"
    style={{
      border: '2px solid transparent',
      background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
    }}
  >
    <motion.button
      onClick={onToggle}
      className="w-full p-4 flex items-center justify-between text-left relative"
    >
      <h3 className="text-lg font-medium text-dark">{title}</h3>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-[#ed54ba]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </motion.span>
    </motion.button>
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <ul className="p-4 pt-0 space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray">
            <div className="w-1 h-1 rounded-full bg-[#ed54ba]" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  </motion.div>
);

export default function FibraMovilConfigurator() {
  const [config, setConfig] = useState<FibraMovilConfig>({
    selectedPlan: 0,
    additionalLines: {
      line20GB: 0,
      line40GB: 0,
      line60GB: 0
    }
  });

  // Mobile-specific state
  const [showMobileConfig, setShowMobileConfig] = useState(false);

  const totalAdditionalLines = Object.values(config.additionalLines).reduce((a, b) => a + b, 0);
  const canAddMore = totalAdditionalLines < 4;

  const handleLineChange = (lineType: keyof typeof config.additionalLines, increment: boolean) => {
    if (increment && !canAddMore) return;
    if (!increment && config.additionalLines[lineType] === 0) return;

    setConfig(prev => ({
      ...prev,
      additionalLines: {
        ...prev.additionalLines,
        [lineType]: increment ? prev.additionalLines[lineType] + 1 : prev.additionalLines[lineType] - 1
      }
    }));
  };

  const calculateTotalPrice = () => {
    const basePlan = FIBRA_MOVIL_PLANS[config.selectedPlan];
    const additionalCost = 
      config.additionalLines.line20GB * 5 +
      config.additionalLines.line40GB * 10 +
      config.additionalLines.line60GB * 12;
    
    return basePlan.basePrice + additionalCost;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 md:space-y-4"
    >
      {/* Mobile Layout - Full Width Cards */}
      <div className="md:hidden space-y-3">
        {FIBRA_MOVIL_PLANS.map((plan, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setConfig(prev => ({ ...prev, selectedPlan: index }));
              setShowMobileConfig(true);
            }}
            className="w-full group relative p-3 rounded-xl text-left transition-all duration-300"
            style={{
              border: '2px solid transparent',
              background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Hover Gradient Only */}
            <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 group-active:opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative">
              {/* Title and Icon */}
              <div className="flex items-center gap-2 mb-3">
                {plan.title === 'Básico' && <Lightning size={20} weight="duotone" className="text-[#ed54ba]" />}
                {plan.title === 'Estándar' && <Rocket size={20} weight="duotone" className="text-[#ed54ba]" />}
                {plan.title === 'Pro' && <Star size={20} weight="duotone" className="text-[#ed54ba]" />}
                {plan.title === 'Premium' && <Crown size={20} weight="duotone" className="text-[#ed54ba]" />}
                <h3 className="text-xl font-medium text-dark">{plan.title}</h3>
              </div>

              {/* Features and Price */}
              <div className="flex items-end justify-between">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="text-center">
                    <div className="text-base font-medium text-[#444444] mb-2">Fibra</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-medium text-[#79C4CD]">{plan.speed}</span>
                      <span className="text-base text-[#666666]">Mb</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-medium text-[#444444] mb-2">Datos Móvil</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-medium text-[#79C4CD]">{plan.data}</span>
                      <span className="text-base text-[#666666]">GB</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-medium text-[#79C4CD]">
                    {plan.basePrice.toFixed(2)}€
                    <span className="text-base font-normal text-[#666666] ml-1">/mes</span>
                  </div>
                  <span className="text-sm text-[#666666]">IVA incluido</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Desktop Layout - Unchanged */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {FIBRA_MOVIL_PLANS.map((plan, index) => (
          <motion.button
            key={index}
            onClick={() => setConfig(prev => ({ ...prev, selectedPlan: index }))}
            className="group relative p-3 rounded-xl text-left transition-all duration-300"
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
            <div className={`absolute inset-[1px] rounded-[10px] bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 transition-opacity duration-300 ${
              config.selectedPlan === index ? 'opacity-100' : 'group-hover:opacity-100'
            }`} />
            
            {/* Content */}
            <div className="relative">
              {/* Title and Icon at top */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {plan.title === 'Básico' && <Lightning size={20} weight="duotone" className="text-[#ed54ba]" />}
                {plan.title === 'Estándar' && <Rocket size={20} weight="duotone" className="text-[#ed54ba]" />}
                {plan.title === 'Pro' && <Star size={20} weight="duotone" className="text-[#ed54ba]" />}
                {plan.title === 'Premium' && <Crown size={20} weight="duotone" className="text-[#ed54ba]" />}
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-medium text-dark">{plan.title}</h3>
                  {config.selectedPlan === index && (
                    <div className="w-5 h-5 rounded-full bg-gradient-new flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Light Divider */}
              <hr className="border-[#adadad] mb-4" />

              <div className="space-y-4">
                {/* Grid for Fibra and Datos Móvil */}
                <div className="grid grid-cols-2 gap-3 w-[90%] mx-auto">
                  <div className="text-center">
                    <div className="text-sm font-medium text-[#444444] mb-1">Fibra</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-medium text-[#79C4CD]">{plan.speed}</span>
                      <span className="text-base text-[#666666]">Mb</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-[#444444] mb-1">Datos Móvil</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-medium text-[#79C4CD]">{plan.data}</span>
                      <span className="text-base text-[#666666]">GB</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-col items-start mx-auto w-fit space-y-1.5">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ed54ba]/40 flex-shrink-0" />
                      <span className="text-sm text-[#444444] max-w-[160px] leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Light Divider */}
                <hr className="border-[#adadad] mb-3" />

                {/* Price */}
                <div className="text-center">
                  <div className="text-4xl font-medium text-[#79C4CD]">
                    {plan.basePrice.toFixed(2)}€
                    <span className="text-lg font-normal text-[#666666] ml-1">/mes</span>
                  </div>
                  <p className="text-sm text-[#666666] mt-1">IVA incluido</p>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Desktop Configuration Section - Unchanged */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        <motion.div
          className="lg:col-span-2 relative rounded-xl p-3 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          style={{
            border: '2px solid transparent',
            background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
          }}
        >
          {/* Content */}
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-dark">Líneas Adicionales</h3>
              <div className="text-sm text-gray">
                {totalAdditionalLines}/4 líneas
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-100 rounded-full mb-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ed54ba] to-[#51fcff]"
                initial={{ width: 0 }}
                animate={{ width: `${(totalAdditionalLines / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="space-y-3">
              {[
                { type: 'line20GB', gb: '20', price: '5,00' },
                { type: 'line40GB', gb: '40', price: '10,00' },
                { type: 'line60GB', gb: '60', price: '12,00' }
              ].map((line) => (
                <motion.div 
                  key={line.type}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50/80 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-3">
                    <DeviceMobile size={20} weight="duotone" className="text-[#ed54ba]" />
                    <div>
                      <span className="text-base font-medium">{line.gb}GB</span>
                      <span className="text-sm text-gray ml-2">{line.price}€/mes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLineChange(line.type as keyof typeof config.additionalLines, false);
                      }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        config.additionalLines[line.type as keyof typeof config.additionalLines] === 0
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                      disabled={config.additionalLines[line.type as keyof typeof config.additionalLines] === 0}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Minus size={18} weight="bold" />
                    </motion.button>
                    <span className="w-6 text-center text-lg font-medium">
                      {config.additionalLines[line.type as keyof typeof config.additionalLines]}
                    </span>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLineChange(line.type as keyof typeof config.additionalLines, true);
                      }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        !canAddMore
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                      disabled={!canAddMore}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus size={18} weight="bold" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Total Price Card */}
        <motion.div
          className="relative rounded-xl p-3 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          style={{
            border: '2px solid transparent',
            background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
          }}
        >
          <div className="relative flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-medium text-dark">Total Mensual:</span>
                <div className="text-5xl font-medium text-[#79C4CD]">
                  {calculateTotalPrice().toFixed(2)}€
                  <span className="text-xl font-normal text-[#666666] ml-1">/mes</span>
                </div>
              </div>
              <p className="text-xs text-[#666666] text-right">IVA incluido</p>
            </div>

            <motion.div
              className="mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#contacto"
                className="block text-center bg-gradient-new text-white py-2.5 px-6 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
              >
                ¡Lo quiero!
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Configuration Modal */}
      <AnimatePresence>
        {showMobileConfig && (
          <ConfigurationModal
            plan={FIBRA_MOVIL_PLANS[config.selectedPlan]}
            config={config}
            onClose={() => setShowMobileConfig(false)}
            onLineChange={handleLineChange}
            totalAdditionalLines={totalAdditionalLines}
            canAddMore={canAddMore}
            calculateTotalPrice={calculateTotalPrice}
          />
        )}
      </AnimatePresence>

      {/* Add TarifasDropdown */}
      <TarifasDropdown />
    </motion.div>
  );
} 
