
'use client';
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
    const extrasPrice = selectedIds.reduce((acc, id) => acc + (AVAILABLE_INGREDIENTS.find(i => i.id === id)?.price || 0), 0);
    const extrasCals = selectedIds.reduce((acc, id) => acc + (AVAILABLE_INGREDIENTS.find(i => i.id === id)?.calories || 0), 0);
    return { totalPrice: basePizza.price + extrasPrice, totalCalories: basePizza.calories + extrasCals };
  }, [selectedIds, basePizza]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-5/12 relative"><img src={basePizza.image} alt={basePizza.name} className="w-full h-48 md:h-full object-cover" /></div>
          <div className="w-full md:w-7/12 p-8 flex flex-col">
            <h4 className="text-[10px] uppercase font-black text-stone-400 mb-4 tracking-widest">Añadir Extras</h4>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {AVAILABLE_INGREDIENTS.map(ing => (
                <button key={ing.id} onClick={() => setSelectedIds(prev => prev.includes(ing.id) ? prev.filter(i => i !== ing.id) : [...prev, ing.id])} className={`p-3 rounded-xl border-2 text-left transition-all ${selectedIds.includes(ing.id) ? 'bg-red-50 border-[#A61D24]' : 'bg-white border-stone-100'}`}>
                  <p className="font-bold text-xs">{ing.name}</p><p className="text-[9px] text-stone-400">+${ing.price}</p>
                </button>
              ))}
            </div>
            <div className="mt-auto pt-6 border-t border-stone-100 flex justify-between items-end">
              <p className="text-3xl font-bebas text-[#A61D24]">${calculations.totalPrice.toLocaleString('es-CL')}</p>
              <button onClick={() => onConfirm(AVAILABLE_INGREDIENTS.filter(i => selectedIds.includes(i.id)), calculations.totalPrice, calculations.totalCalories)} className="bg-[#A61D24] text-white font-bold px-8 py-3 rounded-xl">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
