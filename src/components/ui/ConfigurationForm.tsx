'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Warning, WifiHigh, DeviceMobile } from '@phosphor-icons/react';
import { useConfigurator, CustomerFormData } from '@/context/ConfiguratorProvider';
import { ADDITIONAL_LINES } from '@/data/plans-data';

export default function ConfigurationForm() {
  const { 
    selections, 
    showForm, 
    closeForm, 
    formData,
    updateFormData,
    submitForm,
    isSubmitting,
    submitSuccess,
    resetSelections
  } = useConfigurator();

  // Helper function to format prices
  const formatPrice = (price: number | string): string => {
    if (typeof price === 'string') return price + '€';
    
    // Check if the decimal part is zero
    const isWholeNumber = price % 1 === 0;
    
    if (isWholeNumber) {
      // If it's a whole number, show without decimals
      return `${Math.floor(price)}€`;
    } else {
      // If there are decimals, ensure we always show 2 decimal places
      return `${price.toFixed(2)}€`;
    }
  };

  // Cleanup effect - reset selections when form is closed
  useEffect(() => {
    if (!showForm) {
      // Add a small delay to ensure animations complete
      const timer = setTimeout(() => {
        resetSelections();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showForm, resetSelections]);

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});

  // Form validation
  const validateForm = () => {
    const newErrors: Partial<Record<keyof CustomerFormData, string>> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Email válido es obligatorio';
    }
    
    const phoneRegex = /^\d{9,12}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Número de teléfono válido es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await submitForm();
  };

  // Get display info based on selection - check each type independently without prioritizing
  const getSelectionInfo = () => {
    // Check each selection type independently without prioritizing
    // This ensures we only show what's currently selected
    
    if (selections.selectedPack) {
      return {
        title: selections.selectedPack.title,
        description: `${selections.selectedPack.speed}Mb + ${selections.selectedPack.gb}GB`,
        price: selections.selectedPack.price,
        type: 'pack'
      };
    } 
    else if (selections.selectedFibraPlan) {
      return {
        title: selections.selectedFibraPlan.title,
        description: `${selections.selectedFibraPlan.speed}Mb Simétricos`,
        price: selections.selectedFibraPlan.price,
        type: 'fibra'
      };
    }
    else if (selections.selectedMovilPlan) {
      return {
        title: selections.selectedMovilPlan.title,
        description: `${selections.selectedMovilPlan.data}GB + ${selections.selectedMovilPlan.calls}`,
        price: selections.selectedMovilPlan.basePrice,
        type: 'movil'
      };
    }
    else if (selections.fibraMovilConfig.basePlan) {
      const basePlan = selections.fibraMovilConfig.basePlan;
      const additionalLines = selections.fibraMovilConfig.additionalLines;
      
      // Calculate total price
      let totalPrice = basePlan.basePrice;
      let linesSummary = '';
      
      // Add prices for additional lines and create summary
      const lineDetails: string[] = [];
      let totalAdditionalLinesCount = 0;
      
      // Store each line type and count for the breakdown
      const additionalLineDetails: {id: string, gb: string, count: number, price: number}[] = [];
      
      Object.entries(additionalLines).forEach(([id, count]) => {
        if (count > 0) {
          // Find the line in ADDITIONAL_LINES
          const lineOption = ADDITIONAL_LINES.find(line => line.id === id);
          if (!lineOption) return;
          
          const linePrice = lineOption.price;
          totalPrice += linePrice * count;
          totalAdditionalLinesCount += count;
          
          // Add line summary
          const gbSize = lineOption.gb.toString();
          
          if (count > 0) {
            lineDetails.push(`${count}x ${gbSize}GB`);
            additionalLineDetails.push({
              id: id,
              gb: gbSize,
              count: count,
              price: linePrice * count
            });
          }
        }
      });
      
      // Create summary text
      if (totalAdditionalLinesCount > 0) {
        linesSummary = ` + ${lineDetails.join(', ')}`;
      }
      
      // Create a more descriptive title when there are additional lines
      const enhancedTitle = totalAdditionalLinesCount > 0 
        ? `${basePlan.title} + ${totalAdditionalLinesCount} línea${totalAdditionalLinesCount > 1 ? 's' : ''} adicional${totalAdditionalLinesCount > 1 ? 'es' : ''}`
        : basePlan.title;
      
      return {
        title: enhancedTitle,
        shortTitle: basePlan.title,
        description: `${basePlan.speed}Mb + ${basePlan.baseData}GB${linesSummary}`,
        baseDescription: `${basePlan.speed}Mb + ${basePlan.baseData}GB`,
        price: totalPrice,
        basePrice: basePlan.basePrice,
        additionalLines: additionalLineDetails,
        totalAdditionalLinesCount,
        type: 'fibra-movil'
      };
    }
    else if (selections.selectedBono.bono) {
      const bono = selections.selectedBono.bono;
      return {
        title: bono.type === 'minutes' ? 'Bono Minutos' : 'Bono Datos',
        description: bono.type === 'minutes' ? 
          `${bono.value} minutos internacionales` : 
          `${bono.value} de datos extra`,
        price: bono.price,
        type: `bono-${bono.type}`
      };
    }

    return {
      title: 'Sin selección',
      description: 'No se ha seleccionado ningún plan',
      price: 0,
      type: 'none'
    };
  };

  // Custom handleClose function that ensures cleanup
  const handleClose = () => {
    closeForm();
  };

  const info = getSelectionInfo();

  if (!showForm) return null;

  // Helper function to get the label for the plan type
  const getPlanTypeLabel = (type: string) => {
    switch (type) {
      case 'pack': return 'Pack';
      case 'fibra': return 'Fibra';
      case 'movil': return 'Móvil';
      case 'fibra-movil': return 'Fibra + Móvil';
      case 'bono-minutes': return 'Bono';
      case 'bono-data': return 'Bono';
      default: return '';
    }
  };

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-2 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        >
          {submitSuccess === true ? (
            <div className="p-6 text-center">
              <div className="flex flex-col items-center justify-center py-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#51fcff] to-[#ed54ba] rounded-full flex items-center justify-center mb-3"
                >
                  <CheckCircle size={32} weight="fill" className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">¡Solicitud Enviada!</h3>
                <p className="text-gray-600 max-w-xs text-sm">
                  Gracias por tu interés. Nos pondremos en contacto contigo lo antes posible.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className="mt-4 bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-white font-medium py-2 px-5 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Volver al Sitio
                </motion.button>
              </div>
            </div>
          ) : submitSuccess === false ? (
            <div className="p-6 text-center">
              <div className="flex flex-col items-center justify-center py-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3"
                >
                  <Warning size={32} weight="fill" className="text-red-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Error al Enviar</h3>
                <p className="text-gray-600 max-w-xs text-sm">
                  Ha ocurrido un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.
                </p>
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="border border-gray-300 text-gray-700 font-medium py-2 px-5 text-sm rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-white font-medium py-2 px-5 text-sm rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Reintentar
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Header with Gradient */}
              <div className="bg-gradient-dark pt-4 pb-5 px-5 relative rounded-t-2xl">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-all z-10"
                  aria-label="Cerrar formulario"
                >
                  <X size={18} weight="bold" />
                </motion.button>
                <h2 className="text-xl font-bold text-white mb-3">Completar Solicitud</h2>
                
                {/* Plan Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-gray-800">
                      {info.type === 'fibra-movil' && info.totalAdditionalLinesCount && info.totalAdditionalLinesCount > 0 
                        ? `${info.shortTitle} + ${info.totalAdditionalLinesCount} líneas adicionales` 
                        : info.title}
                    </h3>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-all duration-500 ${
                        info.type === 'pack' 
                          ? 'bg-teal-200 text-teal-900 border border-teal-400 animate-pulse hover:shadow-teal-300/50 hover:shadow-md' : 
                        info.type === 'fibra-movil' 
                          ? 'bg-blue-200 text-blue-900 border border-blue-400 animate-pulse hover:shadow-blue-300/50 hover:shadow-md' :
                        info.type === 'fibra' 
                          ? 'bg-purple-200 text-purple-900 border border-purple-400 animate-pulse hover:shadow-purple-300/50 hover:shadow-md' :
                        info.type === 'movil' 
                          ? 'bg-amber-200 text-amber-900 border border-amber-400 animate-pulse hover:shadow-amber-300/50 hover:shadow-md' :
                        info.type === 'bonos'
                          ? 'bg-pink-200 text-pink-900 border border-pink-400 animate-pulse hover:shadow-pink-300/50 hover:shadow-md' :
                        'bg-pink-200 text-pink-900 border border-pink-400 animate-pulse hover:shadow-pink-300/50 hover:shadow-md'
                      }`}
                    >
                      {getPlanTypeLabel(info.type)}
                    </motion.span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">
                    {info.type === 'fibra-movil' && 'baseDescription' in info ? info.baseDescription : info.description}
                  </p>
                  
                  {/* Prices */}
                  {'additionalLines' in info && info.additionalLines && info.additionalLines.length > 0 ? (
                    <div className="space-y-1.5">
                      {/* Base Plan */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                          <span className="text-sm">Plan Base</span>
                        </div>
                        <span className="font-medium">{info.basePrice ? formatPrice(info.basePrice) : '0€'}</span>
                      </div>
                      
                      {/* Additional Lines */}
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-pink-500 mr-2"></span>
                          <span className="text-sm">Líneas Adicionales</span>
                        </div>
                        
                        {info.additionalLines.map((line, i) => (
                          <div key={i} className="flex justify-between items-center pl-4">
                            <span className="text-sm text-gray-600">{line.count}× Línea {line.gb}GB</span>
                            <span className="text-sm font-medium text-gray-800">{formatPrice(line.price)}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Total Price */}
                      <div className="pt-2 mt-1 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <motion.span 
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.03, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            className="font-bold text-2xl text-blue-600"
                          >
                            {formatPrice(info.price)}
                          </motion.span>
                          <span className="text-xs text-gray-500">/mes</span>
                        </div>
                        <p className="text-xs text-gray-500">IVA incluido</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-end">
                      <motion.span 
                        className={`font-bold text-3xl relative ${
                          info.type === 'pack' ? 'text-transparent bg-clip-text text-shimmer-ocean' : 
                          info.type === 'fibra-movil' ? 'text-transparent bg-clip-text text-shimmer-ocean' :
                          info.type.includes('bono') ? 'text-transparent bg-clip-text text-shimmer-ocean' :
                          'text-transparent bg-clip-text text-shimmer-ocean'
                        } animate-shimmer`}
                      >
                        {formatPrice(info.price)}
                      </motion.span>
                      <div className="flex flex-col items-end">
                        {!info.type.includes('bono') && (
                          <span className="text-xs text-gray-500">/mes</span>
                        )}
                        <span className="text-xs text-gray-500">IVA incluido</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className={`w-full px-3 py-1.5 text-sm border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50 transition-all duration-200`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    
                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        className={`w-full px-3 py-1.5 text-sm border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50 transition-all duration-200`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={`w-full px-3 py-1.5 text-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50 transition-all duration-200`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={`w-full px-3 py-1.5 text-sm border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50 transition-all duration-200`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-5">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-dark text-white font-semibold py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                  </motion.button>
                </div>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 