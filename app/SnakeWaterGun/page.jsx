'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

const choices = ['snake', 'water', 'gun'];

const SnakeWaterGun = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0, draw: 0 });

  const resultRef = useRef(null);
  const soundRef = useRef(null);

  const getImagePath = (choice) => `/${choice}.webp`;

  const determineWinner = (player, computer) => {
    if (player === computer) return 'draw';
    if (
      (player === 'snake' && computer === 'water') ||
      (player === 'water' && computer === 'gun') ||
      (player === 'gun' && computer === 'snake')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const handleChoice = (choice) => {
    const computer = choices[Math.floor(Math.random() * 3)];
    const winner = determineWinner(choice, computer);

    // Play sound
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
    }

    setPlayerChoice(choice);
    setComputerChoice(computer);

    if (winner === 'player') {
      setResult('🔥 You Win!');
      setScore((prev) => ({ ...prev, player: prev.player + 1 }));
    } else if (winner === 'computer') {
      setResult('💀 You Lose!');
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    } else {
      setResult("🤝 It's a Draw!");
      setScore((prev) => ({ ...prev, draw: prev.draw + 1 }));
    }

    gsap.fromTo(
      resultRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );
  };

  return (
    <div className="min-h-screen bg-[#60a5fa] text-white font-retro flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl md:text-4xl mb-6 text-center">Snake Water Gun</h1>

      {/* Scoreboard */}
      <div className="mb-8 text-sm md:text-md text-center space-y-1">
        <p>🧍‍♂️ You: {score.player}</p>
        <p>💻 Computer: {score.computer}</p>
        <p>🤝 Draws: {score.draw}</p>
      </div>

      {/* Game Buttons */}
      <div className="flex gap-6 flex-wrap justify-center mb-10">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            className="w-24 h-24 md:w-32 md:h-32 border-2 border-white p-2 hover:bg-white hover:text-black transition"
          >
            <img src={getImagePath(choice)} alt={choice} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>

      {/* Result */}
      {playerChoice && (
        <div className="text-center">
          <p className="text-sm md:text-md">You chose: <strong>{playerChoice}</strong></p>
          <p className="text-sm md:text-md">Computer chose: <strong>{computerChoice}</strong></p>
          <div
            ref={resultRef}
            className="mt-4 text-lg md:text-xl font-retro text-yellow-400"
          >
            {result}
          </div>
        </div>
      )}

      {/* Sound Effect */}
      <audio ref={soundRef} src="/sounds/o.mp3" preload="auto" />
    </div>
  );
};

export default SnakeWaterGun;
