'use client';

import Hero from '@/components/sections/Hero';
import Plans from '@/components/sections/Plans';
import Benefits from '@/components/sections/Benefits';
import ConnectedLife from '@/components/sections/ConnectedLife';
import Process from '@/components/sections/Process';
import FAQ from '@/components/sections/FAQ';
import Revolution from '@/components/sections/Revolution';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Plans />
      <Benefits />
      <ConnectedLife />
      <Process />
      <Revolution />
      <FAQ />
      <Contact />
    </main>
  );
}
