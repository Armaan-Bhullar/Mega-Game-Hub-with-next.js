'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PerfectGuess = () => {
  const [target, setTarget] = useState(generateNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [guessCount, setGuessCount] = useState(0);

  const messageRef = useRef(null);
  const inputRef = useRef(null);
  const inputContainerRef = useRef(null);
  const barRef = useRef(null);

  function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    if (!guess || isNaN(guess)) return;

    const numberGuess = parseInt(guess);

    setGuessCount(prev => prev + 1); // Increment counter

    if (numberGuess === target) {
      setMessage(`🎯 Correct! It was ${target} in ${guessCount + 1} guesses`);
      animateMessage('success');
      setGameOver(true);
      updateProgressBar();
      // new Audio('/sounds/victory.mp3').play();
    } else {
      updateProgressBar();

      if (numberGuess < target) {
        setMessage('🔼 Try Higher');
        animateMessage('up');
      } else {
        setMessage('🔽 Try Lower');
        animateMessage('down');
      }

      animateInputShake();
    }

    setGuess('');
  };

  const animateInputShake = () => {
    gsap.fromTo(
      inputContainerRef.current,
      { x: -10 },
      {
        x: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)',
      }
    );
  };

  const updateProgressBar = () => {
    const maxGuesses = 20;
    const percent = Math.min((guessCount + 1) / maxGuesses, 1) * 100;

    gsap.to(barRef.current, {
      width: `${percent}%`,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const animateMessage = (type) => {
    let color = '#ffffff';
    let y = 0;

    if (type === 'up') {
      color = '#00e5ff';
      y = -30;
    } else if (type === 'down') {
      color = '#ff1744';
      y = 30;
    } else if (type === 'success') {
      color = '#00e676';
      y = 0;
    }

    gsap.fromTo(
      messageRef.current,
      { y, scale: 1.5, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', color }
    );
  };

  const restartGame = () => {
  setTarget(generateNumber());
  setMessage('');
  setGuess('');
  setGameOver(false);
  setGuessCount(0);
  gsap.to(barRef.current, { width: '0%', duration: 0.3 });

  // ✅ Safe focus call
  if (inputRef.current) {
    inputRef.current.focus();
  }

  // Optional: new Audio('/sounds/restart.mp3').play();
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleGuess();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-retro px-4">
      <h1 className="text-xl md:text-3xl mb-8 text-center">Perfect Guess</h1>

      <p className='mb-5'>Guess a number from 1 - 100 in max 20 guesses.</p>

      <div className="w-full max-w-md mb-6">
        <div className="h-2 bg-gray-600 w-full rounded">
          <div ref={barRef} className="h-2 bg-green-400 w-0 rounded transition-all duration-300" />
        </div>
        <p className="text-xs text-center mt-2">Guesses: {guessCount}</p>
      </div>

      {!gameOver && (
        <>
          <div ref={inputContainerRef} className="mb-6">
            <input
              ref={inputRef}
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={handleKeyPress}
              className="text-white text-center font-retro text-xl w-40 p-3 border-2 border-white font-sans"
              placeholder="Guess"
              min={1}
              max={100}
            />
          </div>

          <button
            onClick={handleGuess}
            className="mb-8 px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition text-xs font-retro"
          >
            GUESS
          </button>
        </>
      )}

      <div ref={messageRef} className="text-md md:text-xl h-10 font-retro text-center">
        {message}
      </div>

      {gameOver && (
        <button
          onClick={restartGame}
          className="mt-10 px-6 py-3 border-2 border-white hover:bg-white hover:text-black text-xs font-retro"
        >
          PLAY AGAIN
        </button>
      )}
    </div>
  );
};

export default PerfectGuess;
