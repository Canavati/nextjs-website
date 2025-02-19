'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown, FilePdf } from '@phosphor-icons/react';
import Link from 'next/link';

const tarifasList = [
  {
    title: 'Tarifas Internacionales',
    url: '/pdfs/tarifas/TARIFARIO_MMBB_TARIFAS_INTERNACIONALES.pdf',
    isAvailable: true
  },
  {
    title: 'Tarifas Roaming',
    url: '/pdfs/tarifas/TARIFARIOS MMBB_ROAMING.pdf',
    isAvailable: true
  }
];

export const TarifasDropdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-8 md:mt-12"
    >
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/tarifas"
          className="bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm relative group overflow-hidden hover:-translate-y-1 transition-all duration-300"
          style={{
            border: '2px solid transparent',
            background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
          }}
        >
          {/* Hover Gradient */}
          <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <span className="relative text-lg font-medium text-dark">Información de Tarifas</span>
        </Link>

        <Link
          href="/condiciones"
          className="bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm relative group overflow-hidden hover:-translate-y-1 transition-all duration-300"
          style={{
            border: '2px solid transparent',
            background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
          }}
        >
          {/* Hover Gradient */}
          <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <span className="relative text-lg font-medium text-dark">Términos y Condiciones</span>
        </Link>
      </div>
    </motion.div>
  );
}; 