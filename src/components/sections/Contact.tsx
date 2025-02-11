'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contacto" className="min-h-[800px] relative overflow-hidden py-16">
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#292cf6]/5 via-[#1a1f35]/30 to-[#ed54ba]/5" />

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Waves */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(45deg, var(--quaternary), var(--quinary), var(--primary), var(--secondary))',
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />

        {/* Enhanced Floating Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 
                ? 'w-1 h-1 bg-gradient-to-r from-[#292cf6] to-[#51fcff]' 
                : i % 3 === 1
                ? 'w-2 h-2 bg-gradient-to-r from-[#51fcff] to-[#292cf6]'
                : 'w-3 h-3 bg-gradient-to-r from-[#ed54ba] to-[#292cf6]'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -300],
              x: [0, Math.sin(Math.random() * Math.PI * 2) * 50],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced Mesh Gradient */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--quaternary)_0%,_transparent_70%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--quinary)_0%,_transparent_70%)] opacity-20" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="contacto-container backdrop-blur-md bg-white/80 rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 relative">
          {/* Container Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#292cf6]/10 to-transparent rounded-br-[2rem]" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#ed54ba]/10 to-transparent rounded-tl-[2rem]" />
          
          <div className="grid md:grid-cols-2">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative min-h-[600px]"
            >
              <Image
                src="/images/feature-visual.png"
                alt="Únete a la revolución digital"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/60 to-black/80" />
              <div className="absolute inset-0 bg-black/50" />
              
              {/* Enhanced Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center text-white text-center z-10 p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <h2 className="text-[2.75rem] font-bold mb-6 drop-shadow-lg">
                    Empieza tu experiencia digital
                  </h2>
                  <div className="w-40 h-0.5 bg-gradient-to-r from-[#292cf6] via-[#51fcff] to-[#292cf6] mx-auto mb-6 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                  <p className="text-xl mb-8">
                    Nuestro equipo está listo para asesorarte y encontrar tu plan ideal
                  </p>
                  
                  {/* Feature Points */}
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
                    <div className="flex items-center justify-center space-x-2 text-[#a8e1e7]">
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>Máxima flexibilidad</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-[#f0a4d6]">
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>Instalación rápida</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-[#a8e1e7]">
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>Atención 24/7</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-[#f0a4d6]">
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>Soporte premium</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-12 lg:p-16 relative overflow-hidden"
            >
              <div className="relative mb-12">
                <h2 className="text-[2.75rem] font-extrabold text-shimmer-dark text-center">
                  Contáctanos
                </h2>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-0.5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#292cf6] via-[#51fcff] to-[#292cf6]" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>

              <form className="space-y-5 relative">
                <div className="grid grid-cols-2 gap-5">
                  <div className="form-group group">
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="w-full px-5 py-3 rounded-xl border-2 border-[#e5e7eb] focus:outline-none focus:border-[#292cf6] focus:ring-0 transition-all bg-white/80 group-hover:border-[#292cf6]/30 group-hover:shadow-lg"
                      required
                    />
                  </div>
                  <div className="form-group group">
                    <input
                      type="text"
                      placeholder="Apellido"
                      className="w-full px-5 py-3 rounded-xl border-2 border-[#e5e7eb] focus:outline-none focus:border-[#292cf6] focus:ring-0 transition-all bg-white/80 group-hover:border-[#292cf6]/30 group-hover:shadow-lg"
                      required
                    />
                  </div>
                </div>
                <div className="form-group group">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-5 py-3 rounded-xl border-2 border-[#e5e7eb] focus:outline-none focus:border-[#292cf6] focus:ring-0 transition-all bg-white/80 group-hover:border-[#292cf6]/30 group-hover:shadow-lg"
                    required
                  />
                </div>
                <div className="form-group group">
                  <input
                    type="tel"
                    placeholder="Número de teléfono"
                    className="w-full px-5 py-3 rounded-xl border-2 border-[#e5e7eb] focus:outline-none focus:border-[#292cf6] focus:ring-0 transition-all bg-white/80 group-hover:border-[#292cf6]/30 group-hover:shadow-lg"
                    required
                  />
                </div>
                <div className="form-group group relative">
                  <select 
                    className="w-full px-5 py-3 rounded-xl border-2 border-[#e5e7eb] focus:outline-none focus:border-[#292cf6] focus:ring-0 transition-all bg-white/80 group-hover:border-[#292cf6]/30 group-hover:shadow-lg appearance-none"
                    required
                  >
                    <option value="" disabled selected>Selecciona un servicio</option>
                    <option value="fibra">Fibra</option>
                    <option value="movil">Móvil</option>
                    <option value="fibra-movil">Fibra + Móvil</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="form-group group">
                  <textarea
                    placeholder="Tu mensaje"
                    rows={4}
                    className="w-full px-5 py-3 rounded-xl border-2 border-[#e5e7eb] focus:outline-none focus:border-[#292cf6] focus:ring-0 transition-all bg-white/80 group-hover:border-[#292cf6]/30 group-hover:shadow-lg resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-center bg-gradient-new text-white py-4 px-8 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgb(41,44,246,0.3)] hover:-translate-y-1 relative group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    ENVIAR MENSAJE
                    <motion.div
                      className="ml-2 w-1.5 h-1.5 rounded-full bg-white"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#292cf6] to-[#ed54ba] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-[#292cf6] to-[#ed54ba]" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 