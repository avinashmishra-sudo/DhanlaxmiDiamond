"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { initialDiamonds } from "@/lib/data/diamonds";
import { useEnquiry } from "@/context/EnquiryContext";

export default function LabGrownDiamondsPage() {
  const { addItem, isInEnquiry } = useEnquiry();
  const labStones = initialDiamonds.filter((d) => d.type === "Lab-Grown");

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-[#0D0D0D] border-b border-neutral-900">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[11px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase block">
            Technological Artistry &bull; Type IIa Certified
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight tracking-tight">
            Created With Precision. Made To Shine.
          </h1>
          <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
            Engineered through controlled Chemical Vapor Deposition to achieve identical physical, chemical, and optical parameters to earth-mined diamonds.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/diamonds?type=Lab-Grown"
              className="px-8 py-3.5 bg-white hover:bg-neutral-200 text-black text-xs uppercase tracking-widest font-medium transition"
            >
              Browse Lab-Grown Inventory
            </Link>
            <Link
              href="/ring-builder"
              className="px-8 py-3.5 border border-neutral-700 hover:border-white text-white text-xs uppercase tracking-widest font-medium transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FBC90B]" />
              <span>Design Custom Ring</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Science & Integrity Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 block font-sans">
              The Science of Carbon
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
              Atomic Precision, Identical Brilliance
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Lab-grown diamonds are 100% genuine diamonds. In controlled plasma reactors, carbon atoms deposit layer by layer onto a diamond seed crystal, recreating the natural crystallographic structure with pristine purity.
            </p>
            <div className="space-y-4 pt-2">
              <div className="p-5 bg-[#141414] border border-neutral-800 space-y-1">
                <span className="text-xs uppercase tracking-wider text-white font-medium block">
                  100% Carbon Purity (Type IIa)
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Type IIa diamonds represent less than 2% of natural diamonds. All Dhanlaxmi CVD lab diamonds possess this exceptional optical clarity.
                </p>
              </div>

              <div className="p-5 bg-[#141414] border border-neutral-800 space-y-1">
                <span className="text-xs uppercase tracking-wider text-white font-medium block">
                  Independent IGI Laboratory Verification
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Every lab-grown stone is inscribed with its unique laboratory registry number and laser identification mark.
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-4/3 bg-[#141414] border border-neutral-800 overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop"
              alt="Lab Diamond Optical Perfection"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-wider font-medium px-3.5 py-1.5 bg-black/85 text-white border border-neutral-700 shadow-sm">
              CVD Crystallographic Purity
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lab-Grown Stones */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-mono block">
              Direct Cutter Values
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
              Featured Lab-Grown Diamonds
            </h2>
          </div>
          <Link
            href="/diamonds?type=Lab-Grown"
            className="text-xs uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1 font-medium"
          >
            <span>View All Lab Diamonds in Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labStones.map((diamond) => (
            <div
              key={diamond.id}
              className="bg-[#141414] border border-neutral-800 hover:border-neutral-500 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl"
            >
              <div className="relative aspect-square overflow-hidden bg-[#181818]">
                <Image
                  src={diamond.images[0]}
                  alt={diamond.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                  <span className="text-[10px] uppercase font-sans tracking-wider px-2.5 py-1 bg-black/85 text-white border border-neutral-700 font-medium shadow-sm">
                    {diamond.type}
                  </span>
                  <span className="text-[10px] uppercase font-sans tracking-wider px-2.5 py-1 bg-black/85 text-neutral-300 border border-neutral-700 shadow-sm">
                    {diamond.shape}
                  </span>
                </div>
                <span className="absolute top-3.5 right-3.5 text-[10px] uppercase font-sans tracking-wider px-2.5 py-1 bg-black/85 text-white border border-neutral-700 font-semibold shadow-sm">
                  {diamond.certificateLab}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase text-neutral-500 tracking-[0.2em] block">
                      {diamond.sku}
                    </span>
                    <span className="font-serif text-lg text-white font-semibold">
                      ${diamond.price?.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-white mt-1.5 font-light tracking-tight group-hover:text-brand-gold">
                    {diamond.carat}ct {diamond.shape} Brilliant
                  </h3>

                  <div className="grid grid-cols-4 gap-1 mt-4 p-3 bg-[#1A1A1A] border border-neutral-800 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">Carat</span>
                      <span className="text-xs text-white font-medium mt-0.5 block">{diamond.carat}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">Color</span>
                      <span className="text-xs text-white font-medium mt-0.5 block">{diamond.color}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">Clarity</span>
                      <span className="text-xs text-white font-medium mt-0.5 block">{diamond.clarity}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">Cut</span>
                      <span className="text-xs text-white font-medium mt-0.5 block">{diamond.cut}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                  <Link
                    href={`/diamonds/${diamond.id}`}
                    className="w-full py-2.5 bg-white text-black hover:bg-neutral-200 text-xs uppercase tracking-widest font-medium transition text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
