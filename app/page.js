'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';

const Home = () => {
  const containerRef = useRef(null);
  const router = useRouter();
  const audioRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    );
  }, []);

  const handleClick = (route) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    // Give a short delay so the sound plays before routing
    setTimeout(() => {
      router.push(route);
    }, 200); // You can tweak this timing if needed
  };

  return (
    <div className="min-h-screen bg-black text-white font-retro flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl md:text-5xl mb-10 text-center">Mega Game Hub</h1>

      <div ref={containerRef} className="flex flex-col gap-6 w-full max-w-sm text-center">
        <button
          onClick={() => handleClick('/TicTacToe')}
          className="border-2 border-white py-4 px-6 hover:bg-white hover:text-black transition text-xs"
        >
          ▶️ Play Tic Tac Toe
        </button>

        <button
          onClick={() => handleClick('/PerfectGuess')}
          className="border-2 border-white py-4 px-6 hover:bg-white hover:text-black transition text-xs"
        >
          🔢 Play Perfect Guess
        </button>

        <button
          onClick={() => handleClick('/SnakeWaterGun')}
          className="border-2 border-white py-4 px-6 hover:bg-white hover:text-black transition text-xs"
        >
          🐍 Play Snake Water Gun
        </button>
      </div>

      {/* Sound */}
      <audio ref={audioRef} src="/sounds/restart.mp3" preload="auto" />
    </div>
  );
};

export default Home;
