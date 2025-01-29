'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { WifiHigh, Broadcast, Rocket, Crown } from '@phosphor-icons/react';

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

export default function SoloFibraConfigurator() {
  return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex overflow-x-auto pb-12 pt-8 gap-6 snap-x snap-mandatory hide-scrollbar">
          <div className="flex md:grid md:grid-cols-2 gap-6 min-w-max md:min-w-0 md:w-full px-[10%] md:px-0">
            {SOLO_FIBRA_PLANS.map((plan, index) => (
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
                  <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Content */}
                  <div className="relative flex flex-col h-full">
                    {/* Title and Icon at top */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                      {plan.title === 'Estándar' && <Rocket size={32} weight="duotone" className="text-[--primary]" />}
                      {plan.title === 'Pro' && <Crown size={32} weight="duotone" className="text-[--primary]" />}
                      <h3 className="text-xl font-medium text-dark">{plan.title}</h3>
                    </div>

                    {/* Light Divider */}
                    <hr className="border-[#adadad] mb-6" />

                    {/* Main Feature - Speed */}
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center justify-center gap-2">
                        <WifiHigh size={32} weight="duotone" className="text-[#ed54ba]" />
                        <span className="text-5xl font-bold text-[#79C4CD]">{plan.speed}</span>
                        <span className="text-xl font-bold text-gray">Mb</span>
                      </div>
                    </div>

                    {/* Router Icon */}
                    <div className="flex items-center justify-center gap-2 text-[#79C4CD] mb-4">
                      <Broadcast size={32} weight="duotone" />
                      <span className="text-base text-gray">Router WiFi 6</span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray">
                          <div className="w-1 h-1 rounded-full bg-[#ed54ba]" />
                          {feature}
                        </div>
                      ))}
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
      </motion.div>
  );
} 
