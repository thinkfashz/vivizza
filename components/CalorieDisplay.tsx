
import React, { useEffect, useState, useRef } from 'react';

interface CalorieDisplayProps {
  calories: number;
  label: string;
}

const CalorieDisplay: React.FC<CalorieDisplayProps> = ({ calories, label }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValue = useRef(0);
  const maxDaily = 2500;
  const percentage = Math.min((calories / maxDaily) * 100, 100);

  useEffect(() => {
    const startValue = prevValue.current;
    const endValue = calories;
    const duration = 800;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (endValue - startValue) + startValue);
      
      setDisplayValue(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValue.current = endValue;
      }
    };

    requestAnimationFrame(animate);
  }, [calories]);

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col gap-4 min-w-[280px] transition-all hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-black tracking-[0.2em] text-[#A61D24] mb-1">{label}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bebas text-stone-900 tabular-nums leading-none">{displayValue.toLocaleString()}</span>
            <span className="text-sm font-bold text-stone-300 uppercase">kcal</span>
          </div>
        </div>
        <div className="bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center text-[#A61D24]">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="w-full h-3 bg-stone-50 rounded-full overflow-hidden border border-stone-100 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-[#A61D24] to-[#A61D24] rounded-full transition-all duration-700 ease-out progress-bar-glow"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[8px] font-black text-stone-300 uppercase tracking-widest px-1">
          <span>Light</span>
          <span>Target (2.5k)</span>
          <span>Bulking</span>
        </div>
      </div>
    </div>
  );
};

export default CalorieDisplay;
