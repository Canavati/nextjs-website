'use client';

import { motion } from 'framer-motion';
import { FilePdf } from '@phosphor-icons/react';

const tarifasList = [
  {
    title: 'Tarifas Principales',
    url: '/pdfs/tarifas/pvp_normales.pdf',
    description: 'Consulta nuestras tarifas estándar y planes principales',
    isAvailable: false
  },
  {
    title: 'Tarifas Red Inteligente',
    url: '/pdfs/tarifas/pvp_red_inteligente.pdf',
    description: 'Información sobre tarifas de servicios de red inteligente',
    isAvailable: false
  },
  {
    title: 'Tarifas Numeración Especial',
    url: '/pdfs/tarifas/20240303_MMBB_Legales-Numeración-Especial.pdf',
    description: 'Detalles de tarifas para números especiales',
    isAvailable: true
  },
  {
    title: 'Tarifas Internacionales',
    url: '/pdfs/tarifas/TARIFARIO_MMBB_TARIFAS_INTERNACIONALES.pdf',
    description: 'Consulta nuestras tarifas para llamadas internacionales',
    isAvailable: true
  },
  {
    title: 'Tarifas Roaming',
    url: '/pdfs/tarifas/TARIFARIOS MMBB_ROAMING.pdf',
    description: 'Información sobre tarifas de roaming en el extranjero',
    isAvailable: true
  }
];

export default function TarifasPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <motion.div 
        className="max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tarifas</h1>
        <p className="text-lg text-gray-600 mb-12">Consulta todas nuestras tarifas y precios actualizados</p>
        
        <div className="grid gap-6">
          {tarifasList.map((tarifa, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm transition-all duration-300 flex items-center gap-6 group ${
                tarifa.isAvailable ? 'hover:shadow-md cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {tarifa.isAvailable ? (
                <a 
                  href={tarifa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 w-full"
                >
                  <div className="bg-blue-50 p-4 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                    <FilePdf size={32} weight="duotone" className="text-[--primary]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-[--primary] transition-colors duration-300">
                      {tarifa.title}
                    </h2>
                    <p className="text-gray-600">
                      {tarifa.description}
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
                      {tarifa.title}
                    </h2>
                    <p className="text-gray-500">
                      Próximamente disponible
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 