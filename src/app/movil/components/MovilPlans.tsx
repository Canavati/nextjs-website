'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SoloMovilConfigurator from '@/components/offerings/solo-movil/SoloMovilConfigurator';
import BonosConfigurator from '@/components/offerings/solo-movil/BonosConfigurator';
import { DeviceMobile } from '@phosphor-icons/react';

export const MovilPlans = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Opacity animation only
  const overlayOpacity = useTransform(scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    [0, 0.6, 0.6, 0]
  );
  
  // Subtle scale animation
  const overlayScale = useTransform(scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1.1, 1, 1, 1.1]
  );

  return (
    <section ref={sectionRef} id="planes" className="py-20 relative overflow-hidden">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#b8e5ea] via-[#dbeef2] to-[#b8e5ea]" />

      {/* Deep Blue Base Layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{ 
          opacity: overlayOpacity,
          backgroundImage: `linear-gradient(to bottom right, var(--quinary) 0%, var(--quinary) 10%, transparent 50%)`
        }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          opacity: overlayOpacity,
          scale: overlayScale,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--quinary)_0%,_var(--quaternary)_20%,_transparent_60%)] blur-3xl opacity-60" />
      </motion.div>

      {/* Static Background Patterns */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ 
          opacity: overlayOpacity,
          scale: overlayScale,
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
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ 
          opacity: overlayOpacity,
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

      {/* Content Container */}
      <div className="max-w-[1600px] mx-auto px-4 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold text-center mb-12 text-shimmer-dark relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,1)] [text-shadow:0_2px_15px_rgba(255,255,255,0.3),0_-1px_1px_rgba(0,0,0,0)]"
        >
          <DeviceMobile size={20} weight="duotone" className="text-[#ed54ba] inline-block mr-2 mb-1" />
          Planes Móviles
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full min-h-[650px] md:min-h-[750px] z-10"
        >
          <SoloMovilConfigurator />
        </motion.div>
      </div>
    </section>
  );
}; 