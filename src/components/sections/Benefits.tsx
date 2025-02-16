'use client';

import { motion, useAnimation } from 'framer-motion';
import { Wrench, Headset, Gauge, CurrencyCircleDollar, LockOpen, Broadcast, ShieldCheck, Clock, Rocket, Icon, Globe, Medal } from '@phosphor-icons/react'
import { type IconProps } from '@phosphor-icons/react';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Benefit {
  icon?: string;
  Icon?: ComponentType<IconProps>;
  title: string;
  description: string;
}

interface BenefitsProps {
  benefits?: Benefit[];
}

const defaultBenefits: Benefit[] = [
  {
    icon: 'gauge',
    title: 'Alta Velocidad',
    description: 'Velocidad simétrica garantizada',
  },
  {
    icon: 'globe',
    title: 'Cobertura Total',
    description: 'Red de fibra de última generación',
  },
  {
    icon: 'medal',
    title: 'Calidad Premium',
    description: 'Servicio de máxima calidad',
  },
  {
    Icon: Headset,
    title: 'Atención 24/7',
    description: 'Servicio de atención al cliente disponible todos los días del año.',
  },
  {
    Icon: Wrench,
    title: 'Instalación Profesional',
    description: 'Instalación realizada por técnicos especializados para garantizar el mejor servicio.',
  },
];

const motionConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function Benefits({ benefits = defaultBenefits }: BenefitsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const renderIcon = (benefit: Benefit) => {
    if (benefit.Icon) {
      const IconComponent = benefit.Icon;
      return <IconComponent size={56} weight="duotone" />;
    }

    if (!benefit.icon) return null;

    switch (benefit.icon) {
      case 'gauge':
        return <Gauge size={56} weight="duotone" />;
      case 'globe':
        return <Globe size={56} weight="duotone" />;
      case 'medal':
        return <Medal size={56} weight="duotone" />;
      case 'wrench':
        return <Wrench size={56} weight="duotone" />;
      case 'price':
        return <CurrencyCircleDollar size={56} weight="duotone" />;
      case 'lock':
        return <LockOpen size={56} weight="duotone" />;
      case 'router':
        return <Broadcast size={56} weight="duotone" />;
      case 'security':
        return <ShieldCheck size={56} weight="duotone" />;
      default:
        return null;
    }
  };

  // Create three sets for smoother infinite scroll
  const duplicatedBenefits = [...benefits, ...benefits, ...benefits];

  useEffect(() => {
    const startAnimation = async () => {
      if (isPaused) return;

      // Calculate the width of one complete set of cards
      const cardWidth = 260; // Width of each card
      const gap = 20; // Gap between cards
      const totalWidth = benefits.length * (cardWidth + gap);

      await controls.start({
        x: -totalWidth,
        transition: {
          duration: 15,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        },
      });
    };

    startAnimation();

    // Reset animation when container becomes visible
    return () => {
      controls.stop();
    };
  }, [controls, isPaused, benefits.length]);

  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => {
    setIsPaused(false);
    // Reset position and restart animation
    controls.start({
      x: 0,
      transition: { duration: 0 }
    }).then(() => {
      controls.start({
        x: -(260 + 20) * benefits.length,
        transition: {
          duration: 15,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    });
  };

  return (
    <section className="pt-16 pb-12 relative overflow-hidden bg-gradient-to-b from-[#0a1930] to-[#152442] perspective-1000">
      {/* Cosmic background layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#4361ee10_0%,transparent_70%)] animate-cosmic-shift"></div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-particle-wave"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: Math.random() > 0.5 ? '#4361ee' : '#0ea5e9',
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      {/* Dynamic energy waves */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-[#4361ee]/20 rounded-full animate-cosmic-shift"
            style={{
              animationDelay: `${-i * 3}s`,
              transform: `scale(${0.8 + i * 0.2})`,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs with enhanced animation */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4361ee] rounded-full mix-blend-soft-light filter blur-[128px] animate-float opacity-30"
           style={{ animationDelay: '-1s' }}></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0ea5e9] rounded-full mix-blend-soft-light filter blur-[128px] animate-float opacity-30"
           style={{ animationDelay: '-3s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#4361ee] to-[#0ea5e9] rounded-full mix-blend-soft-light filter blur-[160px] animate-pulse-slow opacity-10"></div>

      {/* Content wrapper */}
      <div className="relative z-10 backdrop-blur-[2px]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <motion.h2
            {...motionConfig}
            className="text-4xl font-bold text-center mb-16 text-shimmer-blue"
          >
            ¿Por qué elegirnos?
          </motion.h2>

          {/* Desktop Layout */}
          <div className="hidden md:flex justify-center">
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-20">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  {...motionConfig}
                  className="group relative card-interactive"
                >
                  {/* Card background animation */}
                  <div className="relative inset-0 bg-gradient-to-br from-[#4361ee]/10 via-transparent to-[#0ea5e9]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
                  
                  {/* Card content */}
                  <div className="relative bg-[#1a2942]/50 backdrop-blur-sm border border-[#4361ee]/20 rounded-3xl p-6 aspect-square text-center group-hover:border-[#0ea5e9]/40 w-[260px] h-[260px] flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_30px_-10px_#0ea5e9] group-hover:scale-105 overflow-hidden">
                    {/* Inner glow effect - updated for better centering */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4361ee]/5 via-transparent to-[#4361ee]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4361ee]/5 to-[#4361ee]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-[-100%] bg-[radial-gradient(circle_at_center,#4361ee10_0%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-2 shrink-0">
                      {/* Icon background glow - updated for consistency */}
                      <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,#4361ee15_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {/* Icon */}
                      <div className="relative text-[#4361ee] group-hover:text-[#0ea5e9] transition-colors duration-300 group-hover:scale-110 transform-gpu">
                        {renderIcon(benefit)}
                      </div>
                    </div>

                    <h3 className="relative text-lg font-bold mb-1 text-white/90 group-hover:text-[#0ea5e9] transition-all duration-normal">
                      {benefit.title}
                    </h3>
                    <p className="relative text-white/60 text-sm group-hover:text-white/80 transition-colors duration-normal line-clamp-2">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Layout - Update with same styling */}
          <div className="md:hidden overflow-hidden py-4">
            <div className="relative">
              <motion.div
                ref={containerRef}
                className="flex gap-5"
                animate={controls}
                initial={{ x: 0 }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: "pan-y" }}
              >
                {duplicatedBenefits.map((benefit, index) => (
                  <motion.div
                    key={`${benefit.title}-${index}`}
                    className="flex-none w-[260px]"
                  >
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4361ee]/10 via-transparent to-[#0ea5e9]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
                      
                      <div className="relative bg-[#1a2942]/50 backdrop-blur-sm border border-[#4361ee]/20 rounded-3xl p-6 aspect-square text-center group-hover:border-[#0ea5e9]/40 w-full h-[260px] flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_30px_-10px_#0ea5e9] group-hover:scale-105 overflow-hidden">
                        {/* Inner glow effect - updated for better centering */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#4361ee]/5 via-transparent to-[#4361ee]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4361ee]/5 to-[#4361ee]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-[-100%] bg-[radial-gradient(circle_at_center,#4361ee10_0%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-2 shrink-0">
                          {/* Icon background glow - updated for consistency */}
                          <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,#4361ee15_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          {/* Icon */}
                          <div className="relative text-[#4361ee] group-hover:text-[#0ea5e9] transition-colors duration-300 group-hover:scale-110 transform-gpu">
                            {renderIcon(benefit)}
                          </div>
                        </div>

                        <h3 className="relative text-lg font-bold mb-1 text-white/90 group-hover:text-[#0ea5e9] transition-all duration-normal">
                          {benefit.title}
                        </h3>
                        <p className="relative text-white/60 text-sm group-hover:text-white/80 transition-colors duration-normal line-clamp-2">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            {...motionConfig}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12 hidden"
          >
            <Link
              href="#planes"
              className="inline-block bg-gradient-cta text-white px-8 py-3 rounded-md font-medium button-bounce button-glow"
            >
              VER NUESTROS PLANES
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 