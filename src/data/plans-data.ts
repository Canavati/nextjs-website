// This file contains all plan data used in configurators
// It centralizes information from the different configurators and includes 
// backend CSV information needed for form submissions

// Individual Line Types
export interface LineData {
  id: string;
  name: string;
  gb: string | number;
  price: number;
  ttb?: string; // Tarifario TTB code
  serviceId?: string; // Service identifier
  serviceType?: string; // Service type from "Servicio" column
  contractDescription?: string; // Contract description
}

// Pack Plans Data (PackCard & PacksGrid)
export interface PackPlan {
  id: string;
  title: string;
  description: string;
  price: string | number;
  speed: string | number;
  gb: string | number;
  lines: number;
  isPopular?: boolean;
  delay?: number;
  // Backend data
  ttb: string | string[]; // Single TTB code or array of codes for combined services
  serviceIds: string[]; // Multiple services for packs
  serviceType: string; // Service type from "Servicio" column
  contractDescription: string;
}

// Solo Fibra Plans
export interface SoloFibraPlan {
  id: string;
  title: string;
  speed: string | number;
  price: string | number;
  features: string[];
  isPopular?: boolean;
  // Backend data
  ttb: string;
  serviceId: string;
  serviceType: string; // Service type from "Servicio" column
  contractDescription: string;
}

// Solo Movil Plans
export interface SoloMovilPlan {
  id: string;
  title: string;
  data: string | number;
  basePrice: number;
  calls: string;
  // Backend data
  ttb: string;
  serviceId: string;
  serviceType: string; // Service type from "Servicio" column
  contractDescription: string;
}

// Fibra + Movil Configurator Base Plans
export interface FibraMovilPlan {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  speed: string | number;
  baseLines: number;
  baseData: string | number;
  maxAdditionalLines: number;
  isPopular?: boolean;
  // Backend data
  ttb: string;
  serviceId: string;
  serviceType: string; // Service type from "Servicio" column
  contractDescription: string;
}

// Addon Lines for Fibra+Movil Configurator
export interface AdditionalLineOption {
  id: string;
  name: string;
  gb: string | number;
  price: number;
  // Backend data
  ttb: string;
  serviceId: string;
  serviceType: string; // Service type from "Servicio" column
  contractDescription: string;
}

// Bonos Data
export interface BonoOption {
  id: string;
  type: 'minutes' | 'data';
  value: string;
  price: number;
  // Backend data
  ttb: string;
  serviceId: string;
  serviceType: string; // Service type from "Servicio" column
  contractDescription: string;
}

// ====== DATA IMPLEMENTATION ======

// Pack Plans - Combines Fibra + Multiple Lines
export const PACK_PLANS: PackPlan[] = [
  {
    id: 'single',
    title: 'Pack Single',
    description: 'Fibra 300 Megas + Llamadas Ilimitadas',
    price: 28,
    speed: '300',
    gb: '50', // Updated to 50GB as per CSV
    lines: 1,
    delay: 0.1,
    // Backend data
    ttb: "1873", // TTB from CSV
    serviceIds: ["1873"], // Matching TTB code
    serviceType: "3P Fibra+movil-Pack",
    contractDescription: 'Fibra 300 Megas + Llamadas Ilimitadas, 1 línea móvil de 50GB'
  },
  {
    id: 'duo',
    title: 'Pack Duo',
    description: 'FIBRA 500 Megas + Llamadas Ilimitadas',
    price: 50,
    speed: '500',
    gb: '100',
    lines: 2,
    delay: 0.2,
    // Backend data
    ttb: ["1874", "9050"], // Multiple TTBs for combined services
    serviceIds: ["1874", "9050"], // Both service IDs
    serviceType: "3P Fibra+movil-Pack",
    contractDescription: 'Fibra 500 Megas + Llamadas Ilimitadas, 2 lineas moviles con 100GB compartidos'
  },
  {
    id: 'tetra',
    title: 'Pack Tetra',
    description: 'Fibra 500 Megas + Llamadas Ilimitadas',
    price: 60,
    speed: '500',
    gb: '175',
    lines: 4,
    delay: 0.3,
    // Backend data
    ttb: ["1878", "9031", "9031", "9031"], // Base fiber plan plus 3 identical mobile lines
    serviceIds: ["1878", "9031", "9031", "9031"], // Matching TTB codes
    serviceType: "3P Fibra+movil-Pack",
    contractDescription: 'Fibra 500 Megas + Llamadas Ilimitadas, 4 líneas moviles con 175GB compartidos'
  },
  {
    id: 'pro',
    title: 'Pack Pro',
    description: 'Fibra 1000 Megas + Llamadas Ilimitadas',
    price: 67,
    speed: '1000',
    gb: '175',
    lines: 2,
    isPopular: true,
    delay: 0.4,
    // Backend data
    ttb: ["1883", "9051"], // TTBs from CSV
    serviceIds: ["1883", "9051"], // Matching TTB codes
    serviceType: "3P Fibra+movil-Pack",
    contractDescription: 'Fibra 1000 Megas + Llamadas Ilimitadas, 2 líneas moviles con 175GB compartidos'
  }
];

