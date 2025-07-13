'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningPattern, setWinningPattern] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);
  const cellRefs = useRef([]);
  const particleContainer = useRef(null);

  const handleClick = (index) => {
    if (board[index] || winner || gameEnded) return;

    const updatedBoard = [...board];
    const symbol = isXTurn ? 'X' : 'O';
    updatedBoard[index] = symbol;
    setBoard(updatedBoard);

    new Audio(`/sounds/${symbol.toLowerCase()}.mp3`).play();

    gsap.fromTo(
      cellRefs.current[index],
      { scale: 0 },
      { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );

    const result = checkWinner(updatedBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningPattern(result.pattern);
      setGameEnded(true);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], pattern };
      }
    }

    if (board.every(cell => cell !== null)) return { winner: 'Draw', pattern: [] };
    return { winner: null, pattern: [] };
  };

  const restartGame = () => {
    new Audio('/sounds/restart.mp3').play();
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningPattern([]);
    setGameEnded(false);
    setShowResultScreen(false);
    particleContainer.current.innerHTML = '';
  };

  useEffect(() => {
    if (gameEnded && winner !== null) {
      winningPattern.forEach(index => {
        gsap.to(cellRefs.current[index], {
          backgroundColor: 'white',
          color: 'black',
          duration: 5,
          ease: 'power2.out'
        });
      });

      setTimeout(() => {
        setShowResultScreen(true);
      }, 400);
    }
  }, [gameEnded]);

  useEffect(() => {
    if (showResultScreen && winner !== 'Draw') {
      setTimeout(() => {
        new Audio('/sounds/gameover.mp3').play();
        createParticleBurst();
      }, 500);
    }
  }, [showResultScreen]);

  const createParticleBurst = () => {
    const numParticles = 50;
    const colors = ['#ff1744', '#00e5ff', '#76ff03', '#d500f9', '#ffc107', '#2979ff'];

    for (let i = 0; i < numParticles; i++) {
      const p = document.createElement('div');
      p.className = 'particle';

      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.backgroundColor = color;
      p.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

      particleContainer.current.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 200;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const scale = 1 + Math.random() * 1.5;

      gsap.fromTo(p, {
        x: 0,
        y: 0,
        scale: 0.5,
        opacity: 1
      }, {
        x,
        y,
        scale,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.out',
        delay: Math.random() * 0.3,
        onComplete: () => p.remove()
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white">
      {!showResultScreen ? (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl mb-6 font-retro">TIC TAC TOE</h1>
          <div className="grid grid-cols-3 gap-1">
            {board.map((value, index) => (
              <button
                key={index}
                ref={el => (cellRefs.current[index] = el)}
                onClick={() => handleClick(index)}
                className={`
                  w-24 h-24 text-4xl font-retro flex items-center justify-center transition-all
                  ${
                    value === 'X'
                      ? 'border-4 border-red-500 text-red-500'
                      : value === 'O'
                      ? 'border-4 border-blue-500 text-blue-500'
                      : 'border border-white'
                  }
                `}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="mt-6 text-xs font-retro">
            {winner
              ? winner === 'Draw'
                ? '😐 IT\'S A DRAW!'
                : `${winner} WINS!`
              : `TURN: ${isXTurn ? 'X' : 'O'}`}
          </div>
          {winner && (
            <button
              onClick={restartGame}
              className="mt-4 px-6 py-2 border border-white hover:bg-white hover:text-black transition-all text-xs font-retro"
            >
              RESTART
            </button>
          )}
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center text-white z-50">
          <div ref={particleContainer} className="absolute top-1/2 left-1/2 pointer-events-none z-10"></div>
          <h1 className="text-xl font-retro z-20 mb-6">
            {winner === 'Draw' ? '😐 IT\'S A DRAW!' : `${winner} WINS!`}
          </h1>
          <button
            onClick={restartGame}
            className="z-20 px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition text-xs font-retro"
          >
            RESTART GAME
          </button>
        </div>
      )}
    </div>
  );
}
