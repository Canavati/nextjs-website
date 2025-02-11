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
    <section id="vida-conectada" className="py-20 px-4 relative overflow-hidden bg-[#f5f7ff]">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8eeff] via-[#d1d6ff] to-[#c5cbff]" />

      {/* Enhanced Animated Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Orb - Top Left */}
        <motion.div
          className="absolute w-[600px] h-[600px] -left-48 -top-48 rounded-full bg-[radial-gradient(circle_at_center,_var(--quinary)_0%,_transparent_70%)] blur-[64px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: ['-10%', '5%', '-10%'],
            y: ['-10%', '5%', '-10%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Secondary Orb - Bottom Right */}
        <motion.div
          className="absolute w-[500px] h-[500px] right-0 bottom-0 rounded-full bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_80%)] blur-[64px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: ['10%', '-5%', '10%'],
            y: ['10%', '-5%', '10%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Accent Orb - Center */}
        <motion.div
          className="absolute w-[300px] h-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_var(--quaternary)_0%,_transparent_80%)] blur-[48px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Enhanced Mesh Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--quaternary)_0%,_transparent_70%)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--quinary)_0%,_transparent_70%)] opacity-30" />
      </motion.div>

      {/* Enhanced Line Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ 
          backgroundImage: `
            linear-gradient(90deg, var(--quinary) 1px, transparent 1px),
            linear-gradient(0deg, var(--quinary) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[--quaternary]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-shimmer-dark relative"
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
            <h3 className="text-2xl font-bold mb-4 text-[--quinary]">
              Conectividad que se adapta a tu estilo de vida
            </h3>
            <p className="text-gray-600 mb-8">
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
                  className="feature bg-white/30 backdrop-blur-sm p-6 rounded-xl hover:bg-white/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group border border-white/10 relative overflow-hidden"
                >
                  {/* Card Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#292cf6]/5 to-[#ed54ba]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Enhanced Icon Container */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#292cf6]/20 to-[#ed54ba]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <feature.Icon
                      size={32}
                      weight="duotone"
                      className="text-[--quinary] mb-3 group-hover:scale-110 transition-transform duration-300 relative"
                    />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-[--quinary] group-hover:text-shimmer transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 relative z-10">{feature.description}</p>
                  
                  {/* Card Corner Accent */}
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#292cf6]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="vida-conectada-image relative rounded-2xl overflow-hidden shadow-lg group"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#292cf6]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            <div className="aspect-w-4 aspect-h-3 relative">
              <Image
                src="/images/conectividad-bg.jpg"
                alt="Persona disfrutando de conectividad sin límites"
                width={800}
                height={600}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292cf6]/20 via-transparent to-[#292cf6]/10" />
              
              {/* Image Corner Accents */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#292cf6]/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#ed54ba]/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            className="inline-block text-center bg-gradient-new text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative group overflow-hidden"
          >
            <span className="relative z-10">¡QUIERO CONECTARME!</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#292cf6] to-[#ed54ba] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Button Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-white/10 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-white/10 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 