// Solo Fibra Plans
export const SOLO_FIBRA_PLANS: SoloFibraPlan[] = [
  {
    id: 'fibra500',
    title: 'Fibra 500',
    speed: 500,
    price: 30, // Updated to 30.00 as per CSV (2P Fibra+Fijo price)
    features: ['Router WiFi 6'],
    // Backend data
    ttb: "1012",
    serviceId: "1012",
    serviceType: "2P Fibra+Fijo",
    contractDescription: '500 Megas + Telefono fijo'
  },
  {
    id: 'fibra1000',
    title: 'Fibra 1000',
    speed: 1000,
    price: 40, // Updated to 40.00 as per CSV (2P Fibra+Fijo price)
    features: ['Router WiFi 6'],
    isPopular: true,
    // Backend data
    ttb: "962",
    serviceId: "962",
    serviceType: "2P Fibra+Fijo",
    contractDescription: '1000 Megas + Telefono fijo'
  }
];

// Solo Movil Plans
export const SOLO_MOVIL_PLANS: SoloMovilPlan[] = [
  {
    id: 'movil-basico',
    title: 'Básico',
    data: '10',
    basePrice: 4.90, // Matches CSV
    calls: '1000 min + 150 otros operadores',
    // Backend data
    ttb: "439",
    serviceId: "439",
    serviceType: "Solo Movil",
    contractDescription: '10GB + 1000 min + 150 con otros operadores'
  },
  {
    id: 'movil-estandar',
    title: 'Estándar',
    data: '25',
    basePrice: 7, // Matches CSV
    calls: 'Llamadas ilimitadas',
    // Backend data
    ttb: "1014",
    serviceId: "1014",
    serviceType: "Solo Movil",
    contractDescription: '25GB + Llamadas Ilimitadas'
  },
  {
    id: 'movil-pro',
    title: 'Pro',
    data: '40',
    basePrice: 9, // Matches CSV
    calls: 'Llamadas ilimitadas',
    // Backend data
    ttb: "628",
    serviceId: "628",
    serviceType: "Solo Movil",
    contractDescription: '40GB + Llamadas Ilimitadas'
  },
  {
    id: 'movil-premium',
    title: 'Premium',
    data: '75',
    basePrice: 10, // Matches CSV
    calls: 'Llamadas ilimitadas',
    // Backend data
    ttb: "637",
    serviceId: "637",
    serviceType: "Solo Movil",
    contractDescription: '75GB + Llamadas Ilimitadas'
  },
  {
    id: 'movil-premium-plus',
    title: 'Premium+',
    data: '200',
    basePrice: 20, // Matches CSV
    calls: 'Llamadas ilimitadas',
    // Backend data
    ttb: "527",
    serviceId: "527",
    serviceType: "Solo Movil",
    contractDescription: '200GB + Llamadas Ilimitadas'
  }
];

// Fibra + Movil Configurator Plans
export const FIBRA_MOVIL_PLANS: FibraMovilPlan[] = [
  {
    id: 'fm-basico',
    title: 'Básico',
    description: 'Internet de alta velocidad con datos móviles esenciales',
    basePrice: 28, // Matches CSV for 3P Fibra+movil 300Mb
    speed: 300,
    baseLines: 1,
    baseData: 45, // Updated to 45 as per CSV
    maxAdditionalLines: 4,
    // Backend data
    ttb: "1873",
    serviceId: "1873", 
    serviceType: "3P Fibra+movil",
    contractDescription: 'Fibra 300 Megas + Ilimitadas + 45GB'
  },
  {
    id: 'fm-estandar',
    title: 'Estándar',
    description: 'Equilibrio perfecto entre velocidad y datos',
    basePrice: 40, // Updated to match CSV
    speed: 500,
    baseLines: 1,
    baseData: 60, // Updated to match CSV
    maxAdditionalLines: 4,
    // Backend data
    ttb: "1874",
    serviceId: "1874",
    serviceType: "3P Fibra+movil",
    contractDescription: 'Fibra 500 Megas + Ilimitadas + 60GB'
  },
  {
    id: 'fm-pro',
    title: 'Pro',
    description: 'Mayor velocidad y más datos para usuarios exigentes',
    basePrice: 45, // Matches CSV
    speed: 500,
    baseLines: 1,
    baseData: 115, // As per CSV
    maxAdditionalLines: 4,
    // Backend data
    ttb: "1878",
    serviceId: "1878",
    serviceType: "3P Fibra+movil",
    contractDescription: 'Fibra 500 Megas + Ilimitadas + 115GB'
  },
  {
    id: 'fm-premium',
    title: 'Premium',
    description: 'Máxima potencia para usuarios exigentes',
    basePrice: 55, // Updated to match CSV
    speed: 1000,
    baseLines: 1,
    baseData: 115, // Updated to match CSV
    maxAdditionalLines: 4,
    isPopular: true,
    // Backend data
    ttb: "1883",
    serviceId: "1883",
    serviceType: "3P Fibra+movil",
    contractDescription: 'Fibra 1000 Megas + Ilimitadas + 115GB'
  }
];

