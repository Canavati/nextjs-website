import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Database, Plus, Minus, CaretDown, Star } from '@phosphor-icons/react';

interface BonoConfig {
  internationalMinutes: string;
  extraData: string;
}

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

export default function MovilBonos() {
  const [isExpanded, setIsExpanded] = useState(false);
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

  const selectedBonosCount = (config.internationalMinutes ? 1 : 0) + (config.extraData ? 1 : 0);

  return (
    <div className="mt-12 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Title Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f35]">
            Bonos Adicionales
          </h2>
          <p className="text-[#444444] mt-2 text-lg">
            Amplía tus datos y minutos cuando lo necesites
          </p>
        </div>

        {/* Collapsible Button */}
        <div className="relative">
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#ed54ba] via-[#4361ee] to-[#51fcff] opacity-100" />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-full bg-white rounded-2xl group transition-all duration-300"
          >
            <div className="px-6 py-4 flex items-center justify-between relative overflow-hidden">
              {/* Selection/Hover Gradient */}
              <div className="absolute inset-[1px] rounded-xl bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="flex items-center gap-6 relative">
                <div className="flex items-center gap-4 p-2 rounded-xl relative z-10">
                  <Globe size={24} weight="duotone" className="text-[#1a1f35] transition-colors duration-300" />
                  <Database size={24} weight="duotone" className="text-[#1a1f35] transition-colors duration-300" />
                </div>
                <div className="text-left relative z-10">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl md:text-2xl font-bold text-[#1a1f35] transition-all duration-300">
                      Bonos Adicionales
                    </h3>
                    <Star size={16} weight="fill" className="text-[#1a1f35]" />
                  </div>
                  {selectedBonosCount > 0 && (
                    <p className="text-sm text-[#1a1f35]/70 transition-all duration-300">
                      {selectedBonosCount} bono{selectedBonosCount > 1 ? 's' : ''} seleccionado{selectedBonosCount > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <CaretDown size={20} weight="bold" className="text-[#1a1f35] transition-colors duration-300" />
              </motion.div>
            </div>
          </button>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-3 bg-white rounded-xl p-4 shadow-lg space-y-6"
                style={{
                  border: '3px solid transparent',
                  background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
                }}
              >
                {/* International Minutes Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe size={28} weight="duotone" className="text-[#ed54ba]" />
                    <h3 className="text-xl font-semibold bg-gradient-new bg-clip-text text-transparent">
                      Bonos Internacionales
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {INTERNATIONAL_BONOS.map((bono) => (
                      <button
                        key={bono.id}
                        onClick={() => handleBonoChange('internationalMinutes', bono.id)}
                        className="relative group"
                      >
                        <div className="relative">
                          <div className="absolute -inset-[2px] bg-gradient-new rounded-xl opacity-100" />
                          <div className={`relative p-4 rounded-[10px] transition-all duration-300 bg-white ${
                            config.internationalMinutes === bono.id
                              ? 'bg-gradient-to-r from-[#ed54ba]/20 to-[#51fcff]/20'
                              : 'hover:bg-gradient-to-r hover:from-[#ed54ba]/10 hover:to-[#51fcff]/10'
                          }`}
                          >
                            <div className="flex flex-col items-center justify-between gap-2">
                              <div className="text-xl font-medium text-transparent bg-gradient-new bg-clip-text">{bono.minutes} min</div>
                              <div className="text-4xl font-black text-transparent bg-gradient-new bg-clip-text">
                                {bono.price.toFixed(2)}
                                <span className="text-lg font-normal text-transparent bg-gradient-new bg-clip-text ml-1">€</span>
                              </div>
                              <div className="text-sm text-transparent bg-gradient-new bg-clip-text">Internacional</div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extra Data Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Database size={28} weight="duotone" className="text-[#51fcff]" />
                    <h3 className="text-xl font-semibold bg-gradient-new bg-clip-text text-transparent">
                      Bonos de Datos Extra
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {DATA_BONOS.map((bono) => (
                      <button
                        key={bono.id}
                        onClick={() => handleBonoChange('extraData', bono.id)}
                        className="relative group"
                      >
                        <div className="relative">
                          <div className="absolute -inset-[2px] bg-gradient-new rounded-xl opacity-100" />
                          <div className={`relative p-4 rounded-[10px] transition-all duration-300 bg-white ${
                            config.extraData === bono.id
                              ? 'bg-gradient-to-r from-[#ed54ba]/20 to-[#51fcff]/20'
                              : 'hover:bg-gradient-to-r hover:from-[#ed54ba]/10 hover:to-[#51fcff]/10'
                          }`}
                          >
                            <div className="flex flex-col items-center justify-between gap-2">
                              <div className="text-xl font-medium text-transparent bg-gradient-new bg-clip-text">{bono.data}</div>
                              <div className="text-4xl font-black text-transparent bg-gradient-new bg-clip-text">
                                {bono.price.toFixed(2)}
                                <span className="text-lg font-normal text-transparent bg-gradient-new bg-clip-text ml-1">€</span>
                              </div>
                              <div className="text-sm text-transparent bg-gradient-new bg-clip-text">Datos Extra</div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 