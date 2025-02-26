'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  PackPlan,
  SoloFibraPlan,
  SoloMovilPlan,
  FibraMovilPlan,
  AdditionalLineOption,
  BonoOption,
  ADDITIONAL_LINES
} from '@/data/plans-data';

// Selection types
interface FibraMovilSelection {
  basePlan: FibraMovilPlan | null;
  additionalLines: {
    [key: string]: number; // lineId -> quantity
  };
}

interface BonoSelection {
  type: 'minutes' | 'data';
  bono: BonoOption | null;
}

// Combined selection state
interface ConfiguratorState {
  selectedPack: PackPlan | null;
  selectedFibraPlan: SoloFibraPlan | null;
  selectedMovilPlan: SoloMovilPlan | null;
  fibraMovilConfig: FibraMovilSelection;
  selectedBono: BonoSelection;
}

// Form data interface
export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Context interface
interface ConfiguratorContextType {
  selections: ConfiguratorState;
  setPackSelection: (pack: PackPlan | null) => void;
  setFibraPlanSelection: (plan: SoloFibraPlan | null) => void;
  setMovilPlanSelection: (plan: SoloMovilPlan | null) => void;
  setFibraMovilBasePlan: (plan: FibraMovilPlan | null) => void;
  updateAdditionalLine: (lineId: string, quantity: number) => void;
  setBonoSelection: (type: 'minutes' | 'data', bono: BonoOption | null) => void;
  resetSelections: () => void;
  // Form popup state
  showForm: boolean;
  openForm: () => void;
  closeForm: () => void;
  // Form data
  formData: CustomerFormData;
  updateFormData: (field: keyof CustomerFormData, value: string) => void;
  // Form submission
  submitForm: () => Promise<boolean>;
  isSubmitting: boolean;
  submitSuccess: boolean | null;
}

// Initial state
const initialState: ConfiguratorState = {
  selectedPack: null,
  selectedFibraPlan: null,
  selectedMovilPlan: null,
  fibraMovilConfig: {
    basePlan: null,
    additionalLines: {}
  },
  selectedBono: {
    type: 'minutes',
    bono: null
  }
};

const initialFormData: CustomerFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
};

