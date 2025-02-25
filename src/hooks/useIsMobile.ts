import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mark component as mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run on client after mount
    if (!isMounted) return;
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard tablet breakpoint
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [isMounted]); // Add isMounted as a dependency

  return isMobile;
}; 