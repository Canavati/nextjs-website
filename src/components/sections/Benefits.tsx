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
    <section className="pt-16 pb-12 bg-light-gray">
      <div className="max-w-[1600px] mx-auto px-[5%]">
        <motion.h2
          {...motionConfig}
          className="text-4xl font-bold text-center mb-16 text-shimmer"
        >
          ¿Por qué elegirnos?
        </motion.h2>

        {/* Desktop Layout - Unchanged */}
        <div className="hidden md:flex justify-center">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                {...motionConfig}
                className="group card-interactive gradient-border bg-white rounded-3xl p-6 aspect-square text-center gradient-glow w-[260px] h-[260px] flex flex-col items-center justify-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-2 shrink-0 text-[--quaternary] group-hover:scale-110 transition-transform duration-300">
                  {renderIcon(benefit)}
                </div>
                <h3 className="text-lg font-bold mb-1 text-dark group-hover:text-shimmer transition-all duration-normal">
                  {benefit.title}
                </h3>
                <p className="text-gray text-sm group-hover:text-dark transition-colors duration-normal line-clamp-2">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Infinite Scroll */}
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
                  <div className="group card-interactive gradient-border bg-white rounded-3xl p-6 aspect-square text-center gradient-glow w-full h-[260px] flex flex-col items-center justify-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 mb-2 shrink-0 text-[--quaternary] group-hover:scale-110 transition-transform duration-300">
                      {renderIcon(benefit)}
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-dark group-hover:text-shimmer transition-all duration-normal">
                      {benefit.title}
                    </h3>
                    <p className="text-gray text-sm group-hover:text-dark transition-colors duration-normal line-clamp-2">
                      {benefit.description}
                    </p>
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
    </section>
  );
} 