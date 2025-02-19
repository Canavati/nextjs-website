'use client';

import { motion } from 'framer-motion';
import FAQItem from '../ui/FAQItem';
import { useMemo } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQ[];
}

const defaultFAQs = [
  {
    question: '¿Hay permanencia en los servicios?',
    answer: 'Nuestros planes tienen un compromiso de permanencia. Consulta las condiciones específicas con nuestro equipo comercial.',
  },
  {
    question: '¿Cuánto tarda la instalación?',
    answer: 'La instalación se realiza en un plazo máximo de 7 días laborables, aunque normalmente se completa en 2-3 días.',
  },
  {
    question: '¿Qué incluye la instalación?',
    answer: 'La instalación incluye todo el equipamiento necesario: router WiFi 6, cableado y configuración profesional por nuestros técnicos especializados.',
  },
  {
    question: '¿Puedo mantener mi número?',
    answer: 'Sí, puedes mantener tu número actual. Nosotros nos encargamos de todo el proceso de portabilidad sin coste adicional.',
  },
];

// Add these functions at the top level
const generateFloatingElements = (count: number) => {
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push({
      left: `${(i * 13) % 100}%`,
      top: `${(i * 17) % 100}%`,
      width: `${4 + (i % 8)}px`,
      height: `${4 + (i % 8)}px`,
      backgroundColor: i % 2 === 0 ? '#0ea5e9' : '#38bdf8',
      animationDelay: `${(i * 0.4) % 8}s`,
      animationDuration: `${6 + (i % 4)}s`,
      opacity: 0.2,
      filter: 'blur(1px)',
      transform: `rotate(${(i * 45) % 360}deg)`,
    });
  }
  return elements;
};

const generateLightTrails = (count: number) => {
  const trails = [];
  for (let i = 0; i < count; i++) {
    trails.push({
      left: `${(i * 19) % 100}%`,
      top: `${(i * 23) % 100}%`,
      width: `${50 + (i * 25) % 150}px`,
      background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#0ea5e9' : '#38bdf8'}, transparent)`,
      animationDelay: `${-i * 2}s`,
      animationDuration: `${15 + (i % 10)}s`,
      opacity: 0.15,
      transform: `rotate(${(i * 60) % 360}deg)`,
    });
  }
  return trails;
};

export default function FAQ({ faqs = defaultFAQs }: FAQProps) {
  // Generate positions once when component mounts
  const floatingElements = useMemo(() => generateFloatingElements(20), []);
  const lightTrails = useMemo(() => generateLightTrails(8), []);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0e2547] to-[#0e3459] perspective-1000">
      {/* Cosmic background layer - lighter, more cyan */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0ea5e925_0%,transparent_70%)] animate-cosmic-shift"></div>
      
      {/* Dynamic floating elements */}
      <div className="absolute inset-0">
        {floatingElements.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={style}
          >
            <div 
              className="absolute inset-0 bg-white/20 rounded-full animate-pulse" 
              style={{ animationDelay: `${(i * 0.25) % 2}s` }}
            />
          </div>
        ))}
      </div>

      {/* Animated light trails */}
      <div className="absolute inset-0">
        {lightTrails.map((style, i) => (
          <div
            key={i}
            className="absolute h-px animate-cosmic-shift"
            style={style}
          />
        ))}
      </div>

      {/* Glowing orbs with enhanced animation - more cyan focused */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0ea5e9] rounded-full mix-blend-soft-light filter blur-[128px] animate-float opacity-30"
           style={{ animationDelay: '-1s' }}></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#38bdf8] rounded-full mix-blend-soft-light filter blur-[128px] animate-float opacity-30"
           style={{ animationDelay: '-3s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] rounded-full mix-blend-soft-light filter blur-[160px] animate-pulse-slow opacity-15"></div>

      {/* Content wrapper */}
      <div className="relative z-10 backdrop-blur-[2px]">
        <div className="max-w-[800px] mx-auto px-[5%]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-16 text-shimmer-blue"
          >
            Preguntas Frecuentes
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}