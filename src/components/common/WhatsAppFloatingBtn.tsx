"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";

export const WhatsAppFloatingBtn: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const whatsappUrl = `https://wa.me/919825100000?text=${encodeURIComponent(
    "Hello Dhanlaxmi Diamond, I would like to inquire about certified diamonds and bespoke fine jewelry consultation."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#141414] hover:bg-[#1C1C1C] text-white border border-neutral-800 hover:border-neutral-600 shadow-2xl backdrop-blur-md transition-all duration-300 group"
      aria-label="Contact Diamond Specialist on WhatsApp"
    >
      <div className="relative">
        <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
      </div>
      <span className="hidden sm:inline text-xs font-serif tracking-wider uppercase text-neutral-200 group-hover:text-white transition-colors">
        WhatsApp Concierge
      </span>
    </a>
  );
};
