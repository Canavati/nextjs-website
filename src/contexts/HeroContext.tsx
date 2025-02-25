'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface HeroContextType {
  isOverHero: boolean;
}

const HeroContext = createContext<HeroContextType>({ isOverHero: true });

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [isOverHero, setIsOverHero] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

  // First useEffect just to mark component as mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run on client side after component is mounted
    if (!isMounted) return;
    
    // Reset state on route change
    setIsOverHero(true);

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Setup new observer
    const setupObserver = () => {
      const heroSection = document.querySelector('#hero');
      if (!heroSection) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsOverHero(entry.isIntersecting);
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '-35px 0px 0px 0px'
        }
      );

      observerRef.current.observe(heroSection);
    };

    // Wait for DOM to be ready with requestAnimationFrame which is more reliable
    // than setTimeout for ensuring DOM is ready
    requestAnimationFrame(() => {
      setupObserver();
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname, isMounted]); // Re-run when pathname changes or when mounted on client

  return (
    <HeroContext.Provider value={{ isOverHero }}>
      {children}
    </HeroContext.Provider>
  );
}

export const useHero = () => useContext(HeroContext); 