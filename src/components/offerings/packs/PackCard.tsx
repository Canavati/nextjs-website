'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lightning, UsersThree, UsersFour, Crown, User, Users, Phone } from '@phosphor-icons/react';

interface PackCardProps {
  title: string;
  description: string;
  features?: string[];
  price: string;
  isPopular?: boolean;
  delay: number;
  gb: string;
  speed: string;
}

const motionConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function PackCard({ 
  title, 
  description, 
  features, 
  price, 
  isPopular,
  delay,
  gb,
  speed
}: PackCardProps) {
  const getPackIcon = () => {
    if (title.includes('Single')) return <Lightning size={32} weight="duotone" className="text-[--primary]" />;
    if (title.includes('Duo')) return <Users size={32} weight="duotone" className="text-[--primary]" />;
    if (title.includes('Tetra')) return <UsersFour size={32} weight="duotone" className="text-[--primary]" />;
    if (title.includes('Pro')) return <Crown size={32} weight="duotone" className="text-[--primary]" />;
    return null;
  };

  return (
    <motion.div
      {...motionConfig}
      transition={{ duration: 0.5, delay }}
      className="relative card-interactive gradient-glow rounded-lg pt-6"
      style={{
        border: '2px solid transparent',
        background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
      }}
    >
      {isPopular && (
        <div className="absolute -top-4 right-4 bg-gradient-new text-white px-4 py-1 rounded-full text-sm font-medium hover-scale">
          Más Potente
        </div>
      )}
      
      <div className="p-8">
        {/* Title and Icon at top */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {getPackIcon()}
          <h3 className="text-xl font-medium text-dark">{title}</h3>
        </div>

        {/* Light Divider */}
        <hr className="border-[#adadad] mb-6" />
        
        {/* Labels */}
        <div className="grid grid-cols-2 gap-8 mb-3">
          <div className="text-center">
            <div className="text-sm text-gray-500">Fibra</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Datos Móvil</div>
          </div>
        </div>

        {/* Large Speed & GB display */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#79C4CD] leading-none">
              {speed}<span className="text-lg ml-1">Mb</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#79C4CD] leading-none">
              {gb}<span className="text-lg ml-1">GB</span>
            </div>
          </div>
        </div>

        {/* Simplified Features */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
          <div className="flex items-center gap-2">
            {title.includes('Single') ? (
              <User size={24} weight="duotone" className="text-[--primary]" />
            ) : title.includes('Tetra') ? (
              <UsersFour size={24} weight="duotone" className="text-[--primary]" />
            ) : (
              <Users size={24} weight="duotone" className="text-[--primary]" />
            )}
            <span className="text-sm text-gray">{title.includes('Single') ? '1 Línea' : title.includes('Tetra') ? '4 Líneas' : '2 Líneas'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={24} weight="duotone" className="text-[--primary]" />
            <span className="text-sm text-gray">Llamadas Ilimitadas</span>
          </div>
        </div>

        {/* Light Divider */}
        <hr className="border-[#adadad] mb-6" />

        {/* Price */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-[#79C4CD]">
            {price}€<span className="text-sm font-normal text-gray ml-1">/mes</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="#contacto"
          className="block text-center bg-gradient-new text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
        >
          ¡Lo quiero!
        </Link>
      </div>
    </motion.div>
  );
} 