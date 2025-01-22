'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full h-top-bar bg-[#292cf6] z-[1001] shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto px-4 h-full flex justify-between items-center">
        <div className="hidden lg:flex gap-4 items-center pl-0">
          <Link
            href="/particular"
            className="text-white no-underline text-sm font-medium opacity-90 hover:opacity-100 hover:text-[--secondary] hover:-translate-y-[1px] transition-all duration-300"
          >
            Soy Particular
          </Link>
          <span className="text-white opacity-50">|</span>
          <Link
            href="/empresa"
            className="text-white no-underline text-sm font-medium opacity-90 hover:opacity-100 hover:text-[--secondary] hover:-translate-y-[1px] transition-all duration-300"
          >
            Soy empresa/autónomo
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="hidden lg:inline-block text-white no-underline text-sm font-medium opacity-90 hover:opacity-100 hover:text-[--secondary] hover:-translate-y-[1px] transition-all duration-300"
          >
            Blog-FAQ
          </Link>
          <Link
            href="/ayuda"
            className="hidden lg:inline-block text-white no-underline text-sm font-medium opacity-90 hover:opacity-100 hover:text-[--secondary] hover:-translate-y-[1px] transition-all duration-300"
          >
            Ayuda
          </Link>
          <Link
            href="#contacto"
            className="bg-[--quaternary] text-white px-6 py-1 rounded-full text-sm font-semibold uppercase tracking-wider leading-normal transition-all duration-300 shadow-md hover:-translate-y-[1px] hover:shadow-lg hover:bg-[--secondary] hover:text-dark"
          >
            Llámanos
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 