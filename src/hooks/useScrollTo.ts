import { useCallback, useEffect, useState } from 'react';

export const useScrollTo = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  
  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);
  
  const scrollTo = useCallback((elementId: string) => {
    // Only run on the client side
    if (!isBrowser) return;
    
    const element = document.getElementById(elementId);
    if (!element) return;

    const headerOffset = 115; // TopBar (35px) + Header (80px)
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, [isBrowser]);

  return scrollTo;
}; 