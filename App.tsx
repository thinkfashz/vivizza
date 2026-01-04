
import React, { useState, useEffect, useRef } from 'react';
import { TRADITIONAL_PIZZAS, SPECIAL_PIZZAS, WHATSAPP_NUMBER, CUSTOM_BASE_CALORIES, DOUGH_TYPES } from './constants';
import { Pizza, Ingredient, CartItem, Dough } from './types';
import PizzaCard from './components/PizzaCard';
import CustomPizzaBuilder from './components/CustomPizzaBuilder';
import CalorieDisplay from './components/CalorieDisplay';
import PizzaGame from './components/PizzaGame';
import CustomizationModal from './components/CustomizationModal';
import LoadingScreen from './components/LoadingScreen';
import PizzaDetailsModal from './components/PizzaDetailsModal';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [activeTab, setActiveTab] = useState<'menu' | 'custom' | 'game' | 'history'>('menu');
  const [customizingPizza, setCustomizingPizza] = useState<Pizza | null>(null);
  const [selectedPizzaDetails, setSelectedPizzaDetails] = useState<Pizza | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutProgress, setCheckoutProgress] = useState(0);

  // Efectos de Sonido
  const popSound = useRef<HTMLAudioElement | null>(null);
  const successSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    popSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    successSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');
  }, []);

  const playPop = () => {
    if (popSound.current) {
      popSound.current.currentTime = 0;
      popSound.current.play().catch(() => {});
    }
  };

  const playSuccess = () => {
    if (successSound.current) {
      successSound.current.currentTime = 0;
      successSound.current.play().catch(() => {});
    }
  };

  const addToCart = (pizza: Pizza) => {
    playPop();
    setCart(prev => {
      const existing = prev.find(item => 
        item.pizza.id === pizza.id && 
        (!item.customIngredients || item.customIngredients.length === 0)
      );
      if (existing) {
        return prev.map(item => 
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: `${pizza.id}-${Date.now()}`, pizza, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const totalCartPrice = cart.reduce((acc, item) => acc + (item.pizza.price * item.quantity), 0);
  const totalCartCalories = cart.reduce((acc, item) => acc + (item.pizza.calories * item.quantity), 0);

  const startWhatsAppCheckout = () => {
    if (orderType === 'delivery' && !address.trim()) {
      alert("Por favor, ingresa tu dirección para el envío en Talca 🍕");
      return;
    }

    setIsCheckingOut(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setCheckoutProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        playSuccess();
        completeWhatsAppOrder();
      }
    }, 50);
  };

  const completeWhatsAppOrder = () => {
    let message = "🍕 *¡NUEVO PEDIDO VIVAZZA TALCA!* 🍕\n\n";
    message += `*MODALIDAD:* ${orderType === 'delivery' ? '🚚 Envío a Domicilio' : '🏪 Retiro en Local'}\n`;
    if (orderType === 'delivery') message += `*DIRECCIÓN:* ${address}\n`;
    message += "----------------------------------\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.pizza.name}* (x${item.quantity})\n`;
      if (item.customIngredients && item.customIngredients.length > 0) {
        message += `   _Extras: ${item.customIngredients.map(i => i.name).join(', ')}_\n`;
      }
      message += `   Subtotal: $${(item.pizza.price * item.quantity).toLocaleString('es-CL')}\n\n`;
    });

    message += "----------------------------------\n";
    message += `💰 *TOTAL A PAGAR: $${totalCartPrice.toLocaleString('es-CL')}*\n`;
    message += "🙌 ¡Esperamos que disfrutes el auténtico sabor artesanal!";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutProgress(0);
    }, 1500);
  };

  if (isLoading) return <LoadingScreen onFinished={() => setIsLoading(false)} />;

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-stone-900 selection:bg-[#A61D24]/10 pb-24 md:pb-0 overflow-x-hidden">
      
      {/* Header Estilo Next.js */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-2xl border-b border-stone-100 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('menu')}>
            <div className="w-12 h-12 bg-[#A61D24] rounded-2xl flex items-center justify-center shadow-lg shadow-red-100 transform group-hover:rotate-6 transition-transform">
              <span className="text-white font-bebas text-3xl pt-1">V</span>
            </div>
            <div>
              <h1 className="text-3xl font-bebas tracking-widest text-stone-900 leading-none">Vivazza</h1>
              <p className="text-[9px] font-black text-[#A61D24] uppercase tracking-[0.4em]">Pizzería • Talca</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            {[
              { id: 'menu', label: 'Menú' },
              { id: 'custom', label: 'Armar' },
              { id: 'game', label: 'Arcade' },
              { id: 'history', label: 'Nuestra Historia' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative py-2 ${activeTab === tab.id ? 'text-[#A61D24]' : 'text-stone-400 hover:text-stone-900'}`}
              >
                {tab.label}
                {activeTab === tab.id && <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#A61D24] rounded-full"></span>}
              </button>
            ))}
          </nav>

          <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-all border border-stone-100 group">
            <svg className="w-6 h-6 text-stone-800 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#A61D24] text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-xl animate-bounce">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:py-20">
        
        {activeTab === 'menu' && (
          <div className="section-fade-enter space-y-24">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
              <div className="max-w-3xl space-y-6">
                <span className="inline-block bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Abierto en el Corazón del Maule</span>
                <h2 className="text-7xl md:text-9xl font-bebas text-stone-900 leading-[0.85]">Recetas con <br/> <span className="text-[#A61D24] italic">Alma Artesana</span></h2>
                <p className="text-xl text-stone-500 font-medium leading-relaxed max-w-xl">
                  Harinas de molinos locales, fermentación prolongada y el cariño de nuestra gente en cada porción.
                </p>
              </div>
              <CalorieDisplay calories={totalCartCalories} label="Vivazza Tracker" />
            </div>

            {/* Reordenamiento: Especialidades Primero */}
            <div className="space-y-12">
               <div className="flex items-center gap-6">
                 <h3 className="text-5xl font-bebas text-stone-900 uppercase">Especialidades de la Casa</h3>
                 <div className="h-px flex-grow bg-stone-100"></div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                 {SPECIAL_PIZZAS.map(pizza => (
                   <PizzaCard 
                     key={pizza.id} 
                     pizza={pizza} 
                     onOrder={addToCart} 
                     onCustomize={() => setCustomizingPizza(pizza)}
                     onShowDetails={() => setSelectedPizzaDetails(pizza)}
                   />
                 ))}
               </div>
            </div>

            {/* Tradicionales */}
            <div className="space-y-12">
               <div className="flex items-center gap-6">
                 <h3 className="text-5xl font-bebas text-stone-400 uppercase tracking-widest">Nuestra Tradición</h3>
                 <div className="h-px flex-grow bg-stone-100"></div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {TRADITIONAL_PIZZAS.map(pizza => (
                   <PizzaCard 
                     key={pizza.id} 
                     pizza={pizza} 
                     onOrder={addToCart} 
                     onCustomize={() => setCustomizingPizza(pizza)}
                     onShowDetails={() => setSelectedPizzaDetails(pizza)}
                   />
                 ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="section-fade-enter py-8">
            <CustomPizzaBuilder onAddCustom={(ings, dough, price) => {
              const totalCals = CUSTOM_BASE_CALORIES + dough.calories + ings.reduce((acc, i) => acc + (i.calories || 0), 0);
              const customPizza: Pizza = {
                id: `custom-${Date.now()}`,
                name: `Creación Propia`,
                description: `Masa ${dough.name} diseñada a tu medida.`,
                price,
                calories: totalCals,
                dough,
                image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800',
                type: 'custom',
                ingredientsList: ings.map(i => i.name),
                history: 'Una receta exclusiva nacida de tu inspiración en nuestro laboratorio de sabores.'
              };
              setCart(prev => [...prev, { id: customPizza.id, pizza: customPizza, quantity: 1, customIngredients: ings }]);
              playPop();
              setIsCartOpen(true);
            }} />
          </div>
        )}

        {activeTab === 'game' && (
          <div className="section-fade-enter max-w-4xl mx-auto py-8 text-center space-y-12">
            <div>
               <h2 className="text-8xl font-bebas text-stone-900">Arcade <span className="text-[#A61D24]">Vivazza</span></h2>
               <p className="text-stone-400 font-bold uppercase tracking-[0.5em] text-[10px]">Corta los ingredientes mientras preparamos tu masa.</p>
            </div>
            <PizzaGame />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="section-fade-enter max-w-5xl mx-auto py-12 space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-8xl font-bebas text-stone-900 leading-none">Nuestra <span className="text-[#A61D24]">Herencia</span></h2>
              <p className="text-stone-400 font-bold uppercase tracking-[0.6em] text-xs">Pizzería Artesanal Talca</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800" className="rounded-[48px] shadow-2xl transition-transform group-hover:-rotate-2 duration-500" alt="Horno a leña" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#A61D24] rounded-full flex items-center justify-center text-white font-bebas text-2xl rotate-12 shadow-xl border-4 border-white">
                  EST. 2021
                </div>
              </div>
              <div className="space-y-8">
                <h3 className="text-5xl font-bebas text-stone-800">El Sueño de la 1 Poniente</h3>
                <div className="space-y-4 text-stone-600 leading-relaxed font-medium text-lg">
                  <p>
                    Vivazza nació en un pequeño garaje cerca de la Diagonal en Talca. Lo que comenzó como un experimento entre amigos para crear la masa perfecta, se convirtió en un pilar de la gastronomía urbana maulina.
                  </p>
                  <p>
                    Hoy, mantenemos la misma obsesión: harinas de molinos locales, agua pura de nuestra cordillera y una fermentación lenta que respeta los tiempos del sabor. No somos comida rápida, somos cultura artesanal horneada a 400 grados.
                  </p>
                </div>
                <div className="pt-6 border-t border-stone-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#A61D24]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-stone-400">Visítanos en Talca</p>
                    <p className="font-bold text-stone-800">Calle 1 Poniente #1240</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals & Overlays */}
      {selectedPizzaDetails && (
        <PizzaDetailsModal 
          pizza={selectedPizzaDetails}
          onClose={() => setSelectedPizzaDetails(null)}
          onOrder={() => addToCart(selectedPizzaDetails)}
          onCustomize={() => setCustomizingPizza(selectedPizzaDetails)}
        />
      )}

      {customizingPizza && (
        <CustomizationModal 
          basePizza={customizingPizza}
          onClose={() => setCustomizingPizza(null)}
          onConfirm={(extras, totalP, totalC) => {
            const modPizza: Pizza = {
              ...customizingPizza,
              id: `${customizingPizza.id}-mod-${Date.now()}`,
              name: `${customizingPizza.name} + Extras`,
              price: totalP,
              calories: totalC,
              type: 'custom'
            };
            setCart(prev => [...prev, { id: modPizza.id, pizza: modPizza, quantity: 1, customIngredients: extras }]);
            setCustomizingPizza(null);
            playPop();
            setIsCartOpen(true);
          }}
        />
      )}

      {/* Navegación Móvil Estilo Nativo */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
         <div className="bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[32px] p-2 shadow-2xl flex justify-around items-center h-20">
            {[
              { id: 'menu', label: 'Menú', icon: <path d="M4 6h16M4 12h16M4 18h16" /> },
              { id: 'custom', label: 'Armar', icon: <path d="M12 4v16m8-8H4" /> },
              { id: 'game', label: 'Arcade', icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" /> },
              { id: 'history', label: 'Historia', icon: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 transition-all ${activeTab === tab.id ? 'text-[#A61D24]' : 'text-stone-300'}`}
              >
                <div className={`p-2 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-red-50 scale-110' : ''}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>{tab.icon}</svg>
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.1em]">{tab.label}</span>
              </button>
            ))}
         </div>
      </nav>

      {/* Sidebar de Checkout */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md animate-fadeIn" onClick={() => !isCheckingOut && setIsCartOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white flex flex-col h-full shadow-2xl relative">
              
              {isCheckingOut && (
                <div className="absolute inset-0 z-50 bg-white/95 flex flex-col items-center justify-center p-12 text-center space-y-10">
                   <div className="w-24 h-24 bg-[#A61D24] rounded-3xl animate-bounce flex items-center justify-center text-white text-4xl font-bebas shadow-xl">V</div>
                   <div className="space-y-4 w-full">
                     <h3 className="text-4xl font-bebas text-stone-900 uppercase tracking-widest">Validando Pedido</h3>
                     <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                       <div 
                        className="h-full bg-[#A61D24] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(166,29,36,0.3)]"
                        style={{ width: `${checkoutProgress}%` }}
                       ></div>
                     </div>
                     <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{checkoutProgress}% Procesado</p>
                   </div>
                </div>
              )}

              <div className="p-8 border-b border-stone-100 flex items-center justify-between">
                <h2 className="text-4xl font-bebas text-stone-900">Tu Pedido</h2>
                <button onClick={() => setIsCartOpen(false)} className="bg-stone-50 p-4 rounded-3xl text-stone-400 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="text-center py-24 opacity-30">
                    <p className="text-8xl mb-6">🤌</p>
                    <p className="font-black uppercase tracking-[0.3em] text-[10px]">Tu carrito está hambriento</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-5 animate-fadeIn group">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-stone-100 transition-transform group-hover:scale-105">
                        <img src={item.pizza.image} alt={item.pizza.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-stone-800 uppercase tracking-tighter text-sm">{item.pizza.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-600 transition-colors">
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                        <p className="text-[9px] text-[#A61D24] font-black uppercase tracking-widest">
                           {item.pizza.calories} kcal • {item.pizza.dough?.name || 'Clásica'}
                        </p>
                        <div className="flex justify-between items-center pt-3">
                          <div className="flex items-center gap-3 bg-stone-50 rounded-xl px-2 py-1 border border-stone-100">
                             <button onClick={() => updateQuantity(item.id, -1)} className="text-stone-400 font-black text-lg hover:text-[#A61D24] transition-colors">−</button>
                             <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, 1)} className="text-stone-400 font-black text-lg hover:text-[#A61D24] transition-colors">+</button>
                          </div>
                          <span className="font-bebas text-xl text-stone-900">${(item.pizza.price * item.quantity).toLocaleString('es-CL')}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-stone-50 border-t border-stone-100 space-y-6">
                  <div className="grid grid-cols-2 p-1.5 bg-stone-200 rounded-[28px]">
                    <button onClick={() => setOrderType('delivery')} className={`py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${orderType === 'delivery' ? 'bg-white text-[#A61D24] shadow-xl' : 'text-stone-500'}`}>Delivery 🚚</button>
                    <button onClick={() => setOrderType('pickup')} className={`py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${orderType === 'pickup' ? 'bg-white text-[#A61D24] shadow-xl' : 'text-stone-500'}`}>Retiro 🏪</button>
                  </div>

                  {orderType === 'delivery' && (
                    <div className="space-y-2 animate-slideUp">
                      <label className="text-[9px] uppercase font-black text-stone-400 pl-2">Dirección en Talca</label>
                      <input 
                        type="text" 
                        placeholder="Ej: 2 Norte #1520, Sector Centro" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-white border-2 border-stone-100 rounded-[24px] py-4 px-6 text-sm outline-none focus:border-[#A61D24] transition-all shadow-sm"
                      />
                    </div>
                  )}

                  <div className="flex justify-between items-end pt-4">
                    <span className="font-bebas text-3xl text-stone-400 leading-none">Total Final</span>
                    <span className="font-bebas text-5xl text-stone-900 leading-none">${totalCartPrice.toLocaleString('es-CL')}</span>
                  </div>

                  <button 
                    onClick={startWhatsAppCheckout}
                    className="w-full bg-[#A61D24] hover:bg-stone-900 text-white font-black py-6 rounded-[32px] shadow-2xl transition-all transform active:scale-95 uppercase tracking-widest text-xs"
                  >
                    Confirmar por WhatsApp 🚀
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Estilo Next.js */}
      <footer className="bg-white border-t border-stone-100 py-24">
        <div className="container mx-auto px-6 text-center space-y-12">
           <div className="space-y-4">
              <h2 className="text-8xl font-bebas text-stone-900 tracking-widest">Vivazza</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#A61D24]">Pizzería Artesana • Talca, Chile</p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
              <a href="https://instagram.com/vivazza_cl" target="_blank" className="hover:text-[#A61D24] transition-colors underline underline-offset-8 decoration-red-100">Instagram</a>
              <a href="#" className="hover:text-[#A61D24] transition-colors underline underline-offset-8 decoration-red-100">TikTok</a>
              <a href="#" className="hover:text-[#A61D24] transition-colors underline underline-offset-8 decoration-red-100">Ubicación</a>
           </div>

           <p className="max-w-xl mx-auto text-[10px] font-bold text-stone-300 uppercase tracking-widest leading-loose">
              Orgullosamente Maulinos. Horneando con pasión en Calle 1 Poniente #1240, Talca. <br/>
              &copy; 2024 Vivazza Pizzería. Todos los derechos reservados. <br/>
              Hecho con amor, harina y fuego.
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
