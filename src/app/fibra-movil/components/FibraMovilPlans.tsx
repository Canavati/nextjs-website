'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import FibraMovilConfigurator from '@/components/offerings/fibra-movil/FibraMovilConfigurator';
import PacksGrid from '@/components/offerings/packs/PacksGrid';
import { useIsMobile } from '@/hooks/useIsMobile';

type ViewType = 'configurator' | 'packs';

const motionConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const AUTO_SWITCH_DELAY = 5000; // 5 seconds

export const FibraMovilPlans = () => {
  const [activeView, setActiveView] = useState<ViewType>('configurator');
  const isMobile = useIsMobile();

  const views = [
    { id: 'configurator', label: 'Configura tu Pack' },
    { id: 'packs', label: 'Packs' }
  ];

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  return (
    <section id="planes" className="py-20 bg-light-gray">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          {...motionConfig}
          className="text-4xl font-bold text-center mb-12 text-shimmer"
        >
          {activeView === 'packs' ? 'Packs Fibra + Móvil' : 'Configura tu Pack'}
        </motion.h2>

        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-2 shadow-md flex gap-2 md:flex-wrap md:justify-center overflow-x-auto hide-scrollbar md:overflow-visible"
          >
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => handleViewChange(view.id as ViewType)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeView === view.id
                    ? 'bg-gradient-new text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {view.label}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === 'packs' ? (
            <PacksGrid />
          ) : (
            <FibraMovilConfigurator />
          )}
        </motion.div>
      </div>
    </section>
  );
}; 