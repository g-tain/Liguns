"use client";

/**
 * src/app/[locale]/gabung/page.tsx
 * 
 * Join Page wrapping the ApplyForm.
 */
import React from "react";
import { ApplyForm } from "@/components/organisms/ApplyForm";
import { Sparkles } from "lucide-react";

export default function JoinPage() {
  return (
    <div className="relative min-h-screen bg-ink pt-32 pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-gold/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/3 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 section-container">
        <div className="flex flex-col items-center gap-12">
          {/* Header Polish */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              <Sparkles className="w-3 h-3 text-gold" />
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Recruitment Hub</span>
            </div>
          </div>

          {/* The Form */}
          <ApplyForm />
        </div>
      </div>
    </div>
  );
}
