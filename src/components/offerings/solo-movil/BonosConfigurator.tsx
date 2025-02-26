'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Globe, Database, } from '@phosphor-icons/react';
import { useConfigurator } from '@/context/ConfiguratorProvider';
import { INTERNATIONAL_BONOS, DATA_BONOS } from '@/data/plans-data';

// Local UI versions for rendering (keeping the structure to avoid breaking the UI)
export const UI_INTERNATIONAL_BONOS = [
  { id: '100min', minutes: '100', price: 3.00 },
  { id: '300min', minutes: '300', price: 9.00 },
  { id: '600min', minutes: '600', price: 12.00 },
];

export const UI_DATA_BONOS = [
  { id: '500mb', data: '500 MB', price: 2.00 },
  { id: '1gb', data: '1 GB', price: 3.00 },
  { id: '3gb', data: '3 GB', price: 5.00 },
  { id: '5gb', data: '5 GB', price: 6.00 },
  { id: '10gb', data: '10 GB', price: 9.00 },
];

interface BonoConfig {
  internationalMinutes: string;
  extraData: string;
}

interface BonosConfiguratorProps {
  variant?: 'default' | 'hero';
  className?: string;
}

export default function BonosConfigurator({ variant = 'default', className = '' }: BonosConfiguratorProps) {
  const [activeType, setActiveType] = useState<'minutes' | 'data'>('minutes');
  const [selectedMinutes, setSelectedMinutes] = useState(UI_INTERNATIONAL_BONOS[0]);
  const [selectedData, setSelectedData] = useState(UI_DATA_BONOS[0]);
  const [isMinutesSelected, setIsMinutesSelected] = useState(false);
  const [isDataSelected, setIsDataSelected] = useState(false);
  
  // Get the configurator context
  const { setBonoSelection, openForm } = useConfigurator();

  // Reset selection state when component mounts or variant changes
  useEffect(() => {
    // Reset to initial states
    setActiveType('minutes');
    setSelectedMinutes(UI_INTERNATIONAL_BONOS[0]);
    setSelectedData(UI_DATA_BONOS[0]);
    setIsMinutesSelected(false);
    setIsDataSelected(false);
  }, [variant]); // Include variant in the dependency array to reset on variant changes

  // Handle type change in the hero variant
  const handleTypeChange = (type: 'minutes' | 'data') => {
    if (type === activeType) return;
    
    // Reset selections when changing types to ensure clean state
    if (type === 'minutes') {
      setIsMinutesSelected(false);
      // Pre-select the first option to ensure UI has something to show
      setSelectedMinutes(UI_INTERNATIONAL_BONOS[0]);
    } else {
      setIsDataSelected(false);
      // Pre-select the first option to ensure UI has something to show
      setSelectedData(UI_DATA_BONOS[0]);
    }
    
    setActiveType(type);
  };

  const handleMinutesSelect = (bono: typeof UI_INTERNATIONAL_BONOS[0]) => {
    // First set the active type (this might reset some selection state due to the useEffect)
    setActiveType('minutes');
    
    // Then update the state with the selected bono
    setSelectedMinutes(bono);
    setIsMinutesSelected(true);
    setIsDataSelected(false);
  };

  const handleDataSelect = (bono: typeof UI_DATA_BONOS[0]) => {
    // First set the active type (this might reset some selection state due to the useEffect)
    setActiveType('data');
    
    // Then update the state with the selected bono
    setSelectedData(bono);
    setIsDataSelected(true);
    setIsMinutesSelected(false);
  };

  // Handle contract button click - submits selection to configurator
  const handleContractClick = () => {
    if (isMinutesSelected || isDataSelected) {
      const type = isMinutesSelected ? 'minutes' : 'data';
      let bono;
      
      // Find the corresponding bono in the actual data structure
      if (type === 'minutes') {
        bono = INTERNATIONAL_BONOS.find(b => b.id === selectedMinutes.id);
      } else {
        bono = DATA_BONOS.find(b => b.id === selectedData.id);
      }
      
      if (bono) {
        // Set the bono selection in the configurator
        setBonoSelection(type, bono);
        // Open the form
        openForm();
      }
    }
  };

  if (variant === 'hero') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full space-y-6 ${className}`}
      >
        {/* Type Switcher */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => handleTypeChange('minutes')}
            className={`flex-1 py-3 px-6 rounded-2xl font-medium text-base transition-all duration-300 ${
              activeType === 'minutes'
                ? 'bg-gradient-new text-white shadow-lg shadow-[#51fcff]/20'
                : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Globe size={20} weight="duotone" className="text-[#51fcff]" />
              <span>Minutos</span>
              {isMinutesSelected && (
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">
                  {selectedMinutes.minutes}min
                </span>
              )}
            </div>
          </motion.button>
          <motion.button
            onClick={() => handleTypeChange('data')}
            className={`flex-1 py-3 px-6 rounded-2xl font-medium text-base transition-all duration-300 ${
              activeType === 'data'
                ? 'bg-gradient-new text-white shadow-lg shadow-[#51fcff]/20'
                : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Database size={20} weight="duotone" className="text-[#51fcff]" />
              <span>Datos</span>
              {isDataSelected && (
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">
                  {selectedData.data}
                </span>
              )}
            </div>
          </motion.button>
        </div>

        {/* Main Card */}
        <div className="w-full relative p-6 rounded-3xl backdrop-blur-sm bg-white/10">
          <AnimatePresence mode="wait" initial={false}>
            {activeType === 'minutes' ? (
              <motion.div
                key="minutes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Title and Icon */}
                <div className="flex items-center gap-2">
                  <Globe size={24} weight="duotone" className="text-[#51fcff]" />
                  <h3 className="text-2xl font-medium text-white">Minutos Internacionales</h3>
                </div>

                {/* Main Feature */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">
                    {selectedMinutes.minutes}
                    <span className="text-lg text-white/60 ml-2">min</span>
                  </div>
                  <div className="text-5xl font-bold text-[#51fcff] mt-2">
                    +{Number.isInteger(selectedMinutes.price) ? 
                      selectedMinutes.price : 
                      selectedMinutes.price.toFixed(2)}€
                    <span className="text-sm text-white/60 ml-1">/mes</span>
                  </div>
                </div>

                {/* Selector */}
                <div className="grid grid-cols-3 gap-3">
                  {UI_INTERNATIONAL_BONOS.map((bono) => (
                    <motion.button
                      key={bono.id}
                      onClick={() => handleMinutesSelect(bono)}
                      className={`relative p-3 rounded-2xl transition-all duration-300 ${
                        selectedMinutes.id === bono.id && isMinutesSelected
                          ? 'bg-white/20'
                          : 'bg-white/10 hover:bg-white/15'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-lg font-medium text-white">{bono.minutes}</div>
                      {selectedMinutes.id === bono.id && isMinutesSelected && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-[#51fcff]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="data"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Title and Icon */}
                <div className="flex items-center gap-2">
                  <Database size={24} weight="duotone" className="text-[#51fcff]" />
                  <h3 className="text-2xl font-bold text-white">Datos Extra</h3>
                </div>

                {/* Main Feature */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">
                    {selectedData.data}
                  </div>
                  <div className="text-5xl font-bold text-[#51fcff] mt-2">
                    +{Number.isInteger(selectedData.price) ? 
                      selectedData.price : 
                      selectedData.price.toFixed(2)}€
                    <span className="text-sm text-white/60 ml-1">/mes</span>
                  </div>
                </div>

                {/* Selector */}
                <div className="grid grid-cols-3 gap-3">
                  {UI_DATA_BONOS.map((bono) => (
                    <motion.button
                      key={bono.id}
                      onClick={() => handleDataSelect(bono)}
                      className={`relative p-3 rounded-2xl transition-all duration-300 ${
                        selectedData.id === bono.id && isDataSelected
                          ? 'bg-white/20'
                          : 'bg-white/10 hover:bg-white/15'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-lg font-medium text-white">{bono.data}</div>
                      {selectedData.id === bono.id && isDataSelected && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-[#51fcff]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button - Changed from Link to button with onClick handler */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            onClick={handleContractClick}
            disabled={!isMinutesSelected && !isDataSelected}
            className={`w-full text-center py-4 rounded-2xl font-medium text-lg transition-all duration-300 ${
              isMinutesSelected || isDataSelected
                ? 'bg-gradient-new text-white shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30'
                : 'bg-white/10 text-white/60 cursor-not-allowed'
            }`}
          >
            {isMinutesSelected || isDataSelected ? 'Contratar Bonos' : 'Selecciona un Bono'}
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* International Minutes Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-shimmer-dark relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,1)] [text-shadow:0_2px_15px_rgba(255,255,255,0.3),0_-1px_1px_rgba(0,0,0,0)]">
              <Globe size={20} weight="duotone" className="text-[#ed54ba] inline-block mr-2 mb-1" />
              Minutos Internacionales
            </h3>
          </div>
          <div className="flex justify-center gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {UI_INTERNATIONAL_BONOS.map((bono) => (
              <motion.div
                key={bono.id}
                className="w-[220px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
              >
                <div
                  className="group relative p-4 rounded-3xl bg-white text-center transition-all duration-300"
                  style={{
                    border: '1px solid transparent',
                    background: 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255)) padding-box, var(--gradient-primary) border-box'
                  }}
                >
                  {/* Title and Icon */}
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={18} weight="duotone" className="text-[#ed54ba]" />
                    <span className="text-sm font-medium text-[#1e3a5f]">
                      {bono.minutes} Minutos
                    </span>
                  </div>

                  {/* Light Divider */}
                  <hr className="border-[#adadad]/20" />

                  {/* Main Feature */}
                  <div className="py-4">
                    <div className="text-4xl font-medium text-[#79C4CD]">
                      {bono.minutes}
                      <span className="text-base text-[#666666] ml-1">mins</span>
                    </div>
                  </div>

                  {/* Light Divider */}
                  <hr className="border-[#adadad]/20" />

                  {/* Price */}
                  <div className="py-4">
                    <div className="text-5xl font-bold text-shimmer-glow-sync">
                      {Number.isInteger(bono.price) ? 
                        bono.price : 
                        bono.price.toFixed(2)}€
                    </div>
                    <p className="text-xs text-[#666666] mt-1">IVA incluido</p>
                  </div>

                  {/* Action Button - Changed from Link to button with onClick handler */}
                  <button
                    onClick={() => {
                      // Set selected minutes
                      handleMinutesSelect(bono);
                      // Handle contract click with the selected minutes bono
                      const actualBono = INTERNATIONAL_BONOS.find(b => b.id === bono.id);
                      if (actualBono) {
                        setBonoSelection('minutes', actualBono);
                        openForm();
                      }
                    }}
                    className="w-full text-center bg-gradient-new text-white py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#80c4cc]/30"
                  >
                    ¡Lo quiero!
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extra Data Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-shimmer-dark relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,1)] [text-shadow:0_2px_15px_rgba(255,255,255,0.3),0_-1px_1px_rgba(0,0,0,0)]">
              <Database size={20} weight="duotone" className="text-[#ed54ba] inline-block mr-2 mb-1" />
              Datos Extra
            </h3>
          </div>
          <div className="flex justify-center gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {UI_DATA_BONOS.map((bono) => (
              <motion.div
                key={bono.id}
                className="w-[220px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
              >
                <div
                  className="group relative p-4 rounded-3xl bg-white text-center transition-all duration-300"
                  style={{
                    border: '1px solid transparent',
                    background: 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255)) padding-box, var(--gradient-primary) border-box'
                  }}
                >
                  {/* Title and Icon */}
                  <div className="flex items-center gap-2 mb-2">
                    <Database size={18} weight="duotone" className="text-[#ed54ba]" />
                    <span className="text-sm font-medium text-[#1e3a5f]">
                      {bono.data} de Datos
                    </span>
                  </div>

                  {/* Light Divider */}
                  <hr className="border-[#adadad]/20" />

                  {/* Main Feature */}
                  <div className="py-4">
                    <div className="text-4xl font-medium text-[#79C4CD]">
                      {bono.data}
                    </div>
                  </div>

                  {/* Light Divider */}
                  <hr className="border-[#adadad]/20" />

                  {/* Price */}
                  <div className="py-4">
                    <div className="text-5xl font-bold text-shimmer-glow-sync">
                      {Number.isInteger(bono.price) ? 
                        bono.price : 
                        bono.price.toFixed(2)}€
                    </div>
                    <p className="text-xs text-[#666666] mt-1">IVA incluido</p>
                  </div>

                  {/* Action Button - Changed from Link to button with onClick handler */}
                  <button
                    onClick={() => {
                      // Set selected data
                      handleDataSelect(bono);
                      // Handle contract click with the selected data bono
                      const actualBono = DATA_BONOS.find(b => b.id === bono.id);
                      if (actualBono) {
                        setBonoSelection('data', actualBono);
                        openForm();
                      }
                    }}
                    className="w-full text-center bg-gradient-new text-white py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#80c4cc]/30"
                  >
                    ¡Lo quiero!
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 
