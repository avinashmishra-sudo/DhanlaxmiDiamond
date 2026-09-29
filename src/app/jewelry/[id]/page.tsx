"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { initialJewelry } from "@/lib/data/jewelry";
import { useEnquiry } from "@/context/EnquiryContext";
import { useRingBuilder } from "@/context/RingBuilderContext";
import { DiamondShapeIcon } from "@/components/common/DiamondShapeIcon";
import { PreciousMetal } from "@/lib/types";
import { ArrowLeft, Gem, MessageSquare, ShieldCheck, Share2, Check, Sparkles } from "lucide-react";

const metalOptions: { label: PreciousMetal; hex: string }[] = [
  { label: "Platinum", hex: "#E5E5E5" },
  { label: "18k White Gold", hex: "#EDEDED" },
  { label: "18k Yellow Gold", hex: "#F3E5AB" },
  { label: "18k Rose Gold", hex: "#ECC5C0" },
];

export default function JewelryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jewelryId = params.id as string;
  const item = initialJewelry.find((j) => j.id === jewelryId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState<PreciousMetal>(item?.metal || "Platinum");

  const { addItem, isInEnquiry } = useEnquiry();
  const { setSetting, selectedSetting, setSelectedMetal: setBuilderMetal } = useRingBuilder();

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
        <Gem className="w-12 h-12 text-neutral-600 mb-4" />
        <h2 className="font-serif text-3xl text-white font-light">Jewelry Piece Not Found</h2>
        <p className="text-xs text-neutral-400 mt-2 max-w-sm">
          The requested creation is either no longer available or the identifier is invalid.
        </p>
        <Link
          href="/jewelry"
          className="mt-6 px-8 py-3 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
        >
          Return to Fine Jewelry
        </Link>
      </div>
    );
  }

  const isRingSetting = item.category === "Rings" || Boolean(item.settingStyle);
  const isSelectedSetting = selectedSetting?.id === item.id;

  const handleSelectForRingBuilder = () => {
    setSetting(item);
    setBuilderMetal(selectedMetal);
    router.push("/ring-builder");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/919825100000?text=${encodeURIComponent(
    `Hello Dhanlaxmi Diamond Concierge, I am inquiring regarding your fine jewelry piece "${item.name}" (SKU: ${item.sku}, ${selectedMetal}, ${item.totalDiamondWeight}) priced at $${item.price?.toLocaleString()}. Please provide consultation and sizing details.`
  )}`;

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-28 pb-24 min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 border-b border-neutral-900 flex items-center justify-between text-xs text-neutral-400">
        <Link
          href="/jewelry"
          className="flex items-center gap-2 hover:text-white transition uppercase tracking-wider font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Fine Jewelry</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-white font-medium tracking-wider">{item.sku}</span>
          <button
            onClick={handleShare}
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery (Dark) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-square bg-[#121212] border border-neutral-800 overflow-hidden group">
            <Image
              src={item.images[activeImageIndex] || item.images[0]}
              alt={item.name}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-black/85 text-white text-[10px] uppercase tracking-wider border border-neutral-700 font-medium shadow-sm">
                {item.category}
              </span>
              <span className="px-3 py-1 bg-black/85 text-neutral-300 text-[10px] uppercase tracking-wider border border-neutral-700 shadow-sm">
                {selectedMetal}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {item.images.length > 1 && (
            <div className="flex gap-4">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 bg-[#161616] border transition overflow-hidden ${
                    activeImageIndex === idx
                      ? "border-white ring-1 ring-white"
                      : "border-neutral-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Compatible Diamond Shapes for Settings (Dark) */}
          {item.compatibleShapes && item.compatibleShapes.length > 0 && (
            <div className="p-5 bg-[#141414] border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                  Compatible Center Diamond Shapes
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {item.compatibleShapes.length} Shapes Supported
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {item.compatibleShapes.map((shape) => (
                  <span
                    key={shape}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] border border-neutral-700 text-xs text-neutral-200 font-medium"
                  >
                    <DiamondShapeIcon shape={shape} className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{shape}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="p-5 bg-[#141414] border border-neutral-800 flex items-center gap-4">
            <ShieldCheck className="w-6 h-6 text-[#FBC90B] shrink-0" />
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every Dhanlaxmi fine jewelry creation is cast in solid hallmarked precious metals and meticulously mounted by senior bench artisans in Surat, India. Includes 30-day returns and lifetime warranty.
            </p>
          </div>
        </div>

        {/* Right: Details & CTAs (Dark) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium block mb-1.5">
              {item.collection || "Haute Joaillerie"} &bull; {item.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-light leading-tight tracking-tight">
              {item.name}
            </h1>
            <p className="text-xs text-neutral-400 mt-1.5 tracking-wider">
              SKU: {item.sku} &bull; {item.totalDiamondWeight}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 bg-[#141414] border border-neutral-800">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block font-medium">
                  {isRingSetting ? "Setting Bench Price" : "Atelier Price"}
                </span>
                <span className="font-serif text-3xl text-white mt-1 block font-light">
                  ${item.price?.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] text-neutral-300 uppercase font-mono px-2 py-1 bg-[#1F1F1F] border border-neutral-700">
                Direct Surat Bench
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              {isRingSetting
                ? "Price includes setting mount and side stones. Center diamond chosen separately in our Ring Builder."
                : "Handcrafted to order. Includes insured worldwide armored delivery and certificate of authenticity."}
            </p>
          </div>

          {/* Metal Choice Swatches (Dark) */}
          <div className="space-y-3 p-4 bg-[#141414] border border-neutral-800">
            <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-medium block">
              Precious Metal: <span className="text-white font-semibold">{selectedMetal}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {metalOptions.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setSelectedMetal(m.label)}
                  className={`flex items-center gap-2.5 p-2.5 border transition text-left text-xs ${
                    selectedMetal === m.label
                      ? "border-white bg-[#1E1E1E] font-medium text-white"
                      : "border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-neutral-600 shrink-0"
                    style={{ backgroundColor: m.hex }}
                  />
                  <span className="text-[11px]">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* If Ring Setting, Primary CTA is Ring Builder */}
          {isRingSetting && (
            <div className="space-y-3 p-5 bg-[#161616] border-2 border-white shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FBC90B]" />
                  <span>Custom Ring Builder</span>
                </span>
                <span className="text-[11px] text-neutral-400">
                  Step 1 &bull; Choose Setting
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                Pair this handcrafted setting with a certified natural or lab-grown loose diamond from Surat.
              </p>
              <button
                onClick={handleSelectForRingBuilder}
                className="w-full py-4 bg-white hover:bg-neutral-200 text-black text-xs uppercase tracking-widest font-medium transition duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#FBC90B]" />
                <span>
                  {isSelectedSetting
                    ? "Selected &bull; Continue in Ring Builder &rarr;"
                    : "Pair with a Diamond in Ring Builder &rarr;"}
                </span>
              </button>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-serif text-lg text-white font-light">
              Artisan Description
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {item.description}
            </p>
          </div>

          {/* Specs Table */}
          <div className="space-y-2 border-t border-neutral-800 pt-4">
            <h3 className="font-serif text-lg text-white font-light">
              Piece Specifications
            </h3>
            <div className="divide-y divide-neutral-800 text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-neutral-400">Precious Metal:</span>
                <span className="font-medium text-white">{selectedMetal}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-neutral-400">Total Diamond Weight:</span>
                <span className="font-medium text-white">{item.totalDiamondWeight}</span>
              </div>
              {item.specs.settingType && (
                <div className="py-2 flex justify-between">
                  <span className="text-neutral-400">Mounting Technique:</span>
                  <span className="font-medium text-white">{item.specs.settingType}</span>
                </div>
              )}
              {item.specs.dimensions && (
                <div className="py-2 flex justify-between">
                  <span className="text-neutral-400">Dimensions / Sizing:</span>
                  <span className="font-medium text-white">{item.specs.dimensions}</span>
                </div>
              )}
            </div>
          </div>

          {/* Secondary Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() =>
                addItem({
                  itemType: "jewelry",
                  id: item.id,
                  sku: item.sku,
                  name: item.name,
                  image: item.images[0],
                  subtitle: `${selectedMetal} &bull; ${item.category}`,
                  detail: item.totalDiamondWeight,
                })
              }
              className={`w-full py-3 text-xs uppercase tracking-widest font-medium transition duration-300 flex items-center justify-center gap-2 border ${
                isInEnquiry(item.id)
                  ? "bg-[#1C1C1C] border-white text-white"
                  : "border-neutral-700 text-neutral-300 hover:border-white hover:text-white"
              }`}
            >
              {isInEnquiry(item.id) ? (
                <>
                  <Check className="w-4 h-4 text-[#FBC90B]" />
                  <span>Piece In Portfolio &check;</span>
                </>
              ) : (
                <span>Save Piece to Enquiry Portfolio</span>
              )}
            </button>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-neutral-700 hover:border-white text-neutral-300 hover:text-white text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 font-medium"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Discuss With Jewelry Specialist</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
