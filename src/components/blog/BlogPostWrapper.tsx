'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlogPostWrapperProps {
  children: ReactNode;
}

export default function BlogPostWrapper({ children }: BlogPostWrapperProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
} 