"use client";
import React, { useState } from "react";
import UnqText from "./UnqText";
import { motion, AnimatePresence } from "framer-motion";

const socialLinks = [
  {
    id: 1,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shrinivasan-tholkappian-636836410/",
    color: "#0A66C2",
  },
  {
    id: 2,
    name: "Behance",
    url: "https://www.behance.net/shrinivtholkap",
    color: "#0057ff",
  },
];

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const ownEmail = "shrinu.editor@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ownEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Resets after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setMessage("");
        // Optional: Reset status back to idle after a few seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050508] text-white flex flex-col justify-between select-none relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-[#FF9494]/5 blur-[150px] pointer-events-none" />
      <div className="w-full pt-24 pb-16 px-6 md:px-20 grow flex flex-col justify-center">
        <div className="w-full flex flex-col space-y-2 mb-12">
          <span className="text-[10px] font-mono font-bold text-[#FF9494] tracking-[0.4em] uppercase">
            // INITIATE TRANSMISSION
          </span>
          <div className="text-[8vw] lg:text-[5vw] font-black uppercase tracking-tight text-white leading-none">
            <UnqText text={"Contact Me"} />
          </div>
          <div className="h-1 w-full bg-linear-to-r from-[#FF9494] via-[#0C23B7] to-[#FF9494] opacity-50 mt-2" />
        </div>

        <div className="w-full max-w-6xl mx-auto relative z-10">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 relative group">
              <label className="text-xs text-[#F0F1FA]/60 group-focus-within:text-[#FF9494] transition-colors duration-300 tracking-widest uppercase font-bold">
                // SOURCE_EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                placeholder="Enter your email address"
                className="w-full bg-[#0c0c12] font-medium border border-white/10 rounded-xl px-4 py-3 text-sm text-[#FF9494] placeholder-white/30 focus:outline-none focus:border-[#FF9494] focus:ring-1 focus:ring-[#FF9494] transition-all duration-300 shadow-2xl disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col space-y-2 relative group">
              <label className="text-xs text-[#F0F1FA]/60 group-focus-within:text-[#FF9494] transition-colors duration-300 tracking-widest uppercase font-bold">
                // METADATA_MESSAGE
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === "loading"}
                rows={4}
                placeholder="Type your message overlay here..."
                className="w-full bg-[#0c0c12] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF9494] focus:ring-1 focus:ring-[#FF9494] transition-all duration-300 resize-none shadow-2xl disabled:opacity-50"
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <p className="text-[#FF9494] text-xs font-bold tracking-widest uppercase text-center">
                Transmission Successful!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-xs font-bold tracking-widest uppercase text-center">
                Transmission Failed. Try Again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full bg-[#0C23B7] hover:bg-[#FF9494] h-12 rounded-xl flex items-center justify-center cursor-pointer relative group/btn overflow-hidden transition-all duration-500 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-xs font-medium tracking-[10px] flex h-[1.1em] overflow-hidden relative">
                {(status === "loading" ? "SENDING..." : "SEND MESSAGE")
                  .split("")
                  .map((letter, i) => (
                    <span
                      key={i}
                      className="relative block whitespace-pre transition-transform duration-500 ease-[0.16,1,0.3,1]"
                    >
                      <span
                        className="block text-white group-hover/btn:-translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1]"
                        style={{ transitionDelay: `${i * 15}ms` }}
                      >
                        {letter}
                      </span>
                      <span
                        className="block absolute top-full mt-0.5 left-0 text-[#010101] font-semibold group-hover/btn:-translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1]"
                        style={{ transitionDelay: `${i * 15}ms` }}
                      >
                        {letter}
                      </span>
                    </span>
                  ))}
              </div>
              <div className="absolute inset-0 bg-[#0C23B7]/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer code remains exactly the same as your original */}
      <div className="w-full bg-[#0C23B7] text-[#F0F1FA] rounded-t-[40px] md:rounded-t-[3.5rem] px-6 md:px-24 pt-12 pb-10 relative shadow-[0_-20px_50px_rgba(12,35,183,0.3)] z-20">
        <div className="w-full flex justify-between items-center text-[9px] md:text-sm text-[#FF9494] tracking-[0.25em] mb-8 pb-3 border-b-2 border-[#010101]">
          {/* Left side text remains static */}
          <UnqText text={"Shrinu Studio // All Rights Reserved"} />

          {/* Interactive Email Copy Section */}
          <button
            onClick={handleCopy}
            className="relative cursor-pointer transition-opacity hover:opacity-80 active:scale-95 focus:outline-none"
            aria-label="Copy email address"
          >
            <AnimatePresence mode="wait">
              {!copied ? (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  <UnqText text={ownEmail} />
                </motion.div>
              ) : (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="text-[#f0f1fa] font-bold" // Pop of your electric blue to signal action success
                >
                  COPIED!
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group/social bg-black/50 hover:bg-black h-10 px-5 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg relative overflow-hidden"
              >
                <div className="text-xs font-bold tracking-widest flex h-[1.1em] overflow-hidden relative z-10">
                  {social.name.split("").map((letter, i) => (
                    <span key={i} className="relative block whitespace-pre">
                      <span
                        className="block text-white/70 group-hover/social:-translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1]"
                        style={{ transitionDelay: `${i * 12}ms` }}
                      >
                        {letter}
                      </span>
                      <span
                        className="block absolute top-full left-0 mt-0.5 font-black group-hover/social:-translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1]"
                        style={{
                          transitionDelay: `${i * 12}ms`,
                          color: social.color,
                        }}
                      >
                        {letter}
                      </span>
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="bg-black hover:bg-white border border-transparent hover:border-white/10 h-11 px-7 rounded-xl flex items-center justify-center text-xs font-bold tracking-[0.2em] group/resume shadow-2xl transition-all duration-500"
          >
            <div className="flex h-[1.1em] overflow-hidden relative z-10">
              {"RESUME.PDF".split("").map((letter, i) => (
                <span key={i} className="relative block whitespace-pre">
                  <span
                    className="block text-[#FF9494] group-hover/resume:-translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1]"
                    style={{ transitionDelay: `${i * 12}ms` }}
                  >
                    {letter}
                  </span>
                  <span
                    className="block absolute top-full mt-0.5 left-0 text-black font-black group-hover/resume:-translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1]"
                    style={{ transitionDelay: `${i * 12}ms` }}
                  >
                    {letter}
                  </span>
                </span>
              ))}
            </div>
          </a>
        </div>
      </div>
      <div className="bg-[#0C23B7] text-[10px] py-1 text-center tracking-widest font-medium">
        <UnqText text={"Developed by R Bharathi Kumar"} />
      </div>
    </div>
  );
}
