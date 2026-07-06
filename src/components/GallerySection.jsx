"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import UnqText from "./UnqText";
import VideoPlayerModal from "./VideoPlayerModal";
import MuxVideo from "@mux/mux-video-react";
const galleryData = [
  {
    id: 1,
    title: "Hyper-Motion - Advanced Dynamic Typography & VFX Edit",
    tech: "After Effects • Premiere Pro • Kinetic VFX",
    thumbnailUrl: "/Thumbnail/T4.png",
    videoUrl: "15k5ktuTsSWKyzsLX95pB5w1sBeqsxt14KUXuZswc02U",
    tools: ["Premiere Pro", "After Effects"],
    bgColor: "#000000",
    nextVideoId: 2,
  },
  {
    id: 2,
    title: "Dhurandhar - Narrative Rhythm Edit",
    tech: "Premiere Pro • Rhythm & Pacing",
    thumbnailUrl: "/Thumbnail/T1.jpg",
    videoUrl: "YZpaZekcIV8IkCRS02QS100UPefWsRwDtoLkFZgg00a00lo",
    tools: ["Premiere Pro"],
    bgColor: "#0a140f",
    nextVideoId: 3,
  },
  {
    id: 3,
    title: "Documentary - Mini-Doc Showcase (Vol. 1)",
    tech: "After Effects • Premiere Pro • Narrative Design",
    thumbnailUrl: "/Thumbnail/T3.png",
    videoUrl: "EBLe2vWEJGk7Qgb63DRox9er801tTjD8bpd9GZVn00NpQ",
    tools: ["Premiere Pro", "After Effects"],
    bgColor: "#050C3C",
    nextVideoId: 4,
  },
  {
    id: 4,
    title: "Social Media Reel - Short-Form Content Concepts (Vol. 1)",
    tech: "Premiere Pro • Vertical Content Engagement",
    thumbnailUrl: "/Thumbnail/T5.png",
    videoUrl: "ASUPqJKLL7vfnniF02N9x2Bc7JJ6s36j9Lwm7cQe009Do",
    tools: ["Premiere Pro"],
    bgColor: "#0a140f",
    nextVideoId: 5,
  },
  {
    id: 5,
    title: "Spider-Man - Cinematic Character Study",
    tech: "Premiere Pro • Narrative Editing & Sound Design",
    thumbnailUrl: "/Thumbnail/T2.jpg",
    videoUrl: "s5iuOtqFw5lPn6TS9qwbzl2VT8V44EK9SZTiiXMHziE",
    tools: ["Premiere Pro"],
    bgColor: "#050C3C",
    nextVideoId: 6,
  },
  {
    id: 6,
    title: "SnippySnap - 3D Motion Graphics",
    tech: "Blender • Logo 3D & Smooth Motion",
    thumbnailUrl: "/Thumbnail/T6.jpg",
    videoUrl: "smNRWej00ggnoBfI4N1utCZw5aqnagKyK8Tz8yCsksoo",
    tools: ["After Effect", "Blender"],
    bgColor: "#050C3C",
    nextVideoId: 7,
  },
  {
    id: 7,
    title: "Documentary - Mini-Doc Showcase (Vol. 2)",
    tech: "After Effects • Premiere Pro • Narrative Design",
    thumbnailUrl: "/Thumbnail/T7.png",
    videoUrl: "PkhS00orPMJNoPYZBGOe8WsKnrukCiQXe202jJ9c5la8U",
    tools: ["After Effects", "Premiere Pro"],
    bgColor: "#010101",
    nextVideoId: 1,
  },
];

