
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
  const [progress, setProgress] = useState(50);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#FDFCF0] flex flex-col items-center justify-center p-8 animate-fadeIn">
      <div className="relative mb-12">
        <div className="w-24 h-24 bg-[#A61D24] rounded-[24px] flex items-center justify-center shadow-2xl animate-bounce">
          <span className="text-white font-bebas text-5xl pt-2">V</span>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-stone-200 rounded-full blur-sm opacity-50"></div>
      </div>
      
      <div className="w-full max-w-xs space-y-4 text-center">
        <h2 className="text-3xl font-bebas tracking-widest text-stone-900">Vivazza Talca</h2>
        <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#A61D24] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
          <span>Calentando Horno</span>
          <span>{progress}%</span>
        </div>
      </div>
      
      <p className="absolute bottom-10 text-[10px] font-bold text-stone-300 uppercase tracking-[0.5em]">Corazón del Maule</p>
    </div>
  );
};

export default LoadingScreen;
