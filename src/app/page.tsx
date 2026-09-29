"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  Gem,
  CheckCircle2,
  Sparkles,
  Award,
  Video,
  ChevronRight,
  TrendingDown,
} from "lucide-react";
import { initialDiamonds } from "@/lib/data/diamonds";
import { initialJewelry } from "@/lib/data/jewelry";
import { defaultSiteSettings } from "@/lib/data/siteContent";
import { useEnquiry } from "@/context/EnquiryContext";
import { useRingBuilder } from "@/context/RingBuilderContext";
import { DiamondShapeIcon } from "@/components/common/DiamondShapeIcon";
import { DiamondShape, SiteSettings } from "@/lib/types";

const ringStyles = [
  {
    title: "Solitaire Rings",
    subtitle: "Timeless & Minimalist",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    style: "Solitaire",
    startingAt: "$650",
  },
  {
    title: "French Pavé Rings",
    subtitle: "Micro-set Diamond Band",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    style: "Pave",
    startingAt: "$950",
  },
  {
    title: "Hidden Halo Rings",
    subtitle: "Subtle Under-crown Sparkle",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
    style: "Halo",
    startingAt: "$1,150",
  },
  {
    title: "Three-Stone Rings",
    subtitle: "Past, Present & Future",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop",
    style: "Three-Stone",
    startingAt: "$1,350",
  },
  {
    title: "Bezel Set Rings",
    subtitle: "Modern, Secure & Snag-Free",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    style: "Bezel",
    startingAt: "$850",
  },
  {
    title: "Vintage Milgrain Rings",
    subtitle: "Intricate Engraved Filigree",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    style: "Vintage",
    startingAt: "$1,400",
  },
];

const allShapes: DiamondShape[] = [
  "Round",
  "Oval",
  "Emerald",
  "Radiant",
  "Cushion",
  "Pear",
  "Princess",
  "Marquise",
  "Asscher",
  "Heart",
];

