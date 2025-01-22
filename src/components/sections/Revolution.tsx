'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WifiHigh, DeviceMobile } from '@phosphor-icons/react';

export default function Revolution() {
  return (
    <section className="relative py-24 bg-dark text-white overflow-hidden">
      <div className="gradient-background-dark" />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative max-w-[1200px] mx-auto px-[5%] text-center">
        <motion.div 
          className="flex justify-center gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            <WifiHigh size={32} weight="duotone" className="text-white" />
          </div>
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            <DeviceMobile size={32} weight="duotone" className="text-white" />
          </div>
        </motion.div>

        <motion.h2 
          className="text-5xl font-extrabold mb-6 text-shimmer-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ¡Únete a la revolución de la conectividad!
        </motion.h2>

        <motion.p 
          className="text-lg text-gray-300 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          No esperes más para disfrutar de las mejores tarifas en fibra y móvil. ¡Elige Unimóvil hoy y transforma tu experiencia con servicios de calidad a precios increíbles!
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link 
            href="#contacto" 
            className="inline-block text-center bg-gradient-new text-white py-4 px-8 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
          >
            QUIERO EMPEZAR
          </Link>
          <Link 
            href="#planes" 
            className="inline-block text-center bg-white/10 text-white py-4 px-8 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-white/30 hover:-translate-y-1"
          >
            VER PLANES
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 