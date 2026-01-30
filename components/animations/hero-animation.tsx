"use client";

import { motion, AnimatePresence } from "motion/react";
import { useHeroContext } from "@/context/HeroContext";

export default function HeroAnimation() {
  const { isHeroShortened, setIsHeroShortened } = useHeroContext();

  return (
    <div
      className={`mb-8 container-anim group cursor-pointer text-center select-none transition-all duration-700 ${isHeroShortened ? "shortened" : ""}`}
      onClick={() => setIsHeroShortened(!isHeroShortened)}
    >
      {/* Top Hint */}
      <div className="hint mt-4 text-text-muted/60 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors ">
        {!isHeroShortened && "Ayyy yo that's a"}
      </div>
      <div className="url-box relative flex items-center justify-center whitespace-nowrap tracking-wide">
        <div className="ambient-glow" aria-hidden="true" />
        <span className="char-lnk">l</span>
        <span className="char-filler">ooo</span>
        <span className="char-lnk">n</span>
        <span className="char-filler">g-lin</span>
        <span className="char-lnk">k</span>
        <span className="dot"></span>
      </div>

      {/* Bottom Logic: Separate elements for different styles */}
      <div className="min-h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isHeroShortened ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-text-muted/60 text-sm md:text-base font-light tracking-wide max-w-lg leading-relaxed mt-3"
            >
             Turn long URLs into short, shareable links in seconds.
            </motion.p>
          ) : (
            <motion.p
              key="tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="text-text-muted/60 text-sm md:text-base font-light tracking-wide max-w-lg leading-relaxed"
            >
              Turn long URLs into short, shareable links in seconds.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .url-box {
          font-size: clamp(3rem, 8vw, 4rem);
          color: #f1f1f1;
        }

        .char-lnk {
          display: inline-block;
          transition: all 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6);
          color: var(--text-muted);
          z-index: 1;
        }

        .char-filler {
          display: inline-block;
          max-width: 500px;
          opacity: 1;
          filter: blur(0px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          color: var(--text-muted);
        }

        .shortened .char-filler {
          max-width: 0;
          opacity: 0;
          margin: 0;
          filter: blur(10px);
          pointer-events: none;
        }

        .shortened .char-lnk {
          font-size: clamp(4rem, 20vw, 8.5rem);
          letter-spacing: -0.05em;
          color: #ffffff;
          z-index: 1;
        }

        .dot {
          width: 0.2em;
          height: 0.2em;
          background-color: var(--accent);
          border-radius: 50%;
          display: inline-block;
          margin-left: 2px;
          transition: all 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6);
          transform: translateY(0.1em);
        }

        .shortened .dot {
          width: clamp(20px, 4vw, 34px);
          height: clamp(20px, 4vw, 34px);
          margin-left: 0.05em;
          transform: translateY(0.16em);
          
        }

        .ambient-glow {
          position: absolute;
          width: 140%;
          height: 140%;
          background: radial-gradient(circle at center, var(--accent) 0%, transparent 70%);
          filter: blur(80px);
          border-radius: 50%;
          opacity: 30;
          transform: scale(0.9);
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 0;
        }

        .shortened .ambient-glow {
          opacity: 0.9;
          transform: scale(1);
        }

        @media (max-widt: 768px) {
          .shortened .char-lnk {
            font-size: clamp(4rem, 18vw, 6rem);
            letter-spacing: -0.04em;
          }
          .shortened .dot {
            width: clamp(16px, 6vw, 24px);
            height: clamp(16px, 6vw, 24px);
            transform: translateY(0.08em);
          }
        }
      `}</style>
    </div>
  );
}
