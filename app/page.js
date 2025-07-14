"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const games = [
  {
    title: "Tic Tac Toe",
    route: "/TicTacToe",
    description: "Classic with a twist – X/O, particles, and power!",
    svg: "/controller.svg",
    bgColor: "#facc15", 
    textColor: "#000000",
  },
  {
    title: "Perfect Guess",
    route: "/PerfectGuess",
    description: "Guess the number — or go crazy trying.",
    svg: "/number-splash.svg",
    bgColor: "#000000", 
    textColor: "#ffffff",
  },
  {
    title: "Snake Water Gun",
    route: "/SnakeWaterGun",
    description: "The OG mind game — choose wisely.",
    svg: "/snake-blast.svg",
    bgColor: "#60a5fa", 
    textColor: "#ffffff",
  },
];

export default function Home() {
  const sectionsRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    // Background transition for each section
    sectionsRef.current.forEach((el, i) => {
      const game = games[i];

      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to(containerRef.current, {
            backgroundColor: game.bgColor,
            color: game.textColor,
            duration: 0.6,
          }),
        onEnterBack: () =>
          gsap.to(containerRef.current, {
            backgroundColor: game.bgColor,
            color: game.textColor,
            duration: 0.6,
          }),
      });

      gsap.fromTo(
        el.querySelector(".content"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    });

    // Animate title on scroll
    gsap.fromTo(
      ".main-title",
      { scale: 0.8, opacity: 0, y: -60 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".main-title",
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="transition-colors duration-500 ease-in-out font-retro min-h-screen bg-black text-white"
    >
      {/* Top Title Section */}
      <section className="min-h-screen flex items-center justify-center px-4 flex-col">
        <h1 className="main-title text-5xl md:text-7xl text-center">
          Mega Game Hub
        </h1>
        <p>by Dev Armaan</p>
      </section>

      {/* Game Sections */}
      {games.map((game, i) => (
        <section
          key={i}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="min-h-screen flex items-center justify-center px-4"
        >
          <div className="content text-center space-y-6 max-w-xl">
            <img
              src={game.svg}
              alt="icon"
              className="mx-auto w-24 h-24 animate-pulse"
            />
            <h2 className="text-4xl md:text-6xl">{game.title}</h2>
            <p className="text-base md:text-lg opacity-80">
              {game.description}
            </p>
            <Link
              href={game.route}
              className="inline-block mt-4 border-2 border-current px-6 py-3 hover:bg-white hover:text-black transition text-sm"
            >
              Start Game
            </Link>
          </div>
        </section>
      ))}
      <section className="min-h-[40vh] flex items-center justify-center px-4">
        <p className="text-sm opacity-80 text-center">
          Built by{" "}
          <a
            href="https://github.com/Armaan-Bhullar"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-current font-semibold"
          >
            Armaan Bhullar
          </a>
        </p>
      </section>
    </div>
  );
}
