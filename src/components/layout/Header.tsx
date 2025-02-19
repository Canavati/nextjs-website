'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { 
  House, 
  User, 
  Buildings, 
  List, 
  X 
} from '@phosphor-icons/react';
import { getBlurDataURL } from '@/utils/images';
import { useHero } from '@/contexts/HeroContext';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Fibra y Móvil', href: '/fibra-movil' },
  { label: 'Fibra', href: '/fibra' },
  { label: 'Móvil', href: '/movil' },
  { label: 'UniTV', href: '/unitv' },
  { label: 'Energía', href: '/energia' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOverHero } = useHero();
  const headerRef = useRef<HTMLElement>(null);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const headerClasses = `
    fixed top-[35px] left-0 w-full h-[80px] z-[1000] 
    transition-all duration-300
    bg-white border-b border-[#292cf6]
    before:absolute before:inset-0 before:-bottom-20 before:bg-gradient-to-b before:from-black/10 before:via-black/5 before:to-transparent before:transition-opacity before:duration-300
    after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/20 after:via-black/5 after:to-transparent after:backdrop-blur-sm after:transition-opacity after:duration-300
    ${isOverHero 
      ? 'bg-opacity-0 border-opacity-0 before:opacity-100 after:opacity-100' 
      : 'bg-opacity-85 border-opacity-15 border-b-[2px] shadow-sm before:opacity-0 after:opacity-0'
    }
  `.trim();

  const logoClasses = `
    object-contain transition-all duration-300
    ${isOverHero ? 'brightness-0 invert' : ''}
  `.trim();

  const linkClasses = `
    transition-all duration-300 font-semibold tracking-wide hover:scale-105
    ${isOverHero 
      ? 'text-white hover:text-[#51fcff] drop-shadow-[0_2px_8px_rgba(81,252,255,0.5)]' 
      : 'text-dark hover:text-primary'
    }
  `.trim();

  return (
    <header 
      ref={headerRef}
      className={headerClasses}
      role="banner"
    >
      {/* Blur overlay - separate element for smooth transitions */}
      <div 
        className={`absolute inset-0 backdrop-blur-[4px] transition-opacity duration-300 ${
          isOverHero ? 'opacity-0' : 'opacity-100'
        }`} 
        aria-hidden="true"
      />

      <nav 
        className={`relative z-10 w-full h-full flex items-center px-[5%] ${
          isOverHero ? 'bg-transparent' : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Left section - Logo */}
        <div className="flex-none">
          <Link 
            href="/" 
            title="Volver al inicio"
            className="focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
          >
            <Image
              src="/images/logo.webp"
              alt="Unimóvil Logo"
              width={200}
              height={53}
              priority
              className={logoClasses}
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={handleMenuToggle}
          className={`lg:hidden ml-auto p-2 rounded-md transition-colors duration-300 ${
            isOverHero ? 'text-white hover:text-[#51fcff]' : 'text-dark hover:text-primary'
          } focus:outline-none focus:ring-2 focus:ring-primary`}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={24} /> : <List size={24} />}
        </button>

        {/* Center section - Navigation */}
        <ul className="hidden lg:flex items-center justify-center gap-8 text-[1.05rem] mx-auto" role="list">
          <li>
            <Link
              href="/"
              className={`home-link transition-all duration-300 hover:scale-110 p-2 rounded-md ${
                isOverHero ? 'text-white hover:text-[#51fcff]' : 'text-dark hover:text-primary'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              title="Inicio"
              aria-label="Ir a la página de inicio"
            >
              <House size={24} weight="duotone" aria-hidden="true" />
            </Link>
          </li>

          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${linkClasses} p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                aria-label={`Ir a ${label}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right section - Contact Button */}
        <div className="hidden lg:flex flex-none">
          <Link
            href="#contacto"
            className={`contact-button bg-gradient-new text-white px-6 py-3 rounded-md font-medium 
              hover:opacity-90 transition-all duration-300 hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-primary
              ${isOverHero ? 'shadow-[0_4px_12px_rgba(81,252,255,0.3)]' : ''}`}
            aria-label="Contactar con nosotros"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleCloseMenu}
          aria-hidden="true"
        />

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[90%] max-w-[400px] bg-white rounded-lg shadow-xl transform 
            transition-all duration-300 lg:hidden ${
            isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu móvil"
        >
          <nav className="py-6 px-6" aria-label="Mobile navigation">
            <ul className="space-y-4" role="list">
              {/* Main Navigation */}
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-dark hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <House size={24} weight="duotone" />
                  <span className="font-semibold">Inicio</span>
                </Link>
              </li>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block text-dark hover:text-primary transition-colors duration-300 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {/* Blog and Ayuda Links */}
              <li className="pt-4 border-t">
                <Link
                  href="/blog"
                  className="block text-dark hover:text-primary transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/ayuda"
                  className="block text-dark hover:text-primary transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/tarifas"
                  className="block text-dark hover:text-primary transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tarifas
                </Link>
              </li>

              {/* Customer Type Links */}
              <li className="pt-4 border-t">
                <Link
                  href="/particular"
                  className="flex items-center gap-2 text-dark hover:text-primary transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} weight="duotone" />
                  <span>Soy Particular</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/empresa"
                  className="flex items-center gap-2 text-dark hover:text-primary transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Buildings size={20} weight="duotone" />
                  <span>Soy empresa/autónomo</span>
                </Link>
              </li>

              <li className="pt-4 border-t">
                <Link
                  href="#contacto"
                  className="block text-center bg-gradient-cta text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
} 