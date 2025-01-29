'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Package, FileText, WifiHigh, DeviceMobile, IconProps } from '@phosphor-icons/react';

interface Step {
  Icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
}

interface OfferingProcessProps {
  steps?: Step[];
}

const defaultSteps: Step[] = [
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
    title: 'Router WiFi 6',
    description: 'El técnico te llevará e instalará el router WiFi 6 de última generación.',
  },
];

export default function OfferingProcess({ steps = defaultSteps }: OfferingProcessProps) {
  return (
    <section id="proceso" className="py-20 px-4 bg-light-gray">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-shimmer"
        >
          La forma más fácil y rápida de contratar tu fibra
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="paso relative"
            >
              <div className="paso-icon w-20 h-20 rounded-full bg-gradient-new flex items-center justify-center mb-4 mx-auto shadow-lg shadow-[#51fcff]/20 group-hover:shadow-[#51fcff]/30">
                <step.Icon size={32} weight="duotone" className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-dark mb-2 text-center">{step.title}</h3>
              <p className="text-gray text-center max-w-sm mx-auto">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#51fcff] to-transparent opacity-20" />
              )}
            </motion.div>
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
            className="inline-block text-center bg-gradient-new text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 hover:shadow-[#51fcff]/30 hover:-translate-y-1"
          >
            CONTÁCTANOS
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 