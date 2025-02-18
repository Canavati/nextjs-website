'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Article, Question, CaretDown, FolderSimple, Tag } from '@phosphor-icons/react';
import { useState, useRef, useEffect } from 'react';
import { useHero } from '@/contexts/HeroContext';

export default function TopBar() {
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { isOverHero } = useHero();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowHelpMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowHelpMenu(false);
    }, 150);
  };

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={topBarRef}
      className={`fixed top-0 left-0 w-full h-[35px] z-[1001] transition-colors duration-300 ${
        isOverHero ? 'bg-black/80 backdrop-blur-sm' : 'bg-[#292cf6]'
      }`}
    >
      <div className="w-full h-full px-[5%] flex justify-end items-center">
        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-white no-underline text-sm font-medium opacity-90 hover:opacity-100 hover:text-[--secondary] hover:-translate-y-[1px] transition-all duration-300"
          >
            <Article size={18} weight="duotone" />
            <span className="hidden lg:inline">Blog</span>
          </Link>
          <div 
            className="relative hidden md:block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              ref={buttonRef}
              className="flex items-center gap-2 text-white no-underline text-sm font-medium opacity-90 hover:opacity-100 hover:text-[--secondary] hover:-translate-y-[1px] transition-all duration-300"
            >
              <FolderSimple size={18} weight="duotone" />
              <span className="hidden lg:inline">Recursos</span>
              <CaretDown 
                size={12} 
                weight="bold" 
                className={`hidden lg:inline transition-transform duration-200 ${showHelpMenu ? 'rotate-180' : ''}`} 
              />
            </button>
            <div 
              ref={menuRef}
              className={`absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-lg transform transition-all duration-200 origin-top-right ${
                showHelpMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="py-1 px-1">
                <Link
                  href="/ayuda"
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-[--primary] hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setShowHelpMenu(false)}
                >
                  <Question size={16} weight="duotone" />
                  <span>Centro de Ayuda</span>
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-[--primary] hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setShowHelpMenu(false)}
                >
                  <Article size={16} weight="duotone" />
                  <span>Blog</span>
                </Link>
                <Link
                  href="/tarifas"
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-[--primary] hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setShowHelpMenu(false)}
                >
                  <Tag size={16} weight="duotone" />
                  <span>Tarifas</span>
                </Link>
              </div>
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
    </div>
  );
} 