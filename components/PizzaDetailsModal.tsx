
'use client';
import React from 'react';
import { Pizza } from '../types';

interface PizzaDetailsModalProps {
  pizza: Pizza;
  onClose: () => void;
  onOrder: () => void;
  onCustomize: () => void;
}

const PizzaDetailsModal: React.FC<PizzaDetailsModalProps> = ({ pizza, onClose, onOrder, onCustomize }) => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-0 md:p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#FDFCF0] w-full max-w-4xl md:rounded-[40px] shadow-2xl overflow-hidden h-full md:h-auto md:max-h-[90vh] flex flex-col animate-slideUp">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 bg-stone-50 p-3 rounded-2xl text-stone-400 hover:text-red-500 transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
        <div className="flex flex-col md:flex-row overflow-y-auto">
          <div className="w-full md:w-1/2 h-72 md:h-auto relative">
            <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] font-black uppercase text-yellow-400 mb-2">Sabor Local</span>
              <h3 className="text-6xl font-bebas leading-none">{pizza.name}</h3>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 space-y-10">
            <div><h4 className="text-[10px] font-black uppercase text-[#A61D24] mb-4">Relato</h4><p className="text-stone-600 italic text-lg leading-relaxed">"{pizza.history}"</p></div>
            <div className="flex flex-wrap gap-2">{pizza.ingredientsList.map((ing, i) => (<span key={i} className="bg-white border border-stone-100 px-4 py-2 rounded-xl text-xs font-bold text-stone-600">{ing}</span>))}</div>
            <div className="flex justify-between items-end pt-6 border-t border-stone-100"><p className="text-5xl font-bebas text-[#A61D24]">${pizza.price.toLocaleString('es-CL')}</p><button onClick={() => { onOrder(); onClose(); }} className="bg-[#A61D24] text-white font-black px-10 py-4 rounded-2xl uppercase tracking-widest text-xs">Pedir ya</button></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetailsModal;
