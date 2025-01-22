'use client';

import { motion } from 'framer-motion';
import FAQItem from '@/components/ui/FAQItem';
import Link from 'next/link';

const faqs = [
  {
    question: '¿Qué velocidad de fibra ofrecéis?',
    answer: 'Ofrecemos diferentes velocidades de fibra óptica adaptadas a tus necesidades, desde 100Mb hasta 1Gb simétricos.'
  },
  {
    question: '¿Hay permanencia en los contratos?',
    answer: 'No, en Unimóvil no creemos en las permanencias. Eres libre de quedarte con nosotros el tiempo que quieras.'
  },
  {
    question: '¿Cuánto tarda la instalación de fibra?',
    answer: 'La instalación se realiza en un plazo máximo de 7 días laborables desde la confirmación del pedido.'
  },
  {
    question: '¿Puedo mantener mi número de teléfono actual?',
    answer: 'Sí, puedes mantener tu número actual sin ningún problema. Nos encargamos de toda la gestión de la portabilidad.'
  },
  {
    question: '¿Qué incluye el servicio móvil?',
    answer: 'Nuestros servicios móviles incluyen llamadas ilimitadas, SMS y datos móviles según el plan elegido, con la mejor cobertura.'
  }
];

export default function FAQ() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-shimmer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Preguntas Frecuentes
        </motion.h2>

        <div className="max-w-[800px] mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xl mb-6">¿Tienes más preguntas?</p>
          <Link 
            href="#contacto"
            className="inline-block text-center bg-gradient-new text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
          >
            CONTÁCTANOS
          </Link>
        </div>
      </div>
    </section>
  );
} 