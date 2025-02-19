'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Contact from '@/components/sections/Contact';
import { 
  Lightning, Leaf, Clock, Calculator, Sun, Fire, 
  ChartLineUp, Lightbulb, Plug, House, Flame, Drop
} from '@phosphor-icons/react';

export default function EnergiaPage() {
  const floatingIcons = [
    // Left side
    { Icon: Lightning, top: '15%', left: '10%', duration: 8, delay: 0, size: 42 },
    { Icon: Fire, top: '70%', left: '15%', duration: 10, delay: 1, size: 36 },
    { Icon: Sun, top: '40%', left: '8%', duration: 12, delay: 2, size: 48 },
    { Icon: ChartLineUp, bottom: '15%', left: '20%', duration: 9, delay: 1.5, size: 32 },
    { Icon: Lightbulb, top: '25%', left: '22%', duration: 11, delay: 0.5, size: 38 },
    
    // Center
    { Icon: Plug, top: '10%', left: '45%', duration: 15, delay: 2, size: 52 },
    { Icon: House, bottom: '20%', left: '48%', duration: 13, delay: 1, size: 44 },
    { Icon: Leaf, top: '35%', left: '35%', duration: 10, delay: 3, size: 34 },
    
    // Right side
    { Icon: Flame, top: '20%', right: '15%', duration: 9, delay: 2, size: 40 },
    { Icon: Drop, bottom: '25%', right: '12%', duration: 11, delay: 3, size: 36 },
    { Icon: Calculator, top: '45%', right: '18%', duration: 12, delay: 1.5, size: 46 },
    { Icon: Clock, top: '15%', right: '25%', duration: 14, delay: 0.8, size: 38 }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] pt-[115px] -mt-[115px] bg-dark overflow-hidden flex items-center">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-new opacity-95" />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, duration, delay, size, ...position }, index) => (
          <motion.div
            key={index}
            className={`absolute pointer-events-none ${
              index > 5 ? 'hidden sm:block' : index > 10 ? 'hidden lg:block' : ''
            }`}
            style={{ ...position }}
            animate={{
              y: [0, -20, 0],
              x: [-5, 5, -5],
              rotate: [-3, 3, -3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-lg" />
              <div className="relative">
                <Icon 
                  size={size} 
                  weight="regular" 
                  className="text-white/40 transition-all duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(81, 252, 255, 0.3))'
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:sticky lg:top-[140px] -ml-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[2.5rem] md:text-[4rem] font-black leading-none text-white"
              >
                ENERGÍA
                <br />
                <span className="bg-gradient-bright bg-clip-text text-transparent">INTELIGENTE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-white/80 max-w-2xl"
              >
                Descubre las tarifas de luz y gas más competitivas del mercado. En UNIMOVIL te ofrecemos precios increíbles y la mejor atención, sin letra pequeña ni sorpresas.
              </motion.p>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 gap-3 pt-2 max-w-[400px]"
              >
                {[
                  { icon: Lightning, title: 'Precio fijo 24h', description: 'Sin tramos horarios' },
                  { icon: Leaf, title: 'Energía verde', description: '100% renovable' },
                  { icon: Calculator, title: 'Precios increíbles', description: 'Tarifas competitivas' },
                  { icon: Clock, title: 'Sin permanencia', description: 'Libertad total' },
                ].map((feature, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <feature.icon size={24} weight="duotone" className="text-[#51fcff] mb-1.5" />
                    <h3 className="text-white font-medium text-base">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <a
                  href="#tarifas"
                  className="inline-block bg-gradient-new text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Ver Tarifas
                </a>
                <a
                  href="#contacto"
                  className="inline-block bg-white/10 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/20"
                >
                  Contactar
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Preview with Price Banner */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full hidden lg:block ml-8"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-2xl rounded-full" />
              <div className="relative h-full w-full flex flex-col items-center justify-center gap-8">
                <Lightning size={120} weight="duotone" className="text-[#51fcff] mb-4" />
                <div className="grid grid-cols-2 gap-6 w-full">
                  {/* Gas Tariff */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Tarifa Gas</h3>
                    <ul className="space-y-4 mb-6">
                      <li className="flex items-start gap-3">
                        <span className="text-[#ffa726] text-lg">🔸</span>
                        <span className="text-gray-600">2 meses gratis en la factura de luz al contratar Luz+GAS</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#ffa726] text-lg">🔸</span>
                        <span className="text-gray-600">Mínimo precio las 24 horas sin tramos horarios</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#ffa726] text-lg">🔸</span>
                        <div className="bg-blue-50 p-3 rounded-lg w-full">
                          <span className="font-semibold text-gray-700">Precio fijo desde</span>
                          <div className="text-2xl font-bold text-blue-600">0.07€/kWh</div>
                        </div>
                      </li>
                    </ul>
                    <button className="w-full bg-gradient-new text-white rounded-xl py-3 font-medium hover:opacity-90 transition-opacity">
                      Contratar Ahora
                    </button>
                  </motion.div>

                  {/* Luz Tariff */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Tarifa Libre</h3>
                    <ul className="space-y-4 mb-6">
                      <li className="flex items-start gap-3">
                        <span className="text-[#51fcff] text-lg">🔹</span>
                        <span className="text-gray-600">2 meses gratis en la factura de luz al contratar Luz+GAS</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#51fcff] text-lg">🔹</span>
                        <span className="text-gray-600">Mínimo precio las 24 horas sin tramos horarios</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#51fcff] text-lg">🔹</span>
                        <div className="bg-blue-50 p-3 rounded-lg w-full">
                          <span className="font-semibold text-gray-700">Precio fijo desde</span>
                          <div className="text-2xl font-bold text-blue-600">0.117€/kWh</div>
                        </div>
                      </li>
                    </ul>
                    <button className="w-full bg-gradient-new text-white rounded-xl py-3 font-medium hover:opacity-90 transition-opacity">
                      Contratar Ahora
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flyers Section */}
      <section id="tarifas" className="py-20 relative overflow-hidden">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#b8e5ea] via-[#dbeef2] to-[#b8e5ea] opacity-90" />

        {/* Deep Blue Base Layer */}
        <div className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{ 
            backgroundImage: `linear-gradient(to bottom right, var(--quinary) 0%, var(--quinary) 10%, transparent 50%)`
          }}
        />

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--quinary)_0%,_var(--quaternary)_20%,_transparent_60%)] blur-3xl opacity-60" />
        </div>

        {/* Static Background Patterns */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ 
            backgroundImage: `
              radial-gradient(circle at 20% 20%, var(--quinary) 0%, transparent 30%),
              radial-gradient(circle at 80% 80%, var(--quinary) 0%, transparent 30%),
              radial-gradient(circle at 50% 50%, var(--quinary) 0%, transparent 40%),
              radial-gradient(circle at 30% 70%, var(--quaternary) 0%, transparent 30%)
            `,
            backgroundSize: '100% 100%',
          }}
        />

        {/* Additional Deep Blue Accents */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ 
            backgroundImage: `
              linear-gradient(45deg, var(--quinary) 0%, transparent 40%),
              linear-gradient(135deg, var(--quinary) 0%, transparent 40%)
            `,
          }}
        />

        {/* Static Dots Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{ 
            backgroundImage: `radial-gradient(var(--quinary) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-shimmer-dark relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,1)] [text-shadow:0_2px_15px_rgba(255,255,255,0.3),0_-1px_1px_rgba(0,0,0,0)]">
              Nuestras Tarifas de Energía
            </h2>
            <p className="text-xl text-gray-800 relative z-10">
              Descubre nuestras ofertas en luz y gas
            </p>
          </motion.div>

          {/* Main Content Container */}
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Plans Grid - More compact design */}
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Gas Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Tarifa Gas</h3>
                <ul className="space-y-6 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ffa726] text-lg mt-1">♦</span>
                    <span className="text-gray-600">2 meses gratis en la factura de luz al contratar Luz+GAS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ffa726] text-lg mt-1">♦</span>
                    <span className="text-gray-600">Mínimo precio las 24 horas sin tramos horarios</span>
                  </li>
                  <li className="pt-2">
                    <p className="text-gray-600 text-sm mb-2">Precio fijo desde</p>
                    <p className="text-[#0066FF] text-5xl font-bold">0.07€/kWh</p>
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1">
                  Contratar Ahora
                </button>
              </motion.div>

              {/* Luz Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Tarifa Libre</h3>
                <ul className="space-y-6 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#51fcff] text-lg mt-1">♦</span>
                    <span className="text-gray-600">2 meses gratis en la factura de luz al contratar Luz+GAS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#51fcff] text-lg mt-1">♦</span>
                    <span className="text-gray-600">Mínimo precio las 24 horas sin tramos horarios</span>
                  </li>
                  <li className="pt-2">
                    <p className="text-gray-600 text-sm mb-2">Precio fijo desde</p>
                    <p className="text-[#0066FF] text-5xl font-bold">0.117€/kWh</p>
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1">
                  Contratar Ahora
                </button>
              </motion.div>
            </div>

            {/* Flyers Grid - Same size as plans */}
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Gas Flyer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <Image
                  src="/energia/Flyer_gas.jpeg"
                  alt="Tarifa de Gas"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Luz Flyer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <Image
                  src="/energia/Flyer_luz.jpeg"
                  alt="Tarifa de Luz"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </main>
  );
} 