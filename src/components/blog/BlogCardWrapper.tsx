'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlogCardWrapperProps {
  children: ReactNode;
  index: number;
}

export default function BlogCardWrapper({ children, index }: BlogCardWrapperProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
} 