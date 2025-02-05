'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WifiHigh, DeviceMobile } from '@phosphor-icons/react';

export default function Revolution() {
  return (
    <section className="relative bg-dark text-white overflow-hidden py-16 md:py-20">
      <div className="gradient-background-dark" />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative max-w-[1200px] mx-auto px-[5%] text-center">
        <motion.div 
          className="flex justify-center gap-5 md:gap-8 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <WifiHigh size={28} weight="duotone" className="text-white md:hidden" />
            <WifiHigh size={36} weight="duotone" className="text-white hidden md:block" />
          </div>
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <DeviceMobile size={28} weight="duotone" className="text-white md:hidden" />
            <DeviceMobile size={36} weight="duotone" className="text-white hidden md:block" />
          </div>
        </motion.div>

        <motion.h2 
          className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-5 text-shimmer-light leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Internet que va más allá
        </motion.h2>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-10 px-4 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Velocidad ultrarrápida y datos ilimitados. La mejor tecnología para tu vida digital.
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
            className="inline-block text-center bg-gradient-new text-white py-3.5 md:py-4 px-8 md:px-10 rounded-xl font-medium text-base md:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
          >
            EMPEZAR AHORA
          </Link>
          <Link 
            href="#planes" 
            className="inline-block text-center bg-white/10 backdrop-blur-sm text-white py-3.5 md:py-4 px-8 md:px-10 rounded-xl font-medium text-base md:text-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:shadow-white/5 hover:-translate-y-1"
          >
            VER PLANES
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 