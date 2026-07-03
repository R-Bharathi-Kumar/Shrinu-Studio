// components/CinematicLoader.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import ShrinuStudio from "./ShrinuStudio";

export default function CinematicLoader({ theaterState }) {
  // If the intro sequence is complete, fully unmount from the DOM
  if (theaterState === "show") return null;

  // Cinematic line-writing reveal variables for the brand signature
  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.2, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#000000] select-none pointer-events-none">
      {/* 1. CINEMA STAGE BACKLIGHT SHADOW */}
      <div
        className={`absolute inset-0 bg-radial-to-c from-[#0C23B7]/20 via-[#111111] to-black transition-opacity duration-1000 ease-out ${
          theaterState === "opening" ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 2. CURTAIN ENGINE LAYER */}
      {/* Left Dramatic Theater Curtain */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#111111] border-r border-white/10 shadow-[20px_0_40px_rgba(0,0,0,0.8)] transition-all duration-1200 ${
          theaterState === "opening"
            ? "-translate-x-full scale-y-105 skew-y-1"
            : "translate-x-0 scale-y-100 skew-y-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
          background:
            "linear-gradient(90deg, #0d0d0d 0%, #151515 90%, #1a1a1a 100%)",
        }}
      />

      {/* Right Dramatic Theater Curtain */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#111111] border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.8)] transition-all duration-1200 ${
          theaterState === "opening"
            ? "translate-x-full scale-y-105 -skew-y-1"
            : "translate-x-0 scale-y-100 skew-y-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
          background:
            "linear-gradient(270deg, #0d0d0d 0%, #151515 90%, #1a1a1a 100%)",
        }}
      />

      {/* 3. CENTERED CINEMATIC LOGO UNVEIL PROJECTION */}
      <div
        className={`flex flex-col items-center gap-8 transition-all duration-700 transform z-10 w-full max-w-sm px-6 ${
          theaterState === "opening"
            ? "opacity-0 -translate-y-8 scale-95 blur-xl"
            : "opacity-100 scale-100"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
      >
        {/* Massive Scale Hologram Logo Ring Structure */}
        <div className="relative w-48 h-48 p-6 rounded-full bg-linear-to-b from-white/3 via-white/1 to-transparent border border-white/10 shadow-[0_0_120px_rgba(255,148,148,0.35)] flex items-center justify-center backdrop-blur-xs group">
          {/* Decorative Spotlight Target Border Lines */}
          <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-4 border border-[#0C23B7]/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

          {/* Integrated Signature Self-Drawing Vector */}
          <div className="w-full h-full p-2 drop-shadow-[0_0_25px_rgba(255,148,148,0.6)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1041 1071"
              className="w-full h-full"
              fill="none"
            >
              <motion.path
                variants={pathVariants}
                initial="initial"
                animate="animate"
                stroke="#FF9494"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="55"
                d="M33.006 804.207C350.73 633.556 650.515 429.444 925.675 196.284c20.783-17.585 41.851-35.953 54.662-59.945s15.659-55.317-.071-77.601c-28.256-40.01-90.462-26.698-134.377-4.984-97.722 48.27-185.125 117.256-254.804 201.123-40.783 49.052-77.153 111.703-61.566 173.641 23.416 93.122 148.185 128.932 178.932 219.918 29.111 86.215-40.142 173.783-112.242 229.243-85.623 65.926-183.203 116.26-286.548 147.941-42.42 12.96-94.235 20.79-126.121-10.04-22.206-21.428-26.904-56.455-18.505-86.143 8.398-29.688 27.9-54.961 48.968-77.53C310.8 747.893 445.747 685.812 584.11 653.562c138.363-32.18 281.423-36.808 423.34-41.222"
              />
            </svg>
          </div>
        </div>
        <div className="text-center space-y-4">
          <div className="text-4xl text-nowrap text-white uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            <ShrinuStudio />
          </div>
        </div>
      </div>
    </div>
  );
}
