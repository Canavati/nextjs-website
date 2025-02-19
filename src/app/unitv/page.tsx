'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Contact from '@/components/sections/Contact';
import { 
  Television, PlayCircle, Film, MonitorPlay, 
  DeviceMobile, Broadcast, Wifi, House,
  VideoCamera, Desktop, Laptop, DeviceTablet
} from '@phosphor-icons/react';

export default function UniTVPage() {
  const floatingIcons = [
    // Left side
    { Icon: Television, top: '15%', left: '10%', duration: 8, delay: 0, size: 42 },
    { Icon: PlayCircle, top: '70%', left: '15%', duration: 10, delay: 1, size: 36 },
    { Icon: Film, top: '40%', left: '8%', duration: 12, delay: 2, size: 48 },
    { Icon: MonitorPlay, bottom: '15%', left: '20%', duration: 9, delay: 1.5, size: 32 },
    { Icon: DeviceMobile, top: '25%', left: '22%', duration: 11, delay: 0.5, size: 38 },
    
    // Center
    { Icon: Broadcast, top: '10%', left: '45%', duration: 15, delay: 2, size: 52 },
    { Icon: House, bottom: '20%', left: '48%', duration: 13, delay: 1, size: 44 },
    { Icon: Wifi, top: '35%', left: '35%', duration: 10, delay: 3, size: 34 },
    
    // Right side
    { Icon: VideoCamera, top: '20%', right: '15%', duration: 9, delay: 2, size: 40 },
    { Icon: Desktop, bottom: '25%', right: '12%', duration: 11, delay: 3, size: 36 },
    { Icon: Laptop, top: '45%', right: '18%', duration: 12, delay: 1.5, size: 46 },
    { Icon: DeviceTablet, top: '15%', right: '25%', duration: 14, delay: 0.8, size: 38 }
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
                UNITV
                <br />
                <span className="bg-gradient-bright bg-clip-text text-transparent">STREAMING</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-white/80 max-w-2xl"
              >
                Disfruta del mejor contenido en streaming con UNITV. Series, películas, deportes y mucho más, todo en una única plataforma y con la mejor calidad.
              </motion.p>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 gap-3 pt-2 max-w-[400px]"
              >
                {[
                  { icon: Television, title: 'Contenido HD', description: 'Máxima calidad' },
                  { icon: DeviceMobile, title: 'Multiplataforma', description: 'En todos tus dispositivos' },
                  { icon: PlayCircle, title: 'Sin publicidad', description: 'Disfruta sin interrupciones' },
                  { icon: Film, title: 'Contenido exclusivo', description: 'Series y películas únicas' },
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
                  href="#planes"
                  className="inline-block bg-gradient-new text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Ver Planes
                </a>
                <a
                  href="#contacto"
                  className="inline-block bg-white/10 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/20"
                >
                  Contactar
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full hidden lg:block ml-8"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-2xl rounded-full" />
              <div className="relative h-full w-full flex flex-col items-center justify-center gap-8">
                <Television size={120} weight="duotone" className="text-[#51fcff] mb-4" />
                <div className="grid grid-cols-2 gap-6 w-full">
                  {/* Preview content will go here */}
                </div>
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