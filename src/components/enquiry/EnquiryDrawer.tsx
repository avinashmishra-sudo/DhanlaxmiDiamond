"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEnquiry } from "@/context/EnquiryContext";
import { X, Trash2, ArrowRight, MessageSquare, Gem } from "lucide-react";

export const EnquiryDrawer: React.FC = () => {
  const { items, removeItem, clearEnquiry, isDrawerOpen, closeDrawer } = useEnquiry();

  if (!isDrawerOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Dhanlaxmi Diamond Concierge, I am interested in inquiring about the following pieces from your collection:\n\n` +
      items.map((it, idx) => `${idx + 1}. ${it.name} (SKU: ${it.sku}) - ${it.detail}`).join("\n") +
      `\n\nPlease connect me with a diamond specialist.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0D0D] border-l border-neutral-800 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gem className="w-5 h-5 text-white stroke-[1.4]" />
              <div>
                <h3 className="font-serif text-lg tracking-wide uppercase text-white font-normal">
                  Enquiry Portfolio
                </h3>
                <p className="text-xs text-neutral-400 tracking-wider">
                  {items.length} {items.length === 1 ? "Creation" : "Creations"} Selected
                </p>
              </div>
            </div>
            <button
              onClick={closeDrawer}
              className="text-neutral-400 hover:text-white transition p-1"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full border border-neutral-800 flex items-center justify-center mb-4 text-neutral-500">
                  <Gem className="w-7 h-7 stroke-[1.2]" />
                </div>
                <h4 className="font-serif text-lg text-white mb-2">Your Portfolio is Empty</h4>
                <p className="text-xs text-neutral-400 max-w-xs mb-6 font-light leading-relaxed">
                  Explore our certified natural diamonds and fine jewelry to add creations to your personal consultation list.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/diamonds"
                    onClick={closeDrawer}
                    className="px-5 py-2.5 text-xs uppercase tracking-widest bg-[#181818] hover:bg-neutral-800 text-white border border-neutral-700 transition"
                  >
                    View Diamonds
                  </Link>
                  <Link
                    href="/jewelry"
                    onClick={closeDrawer}
                    className="px-5 py-2.5 text-xs uppercase tracking-widest bg-white hover:bg-neutral-200 text-black font-medium transition"
                  >
                    View Jewelry
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                    Selected Creations
                  </span>
                  <button
                    onClick={clearEnquiry}
                    className="text-xs text-neutral-400 hover:text-rose-400 transition"
                  >
                    Clear All
                  </button>
                </div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-[#141414] border border-neutral-800 transition hover:border-neutral-500 group"
                  >
                    <div className="relative w-20 h-20 bg-[#1C1C1C] flex-shrink-0 border border-neutral-800 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-mono">
                        {item.sku}
                      </span>
                      <h4 className="font-serif text-sm text-white truncate font-medium">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1 font-light">
                        {item.detail}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-neutral-300 italic font-serif">
                          Private Consultation
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-rose-400 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-[#111111] space-y-3">
              <Link
                href="/request-quote"
                onClick={closeDrawer}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-white hover:bg-neutral-200 text-black text-xs uppercase tracking-widest font-medium transition duration-200"
              >
                Request Quotation &amp; Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/919825100000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#161616] hover:bg-[#1E1E1E] text-white border border-neutral-700 hover:border-white text-xs uppercase tracking-widest transition duration-200"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Enquire via WhatsApp Concierge
              </a>
              <p className="text-[11px] text-center text-neutral-500 pt-1 font-light">
                No commitment required. A dedicated diamond specialist will review your request.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
