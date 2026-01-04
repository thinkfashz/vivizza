
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
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-2xl text-white md:text-stone-400 md:bg-stone-50 md:hover:bg-stone-100 transition-all shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row overflow-y-auto">
          {/* Cover Image */}
          <div className="w-full md:w-1/2 h-72 md:h-auto relative overflow-hidden">
            <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-400 mb-2">Sabor Original de Talca</span>
              <h3 className="text-5xl font-bebas leading-none tracking-tight">{pizza.name}</h3>
            </div>
          </div>

          {/* Details Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 space-y-10">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A61D24] mb-4">Relato de Cocina</h4>
              <p className="text-stone-600 leading-relaxed font-medium italic text-lg">"{pizza.history}"</p>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Ingredientes Principales</h4>
              <div className="flex flex-wrap gap-2">
                {pizza.ingredientsList.map((ing, idx) => (
                  <span key={idx} className="bg-white border border-stone-100 px-4 py-2 rounded-xl text-xs font-bold text-stone-600 shadow-sm">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-sm">
                <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Valor Energético</p>
                <p className="text-2xl font-bebas text-stone-900">{pizza.calories} <span className="text-xs uppercase">kcal</span></p>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-sm">
                <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Precio</p>
                <p className="text-2xl font-bebas text-[#A61D24]">${pizza.price.toLocaleString('es-CL')}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <button 
                onClick={() => { onOrder(); onClose(); }}
                className="w-full bg-[#A61D24] hover:bg-stone-900 text-white font-black py-5 rounded-[24px] transition-all shadow-xl shadow-red-100 uppercase tracking-widest text-xs transform active:scale-95"
              >
                Agregar al Carrito
              </button>
              <button 
                onClick={() => { onCustomize(); onClose(); }}
                className="w-full bg-white border-2 border-stone-100 hover:border-[#A61D24] text-stone-900 font-black py-4 rounded-[24px] transition-all uppercase tracking-widest text-[10px]"
              >
                Personalizar con Ingredientes Extra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetailsModal;
