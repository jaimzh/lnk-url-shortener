"use client";

import React, { useState } from "react";

export default function HeroAnimation() {
  const [isShortened, setIsShortened] = useState(false);

  return (
    <div
      className={`container-anim group cursor-pointer text-center select-none transition-all duration-700 ${isShortened ? "shortened" : ""}`}
      onClick={() => setIsShortened(!isShortened)}
    >

        <div className="hint mt-4  text-text-muted/30 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors group-hover:text-text-muted/60 ">
        {isShortened ? "" : "Ayyy yo that's a"}
      </div>
      <div className="url-box relative flex items-center justify-center whitespace-nowrap tracking-wide">
        <span className="char-lnk">l</span>
        <span className="char-filler">ooo</span>
        <span className="char-lnk">n</span>
        <span className="char-filler">g-lin</span>
        <span className="char-lnk">k</span>
        <span className="dot"></span>
      </div>

      <div className="hint mt-4  text-text-muted/30 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors group-hover:text-text-muted/60 animate-pulse">
        {isShortened ? "Click to expand" : "Click to shorten"}
      </div>

      <style>{`
        .url-box {
          font-size: clamp(3rem, 8vw, 4rem);
          color: #f1f1f1;
        }

        .char-lnk {
          display: inline-block;
          transition: all 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6);
          color: #666;
        }

        .char-filler {
          display: inline-block;
          max-width: 500px;
          opacity: 1;
          filter: blur(0px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          color: #666;
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
          width: clamp(20px, 8vw, 34px);
          height: clamp(20px, 8vw, 34px);
          margin-left: 0.05em;
          transform: translateY(0.12em);
        }

        @media (max-width: 768px) {
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
