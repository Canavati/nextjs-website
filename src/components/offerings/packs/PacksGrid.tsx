'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lightning, UsersThree, UsersFour, Crown, User, Users, Phone } from '@phosphor-icons/react';
import PackCard from './PackCard';

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
    isPopular: true,
    delay: 0.4
  }
];

export default function PacksGrid() {
  return (
    <div className="flex overflow-x-auto pb-12 pt-8 gap-6 snap-x snap-mandatory hide-scrollbar">
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0 md:w-full px-[10%] md:px-0">
        {packs.map((pack) => (
          <div key={pack.id} className="w-[280px] md:w-auto snap-center">
            <PackCard {...pack} />
          </div>
        ))}
      </div>
    </div>
  );
} 
