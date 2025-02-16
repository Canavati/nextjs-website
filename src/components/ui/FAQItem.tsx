'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { CaretDown } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  delay?: number;
}

export default function FAQItem({ question, answer, delay = 0 }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group faq-item"
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="relative flex w-full justify-between items-center p-6 text-left rounded-2xl transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
              {/* Background and effects */}
              <div className="absolute inset-0 bg-[#1e3a5f]/40 backdrop-blur-sm border border-[#38bdf8]/20 transition-all duration-300 group-hover:border-[#0ea5e9]/40 group-hover:shadow-[0_0_30px_-10px_#0ea5e9]"></div>
              
              {/* Hover effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/5 to-[#38bdf8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#38bdf815_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <span className="relative text-lg font-semibold text-white/90 group-hover:text-[#38bdf8] transition-colors duration-300">
                {question}
              </span>
              <CaretDown 
                size={24} 
                weight="bold"
                className={`relative text-[#38bdf8] transform transition-all duration-300 ${
                  open ? 'rotate-180' : ''
                } group-hover:scale-110`}
              />
            </Disclosure.Button>
            
            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="relative px-6 pt-4 pb-6 text-white/70 bg-[#1e3a5f]/30 backdrop-blur-sm rounded-2xl mt-2 border border-[#38bdf8]/10">
                {answer}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </motion.div>
  );
} 