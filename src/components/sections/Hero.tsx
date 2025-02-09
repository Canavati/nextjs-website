'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, WifiHigh, DeviceMobile, Rocket, Lightning, Crown, UsersThree, 
  Cloud, Cpu, Database, Globe, Desktop, SimCard, Broadcast, WifiHigh as WifiSignal, 
  GameController, House, ChatCircleDots
} from '@phosphor-icons/react';

export default function Hero() {
  const floatingIcons = [
    // Left side
    { Icon: WifiHigh, top: '15%', left: '10%', duration: 8, delay: 0, size: 42 },
    { Icon: Lightning, top: '70%', left: '15%', duration: 10, delay: 1, size: 36 },
    { Icon: Cloud, top: '40%', left: '8%', duration: 12, delay: 2, size: 48 },
    { Icon: Cpu, bottom: '15%', left: '20%', duration: 9, delay: 1.5, size: 32 },
    { Icon: Database, top: '25%', left: '22%', duration: 11, delay: 0.5, size: 38 },
    
    // Center
    { Icon: Globe, top: '10%', left: '45%', duration: 15, delay: 2, size: 52 },
    { Icon: Desktop, bottom: '20%', left: '48%', duration: 13, delay: 1, size: 44 },
    { Icon: SimCard, top: '35%', left: '35%', duration: 10, delay: 3, size: 34 },
    
    // Right side
    { Icon: DeviceMobile, top: '20%', right: '15%', duration: 9, delay: 2, size: 40 },
    { Icon: Crown, bottom: '25%', right: '12%', duration: 11, delay: 3, size: 36 },
    { Icon: UsersThree, top: '45%', right: '18%', duration: 12, delay: 1.5, size: 46 },
    { Icon: Broadcast, top: '15%', right: '25%', duration: 14, delay: 0.8, size: 38 },
    { Icon: WifiSignal, bottom: '35%', right: '22%', duration: 10, delay: 2.5, size: 42 },
    { Icon: GameController, top: '60%', right: '15%', duration: 13, delay: 1.2, size: 36 },
    { Icon: House, bottom: '15%', right: '28%', duration: 11, delay: 0.3, size: 44 },
    { Icon: ChatCircleDots, top: '30%', right: '10%', duration: 12, delay: 1.8, size: 34 }
  ];

  return (
    <section className="relative min-h-[50vh] md:min-h-[50vh] bg-dark overflow-hidden flex items-center">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-new opacity-95" />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating Icons - Hide some on mobile */}
      {floatingIcons.map(({ Icon, duration, delay, size, ...position }, index) => (
        <motion.div
          key={index}
          className={`absolute pointer-events-none ${index > 7 ? 'hidden md:block' : ''}`}
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
      
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] pointer-events-none"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/grid-pattern.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      <div className="relative container mx-auto px-4 pt-12 md:pt-16 pb-8 md:pb-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Repeating Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 md:space-y-4"
          >
            <div className="space-y-0">
              {[...Array(4)].map((_, i) => (
                <motion.h2
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-[3rem] md:text-[5rem] font-black leading-[0.85] md:leading-[0.85] flex"
                  style={{
                    opacity: 1 - (i * 0.25),
                    color: i === 0 ? '#51fcff' : '#ffffff',
                    textShadow: i === 0 ? '0 0 20px rgba(81, 252, 255, 0.3)' : 'none'
                  }}
                >
                  {i === 0 ? (
                    <>
                      <span 
                        className="text-[--primary]"
                        style={{
                          textShadow: '0 0 20px rgba(255, 49, 98, 0.5)'
                        }}
                      >UNI</span>
                      <span
                        style={{
                          textShadow: '0 0 20px rgba(81, 252, 255, 0.3)'
                        }}
                      >MOVIL</span>
                    </>
                  ) : (
                    'UNIMOVIL'
                  )}
                </motion.h2>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 md:mt-8 text-white/80 text-lg md:text-xl"
            >
              Tu operador móvil de confianza
            </motion.div>
          </motion.div>

          {/* Right Column - Pack Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-4 md:space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Pack
                <span className="bg-gradient-bright bg-clip-text text-transparent"> Single</span>
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-lg md:text-xl">
                  <WifiHigh size={32} weight="duotone" className="text-[#51fcff] shrink-0" />
                  <span>Fibra 500Mb</span>
                </div>
                <div className="flex items-center gap-4 text-lg md:text-xl">
                  <DeviceMobile size={32} weight="duotone" className="text-[#51fcff] shrink-0" />
                  <span>1 Línea Móvil 50GB</span>
                </div>
                <div className="flex items-center gap-4 text-lg md:text-xl">
                  <Phone size={32} weight="duotone" className="text-[#51fcff] shrink-0" />
                  <span>Llamadas ilimitadas</span>
                </div>
              </div>

              <div className="flex items-end gap-4 mt-6 md:mt-8">
                <div className="text-[3.5rem] md:text-[5rem] font-black leading-none text-[#51fcff] animate-pulse-subtle drop-shadow-[0_0_8px_rgba(81,252,255,0.5)]">
                  33€
                  <span className="text-xl md:text-2xl text-white/60 ml-2">/mes</span>
                </div>
              </div>
            </div>

            <Link
              href="#planes"
              className="inline-block bg-gradient-new text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300 hover:-translate-y-1"
            >
              ¡CONTRATAR AHORA!
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 