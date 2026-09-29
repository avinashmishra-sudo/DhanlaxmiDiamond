import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, HeartHandshake, Leaf, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability & Ethical Sourcing | Dhanlaxmi Diamond",
  description:
    "Our unwavering commitment to 100% conflict-free natural diamonds, Kimberley Process compliance, artisanal welfare, and recycled precious metals.",
};

export default function SustainabilityPage() {
  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 text-center pb-16 space-y-6">
        <span className="text-[11px] font-sans tracking-[0.25em] text-[#FBC90B] uppercase block">
          Responsible Stewardship &bull; KPCS Certified
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          Integrity From Mine to Masterpiece
        </h1>
        <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
          A luxury diamond house is defined as much by its ethics as by its optical brilliance. We operate with zero tolerance for conflict minerals and complete traceability.
        </p>
      </section>

      {/* Pillars Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-b border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-4">
            <ShieldCheck className="w-8 h-8 text-[#FBC90B]" />
            <h3 className="font-serif text-2xl text-white font-light">Kimberley Process</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Every natural rough diamond entering our Surat facility is accompanied by government-validated KPCS documentation certifying conflict-free provenance.
            </p>
          </div>

          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-4">
            <Scale className="w-8 h-8 text-[#FBC90B]" />
            <h3 className="font-serif text-2xl text-white font-light">System of Warranties</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              We adhere strictly to the World Diamond Council System of Warranties across all international invoices and wholesale shipments.
            </p>
          </div>

          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-4">
            <HeartHandshake className="w-8 h-8 text-[#FBC90B]" />
            <h3 className="font-serif text-2xl text-white font-light">Artisan Welfare</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Our Surat craftsmen work in safe, state-of-the-art facilities with competitive fair compensation, comprehensive health protections, and respected trade apprenticeships.
            </p>
          </div>

          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-4">
            <Leaf className="w-8 h-8 text-[#FBC90B]" />
            <h3 className="font-serif text-2xl text-white font-light">Recycled Metals</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Our fine jewelry mounts utilize certified recycled 950 Platinum and 18k Gold, drastically reducing environmental footprints while preserving immaculate metallurgy.
            </p>
          </div>
        </div>
      </section>

      {/* Ethical Statement */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-8">
        <div className="p-8 md:p-12 bg-[#141414] border border-neutral-800 space-y-6 shadow-xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#FBC90B] font-medium block">
            Our Solemn Pledge
          </span>
          <h2 className="font-serif text-3xl text-white font-light">
            Ethical Diamond Procurement Policy
          </h2>
          <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-light">
            <p>
              Dhanlaxmi Diamond guarantees that every natural diamond sold has been purchased from legitimate sources not involved in funding conflict, in full compliance with United Nations resolutions.
            </p>
            <p>
              As a family-founded company operating since 2004, our reputation is inextricably linked with the long-term well-being of the communities where diamonds are mined, traded, and transformed.
            </p>
            <p>
              For clients prioritizing contemporary technological solutions, we also offer certified lab-grown diamonds, providing complete consumer choice without ambiguity.
            </p>
          </div>
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row gap-4">
            <Link
              href="/diamonds"
              className="px-8 py-3.5 bg-[#FBC90B] text-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition text-center"
            >
              Explore Certified Stones
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest font-medium hover:border-white hover:text-white transition text-center"
            >
              Inquire About Chain of Custody
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