export default function GallerySection({ containerRef }) {
  const [mounted, setMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleAutoAdvance = (nextId) => {
    const nextVideo = galleryData.find((v) => v.id === nextId);
    if (nextVideo) setActiveVideo(nextVideo);
    else setActiveVideo(null);
  };

  if (!mounted) {
    return (
      <section className="bg-black min-h-screen w-full flex items-center px-6 md:px-24">
        <div className="text-white select-none opacity-40">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase italic">
            // DATABASE INDEX
          </span>
          <h3 className="text-4xl md:text-7xl font-black uppercase italic mt-2 leading-[0.9]">
            Studio's <br /> Gallery
          </h3>
        </div>
      </section>
    );
  }

  return (
    <>
      {containerRef?.current && (
        <HydratedScrollContent
          containerRef={containerRef}
          onSelectVideo={setActiveVideo}
        />
      )}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeVideo && (
              <VideoPlayerModal
                video={activeVideo}
                onClose={() => setActiveVideo(null)}
                onAutoAdvance={handleAutoAdvance}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function HydratedScrollContent({ containerRef, onSelectVideo }) {
  const sectionRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  useLayoutEffect(() => {
    if (!scrollTrackRef.current) return;

    const calculateRange = () => {
      const trackWidth = scrollTrackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setScrollRange(trackWidth - viewportWidth + viewportWidth * 0.1);
    };

    calculateRange();
    window.addEventListener("resize", calculateRange);
    return () => window.removeEventListener("resize", calculateRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.4,
  });

  const xTranslation = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);
  const playheadLeft = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const scrollSteps = galleryData.map((_, i) => i / (galleryData.length - 1));
  const backgroundColor = useTransform(
    smoothProgress,
    scrollSteps,
    galleryData.map((v) => v.bgColor),
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor }}
      className="relative h-[400vh] block transition-colors duration-700 ease-out"
    >
      <div className="sticky top-0 left-0 h-screen w-full flex flex-col justify-between py-12 overflow-hidden z-20 px-4 md:px-20">
        <div className="grow-0 h-12" />

        <div className="flex flex-col justify-center w-full my-auto space-y-8">
          <div className="text-[4vw] font-black text-left uppercase tracking-tight text-[#ff9494] leading-none">
            <UnqText text={"Studio's Gallery"} />
          </div>
          <div className="h-2 w-full bg-linear-to-r from-[#ff9494] mb-10"></div>
          <div className="w-full flex items-center relative z-10 overflow-visible">
            <motion.div
              ref={scrollTrackRef}
              style={{ x: xTranslation }}
              className="flex gap-12 md:gap-16 will-change-transform pl-[10vw]"
            >
              {galleryData.map((video) => (
                <VideoGalleryCard
                  key={video.id}
                  video={video}
                  onSelect={onSelectVideo}
                />
              ))}
            </motion.div>
          </div>
        </div>

        <div className="w-full flex flex-col mt-auto select-none">
          <div className="w-full flex justify-between items-center font-mono text-[12px] text-white/40 mb-2 px-1">
            <div className="flex space-x-4 items-center">
              <span className="bg-[#ffffff] text-black px-1.5 py-0.5 rounded text-[11px] font-bold tracking-wider">
                SHRINU
              </span>
              <span className="text-[#ff9494] font-bold tracking-wider">
                V1_GALLERY_STREAM
              </span>
            </div>
            <div className="font-bold tracking-widest text-white/80 tabular-nums bg-white/5 border border-white/5 px-2.5 py-0.5 rounded backdrop-blur-md">
              SHRINU_STUDIO
            </div>
          </div>

          <div className="w-full h-8 md:h-9 bg-[#F0F1FA] rounded-xl relative shadow-2xl overflow-hidden flex items-center">
            <div className="absolute inset-0 w-full h-2.5 flex justify-between pointer-events-none px-3 top-0">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className={`w-0.5 bg-[#000000]/50 ${i % 6 === 0 ? "h-2.5 bg-[#000000]" : "h-1.5"}`}
                />
              ))}
            </div>

            <div className="absolute left-[6%] right-[6%] h-4 md:h-5 bg-linear-to-r from-[#0c23b7] to-[#ff9494] rounded-md" />

            <motion.div
              style={{ left: playheadLeft }}
              className="absolute top-0 bottom-0 w-1 bg-[#000000] z-20 pointer-events-none shadow-[0_0_12px_#000000]"
            >
              <div className="absolute -top-0.5 left-[-4.5px] w-3 h-3 bg-[#000000] rotate-45 rounded-xs" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function VideoGalleryCard({ video, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const previewVideoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (previewVideoRef.current) {
      previewVideoRef.current.currentTime = 0;
      previewVideoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }
  };

  return (
    <div
      onClick={() => onSelect(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer w-[80vw] md:w-[35vw] shrink-0 flex flex-col gap-4 md:gap-5 group select-none relative"
    >
      <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-[#FF9494]/60 bg-[#07070a] shadow-[0_0_50px_rgba(12,35,183,0.4)] group-hover:shadow-[0_0_50px_rgba(255,148,148,0.4)]">
        <motion.img
          src={video.thumbnailUrl}
          alt={video.title}
          animate={{
            scale: isHovered ? 1.04 : 1,
            filter: isHovered ? "contrast(100%)" : "contrast(110%)",
            opacity: isHovered ? 0 : 0.85,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full object-cover absolute inset-0 z-0 object-center"
        />

        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          {/* <video
            ref={previewVideoRef}
            src={video.videoUrl}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          /> */}
          <MuxVideo
            playbackId={video.videoUrl} // Just paste the ID, not the whole URL
            ref={previewVideoRef}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all duration-500 z-10">
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 0.95 }}
            className="rounded-full bg-black/80 group-hover:bg-[#0C23B7] flex items-center justify-center transition-all duration-300 shadow-2xl p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-[#FFFFFF] fill-current"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="currentColor"
                strokeWidth="1.5"
              ></circle>
              <path
                d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                fill="#0C23B7"
              ></path>
            </svg>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 relative z-10">
        <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#FF9494] transition-colors duration-300 line-clamp-1">
          {video.title}
        </h3>

        <div className="flex flex-wrap gap-2 pt-1">
          {video.tools.map((tool, index) => (
            <span
              key={index}
              className="bg-white/5 border border-white/10 text-white/80 font-mono font-bold uppercase text-[9px] px-2.5 py-1 rounded-md tracking-wider shadow-sm transition-all duration-300 group-hover:bg-[#0C23B7]/20 group-hover:border-[#FF9494]/30 group-hover:text-[#FF9494]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
