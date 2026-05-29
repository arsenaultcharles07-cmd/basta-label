import React from "react";
import { Sparkles, Eye, EyeOff, LayoutTemplate } from "lucide-react";

interface AnnotationsToggleProps {
  showAnnotations: boolean;
  setShowAnnotations: (show: boolean) => void;
}

export default function AnnotationsToggle({
  showAnnotations,
  setShowAnnotations,
}: AnnotationsToggleProps) {
  return (
    <div className="bg-[#0d0d0b] text-[#f4f1ea] border-b border-[#2b2b27] px-6 py-2.5 flex flex-wrap gap-4 items-center justify-between sticky top-0 z-[1000] font-sans text-xs">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-light uppercase tracking-[0.2em] text-[#ccc9c1] text-[0.58rem]">
          Basta Label &middot; Mode Inspecteur de Structure
        </span>
        <span className="hidden sm:inline-block px-1.5 py-0.5 border border-[#ccc9c1]/20 rounded-xs text-[0.5rem] text-[#888580] uppercase tracking-widest font-mono">
          AfterAll Club Framework
        </span>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-[0.62rem] uppercase tracking-widest text-[#ccc9c1] font-mono">
            {showAnnotations ? "Visuel de Vente Pur" : "Afficher Annotations & Plans (1-13)"}
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={showAnnotations}
              onChange={() => setShowAnnotations(!showAnnotations)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full transition-colors duration-300 ${
              showAnnotations ? "bg-amber-400" : "bg-[#2b2b27]"
            }`} />
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[#f4f1ea] shadow-md transform transition-transform duration-300 ${
              showAnnotations ? "translate-x-5" : "translate-x-0"
            }`} />
          </div>
        </label>
      </div>
    </div>
  );
}

interface BlockAnnotationProps {
  number: string;
  title: string;
  description: string;
  active: boolean;
}

export function BlockAnnotation({ number, title, description, active }: BlockAnnotationProps) {
  if (!active) return null;

  return (
    <div className="bg-[#0d0d0b]/95 backdrop-blur-md border border-amber-400/50 p-4 py-3 flex gap-4 max-w-full text-[#f4f1ea] transition-all animate-fadeIn relative z-40 select-none">
      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-amber-400/40 bg-amber-400/10 flex items-center justify-center font-serif text-amber-300 text-lg italic select-none">
        {number}
      </div>
      <div>
        <h4 className="text-[0.65rem] font-medium tracking-[0.15em] text-amber-300 uppercase mb-0.5">
          {title}
        </h4>
        <p className="text-[0.62rem] text-[#ccc9c1] leading-relaxed max-w-4xl font-light">
          {description}
        </p>
      </div>
      <div className="absolute top-1 right-2 text-[0.45rem] uppercase font-mono tracking-wider text-amber-300/30">
        Structure d'Origine Conservée
      </div>
    </div>
  );
}
