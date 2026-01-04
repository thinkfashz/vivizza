
import React from 'react';
import { Pizza } from '../types';

interface PizzaCardProps {
  pizza: Pizza;
  onOrder: (pizza: Pizza) => void;
  onCustomize: () => void;
  onShowDetails: () => void;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza, onOrder, onCustomize, onShowDetails }) => {
  return (
    <div className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 flex flex-col h-full transform hover:-translate-y-2">
      <div className="relative h-60 overflow-hidden cursor-pointer" onClick={onShowDetails}>
        <img 
          src={pizza.image} 
          alt={pizza.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[#A61D24] px-4 py-1.5 rounded-full font-bebas text-xl shadow-lg border border-red-50">
          ${pizza.price.toLocaleString('es-CL')}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
           <span className="bg-white/90 backdrop-blur px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">Ver Detalles</span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-stone-800 tracking-tight leading-none">{pizza.name}</h3>
          <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{pizza.calories} kcal</span>
        </div>
        <p className="text-stone-500 text-sm mb-8 flex-grow leading-relaxed font-medium line-clamp-2">{pizza.description}</p>
        
        <div className="space-y-3">
          <button 
            onClick={() => onOrder(pizza)}
            className="w-full bg-[#A61D24] hover:bg-stone-900 text-white font-black py-4 px-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Lo quiero ya
          </button>
          
          <button 
            onClick={onCustomize}
            className="w-full bg-stone-50 hover:bg-stone-100 text-stone-500 font-black py-3 rounded-2xl transition-all text-[10px] uppercase tracking-widest"
          >
            Añadir Extras
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
