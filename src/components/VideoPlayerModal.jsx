"use client";
import MuxVideo from "@mux/mux-video-react";
import React, { useState, useRef, useEffect, useCallback } from "react";

export default function VideoPlayerModal({ video, onClose, onAutoAdvance }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const progressBarRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setSpeedMenu] = useState(false);
  const [ripple, setRipple] = useState({ type: "forward", active: false });
  const [countdown, setCountdown] = useState(null);
  const [glowColors, setGlowColors] = useState(
    "from-[#FF9494]/30 to-[#0C23B7]/30",
  );

  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    setShowControls(true);

    if (videoRef.current && !videoRef.current.paused) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setSpeedMenu(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, resetControlsTimeout]);

  useEffect(() => {
    setCountdown(null);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      videoRef.current.title = video.title;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [video, speed]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = video.thumbnailUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 2, 2);
      try {
        const p1 = ctx.getImageData(0, 0, 1, 1).data;
        const p2 = ctx.getImageData(1, 1, 1, 1).data;
        const color1 = `rgba(${p1[0]}, ${p1[1]}, ${p1[2]}, 0.25)`;
        const color2 = `rgba(${p2[0]}, ${p2[1]}, ${p2[2]}, 0.25)`;
        containerRef.current?.style.setProperty("--glow-c1", color1);
        containerRef.current?.style.setProperty("--glow-c2", color2);
        setGlowColors("custom");
      } catch (e) {
        setGlowColors("from-[#FF9494]/20 to-[#0C23B7]/20");
      }
    };
  }, [video]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    resetControlsTimeout();
  };

  const skipTime = (amount) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += amount;
    setRipple({ type: amount > 0 ? "forward" : "rewind", active: true });
    setTimeout(() => setRipple((r) => ({ ...r, active: false })), 500);
    resetControlsTimeout();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA")
        return;
      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          handlePlayPause();
          break;
        case "arrowright":
          e.preventDefault();
          skipTime(10);
          break;
        case "arrowleft":
          e.preventDefault();
          skipTime(-10);
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMuted, volume]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const changeSpeed = (rate) => {
    setSpeed(rate);
    setSpeedMenu(false);
    if (videoRef.current) videoRef.current.playbackRate = rate;
    resetControlsTimeout();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (video.nextVideoId && onAutoAdvance) setCountdown(5);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      if (video.nextVideoId && onAutoAdvance) onAutoAdvance(video.nextVideoId);
      return;
    }
    const interval = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(interval);
  }, [countdown, video.nextVideoId, onAutoAdvance]);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || isDragging) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total) {
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
    setIsVertical(videoRef.current.videoHeight > videoRef.current.videoWidth);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    videoRef.current.muted = nextMute;
    if (!nextMute && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const scrub = useCallback((clientX) => {
    if (!videoRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    let percentage = (clientX - rect.left) / rect.width;
    if (percentage < 0) percentage = 0;
    if (percentage > 1) percentage = 1;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
    setProgress(percentage * 100);
    setCurrentTime(formatTime(percentage * videoRef.current.duration));
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    scrub(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) scrub(e.clientX);
    };
    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scrub]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 transition-all duration-500 font-sans select-none opacity-100">
      <canvas ref={canvasRef} width="2" height="2" className="hidden" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes customRewindTrack {
          0% { transform: translate(-30%, -50%) scale(0.9); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-70%, -50%) scale(1.05); opacity: 0; }
        }
        @keyframes customForwardTrack {
          0% { transform: translate(30%, -50%) scale(0.9); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(70%, -50%) scale(1.05); opacity: 0; }
        }
        .animate-custom-rewind { animation: customRewindTrack 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-custom-forward { animation: customForwardTrack 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      `,
        }}
      />

      {/* Decorative Glow Layer */}
      <div
        className={`absolute inset-0 scale-110 blur-[120px] opacity-40 pointer-events-none transition-all duration-700 ${
          glowColors === "custom" ? "" : `bg-linear-to-tr ${glowColors}`
        }`}
        style={
          glowColors === "custom"
            ? {
                background: `linear-gradient(135deg, var(--glow-c1) 0%, var(--glow-c2) 100%)`,
              }
            : undefined
        }
      />

      {/* Main Container */}
      <div
        ref={containerRef}
        onMouseMove={resetControlsTimeout}
        onClick={resetControlsTimeout}
        className={`relative bg-black sm:bg-[#111111]/95 sm:border border-white/10 w-full h-full sm:rounded-xl overflow-hidden shadow-2xl transition-all duration-500 backdrop-blur-xl flex flex-col items-center justify-center group ${
          isVertical
            ? "sm:h-[85vh] sm:aspect-9/16 sm:max-w-full"
            : "sm:w-[85vw] md:w-[75vw] sm:aspect-video"
        }`}
      >
        {/* Top Header Bar */}
        <div
          className={`absolute top-0 inset-x-0 h-20 bg-linear-to-b from-black/90 via-black/50 to-transparent flex items-start justify-between p-4 z-30 transition-all duration-300 ${
            showControls
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <span className="text-white/95 font-medium tracking-wide truncate drop-shadow-md pt-1.5 pl-1 max-w-[75%] text-sm sm:text-base">
            {video.title}
          </span>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-[#FF9494] transition-all duration-200 h-10 w-10 rounded-full backdrop-blur-md focus:outline-none flex items-center justify-center shadow-lg active:scale-95 pointer-events-auto cursor-pointer"
            aria-label="Close Player"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Video Wrapper & Visual Overlays */}
        <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
          <MuxVideo
            playbackId={video.videoUrl}
            playsInline
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }}
            className="w-full h-full object-contain"
          />

          {/* Double Tap Skip Invisible Grid Areas */}
          <div className="absolute inset-0 flex pointer-events-auto z-10">
            <div
              className="w-1/2 h-full cursor-west-resize"
              onDoubleClick={() => skipTime(-10)}
            />
            <div
              className="w-1/2 h-full cursor-east-resize"
              onDoubleClick={() => skipTime(10)}
            />
          </div>

          {/* Skip Visual Ripple Feedbacks */}
          {ripple.active && (
            <div className="absolute inset-0 pointer-events-none z-30">
              {ripple.type === "rewind" ? (
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 bg-black/70 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 text-[#FF9494] text-xs font-mono font-bold flex items-center gap-2 shadow-2xl animate-custom-rewind">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
                  </svg>
                  <span>-10s</span>
                </div>
              ) : (
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 bg-black/70 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 text-[#0C23B7] text-xs font-mono font-bold flex items-center gap-2 shadow-2xl animate-custom-forward">
                  <span>+10s</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6-8.5-6z" />
                  </svg>
                </div>
              )}
            </div>
          )}

          {/* Autoplay Countdown Screen */}
          {countdown !== null && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-40 p-6">
              <div className="text-center max-w-sm px-4">
                <span className="text-xs uppercase font-bold tracking-widest text-[#FF9494]">
                  Up Next
                </span>
                <h4 className="text-lg sm:text-xl font-bold mt-2 mb-6 text-white/90">
                  Autoplay Upcoming Module
                </h4>
                <div className="w-16 h-16 rounded-full border-4 border-[#0C23B7] border-t-[#FF9494] flex items-center justify-center text-xl font-black mb-6 animate-pulse text-white">
                  {countdown}
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setCountdown(null)}
                    className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-xs transition-colors text-white/70 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (video.nextVideoId && onAutoAdvance)
                        onAutoAdvance(video.nextVideoId);
                    }}
                    className="px-4 py-2 bg-[#0C23B7] hover:bg-[#FF9494] rounded-lg text-xs font-bold transition-all text-white cursor-pointer"
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Controls Panel */}
          <div
            className={`absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-linear-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end transition-all duration-300 z-30 pointer-events-auto ${
              showControls
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            {/* Scrubber Timeline Area */}
            <div
              ref={progressBarRef}
              className="w-full h-3 group/timeline flex items-center mb-4 cursor-pointer relative"
              onMouseDown={handleMouseDown}
              onTouchStart={(e) => {
                setIsDragging(true);
                scrub(e.touches[0].clientX);
              }}
              onTouchMove={(e) => {
                if (isDragging) scrub(e.touches[0].clientX);
              }}
              onTouchEnd={() => setIsDragging(false)}
            >
              <div className="w-full h-1 bg-white/20 rounded-full transition-all group-hover/timeline:h-1.5 relative flex items-center">
                <div
                  className="h-full rounded-full relative flex items-center justify-end"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(90deg, #FF9494 0%, #0C23B7 100%)",
                  }}
                >
                  <div className="absolute -right-1.5 w-3 h-3 bg-white rounded-full shadow-md shadow-black scale-100 sm:scale-0 sm:group-hover/timeline:scale-100 transition-transform duration-100" />
                </div>
              </div>
            </div>

            {/* Layout Flex Blocks: Fully Responsive */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
              {/* Left Action Node: Timestamp & Playback Controls Together on Mobile */}
              <div className="flex items-center justify-between sm:justify-start sm:gap-6 w-full sm:w-auto">
                <div className="text-xs font-medium tracking-wider text-white/90 bg-white/5 backdrop-blur-md px-3 h-9 flex items-center rounded-lg border border-white/5 order-2 sm:order-1">
                  {currentTime} <span className="text-white/40 mx-1.5">/</span>{" "}
                  {duration}
                </div>

                {/* Central Primary Buttons Block */}
                <div className="flex items-center gap-4 order-1 sm:order-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      skipTime(-10);
                    }}
                    className="text-white/80 hover:text-[#FF9494] transition-colors focus:outline-none h-10 w-10 flex items-center justify-center cursor-pointer"
                    title="Rewind 10s"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause();
                    }}
                    className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-[#0C23B7] hover:bg-[#FF9494] rounded-full text-white transform hover:scale-105 transition-all duration-300 shadow-md focus:outline-none cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <svg
                        className={`absolute w-full h-full transition-all duration-300 transform ${isPlaying ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-45 opacity-0"}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        className={`absolute w-full h-full transition-all duration-300 transform ${!isPlaying ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-45 opacity-0"}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      skipTime(10);
                    }}
                    className="text-white/80 hover:text-[#FF9494] transition-colors focus:outline-none h-10 w-10 flex items-center justify-center cursor-pointer"
                    title="Forward 10s"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.934 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.334-4zM19.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Action Node: Settings, Volume, Screen Utilities */}
              <div className="flex items-center justify-end gap-3 w-full sm:w-auto border-t border-white/5 pt-3 sm:pt-0 sm:border-0">
                {/* Speed Menu Control Container */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSpeedMenu(!showSpeedMenu);
                    }}
                    className="text-xs font-bold text-white/90 bg-white/5 border border-white/5 hover:border-white/20 h-10 px-3 rounded-lg flex items-center gap-1 backdrop-blur-md transition-colors focus:outline-none cursor-pointer"
                  >
                    {speed}x
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-12 right-0 bg-[#111111] border border-white/10 rounded-lg p-1 shadow-2xl flex flex-col min-w-17.5 z-50 backdrop-blur-xl">
                      {[0.5, 1, 1.5, 2].map((v) => (
                        <button
                          key={v}
                          onClick={(e) => {
                            e.stopPropagation();
                            changeSpeed(v);
                          }}
                          className={`text-xs px-3 py-2 rounded-md text-left transition-colors font-medium cursor-pointer ${speed === v ? "text-[#FF9494] bg-white/5" : "text-white/70 hover:bg-white/5"}`}
                        >
                          {v}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  className="text-white/80 hover:text-white bg-white/5 border border-white/5 hover:border-white/20 w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer backdrop-blur-md transition-colors focus:outline-none"
                  title="Toggle Fullscreen"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8V4h4M16 4h4v4M4 16v4h4M16 20h4v-4"
                    />
                  </svg>
                </button>

                {/* Volume Module Block */}
                <div className="flex items-center gap-2 group/volume bg-white/5 backdrop-blur-md px-3 rounded-lg border border-white/5 h-10 transition-all duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="text-white/80 hover:text-white transition-colors focus:outline-none flex items-center justify-center"
                  >
                    {isMuted || volume === 0 ? (
                      <svg
                        className="w-4 h-4 text-[#FF9494]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V3.75z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                        />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                    className="hidden md:block w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#FF9494] transition-all duration-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
