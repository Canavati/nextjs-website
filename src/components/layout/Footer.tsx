'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  FacebookLogo, 
  TwitterLogo, 
  InstagramLogo, 
  LinkedinLogo, 
  Phone, 
  Envelope, 
  MapPin 
} from '@phosphor-icons/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-6 pb-4">
      <div className="max-w-[1200px] mx-auto px-[5%]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Company Info */}
          <div className="space-y-2">
            <div className="mb-2">
              <Image
                src="/images/logo.png"
                alt="Unimóvil Logo"
                width={120}
                height={32}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-xs leading-tight">
              Tu proveedor de confianza para servicios de fibra y móvil. Conectando hogares y empresas con la mejor tecnología.
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-gray-300">
                <Phone size={14} />
                <a href="tel:900123456" className="text-xs hover:text-[--secondary] transition-colors">
                  900 123 456
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <Envelope size={14} />
                <a href="mailto:info@unimovil.com" className="text-xs hover:text-[--secondary] transition-colors">
                  info@unimovil.com
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <MapPin size={14} />
                <span className="text-xs">Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-bold mb-2">Productos</h3>
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/fibra-movil"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Fibra y Móvil
                </Link>
              </li>
              <li>
                <Link 
                  href="/fibra"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Fibra
                </Link>
              </li>
              <li>
                <Link 
                  href="/movil"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Móvil
                </Link>
              </li>
              <li>
                <Link 
                  href="/unitv"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  uniTV
                </Link>
              </li>
              <li>
                <Link 
                  href="/energia"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Energía
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold mb-2">Empresa</h3>
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/sobre-nosotros"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/ayuda"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link 
                  href="/tarifas"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Tarifas
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacto"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link 
                  href="/trabaja-con-nosotros"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Trabaja con Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/aviso-legal"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link 
                  href="/terminos"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacidad"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies"
                  className="text-gray-300 hover:text-[--secondary] transition-colors text-xs"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-3 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            {/* Social Media Icons */}
            <div className="flex gap-2">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-gradient-new flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[#80c4cc]/30 transition-all duration-300"
              >
                <FacebookLogo size={12} weight="fill" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-gradient-new flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[#80c4cc]/30 transition-all duration-300"
              >
                <TwitterLogo size={12} weight="fill" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-gradient-new flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[#80c4cc]/30 transition-all duration-300"
              >
                <InstagramLogo size={12} weight="fill" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-gradient-new flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[#80c4cc]/30 transition-all duration-300"
              >
                <LinkedinLogo size={12} weight="fill" />
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-xs text-center md:text-right">
              © {currentYear} Unimóvil. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 