'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faXmark, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { 
  House, 
  User, 
  Buildings, 
  List, 
  X 
} from '@phosphor-icons/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-[35px] left-0 w-full h-[80px] z-[1000] bg-white shadow-sm">
      <nav className="max-w-[1400px] mx-auto px-4 h-full flex justify-between items-center">
        <div className="logo w-[200px] pl-0">
          <Link href="/" title="Volver al inicio">
            <Image
              src="/images/logo.png"
              alt="Unimóvil Logo"
              width={200}
              height={53}
              priority
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-dark hover:text-primary transition-colors duration-300"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMenuOpen ? <X size={24} /> : <List size={24} />}
        </button>

        {/* Desktop Navigation */}
        <ul className="nav-links hidden lg:flex items-center justify-center gap-8 text-base flex-1">
          <li>
            <Link
              href="/"
              className="home-link text-dark hover:text-primary transition-colors duration-300"
              title="Inicio"
            >
              <House size={20} weight="duotone" />
            </Link>
          </li>

          <li>
            <Link
              href="/fibra-movil"
              className="text-dark hover:text-primary transition-colors duration-300"
            >
              Fibra y Móvil
            </Link>
          </li>

          <li>
            <Link
              href="/fibra"
              className="text-dark hover:text-primary transition-colors duration-300"
            >
              Fibra
            </Link>
          </li>

          <li>
            <Link
              href="/movil"
              className="text-dark hover:text-primary transition-colors duration-300"
            >
              Móvil
            </Link>
          </li>

          <li>
            <Link
              href="/unitv"
              className="text-dark hover:text-primary transition-colors duration-300"
            >
              UniTV
            </Link>
          </li>

          <li>
            <Link
              href="/energia"
              className="text-dark hover:text-primary transition-colors duration-300"
            >
              Energía
            </Link>
          </li>
        </ul>

        {/* Contact Button - Hidden on Mobile */}
        <div className="hidden lg:flex w-[140px] justify-end pr-0">
          <Link
            href="#contacto"
            className="contact-button bg-gradient-new text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity duration-normal text-base"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div 
          className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] bg-white rounded-lg shadow-xl transform transition-all duration-300 lg:hidden ${
            isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
          }`}
        >
          <ul className="py-6 px-6 space-y-4">
            {/* Main Navigation */}
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <House size={20} weight="duotone" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/fibra-movil"
                className="block text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Fibra y Móvil
              </Link>
            </li>
            <li>
              <Link
                href="/fibra"
                className="block text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Fibra
              </Link>
            </li>
            <li>
              <Link
                href="/movil"
                className="block text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Móvil
              </Link>
            </li>
            <li>
              <Link
                href="/unitv"
                className="block text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                UniTV
              </Link>
            </li>
            <li>
              <Link
                href="/energia"
                className="block text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Energía
              </Link>
            </li>

            {/* Blog and Ayuda Links */}
            <li className="pt-4 border-t">
              <Link
                href="/blog"
                className="block text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/ayuda"
                className="block text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Centro de Ayuda
              </Link>
            </li>
            <li>
              <Link
                href="/tarifas"
                className="block text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarifas
              </Link>
            </li>

            {/* Customer Type Links */}
            <li className="pt-4 border-t">
              <Link
                href="/particular"
                className="flex items-center gap-2 text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} weight="duotone" />
                <span>Soy Particular</span>
              </Link>
            </li>
            <li>
              <Link
                href="/empresa"
                className="flex items-center gap-2 text-dark hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Buildings size={20} weight="duotone" />
                <span>Soy empresa/autónomo</span>
              </Link>
            </li>

            <li className="pt-4 border-t">
              <Link
                href="#contacto"
                className="block text-center bg-gradient-cta text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity duration-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
} 