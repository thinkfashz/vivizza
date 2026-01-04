
'use client';
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
  const [progress, setProgress] = useState(50);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(timer); setTimeout(onFinished, 400); return 100; }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#FDFCF0] flex flex-col items-center justify-center p-8 animate-fadeIn">
      <div className="w-24 h-24 bg-[#A61D24] rounded-3xl flex items-center justify-center shadow-2xl animate-bounce mb-8">
        <span className="text-white font-bebas text-5xl pt-1">V</span>
      </div>
      <h2 className="text-4xl font-bebas text-stone-900 tracking-widest mb-4">Vivazza Talca</h2>
      <div className="w-64 h-1 bg-stone-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#A61D24] transition-all" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
