'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contacto" className="min-h-[800px] bg-white py-16">
      <div className="max-w-7xl mx-auto">
        <div className="contacto-container bg-white rounded-[2rem] shadow-lg overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-black/50" />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 flex flex-col justify-center text-white text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-[2.75rem] font-bold mb-4 px-8"
                >
                  ¡Únete a la revolución digital!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-xl px-12"
                >
                  Estamos aquí para ayudarte a elegir el mejor plan para ti
                </motion.p>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-12 lg:p-16"
            >
              <h2 className="text-[2.75rem] font-extrabold mb-12 text-shimmer-dark text-center">
                Contáctanos
              </h2>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="w-full px-5 py-3 rounded-xl border border-[#e5e7eb] focus:outline-none focus:border-primary focus:ring-0 transition-colors text-gray-600 text-base"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Apellido"
                      className="w-full px-5 py-3 rounded-xl border border-[#e5e7eb] focus:outline-none focus:border-primary focus:ring-0 transition-colors text-gray-600 text-base"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-5 py-3 rounded-xl border border-[#e5e7eb] focus:outline-none focus:border-primary focus:ring-0 transition-colors text-gray-600 text-base"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Número de teléfono"
                    className="w-full px-5 py-3 rounded-xl border border-[#e5e7eb] focus:outline-none focus:border-primary focus:ring-0 transition-colors text-gray-600 text-base"
                    required
                  />
                </div>
                <div className="form-group">
                  <select 
                    className="w-full px-5 py-3 rounded-xl border border-[#e5e7eb] focus:outline-none focus:border-primary focus:ring-0 transition-colors text-gray-600 text-base appearance-none bg-white"
                    required
                  >
                    <option value="" disabled selected>Selecciona un servicio</option>
                    <option value="fibra">Fibra</option>
                    <option value="movil">Móvil</option>
                    <option value="fibra-movil">Fibra + Móvil</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Tu mensaje"
                    rows={4}
                    className="w-full px-5 py-3 rounded-xl border border-[#e5e7eb] focus:outline-none focus:border-primary focus:ring-0 transition-colors text-gray-600 text-base resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-center bg-gradient-new text-white py-4 px-8 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
                >
                  ENVIAR MENSAJE
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 