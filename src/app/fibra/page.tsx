'use client';

import Benefits from '@/components/sections/Benefits';
import Revolution from '@/components/sections/Revolution';
import OfferingProcess from '@/components/sections/OfferingProcess';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import { FibraHero } from './components/FibraHero';
import { FibraPlans } from './components/FibraPlans';
import { FIBRA_BENEFITS, FIBRA_STEPS, FIBRA_FAQS } from './constants';

export default function FibraPage() {
  return (
    <main>
      <FibraHero />
      <FibraPlans />
      <Benefits benefits={FIBRA_BENEFITS} />
      <OfferingProcess steps={FIBRA_STEPS} />
      <Revolution />
      <FAQ faqs={FIBRA_FAQS} />
      <Contact />
    </main>
  );
} 