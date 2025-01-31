import { Package, FileText, WifiHigh, DeviceMobile, Phone, Signal, Crown, ShieldCheck, Headset, Lightning, Broadcast } from '@phosphor-icons/react';
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
export const FIBRA_MOVIL_BENEFITS: Benefit[] = [
  {
    Icon: WifiHigh,
    title: 'Fibra Ultra Rápida',
    description: 'Velocidad simétrica garantizada',
  },
  {
    Icon: DeviceMobile,
    title: 'Datos Ilimitados',
    description: 'Navega sin preocupaciones',
  },
  {
    Icon: Phone,
    title: 'Llamadas Ilimitadas',
    description: 'Sin límites en tus llamadas',
  },
  {
    Icon: Broadcast,
    title: 'Router WiFi 6',
    description: 'Última tecnología incluida',
  },
  {
    Icon: ShieldCheck,
    title: 'Todo en Uno',
    description: 'Internet y móvil unificados',
  },
];

export const FIBRA_MOVIL_STEPS: ProcessStep[] = [
  {
    Icon: Package,
    title: 'Elige tu pack',
    description: 'Selecciona tu pack de fibra + móvil pulsando el botón de "Lo quiero".',
  },
  {
    Icon: FileText,
    title: 'Contrato',
    description: 'Una vez elegido tu pack, te pediremos la dirección de instalación de la fibra, los datos personales del titular del contrato y domiciliación.',
  },
  {
    Icon: WifiHigh,
    title: 'Instalación',
    description: 'Nos pondremos en contacto contigo en menos de 48 horas para que escojas el día y la hora de instalación.',
  },
  {
    Icon: DeviceMobile,
    title: 'Activación Móvil',
    description: 'Te entregaremos las SIMs y gestionaremos la portabilidad de tus números.',
  },
];

export const FIBRA_MOVIL_FAQS: FAQ[] = [
  {
    question: '¿Qué incluye el pack Fibra + Móvil?',
    answer: 'El pack incluye fibra simétrica de alta velocidad con router WiFi 6, líneas móviles con llamadas ilimitadas y datos 5G, todo en una única factura.',
  },
  {
    question: '¿Cómo funciona la instalación?',
    answer: 'La instalación incluye todo el equipamiento necesario: router WiFi 6, cableado y configuración profesional por nuestros técnicos especializados.',
  },
  {
    question: '¿Hay permanencia en los servicios?',
    answer: 'Nuestros planes tienen un compromiso de permanencia. Consulta las condiciones específicas con nuestro equipo comercial.',
  },
  {
    question: '¿Puedo mantener mi número de teléfono?',
    answer: 'Sí, puedes mantener tu número actual. Nosotros nos encargamos de gestionar la portabilidad tanto del fijo como del móvil sin coste adicional.',
  },
]; 