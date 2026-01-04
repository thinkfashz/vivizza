
'use client';
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
      .map(p => ({ ...p, y: p.y + p.vy, rotation: p.rotation + p.rv }))
      .filter(p => p.y < 600);
    setRenderCounter(prev => prev + 1);
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (gameActive) {
      requestRef.current = requestAnimationFrame(update);
      const spawner = setInterval(spawnPizza, 400);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { setGameActive(false); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        clearInterval(spawner); clearInterval(timer);
      };
    }
  }, [gameActive]);

  const handleCatch = (id: number) => {
    setScore(prev => prev + 15);
    pizzasRef.current = pizzasRef.current.filter(p => p.id !== id);
  };

  return (
    <div className="relative w-full h-[500px] bg-stone-900 rounded-[40px] overflow-hidden shadow-2xl border-4 border-yellow-500/20">
      <div className="absolute top-8 left-8 z-20 text-white font-bebas text-5xl">Score: {score}</div>
      <div className="absolute top-8 right-8 z-20 text-white font-bebas text-5xl">{timeLeft}s</div>
      {!gameActive ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-30">
          <h3 className="text-7xl font-bebas text-yellow-400 mb-6">PIZZA RUSH</h3>
          <button onClick={() => { setScore(0); setTimeLeft(30); setGameActive(true); pizzasRef.current = []; }} className="bg-[#A61D24] px-12 py-5 rounded-full text-white font-black uppercase tracking-widest">Jugar</button>
        </div>
      ) : (
        <div className="absolute inset-0">
          {pizzasRef.current.map(p => (
            <div key={p.id} className="absolute cursor-pointer select-none" style={{ left: `${p.x}%`, top: `${p.y}px`, transform: `rotate(${p.rotation}deg)`, fontSize: `${p.size}px` }} onMouseDown={() => handleCatch(p.id)}>{p.emoji}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PizzaGame;
