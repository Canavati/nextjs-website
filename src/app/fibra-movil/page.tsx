'use client';

import Benefits from '@/components/sections/Benefits';
import Revolution from '@/components/sections/Revolution';
import OfferingProcess from '@/components/sections/OfferingProcess';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import { FibraMovilHero } from './components/FibraMovilHero';
import { FibraMovilPlans } from './components/FibraMovilPlans';
import { FIBRA_MOVIL_BENEFITS, FIBRA_MOVIL_STEPS, FIBRA_MOVIL_FAQS } from './constants';

export default function FibraMovilPage() {
  return (
    <main>
      <FibraMovilHero />
      <FibraMovilPlans />
      <Benefits benefits={FIBRA_MOVIL_BENEFITS} />
      <OfferingProcess steps={FIBRA_MOVIL_STEPS} />
      <Revolution />
      <FAQ faqs={FIBRA_MOVIL_FAQS} />
      <Contact />
    </main>
  );
} 