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
      className="faq-item"
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between items-center p-4 text-left bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <span className="text-lg font-semibold text-dark">{question}</span>
              <CaretDown 
                size={20} 
                weight="bold"
                className={`text-[--quaternary] transform transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
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
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray">
                {answer}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </motion.div>
  );
} 