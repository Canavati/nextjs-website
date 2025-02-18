'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Lightning, UsersThree, UsersFour, Crown, User, Users, Phone, FilePdf, WifiHigh, DeviceMobile } from '@phosphor-icons/react';
import PackCard from './PackCard';
import { useState, useRef, useEffect } from 'react';

const packs = [
  {
    id: 'single',
    title: 'Pack Single',
    description: 'Fibra 300 Megas + Llamadas Ilimitadas',
    features: [
      'Fibra 300 Megas + Llamadas Ilimitadas',
      '1 línea móvil de 50GB'
    ],
    price: '33,00',
    speed: '300',
    gb: '50',
    lines: 1,
    delay: 0.1
  },
  {
    id: 'duo',
    title: 'Pack Duo',
    description: 'FIBRA 500 Megas + Llamadas Ilimitadas',
    features: [
      'Fibra 500 Megas + Llamadas Ilimitadas',
      '2 líneas móviles con 100GB compartidos'
    ],
    price: '50,00',
    speed: '500',
    gb: '100',
    lines: 2,
    delay: 0.2
  },
  {
    id: 'tetra',
    title: 'Pack Tetra',
    description: 'Fibra 500 Megas + Llamadas Ilimitadas',
    features: [
      'Fibra 500 Megas + Llamadas Ilimitadas',
      '4 líneas móviles con 175GB compartidos'
    ],
    price: '60,00',
    speed: '500',
    gb: '175',
    lines: 4,
    delay: 0.3
  },
  {
    id: 'pro',
    title: 'Pack Pro',
    description: 'Fibra 1000 Megas + Llamadas Ilimitadas',
    features: [
      'Fibra 1000 Megas + Llamadas Ilimitadas',
      '2 líneas móviles con 175GB compartidos'
    ],
    price: '67,00',
    speed: '1000',
    gb: '175',
    lines: 2,
    isPopular: true,
    delay: 0.4
  }
];

// Tarifas Dropdown Component
const TarifasDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);

  const toggleAllSections = () => {
    setSectionsOpen(!sectionsOpen);
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-4 md:mt-8"
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
                onClick={toggleAllSections}
                className="w-full p-4 flex items-center justify-between text-left relative"
              >
                <div className="relative flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium text-dark">{section.title}</h3>
                  <motion.span
                    animate={{ rotate: sectionsOpen ? 180 : 0 }}
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
              <AnimatePresence initial={false}>
                {sectionsOpen && (
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

interface HeroPackCardProps {
  pack: typeof packs[0];
  isSelected: boolean;
  onClick: () => void;
}

const HeroPackCard = ({ pack, isSelected, onClick }: HeroPackCardProps) => {
  const getPackIcon = () => {
    if (pack.title.includes('Single')) return <Lightning size={24} weight="duotone" className="text-[#51fcff]" />;
    if (pack.title.includes('Duo')) return <Users size={24} weight="duotone" className="text-[#51fcff]" />;
    if (pack.title.includes('Tetra')) return <UsersFour size={24} weight="duotone" className="text-[#51fcff]" />;
    if (pack.title.includes('Pro')) return <Crown size={24} weight="duotone" className="text-[#51fcff]" />;
    return null;
  };

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: pack.delay }}
      className={`w-full group relative p-4 rounded-xl text-left transition-all duration-300 ${
        isSelected ? 'bg-white/20' : 'bg-white/10'
      } backdrop-blur-sm hover:bg-white/20`}
      whileHover={{ y: -4 }}
    >
      {/* Hover/Selected Gradient */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-tr from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 ${
        isSelected ? 'opacity-100' : 'group-hover:opacity-100'
      } transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative">
        {/* Title and Icon */}
        <div className="flex items-center gap-2 mb-4">
          {getPackIcon()}
          <h3 className="text-xl font-medium text-white">{pack.title}</h3>
          {isSelected && (
            <div className="ml-auto w-5 h-5 rounded-full bg-gradient-new flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <WifiHigh size={18} weight="duotone" className="text-[#51fcff]" />
              <span className="text-sm text-white/60">Fibra</span>
            </div>
            <div className="text-2xl font-medium text-white">
              {pack.speed}<span className="text-sm ml-1">Mb</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DeviceMobile size={18} weight="duotone" className="text-[#51fcff]" />
              <span className="text-sm text-white/60">Datos</span>
            </div>
            <div className="text-2xl font-medium text-white">
              {pack.gb}<span className="text-sm ml-1">GB</span>
            </div>
          </div>
        </div>

        {/* Lines Info */}
        <div className="flex items-center gap-2 mb-4">
          {pack.lines === 1 ? (
            <User size={18} weight="duotone" className="text-[#51fcff]" />
          ) : pack.lines === 4 ? (
            <UsersFour size={18} weight="duotone" className="text-[#51fcff]" />
          ) : (
            <Users size={18} weight="duotone" className="text-[#51fcff]" />
          )}
          <span className="text-sm text-white/60">
            {pack.lines} {pack.lines === 1 ? 'Línea' : 'Líneas'} Móviles
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-medium text-white">
            {pack.price}€
            <span className="text-sm font-normal text-white/60 ml-1">/mes</span>
          </div>
          {pack.isPopular && (
            <span className="text-xs text-[#51fcff] font-medium px-2 py-1 bg-[#51fcff]/10 rounded-full">
              Más Potente
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export const HeroPacks = () => {
  const [selectedPack, setSelectedPack] = useState(packs[0].id);

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative space-y-3"
      >
        {packs.map((pack) => (
          <HeroPackCard
            key={pack.id}
            pack={pack}
            isSelected={selectedPack === pack.id}
            onClick={() => setSelectedPack(pack.id)}
          />
        ))}

        {/* CTA Button */}
        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="#contacto"
            className="block text-center bg-gradient-new text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-[#51fcff]/20 hover:shadow-[#51fcff]/30 transition-all duration-300"
          >
            Contratar Ahora
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute -z-10 inset-0 pointer-events-none">
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#51fcff] rounded-full mix-blend-soft-light filter blur-xl opacity-40 animate-float" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#292cf6] rounded-full mix-blend-soft-light filter blur-xl opacity-40 animate-float" style={{ animationDelay: '-2s' }} />
        
        {/* Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#51fcff] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function PacksGrid() {
  const [currentCard, setCurrentCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update current card based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = 280 + 24; // card width + gap
        const newCard = Math.round(scrollLeft / cardWidth);
        setCurrentCard(newCard);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Handle dot click
  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 280 + 24; // card width + gap
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mb-4 md:hidden">
        {packs.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ed54ba]"
            style={{
              background: currentCard === index ? 'var(--gradient-primary)' : '#E5E7EB',
              transform: currentCard === index ? 'scale(1.2)' : 'scale(1)'
            }}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-6 pt-4 gap-6 snap-x snap-mandatory hide-scrollbar"
      >
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0 md:w-full px-[10%] md:px-0">
          {packs.map((pack) => (
            <div key={pack.id} className="w-[280px] md:w-auto snap-center">
              <PackCard {...pack} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Add TarifasDropdown with adjusted padding */}
      <div className="px-[5%] md:px-0">
        <TarifasDropdown />
      </div>
    </div>
  );
} 
