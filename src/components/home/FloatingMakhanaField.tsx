"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { soundFx } from "../../lib/audio/soundEffects";

interface FloatingPiece {
  id: number;
  src: string;
  x: number; // percentage
  y: number; // percentage
  size: number; // px
  rotation: number;
  speed: number;
  parallaxFactor: number;
  blur: number;
  opacity: number;
  isPopping: boolean;
}

export const FloatingMakhanaField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const [pieces, setPieces] = useState<FloatingPiece[]>([
    {
      id: 1,
      src: "/assets/korigo/makhana/makhana_roasted.webp",
      x: 12,
      y: 18,
      size: 78,
      rotation: 12,
      speed: 6,
      parallaxFactor: 0.04,
      blur: 0,
      opacity: 0.95,
      isPopping: false,
    },
    {
      id: 2,
      src: "/assets/korigo/makhana/makhana_sriracha.webp",
      x: 84,
      y: 14,
      size: 92,
      rotation: -18,
      speed: 7,
      parallaxFactor: 0.05,
      blur: 0,
      opacity: 0.95,
      isPopping: false,
    },
    {
      id: 3,
      src: "/assets/korigo/makhana/makhana_cheese.webp",
      x: 88,
      y: 68,
      size: 84,
      rotation: 24,
      speed: 5.5,
      parallaxFactor: 0.035,
      blur: 0,
      opacity: 0.9,
      isPopping: false,
    },
    {
      id: 4,
      src: "/assets/korigo/makhana/makhana_roasted.webp",
      x: 6,
      y: 72,
      size: 68,
      rotation: -30,
      speed: 8,
      parallaxFactor: 0.025,
      blur: 1,
      opacity: 0.85,
      isPopping: false,
    },
    {
      id: 5,
      src: "/assets/korigo/makhana/makhana_sriracha.webp",
      x: 48,
      y: 8,
      size: 52,
      rotation: 45,
      speed: 9,
      parallaxFactor: 0.02,
      blur: 2,
      opacity: 0.7,
      isPopping: false,
    },
    {
      id: 6,
      src: "/assets/korigo/makhana/makhana_cheese.webp",
      x: 52,
      y: 86,
      size: 58,
      rotation: -15,
      speed: 7.5,
      parallaxFactor: 0.03,
      blur: 1.5,
      opacity: 0.75,
      isPopping: false,
    },
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlePop = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playCrunch();

    // Spawn burst crumbs
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const newCrumbs = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 40,
      y: rect.top + rect.height / 2 + (Math.random() - 0.5) * 40,
      color: Math.random() > 0.5 ? "#f59e0b" : "#e33131",
    }));

    setParticles((prev) => [...prev, ...newCrumbs]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newCrumbs.some((nc) => nc.id === p.id)));
    }, 600);

    // Pop piece animation
    setPieces((prev) =>
      prev.map((piece) => {
        if (piece.id === id) {
          return { ...piece, isPopping: true };
        }
        return piece;
      })
    );

    setTimeout(() => {
      setPieces((prev) =>
        prev.map((piece) => {
          if (piece.id === id) {
            return {
              ...piece,
              isPopping: false,
              rotation: piece.rotation + (Math.random() * 90 - 45),
            };
          }
          return piece;
        })
      );
    }, 700);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-20 select-none"
    >
      {pieces.map((piece) => {
        const offsetX = mousePos.x * piece.parallaxFactor * 1000;
        const offsetY = mousePos.y * piece.parallaxFactor * 1000;

        return (
          <div
            key={piece.id}
            onClick={(e) => handlePop(piece.id, e)}
            className={`pointer-events-auto cursor-pointer absolute transition-transform duration-300 ease-out will-change-transform ${
              piece.isPopping ? "scale-150 opacity-0 duration-300" : "hover:scale-115 active:scale-95"
            }`}
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${piece.rotation}deg)`,
              filter: `blur(${piece.blur}px) drop-shadow(0 12px 18px rgba(0,0,0,0.45))`,
              opacity: piece.opacity,
            }}
            title="Click to Crunch!"
          >
            <div
              className="relative w-full h-full animate-bounce"
              style={{
                animationDuration: `${piece.speed}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
              }}
            >
              <Image
                src={piece.src}
                alt="3D Popped Makhana"
                fill
                sizes="120px"
                className="object-contain"
              />
            </div>
          </div>
        );
      })}

      {/* Dispersion crumb particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none animate-ping z-50"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};
