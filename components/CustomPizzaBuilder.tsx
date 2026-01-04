
'use client';
import React, { useState, useMemo } from 'react';
import { AVAILABLE_INGREDIENTS, CUSTOM_BASE_PRICE, DOUGH_TYPES } from '../constants';
import { Ingredient, Dough } from '../types';

interface CustomPizzaBuilderProps {
  onAddCustom: (ingredients: Ingredient[], dough: Dough, totalPrice: number) => void;
}

const CustomPizzaBuilder: React.FC<CustomPizzaBuilderProps> = ({ onAddCustom }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedDoughId, setSelectedDoughId] = useState<string>(DOUGH_TYPES[0].id);

  const currentDough = useMemo(() => 
    DOUGH_TYPES.find(d => d.id === selectedDoughId) || DOUGH_TYPES[0]
  , [selectedDoughId]);

  const totalPrice = useMemo(() => {
    const ingredientsTotal = selectedIds.reduce((acc, id) => {
      const ing = AVAILABLE_INGREDIENTS.find(i => i.id === id);
      return acc + (ing?.price || 0);
    }, 0);
    return CUSTOM_BASE_PRICE + ingredientsTotal + currentDough.price;
  }, [selectedIds, currentDough]);

  const toggleIngredient = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleOrder = () => {
    const selectedIngredients = AVAILABLE_INGREDIENTS.filter(i => selectedIds.includes(i.id));
    onAddCustom(selectedIngredients, currentDough, totalPrice);
    setSelectedIds([]);
  };

  return (
    <div className="bg-[#1A1A1A] text-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#A61D24] rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-10">
          <div>
            <span className="text-xs font-black text-[#A61D24] uppercase tracking-[0.4em] mb-3 block">Pizza Lab</span>
            <h2 className="text-6xl font-bebas text-white mb-4 leading-none">Crea tu <span className="text-[#A61D24]">Obra Maestra</span></h2>
            <p className="text-stone-400 font-medium max-w-lg">Personaliza cada detalle, desde la base hasta los toppings premium.</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#A61D24] flex items-center justify-center text-xs">1</span>
              Masa
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DOUGH_TYPES.map((dough) => (
                <button
                  key={dough.id}
                  onClick={() => setSelectedDoughId(dough.id)}
                  className={`relative p-5 rounded-2xl border-2 transition-all text-left flex items-center justify-between ${
                    selectedDoughId === dough.id ? 'bg-white border-white' : 'bg-[#252525] border-white/5'
                  }`}
                >
                  <div className="flex-1">
                    <p className={`font-bold ${selectedDoughId === dough.id ? 'text-black' : 'text-white'}`}>{dough.name}</p>
                    <p className="text-[10px] text-stone-500">{dough.description}</p>
                  </div>
                  <div className={`text-right ${selectedDoughId === dough.id ? 'text-[#A61D24]' : 'text-stone-400'}`}>
                    <p className="font-bebas text-xl leading-none">+{dough.price ? `$${dough.price}` : 'Gratis'}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#A61D24] flex items-center justify-center text-xs">2</span>
              Toppings
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AVAILABLE_INGREDIENTS.map((ing) => (
                <button
                  key={ing.id}
                  onClick={() => toggleIngredient(ing.id)}
                  className={`flex flex-col p-4 rounded-2xl border-2 transition-all ${
                    selectedIds.includes(ing.id) ? 'bg-[#A61D24] border-[#A61D24]' : 'bg-[#252525] border-white/5'
                  }`}
                >
                  <span className="font-bold text-xs mb-1">{ing.name}</span>
                  <span className="text-[10px] opacity-60">+${ing.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-96">
          <div className="sticky top-32 bg-white rounded-3xl p-8 shadow-2xl text-stone-900 border border-stone-100">
            <h3 className="text-2xl font-bebas mb-6 border-b border-stone-100 pb-4 text-[#A61D24]">Resumen</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm"><span className="text-stone-400 font-bold uppercase text-[10px]">Base</span><span className="font-bold text-stone-800">${CUSTOM_BASE_PRICE.toLocaleString()}</span></div>
              <div className="flex justify-between items-center text-sm p-3 bg-stone-50 rounded-xl"><div><p className="font-bold text-xs">Masa: {currentDough.name}</p></div><span className="font-bold text-[#A61D24] text-xs">+{currentDough.price ? `$${currentDough.price}` : 'Gratis'}</span></div>
              <div className="flex flex-wrap gap-2">{selectedIds.map(id => (<span key={id} className="bg-red-50 text-[#A61D24] text-[10px] px-3 py-1.5 rounded-full font-black">{AVAILABLE_INGREDIENTS.find(i => i.id === id)?.name}</span>))}</div>
            </div>
            <div className="pt-6 border-t border-stone-100">
              <div className="flex justify-between items-end mb-6"><span className="text-stone-400 font-bold uppercase text-[10px]">Total</span><span className="text-4xl font-bebas text-stone-900 leading-none">${totalPrice.toLocaleString('es-CL')}</span></div>
              <button onClick={handleOrder} disabled={selectedIds.length === 0} className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${selectedIds.length > 0 ? 'bg-[#A61D24] text-white' : 'bg-stone-100 text-stone-300 cursor-not-allowed'}`}>¡Añadir!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPizzaBuilder;
