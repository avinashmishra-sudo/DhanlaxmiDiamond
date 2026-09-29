"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { initialDiamonds } from "@/lib/data/diamonds";
import { Diamond, DiamondShape } from "@/lib/types";
import { useEnquiry } from "@/context/EnquiryContext";
import { useRingBuilder } from "@/context/RingBuilderContext";
import { DiamondShapeIcon } from "@/components/common/DiamondShapeIcon";
import {
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Gem,
  ArrowRight,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

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

const allColors = ["D", "E", "F", "G", "H", "I", "J", "Fancy Yellow"];
const allClarity = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];
const allCuts = ["Ideal", "Excellent", "Very Good"];

type SortOption = "price-asc" | "price-desc" | "carat-desc" | "carat-asc";

function DiamondCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const initialShape = searchParams.get("shape");

  const [originFilter, setOriginFilter] = useState<string>(initialType || "All");
  const [selectedShape, setSelectedShape] = useState<string>(initialShape || "All");
  const [minCarat, setMinCarat] = useState<number>(0.5);
  const [maxCarat, setMaxCarat] = useState<number>(10.0);
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [selectedClarity, setSelectedClarity] = useState<string>("All");
  const [selectedCut, setSelectedCut] = useState<string>("All");
  const [selectedLab, setSelectedLab] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const { addItem, isInEnquiry } = useEnquiry();
  const { selectedDiamond, setDiamond, selectedSetting } = useRingBuilder();

  const resetFilters = () => {
    setOriginFilter("All");
    setSelectedShape("All");
    setMinCarat(0.5);
    setMaxCarat(10.0);
    setSelectedColor("All");
    setSelectedClarity("All");
    setSelectedCut("All");
    setSelectedLab("All");
    setSortBy("price-asc");
  };

  const handleSelectForRingBuilder = (diamond: Diamond) => {
    setDiamond(diamond);
    router.push("/ring-builder");
  };

  const filteredDiamonds = useMemo(() => {
    const list = initialDiamonds.filter((d) => {
      if (originFilter !== "All" && d.type !== originFilter) return false;
      if (selectedShape !== "All" && d.shape.toLowerCase() !== selectedShape.toLowerCase()) return false;
      if (d.carat < minCarat || d.carat > maxCarat) return false;
      if (selectedColor !== "All" && d.color !== selectedColor) return false;
      if (selectedClarity !== "All" && d.clarity !== selectedClarity) return false;
      if (selectedCut !== "All" && d.cut !== selectedCut) return false;
      if (selectedLab !== "All" && d.certificateLab !== selectedLab) return false;
      return true;
    });

    list.sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "carat-desc") return b.carat - a.carat;
      if (sortBy === "carat-asc") return a.carat - b.carat;
      return 0;
    });

    return list;
  }, [
    originFilter,
    selectedShape,
    minCarat,
    maxCarat,
    selectedColor,
    selectedClarity,
    selectedCut,
    selectedLab,
    sortBy,
  ]);

  return (
    <>
      {/* Ritani-Style Header & Service Trust Banner (Imperial Obsidian & Gold) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-8 border-b border-amber-500/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#F59E0B] uppercase block drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]">
                Direct From Surat Master Cutters
              </span>
              <span className="text-[10px] px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider font-semibold">
                Transparent Bench Pricing
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
              Certified <span className="gold-gradient-text italic font-normal">Loose Diamonds</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed">
              Browse authentic GIA &amp; IGI certified natural and precision lab-grown diamonds at direct factory pricing. Pair any diamond with our handcrafted settings or purchase loose.
            </p>
          </div>

          {/* Ring Builder Reminder Pill */}
          {selectedSetting && (
            <div className="bg-gradient-to-r from-amber-500/15 via-[#15161F] to-[#101116] border border-amber-500/40 p-3 rounded-none flex items-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <div className="w-10 h-10 relative bg-[#1E1E1E] border border-amber-500/40 shrink-0">
                <Image
                  src={selectedSetting.images[0]}
                  alt={selectedSetting.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <span className="text-[10px] text-[#F59E0B] uppercase tracking-wider block font-mono font-semibold">Ring Builder Active</span>
                <span className="font-medium text-white block line-clamp-1">{selectedSetting.name}</span>
                <Link href="/ring-builder" className="text-amber-300 underline text-[11px] font-medium hover:text-white">
                  Resume Ring &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Ritani Visual Shape Selector Bar (Imperial Gold) */}
        <div className="mt-8 pt-6 border-t border-amber-500/15">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-medium flex items-center gap-1.5">
              <span>Select Diamond Shape</span>
              {selectedShape !== "All" && (
                <button
                  onClick={() => setSelectedShape("All")}
                  className="text-[10px] text-amber-400 underline normal-case ml-2 hover:text-white"
                >
                  Clear ({selectedShape})
                </button>
              )}
            </span>
            <span className="text-[11px] text-amber-300/80 font-mono hidden sm:inline">
              Showing {filteredDiamonds.length} certified stones
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {allShapes.map((shape) => {
              const isSelected = selectedShape.toLowerCase() === shape.toLowerCase();
              return (
                <button
                  key={shape}
                  onClick={() => setSelectedShape(isSelected ? "All" : shape)}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3 border transition-all duration-300 group ${
                    isSelected
                      ? "border-amber-400 bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                      : "border-white/[0.08] bg-gradient-to-b from-[#14151B] to-[#0C0D11] text-neutral-300 hover:border-amber-400/60 hover:text-white hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  }`}
                  title={`Filter by ${shape}`}
                >
                  <DiamondShapeIcon
                    shape={shape}
                    className={`w-6 h-6 sm:w-7 sm:h-7 mb-1.5 transition-transform duration-200 group-hover:scale-110 ${
                      isSelected ? "text-black" : "text-amber-400/80 group-hover:text-amber-300"
                    }`}
                  />
                  <span className="text-[10px] font-medium tracking-wide uppercase">
                    {shape}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Origin Quick Pill Bar & Dual View Toggle (Imperial Gold) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-neutral-300 mr-1">Origin:</span>
            {["All", "Natural", "Lab-Grown"].map((orig) => (
              <button
                key={orig}
                onClick={() => setOriginFilter(orig)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition font-medium ${
                  originFilter === orig
                    ? "gold-btn"
                    : "border border-white/[0.08] bg-[#121319] text-neutral-300 hover:border-amber-500/40 hover:text-white"
                }`}
              >
                {orig}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-300 uppercase tracking-wider hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#121319] border border-amber-500/30 text-white px-3 py-1.5 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="carat-desc">Carat: High to Low</option>
                <option value="carat-asc">Carat: Low to High</option>
              </select>
            </div>

            {/* Ritani Dual View Toggle: Grid vs Spreadsheet Table */}
            <div className="flex items-center border border-amber-500/30 bg-[#101116] p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 transition ${
                  viewMode === "grid"
                    ? "bg-[#F59E0B] text-black shadow-sm"
                    : "text-neutral-400 hover:text-amber-300"
                }`}
                title="Grid Cards View"
                aria-label="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 transition ${
                  viewMode === "table"
                    ? "bg-[#F59E0B] text-black shadow-sm"
                    : "text-neutral-400 hover:text-amber-300"
                }`}
                title="Inventory Spreadsheet View"
                aria-label="Inventory Spreadsheet View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filters Button */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="lg:hidden px-3 py-1.5 bg-[#14151D] border border-amber-500/40 text-xs uppercase tracking-wider flex items-center gap-1.5 text-amber-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showFiltersMobile ? "Hide" : "Filters"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalog Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Filters (Pure Dark) */}
        <aside
          className={`lg:block ${
            showFiltersMobile ? "block" : "hidden"
          } space-y-7 bg-[#121212] p-6 border border-neutral-800 h-fit lg:sticky lg:top-28 shadow-xl`}
        >
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white font-medium">
              <Filter className="w-3.5 h-3.5 text-[#FBC90B]" />
              <span>Refine 4Cs</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-[11px] text-neutral-400 hover:text-white underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Carat Slider */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-medium">
                Carat Weight
              </label>
              <span className="text-white font-semibold">
                {minCarat.toFixed(2)}ct &ndash; {maxCarat.toFixed(2)}ct
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={minCarat}
              onChange={(e) => setMinCarat(parseFloat(e.target.value))}
              className="w-full accent-white bg-neutral-800"
            />
            <div className="flex justify-between text-[10px] text-neutral-500">
              <span>0.50 ct</span>
              <span>2.00 ct</span>
              <span>5.00+ ct</span>
            </div>
          </div>

          {/* Color Grade */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-medium">
                Color Grade
              </label>
              {selectedColor !== "All" && (
                <button
                  onClick={() => setSelectedColor("All")}
                  className="text-[10px] text-neutral-400 underline hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1">
              {allColors.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(selectedColor === col ? "All" : col)}
                  className={`py-1 text-xs border transition text-center font-medium ${
                    selectedColor === col
                      ? "border-white bg-white text-black"
                      : "border-neutral-800 bg-[#181818] text-neutral-400 hover:border-neutral-600 hover:text-white"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Clarity Grade */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-medium">
                Clarity Grade
              </label>
              {selectedClarity !== "All" && (
                <button
                  onClick={() => setSelectedClarity("All")}
                  className="text-[10px] text-neutral-400 underline hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1">
              {allClarity.map((cla) => (
                <button
                  key={cla}
                  onClick={() => setSelectedClarity(selectedClarity === cla ? "All" : cla)}
                  className={`py-1 text-xs border transition text-center font-medium ${
                    selectedClarity === cla
                      ? "border-white bg-white text-black"
                      : "border-neutral-800 bg-[#181818] text-neutral-400 hover:border-neutral-600 hover:text-white"
                  }`}
                >
                  {cla}
                </button>
              ))}
            </div>
          </div>

          {/* Cut Grade */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-medium">
                Cut Quality
              </label>
              {selectedCut !== "All" && (
                <button
                  onClick={() => setSelectedCut("All")}
                  className="text-[10px] text-neutral-400 underline hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1">
              {allCuts.map((cut) => (
                <button
                  key={cut}
                  onClick={() => setSelectedCut(selectedCut === cut ? "All" : cut)}
                  className={`py-1 text-[11px] border transition text-center font-medium ${
                    selectedCut === cut
                      ? "border-white bg-white text-black"
                      : "border-neutral-800 bg-[#181818] text-neutral-400 hover:border-neutral-600 hover:text-white"
                  }`}
                >
                  {cut}
                </button>
              ))}
            </div>
          </div>

          {/* Certification Lab */}
          <div className="space-y-2.5">
            <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 block font-medium">
              Certification Lab
            </label>
            <div className="grid grid-cols-3 gap-1">
              {["All", "GIA", "IGI"].map((lab) => (
                <button
                  key={lab}
                  onClick={() => setSelectedLab(lab)}
                  className={`py-1 text-xs uppercase border transition font-medium ${
                    selectedLab === lab
                      ? "border-white bg-white text-black"
                      : "border-neutral-800 bg-[#181818] text-neutral-400 hover:border-neutral-600 hover:text-white"
                  }`}
                >
                  {lab}
                </button>
              ))}
            </div>
          </div>

          {/* Transparent Sourcing Callout */}
          <div className="p-4 bg-[#181818] border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FBC90B]" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-white">
                Surat Cutter Guarantee
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Every stone is directly inspected, weighed, and laser-inscribed in Surat, eliminating retail middlemen margins.
            </p>
          </div>
        </aside>

        {/* Diamond Results Section */}
        <main className="lg:col-span-3">
          {filteredDiamonds.length === 0 ? (
            <div className="p-16 text-center bg-[#121212] border border-neutral-800 space-y-4">
              <Gem className="w-10 h-10 text-neutral-600 mx-auto" />
              <h3 className="font-serif text-2xl text-white">No Matching Stones Found</h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                We maintain direct access to Surat vault inventories and custom cutter schedules. Contact our senior diamond concierge to source your exact stone parameters.
              </p>
              <button
                onClick={resetFilters}
                className="inline-block mt-2 px-8 py-3 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* ================= GRID VIEW (IMPERIAL OBSIDIAN & GOLD) ================= */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDiamonds.map((diamond) => {
                const isSelectedInBuilder = selectedDiamond?.id === diamond.id;
                const retailEst = diamond.price ? Math.round(diamond.price * 1.45) : null;
                const isGIA = diamond.certificateLab === "GIA";

                return (
                  <div
                    key={diamond.id}
                    className={`bg-gradient-to-b from-[#14151B] to-[#0E0F14] border transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(245,158,11,0.15)] ${
                      isSelectedInBuilder ? "border-amber-400 ring-1 ring-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]" : "border-white/[0.08] hover:border-amber-400/60"
                    }`}
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#181818]">
                      <Image
                        src={diamond.images[0]}
                        alt={diamond.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 bg-black/85 backdrop-blur-md text-amber-300 border border-amber-500/40 font-medium shadow-sm">
                          {diamond.type}
                        </span>
                        <span className="text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 bg-black/85 backdrop-blur-md text-neutral-200 border border-white/[0.15] shadow-sm">
                          {diamond.shape}
                        </span>
                      </div>

                      <span className={`absolute top-3 right-3 text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 backdrop-blur-md font-semibold shadow-sm border ${
                        isGIA ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40" : "bg-sky-950/80 text-sky-300 border-sky-500/40"
                      }`}>
                        {diamond.certificateLab}
                      </span>

                      {isSelectedInBuilder && (
                        <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-black text-center py-1.5 text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm shadow-md">
                          Selected for Ring Builder
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase text-amber-400/80 tracking-[0.2em] font-mono block">
                            {diamond.sku}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">
                            Ratio: {diamond.ratio || "1.00"}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg text-white mt-1 font-light tracking-tight group-hover:text-amber-300 transition-colors">
                          {diamond.carat}ct {diamond.shape} Brilliant
                        </h3>

                        {/* Direct Bench Price Breakdown */}
                        <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-sans">
                              Direct Bench Price
                            </span>
                            <span className="font-serif text-xl font-normal text-amber-300">
                              ${diamond.price ? diamond.price.toLocaleString() : "Upon Request"}
                            </span>
                          </div>
                          {retailEst && (
                            <div className="text-right">
                              <span className="text-[10px] text-neutral-500 line-through block">
                                Retail ${retailEst.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-emerald-300 font-medium">
                                Save ~31%
                              </span>
                            </div>
                          )}
                        </div>

                        {/* 4Cs Quick Matrix */}
                        <div className="grid grid-cols-4 gap-1 mt-3 p-2 bg-[#101116] border border-amber-500/20 text-center text-xs">
                          <div>
                            <span className="text-[9px] text-neutral-400 block uppercase">Carat</span>
                            <span className="text-xs text-white font-medium mt-0.5 block">{diamond.carat}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-neutral-400 block uppercase">Color</span>
                            <span className="text-xs text-white font-medium mt-0.5 block">{diamond.color}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-neutral-400 block uppercase">Clarity</span>
                            <span className="text-xs text-white font-medium mt-0.5 block">{diamond.clarity}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-neutral-400 block uppercase">Cut</span>
                            <span className="text-xs text-white font-medium mt-0.5 block">{diamond.cut}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                        <button
                          onClick={() => handleSelectForRingBuilder(diamond)}
                          className={`w-full py-2.5 text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center gap-1.5 ${
                            isSelectedInBuilder
                              ? "gold-btn"
                              : "gold-outline-btn hover:text-white"
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isSelectedInBuilder ? "Selected &rarr; Go to Builder" : "+ Add to Ring Builder"}</span>
                        </button>

                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() =>
                              addItem({
                                itemType: "diamond",
                                id: diamond.id,
                                sku: diamond.sku,
                                name: diamond.name,
                                image: diamond.images[0],
                                subtitle: `${diamond.carat}ct ${diamond.shape} ${diamond.type}`,
                                detail: `Color: ${diamond.color} | Clarity: ${diamond.clarity} | Lab: ${diamond.certificateLab}`,
                              })
                            }
                            className="text-[11px] text-neutral-300 hover:text-amber-300 flex items-center gap-1 underline transition"
                          >
                            {isInEnquiry(diamond.id) ? (
                              <span className="text-amber-300 font-medium">In Enquiry &check;</span>
                            ) : (
                              <span>Save to Portfolio</span>
                            )}
                          </button>

                          <Link
                            href={`/diamonds/${diamond.id}`}
                            className="text-[11px] text-neutral-300 hover:text-amber-300 hover:underline font-medium flex items-center gap-1 uppercase tracking-wider transition"
                          >
                            <span>Inspect Specs</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ================= RITANI INVENTORY TABLE VIEW (IMPERIAL GOLD) ================= */
            <div className="bg-[#101116] border border-amber-500/20 overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#14151D] border-b border-amber-500/20 text-[10px] uppercase tracking-wider text-amber-300 font-mono">
                    <th className="py-3.5 px-4 font-medium">Shape</th>
                    <th className="py-3.5 px-3 font-medium">Carat</th>
                    <th className="py-3.5 px-3 font-medium">Cut</th>
                    <th className="py-3.5 px-3 font-medium">Color</th>
                    <th className="py-3.5 px-3 font-medium">Clarity</th>
                    <th className="py-3.5 px-3 font-medium">Lab</th>
                    <th className="py-3.5 px-3 font-medium">Ratio</th>
                    <th className="py-3.5 px-3 font-medium">Table %</th>
                    <th className="py-3.5 px-3 font-medium">Depth %</th>
                    <th className="py-3.5 px-4 font-medium text-right">Direct Price</th>
                    <th className="py-3.5 px-4 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredDiamonds.map((diamond) => {
                    const isSelectedInBuilder = selectedDiamond?.id === diamond.id;

                    return (
                      <tr
                        key={diamond.id}
                        className={`hover:bg-amber-500/[0.08] transition-colors ${
                          isSelectedInBuilder ? "bg-amber-500/15" : ""
                        }`}
                      >
                        {/* Shape */}
                        <td className="py-3.5 px-4">
                          <Link href={`/diamonds/${diamond.id}`} className="flex items-center gap-2 group">
                            <DiamondShapeIcon shape={diamond.shape} className="w-5 h-5 text-amber-400 shrink-0" />
                            <div>
                              <span className="font-medium text-white group-hover:text-amber-300 transition-colors block">
                                {diamond.shape}
                              </span>
                              <span className="text-[10px] text-amber-400/80 font-mono">{diamond.type}</span>
                            </div>
                          </Link>
                        </td>

                        {/* Carat */}
                        <td className="py-3.5 px-3 font-medium text-white">
                          {diamond.carat.toFixed(2)}ct
                        </td>

                        {/* Cut */}
                        <td className="py-3.5 px-3 text-neutral-300">
                          {diamond.cut}
                        </td>

                        {/* Color */}
                        <td className="py-3.5 px-3 font-medium text-white">
                          {diamond.color}
                        </td>

                        {/* Clarity */}
                        <td className="py-3.5 px-3 font-medium text-white">
                          {diamond.clarity}
                        </td>

                        {/* Lab */}
                        <td className="py-3.5 px-3">
                          <span className={`px-1.5 py-0.5 border text-[10px] font-semibold ${
                            diamond.certificateLab === "GIA" ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-300" : "bg-sky-950/70 border-sky-500/40 text-sky-300"
                          }`}>
                            {diamond.certificateLab}
                          </span>
                        </td>

                        {/* Ratio */}
                        <td className="py-3.5 px-3 text-neutral-300 font-mono">
                          {diamond.ratio || "1.00"}
                        </td>

                        {/* Table % */}
                        <td className="py-3.5 px-3 text-neutral-300">
                          {diamond.tablePct}%
                        </td>

                        {/* Depth % */}
                        <td className="py-3.5 px-3 text-neutral-300">
                          {diamond.depthPct}%
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4 text-right font-medium text-amber-300">
                          <span className="font-serif text-sm">
                            ${diamond.price ? diamond.price.toLocaleString() : "Enquire"}
                          </span>
                        </td>

                        {/* Action CTA */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleSelectForRingBuilder(diamond)}
                              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold transition ${
                                isSelectedInBuilder
                                  ? "gold-btn"
                                  : "gold-outline-btn"
                              }`}
                              title="Add to Ring Builder"
                            >
                              {isSelectedInBuilder ? "Selected" : "+ Ring Builder"}
                            </button>
                            <Link
                              href={`/diamonds/${diamond.id}`}
                              className="px-2.5 py-1.5 text-[11px] uppercase tracking-wider border border-white/[0.15] hover:border-amber-400 text-neutral-300 hover:text-white transition"
                              title="View Details"
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default function DiamondCatalogPage() {
  return (
    <div className="bg-[#08090B] text-[#EDEDED] pt-28 pb-24 min-h-screen">
      <Suspense
        fallback={
          <div className="p-24 text-center text-xs text-amber-400 uppercase tracking-widest font-mono">
            Loading Certified Diamond Vault...
          </div>
        }
      >
        <DiamondCatalogContent />
      </Suspense>
    </div>
  );
}
