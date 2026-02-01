"use client";

import { useState } from "react";
import { Globe, Zap, Shield, BarChart3, Binary, User } from "lucide-react";
import MarkdownRenderer from "@/components/shared/markdown-renderer";

interface HowItWorksClientProps {
  markdownContent: string;
}

export default function HowItWorksClient({
  markdownContent,
}: HowItWorksClientProps) {
 
  const [view, setView] = useState<"user" | "technical">("user");


  const steps = [
    {
      icon: <Globe className="w-6 h-6 text-accent" />,
      title: "1. Paste your link",
      description: "Enter any long URL into the input field on the home page.",
    },
    {
      icon: <Zap className="w-6 h-6 text-accent" />,
      title: "2. Shorten & Customize",
      description:
        "Click shorten or provide a custom alias to make your link unique.",
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "3. Share Securely",
      description:
        "Copy your new link and share it anywhere. Your links are safe and fast.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-accent" />,
      title: "4. Track Analytics",
      description:
        "Monitor your link's performance with real-time click tracking.",
    },
  ];

  return (
    <div className="space-y-12">
     
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-bg-base/50 border border-white/5 backdrop-blur-md rounded-2xl">
          <button
            onClick={() => setView("user")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
              view === "user"
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "text-text-muted hover:text-text-base hover:bg-white/5"
            }`}
          >
            <User size={16} />
            User Guide
          </button>

          <button
            onClick={() => setView("technical")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
              view === "technical"
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "text-text-muted hover:text-text-base hover:bg-white/5"
            }`}
          >
            <Binary size={16} />
            My Docs
          </button>
        </div>
      </div>

      {/* --- THE CONTENT VIEW --- */}
      {view === "user" ? (
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-bg-base/30 border border-white/5 backdrop-blur-sm hover:border-accent/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-text-base mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-text-muted leading-relaxed font-light text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        
        <div className="p-8 md:p-12 rounded-[2.5rem] bg-bg-base/30 border border-white/5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        

        <MarkdownRenderer content={markdownContent} />

          
        </div>
      )}
    </div>
  );
}
