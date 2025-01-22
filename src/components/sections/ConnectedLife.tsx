'use client';

import { motion } from 'framer-motion';
import { House, GameController, MonitorPlay, Users } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';

export default function ConnectedLife() {
  const features = [
    {
      Icon: House,
      title: 'Teletrabajo sin interrupciones',
      description: 'Videollamadas fluidas y conexión estable para trabajar desde casa.',
    },
    {
      Icon: GameController,
      title: 'Gaming sin lag',
      description: 'Disfruta de tus juegos favoritos con la mejor respuesta.',
    },
    {
      Icon: MonitorPlay,
      title: 'Streaming sin cortes',
      description: 'Series, películas y contenido en la mejor calidad.',
    },
    {
      Icon: Users,
      title: 'Toda la familia conectada',
      description: 'Conexión simultánea para todos los dispositivos del hogar.',
    },
  ];

  return (
    <section id="vida-conectada" className="py-20 px-4 bg-light-gray">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-shimmer"
        >
          Tu Vida Conectada
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="vida-conectada-text"
          >
            <h3 className="text-2xl font-bold mb-4">
              Conectividad que se adapta a tu estilo de vida
            </h3>
            <p className="text-gray mb-8">
              Disfruta de una conexión estable y rápida para todo lo que necesitas hacer en tu día a día.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="feature"
                >
                  <feature.Icon
                    size={32}
                    weight="duotone"
                    className="text-[--quaternary] mb-3"
                  />
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="vida-conectada-image relative rounded-lg overflow-hidden shadow-xl"
          >
            <div className="aspect-w-4 aspect-h-3 relative">
              <Image
                src="/images/conectividad-bg.jpg"
                alt="Persona disfrutando de conectividad sin límites"
                width={800}
                height={600}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-20" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="#contacto"
            className="inline-block text-center bg-gradient-new text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
          >
            ¡QUIERO CONECTARME!
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 