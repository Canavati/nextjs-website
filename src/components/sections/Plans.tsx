'use client';

import { motion } from 'framer-motion';
import { 
  RocketLaunch, 
  Lightning, 
  Crown, 
  UsersFour, 
  Users, 
  Phone, 
  WifiHigh, 
  DeviceMobile,
  User,
  UsersThree,
  Plus,
  Minus
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';

const motionConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

interface PackCardProps {
  title: string;
  description: string;
  features?: string[];
  price: string;
  isPopular?: boolean;
  delay: number;
  gb: string;
  speed: string;
}

interface FibraMovilCardProps {
  title: string;
  speed: string;
  price: string;
  features: string[];
  delay: number;
}

interface ConfigurablePlanCardProps {
  title: string;
  speed: string;
  basePrice: string;
  mainLineGB: string;
  features: string[];
  delay: number;
}

interface FibraMovilConfig {
  selectedPlan: number;
  additionalLines: {
    line20GB: number;
    line40GB: number;
    line60GB: number;
  };
}

const FIBRA_MOVIL_PLANS = [
  { 
    title: 'Básico',
    speed: '300',
    data: '45',
    basePrice: 33.00,
    features: ['Llamadas ilimitadas', 'Router WiFi 6']
  },
  { 
    title: 'Estándar',
    speed: '500',
    data: '60',
    basePrice: 40.00,
    features: ['Llamadas ilimitadas', 'Router WiFi 6']
  },
  { 
    title: 'Pro',
    speed: '500',
    data: '115',
    basePrice: 45.00,
    features: ['Llamadas ilimitadas', 'Router WiFi 6']
  },
  { 
    title: 'Premium',
    speed: '1000',
    data: '115',
    basePrice: 55.00,
    features: ['Llamadas ilimitadas', 'Router WiFi 6']
  }
];

const FibraMovilConfigurator = () => {
  const [config, setConfig] = useState<FibraMovilConfig>({
    selectedPlan: 0,
    additionalLines: {
      line20GB: 0,
      line40GB: 0,
      line60GB: 0
    }
  });

  const totalAdditionalLines = Object.values(config.additionalLines).reduce((a, b) => a + b, 0);
  const canAddMore = totalAdditionalLines < 4;

  const handleLineChange = (lineType: keyof typeof config.additionalLines, increment: boolean) => {
    if (increment && !canAddMore) return;
    if (!increment && config.additionalLines[lineType] === 0) return;

    setConfig(prev => ({
      ...prev,
      additionalLines: {
        ...prev.additionalLines,
        [lineType]: increment ? prev.additionalLines[lineType] + 1 : prev.additionalLines[lineType] - 1
      }
    }));
  };

  const calculateTotalPrice = () => {
    const basePlan = FIBRA_MOVIL_PLANS[config.selectedPlan];
    const additionalCost = 
      config.additionalLines.line20GB * 5 +
      config.additionalLines.line40GB * 10 +
      config.additionalLines.line60GB * 12;
    
    return basePlan.basePrice + additionalCost;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 md:space-y-6"
    >
      {/* Plan Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {FIBRA_MOVIL_PLANS.map((plan, index) => (
          <motion.button
            key={index}
            onClick={() => setConfig(prev => ({ ...prev, selectedPlan: index }))}
            className="group relative p-4 md:p-5 rounded-xl text-left transition-all duration-300 bg-gradient-to-br from-[#ed54ba] via-[#51fcff] to-[#ed54ba]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            {/* White Background */}
            <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-[#f8f9ff] via-white to-[#f8f9ff]" />
            
            {/* Selection/Hover Gradient */}
            <div className={`absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-[#ed54ba]/20 via-[#51fcff]/20 to-[#51fcff]/20 opacity-0 transition-opacity duration-300 ${
              config.selectedPlan === index ? 'opacity-100' : 'group-hover:opacity-100'
            }`} />
            
            {/* Content */}
            <div className="relative">
              <h3 className="text-lg font-semibold mb-4 text-[#ed54ba]">
                {plan.title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray mb-1">Fibra</div>
                  <div className="flex items-center gap-2">
                    <WifiHigh size={20} weight="duotone" className="text-[#ed54ba]" />
                    <span className="text-2xl font-medium text-[#79C4CD]">{plan.speed}</span>
                    <span className="text-sm text-gray">Mb</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray mb-1">Datos Móvil</div>
                  <div className="flex items-center gap-2">
                    <DeviceMobile size={20} weight="duotone" className="text-[#ed54ba]" />
                    <span className="text-2xl font-medium text-[#79C4CD]">{plan.data}</span>
                    <span className="text-sm text-gray">GB</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray">
                      <div className="w-1 h-1 rounded-full bg-[#ed54ba]" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="text-3xl font-bold text-[#79C4CD]">
                    {plan.basePrice.toFixed(2)}€
                    <span className="text-sm font-normal text-gray ml-1">/mes</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Additional Lines Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        <motion.div
          className="lg:col-span-2 relative rounded-xl p-4 md:p-5 shadow-sm bg-gradient-to-br from-[#ed54ba] via-[#51fcff] to-[#ed54ba]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {/* White Background */}
          <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-[#f8f9ff] via-white to-[#f8f9ff]" />

          {/* Content */}
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-medium text-dark">Líneas Adicionales</h3>
              <div className="text-sm text-gray">
                {totalAdditionalLines}/4 líneas
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ed54ba] to-[#51fcff]"
                initial={{ width: 0 }}
                animate={{ width: `${(totalAdditionalLines / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="space-y-2">
              {[
                { type: 'line20GB', gb: '20', price: '5,00' },
                { type: 'line40GB', gb: '40', price: '10,00' },
                { type: 'line60GB', gb: '60', price: '12,00' }
              ].map((line) => (
                <motion.div 
                  key={line.type}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50/80 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-2">
                    <DeviceMobile size={18} weight="duotone" className="text-[#ed54ba]" />
                    <div>
                      <span className="text-sm font-medium">{line.gb}GB</span>
                      <span className="text-xs text-gray ml-2">{line.price}€/mes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <motion.button
                      onClick={() => handleLineChange(line.type as keyof typeof config.additionalLines, false)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        config.additionalLines[line.type as keyof typeof config.additionalLines] === 0
                          ? 'bg-gray-100/80 text-gray-400'
                          : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-600'
                      }`}
                      disabled={config.additionalLines[line.type as keyof typeof config.additionalLines] === 0}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Minus size={14} weight="bold" />
                    </motion.button>
                    <span className="w-5 text-center text-sm font-medium">
                      {config.additionalLines[line.type as keyof typeof config.additionalLines]}
                    </span>
                    <motion.button
                      onClick={() => handleLineChange(line.type as keyof typeof config.additionalLines, true)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        !canAddMore
                          ? 'bg-gray-100/80 text-gray-400'
                          : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-600'
                      }`}
                      disabled={!canAddMore}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus size={14} weight="bold" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Total Price Card */}
        <motion.div
          className="relative rounded-xl p-4 md:p-5 shadow-sm bg-gradient-to-br from-[#ed54ba] via-[#51fcff] to-[#ed54ba]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {/* White Background */}
          <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-[#f8f9ff] via-white to-[#f8f9ff]" />

          {/* Content */}
          <div className="relative flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-dark">Total Mensual:</span>
                <div className="text-2xl font-bold text-[#79C4CD]">
                  {calculateTotalPrice().toFixed(2)}€
                  <span className="text-xs font-normal text-gray ml-1">/mes</span>
                </div>
              </div>
              <p className="text-xs text-gray text-right">IVA incluido</p>
            </div>

            <motion.div
              className="mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#contacto"
                className="block text-center bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-white py-2.5 px-5 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg"
              >
                ¡Lo quiero!
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Plans() {
  const [selectedOffering, setSelectedOffering] = useState('packs');

  const PackCard = ({ 
    title, 
    description, 
    features, 
    price, 
    isPopular,
    delay,
    gb,
    speed
  }: PackCardProps) => {
    const getPackIcon = () => {
      if (title.includes('Single')) return <Lightning size={32} weight="duotone" className="text-[--primary]" />;
      if (title.includes('Duo')) return <UsersThree size={32} weight="duotone" className="text-[--primary]" />;
      if (title.includes('Tetra')) return <UsersFour size={32} weight="duotone" className="text-[--primary]" />;
      if (title.includes('Pro')) return <Crown size={32} weight="duotone" className="text-[--primary]" />;
      return null;
    };

    return (
      <motion.div
        {...motionConfig}
        transition={{ duration: 0.5, delay }}
        className="relative card-interactive gradient-glow rounded-lg pt-6"
        style={{
          border: '2px solid transparent',
          background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
        }}
      >
        {isPopular && (
          <div className="absolute -top-4 right-4 bg-gradient-new text-white px-4 py-1 rounded-full text-sm font-medium hover-scale">
            Más Potente
          </div>
        )}
        
        <div className="p-8">
          {/* Title and Icon at top */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {getPackIcon()}
            <h3 className="text-xl font-medium text-dark">{title}</h3>
          </div>

          {/* Light Divider */}
          <hr className="border-[#adadad] mb-6" />
          
          {/* Labels */}
          <div className="grid grid-cols-2 gap-8 mb-3">
            <div className="text-center">
              <div className="text-sm text-gray-500">Fibra</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Datos Móvil</div>
            </div>
          </div>

          {/* Large Speed & GB display */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#79C4CD] leading-none">
                {speed}<span className="text-lg ml-1">Mb</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#79C4CD] leading-none">
                {gb}<span className="text-lg ml-1">GB</span>
              </div>
            </div>
          </div>

          {/* Simplified Features */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <div className="flex items-center gap-2">
              {title.includes('Single') ? (
                <User size={24} weight="duotone" className="text-[#79C4CD]" />
              ) : title.includes('Tetra') ? (
                <UsersFour size={24} weight="duotone" className="text-[#79C4CD]" />
              ) : (
                <Users size={24} weight="duotone" className="text-[#79C4CD]" />
              )}
              <span className="text-sm text-gray">{title.includes('Single') ? '1 Línea' : title.includes('Tetra') ? '4 Líneas' : '2 Líneas'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={40} weight="duotone" className="text-[#79C4CD]" />
              <span className="text-sm text-gray">Llamadas Ilimitadas</span>
            </div>
          </div>

          {/* Light Divider */}
          <hr className="border-[#adadad] mb-6" />

          {/* Price */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-[#79C4CD]">
              {price}€<span className="text-sm font-normal text-gray ml-1">/mes</span>
            </div>
          </div>

          {/* Action Button */}
          <Link
            href="#contacto"
            className="block text-center bg-gradient-new text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
          >
            ¡Lo quiero!
          </Link>
        </div>
      </motion.div>
    );
  };

  const FibraMovilCard = ({ 
    title, 
    speed,
    price, 
    features,
    delay
  }: FibraMovilCardProps) => {
    return (
      <motion.div
        {...motionConfig}
        transition={{ duration: 0.5, delay }}
        className="relative card-interactive gradient-glow rounded-lg pt-6"
        style={{
          border: '2px solid transparent',
          background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
        }}
      >
        <div className="p-8">
          <div className="flex gap-4 mb-6">
            <WifiHigh size={24} weight="duotone" className="icon-gradient" />
            <DeviceMobile size={24} weight="duotone" className="icon-gradient" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <div className="text-4xl font-bold text-primary mb-4">
            {speed}<span className="text-base font-normal text-gray">Mb</span>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-transparent">
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Incluido en el plan:</h4>
            <ul className="space-y-3">
              {features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Opciones configurables:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">+</span>
                <span>Líneas móviles adicionales (hasta 4 líneas extra)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">+</span>
                <span>Bonos de datos extra disponibles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">+</span>
                <span>Bonos de llamadas internacionales</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-transparent">
          <span className="text-sm">Desde</span>
          <div className="text-3xl font-bold">
            {price}€<span className="text-sm font-normal">/mes</span>
          </div>
          <p className="text-sm text-gray mt-1">Precio final según configuración</p>
        </div>

        <div className="p-8 pt-0">
          <div className="space-y-4">
            <Link
              href="#contacto"
              className="block text-center bg-gradient-cta text-white py-3 px-6 rounded-md font-medium button-bounce button-glow"
            >
              CONFIGURAR
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  const ConfigurablePlanCard = ({ 
    title, 
    speed,
    basePrice, 
    mainLineGB,
    features,
    delay
  }: ConfigurablePlanCardProps) => {
    const [additionalLines, setAdditionalLines] = useState({
      line20GB: 0,
      line40GB: 0,
      line60GB: 0
    });

    const LINE_PRICES = {
      line20GB: 5.00,
      line40GB: 10.00,
      line60GB: 12.00
    };

    const totalAdditionalLines = Object.values(additionalLines).reduce((a, b) => a + b, 0);
    const canAddMore = totalAdditionalLines < 4;

    const calculateTotalPrice = () => {
      const baseAmount = parseFloat(basePrice.replace(',', '.'));
      const additionalCost = 
        additionalLines.line20GB * LINE_PRICES.line20GB +
        additionalLines.line40GB * LINE_PRICES.line40GB +
        additionalLines.line60GB * LINE_PRICES.line60GB;
      
      return (baseAmount + additionalCost).toFixed(2).replace('.', ',');
    };

    const handleLineChange = (lineType: keyof typeof additionalLines, increment: boolean) => {
      if (increment && !canAddMore) return;
      if (!increment && additionalLines[lineType] === 0) return;

      setAdditionalLines(prev => ({
        ...prev,
        [lineType]: increment ? prev[lineType] + 1 : prev[lineType] - 1
      }));
    };

    return (
      <motion.div
        {...motionConfig}
        transition={{ duration: 0.5, delay }}
        className="relative card-interactive gradient-glow rounded-lg pt-6"
        style={{
          border: '2px solid transparent',
          background: 'linear-gradient(rgb(248 250 252), rgb(248 250 252)) padding-box, var(--gradient-primary) border-box'
        }}
      >
        <div className="p-8">
          {/* Title and Icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <WifiHigh size={24} weight="duotone" className="text-[--primary]" />
            <DeviceMobile size={24} weight="duotone" className="text-[--primary]" />
            <h3 className="text-xl font-medium text-dark">{title}</h3>
          </div>

          {/* Light Divider */}
          <hr className="border-[#adadad] mb-6" />
          
          {/* Main Features */}
          <div className="space-y-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#79C4CD] leading-none">
                {speed}<span className="text-lg ml-1">Mb</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Fibra Simétrica</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-[#79C4CD] leading-none">
                {mainLineGB}<span className="text-base ml-1">GB</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Línea Principal</div>
            </div>
          </div>

          {/* Additional Lines Configuration */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-dark">Líneas Adicionales</h4>
            
            {/* 20GB Line */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray">20GB - 5,00€/mes</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLineChange('line20GB', false)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  disabled={additionalLines.line20GB === 0}
                >
                  -
                </button>
                <span className="w-4 text-center">{additionalLines.line20GB}</span>
                <button
                  onClick={() => handleLineChange('line20GB', true)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  disabled={!canAddMore}
                >
                  +
                </button>
              </div>
            </div>

            {/* 40GB Line */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray">40GB - 10,00€/mes</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLineChange('line40GB', false)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  disabled={additionalLines.line40GB === 0}
                >
                  -
                </button>
                <span className="w-4 text-center">{additionalLines.line40GB}</span>
                <button
                  onClick={() => handleLineChange('line40GB', true)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  disabled={!canAddMore}
                >
                  +
                </button>
              </div>
            </div>

            {/* 60GB Line */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray">60GB - 12,00€/mes</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLineChange('line60GB', false)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  disabled={additionalLines.line60GB === 0}
                >
                  -
                </button>
                <span className="w-4 text-center">{additionalLines.line60GB}</span>
                <button
                  onClick={() => handleLineChange('line60GB', true)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  disabled={!canAddMore}
                >
                  +
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Máximo 4 líneas adicionales en total
            </p>
          </div>

          {/* Light Divider */}
          <hr className="border-[#adadad] mb-6" />

          {/* Price */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-[#79C4CD]">
              {calculateTotalPrice()}€<span className="text-sm font-normal text-gray ml-1">/mes</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              IVA incluido
            </div>
          </div>

          {/* Action Button */}
          <Link
            href="#contacto"
            className="block text-center bg-gradient-new text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
          >
            ¡Lo quiero!
          </Link>
        </div>
      </motion.div>
    );
  };

  const fibraMovilPlans = [
    {
      title: 'Básico',
      speed: '300',
      price: '29,90',
      mainLineGB: '25',
      features: [
        'Fibra simétrica garantizada',
        'Router WiFi 6 incluido',
        '1 línea móvil con llamadas ilimitadas',
        '25GB de datos móviles incluidos'
      ],
      delay: 0.1
    },
    {
      title: 'Avanzado',
      speed: '500',
      price: '34,90',
      mainLineGB: '50',
      features: [
        'Fibra simétrica garantizada',
        'Router WiFi 6 incluido',
        '1 línea móvil con llamadas ilimitadas',
        '50GB de datos móviles incluidos'
      ],
      delay: 0.2
    },
    {
      title: 'Pro',
      speed: '1000',
      price: '39,90',
      mainLineGB: '100',
      features: [
        'Fibra simétrica garantizada',
        'Router WiFi 6 incluido',
        '1 línea móvil con llamadas ilimitadas',
        '100GB de datos móviles incluidos'
      ],
      delay: 0.3
    }
  ];

  const packs = [
    {
      id: 'single',
      title: 'Pack Single',
      description: 'Fibra 300 Megas + Llamadas Ilimitadas',
      features: [
        'Fibra 300 Megas + Llamadas Ilimitadas',
        '1 línea móvil de 50GB'
      ],
      price: '33,00',
      speed: '300',
      gb: '50',
      delay: 0.1
    },
    {
      id: 'duo',
      title: 'Pack Duo',
      description: 'FIBRA 500 Megas + Llamadas Ilimitadas',
      features: [
        'Fibra 500 Megas + Llamadas Ilimitadas',
        '2 líneas móviles con 100GB compartidos'
      ],
      price: '50,00',
      speed: '500',
      gb: '100',
      delay: 0.2
    },
    {
      id: 'tetra',
      title: 'Pack Tetra',
      description: 'Fibra 500 Megas + Llamadas Ilimitadas',
      features: [
        'Fibra 500 Megas + Llamadas Ilimitadas',
        '4 líneas móviles con 175GB compartidos'
      ],
      price: '60,00',
      speed: '500',
      gb: '175',
      delay: 0.3
    },
    {
      id: 'pro',
      title: 'Pack Pro',
      description: 'Fibra 1000 Megas + Llamadas Ilimitadas',
      features: [
        'Fibra 1000 Megas + Llamadas Ilimitadas',
        '2 líneas móviles con 175GB compartidos'
      ],
      price: '67,00',
      speed: '1000',
      gb: '175',
      isPopular: true,
      delay: 0.4
    }
  ];

  const offerings = [
    { id: 'packs', label: 'Packs' },
    { id: 'fibra-movil', label: 'Fibra + Móvil' },
    { id: 'solo-fibra', label: 'Solo Fibra' },
    { id: 'solo-movil', label: 'Solo Móvil' }
  ];

  return (
    <section className="py-20">
      {/* Title with gradient animation */}
      <div className="container mx-auto px-4 mb-12">
        <motion.h2
          {...motionConfig}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-shimmer"
        >
          Nuestros Planes
        </motion.h2>

        {/* Pills Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100/80 backdrop-blur-sm rounded-2xl p-1.5 flex flex-wrap justify-center gap-1 max-w-[95%] mx-auto">
            {offerings.map((offering) => (
              <button
                key={offering.id}
                onClick={() => setSelectedOffering(offering.id)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedOffering === offering.id
                    ? 'bg-white shadow-sm text-[--quaternary]'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {offering.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Container with adjusted padding and snap alignment */}
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          {selectedOffering === 'packs' && (
            <div className="flex overflow-x-auto pb-12 pt-8 gap-6 snap-x snap-mandatory hide-scrollbar">
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0 md:w-full px-[10%] md:px-0">
                {packs.map((pack) => (
                  <div key={pack.id} className="w-[280px] md:w-auto snap-center">
                    <PackCard {...pack} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedOffering === 'fibra-movil' && (
            <div className="container mx-auto px-4 py-8">
              <FibraMovilConfigurator />
            </div>
          )}

          {/* Placeholder sections */}
          {selectedOffering === 'solo-fibra' && (
            <div className="text-center text-gray-500">
              Próximamente
            </div>
          )}
          {selectedOffering === 'solo-movil' && (
            <div className="text-center text-gray-500">
              Próximamente
            </div>
          )}
        </div>
      </div>

      {/* Add custom styles for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
} 