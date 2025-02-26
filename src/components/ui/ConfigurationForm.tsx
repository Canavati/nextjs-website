'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Warning } from '@phosphor-icons/react';
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
        price: selections.selectedPack.price
      };
    } 
    else if (selections.selectedFibraPlan) {
      return {
        title: selections.selectedFibraPlan.title,
        description: `${selections.selectedFibraPlan.speed}Mb Simétricos`,
        price: selections.selectedFibraPlan.price
      };
    }
    else if (selections.selectedMovilPlan) {
      return {
        title: selections.selectedMovilPlan.title,
        description: `${selections.selectedMovilPlan.data}GB + ${selections.selectedMovilPlan.calls}`,
        price: selections.selectedMovilPlan.basePrice
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
      
      Object.entries(additionalLines).forEach(([id, count]) => {
        if (count > 0) {
          // Find the line in ADDITIONAL_LINES
          const lineOption = ADDITIONAL_LINES.find(line => line.id === id);
          const linePrice = lineOption ? lineOption.price : 0;
          
          totalPrice += linePrice * count;
          totalAdditionalLinesCount += count;
          
          // Add line summary
          const gbSize = lineOption ? `${lineOption.gb}GB` : '';
          
          if (count > 0) {
            lineDetails.push(`${count}x ${gbSize}`);
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
        description: `${basePlan.speed}Mb + ${basePlan.baseData}GB${linesSummary}`,
        price: totalPrice
      };
    }
    else if (selections.selectedBono.bono) {
      const bono = selections.selectedBono.bono;
      return {
        title: bono.type === 'minutes' ? 'Bono Minutos' : 'Bono Datos',
        description: bono.type === 'minutes' ? 
          `${bono.value} minutos internacionales` : 
          `${bono.value} de datos extra`,
        price: bono.price
      };
    }

    return {
      title: 'Sin selección',
      description: 'No se ha seleccionado ningún plan',
      price: 0
    };
  };

  // Custom handleClose function that ensures cleanup
  const handleClose = () => {
    closeForm();
  };

  const info = getSelectionInfo();

  if (!showForm) return null;

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-3xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {submitSuccess === true ? (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-20 h-20 bg-gradient-to-br from-[#51fcff] to-[#ed54ba] bg-opacity-20 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle size={40} weight="fill" className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Solicitud Enviada!</h3>
                <p className="text-gray-600 max-w-xs">
                  Gracias por tu interés. Nos pondremos en contacto contigo lo antes posible.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className="mt-6 bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-white font-medium py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Volver al Sitio
                </motion.button>
              </div>
            </div>
          ) : submitSuccess === false ? (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4"
                >
                  <Warning size={40} weight="fill" className="text-red-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Error al Enviar</h3>
                <p className="text-gray-600 max-w-xs">
                  Ha ocurrido un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.
                </p>
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-white font-medium py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Reintentar
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-[#ed54ba] to-[#51fcff] p-6 relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-all z-10"
                  aria-label="Cerrar formulario"
                >
                  <X size={20} weight="bold" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-2">Completar Solicitud</h2>
                
                {/* Plan summary in header */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-2 text-white">
                  <h3 className="font-medium text-xl">{info.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{info.description}</p>
                  <div className="text-2xl font-bold">
                    {typeof info.price === 'number' ? 
                      `${info.price.toFixed(2)}€` : 
                      `${info.price}€`}
                    {!(info.title === 'Bono Minutos' || info.title === 'Bono Datos') && (
                      <span className="text-sm font-normal text-white/80 ml-1">/mes</span>
                    )}
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                        className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50 transition-all duration-200`}
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
                        className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50 transition-all duration-200`}
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
                      className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50 transition-all duration-200`}
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
                      className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50 transition-all duration-200`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-8">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                  </motion.button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
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