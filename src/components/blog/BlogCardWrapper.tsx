'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlogCardWrapperProps {
  children: ReactNode;
  index: number;
  hasImage?: boolean;
}

export default function BlogCardWrapper({ children, index, hasImage = false }: BlogCardWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ y: -4 }}
      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ${
        hasImage 
          ? 'shadow-lg hover:shadow-xl' 
          : 'border border-slate-100 hover:border-[#51fcff]/30'
      }`}
    >
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        hasImage 
          ? 'bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/10 to-[#51fcff]/20'
          : 'bg-gradient-to-tr from-[#ed54ba]/5 via-transparent to-[#51fcff]/5'
      }`} />
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
} 