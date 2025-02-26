'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lightning, UsersThree, UsersFour, Crown, User, Users, Phone } from '@phosphor-icons/react';
import { useConfigurator } from '@/context/ConfiguratorProvider';
import { PACK_PLANS } from '@/data/plans-data';

interface PackCardProps {
  title: string;
  description: string;
  features?: string[];
  price: string;
  isPopular?: boolean;
  delay: number;
  gb: string;
  speed: string;
  id: string;
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
  speed,
  id
}: PackCardProps) {
  const { setPackSelection, openForm } = useConfigurator();
  
  const handlePackSelection = () => {
    const packData = PACK_PLANS.find(p => p.id === id);
    if (packData) {
      setPackSelection(packData);
      openForm();
    }
  };

  const getPackIcon = () => {
    if (title.includes('Single')) return <Lightning size={32} weight="duotone" className="text-[#ed54ba]" />;
    if (title.includes('Duo')) return <Users size={32} weight="duotone" className="text-[#ed54ba]" />;
    if (title.includes('Tetra')) return <UsersFour size={32} weight="duotone" className="text-[#ed54ba]" />;
    if (title.includes('Pro')) return <Crown size={32} weight="duotone" className="text-[#ed54ba]" />;
    return null;
  };

  return (
    <motion.div
      {...motionConfig}
      transition={{ duration: 0.5, delay }}
      className="relative card-interactive gradient-glow rounded-3xl p-6"
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
      
      <div className="space-y-6">
        {/* Title and Icon at top */}
        <div className="flex items-center justify-center gap-3">
          {getPackIcon()}
          <h3 className="text-2xl font-medium text-dark">{title}</h3>
        </div>

        {/* Light Divider */}
        <hr className="border-[#adadad]" />
        
        {/* Labels */}
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-xl font-medium text-[#444444] mb-2">Fibra</div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-medium text-[#79C4CD]">{speed}</span>
              <span className="text-lg text-[#666666]">Mb</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-medium text-[#444444] mb-2">Datos Móvil</div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-medium text-[#79C4CD]">{gb}</span>
              <span className="text-lg text-[#666666]">GB</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col items-start mx-auto w-fit space-y-4">
          <div className="flex items-center gap-4">
            {title.includes('Single') ? (
              <User size={28} weight="duotone" className="text-[#ed54ba]" />
            ) : title.includes('Tetra') ? (
              <UsersFour size={28} weight="duotone" className="text-[#ed54ba]" />
            ) : (
              <Users size={28} weight="duotone" className="text-[#ed54ba]" />
            )}
            <span className="text-lg text-[#444444]">{title.includes('Single') ? '1 Línea' : title.includes('Tetra') ? '4 Líneas' : '2 Líneas'}</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone size={28} weight="duotone" className="text-[#ed54ba]" />
            <span className="text-lg text-[#444444]">Llamadas Ilimitadas</span>
          </div>
        </div>

        {/* Light Divider */}
        <hr className="border-[#adadad]" />

        {/* Price */}
        <div className="text-center">
          <div className="flex items-baseline justify-center">
            <div className="text-5xl font-bold text-shimmer-glow-sync">
              {price}€
            </div>
            <span className="text-2xl font-normal text-[#666666] ml-1">/mes</span>
          </div>
          <p className="text-sm text-[#666666] mt-1">IVA incluido</p>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePackSelection}
          className="w-full text-center bg-gradient-new text-white py-3 px-8 rounded-2xl font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
        >
          ¡Lo quiero!
        </button>
      </div>
    </motion.div>
  );
} 