// Create context
const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  // State for selections
  const [selections, setSelections] = useState<ConfiguratorState>(initialState);
  
  // Form popup state
  const [showForm, setShowForm] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  // Enhanced reset function to ensure complete state reset
  const resetSelections = () => {
    setSelections(initialState);
    // Also reset form data when selections are reset
    setFormData(initialFormData);
    setSubmitSuccess(null);
  };

  // Selection methods with improved reset logic
  const setPackSelection = (pack: PackPlan | null) => {
    // First reset all selections
    setSelections({
      ...initialState,
      selectedPack: pack
    });
  };

  const setFibraPlanSelection = (plan: SoloFibraPlan | null) => {
    // First reset all selections
    setSelections({
      ...initialState,
      selectedFibraPlan: plan
    });
  };

  const setMovilPlanSelection = (plan: SoloMovilPlan | null) => {
    // First reset all selections
    setSelections({
      ...initialState,
      selectedMovilPlan: plan
    });
  };

  const setFibraMovilBasePlan = (plan: FibraMovilPlan | null): Promise<void> => {
    // First reset all selections
    setSelections({
      ...initialState,
      fibraMovilConfig: {
        basePlan: plan,
        additionalLines: {}
      }
    });
    return Promise.resolve();
  };

  const setBonoSelection = (type: 'minutes' | 'data', bono: BonoOption | null) => {
    // First reset all selections
    setSelections({
      ...initialState,
      selectedBono: {
        type,
        bono
      }
    });
  };

  const updateAdditionalLine = (lineId: string, quantity: number): Promise<void> => {
    setSelections(prev => ({
      ...prev,
      fibraMovilConfig: {
        ...prev.fibraMovilConfig,
        additionalLines: {
          ...prev.fibraMovilConfig.additionalLines,
          [lineId]: quantity
        }
      }
    }));
    return Promise.resolve();
  };

  // Form methods
  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSubmitSuccess(null);
    
    // Add a slight delay to reset selections after the form closes
    // This ensures the animation completes before resetting
    setTimeout(() => {
      resetSelections();
    }, 300);
  };

  const updateFormData = (field: keyof CustomerFormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Prepare form submission data based on selections
  const prepareSubmissionData = () => {
    // Define additional line type
    type AdditionalLineData = {
      id: string;
      quantity: number;
      price: number;
    };

    // Base submission data
    const data: {
      customer: CustomerFormData;
      ttb: string | string[];
      serviceIds: string[];
      contractDescription: string;
      totalPrice: number;
      id: string;
      title: string;
      serviceType: string;
      additionalLines?: AdditionalLineData[];
    } = {
      customer: formData,
      ttb: '' as string | string[],
      serviceIds: [] as string[],
      contractDescription: '',
      totalPrice: 0,
      // Add new fields for better identification
      id: '',
      title: '',
      serviceType: ''
    };

    // Determine which selection to use
    if (selections.selectedPack) {
      const pack = selections.selectedPack;
      data.ttb = pack.ttb;
      data.serviceIds = pack.serviceIds;
      data.contractDescription = pack.contractDescription;
      data.totalPrice = Number(pack.price);
      // Add new fields
      data.id = pack.id;
      data.title = pack.title;
      data.serviceType = 'pack';
    } 
    else if (selections.selectedFibraPlan) {
      const plan = selections.selectedFibraPlan;
      data.ttb = plan.ttb;
      data.serviceIds = [plan.serviceId];
      data.contractDescription = plan.contractDescription;
      data.totalPrice = Number(plan.price);
      // Add new fields
      data.id = plan.id;
      data.title = plan.title;
      data.serviceType = 'fibra';
    }
    else if (selections.selectedMovilPlan) {
      const plan = selections.selectedMovilPlan;
      data.ttb = plan.ttb;
      data.serviceIds = [plan.serviceId];
      data.contractDescription = plan.contractDescription;
      data.totalPrice = plan.basePrice;
      // Add new fields
      data.id = plan.id;
      data.title = plan.title;
      data.serviceType = 'movil';
    }
    else if (selections.fibraMovilConfig.basePlan) {
      const basePlan = selections.fibraMovilConfig.basePlan;
      const additionalLines = selections.fibraMovilConfig.additionalLines;
      
      // Add base plan
      data.ttb = basePlan.ttb;
      data.serviceIds = [basePlan.serviceId];
      data.contractDescription = basePlan.contractDescription;
      data.totalPrice = basePlan.basePrice;
      // Add new fields
      data.id = basePlan.id;
      data.title = basePlan.title;
      data.serviceType = 'fibra-movil';
      
      // Add additional lines information in a structured format
      const additionalLinesData: AdditionalLineData[] = [];
      
      // Add additional lines
      for (const [lineId, quantity] of Object.entries(additionalLines)) {
        if (quantity > 0) {
          // Find the line in our data
          const lineConfig = ADDITIONAL_LINES.find(line => line.id === lineId);
          if (lineConfig) {
            // Add to serviceIds and price
            for (let i = 0; i < quantity; i++) {
              data.serviceIds.push(lineConfig.serviceId);
            }
            data.totalPrice += lineConfig.price * quantity;
            
            // Store detailed info about the additional line
            additionalLinesData.push({
              id: lineConfig.id,
              quantity: quantity,
              price: lineConfig.price * quantity
            });
          }
        }
      }
      
      // Add the additional lines data to the submission
      data.additionalLines = additionalLinesData;
    }
    else if (selections.selectedBono.bono) {
      const bono = selections.selectedBono.bono;
      data.ttb = bono.ttb;
      data.serviceIds = [bono.serviceId];
      data.contractDescription = bono.contractDescription;
      data.totalPrice = bono.price;
      // Add new fields
      data.id = bono.id;
      data.title = bono.type === 'minutes' ? 'Bono Minutos' : 'Bono Datos';
      data.serviceType = 'bono-' + bono.type;
    }

    return data;
  };

  // Form submission
  const submitForm = async (): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitSuccess(null);

    try {
      // Prepare the data to send
      const formData = prepareSubmissionData();
      
      // Log the detailed form data being submitted
      console.log('Submitting form with data:', {
        customer: formData.customer,
        serviceType: formData.serviceType,
        id: formData.id,
        title: formData.title,
        totalPrice: formData.totalPrice,
        additionalLines: formData.additionalLines ? formData.additionalLines.length : 0
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log successful response
      console.log('Submission successful!', formData);
      
      // Set success and reset form
      setSubmitSuccess(true);
      setFormData(initialFormData);
      return true;
    } catch (error) {
      setSubmitSuccess(false);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConfiguratorContext.Provider
      value={{
        selections,
        setPackSelection,
        setFibraPlanSelection,
        setMovilPlanSelection,
        setFibraMovilBasePlan,
        updateAdditionalLine,
        setBonoSelection,
        resetSelections,
        showForm,
        openForm,
        closeForm,
        formData,
        updateFormData,
        submitForm,
        isSubmitting,
        submitSuccess
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
}

// Hook for using the context
export function useConfigurator() {
  const context = useContext(ConfiguratorContext);
  if (context === undefined) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
} 