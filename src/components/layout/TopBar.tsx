'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Buildings, Phone, Article, Question, CaretDown } from '@phosphor-icons/react';
import { useState, useRef, useEffect } from 'react';

export default function TopBar() {
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowHelpMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      ref={topBarRef}
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full h-top-bar bg-[#292cf6] z-[1001] shadow-sm"
      onMouseLeave={() => setShowHelpMenu(false)}
    >
      <div className="max-w-[1400px] mx-auto px-4 h-full flex justify-end items-center">
        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-white no-underline text-sm font-medium opacity-90 hover:opacity-100 hover:text-[--secondary] hover:-translate-y-[1px] transition-all duration-300"
          >
            <Article size={18} weight="duotone" />
            <span className="hidden lg:inline">Blog</span>
          </Link>
          <div className="relative hidden md:block">
            <Link
              ref={buttonRef}
              href="/ayuda"
              className="flex items-center gap-2 text-white no-underline text-sm font-medium opacity-90 hover:opacity-100 hover:text-[--secondary] hover:-translate-y-[1px] transition-all duration-300"
              onMouseEnter={() => setShowHelpMenu(true)}
            >
              <Question size={18} weight="duotone" />
              <span className="hidden lg:inline">Centro de Ayuda</span>
              <CaretDown 
                size={12} 
                weight="bold" 
                className={`hidden lg:inline transition-transform duration-200 ${showHelpMenu ? 'rotate-180' : ''}`} 
              />
            </Link>
            <div 
              ref={menuRef}
              className={`absolute top-full right-0 mt-1 w-40 bg-white rounded-md shadow-lg transform transition-all duration-200 origin-top ${
                showHelpMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
              onMouseEnter={() => setShowHelpMenu(true)}
              onMouseLeave={() => setShowHelpMenu(false)}
            >
              <Link
                href="/ayuda"
                className="block w-full px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[--primary] transition-colors duration-200"
                onClick={() => setShowHelpMenu(false)}
              >
                Centro de Ayuda
              </Link>
              <Link
                href="/tarifas"
                className="block w-full px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[--primary] transition-colors duration-200"
                onClick={() => setShowHelpMenu(false)}
              >
                Tarifas
              </Link>
            </div>
          </div>
          <a
            href="tel:+34604451989"
            aria-label="Llamar al 604 451 989"
            className="bg-[--quaternary] text-white px-4 py-0.5 rounded-full text-xs font-medium tracking-wide leading-normal transition-all duration-300 shadow-sm hover:-translate-y-[1px] hover:shadow-md hover:bg-[--secondary] hover:text-dark flex items-center gap-1.5"
            title="Llamar al 604 451 989"
          >
            <Phone size={12} weight="duotone" />
            <span>1989</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
} 