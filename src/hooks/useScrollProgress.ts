import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Mark as mounted on client side
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  useEffect(() => {
    // Only run on client side after component is mounted
    if (!isMounted) return;
    
    const updateScrollProgress = () => {
      const scrollProgress = document.getElementById('scroll-progress');
      if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
      }
    };

    // Initial update
    updateScrollProgress();
    
    // Add event listener
    window.addEventListener('scroll', updateScrollProgress);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [isMounted]); // Add isMounted as a dependency
} 