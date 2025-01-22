'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface BenefitCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
  delay?: number;
}

export default function BenefitCard({
  icon,
  title,
  description,
  delay = 0,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="ventaja p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <FontAwesomeIcon
        icon={icon}
        className="text-4xl text-primary mb-4"
      />
      <h3 className="text-xl font-bold text-dark mb-2">{title}</h3>
      <p className="text-gray">{description}</p>
    </motion.div>
  );
} 