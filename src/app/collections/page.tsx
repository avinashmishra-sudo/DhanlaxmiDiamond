import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { initialCollections } from "@/lib/data/collections";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Signature Collections | Dhanlaxmi Diamond",
  description:
    "Explore Dhanlaxmi Diamond's signature collections: Heritage Solitaire, Constellation Haute Joaillerie, Architectural Emerald, and Eternal Radiance Bridal.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-[#08090B] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-14 border-b border-amber-500/15 text-center space-y-4">
        <span className="text-[11px] font-sans tracking-[0.25em] text-[#F59E0B] uppercase block font-mono drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]">
          Curated Design Universes
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
          Signature <span className="gold-gradient-text italic font-normal">Collections</span>
        </h1>
        <p className="text-sm text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
          Each collection embodies a coherent architectural aesthetic, combining superlative diamond cut precision with minimalist precious metal settings.
        </p>
      </section>

      {/* Collections Stack */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-28">
        {initialCollections.map((collection, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={collection.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                !isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative aspect-[16/10] bg-[#14151D] border border-amber-500/30 overflow-hidden group shadow-2xl ${
                  isEven ? "lg:col-span-7" : "lg:col-span-7 lg:order-2"
                }`}
              >
                <Image
                  src={collection.heroImage}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.2em] font-medium px-3.5 py-1.5 bg-black/90 text-amber-300 border border-amber-500/40 shadow-md">
                  {collection.featuredCount} Atelier Creations
                </div>
              </div>

              {/* Text */}
              <div
                className={`space-y-6 ${
                  isEven ? "lg:col-span-5" : "lg:col-span-5 lg:order-1"
                }`}
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#F59E0B] font-mono block">
                  Collection 0{index + 1}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
                  {collection.name}
                </h2>
                <p className="text-sm font-serif italic text-amber-200/80">
                  &ldquo;{collection.tagline}&rdquo;
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {collection.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/jewelry"
                    className="px-7 py-3.5 gold-btn text-xs tracking-widest font-semibold flex items-center gap-2"
                  >
                    <span>View Creations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/request-quote"
                    className="px-7 py-3.5 gold-outline-btn text-xs tracking-widest font-medium"
                  >
                    Enquire Suite
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
