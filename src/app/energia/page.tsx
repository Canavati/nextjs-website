'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Contact from '@/components/sections/Contact';
import { 
  Lightning, Leaf, Clock, Calculator, Sun, Fire, 
  ChartLineUp, Lightbulb, Plug, House, Flame, Drop
} from '@phosphor-icons/react';

// Add custom animation keyframes for energy effects
const customAnimations = `
@keyframes pulse-glow {
  0% {
    opacity: 0.3;
    box-shadow: 0 0 5px rgba(81, 252, 255, 0.2);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 15px rgba(81, 252, 255, 0.4);
  }
  100% {
    opacity: 0.3;
    box-shadow: 0 0 5px rgba(81, 252, 255, 0.2);
  }
}

@keyframes ping-slow {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes ping-slower {
  75%, 100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.pulse-glow {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-ping-slower {
  animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
`;

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
      {/* Custom animations */}
      <style jsx global>{customAnimations}</style>
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[100vh] pt-[80px] md:pt-[115px] -mt-[80px] md:-mt-[115px] bg-dark overflow-hidden flex items-center">
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
                    filter: 'drop-shadow(0 0 8px rgba(255, 167, 38, 0.3))'
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-5 md:space-y-8 pt-4 md:pt-0"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[2.5rem] md:text-[4rem] font-black leading-none text-white"
              >
                ENERGÍA
                <br />
                <span className="bg-gradient-to-r from-[#51fcff] to-[#0066FF] bg-clip-text text-transparent">INTELIGENTE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-xl text-white/80 max-w-2xl"
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
                  <div key={index} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <feature.icon size={24} weight="duotone" className="text-yellow-400 mb-1.5" />
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
                  className="inline-block bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#51fcff]/20 to-[#0066FF]/20 opacity-50 blur-3xl rounded-full" />
              <div className="relative h-full w-full flex flex-col items-center justify-center gap-8">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping-slow rounded-full bg-[#51fcff]/20"></div>
                  <Lightning size={120} weight="duotone" className="text-[#51fcff] mb-4 relative" />
                </div>
                <div className="grid grid-cols-2 gap-6 w-full">
                  {/* Gas Tariff */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-[#9c5adb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow"></div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <Fire size={28} weight="duotone" className="text-[#9c5adb]" />
                      <h3 className="text-2xl font-bold text-gray-900">Tarifa Gas</h3>
                    </div>
                    
                    <ul className="space-y-4 mb-6">
                      <li className="flex items-start gap-3">
                        <span className="text-[#9c5adb] text-lg">🔸</span>
                        <span className="text-gray-600">2 meses gratis en la factura de luz al contratar Luz+GAS</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#9c5adb] text-lg">🔸</span>
                        <span className="text-gray-600">Mínimo precio las 24 horas sin tramos horarios</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#9c5adb] text-lg">🔸</span>
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg w-full">
                          <span className="font-semibold text-gray-700">Precio fijo desde</span>
                          <div className="text-2xl font-bold text-[#9c5adb]">0.07€/kWh</div>
                        </div>
                      </li>
                    </ul>
                    <button className="w-full bg-gradient-to-r from-[#9c5adb] to-[#51fcff] text-white rounded-xl py-3 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg">
                      Contratar Ahora
                    </button>
                  </motion.div>

                  {/* Luz Tariff */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="absolute -left-1 -bottom-1 w-4 h-4 rounded-full bg-[#51fcff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slower"></div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <Lightning size={28} weight="duotone" className="text-[#51fcff]" />
                      <h3 className="text-2xl font-bold text-gray-900">Tarifa Libre</h3>
                    </div>
                    
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
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-100 p-3 rounded-lg w-full">
                          <span className="font-semibold text-gray-700">Precio fijo desde</span>
                          <div className="text-2xl font-bold text-[#0066FF]">0.117€/kWh</div>
                        </div>
                      </li>
                    </ul>
                    <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-3 font-medium hover:opacity-90 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#f0f4ff] via-[#e6f1ff] to-[#f0f4ff] opacity-90" />

        {/* Deep Blue Base Layer */}
        <div className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{ 
            backgroundImage: `linear-gradient(to bottom right, var(--quinary) 0%, var(--quinary) 10%, transparent 50%)`
          }}
        />

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#51fcff_0%,_#a8f9ff_20%,_transparent_60%)] blur-3xl opacity-60" />
        </div>

        {/* Static Background Patterns */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ 
            backgroundImage: `
              radial-gradient(circle at 20% 20%, #51fcff 0%, transparent 30%),
              radial-gradient(circle at 80% 80%, #9c5adb 0%, transparent 30%),
              radial-gradient(circle at 50% 50%, #0066FF 0%, transparent 40%),
              radial-gradient(circle at 30% 70%, #51fcff 0%, transparent 30%)
            `,
            backgroundSize: '100% 100%',
          }}
        />

        {/* Additional Accents */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ 
            backgroundImage: `
              linear-gradient(45deg, #0066FF 0%, transparent 40%),
              linear-gradient(135deg, #9c5adb 0%, transparent 40%)
            `,
          }}
        />

        {/* Static Dots Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{ 
            backgroundImage: `radial-gradient(#51fcff 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Gas Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-b from-white to-purple-50 rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col relative group border-2 border-white/70"
              >
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#9c5adb]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-glow"></div>
                
                {/* Spark animations on hover */}
                <div className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-[#9c5adb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow"></div>
                <div className="absolute -left-1 -bottom-1 w-4 h-4 rounded-full bg-[#9c5adb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slower"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Fire size={32} weight="duotone" className="text-[#9c5adb]" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Tarifa Gas</h3>
                  </div>
                  
                  <ul className="space-y-6 mb-8">
                    <li className="flex items-start gap-2">
                      <span className="text-[#9c5adb] text-lg mt-1">♦</span>
                      <span className="text-gray-600">2 meses gratis en la factura de luz al contratar Luz+GAS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#9c5adb] text-lg mt-1">♦</span>
                      <span className="text-gray-600">Mínimo precio las 24 horas sin tramos horarios</span>
                    </li>
                    <li className="pt-4">
                      <p className="text-gray-600 text-sm mb-2">Precio fijo desde</p>
                      <p className="text-[#9c5adb] text-5xl font-bold drop-shadow-sm">0.07€<span className="text-xl font-normal">/kWh</span></p>
                    </li>
                  </ul>
                  <button className="w-full bg-gradient-to-r from-[#9c5adb] to-[#51fcff] text-white rounded-xl py-4 font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30">
                    Contratar Ahora
                  </button>
                </div>
              </motion.div>

              {/* Luz Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 flex flex-col relative group border-2 border-white/70"
              >
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#51fcff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-glow"></div>
                
                {/* Spark animations on hover */}
                <div className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-[#51fcff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow"></div>
                <div className="absolute -left-1 -bottom-1 w-4 h-4 rounded-full bg-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slower"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-cyan-100 p-2 rounded-lg">
                      <Lightning size={32} weight="duotone" className="text-[#0066FF]" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">Tarifa Libre</h3>
                  </div>
                  
                  <ul className="space-y-6 mb-8">
                    <li className="flex items-start gap-2">
                      <span className="text-[#51fcff] text-lg mt-1">♦</span>
                      <span className="text-gray-600">2 meses gratis en la factura de luz al contratar Luz+GAS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#51fcff] text-lg mt-1">♦</span>
                      <span className="text-gray-600">Mínimo precio las 24 horas sin tramos horarios</span>
                    </li>
                    <li className="pt-4">
                      <p className="text-gray-600 text-sm mb-2">Precio fijo desde</p>
                      <p className="text-[#0066FF] text-5xl font-bold drop-shadow-sm">0.117€<span className="text-xl font-normal">/kWh</span></p>
                    </li>
                  </ul>
                  <button className="w-full bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white rounded-xl py-4 font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30">
                    Contratar Ahora
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Combined Offer Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 bg-gradient-to-r from-[#051c40] to-[#0a2e5c] rounded-3xl overflow-hidden shadow-2xl relative max-w-5xl mx-auto"
            >
              <div className="absolute inset-0 bg-[url('/energia/pattern-energy.png')] opacity-5"></div>
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#51fcff] rounded-full filter blur-[100px] opacity-20"></div>
              <div className="absolute left-0 top-0 w-48 h-48 bg-[#9c5adb] rounded-full filter blur-[80px] opacity-20"></div>
              
              <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <div className="inline-block bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 shadow-md">
                    ¡Oferta Especial!
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Ahorra contratando Luz + Gas
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Disfruta de 2 meses gratis en tu factura de luz al contratar ambos servicios juntos. Además, recibirás atención prioritaria y descuentos exclusivos en nuestros otros servicios.
                  </p>
                  <button className="bg-white text-[#051c40] px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    Combinar y Ahorrar
                  </button>
                </div>
                
                <div className="md:w-1/3 flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 animate-ping-slow rounded-full bg-[#51fcff]/20"></div>
                    <div className="absolute w-full h-full flex items-center justify-center">
                      <div className="relative w-32 h-32 bg-[#051c40] rounded-full flex items-center justify-center border-2 border-[#51fcff]/30">
                        <Lightning size={48} weight="duotone" className="text-[#51fcff]" />
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#51fcff] to-[#0066FF] text-white text-sm font-bold h-8 w-8 rounded-full flex items-center justify-center">
                          +
                        </div>
                        <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-[#9c5adb] to-[#7e3dbb] text-white text-sm font-bold h-8 w-8 rounded-full flex items-center justify-center">
                          <Fire size={18} weight="fill" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Energy Benefits Section - NEW */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 pt-8"
            >
              <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">
                Beneficios de Nuestra Energía
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    title: "Energía 100% Verde", 
                    description: "Toda nuestra electricidad proviene de fuentes renovables, contribuyendo a un futuro más sostenible", 
                    icon: Leaf, 
                    color: "from-[#51fcff] to-[#0066FF]" 
                  },
                  { 
                    title: "Atención Personalizada", 
                    description: "Recibe un asesoramiento adaptado a tus necesidades con expertos en optimización energética", 
                    icon: Lightbulb, 
                    color: "from-[#9c5adb] to-[#7e3dbb]" 
                  },
                  { 
                    title: "Factura Clara y Sin Sorpresas", 
                    description: "Entenderás cada detalle de tu factura con nuestro formato simplificado y transparente", 
                    icon: Calculator, 
                    color: "from-[#FF6B00] to-[#FF9500]" 
                  }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${benefit.color} mb-4`}>
                      <benefit.icon size={32} weight="duotone" className="text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </main>
  );
} 