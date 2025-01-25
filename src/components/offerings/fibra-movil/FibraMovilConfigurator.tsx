'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { WifiHigh, DeviceMobile, Plus, Minus } from '@phosphor-icons/react';

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
    data: '25',
    basePrice: 29.90,
    features: [
      'Fibra simétrica garantizada',
      'Router WiFi 6 incluido',
      '1 línea móvil con llamadas ilimitadas',
      '25GB de datos móviles incluidos'
    ]
  },
  {
    title: 'Estándar',
    speed: '500',
    data: '50',
    basePrice: 34.90,
    features: [
      'Fibra simétrica garantizada',
      'Router WiFi 6 incluido',
      '1 línea móvil con llamadas ilimitadas',
      '50GB de datos móviles incluidos'
    ]
  },
  {
    title: 'Pro',
    speed: '1000',
    data: '100',
    basePrice: 39.90,
    features: [
      'Fibra simétrica garantizada',
      'Router WiFi 6 incluido',
      '1 línea móvil con llamadas ilimitadas',
      '100GB de datos móviles incluidos'
    ]
  },
  {
    title: 'Premium',
    speed: '1000',
    data: '150',
    basePrice: 44.90,
    features: [
      'Fibra simétrica garantizada',
      'Router WiFi 6 incluido',
      '1 línea móvil con llamadas ilimitadas',
      '150GB de datos móviles incluidos'
    ]
  }
];

export default function FibraMovilConfigurator() {
  const [config, setConfig] = useState<FibraMovilConfig>({
    selectedPlan: 0,
    additionalLines: {
      line20GB: 0,
      line40GB: 0,
      line60GB: 0
    }
  });

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
      className="space-y-4 md:space-y-6"
    >
      {/* Plan Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {FIBRA_MOVIL_PLANS.map((plan, index) => (
          <motion.button
            key={index}
            onClick={() => setConfig(prev => ({ ...prev, selectedPlan: index }))}
            className="group relative p-4 md:p-5 rounded-xl text-left transition-all duration-300"
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
            <div className={`absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 transition-opacity duration-300 ${
              config.selectedPlan === index ? 'opacity-100' : 'group-hover:opacity-100'
            }`} />
            
            {/* Content */}
            <div className="relative">
              <h3 className="text-lg font-semibold mb-4 text-[#ed54ba]">
                {plan.title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray mb-1">Fibra</div>
                  <div className="flex items-center gap-2">
                    <WifiHigh size={20} weight="duotone" className="text-[#ed54ba]" />
                    <span className="text-2xl font-medium text-[#79C4CD]">{plan.speed}</span>
                    <span className="text-sm text-gray">Mb</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray mb-1">Datos Móvil</div>
                  <div className="flex items-center gap-2">
                    <DeviceMobile size={20} weight="duotone" className="text-[#ed54ba]" />
                    <span className="text-2xl font-medium text-[#79C4CD]">{plan.data}</span>
                    <span className="text-sm text-gray">GB</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray">
                      <div className="w-1 h-1 rounded-full bg-[#ed54ba]" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="text-3xl font-bold text-[#79C4CD]">
                    {plan.basePrice.toFixed(2)}€
                    <span className="text-sm font-normal text-gray ml-1">/mes</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Additional Lines Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        <motion.div
          className="lg:col-span-2 relative rounded-xl p-4 md:p-5 shadow-sm"
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
              <h3 className="text-base font-medium text-dark">Líneas Adicionales</h3>
              <div className="text-sm text-gray">
                {totalAdditionalLines}/4 líneas
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ed54ba] to-[#51fcff]"
                initial={{ width: 0 }}
                animate={{ width: `${(totalAdditionalLines / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="space-y-2">
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
                  <div className="flex items-center gap-2">
                    <DeviceMobile size={18} weight="duotone" className="text-[#ed54ba]" />
                    <div>
                      <span className="text-sm font-medium">{line.gb}GB</span>
                      <span className="text-xs text-gray ml-2">{line.price}€/mes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <motion.button
                      onClick={() => handleLineChange(line.type as keyof typeof config.additionalLines, false)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        config.additionalLines[line.type as keyof typeof config.additionalLines] === 0
                          ? 'bg-gray-100/80 text-gray-400'
                          : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-600'
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
                      onClick={() => handleLineChange(line.type as keyof typeof config.additionalLines, true)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        !canAddMore
                          ? 'bg-gray-100/80 text-gray-400'
                          : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-600'
                      }`}
                      disabled={!canAddMore}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus size={14} weight="bold" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Total Price Card */}
        <motion.div
          className="relative rounded-xl p-4 md:p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          style={{
            border: '2px solid transparent',
            background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
          }}
        >
          {/* Content */}
          <div className="relative flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-dark">Total Mensual:</span>
                <div className="text-2xl font-bold text-[#79C4CD]">
                  {calculateTotalPrice().toFixed(2)}€
                  <span className="text-xs font-normal text-gray ml-1">/mes</span>
                </div>
              </div>
              <p className="text-xs text-gray text-right">IVA incluido</p>
            </div>

            <motion.div
              className="mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#contacto"
                className="block text-center bg-gradient-new text-white py-2.5 px-5 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
              >
                ¡Lo quiero!
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 
