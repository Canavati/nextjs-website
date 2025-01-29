'use client';

import { motion } from 'framer-motion';
import { Icon } from '@phosphor-icons/react';

interface ProcessStepProps {
  Icon: Icon;
  title: string;
  description: string;
  stepNumber: number;
  totalSteps: number;
  delay?: number;
}

export default function ProcessStep({
  Icon,
  title,
  description,
  stepNumber,
  totalSteps,
  delay = 0,
}: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: stepNumber % 2 === 0 ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="paso relative"
    >
      <div className="paso-icon w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-4 mx-auto shadow-lg">
        <Icon size={32} weight="duotone" className="text-white" />
        </div>

      <h3 className="text-xl font-bold text-dark mb-2 text-center">{title}</h3>
      <p className="text-gray text-center max-w-sm mx-auto">{description}</p>

      {stepNumber < totalSteps && (
        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-20" />
      )}
    </motion.div>
  );
} 