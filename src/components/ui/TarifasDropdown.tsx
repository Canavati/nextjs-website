'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown, FilePdf } from '@phosphor-icons/react';

const tarifasList = [
  {
    title: 'Tarifas Internacionales',
    url: '/pdfs/tarifas/TARIFARIO_MMBB_TARIFAS_INTERNACIONALES.pdf',
    isAvailable: true
  },
  {
    title: 'Tarifas Roaming',
    url: '/pdfs/tarifas/TARIFARIOS MMBB_ROAMING.pdf',
    isAvailable: true
  }
];

export const TarifasDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    'Información General': false,
    'Condiciones': false,
    'Líneas Móviles': false
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const tarifasInfo = [
    {
      title: 'Información General',
      items: [
        'Precios con IVA incluido',
        'Velocidad simétrica garantizada',
        'Sin límite de descarga',
        'Router WiFi 6 incluido',
        'Instalación gratuita'
      ]
    },
    {
      title: 'Condiciones',
      items: [
        'Permanencia de 12 meses',
        'Alta e instalación gratuita',
        'Portabilidad gratuita',
        'Factura electrónica',
        'Pago por domiciliación bancaria'
      ]
    },
    {
      title: 'Líneas Móviles',
      items: [
        'Llamadas ilimitadas nacionales',
        'Roaming en UE incluido',
        'SMS a 0,12€',
        'Velocidad 4G/5G según cobertura',
        'MultiSIM disponible a 3€/mes'
      ]
    }
  ];

  const pdfLinks = [
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
      description: 'Información sobre tarifas en el extranjero',
      isAvailable: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-8 md:mt-12"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm relative group overflow-hidden"
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        style={{
          border: '2px solid transparent',
          background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
        }}
      >
        {/* Hover Gradient */}
        <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative flex items-center justify-between w-full">
          <span className="text-lg font-medium text-dark">Información de Tarifas y Condiciones</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#ed54ba]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </motion.span>
        </div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {/* PDF Links Section */}
        <div className="grid md:grid-cols-5 gap-4 mt-4">
          {pdfLinks.map((pdf, index) => (
            pdf.isAvailable ? (
              <motion.a
                key={pdf.title}
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                style={{
                  border: '2px solid transparent',
                  background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
                }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-new rounded-lg flex items-center justify-center">
                  <FilePdf size={20} weight="duotone" className="text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-dark group-hover:text-[#ed54ba] transition-colors line-clamp-1">
                    {pdf.title}
                  </h4>
                  <p className="text-xs text-gray line-clamp-1 mt-0.5">{pdf.description}</p>
                </div>
              </motion.a>
            ) : (
              <motion.div
                key={pdf.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isOpen ? 0.5 : 0, y: isOpen ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm cursor-not-allowed"
                style={{
                  border: '2px solid transparent',
                  background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
                }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FilePdf size={20} weight="duotone" className="text-gray-400" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-gray-400 line-clamp-1">
                    {pdf.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">Próximamente disponible</p>
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* Collapsible Sections */}
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {tarifasInfo.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-sm flex flex-col relative overflow-hidden"
              style={{
                border: '2px solid transparent',
                background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
              }}
            >
              <motion.button
                onClick={() => toggleSection(section.title)}
                className="w-full p-4 flex items-center justify-between text-left relative"
              >
                <h3 className="text-lg font-medium text-dark">{section.title}</h3>
                <motion.span
                  animate={{ rotate: openSections[section.title] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#ed54ba]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </motion.span>
              </motion.button>
              <AnimatePresence initial={false}>
                {openSections[section.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-slate-50/50">
                      <ul className="p-4 space-y-2">
                        {section.items.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                            className="flex items-center gap-3 text-sm text-gray hover:text-dark transition-colors duration-200"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-new shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}; 