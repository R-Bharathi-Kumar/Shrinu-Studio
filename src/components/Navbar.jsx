// components/Navbar.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShrinuStudio from "./ShrinuStudio";
import UnqText from "./UnqText";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuContainerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const itemTextVariants = {
    initial: { y: 0, rotateX: 0 },
    hover: { y: -25, rotateX: 75 },
  };

  const itemTextHoverVariants = {
    initial: { y: 25, rotateX: -75, opacity: 0 },
    hover: { y: 0, rotateX: 0, opacity: 1 },
  };

  const arrowVariants = {
    initial: { x: -10, opacity: 0 },
    hover: { x: 0, opacity: 1 },
  };

  useEffect(() => {
    const sections = ["home", "about-me", "gallery", "contact"];

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-3 md:py-4 px-4 md:px-6 bg-[#111111]/50 backdrop-blur-lg mx-4 md:mx-20 rounded-full shadow-[0_0_50px_rgba(255,148,148,0.4)]">
      <div className="flex items-center justify-between">
        <button className="cursor-pointer">
          <ShrinuStudio
            textSize={"text-2xl md:text-3xl text-[#F0F1FA] leading-8 pt-1"}
          />
        </button>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <motion.a
              whileHover="hover"
              href="#contact"
              initial="initial"
              className="relative overflow-hidden cursor-pointer flex justify-center items-center text-[#000000] uppercase tracking-wide bg-[#FF9494] hover:bg-[#F0F1FA] transition-colors duration-200 py-2 rounded-full min-w-36 h-11 font-medium"
            >
              <div className="absolute left-4 w-5 h-5 flex items-center justify-center">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-[#0C23B7]"
                  fill="none"
                  variants={{
                    initial: { x: -20, opacity: 0 },
                    hover: { x: 0, opacity: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  <path
                    d="M18.5 12L4.99997 12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </div>
              <motion.div
                variants={{
                  initial: { x: -8 },
                  hover: { x: 8 },
                }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <UnqText text={"Let's Talk"} />
              </motion.div>
              <div className="absolute right-5 w-2 h-2 flex items-center justify-center">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 h-2 text-[#0C23B7]"
                  fill="none"
                  viewBox="0 0 40 40"
                  variants={{
                    initial: { x: 0, opacity: 1 },
                    hover: { x: 20, opacity: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  <rect width="40" height="40" fill="currentColor" rx="20" />
                </motion.svg>
              </div>
            </motion.a>
          </div>
          <div ref={menuContainerRef} className="relative">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={isOpen ? {} : "hover"}
              transition={{ duration: 0.1 }}
              className={`group relative overflow-hidden cursor-pointer flex justify-center items-center text-[#000000] uppercase tracking-wide py-2 md:pl-6 p-2.5 md:pr-4 rounded-full min-w-11 md:min-w-30 h-11 aspect-square md:aspect-auto select-none z-20 ${isOpen ? "bg-[#0C23B7]" : "bg-[#FF9494] hover:bg-[#0C23B7]"} transition-all duration-200 font-medium`}
            >
              {/* DESKTOP LABEL BOX SLIDE SWITCH */}
              <div className="hidden md:flex relative flex-1 items-center justify-start h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.div
                      key="menu-text"
                      initial={{ y: 20, rotateX: -90, opacity: 0 }}
                      animate={{ y: 0, rotateX: 0, opacity: 1 }}
                      exit={{ y: -20, rotateX: 90, opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className={`absolute origin-center ${isOpen ? "" : "text-[#000000] group-hover:text-[#F0F1FA]"} transition-all duration-200`}
                    >
                      <UnqText text={"Menu"} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="close-text"
                      initial={{ y: 20, rotateX: -90, opacity: 0 }}
                      animate={{ y: 0, rotateX: 0, opacity: 1 }}
                      exit={{ y: -20, rotateX: 90, opacity: 0 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      className="absolute origin-center font-bold text-[#F0F1FA]"
                    >
                      <UnqText text={"Close"} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* HOVER & STATE CONTROLLED TWO-DOT TRIGGER SVG */}
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                variants={{
                  hover: { rotate: 90 },
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-5 h-5 flex items-center justify-center md:ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 94"
                  className={`w-1.5 md:w-2 h-5 md:h-6 ${isOpen ? "text-[#F0F1FA]" : "text-[#0C23B7] group-hover:text-[#F0F1FA]"} transition-all duration-300`}
                  fill="none"
                >
                  <rect width="40" height="40" fill="currentColor" rx="20" />
                  <rect
                    width="40"
                    height="40"
                    y="54"
                    fill="currentColor"
                    rx="20"
                  />
                </svg>
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {isOpen && (
                <div className="absolute top-full md:mt-3 mt-1 right-0 w-72 md:w-80 flex flex-col gap-2.5 z-10 origin-top-right">
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: 15,
                      scale: 0.95,
                      transition: { duration: 0.15, ease: "easeInOut" },
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    className="bg-[#FFFFFF] text-[#000000] rounded-3xl md:rounded-4xl p-3 md:p-4 shadow-2xl border border-black/5 flex flex-col gap-0.5"
                  >
                    <motion.a
                      href="#home"
                      initial="initial"
                      whileHover="hover"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xl md:text-2xl font-medium tracking-tight text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer overflow-hidden group/item"
                    >
                      <div className="relative h-7 md:h-8 flex-1 overflow-hidden">
                        <motion.div
                          variants={itemTextVariants}
                          transition={{ duration: 0.25 }}
                        >
                          Home
                        </motion.div>
                        <motion.div
                          variants={itemTextHoverVariants}
                          transition={{ duration: 0.25 }}
                          className="absolute top-0 left-0 text-[#0C23B7] font-medium"
                        >
                          Home
                        </motion.div>
                      </div>
                      <div className="relative w-5 h-5 flex items-center justify-center">
                        <motion.div
                          variants={{
                            initial: {
                              scale: activeSection === "home" ? 1 : 0,
                              opacity: activeSection === "home" ? 1 : 0,
                            },
                            hover: { scale: 0, opacity: 0 },
                          }}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full absolute"
                        />
                        <motion.svg
                          variants={arrowVariants}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-[#0C23B7] absolute"
                          fill="none"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </div>
                    </motion.a>
                    <motion.a
                      href="#about-studio"
                      initial="initial"
                      whileHover="hover"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xl md:text-2xl font-medium tracking-tight text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer overflow-hidden group/item"
                    >
                      <div className="relative h-7 md:h-8 flex-1 overflow-hidden">
                        <motion.div
                          variants={itemTextVariants}
                          transition={{ duration: 0.25 }}
                        >
                          About Studio
                        </motion.div>
                        <motion.div
                          variants={itemTextHoverVariants}
                          transition={{ duration: 0.25 }}
                          className="absolute top-0 left-0 text-[#0C23B7] font-medium"
                        >
                          About Studio
                        </motion.div>
                      </div>
                      <div className="relative w-5 h-5 flex items-center justify-center">
                        <motion.div
                          variants={{
                            initial: {
                              scale: activeSection === "about-studio" ? 1 : 0,
                              opacity: activeSection === "about-studio" ? 1 : 0,
                            },
                            hover: { scale: 0, opacity: 0 },
                          }}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full absolute"
                        />
                        <motion.svg
                          variants={arrowVariants}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-[#0C23B7] absolute"
                          fill="none"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </div>
                    </motion.a>
                    <motion.a
                      href="#gallery"
                      initial="initial"
                      whileHover="hover"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xl md:text-2xl font-medium tracking-tight text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer overflow-hidden group/item"
                    >
                      <div className="relative h-7 md:h-8 flex-1 overflow-hidden">
                        <motion.div
                          variants={itemTextVariants}
                          transition={{ duration: 0.25 }}
                        >
                          Studio's Gallery
                        </motion.div>
                        <motion.div
                          variants={itemTextHoverVariants}
                          transition={{ duration: 0.25 }}
                          className="absolute top-0 left-0 text-[#0C23B7] font-medium"
                        >
                          Studio's Gallery
                        </motion.div>
                      </div>
                      <div className="relative w-5 h-5 flex items-center justify-center">
                        <motion.div
                          variants={{
                            initial: {
                              scale: activeSection === "gallery" ? 1 : 0,
                              opacity: activeSection === "gallery" ? 1 : 0,
                            },
                            hover: { scale: 0, opacity: 0 },
                          }}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full absolute"
                        />
                        <motion.svg
                          variants={arrowVariants}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-[#0C23B7] absolute"
                          fill="none"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </div>
                    </motion.a>
                    <motion.a
                      href="#Production-Engine"
                      initial="initial"
                      whileHover="hover"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xl md:text-2xl font-medium tracking-tight text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer overflow-hidden group/item"
                    >
                      <div className="relative h-7 md:h-8 flex-1 overflow-hidden">
                        <motion.div
                          variants={itemTextVariants}
                          transition={{ duration: 0.25 }}
                        >
                          Production Engine
                        </motion.div>
                        <motion.div
                          variants={itemTextHoverVariants}
                          transition={{ duration: 0.25 }}
                          className="absolute top-0 left-0 text-[#0C23B7] font-medium"
                        >
                          Production Engine
                        </motion.div>
                      </div>
                      <div className="relative w-5 h-5 flex items-center justify-center">
                        <motion.div
                          variants={{
                            initial: {
                              scale:
                                activeSection === "Production-Engine" ? 1 : 0,
                              opacity:
                                activeSection === "Production-Engine" ? 1 : 0,
                            },
                            hover: { scale: 0, opacity: 0 },
                          }}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full absolute"
                        />
                        <motion.svg
                          variants={arrowVariants}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-[#0C23B7] absolute"
                          fill="none"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </div>
                    </motion.a>
                    <motion.a
                      href="#contact"
                      initial="initial"
                      whileHover="hover"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xl md:text-2xl font-medium tracking-tight text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer overflow-hidden group/item"
                    >
                      <div className="relative h-7 md:h-8 flex-1 overflow-hidden">
                        <motion.div
                          variants={itemTextVariants}
                          transition={{ duration: 0.25 }}
                        >
                          Contact Me
                        </motion.div>
                        <motion.div
                          variants={itemTextHoverVariants}
                          transition={{ duration: 0.25 }}
                          className="absolute top-0 left-0 text-[#0C23B7] font-medium"
                        >
                          Contact Me
                        </motion.div>
                      </div>
                      <div className="relative w-5 h-5 flex items-center justify-center">
                        <motion.div
                          variants={{
                            initial: {
                              scale: activeSection === "contact" ? 1 : 0,
                              opacity: activeSection === "contact" ? 1 : 0,
                            },
                            hover: { scale: 0, opacity: 0 },
                          }}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full absolute"
                        />
                        <motion.svg
                          variants={arrowVariants}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-[#0C23B7] absolute"
                          fill="none"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </div>
                    </motion.a>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 26,
                      delay: 0.02,
                    }}
                    className="flex md:hidden bg-[#FFFFFF] text-black rounded-3xl p-3 shadow-2xl border border-black/5 flex-col"
                  >
                    <motion.a
                      href="#contact"
                      initial="initial"
                      whileHover="hover"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl text-xl font-semibold tracking-tight text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer overflow-hidden group/item"
                    >
                      <div className="relative h-7 flex-1 overflow-hidden">
                        <motion.div
                          variants={itemTextVariants}
                          transition={{ duration: 0.25 }}
                        >
                          Let's Talk
                        </motion.div>
                        <motion.div
                          variants={itemTextHoverVariants}
                          transition={{ duration: 0.25 }}
                          className="absolute top-0 left-0 text-[#0C23B7] font-bold"
                        >
                          Let's Talk
                        </motion.div>
                      </div>
                      <div className="w-5 h-5 flex items-center justify-center text-black">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-[#111111]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </div>
                    </motion.a>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 26,
                      delay: 0.04,
                    }}
                    className="bg-[#FFFFFF] text-black rounded-3xl md:rounded-4xl p-5 md:p-6 shadow-2xl border border-black/5 flex flex-col gap-4"
                  >
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight leading-7 md:leading-8 text-black">
                      Subscribe to my newsletter
                    </h3>

                    <form
                      onSubmit={handleSubscribe}
                      className="relative flex flex-col gap-2"
                    >
                      <div className="relative flex items-center bg-[#111111]/5 rounded-xl md:rounded-2xl p-3 pl-4 pr-12 focus-within:ring-2 focus-within:ring-[#0C23B7] transition-all duration-300">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={
                            status === "loading" || status === "success"
                          }
                          placeholder="Your email"
                          className="bg-transparent w-full outline-none text-black text-base md:text-lg placeholder-black/30 disabled:opacity-50"
                        />
                        <button
                          type="submit"
                          disabled={
                            status === "loading" || status === "success"
                          }
                          className="absolute right-4 p-1 text-black hover:text-[#0C23B7] hover:translate-x-1 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-x-0"
                        >
                          {status === "loading" ? (
                            // Simple loading spinner
                            <svg
                              className="animate-spin h-5 w-5 text-[#0C23B7]"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="w-5 h-5"
                              fill="none"
                            >
                              <path
                                d="M5 12h14M12 5l7 7-7 7"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {status === "success" && (
                        <p className="text-[#0C23B7] text-xs font-bold pl-2 tracking-wide">
                          Successfully subscribed!
                        </p>
                      )}
                      {status === "error" && (
                        <p className="text-[#FF9494] text-xs font-bold pl-2 tracking-wide">
                          Something went wrong. Try again.
                        </p>
                      )}
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
