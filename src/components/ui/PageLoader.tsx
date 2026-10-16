"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Flame } from "lucide-react";
import { soundFx } from "../../lib/audio/soundEffects";

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState("Selecting GI-Tagged Lotus Seeds...");
  const [isDone, setIsDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const seen = sessionStorage.getItem("korigo_loader_seen");
    if (seen === "true") {
      setHidden(true);
      return;
    }

    const stages = [
      { at: 15, text: "Selecting GI-Tagged Lotus Seeds..." },
      { at: 45, text: "Slow-Roasting to Ultra-Crisp Perfection..." },
      { at: 75, text: "Infusing Sassy Sriracha & Cheesy Herbs..." },
      { at: 95, text: "100% Slow-Roasted. Ready to Crunch!" },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setStageText("Crunch Ready!");
          soundFx.playCrunch();
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              setHidden(true);
              sessionStorage.setItem("korigo_loader_seen", "true");
            }, 600);
          }, 350);
          return 100;
        }

        const currentStage = stages.slice().reverse().find((s) => next >= s.at);
        if (currentStage) {
          setStageText(currentStage.text);
        }
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#021808] via-[#052e12] to-[#011105] text-white transition-all duration-700 ${
        isDone ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />

      {/* Floating 3D Makhana Stage */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Glowing 3D Orb Stage */}
        <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
          {/* Orbital rings */}
          <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-spin" style={{ animationDuration: "14s" }} />
          <div className="absolute inset-3 rounded-full border border-dashed border-amber-400/40 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />

          {/* Radial Warm Heat Aura */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-amber-500/30 via-emerald-500/30 to-lime-400/20 blur-xl animate-pulse" />

          {/* 3D Levitating & Rotating Makhana Pop */}
          <div className="relative w-28 h-28 animate-bounce transition-transform duration-300" style={{ animationDuration: "2.4s" }}>
            <Image
              src="/assets/korigo/makhana/makhana_roasted.png"
              alt="Korigo Roasted Makhana Pop"
              fill
              priority
              className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] filter brightness-105"
            />
          </div>

          {/* Orbiting spice sparkles */}
          <div className="absolute top-2 right-4 animate-ping">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div className="absolute bottom-4 left-3 animate-pulse">
            <Flame className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase font-serif font-black tracking-[0.25em] text-emerald-300">
            KORIGO SNACKS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight mb-2">
          The Slow-Roasted Revolution
        </h2>

        {/* Dynamic status text */}
        <p className="text-xs sm:text-sm font-serif text-emerald-200/80 min-h-[24px] mb-6 transition-all duration-200">
          {stageText}
        </p>

        {/* Glowing Progress Bar */}
        <div className="w-64 h-2 bg-emerald-950/80 rounded-full overflow-hidden p-0.5 border border-emerald-500/30 shadow-inner mb-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-400 transition-all duration-100 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-64 text-[11px] font-sans font-bold text-emerald-300/70">
          <span>100% NON-FRIED</span>
          <span>{progress}%</span>
          <span>9.7G PROTEIN</span>
        </div>

        {/* Skip button for convenience */}
        <button
          onClick={() => {
            setIsDone(true);
            setTimeout(() => {
              setHidden(true);
              sessionStorage.setItem("korigo_loader_seen", "true");
            }, 300);
          }}
          className="mt-8 text-[11px] uppercase font-sans tracking-wider text-emerald-400/60 hover:text-white underline underline-offset-4 transition"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
};
