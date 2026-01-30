"use client";

import { useHeroContext } from "@/context/HeroContext";
import React, { useEffect, useRef } from "react";

export default function BrownianParticles() {
  const { isHeroShortened } = useHeroContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 120;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      radius: number = 0;
      baseAlpha: number = 0;
      alpha: number = 0;
      targetAlpha: number = 0;
      fadeSpeed: number = 0.005;
      wobbleX: number = 0;
      wobbleY: number = 0;
      wobbleSpeed: number = 0;

      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseAlpha = Math.random() * 0.3 + 0.1;
        this.alpha = 0;
        this.targetAlpha = this.baseAlpha;
        this.fadeSpeed = 0.005;
        this.wobbleX = Math.random() * Math.PI * 2;
        this.wobbleY = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.x += this.vx + Math.sin(this.wobbleX) * 0.1;
        this.y += this.vy + Math.cos(this.wobbleY) * 0.1;

        this.wobbleX += this.wobbleSpeed;
        this.wobbleY += this.wobbleSpeed;

        if (this.alpha < this.targetAlpha) {
          this.alpha += this.fadeSpeed;
        }

        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 2,
        );

        gradient.addColorStop(0, `rgba(255, 255, 245, ${this.alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 245, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-0 transition-opacity duration-1000 pointer-events-none ${
        isHeroShortened ? "opacity-80" : "opacity-0"
      }`}
    />
  );
}
