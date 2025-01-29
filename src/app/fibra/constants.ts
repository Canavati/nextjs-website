import { Package, FileText, WifiHigh, DeviceMobile, Gauge, Broadcast, ShieldCheck, Headset, Wrench } from '@phosphor-icons/react';
import { type IconProps } from '@phosphor-icons/react';

// Types
export interface Benefit {
  Icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
}

export interface ProcessStep {
  Icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Constants
export const FIBRA_BENEFITS: Benefit[] = [
  {
    Icon: Gauge,
    title: 'Velocidad Simétrica',
    description: 'Misma velocidad de subida y bajada',
  },
  {
    Icon: Broadcast,
    title: 'Router WiFi 6',
    description: 'Última tecnología incluida',
  },
  {
    Icon: ShieldCheck,
    title: 'Conexión Segura',
    description: 'Protección avanzada incluida',
  },
  {
    Icon: Headset,
    title: 'Soporte 24/7',
    description: 'Atención técnica inmediata',
  },
  {
    Icon: Wrench,
    title: 'Instalación Pro',
    description: 'Servicio profesional incluido',
  },
];

export const FIBRA_STEPS: ProcessStep[] = [
  {
    Icon: Package,
    title: 'Elige tu tarifa',
    description: 'Selecciona tu tarifa de fibra pulsando el botón de "Lo quiero".',
  },
  {
    Icon: FileText,
    title: 'Contrato',
    description: 'Una vez elegida tu tarifa, te pediremos la dirección de instalación de la fibra, los datos personales del titular del contrato y domiciliación.',
  },
  {
    Icon: WifiHigh,
    title: 'Instalación rápida',
    description: 'Nos pondremos en contacto contigo en menos de 48 horas para que escojas el día y la hora de instalación.',
  },
  {
    Icon: DeviceMobile,
    title: 'Router WiFi 6',
    description: 'El técnico te llevará e instalará gratuitamente el router WiFi 6 de última generación.',
  },
];

export const FIBRA_FAQS: FAQ[] = [
  {
    question: '¿Qué significa fibra simétrica?',
    answer: 'La fibra simétrica ofrece la misma velocidad de subida y bajada, lo que garantiza un rendimiento óptimo tanto para descargar como para compartir contenido.',
  },
  {
    question: '¿Qué incluye la instalación?',
    answer: 'La instalación incluye todo el equipamiento necesario: router WiFi 6, cableado y configuración profesional por nuestros técnicos especializados.',
  },
  {
    question: '¿Hay permanencia en los servicios?',
    answer: 'Nuestros planes tienen un compromiso de permanencia. Consulta las condiciones específicas con nuestro equipo comercial.',
  },
  {
    question: '¿Cuánto tarda la instalación?',
    answer: 'La instalación se realiza en un plazo máximo de 7 días laborables, aunque normalmente se completa en 2-3 días.',
  },
]; 
