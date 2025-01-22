'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface PlanCardProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  icons: IconDefinition[];
  link: string;
  isFeatured?: boolean;
  delay?: number;
}

export default function PlanCard({
  title,
  description,
  features,
  price,
  icons,
  link,
  isFeatured = false,
  delay = 0,
}: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`plan relative p-8 rounded-lg shadow-lg bg-white ${
        isFeatured ? 'border-2 border-primary scale-105' : ''
      }`}
    >
      <div className="plan-icon flex gap-2 justify-center mb-4">
        {icons.map((icon, index) => (
          <FontAwesomeIcon
            key={index}
            icon={icon}
            className="text-3xl text-primary"
          />
        ))}
      </div>

      <h3 className="text-2xl font-bold text-dark mb-2">{title}</h3>
      <p className="text-gray mb-6">{description}</p>

      <div className="caracteristicas space-y-3 mb-6">
        {features.map((feature, index) => (
          <p key={index} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/20" />
            <span dangerouslySetInnerHTML={{ __html: feature }} />
          </p>
        ))}
      </div>

      <p className="precio text-lg mb-6">
        Desde <strong className="text-2xl text-primary">{price}</strong>
      </p>

      <div className="plan-buttons flex flex-col gap-3">
        <button className="plan-button w-full py-3 px-6 bg-gradient-primary text-white rounded-md font-semibold hover:bg-gradient-hover transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-[1px]">
          SELECCIONAR
        </button>
        <Link
          href={link}
          className="ver-mas-button text-center text-primary hover:text-secondary transition-colors duration-300"
        >
          VER MÁS →
        </Link>
      </div>

      {isFeatured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          Más Popular
        </div>
      )}
    </motion.div>
  );
} 