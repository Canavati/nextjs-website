'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WifiHigh, DeviceMobile } from '@phosphor-icons/react';

export default function Revolution() {
  return (
    <section className="relative py-12 md:py-24 bg-dark text-white overflow-hidden">
      <div className="gradient-background-dark" />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative max-w-[1200px] mx-auto px-[5%] text-center">
        <motion.div 
          className="flex justify-center gap-4 md:gap-8 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center">
            <WifiHigh size={24} weight="duotone" className="text-white md:hidden" />
            <WifiHigh size={32} weight="duotone" className="text-white hidden md:block" />
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center">
            <DeviceMobile size={24} weight="duotone" className="text-white md:hidden" />
            <DeviceMobile size={32} weight="duotone" className="text-white hidden md:block" />
          </div>
        </motion.div>

        <motion.h2 
          className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-shimmer-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ¡Únete a la revolución de la conectividad!
        </motion.h2>

        <motion.p 
          className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12 px-4 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          No esperes más para disfrutar de las mejores tarifas en fibra y móvil. ¡Elige Unimóvil hoy y transforma tu experiencia con servicios de calidad a precios increíbles!
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link 
            href="#contacto" 
            className="inline-block text-center bg-gradient-new text-white py-3 md:py-4 px-6 md:px-8 rounded-xl font-medium text-base md:text-lg transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
          >
            QUIERO EMPEZAR
          </Link>
          <Link 
            href="#planes" 
            className="inline-block text-center bg-white/10 text-white py-3 md:py-4 px-6 md:px-8 rounded-xl font-medium text-base md:text-lg transition-all duration-300 hover:shadow-white/30 hover:-translate-y-1"
          >
            VER PLANES
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 