'use client';

import { motion } from 'framer-motion';
import { Phone, EnvelopeSimple, Question, ChatCircleText, Article, Lightning } from '@phosphor-icons/react';
import Link from 'next/link';
import FAQItem from '@/components/ui/FAQItem';

const faqs = [
  {
    question: '¿Cómo puedo contratar un servicio?',
    answer: 'Puedes contratar nuestros servicios de varias formas: a través de nuestra web en la sección de planes, llamándonos al teléfono de atención al cliente, o completando el formulario de contacto.'
  },
  {
    question: '¿Cuál es el tiempo de instalación?',
    answer: 'El tiempo medio de instalación es de 5-7 días laborables desde la confirmación del pedido. Nuestro equipo técnico se pondrá en contacto contigo para acordar la fecha y hora que mejor te convenga.'
  },
  {
    question: '¿Cómo funciona la portabilidad?',
    answer: 'La portabilidad es el proceso de mantener tu número actual al cambiar de operador. Nosotros nos encargamos de todo el proceso, que suele completarse en 24-48 horas para móvil y 5-7 días para fija.'
  },
  {
    question: '¿Qué documentación necesito?',
    answer: 'Para contratar nuestros servicios necesitarás: DNI/NIE, datos de contacto, dirección de instalación (para fibra), y datos bancarios para la domiciliación.'
  },
  {
    question: '¿Hay permanencia en los servicios?',
    answer: 'No, en Unimóvil no tenemos permanencia en ninguno de nuestros servicios. Eres libre de quedarte con nosotros el tiempo que desees.'
  }
];

const helpResources = [
  {
    icon: Phone,
    title: 'Atención Telefónica',
    description: 'Llámanos al 900 XXX XXX',
    link: 'tel:900XXXXXX',
    buttonText: 'Llamar ahora'
  },
  {
    icon: EnvelopeSimple,
    title: 'Correo Electrónico',
    description: 'soporte@unimovil.com',
    link: 'mailto:soporte@unimovil.com',
    buttonText: 'Enviar email'
  },
  {
    icon: ChatCircleText,
    title: 'Chat en Línea',
    description: 'Chatea con nuestro equipo',
    link: '#chat',
    buttonText: 'Iniciar chat'
  },
  {
    icon: Article,
    title: 'Centro de Ayuda',
    description: 'Consulta nuestras guías',
    link: '/guias',
    buttonText: 'Ver guías'
  }
];

export default function AyudaPage() {
  return (
    <main className="pt-total-nav min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-new opacity-95" />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6"
          >
            Centro de Ayuda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Estamos aquí para ayudarte. Encuentra respuestas rápidas o contacta con nuestro equipo de soporte.
          </motion.p>
        </div>
      </section>

      {/* Help Resources Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <resource.icon size={32} weight="duotone" className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Link
                  href={resource.link}
                  className="inline-block bg-gradient-new text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
                >
                  {resource.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 text-shimmer"
          >
            Preguntas Frecuentes
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                delay={index * 0.1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">
              ¿No encuentras lo que buscas?
            </p>
            <Link
              href="#contacto"
              className="inline-block bg-gradient-new text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
            >
              Contacta con nosotros
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 