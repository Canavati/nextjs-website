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
    <section className="py-20 bg-light-gray">
      <div className="max-w-[800px] mx-auto px-[5%]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 text-shimmer"
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
    </section>
  );
}