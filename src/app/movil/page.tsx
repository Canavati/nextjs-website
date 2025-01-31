'use client';

import Benefits from '@/components/sections/Benefits';
import Revolution from '@/components/sections/Revolution';
import OfferingProcess from '@/components/sections/OfferingProcess';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import { MovilHero } from './components/MovilHero';
import { MovilPlans } from './components/MovilPlans';
import { MOVIL_BENEFITS, MOVIL_STEPS, MOVIL_FAQS } from './constants';

export default function MovilPage() {
  return (
    <main>
      <MovilHero />
      <MovilPlans />
      <Benefits benefits={MOVIL_BENEFITS} />
      <OfferingProcess steps={MOVIL_STEPS} />
      <Revolution />
      <FAQ faqs={MOVIL_FAQS} />
      <Contact />
    </main>
  );
} 