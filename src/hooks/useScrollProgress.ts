import { useEffect } from 'react';

export function useScrollProgress() {
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollProgress = document.getElementById('scroll-progress');
      if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    
    // Initial update
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);
} 