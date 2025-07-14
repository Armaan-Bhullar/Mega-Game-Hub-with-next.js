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
  };

  useEffect(() => {
  if (gameEnded && winner !== null) {
    winningPattern.forEach(index => {
      gsap.to(cellRefs.current[index], {
        backgroundColor: 'white',
        color: 'black',
        duration: 1,
        ease: 'power2.out'
      });
    });

    // ✅ Play game over sound
    if (winner !== 'Draw') {
      setTimeout(() => {
        new Audio('/sounds/gameover.mp3').play();
      }, 500); // optional delay
    }

    setTimeout(() => {
      setShowResultScreen(true);
    }, 600);
  }
}, [gameEnded]);


  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-yellow-400 text-black">
      {!showResultScreen ? (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl mb-6 font-retro">TIC TAC TOE</h1>
          <div className="grid grid-cols-3 gap-1">
            {board.map((value, index) => (
              <button
                key={index}
                ref={el => (cellRefs.current[index] = el)}
                onClick={() => handleClick(index)}
                className={`w-24 h-24 text-4xl font-retro flex items-center justify-center transition-all
                  ${
                    value === 'X'
                      ? 'border-4 border-red-500 text-red-500'
                      : value === 'O'
                      ? 'border-4 border-blue-500 text-blue-500'
                      : 'border border-black'
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="mt-6 text-xs font-retro">
            {winner
              ? winner === 'Draw'
                ? 'IT\'S A DRAW!'
                : `${winner} WINS!`
              : `TURN: ${isXTurn ? 'X' : 'O'}`}
          </div>
          {winner && (
            <button
              onClick={restartGame}
              className="mt-4 px-6 py-2 border border-black hover:bg-black hover:text-yellow-400 transition-all text-xs font-retro"
            >
              RESTART
            </button>
          )}
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 flex flex-col items-center justify-center text-black z-50">
          <h1 className="text-xl font-retro z-20 mb-6">
            {winner === 'Draw' ? 'IT\'S A DRAW!' : `${winner} WINS!`}
          </h1>
          <button
            onClick={restartGame}
            className="z-20 px-6 py-3 border border-black text-black hover:bg-black hover:text-yellow-400 transition text-xs font-retro"
          >
            RESTART GAME
          </button>
        </div>
      )}
    </div>
  );
}
