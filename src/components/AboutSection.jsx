import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import UnqText from "./UnqText";

export default function AboutSection({ containerRef }) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const playheadRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const borderProgress = useTransform(scrollYProgress, [0, 1], ["0 1", "1 0"]);

  const headingTracking = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0em", "0.06em"],
  );
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const bottomPlayheadX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const paragraph1 =
    "The Creative Force Behind the Lens Welcome to Shrinu Studio, where complex ideas are transformed into cinematic stories. Founded by Shrinivasan Tholkappian, a dedicated Post-Production Specialist, the studio is built on a simple philosophy: Visual storytelling should not just look good—it should drive results.";

  const paragraph2 =
    "With a deep-rooted passion for motion and imagery, Shrinivasan bridges the gap between technical precision and creative expression. Whether it’s a high-converting brand campaign, an intricate explainer video, or community-driven media, every project is crafted to capture attention and align with your business objectives.";

  return (
    <div
      ref={sectionRef}
      className={`bg-[#f0f1fa] text-[#000000] antialiased px-6 md:px-20 select-none ${
        isMobile ? "py-16" : "relative h-[250vh]"
      }`}
    >
      <motion.div
        className={`${
          isMobile
            ? "w-full flex flex-col justify-center items-center gap-8"
            : "sticky top-0 h-screen w-full flex flex-col justify-between py-12 overflow-hidden"
        }`}
      >
        {!isMobile && <div className="py-6"></div>}

        <div
          className={`flex flex-col lg:flex-row justify-between items-center w-full mx-auto gap-8 lg:gap-12 my-auto ${isMobile ? "" : "max-h-[75vh] lg:overflow-visible"}`}
        >
          {/* TEXT CONTENT CONTAINER */}
          <div className="w-full flex flex-col justify-center order-last lg:order-first">
            <div className="overflow-hidden py-1">
              <motion.div
                style={
                  isMobile
                    ? {}
                    : { letterSpacing: headingTracking, scale: headingScale }
                }
                className="text-[9vw] sm:text-[7vw] lg:text-[6vw] text-center lg:text-left font-black leading-none uppercase origin-left text-black tracking-tight"
              >
                <UnqText text={"About Studio"} />
              </motion.div>
            </div>

            <div className="overflow-hidden py-1 mt-2 lg:-mt-1">
              <motion.div
                style={
                  isMobile
                    ? {}
                    : { letterSpacing: headingTracking, scale: headingScale }
                }
                className="text-md sm:text-xl text-center lg:text-left lg:text-[2.75vw] font-bold text-[#0c23b7] origin-left tracking-tight leading-snug"
              >
                The Creative Force Behind the Lens
              </motion.div>
            </div>

            <div className="text-sm sm:text-base lg:text-[1.25vw] text-center lg:text-left font-medium pt-4 lg:pt-6 leading-relaxed space-y-4 text-black/70">
              <p>
                <ScrollHighlightWord
                  progress={scrollYProgress}
                  range={[0.1, 0.5]}
                  text={paragraph1}
                  disabled={isMobile}
                />
              </p>
              <p>
                <ScrollHighlightWord
                  progress={scrollYProgress}
                  range={[0.5, 0.9]}
                  text={paragraph2}
                  disabled={isMobile}
                />
              </p>
            </div>
          </div>

          {/* PORTRAIT PROFILE IMAGE CONSOLE CONTAINER */}
          <div
            className={`flex justify-center items-center relative order-first lg:order-last ${isMobile ? "w-full max-w-70 sm:max-w-[320px]" : "scale-90 xl:scale-100 origin-center"}`}
          >
            <div className="p-2 relative w-full">
              <div className="rounded-full overflow-hidden border-4 border-black relative z-10 bg-[#000000] w-full aspect-square lg:w-[30vw] lg:h-[60vh] lg:rounded-full shadow-xl">
                <img
                  src="/Shrinu.png"
                  alt="Shrinivasan Tholkappian"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border border-white/10 rounded-full m-2 md:m-4 pointer-events-none" />
                {!isMobile && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#ff9494] bg-[#000000]/90 px-2.5 py-1 rounded border border-white/10 tracking-widest uppercase shadow-md whitespace-nowrap">
                    SRC // PLAY
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {!isMobile && (
          <div className="w-full mx-auto mt-4 md:mt-6">
            <div className="w-full flex justify-between items-center font-mono text-[12px] text-[#000000]/50 mb-2 px-1">
              <div className="flex space-x-4 items-center">
                <span className="bg-[#000000] text-white px-1.5 py-0.5 rounded text-[12px] font-bold">
                  SHRINU
                </span>
                <span className="text-[#0c23b7] font-bold tracking-wider">
                  A_ROLL_ABOUT
                </span>
              </div>
              <div className="font-bold tracking-widest text-[#000000] tabular-nums bg-white border border-[#000000]/5 px-2 py-0.5 rounded">
                SHRINU_STUDIO
              </div>
            </div>

            <div className="w-full h-8 md:h-9 bg-[#000000] rounded-xl border border-white/10 relative shadow-2xl overflow-hidden flex items-center">
              <div className="absolute inset-0 w-full h-2.5 flex justify-between pointer-events-none px-3 top-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-0.5 bg-white/50 ${i % 5 === 0 ? "h-2.5 bg-[#ff9494]" : "h-1.5"}`}
                  />
                ))}
              </div>

              <div className="absolute left-[8%] right-[8%] h-4 md:h-5 bg-linear-to-r from-[#0c23b7]/80 to-[#ff9494]/80 rounded-md" />

              <motion.div
                style={{ left: bottomPlayheadX }}
                className="absolute top-0 bottom-0 w-1 bg-[#F0F1FA] z-20 pointer-events-none shadow-[0_0_12px_#F0F1FA]"
              >
                <div className="absolute -top-0.5 left-[-4.5px] w-3 h-3 bg-[#F0F1FA] rotate-45 rounded-xs" />
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ScrollHighlightWord({ text, progress, range, disabled }) {
  const words = text.split(" ");
  const totalWords = words.length;

  return (
    <>
      {words.map((word, i) => {
        if (disabled) {
          return (
            <span
              key={i}
              className="inline-block mr-[0.25em] text-black/80 font-medium"
            >
              {word}
            </span>
          );
        }

        const step = (range[1] - range[0]) / totalWords;
        const start = range[0] + step * i;
        const end = start + step;

        const opacity = useTransform(progress, [start, end], [0.35, 1]);
        const color = useTransform(
          progress,
          [start, end],
          ["rgba(0,0,0,0.4)", "rgba(0,0,0,1)"],
        );

        return (
          <motion.span
            key={i}
            style={{ opacity, color }}
            className="inline-block mr-[0.25em] transition-colors duration-150 ease-out font-medium"
          >
            {word}
          </motion.span>
        );
      })}
    </>
  );
}
