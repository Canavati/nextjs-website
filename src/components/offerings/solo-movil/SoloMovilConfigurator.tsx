'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { DeviceMobile, Phone } from '@phosphor-icons/react';

const SOLO_MOVIL_PLANS = [
  {
    title: 'Básico',
    data: '10',
    basePrice: 4.90,
    features: [
      'Llamadas ilimitadas',
      'SMS incluidos',
      'Sin permanencia',
      'Cobertura nacional'
    ]
  },
  {
    title: 'Estándar',
    data: '25',
    basePrice: 7.80,
    features: [
      'Llamadas ilimitadas',
      'SMS incluidos',
      'Sin permanencia',
      'Cobertura nacional'
    ]
  },
  {
    title: 'Pro',
    data: '40',
    basePrice: 9.90,
    features: [
      'Llamadas ilimitadas',
      'SMS incluidos',
      'Sin permanencia',
      'Cobertura nacional'
    ]
  },
  {
    title: 'Premium',
    data: '75',
    basePrice: 10.00,
    features: [
      'Llamadas ilimitadas',
      'SMS incluidos',
      'Sin permanencia',
      'Cobertura nacional'
    ]
  },
  {
    title: 'Ilimitado',
    data: '200',
    basePrice: 20.00,
    features: [
      'Llamadas ilimitadas',
      'SMS incluidos',
      'Sin permanencia',
      'Cobertura nacional'
    ]
  }
];

export default function SoloMovilConfigurator() {
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 md:space-y-6"
    >
      {/* Plan Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
        {SOLO_MOVIL_PLANS.map((plan, index) => (
          <motion.div
            key={index}
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
            <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Content */}
            <div className="relative">
              <h3 className="text-lg font-semibold mb-4 text-[#ed54ba]">
                {plan.title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray mb-1">Datos Móviles</div>
                  <div className="flex items-center gap-2">
                    <DeviceMobile size={20} weight="duotone" className="text-[#ed54ba]" />
                    <span className="text-2xl font-medium text-[#79C4CD]">{plan.data}</span>
                    <span className="text-sm text-gray">GB</span>
                  </div>
                </div>

                {/* Phone Icon */}
                <div className="flex items-center gap-2 text-[#79C4CD]">
                  <Phone size={20} weight="duotone" />
                  <span className="text-sm text-gray">Llamadas ilimitadas</span>
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
                  <p className="text-xs text-gray mt-1">IVA incluido</p>
                </div>

                {/* Action Button */}
                <motion.div
                  className="pt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="#contacto"
                    className="block text-center bg-gradient-new text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
                  >
                    ¡Lo quiero!
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 