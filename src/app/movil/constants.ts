import { Package, FileText, DeviceMobile, Phone, CellSignalFull, Crown, ShieldCheck, Headset, Lightning } from '@phosphor-icons/react';
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
export const MOVIL_BENEFITS: Benefit[] = [
  {
    Icon: CellSignalFull,
    title: 'Máxima Cobertura',
    description: 'Red móvil de última generación',
  },
  {
    Icon: Crown,
    title: 'Sin Límites',
    description: 'Llamadas ilimitadas incluidas',
  },
  {
    Icon: Lightning,
    title: 'Datos 5G',
    description: 'Navega a máxima velocidad',
  },
  {
    Icon: Headset,
    title: 'Soporte 24/7',
    description: 'Atención técnica inmediata',
  },
  {
    Icon: ShieldCheck,
    title: 'Servicio Premium',
    description: 'Calidad y seguridad garantizada',
  },
];

export const MOVIL_STEPS: ProcessStep[] = [
  {
    Icon: Package,
    title: 'Elige tu tarifa',
    description: 'Selecciona tu tarifa móvil pulsando el botón de "Lo quiero".',
  },
  {
    Icon: FileText,
    title: 'Contrato',
    description: 'Una vez elegida tu tarifa, te pediremos los datos personales del titular del contrato y domiciliación.',
  },
  {
    Icon: Phone,
    title: 'Portabilidad',
    description: 'Nos encargamos de gestionar la portabilidad de tu número actual si lo deseas.',
  },
  {
    Icon: DeviceMobile,
    title: 'Activación',
    description: 'Recibirás tu SIM y la activaremos en menos de 24 horas.',
  },
];

export const MOVIL_FAQS: FAQ[] = [
  {
    question: '¿Qué incluyen las llamadas ilimitadas?',
    answer: 'Las llamadas ilimitadas incluyen llamadas nacionales a fijos y móviles, sin límite de minutos. También incluyen el establecimiento de llamada.',
  },
  {
    question: '¿Cómo funciona la portabilidad?',
    answer: 'La portabilidad es gratuita y nosotros nos encargamos de todo el proceso. Se realiza en menos de 24 horas y no te quedarás sin servicio.',
  },
  {
    question: '¿Hay permanencia en los servicios?',
    answer: 'Nuestros planes tienen un compromiso de permanencia. Consulta las condiciones específicas con nuestro equipo comercial.',
  },
  {
    question: '¿Qué cobertura utilizáis?',
    answer: 'Utilizamos la red de mayor cobertura nacional, garantizando la mejor calidad de servicio en todo el territorio.',
  },
]; 