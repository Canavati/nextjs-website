'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Globe, Database, Check, Package, ArrowRight } from '@phosphor-icons/react';

const INTERNATIONAL_BONOS = [
  { id: '100min', minutes: '100', price: 3.00 },
  { id: '300min', minutes: '300', price: 9.00 },
  { id: '600min', minutes: '600', price: 12.00 },
];

const DATA_BONOS = [
  { id: '500mb', data: '500MB', price: 2.00 },
  { id: '1gb', data: '1GB', price: 3.00 },
  { id: '3gb', data: '3GB', price: 5.00 },
  { id: '5gb', data: '5GB', price: 6.00 },
  { id: '10gb', data: '10GB', price: 8.00 },
];

interface BonoConfig {
  internationalMinutes: string;
  extraData: string;
}

export default function MovilBonos() {
  const [config, setConfig] = useState<BonoConfig>({
    internationalMinutes: '',
    extraData: '',
  });

  const handleBonoChange = (type: 'internationalMinutes' | 'extraData', value: string) => {
    setConfig(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">Bonos Adicionales</h3>
        <p className="text-[#666666]">Personaliza tu plan con bonos extra según tus necesidades</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
        {/* International Minutes Bonos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg shadow-[#80c4cc]/10 overflow-hidden border border-[#eef2f5]"
        >
          <div className="bg-gradient-to-r from-[#292cf6]/5 to-[#ed54ba]/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-[#1e3a5f]">Minutos Internacionales</h4>
              <Globe size={24} weight="duotone" className="text-[#292cf6]" />
            </div>
            <div className="space-y-3">
              {INTERNATIONAL_BONOS.map((bono) => (
                <button
                  key={bono.id}
                  onClick={() => handleBonoChange('internationalMinutes', bono.id)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                    config.internationalMinutes === bono.id
                      ? 'bg-gradient-new text-white shadow-lg shadow-[#292cf6]/20'
                      : 'bg-white hover:bg-[#f8fafc] text-[#1e3a5f]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      config.internationalMinutes === bono.id
                        ? 'bg-white/20'
                        : 'bg-[#292cf6]/5 group-hover:bg-[#292cf6]/10'
                    }`}>
                      {config.internationalMinutes === bono.id ? (
                        <Check size={14} weight="bold" className="text-white" />
                      ) : null}
                    </div>
                    <span className="font-medium">{bono.minutes} min</span>
                  </div>
                  <span className={`font-semibold ${
                    config.internationalMinutes === bono.id
                      ? 'text-white'
                      : 'text-[#292cf6]'
                  }`}>
                    +{bono.price}€
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Extra Data Bonos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg shadow-[#80c4cc]/10 overflow-hidden border border-[#eef2f5]"
        >
          <div className="bg-gradient-to-r from-[#ed54ba]/5 to-[#292cf6]/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-[#1e3a5f]">Datos Extra</h4>
              <Database size={24} weight="duotone" className="text-[#ed54ba]" />
            </div>
            <div className="space-y-3">
              {DATA_BONOS.map((bono) => (
                <button
                  key={bono.id}
                  onClick={() => handleBonoChange('extraData', bono.id)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                    config.extraData === bono.id
                      ? 'bg-gradient-new text-white shadow-lg shadow-[#ed54ba]/20'
                      : 'bg-white hover:bg-[#f8fafc] text-[#1e3a5f]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      config.extraData === bono.id
                        ? 'bg-white/20'
                        : 'bg-[#ed54ba]/5 group-hover:bg-[#ed54ba]/10'
                    }`}>
                      {config.extraData === bono.id ? (
                        <Check size={14} weight="bold" className="text-white" />
                      ) : null}
                    </div>
                    <span className="font-medium">{bono.data}</span>
                  </div>
                  <span className={`font-semibold ${
                    config.extraData === bono.id
                      ? 'text-white'
                      : 'text-[#ed54ba]'
                  }`}>
                    +{bono.price}€
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Selected Bonos Summary */}
      <AnimatePresence>
        {(config.internationalMinutes !== '' || config.extraData !== '') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 max-w-[900px] mx-auto bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-[#eef2f5]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-new flex items-center justify-center">
                  <Package size={20} weight="duotone" className="text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1e3a5f]">Bonos Seleccionados</h4>
                  <p className="text-sm text-[#666666]">
                    {config.internationalMinutes !== '' && config.extraData !== ''
                      ? 'Minutos internacionales y datos extra'
                      : config.internationalMinutes !== ''
                      ? 'Minutos internacionales'
                      : 'Datos extra'}
                  </p>
                </div>
              </div>
              <Link
                href="#contacto"
                className="bg-gradient-new text-white px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#292cf6]/30 hover:-translate-y-1 flex items-center gap-2"
              >
                Contratar Bonos
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 