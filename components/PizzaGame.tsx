
import React, { useState, useEffect, useRef } from 'react';

interface PizzaObj {
  id: number;
  x: number;
  y: number;
  vy: number;
  rotation: number;
  rv: number;
  size: number;
  emoji: string;
}

const PizzaGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pizzasRef = useRef<PizzaObj[]>([]);
  const requestRef = useRef<number>(null);
  const [renderCounter, setRenderCounter] = useState(0);

  const emojis = ['🍕', '🍄', '🍅', '🧀', '🥓'];

  const spawnPizza = () => {
    const id = Math.random();
    const x = Math.random() * 90;
    const vy = 2 + Math.random() * 4;
    const rotation = Math.random() * 360;
    const rv = (Math.random() - 0.5) * 10;
    const size = 30 + Math.random() * 30;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    pizzasRef.current.push({ id, x, y: -50, vy, rotation, rv, size, emoji });
  };

  const update = () => {
    if (!gameActive) return;

    pizzasRef.current = pizzasRef.current
      .map(p => ({
        ...p,
        y: p.y + p.vy,
        rotation: p.rotation + p.rv
      }))
      .filter(p => p.y < 600); // Remove when off screen

    setRenderCounter(prev => prev + 1);
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (gameActive) {
      requestRef.current = requestAnimationFrame(update);
      const spawner = setInterval(spawnPizza, 400);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        clearInterval(spawner);
        clearInterval(timer);
      };
    }
  }, [gameActive]);

  const handleCatch = (id: number) => {
    setScore(prev => prev + 15);
    pizzasRef.current = pizzasRef.current.filter(p => p.id !== id);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] bg-gradient-to-b from-stone-900 via-stone-800 to-black rounded-[40px] overflow-hidden shadow-2xl border-4 border-[#FFD700]/20"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>
      
      <div className="absolute top-8 left-8 z-20">
        <p className="text-[10px] uppercase font-black text-yellow-500 tracking-widest mb-1">Score</p>
        <p className="text-5xl font-bebas text-white drop-shadow-lg">{score}</p>
      </div>

      <div className="absolute top-8 right-8 z-20 text-right">
        <p className="text-[10px] uppercase font-black text-red-500 tracking-widest mb-1">Time</p>
        <p className="text-5xl font-bebas text-white drop-shadow-lg">{timeLeft}s</p>
      </div>

      {!gameActive ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/40 backdrop-blur-sm">
          <h3 className="text-7xl font-bebas text-yellow-400 mb-2 drop-shadow-2xl scale-110">PIZZA RUSH</h3>
          <p className="text-white/60 font-bold uppercase tracking-[0.3em] mb-10 text-xs">High performance slash game</p>
          <button 
            onClick={() => { setScore(0); setTimeLeft(30); setGameActive(true); pizzasRef.current = []; }}
            className="group relative px-12 py-5 bg-[#A61D24] rounded-full text-white font-black uppercase tracking-widest transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(166,29,36,0.5)] active:scale-95"
          >
            <span className="relative z-10">Start Engine</span>
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
          </button>
        </div>
      ) : (
        <div className="absolute inset-0">
          {pizzasRef.current.map(p => (
            <div
              key={p.id}
              className="absolute cursor-pointer select-none transition-transform active:scale-150 duration-75"
              style={{
                left: `${p.x}%`,
                top: `${p.y}px`,
                transform: `rotate(${p.rotation}deg)`,
                fontSize: `${p.size}px`,
                filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))'
              }}
              onMouseDown={() => handleCatch(p.id)}
              onMouseEnter={(e) => { if (e.buttons === 1) handleCatch(p.id); }}
            >
              {p.emoji}
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-6 w-full text-center pointer-events-none">
        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Vivazza Game Engine v2.0</span>
      </div>
    </div>
  );
};

export default PizzaGame;
