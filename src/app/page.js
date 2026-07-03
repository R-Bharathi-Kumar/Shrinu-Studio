// app/page.js
// Change the h-screen overflow-y-auto container to standard document flow if possible:
// If you want to keep the custom scrollbar classes on that container, we need to create a Ref.

"use client";
import React, { useState, useEffect, useRef } from "react";
import HomeSection from "@/components/HomeSection";
import Navbar from "@/components/Navbar";
import CinematicLoader from "@/components/CinematicLoader";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import ExpoSection from "@/components/ExpoSection";

export default function Home() {
  const [theaterState, setTheaterState] = useState("loading");
  const scrollContainerRef = useRef(null); // Create the scroll container reference

  useEffect(() => {
    const openingTimer = setTimeout(() => setTheaterState("opening"), 2600);
    const showTimer = setTimeout(() => setTheaterState("show"), 3800);

    return () => {
      clearTimeout(openingTimer);
      clearTimeout(showTimer);
    };
  }, []);

  return (
    <>
      <CinematicLoader theaterState={theaterState} />
      <div
        ref={scrollContainerRef}
        className="scroll-smooth h-screen overflow-y-auto bg-[#000000] md:[&::-webkit-scrollbar]:w-2 md:[&::-webkit-scrollbar-track]:bg-[#ff9494] md:[&::-webkit-scrollbar-thumb]:bg-black"
      >
        <div
          className={`transition-all duration-1000 ${
            theaterState !== "show"
              ? "opacity-0 scale-95 blur-xs"
              : "opacity-100 scale-100 blur-none"
          }`}
        >
          <div className="sticky top-4 right-0 z-50 w-full">
            <Navbar />
          </div>

          <div>
            <div id="home">
              <HomeSection />
            </div>
            <div id="about-studio">
              <AboutSection containerRef={scrollContainerRef} />
            </div>
            <div id="gallery">
              <GallerySection containerRef={scrollContainerRef} />
            </div>
            <div id="Production-Engine">
              <ExpoSection />
            </div>
            <div id="contact">
              <ContactSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
