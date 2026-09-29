"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRingBuilder } from "@/context/RingBuilderContext";
import { useEnquiry } from "@/context/EnquiryContext";
import { initialDiamonds } from "@/lib/data/diamonds";
import { initialJewelry } from "@/lib/data/jewelry";
import { DiamondShapeIcon } from "@/components/common/DiamondShapeIcon";
import { DiamondShape, PreciousMetal, RingSettingStyle } from "@/lib/types";
import {
  Sparkles,
  Check,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Gem,
  MessageSquare,
  ArrowRight,
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

const settingStyles: RingSettingStyle[] = [
  "Solitaire",
  "Halo",
  "Pave",
  "Three-Stone",
  "Bezel",
  "Vintage",
];

const metalsList: { label: PreciousMetal; colorClass: string }[] = [
  { label: "Platinum", colorClass: "bg-slate-300 border-slate-400" },
  { label: "18k White Gold", colorClass: "bg-gray-200 border-gray-400" },
  { label: "18k Yellow Gold", colorClass: "bg-amber-300 border-amber-500" },
  { label: "18k Rose Gold", colorClass: "bg-rose-300 border-rose-400" },
];

const ringSizes = ["4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];

export default function RingBuilderPage() {
  const {
    selectedDiamond,
    selectedSetting,
    selectedMetal,
    ringSize,
    step,
    setDiamond,
    setSetting,
    setSelectedMetal,
    setRingSize,
    setStep,
    removeDiamond,
    removeSetting,
    resetRingBuilder,
    totalPrice,
  } = useRingBuilder();

  const { addItem, openDrawer } = useEnquiry();

  // Local filters for choosing setting
  const [selectedSettingStyle, setSelectedSettingStyle] = useState<string>("All");

  // Local filters for choosing diamond
  const [originFilter, setOriginFilter] = useState<string>("All");
  const [selectedShape, setSelectedShape] = useState<string>("All");
  const [minCarat, setMinCarat] = useState<number>(0.5);
  const [maxCarat, setMaxCarat] = useState<number>(6.0);
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [selectedClarity, setSelectedClarity] = useState<string>("All");

  // Filtered settings
  const ringSettings = useMemo(() => {
    return initialJewelry.filter((item) => {
      if (item.category !== "Rings") return false;
      if (selectedSettingStyle !== "All" && item.settingStyle !== selectedSettingStyle) return false;
      return true;
    });
  }, [selectedSettingStyle]);

  // Filtered diamonds
  const filteredDiamonds = useMemo(() => {
    return initialDiamonds.filter((d) => {
      if (originFilter !== "All" && d.type !== originFilter) return false;
      if (selectedShape !== "All" && d.shape.toLowerCase() !== selectedShape.toLowerCase()) return false;
      if (d.carat < minCarat || d.carat > maxCarat) return false;
      if (selectedColor !== "All" && d.color !== selectedColor) return false;
      if (selectedClarity !== "All" && d.clarity !== selectedClarity) return false;
      return true;
    });
  }, [originFilter, selectedShape, minCarat, maxCarat, selectedColor, selectedClarity]);

  // Handle Complete Ring submission to Portfolio
  const handleAddToPortfolio = () => {
    if (!selectedDiamond || !selectedSetting) return;

    addItem({
      itemType: "jewelry",
      id: `custom-ring-${selectedDiamond.id}-${selectedSetting.id}`,
      sku: `CUSTOM-${selectedSetting.sku}-${selectedDiamond.sku}`,
      name: `Custom ${selectedSetting.name} with ${selectedDiamond.carat}ct ${selectedDiamond.shape}`,
      image: selectedSetting.images[0],
      subtitle: `${selectedMetal} • Size ${ringSize} • Total: $${totalPrice.toLocaleString()}`,
      detail: `Diamond: ${selectedDiamond.carat}ct ${selectedDiamond.shape} (${selectedDiamond.color}/${selectedDiamond.clarity} ${selectedDiamond.certificateLab}) + Setting: ${selectedSetting.name}`,
    });

    openDrawer();
  };

  const whatsappInquiryUrl = `https://wa.me/919825100000?text=${encodeURIComponent(
    `Hello Dhanlaxmi Diamond Concierge, I just designed a custom engagement ring on your Ritani-style Ring Builder:\n\n` +
      `• Setting: ${selectedSetting?.name || "None"} (${selectedMetal}, Size ${ringSize})\n` +
      `• Diamond: ${selectedDiamond ? `${selectedDiamond.carat}ct ${selectedDiamond.shape} ${selectedDiamond.color}/${selectedDiamond.clarity} ${selectedDiamond.certificateLab} #${selectedDiamond.certificateNumber}` : "None"}\n` +
      `• Total Valuation: $${totalPrice.toLocaleString()}\n\n` +
      `Please provide consultation and availability.`
  )}`;

  return (
    <div className="bg-[#08090B] text-[#EDEDED] pt-28 pb-24 min-h-screen">
      {/* Ritani-Style 3-Step Sticky Progress Bar (Imperial Obsidian & Gold) */}
      <section className="sticky top-20 z-30 bg-[#08090B]/95 backdrop-blur-md border-b border-amber-500/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* 3 Steps */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 flex-1 max-w-3xl">
              {/* Step 1: Setting */}
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 text-left transition border ${
                  step === 1
                    ? "bg-[#161720] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                    : selectedSetting
                    ? "bg-[#121319] border-emerald-500/50"
                    : "bg-[#0E0F14] border-white/[0.08] text-neutral-400"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                    selectedSetting
                      ? "bg-emerald-600 text-white"
                      : step === 1
                      ? "bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {selectedSetting ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : "1"}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-sans tracking-wider text-amber-400/80 block font-medium">
                    Step 1
                  </span>
                  <span className="text-xs sm:text-sm font-serif font-medium text-white truncate block">
                    {selectedSetting ? selectedSetting.name : "Choose Setting"}
                  </span>
                  {selectedSetting && (
                    <span className="text-[11px] text-amber-300 block font-sans">
                      ${selectedSetting.price?.toLocaleString()}
                    </span>
                  )}
                </div>
              </button>

              {/* Step 2: Diamond */}
              <button
                onClick={() => setStep(2)}
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 text-left transition border ${
                  step === 2
                    ? "bg-[#161720] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                    : selectedDiamond
                    ? "bg-[#121319] border-emerald-500/50"
                    : "bg-[#0E0F14] border-white/[0.08] text-neutral-400"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                    selectedDiamond
                      ? "bg-emerald-600 text-white"
                      : step === 2
                      ? "bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {selectedDiamond ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : "2"}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-sans tracking-wider text-amber-400/80 block font-medium">
                    Step 2
                  </span>
                  <span className="text-xs sm:text-sm font-serif font-medium text-white truncate block">
                    {selectedDiamond
                      ? `${selectedDiamond.carat}ct ${selectedDiamond.shape}`
                      : "Choose Diamond"}
                  </span>
                  {selectedDiamond && (
                    <span className="text-[11px] text-amber-300 block font-sans">
                      ${selectedDiamond.price?.toLocaleString()}
                    </span>
                  )}
                </div>
              </button>

              {/* Step 3: Complete Ring */}
              <button
                onClick={() => {
                  if (selectedSetting && selectedDiamond) setStep(3);
                }}
                disabled={!selectedSetting || !selectedDiamond}
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 text-left transition border ${
                  step === 3
                    ? "bg-[#161720] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                    : selectedSetting && selectedDiamond
                    ? "bg-[#121319] border-emerald-500/50 hover:border-amber-400 cursor-pointer"
                    : "bg-[#0E0F14] border-white/[0.05] opacity-40 cursor-not-allowed text-neutral-500"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                    step === 3
                      ? "bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                      : selectedSetting && selectedDiamond
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-800 text-neutral-500"
                  }`}
                >
                  3
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-sans tracking-wider text-amber-400/80 block font-medium">
                    Step 3
                  </span>
                  <span className="text-xs sm:text-sm font-serif font-medium text-white truncate block">
                    Complete Ring
                  </span>
                  {totalPrice > 0 && (
                    <span className="text-[11px] text-amber-300 font-semibold block">
                      ${totalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Quick Actions / Reset */}
            <div className="flex items-center justify-end gap-3">
              {(selectedSetting || selectedDiamond) && (
                <button
                  onClick={resetRingBuilder}
                  className="px-3.5 py-2 border border-white/[0.15] text-[11px] uppercase tracking-wider text-neutral-300 hover:text-white hover:border-amber-400 transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Over</span>
                </button>
              )}
              {selectedSetting && selectedDiamond && step !== 3 && (
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2 gold-btn text-xs tracking-widest font-semibold flex items-center gap-1.5"
                >
                  <span>Review Ring</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STEP 1: CHOOSE A SETTING                                                 */}
      {/* ========================================================================= */}
      {step === 1 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-900 pb-6">
            <div>
              <span className="text-[11px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase block font-medium">
                Custom Ring Builder &bull; Step 1
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
                Choose an Engagement Ring Setting
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
                Select your preferred architectural mount, crafted in solid 950 Platinum or 18k Gold by our Surat bench jewelers.
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="text-xs uppercase tracking-widest text-neutral-300 hover:text-white hover:underline font-medium flex items-center gap-1"
            >
              <span>Skip to Choose Diamond first</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Style Filter Tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedSettingStyle("All")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium ${
                selectedSettingStyle === "All"
                  ? "bg-white text-black"
                  : "border border-neutral-800 bg-[#121212] text-neutral-300 hover:border-neutral-500 hover:text-white"
              }`}
            >
              All Styles
            </button>
            {settingStyles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedSettingStyle(style)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium ${
                  selectedSettingStyle === style
                    ? "bg-white text-black"
                    : "border border-neutral-800 bg-[#121212] text-neutral-300 hover:border-neutral-500 hover:text-white"
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Settings Grid (Pure Dark) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ringSettings.map((setting) => {
              const isSelected = selectedSetting?.id === setting.id;

              return (
                <div
                  key={setting.id}
                  className={`bg-[#141414] border transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl ${
                    isSelected ? "border-white ring-1 ring-white" : "border-neutral-800 hover:border-neutral-500"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-[#181818]">
                    <Image
                      src={setting.images[0]}
                      alt={setting.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                      <span className="text-[10px] uppercase font-sans tracking-wider px-2.5 py-1 bg-black/85 text-white border border-neutral-700 font-medium shadow-sm">
                        {setting.settingStyle || "Setting"}
                      </span>
                      <span className="text-[10px] uppercase font-sans tracking-wider px-2.5 py-1 bg-black/85 text-neutral-300 border border-neutral-700 shadow-sm">
                        {setting.metal}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-3.5 right-3.5 px-3 py-1 bg-emerald-600 text-white text-[10px] uppercase font-semibold tracking-wider flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Selected</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase text-neutral-500 tracking-[0.2em] block">
                          {setting.sku}
                        </span>
                        <span className="font-serif text-lg text-white font-semibold">
                          ${setting.price?.toLocaleString()}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl text-white mt-1.5 font-light tracking-tight group-hover:text-brand-gold">
                        {setting.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                        {setting.description}
                      </p>

                      {/* Compatible shapes info */}
                      {setting.compatibleShapes && (
                        <div className="mt-3 text-[11px] text-neutral-400">
                          <span className="font-medium text-neutral-300">Fits Shapes: </span>
                          <span>{setting.compatibleShapes.slice(0, 4).join(", ")}...</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-neutral-800 flex items-center gap-3">
                      <button
                        onClick={() => setSetting(setting)}
                        className={`w-full py-3 text-xs uppercase tracking-widest font-medium transition flex items-center justify-center gap-2 ${
                          isSelected
                            ? "bg-emerald-700 text-white"
                            : "bg-white hover:bg-neutral-200 text-black"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Setting Selected (Proceed)</span>
                          </>
                        ) : (
                          <>
                            <span>Select Setting</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: CHOOSE A DIAMOND                                                  */}
      {/* ========================================================================= */}
      {step === 2 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-900 pb-6">
            <div>
              <span className="text-[11px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase block font-medium">
                Custom Ring Builder &bull; Step 2
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
                Choose Your Center Diamond
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
                Select an earth-mined GIA certified or CVD lab-grown IGI certified stone directly from our Surat vault.
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs uppercase tracking-widest text-neutral-300 hover:text-white hover:underline font-medium flex items-center gap-1"
            >
              <span>&larr; Back to Change Setting</span>
            </button>
          </div>

          {/* Ritani-Style Visual Shape Selector Bar (Dark) */}
          <div className="bg-[#121212] border border-neutral-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                Select Diamond Silhouette
              </span>
              {selectedShape !== "All" && (
                <button
                  onClick={() => setSelectedShape("All")}
                  className="text-xs text-white underline font-medium"
                >
                  View All Shapes
                </button>
              )}
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-3">
              {allShapes.map((shape) => {
                const isActive = selectedShape.toLowerCase() === shape.toLowerCase();
                return (
                  <button
                    key={shape}
                    onClick={() => setSelectedShape(isActive ? "All" : shape)}
                    className={`flex flex-col items-center justify-center p-2.5 sm:p-3 border transition text-center ${
                      isActive
                        ? "bg-white border-white text-black"
                        : "bg-[#181818] border-neutral-800 text-neutral-400 hover:border-neutral-500 hover:text-white"
                    }`}
                  >
                    <DiamondShapeIcon shape={shape} isActive={isActive} className="w-8 h-8 sm:w-9 sm:h-9" />
                    <span className="text-[11px] font-medium mt-1.5 leading-tight uppercase">
                      {shape}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Filter Bar (Dark) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-[#121212] border border-neutral-800">
            {/* Origin */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                Origin
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#181818] p-1 border border-neutral-700">
                {["All", "Natural", "Lab-Grown"].map((orig) => (
                  <button
                    key={orig}
                    onClick={() => setOriginFilter(orig)}
                    className={`py-1.5 text-xs uppercase tracking-wider font-medium transition ${
                      originFilter === orig ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {orig}
                  </button>
                ))}
              </div>
            </div>

            {/* Carat Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-medium text-neutral-400">
                <span className="uppercase tracking-wider">Carat Weight</span>
                <span className="text-white font-semibold">{minCarat.toFixed(2)}ct - {maxCarat.toFixed(2)}ct</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={minCarat}
                onChange={(e) => setMinCarat(parseFloat(e.target.value))}
                className="w-full accent-white bg-neutral-800 mt-3"
              />
            </div>

            {/* Color */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                Color Grade
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
              >
                <option value="All">All Colors (D - Fancy Yellow)</option>
                <option value="D">D (Colorless)</option>
                <option value="E">E (Colorless)</option>
                <option value="F">F (Colorless)</option>
                <option value="Fancy Yellow">Fancy Yellow</option>
              </select>
            </div>

            {/* Clarity */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                Clarity Grade
              </label>
              <select
                value={selectedClarity}
                onChange={(e) => setSelectedClarity(e.target.value)}
                className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-xs text-white focus:border-white focus:outline-none"
              >
                <option value="All">All Clarity Grades</option>
                <option value="VVS1">VVS1</option>
                <option value="VVS2">VVS2</option>
                <option value="VS1">VS1</option>
                <option value="VS2">VS2</option>
              </select>
            </div>
          </div>

          {/* Diamonds Results (Pure Dark) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDiamonds.map((diamond) => {
              const isSelected = selectedDiamond?.id === diamond.id;

              return (
                <div
                  key={diamond.id}
                  className={`bg-[#141414] border transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl ${
                    isSelected ? "border-white ring-1 ring-white" : "border-neutral-800 hover:border-neutral-500"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-[#181818]">
                    <Image
                      src={diamond.images[0]}
                      alt={diamond.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
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

                    {isSelected && (
                      <div className="absolute bottom-3.5 right-3.5 px-3 py-1 bg-emerald-600 text-white text-[10px] uppercase font-semibold tracking-wider flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Selected</span>
                      </div>
                    )}
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

                      {/* 4Cs Matrix */}
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

                    <div className="pt-4 border-t border-neutral-800">
                      <button
                        onClick={() => setDiamond(diamond)}
                        className={`w-full py-3 text-xs uppercase tracking-widest font-medium transition flex items-center justify-center gap-2 ${
                          isSelected
                            ? "bg-emerald-700 text-white"
                            : "bg-white hover:bg-neutral-200 text-black"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Diamond Selected (Proceed)</span>
                          </>
                        ) : (
                          <>
                            <span>Select This Diamond</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: COMPLETE RING REVIEW                                              */}
      {/* ========================================================================= */}
      {step === 3 && selectedSetting && selectedDiamond && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-12 animate-fadeIn">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase block font-medium">
              Custom Ring Builder &bull; Final Step
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
              Review Your Custom Ring
            </h1>
            <p className="text-sm text-neutral-400 font-light">
              Meticulously engineered and matched by our master diamond cutters and bench goldsmiths in Surat.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Composite Ring Visualizer (Dark) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative aspect-square bg-[#121212] border border-neutral-800 overflow-hidden p-8 flex items-center justify-center shadow-2xl">
                <Image
                  src={selectedSetting.images[0]}
                  alt={selectedSetting.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/85 border border-neutral-700 px-3.5 py-1.5 text-xs text-white font-medium shadow-sm">
                  <span>Custom Ring Configuration</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md border border-neutral-700 p-3 text-xs text-neutral-300 flex justify-between items-center shadow-sm">
                  <span>
                    Setting: <strong className="text-white">{selectedSetting.name}</strong>
                  </span>
                  <span>
                    Diamond: <strong className="text-white">{selectedDiamond.carat}ct {selectedDiamond.shape}</strong>
                  </span>
                </div>
              </div>

              {/* Side by side mini gallery */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#141414] border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-sans tracking-wider text-neutral-400 font-medium">
                      Selected Setting
                    </span>
                    <button
                      onClick={() => setStep(1)}
                      className="text-[11px] text-[#D4AF37] underline hover:text-white font-medium"
                    >
                      Change
                    </button>
                  </div>
                  <h4 className="font-serif text-base text-white">{selectedSetting.name}</h4>
                  <p className="text-xs text-neutral-400">
                    {selectedSetting.settingStyle} &bull; ${selectedSetting.price?.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 bg-[#141414] border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-sans tracking-wider text-neutral-400 font-medium">
                      Selected Diamond
                    </span>
                    <button
                      onClick={() => setStep(2)}
                      className="text-[11px] text-[#D4AF37] underline hover:text-white font-medium"
                    >
                      Change
                    </button>
                  </div>
                  <h4 className="font-serif text-base text-white">
                    {selectedDiamond.carat}ct {selectedDiamond.shape}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {selectedDiamond.color}/{selectedDiamond.clarity} &bull; {selectedDiamond.certificateLab} &bull; ${selectedDiamond.price?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Customization & Transparent Valuation (Imperial Obsidian & Gold) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Metal Selector */}
              <div className="space-y-3 p-6 bg-[#121319] border border-amber-500/20">
                <label className="text-xs uppercase tracking-wider text-amber-400 font-medium block font-mono">
                  Select Precious Metal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {metalsList.map((m) => (
                    <button
                      key={m.label}
                      onClick={() => setSelectedMetal(m.label)}
                      className={`p-3 text-xs text-left border transition flex items-center gap-2.5 ${
                        selectedMetal === m.label
                          ? "border-amber-400 bg-amber-500/15 font-semibold text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                          : "border-white/[0.08] bg-[#0E0F14] text-neutral-300 hover:border-amber-400/50 hover:text-white"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full border ${m.colorClass} shrink-0`} />
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ring Size Selector */}
              <div className="space-y-3 p-6 bg-[#121319] border border-amber-500/20">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase tracking-wider text-amber-400 font-medium font-mono">
                    Select Ring Size (US)
                  </label>
                  <span className="text-[11px] text-amber-300/80">Free Complimentary Resizing</span>
                </div>
                <select
                  value={ringSize}
                  onChange={(e) => setRingSize(e.target.value)}
                  className="w-full bg-[#0E0F14] border border-white/[0.12] px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  {ringSizes.map((s) => (
                    <option key={s} value={s}>
                      US Size {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ritani-Style Transparent Pricing Breakdown (Imperial Gold) */}
              <div className="p-6 bg-gradient-to-b from-[#15161C] to-[#0E0F14] border border-amber-500/30 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-medium">
                    Transparent Price Breakdown
                  </span>
                  <span className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/70 px-2.5 py-0.5 border border-emerald-500/40 shadow-sm">
                    Direct Surat Cutting Price
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-neutral-300">
                    <span>Center Diamond ({selectedDiamond.carat}ct {selectedDiamond.shape}):</span>
                    <span className="font-mono text-amber-300">${selectedDiamond.price?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Setting Mount ({selectedMetal}):</span>
                    <span className="font-mono text-amber-300">${selectedSetting.price?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Labor &amp; Micro-Setting (Surat):</span>
                    <span className="font-mono text-emerald-300 font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Insured Armored Handover:</span>
                    <span className="font-mono text-emerald-300 font-medium">Complimentary</span>
                  </div>

                  <div className="pt-3 border-t border-amber-500/20 flex justify-between items-baseline">
                    <span className="text-sm font-serif text-white font-semibold">Total Custom Ring:</span>
                    <span className="font-serif text-3xl text-amber-300 font-bold">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-amber-500/15 via-[#181924] to-[#121319] border border-amber-500/30 text-[11px] text-neutral-200 mt-2 shadow-sm">
                    <span>Estimated Traditional Retailer Price: </span>
                    <strong className="line-through text-neutral-400 font-mono">
                      ${Math.round(totalPrice * 1.55).toLocaleString()}
                    </strong>
                    <span className="text-emerald-300 font-semibold ml-1">
                      (You save ~${Math.round(totalPrice * 0.55).toLocaleString()} sourcing direct)
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-3">
                  <button
                    onClick={handleAddToPortfolio}
                    className="w-full py-4 gold-btn text-xs tracking-widest font-semibold transition duration-300 shadow-xl"
                  >
                    Add Complete Ring to Portfolio &amp; Inquire
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 border border-emerald-500/50 text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 font-medium shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Inquire via WhatsApp Concierge</span>
                  </a>
                </div>

                <div className="pt-2 text-[11px] text-neutral-400 space-y-1 text-center font-light">
                  <p>&bull; 30-Day Money-Back Guarantee &bull; 100% Conflict-Free KPCS</p>
                  <p>&bull; Official GIA / IGI Physical Dossier Included</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