// Additional Lines for Fibra + Movil
export const ADDITIONAL_LINES: AdditionalLineOption[] = [
  {
    id: 'line20GB',
    name: 'Línea 20GB',
    gb: 20,
    price: 5, // Matches CSV
    // Backend data
    ttb: "9031",
    serviceId: "9031",
    serviceType: "Movil Adicional C",
    contractDescription: '20GB + Llamadas Ilimitadas'
  },
  {
    id: 'line40GB',
    name: 'Línea 40GB',
    gb: 40,
    price: 10, // Updated to 10.00 as per CSV
    // Backend data
    ttb: "9050",
    serviceId: "9050",
    serviceType: "Movil Adicional C",
    contractDescription: '40GB + Llamadas Ilimitadas'
  },
  {
    id: 'line60GB',
    name: 'Línea 60GB',
    gb: 60,
    price: 12, // Matches CSV
    // Backend data
    ttb: "9051",
    serviceId: "9051",
    serviceType: "Movil Adicional C",
    contractDescription: '60GB + Llamadas Ilimitadas'
  }
];

// International Bonos
export const INTERNATIONAL_BONOS: BonoOption[] = [
  { 
    id: '100min', 
    type: 'minutes',
    value: '100', 
    price: 3, // Matches CSV
    // Backend data
    ttb: "896",
    serviceId: "896",
    serviceType: "BONO INT",
    contractDescription: 'Bono Internacional 100 min'
  },
  { 
    id: '300min', 
    type: 'minutes',
    value: '300', 
    price: 9, // Matches CSV
    // Backend data
    ttb: "897",
    serviceId: "897",
    serviceType: "BONO INT",
    contractDescription: 'Bono Internacional 300 min'
  },
  { 
    id: '600min', 
    type: 'minutes',
    value: '600', 
    price: 12, // Matches CSV
    // Backend data
    ttb: "898",
    serviceId: "898",
    serviceType: "BONO INT",
    contractDescription: 'Bono Internacional 600 min'
  },
];

// Data Bonos
export const DATA_BONOS: BonoOption[] = [
  { 
    id: '500mb', 
    type: 'data',
    value: '500 MB', 
    price: 2, // Matches CSV
    // Backend data
    ttb: "891",
    serviceId: "891",
    serviceType: "BONO GB",
    contractDescription: 'Bono Ampliación 500MB'
  },
  { 
    id: '1gb', 
    type: 'data',
    value: '1 GB', 
    price: 3, // Matches CSV
    // Backend data
    ttb: "892",
    serviceId: "892",
    serviceType: "BONO GB",
    contractDescription: 'Bono Ampliación 1GB'
  },
  { 
    id: '3gb', 
    type: 'data',
    value: '3 GB', 
    price: 5, // Matches CSV
    // Backend data
    ttb: "893",
    serviceId: "893",
    serviceType: "BONO GB",
    contractDescription: 'Bono Ampliación 3GB'
  },
  { 
    id: '5gb', 
    type: 'data',
    value: '5 GB', 
    price: 6, // Matches CSV
    // Backend data
    ttb: "894",
    serviceId: "894",
    serviceType: "BONO GB",
    contractDescription: 'Bono Ampliación 5GB'
  },
  { 
    id: '10gb', 
    type: 'data',
    value: '10 GB', 
    price: 9, // Matches CSV
    // Backend data
    ttb: "895",
    serviceId: "895",
    serviceType: "BONO GB",
    contractDescription: 'Bono Ampliación 10GB'
  },
]; 