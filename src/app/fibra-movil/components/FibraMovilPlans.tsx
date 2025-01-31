'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import FibraMovilConfigurator from '@/components/offerings/fibra-movil/FibraMovilConfigurator';
import PacksGrid from '@/components/offerings/packs/PacksGrid';

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
  const autoSwitchTimer = useRef<NodeJS.Timeout>();
  const hasUserInteracted = useRef<boolean>(false);

  const views = [
    { id: 'configurator', label: 'Configurador' },
    { id: 'packs', label: 'Packs Predefinidos' }
  ];

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    hasUserInteracted.current = true;
    
    // Clear the interval when user interacts
    if (autoSwitchTimer.current) {
      clearInterval(autoSwitchTimer.current);
      autoSwitchTimer.current = undefined;
    }
  };

  useEffect(() => {
    // Only start auto-switching if user hasn't interacted
    if (!hasUserInteracted.current) {
      autoSwitchTimer.current = setInterval(() => {
        setActiveView(current => current === 'configurator' ? 'packs' : 'configurator');
      }, AUTO_SWITCH_DELAY);
    }

    return () => {
      if (autoSwitchTimer.current) {
        clearInterval(autoSwitchTimer.current);
      }
    };
  }, []);

  return (
    <section id="planes" className="py-20 bg-light-gray">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <motion.h2
          {...motionConfig}
          className="text-4xl font-bold text-center mb-12 text-shimmer"
        >
          {activeView === 'packs' ? 'Packs Fibra + Móvil' : 'Configura tu Pack'}
        </motion.h2>

        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-md flex flex-wrap justify-center gap-2">
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
          </div>
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