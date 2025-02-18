'use client';

import { motion } from 'framer-motion';
import { FilePdf } from '@phosphor-icons/react';

const condicionesList = [
  {
    title: 'Terminos y Condiciones Generales de Servicio',
    url: '/condiciones_generales_particulares.pdf',
    description: 'Consulta las condiciones generales y particulares de nuestros servicios',
    isAvailable: true
  },
  {
    title: 'Política de Cookies',
    url: '/politica-cookies.pdf',
    description: 'Información sobre el uso de cookies en nuestra web',
    isAvailable: true
  },
  {
    title: 'Condiciones de Privacidad y Protección de Datos',
    url: '/condiciones_proteccion_datos_y_privacidad.pdf',
    description: 'Información sobre privacidad y tratamiento de datos personales',
    isAvailable: true
  }
];

export default function CondicionesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <motion.div 
        className="max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Condiciones</h1>
        <p className="text-lg text-gray-600 mb-12">Consulta todas nuestras condiciones y términos legales</p>
        
        <div className="grid gap-6">
          {condicionesList.map((condicion, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`absolute -inset-[1px] bg-gradient-new rounded-xl opacity-70 transition-opacity duration-300 ${
                condicion.isAvailable ? 'opacity-70' : 'opacity-20'
              }`} />
              <div
                className={`relative bg-white rounded-xl p-6 shadow-sm transition-all duration-300 flex items-center gap-6 group ${
                  condicion.isAvailable ? 'cursor-pointer hover:shadow-md' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {condicion.isAvailable ? (
                  <a 
                    href={condicion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 w-full"
                  >
                    <div className="relative">
                      <div className="absolute -inset-[1px] bg-gradient-new rounded-lg opacity-70" />
                      <div className="relative bg-transparent p-4 rounded-lg">
                        <FilePdf size={32} weight="duotone" className="text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-[--primary] transition-colors duration-300">
                        {condicion.title}
                      </h2>
                      <p className="text-gray-600">
                        {condicion.description}
                      </p>
                    </div>
                  </a>
                ) : (
                  <>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <FilePdf size={32} weight="duotone" className="text-gray-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        {condicion.title}
                      </h2>
                      <p className="text-gray-500">
                        Próximamente disponible
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 