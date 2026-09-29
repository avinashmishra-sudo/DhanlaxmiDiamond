"use client";

import React, { useState } from "react";
import Link from "next/link";
import { initialDiamonds } from "@/lib/data/diamonds";
import { ShieldCheck, Search, CheckCircle2 } from "lucide-react";

export default function QualityPage() {
  const [certQuery, setCertQuery] = useState("");
  const [searchResult, setSearchResult] = useState<typeof initialDiamonds[0] | null | "not_found">(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const query = certQuery.trim();
    if (!query) return;

    const found = initialDiamonds.find(
      (d) =>
        d.certificateNumber.toLowerCase() === query.toLowerCase() ||
        d.sku.toLowerCase() === query.toLowerCase()
    );

    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult("not_found");
    }
  };

  const setSampleQuery = (num: string) => {
    setCertQuery(num);
    const found = initialDiamonds.find((d) => d.certificateNumber === num);
    if (found) setSearchResult(found);
  };

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-6 text-center pb-16 space-y-6">
        <span className="text-[11px] font-sans tracking-[0.25em] text-[#FBC90B] uppercase block">
          Gemological Integrity &bull; GIA &bull; IGI
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          Confidence Behind Every Stone
        </h1>
        <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
          We believe absolute transparency is the cornerstone of trust in fine jewelry. Every Dhanlaxmi diamond is evaluated under stringent international laboratory benchmarks.
        </p>
      </section>

      {/* Certificate Verification Tool */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-[#141414] border border-neutral-800 p-8 md:p-10 space-y-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-[#FBC90B]" />
              <div>
                <h3 className="font-serif text-2xl text-white font-light">
                  Laboratory Dossier Verification
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Verify official laboratory grading records for any Dhanlaxmi Diamond stone.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-widest text-[#FBC90B] border border-neutral-800 bg-[#1A1A1A] px-3 py-1 shadow-sm">
              GIA &bull; IGI Audited
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter Certificate Number (e.g. 2235918402 or LG612984102)"
                value={certQuery}
                onChange={(e) => setCertQuery(e.target.value)}
                className="flex-1 bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Verify Stone</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 pt-1">
              <span>Quick Test Samples:</span>
              <button
                type="button"
                onClick={() => setSampleQuery("2235918402")}
                className="text-[#FBC90B] underline hover:text-white font-medium"
              >
                GIA #2235918402
              </button>
              <span>&bull;</span>
              <button
                type="button"
                onClick={() => setSampleQuery("5221984210")}
                className="text-[#FBC90B] underline hover:text-white font-medium"
              >
                GIA #5221984210
              </button>
              <span>&bull;</span>
              <button
                type="button"
                onClick={() => setSampleQuery("LG612984102")}
                className="text-[#FBC90B] underline hover:text-white font-medium"
              >
                IGI #LG612984102
              </button>
            </div>
          </form>

          {/* Results Display */}
          {searchResult === "not_found" && (
            <div className="p-6 bg-red-950/40 border border-red-800/50 text-center space-y-2">
              <p className="text-xs text-red-300 font-medium">
                No matching certificate record found for &ldquo;{certQuery}&rdquo;.
              </p>
              <p className="text-[11px] text-neutral-400">
                Please double check your report number or contact our concierge for archived stone records.
              </p>
            </div>
          )}

          {searchResult && searchResult !== "not_found" && (
            <div className="p-6 bg-[#1A1A1A] border border-neutral-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RECORD CONFIRMED &bull; AUTHENTIC DHANLAXMI STONE</span>
                </div>
                <span className="text-xs font-semibold text-white">
                  {searchResult.certificateLab} #{searchResult.certificateNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-[#141414] border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Carat</span>
                  <span className="text-[#FBC90B] text-base font-semibold">{searchResult.carat}ct</span>
                </div>
                <div className="p-3 bg-[#141414] border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Color</span>
                  <span className="text-[#FBC90B] text-base font-semibold">{searchResult.color}</span>
                </div>
                <div className="p-3 bg-[#141414] border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Clarity</span>
                  <span className="text-[#FBC90B] text-base font-semibold">{searchResult.clarity}</span>
                </div>
                <div className="p-3 bg-[#141414] border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 block uppercase">Cut</span>
                  <span className="text-[#FBC90B] text-base font-semibold">{searchResult.cut}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Shape &amp; Proportions:</span>
                  <span className="text-white font-medium">{searchResult.shape} Brilliant</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Measurements:</span>
                  <span className="text-white font-medium">{searchResult.measurements}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Polish &amp; Symmetry:</span>
                  <span className="text-white font-medium">
                    {searchResult.polish} / {searchResult.symmetry}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Fluorescence:</span>
                  <span className="text-white font-medium">{searchResult.fluorescence}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href={`/diamonds/${searchResult.id}`}
                  className="px-6 py-2.5 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-widest font-semibold transition"
                >
                  View Full Stone Details &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4Cs Education Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-neutral-800 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#FBC90B] block font-sans">
            Connoisseur Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
            Understanding Diamond Quality
          </h2>
          <p className="text-sm text-neutral-400 font-light">
            The fundamental criteria used by international gemologists to assess intrinsic rarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-4">
            <h3 className="font-serif text-2xl text-white font-light">Cut &mdash; The Master&apos;s Signature</h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Cut is the only C determined by human craft rather than nature. Our polishers calculate pavilion and crown depths to achieve maximum internal refraction, eliminating dark centers or glassy windowing.
            </p>
          </div>

          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-4">
            <h3 className="font-serif text-2xl text-white font-light">Color &mdash; The Spectrum of Purity</h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Graded on an alphabetical scale from D (completely colorless) to Z (light yellow or brown). Beyond Z lie the intensely rare natural fancy color diamonds, celebrated for vibrant golden and pink hues.
            </p>
          </div>

          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-4">
            <h3 className="font-serif text-2xl text-white font-light">Clarity &mdash; Geological Fingerprints</h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Identifies microscopic internal characteristics (inclusions) and external blemishes under 10x magnification. Dhanlaxmi prioritizes stones that are 100% eye-clean without compromising sparkle.
            </p>
          </div>

          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-4">
            <h3 className="font-serif text-2xl text-white font-light">Carat &mdash; Precision Mass</h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              One metric carat equals 0.200 grams. Because larger diamonds are exponentially rarer in nature, value rises geometrically with carat mass when cut and color are held constant.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
