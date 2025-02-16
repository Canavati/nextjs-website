'use client';

import { motion } from 'framer-motion';
import FAQItem from '../ui/FAQItem';

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

export default function FAQ({ faqs = defaultFAQs }: FAQProps) {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0e2547] to-[#0e3459] perspective-1000">
      {/* Cosmic background layer - lighter, more cyan */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0ea5e925_0%,transparent_70%)] animate-cosmic-shift"></div>
      
      {/* Dynamic floating elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              backgroundColor: Math.random() > 0.5 ? '#0ea5e9' : '#38bdf8',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              opacity: 0.2,
              filter: 'blur(1px)',
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" 
                 style={{ animationDelay: `${Math.random() * 2}s` }}></div>
          </div>
        ))}
      </div>

      {/* Animated light trails */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px animate-cosmic-shift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 50}px`,
              background: `linear-gradient(90deg, transparent, ${Math.random() > 0.5 ? '#0ea5e9' : '#38bdf8'}, transparent)`,
              animationDelay: `${-i * 2}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              opacity: 0.15,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
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