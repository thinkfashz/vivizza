
import React, { useState, useMemo } from 'react';
import { AVAILABLE_INGREDIENTS } from '../constants';
import { Pizza, Ingredient } from '../types';

interface CustomizationModalProps {
  basePizza: Pizza;
  onConfirm: (extras: Ingredient[], totalPrice: number, totalCalories: number) => void;
  onClose: () => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({ basePizza, onConfirm, onClose }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const calculations = useMemo(() => {
    const extrasPrice = selectedIds.reduce((acc, id) => {
      const ing = AVAILABLE_INGREDIENTS.find(i => i.id === id);
      return acc + (ing?.price || 0);
    }, 0);
    const extrasCals = selectedIds.reduce((acc, id) => {
      const ing = AVAILABLE_INGREDIENTS.find(i => i.id === id);
      return acc + (ing?.calories || 0);
    }, 0);

    return {
      totalPrice: basePizza.price + extrasPrice,
      totalCalories: basePizza.calories + extrasCals
    };
  }, [selectedIds, basePizza]);

  const toggleIngredient = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Preview Side */}
          <div className="w-full md:w-5/12 bg-stone-100 relative">
            <img src={basePizza.image} alt={basePizza.name} className="w-full h-48 md:h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-3xl font-bebas leading-tight">Personalizando<br/>{basePizza.name}</h3>
            </div>
            <button onClick={onClose} className="absolute top-4 left-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Controls Side */}
          <div className="w-full md:w-7/12 p-6 overflow-y-auto flex flex-col">
            <div className="mb-6">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-4">Añade Toppings Extra</h4>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_INGREDIENTS.map((ing) => (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing.id)}
                    className={`flex flex-col p-2 rounded-xl border-2 transition-all text-left ${
                      selectedIds.includes(ing.id) 
                        ? 'bg-red-50 border-[#A61D24] scale-[1.02]' 
                        : 'bg-white border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <span className="font-bold text-xs text-stone-800">{ing.name}</span>
                    <span className="text-[10px] text-stone-400">+${ing.price} | +{ing.calories} kcal</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-stone-100 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase font-bold text-stone-400">Total estimado</p>
                  <p className="text-sm text-stone-500">{calculations.totalCalories} kcal totales</p>
                </div>
                <p className="text-3xl font-bebas text-[#A61D24]">${calculations.totalPrice.toLocaleString('es-CL')}</p>
              </div>

              <button
                onClick={() => {
                  const extras = AVAILABLE_INGREDIENTS.filter(i => selectedIds.includes(i.id));
                  onConfirm(extras, calculations.totalPrice, calculations.totalCalories);
                }}
                className="w-full bg-[#A61D24] hover:bg-[#8B181E] text-white font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-[0.98]"
              >
                Actualizar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
