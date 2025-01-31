'use client';

import { motion } from 'framer-motion';
import SoloMovilConfigurator from '@/components/offerings/solo-movil/SoloMovilConfigurator';

export const MovilPlans = () => {
  return (
    <section id="planes" className="py-20 bg-light-gray">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-shimmer"
        >
          Planes Móviles
        </motion.h2>

        <SoloMovilConfigurator />
      </div>
    </section>
  );
}; 