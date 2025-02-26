'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Warning } from '@phosphor-icons/react';
import { useConfigurator, CustomerFormData } from '@/context/ConfiguratorProvider';
import { ADDITIONAL_LINES } from '@/data/plans-data';
import React from 'react';

export default function ConfigurationForm() {
  const { 
    selections, 
    showForm, 
    closeForm, 
    formData,
    updateFormData,
    submitForm,
    isSubmitting,
    submitSuccess
  } = useConfigurator();

  // Add console log to check the current selections when the form is shown
  useEffect(() => {
    if (showForm) {
      console.log('ConfigurationForm - Current selections:', selections);
    }
  }, [showForm, selections]);

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

  // Get display info based on selection
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
          {/* Close button */}
          <button
            onClick={closeForm}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all z-10"
            aria-label="Cerrar formulario"
          >
            <X size={20} weight="bold" />
          </button>

          {submitSuccess === true ? (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-20 h-20 bg-gradient-to-br from-[#51fcff]/20 to-[#ed54ba]/20 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle size={40} weight="fill" className="text-gradient-new" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Solicitud Enviada!</h3>
                <p className="text-gray-600 text-center max-w-xs mb-4">
                  Hemos recibido tu solicitud para contratar{' '}
                  <span className="font-semibold">{info.title}</span>.
                </p>
                
                {/* Show plan summary in success message */}
                <div className="w-full max-w-xs bg-gray-50 p-3 rounded-xl mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Plan seleccionado:</span>
                    <span className="text-sm font-semibold text-gray-900">{info.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Precio total:</span>
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-new">
                      {typeof info.price === 'number' ? 
                        `${info.price.toFixed(2)}€` : 
                        `${info.price}€`}
                      {!(info.title === 'Bono Minutos' || info.title === 'Bono Datos') && (
                        <span className="text-xs font-normal text-gray-600 ml-1">/mes</span>
                      )}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Te contactaremos en breve para confirmar los detalles y completar el proceso.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeForm}
                  className="bg-gradient-new text-white font-medium py-2 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Entendido
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
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
                >
                  <Warning size={32} weight="fill" className="text-red-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Error al Enviar</h3>
                <p className="text-gray-600 max-w-xs">
                  Ha ocurrido un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.
                </p>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={closeForm}
                    className="border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-[#ed54ba] to-[#51fcff] text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 transition-all"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-2">Completar Solicitud</h2>
              
              {/* Plan summary */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl mb-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg text-gray-900 flex items-center">
                  {info.title}
                  {selections.fibraMovilConfig.basePlan && (
                    <span className="ml-2 text-xs font-medium bg-gradient-new text-white px-2 py-0.5 rounded-full">
                      Fibra + Móvil
                    </span>
                  )}
                  {selections.selectedPack && (
                    <span className="ml-2 text-xs font-medium bg-gradient-new text-white px-2 py-0.5 rounded-full">
                      Pack
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{info.description}</p>
                
                {/* Enhanced display for FibraMovil with additional lines */}
                {selections.fibraMovilConfig.basePlan && (
                  <div className="mt-3 mb-3 bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-gradient-new rounded-full mr-2"></span>
                        Plan Base
                      </span>
                      <span className="font-semibold">{selections.fibraMovilConfig.basePlan.basePrice.toFixed(2)}€</span>
                    </div>
                    
                    {Object.entries(selections.fibraMovilConfig.additionalLines).some(([_, count]) => count > 0) && (
                      <>
                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <span className="w-2 h-2 bg-[#ed54ba] rounded-full mr-2"></span>
                          Líneas Adicionales
                        </div>
                      </>
                    )}
                    
                    {Object.entries(selections.fibraMovilConfig.additionalLines).map(([id, count]) => {
                      if (count > 0) {
                        const lineOption = ADDITIONAL_LINES.find(line => line.id === id);
                        if (lineOption) {
                          return (
                            <div key={id} className="flex justify-between text-sm text-gray-600 py-1 px-2 hover:bg-gray-50 rounded-lg">
                              <span>{count}x Línea {lineOption.gb}GB</span>
                              <span className="font-medium">{(lineOption.price * count).toFixed(2)}€</span>
                            </div>
                          );
                        }
                      }
                      return null;
                    })}
                    
                    {Object.entries(selections.fibraMovilConfig.additionalLines).some(([_, count]) => count > 0) && (
                      <div className="h-px bg-gray-200 my-2"></div>
                    )}
                  </div>
                )}
                
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-new mt-2">
                  {typeof info.price === 'number' ? 
                    `${info.price.toFixed(2)}€` : 
                    `${info.price}€`}
                  {!(info.title === 'Bono Minutos' || info.title === 'Bono Datos') && (
                    <span className="text-sm font-normal text-gray-600 ml-1">/mes</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">IVA incluido · Sin permanencia</p>
              </div>
              
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
                      className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50`}
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
                      className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51fcff]/50`}
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
                    className={`