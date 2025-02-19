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
      className="group relative overflow-hidden transition-all duration-500"
    >
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
} 