export default function HomePage() {
  const router = useRouter();
  const { addItem, isInEnquiry } = useEnquiry();
  const { startWithDiamond, startWithSetting, setDiamond } = useRingBuilder();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    const loadSettings = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("dhanlaxmi_site_settings");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setSiteSettings((prev) => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error("Error loading site settings", e);
          }
        }
      }
    };

    loadSettings();
    window.addEventListener("dhanlaxmi_site_settings_updated", loadSettings);
    window.addEventListener("storage", loadSettings);
    return () => {
      window.removeEventListener("dhanlaxmi_site_settings_updated", loadSettings);
      window.removeEventListener("storage", loadSettings);
    };
  }, []);

  const handleStartWithDiamond = () => {
    startWithDiamond();
    router.push("/ring-builder");
  };

  const handleStartWithSetting = () => {
    startWithSetting();
    router.push("/ring-builder");
  };

  const handleShapeSelect = (shape: string) => {
    router.push(`/diamonds?shape=${shape}`);
  };

  const featuredStones = initialDiamonds.slice(0, 4);

  return (
    <div className="bg-[#08090B] text-[#EDEDED] selection:bg-[#F59E0B] selection:text-black">
      {/* ========================================================================= */}
      {/* TOP ANNOUNCEMENT / RITANI TRUST BAR                                      */}
      {/* ========================================================================= */}
      <section className="bg-[#050608] border-b border-amber-500/20 py-2.5 px-4 text-center text-[10px] md:text-xs tracking-[0.22em] uppercase font-mono text-amber-200/90 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
        <span>DIRECT SURAT BENCH PRICING &bull; GIA &amp; IGI CERTIFIED &bull; 30-DAY MONEY-BACK &bull; COMPLIMENTARY ARMORED DELIVERY</span>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1 — RITANI DUAL-ACTION HERO: CREATE YOUR DREAM RING             */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#08090B] pt-20 pb-28 border-b border-amber-500/15">
        {/* Background Cinematic Hero Image with Warm Champagne Radial Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/hero-diamond.jpg"
            alt="Dhanlaxmi Diamond Solitaire Ring"
            fill
            priority
            className="object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090B] via-[#08090B]/70 to-[#08090B]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#08090B_85%)]" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Headline & Subhead */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#F59E0B] font-mono block drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
              {siteSettings.heroBadge || "Surat Diamond House • Handcrafted Custom Fine Jewelry"}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.12]">
              {(siteSettings.heroTitleMain ?? "Create Your")}{" "}
              <span className="gold-gradient-text italic font-normal">
                {(siteSettings.heroTitleHighlight ?? "Dream Ring")}
              </span>
            </h1>
            <p className="text-sm md:text-base text-neutral-200 font-light leading-relaxed max-w-2xl mx-auto">
              {siteSettings.heroSubtitle || "Design a one-of-a-kind engagement ring directly from master cutters in Surat. Choose your diamond or setting to begin."}
            </p>
          </div>

          {/* Dual Action Cards (Ritani Signature Hero) with Photorealistic Diamond Imagery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Action 1: Start With A Diamond */}
            <div className="group relative bg-gradient-to-b from-[#15161D] to-[#0E0F14] border border-amber-500/25 hover:border-amber-400/80 transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.2)]">
              {/* Image Preview Box */}
              <div className="relative w-full h-52 sm:h-56 mb-6 overflow-hidden border border-amber-500/30 bg-black">
                <Image
                  src="/loose-diamond-hero.jpg"
                  alt="Loose Certified Diamond"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 bg-black/90 text-amber-300 border border-amber-500/40 backdrop-blur-sm shadow-md">
                  100,000+ Certified Stones
                </span>
              </div>

              <div className="space-y-3 relative z-10 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:bg-[#F59E0B] group-hover:text-black transition-colors duration-300">
                    <Gem className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#F59E0B] block">
                    Option 01
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-white group-hover:text-amber-300 transition-colors">
                  Start With A Diamond
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Browse certified natural and lab-grown stones at direct Surat cutter pricing. Inspect 360&deg; high-definition facet videos and official GIA/IGI laboratory dossiers.
                </p>
              </div>

              <div className="pt-8 relative z-10">
                <button
                  onClick={handleStartWithDiamond}
                  className="w-full py-4 gold-btn text-xs tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Start With A Diamond</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Action 2: Start With A Setting */}
            <div className="group relative bg-gradient-to-b from-[#15161D] to-[#0E0F14] border border-amber-500/25 hover:border-amber-400/80 transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.2)]">
              {/* Image Preview Box */}
              <div className="relative w-full h-52 sm:h-56 mb-6 overflow-hidden border border-amber-500/30 bg-black">
                <Image
                  src="/ring-setting-hero.jpg"
                  alt="Custom Ring Setting in Platinum"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 bg-black/90 text-amber-300 border border-amber-500/40 backdrop-blur-sm shadow-md">
                  Platinum &bull; 18k White, Yellow, Rose Gold
                </span>
              </div>

              <div className="space-y-3 relative z-10 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:bg-[#F59E0B] group-hover:text-black transition-colors duration-300">
                    <Sparkles className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#F59E0B] block">
                    Option 02
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-white group-hover:text-amber-300 transition-colors">
                  Start With A Setting
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Choose from timeless solitaires, hidden halos, french pavé, three-stone and vintage mounts handcrafted in 950 Platinum and 18k Gold.
                </p>
              </div>

              <div className="pt-8 relative z-10">
                <button
                  onClick={handleStartWithSetting}
                  className="w-full py-4 gold-outline-btn text-xs tracking-[0.2em] font-medium flex items-center justify-center gap-2"
                >
                  <span>Start With A Setting</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — RITANI VISUAL SHAPE SELECTOR BAR                              */}
      {/* ========================================================================= */}
      <section className="py-12 border-b border-amber-500/15 bg-[#08090B]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400/90 font-mono block">
                Direct Inventory
              </span>
              <h3 className="font-serif text-2xl text-white font-light">
                Shop Diamonds By Shape
              </h3>
            </div>
            <Link
              href="/diamonds"
              className="text-xs uppercase tracking-wider text-amber-300 hover:text-white flex items-center gap-1 font-medium transition"
            >
              <span>View All 10 Shapes in Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
            {allShapes.map((shape) => (
              <button
                key={shape}
                onClick={() => handleShapeSelect(shape)}
                className="flex flex-col items-center justify-center p-3.5 border border-white/[0.08] bg-gradient-to-b from-[#14151B] to-[#0C0D11] hover:border-amber-400/70 hover:bg-[#1A1B24] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 group text-neutral-300 hover:text-white"
              >
                <DiamondShapeIcon
                  shape={shape}
                  className="w-7 h-7 text-amber-400/80 group-hover:text-amber-300 group-hover:scale-110 transition-transform duration-300 mb-2"
                />
                <span className="text-[11px] font-medium uppercase tracking-wide group-hover:text-amber-200 transition-colors">
                  {shape}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — 3-STEP CUSTOM RING BUILDER SHOWCASE                           */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#0B0C10] border-b border-amber-500/15 relative overflow-hidden">
        {/* Subtle ambient light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#F59E0B] font-mono block drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]">
              Effortless Custom Ring Crafting
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white">
              How the <span className="gold-gradient-text italic font-normal">Ring Builder</span> Works
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              In three straightforward steps, bring your custom vision to life with complete metal, sizing, and diamond grade autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-gradient-to-b from-[#15161C] to-[#0D0E12] border border-amber-500/20 hover:border-amber-400/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.12)] p-8 space-y-5 text-center relative group transition-all duration-300">
              <span className="inline-block w-9 h-9 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-black text-xs font-mono font-bold leading-9 text-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                1
              </span>
              <h3 className="font-serif text-xl text-white group-hover:text-amber-300 transition-colors">Choose Your Setting</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Select your preferred silhouette: Solitaire, French Pavé, Hidden Halo, Bezel, or Vintage. Custom cast in 950 Platinum, 18k Yellow, White, or Rose Gold.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleStartWithSetting}
                  className="text-xs uppercase tracking-widest text-[#F59E0B] font-medium hover:text-amber-200 inline-flex items-center gap-1 group/btn transition"
                >
                  <span>Select Setting</span>
                  <span className="transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-b from-[#15161C] to-[#0D0E12] border border-amber-500/20 hover:border-amber-400/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.12)] p-8 space-y-5 text-center relative group transition-all duration-300">
              <span className="inline-block w-9 h-9 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-black text-xs font-mono font-bold leading-9 text-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                2
              </span>
              <h3 className="font-serif text-xl text-white group-hover:text-amber-300 transition-colors">Select Your Diamond</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Filter by any shape, carat weight, color, clarity, and GIA/IGI laboratory certification. Every stone cut and verified in Surat with direct pricing.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleStartWithDiamond}
                  className="text-xs uppercase tracking-widest text-[#F59E0B] font-medium hover:text-amber-200 inline-flex items-center gap-1 group/btn transition"
                >
                  <span>Select Diamond</span>
                  <span className="transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-b from-[#15161C] to-[#0D0E12] border border-amber-500/20 hover:border-amber-400/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.12)] p-8 space-y-5 text-center relative group transition-all duration-300">
              <span className="inline-block w-9 h-9 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-black text-xs font-mono font-bold leading-9 text-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                3
              </span>
              <h3 className="font-serif text-xl text-white group-hover:text-amber-300 transition-colors">Complete &amp; Review</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Inspect your assembled ring, choose your exact finger size, preview direct bench savings, and reserve directly with our concierge atelier.
              </p>
              <div className="pt-2">
                <Link
                  href="/ring-builder"
                  className="text-xs uppercase tracking-widest text-[#F59E0B] font-medium hover:text-amber-200 inline-flex items-center gap-1 group/btn transition"
                >
                  <span>Review Builder</span>
                  <span className="transition-transform group-hover/btn:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/ring-builder"
              className="inline-flex items-center gap-3 px-10 py-4 gold-btn text-xs tracking-[0.2em] font-semibold transition"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Launch Custom Ring Builder</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — SHOP ENGAGEMENT RINGS BY STYLE                               */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12 border-b border-amber-500/15">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400/90 font-mono block">
              Handcrafted Mountings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
              Shop Rings by Setting Style
            </h2>
          </div>
          <Link
            href="/ring-builder?step=1"
            className="text-xs uppercase tracking-wider text-amber-300 hover:text-white flex items-center gap-1 font-medium transition"
          >
            <span>Explore All Settings in Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ringStyles.map((item) => (
            <div
              key={item.title}
              className="bg-gradient-to-b from-[#14151B] to-[#0D0E12] border border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 group flex flex-col justify-between overflow-hidden hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.12)]"
            >
              <div className="relative aspect-square overflow-hidden bg-[#181818]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-amber-300 border border-amber-500/30 shadow-md">
                  From {item.startingAt}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 font-light">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <Link
                    href={`/ring-builder?step=1`}
                    className="text-xs uppercase tracking-widest text-[#F59E0B] font-medium hover:text-amber-200 flex items-center gap-1 group/link transition"
                  >
                    <span>Design With This Style</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — RITANI PRICE TRANSPARENCY COMPARISON                          */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#0B0C10] border-b border-amber-500/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950/70 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300 font-semibold">
                  Direct Factory Advantage
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
                Direct From Surat Cutters. <br />
                <span className="gold-gradient-text italic font-normal">Zero Middlemen Markups.</span>
              </h2>

              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Over 90% of the world&apos;s diamonds are cut and polished in Surat, Gujarat. When you buy from traditional luxury high-street jewelers, you pay for multiple intermediaries, high-rent storefronts, and brand markups up to 300%.
              </p>

              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Founded by three brothers at the workbench in Surat in 2004, Dhanlaxmi delivers direct bench prices with transparent cost accounting and independent GIA or IGI dossiers.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/diamonds"
                  className="px-8 py-3.5 gold-btn text-xs tracking-[0.2em] font-semibold"
                >
                  Explore Direct Vault
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3.5 gold-outline-btn text-xs tracking-[0.2em] font-medium"
                >
                  Our Surat Heritage
                </Link>
              </div>
            </div>

            {/* Right Comparison Card */}
            <div className="lg:col-span-6 bg-gradient-to-b from-[#15161C] to-[#0E0F14] border border-amber-500/30 p-8 sm:p-10 shadow-2xl space-y-6">
              <h3 className="font-serif text-2xl text-white font-light border-b border-amber-500/20 pb-4">
                Price Comparison: <span className="text-amber-300">2.0ct F VS1 Round</span>
              </h3>

              <div className="space-y-5">
                {/* Traditional Retail */}
                <div className="p-4 bg-[#101116] border border-white/[0.08] space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-wider text-neutral-400">
                      Traditional 5th Ave / High-Street Retailer
                    </span>
                    <span className="font-serif text-xl text-neutral-500 line-through">
                      $34,500
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-none" />
                  <p className="text-[11px] text-neutral-400">
                    Includes retail store leases, international distributor markups, and brand markup layers.
                  </p>
                </div>

                {/* Dhanlaxmi Direct */}
                <div className="p-5 bg-gradient-to-r from-amber-500/15 via-[#181924] to-[#121319] border-2 border-amber-400 space-y-2.5 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
                      <span className="text-amber-200">Dhanlaxmi Direct Cutter Bench</span>
                    </span>
                    <span className="font-serif text-2xl font-light text-amber-300">
                      $21,800
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] rounded-none shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                  <div className="flex justify-between text-xs font-semibold text-emerald-300 pt-1">
                    <span>You save $12,700 (37% Direct Savings)</span>
                    <span className="text-neutral-300 font-normal">Includes GIA Dossier</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-amber-500/20 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>100% Conflict-Free KPCS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>GIA &amp; IGI Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — LIVE CERTIFIED DIAMOND HIGHLIGHTS                             */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12 border-b border-amber-500/15">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400/90 font-mono block">
              Curated Vault Specimens
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
              Featured Loose Diamonds
            </h2>
          </div>
          <Link
            href="/diamonds"
            className="text-xs uppercase tracking-wider text-amber-300 hover:text-white flex items-center gap-1 font-medium transition"
          >
            <span>View Full Diamond Inventory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStones.map((stone) => (
            <div
              key={stone.id}
              className="bg-gradient-to-b from-[#14151B] to-[#0E0F13] border border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 group flex flex-col justify-between p-4 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.15)]"
            >
              <div className="relative aspect-square bg-[#1A1A1A] overflow-hidden mb-4">
                <Image
                  src={stone.images[0]}
                  alt={stone.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/85 text-[10px] uppercase font-mono border border-amber-500/40 text-amber-300">
                  {stone.certificateLab}
                </span>
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/85 text-[10px] uppercase font-mono border border-white/[0.15] text-white">
                  {stone.shape}
                </span>
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base text-white group-hover:text-amber-300 transition-colors">
                    {stone.carat}ct {stone.shape} {stone.color} {stone.clarity}
                  </h4>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Bench Price</span>
                    <span className="font-serif text-lg font-light text-amber-300">
                      ${stone.price?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.08] space-y-2">
                  <button
                    onClick={() => {
                      setDiamond(stone);
                      router.push("/ring-builder");
                    }}
                    className="w-full py-2.5 gold-btn text-[11px] tracking-wider font-semibold transition"
                  >
                    + Pair in Ring Builder
                  </button>
                  <Link
                    href={`/diamonds/${stone.id}`}
                    className="block text-center text-[10px] uppercase tracking-wider text-neutral-400 hover:text-amber-300 py-1 transition-colors"
                  >
                    Inspect Laboratory Dossier
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — VIRTUAL GEMOLOGIST & CONCIERGE APPOINTMENT                   */}
      {/* ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-[#0F1015] to-[#08090B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Video className="w-6 h-6 stroke-[1.5]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
            Book a Free <span className="gold-gradient-text italic font-normal">Virtual Gemologist</span> Consultation
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
            Need guidance navigating the 4Cs, comparing millimeter proportions, or custom mounting designs? Schedule an interactive video session with our Surat senior diamond specialists.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 gold-btn text-xs tracking-[0.2em] font-semibold"
            >
              Schedule Video Appointment
            </Link>
            <a
              href="https://wa.me/919825100000?text=Hello%20Dhanlaxmi%20Diamond%20Team%2C%20I%20would%20like%20to%20consult%20with%20a%20gemologist%20regarding%20a%20custom%20ring."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 gold-outline-btn text-xs tracking-[0.2em] font-medium"
            >
              Chat on WhatsApp Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
