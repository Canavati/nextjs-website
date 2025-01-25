'use client';

import { motion, useAnimation } from 'framer-motion';
import { Wrench, Headset, Gauge, CurrencyCircleDollar, LockOpen } from '@phosphor-icons/react'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const benefits = [
  {
    icon: 'speed',
    title: 'Conexión Ultra Rápida',
    description: 'Velocidad garantizada y estable',
  },
  {
    icon: 'price',
    title: 'Precios Transparentes',
    description: 'Sin costes ocultos',
  },
  {
    icon: 'headset',
    title: 'Soporte 24/7',
    description: 'Atención personalizada inmediata',
  },
  {
    icon: 'lock',
    title: 'Sin Permanencia',
    description: 'Libertad total sin compromisos',
  },
  {
    icon: 'wrench',
    title: 'Instalación Gratis',
    description: 'Servicio profesional incluido',
  },
];

const motionConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function Benefits() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollInterval = useRef<NodeJS.Timeout>();

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'speed':
        return <Gauge size={56} weight="duotone" />;
      case 'price':
        return <CurrencyCircleDollar size={56} weight="duotone" />;
      case 'headset':
        return <Headset size={56} weight="duotone" />;
      case 'lock':
        return <LockOpen size={56} weight="duotone" />;
      case 'wrench':
        return <Wrench size={56} weight="duotone" />;
      default:
        return null;
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 260; // Width of each card
      const gap = 20; // Gap between cards
      const scrollPosition = index * (cardWidth + gap);
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const startAutoScroll = () => {
      if (isAutoScrolling) {
        autoScrollInterval.current = setInterval(() => {
          const nextIndex = (activeIndex + 1) % benefits.length;
          scrollToCard(nextIndex);
        }, 3000);
      }
    };

    startAutoScroll();

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [activeIndex, isAutoScrolling]);

  const handleTouchStart = () => {
    setIsAutoScrolling(false);
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
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

        <div className="hidden md:flex justify-center">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-20">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                {...motionConfig}
                className="group card-interactive gradient-border bg-white rounded-3xl p-6 aspect-square text-center gradient-glow w-[260px] h-[260px] flex flex-col items-center justify-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-2 shrink-0 text-[--quaternary] group-hover:scale-110 transition-transform duration-300">
                  {renderIcon(benefit.icon)}
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

        {/* Mobile Scrolling View */}
        <div className="md:hidden py-4">
          <div 
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                {...motionConfig}
                className="flex-none w-[260px] snap-center mx-2.5 first:ml-[5%] last:mr-[5%]"
              >
                <div className="group card-interactive gradient-border bg-white rounded-3xl p-6 aspect-square text-center gradient-glow w-full h-[260px] flex flex-col items-center justify-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-2 shrink-0 text-[--quaternary] group-hover:scale-110 transition-transform duration-300">
                    {renderIcon(benefit.icon)}
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
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  scrollToCard(index);
                  setIsAutoScrolling(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-[--quaternary] w-4' : 'bg-gray/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
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