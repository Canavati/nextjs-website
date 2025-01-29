'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProcessStep from '@/components/ui/ProcessStep';
import { Package, FileText, WifiHigh, DeviceMobile } from '@phosphor-icons/react';

export default function Process() {
  const steps = [
  {
      Icon: Package,
    title: 'Elige tu tarifa',
    description: 'Selecciona tu tarifa de fibra y móvil pulsando el botón de "Lo quiero".',
  },
  {
      Icon: FileText,
    title: 'Contrato',
    description: 'Una vez elegida tu tarifa, te pediremos la dirección de instalación de la fibra, los datos personales del titular del contrato y domiciliación.',
  },
  {
      Icon: WifiHigh,
    title: 'Instalación rápida',
    description: 'Nos pondremos en contacto contigo en menos de 48 horas para que escojas el día y la hora de instalación.',
  },
  {
      Icon: DeviceMobile,
    title: 'Altas líneas móviles',
    description: 'El técnico te llevará gratuitamente las tarjetas SIM y gestionaremos la portabilidad.',
  },
];

  return (
    <section id="proceso" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-shimmer"
        >
          La forma más fácil y rápida de contratar tu tarifa
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.title}
              {...step}
              stepNumber={index + 1}
              totalSteps={steps.length}
              delay={index * 0.2}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="#contacto"
            className="inline-block text-center bg-gradient-new text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
          >
            CONTÁCTANOS
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 