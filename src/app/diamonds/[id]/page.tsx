"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { initialDiamonds } from "@/lib/data/diamonds";
import { useEnquiry } from "@/context/EnquiryContext";
import { useRingBuilder } from "@/context/RingBuilderContext";
import { DiamondShapeIcon } from "@/components/common/DiamondShapeIcon";
import {
  ShieldCheck,
  ArrowLeft,
  Gem,
  MessageSquare,
  FileText,
  Check,
  Share2,
  X,
  Sparkles,
  Info,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";

export default function DiamondDetailPage() {
  const params = useParams();
  const router = useRouter();
  const diamondId = params.id as string;
  const diamond = initialDiamonds.find((d) => d.id === diamondId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [transparencyModalOpen, setTransparencyModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addItem, isInEnquiry } = useEnquiry();
  const { selectedDiamond, setDiamond, selectedSetting } = useRingBuilder();

  if (!diamond) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
        <Gem className="w-12 h-12 text-neutral-600 mb-4" />
        <h2 className="font-serif text-3xl text-white font-light">Diamond Not Found</h2>
        <p className="text-xs text-neutral-400 mt-2 max-w-sm">
          The requested certified stone is either no longer in vault inventory or the identifier is invalid.
        </p>
        <Link
          href="/diamonds"
          className="mt-6 px-8 py-3 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
        >
          Return to Diamond Catalog
        </Link>
      </div>
    );
  }

  const isSelectedInBuilder = selectedDiamond?.id === diamond.id;
  const retailEstimate = diamond.price ? Math.round(diamond.price * 1.48) : null;
  const savings = retailEstimate && diamond.price ? retailEstimate - diamond.price : null;

  const handlePairWithRingBuilder = () => {
    setDiamond(diamond);
    router.push("/ring-builder");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/919825100000?text=${encodeURIComponent(
    `Hello Dhanlaxmi Diamond Concierge, I am inquiring regarding certified stone SKU: ${diamond.sku} (${diamond.carat}ct ${diamond.shape} ${diamond.color} ${diamond.clarity} ${diamond.certificateLab} #${diamond.certificateNumber}) listed at $${diamond.price?.toLocaleString()}. Please provide consultation and reserve details.`
  )}`;

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-28 pb-24 min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 border-b border-neutral-900 flex items-center justify-between text-xs text-neutral-400">
        <Link
          href="/diamonds"
          className="flex items-center gap-2 hover:text-white transition uppercase tracking-wider font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Certified Inventory</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-white font-medium tracking-wider">{diamond.sku}</span>
          <button
            onClick={handleShare}
            className="hover:text-white transition flex items-center gap-1.5"
            title="Copy Stone Link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "Link Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Main Showcase */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery & Zoom Preview (Dark) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-square bg-[#121212] border border-neutral-800 overflow-hidden group">
            <Image
              src={diamond.images[activeImageIndex] || diamond.images[0]}
              alt={diamond.name}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-black/85 text-white text-[10px] uppercase tracking-wider border border-neutral-700 font-medium shadow-sm">
                {diamond.type}
              </span>
              <span className="px-3 py-1 bg-black/85 text-neutral-300 text-[10px] uppercase tracking-wider border border-neutral-700 shadow-sm flex items-center gap-1">
                <DiamondShapeIcon shape={diamond.shape} className="w-3.5 h-3.5" />
                <span>{diamond.shape}</span>
              </span>
            </div>

            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-[10px] text-neutral-400 tracking-wider border border-neutral-700">
              High-Resolution Studio Macro Facet Inspection
            </div>
          </div>

          {/* Thumbnails */}
          {diamond.images.length > 1 && (
            <div className="flex gap-4">
              {diamond.images.map((img, idx) => (
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

          {/* Ritani-Style Direct Price Transparency Breakdown Card (Dark) */}
          <div className="p-6 bg-[#141414] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <h3 className="font-serif text-base text-white">
                  Direct-From-Cutter Price Transparency
                </h3>
              </div>
              <button
                onClick={() => setTransparencyModalOpen(true)}
                className="text-xs text-neutral-400 hover:text-white underline flex items-center gap-1"
              >
                <Info className="w-3 h-3" />
                <span>How It Works</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-800">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">
                  Dhanlaxmi Direct Price
                </span>
                <span className="font-serif text-2xl font-light text-white">
                  ${diamond.price?.toLocaleString()}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  Direct bench cost &bull; Free insured shipping
                </span>
              </div>
              {retailEstimate && (
                <div className="border-l border-neutral-800 pl-4">
                  <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">
                    Traditional Retail Markup
                  </span>
                  <span className="font-serif text-2xl font-light text-neutral-500 line-through">
                    ${retailEstimate.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
                    You save ${savings?.toLocaleString()} (32%)
                  </span>
                </div>
              )}
            </div>

            {/* Cost Component Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[10px] uppercase tracking-wider text-neutral-400 flex justify-between">
                <span>Diamond Cost Breakdown:</span>
                <span>Direct Surat Cutting Benchmark</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-800 flex overflow-hidden">
                <div className="h-full bg-white" style={{ width: "68%" }} title="Rough & Cutting Bench: 68%" />
                <div className="h-full bg-neutral-400" style={{ width: "12%" }} title="Lab Certification: 12%" />
                <div className="h-full bg-neutral-600" style={{ width: "8%" }} title="Insured Logistics: 8%" />
                <div className="h-full bg-[#D4AF37]" style={{ width: "12%" }} title="Direct Margin: 12%" />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white" /> Rough &amp; Faceting (68%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-neutral-400" /> {diamond.certificateLab} Dossier (12%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-neutral-600" /> Armored Delivery (8%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" /> Dhanlaxmi Margin (12%)
                </span>
              </div>
            </div>
          </div>

          {/* Laboratory Certificate Verification Banner */}
          <div className="p-5 bg-[#141414] border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#FBC90B] shrink-0" />
              <div>
                <h4 className="font-serif text-sm text-white">
                  {diamond.certificateLab} Laboratory Dossier #{diamond.certificateNumber}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Official grading verification &amp; laser inscription guarantee.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCertModalOpen(true)}
              className="px-3.5 py-2 border border-neutral-700 text-white hover:bg-white hover:text-black text-[11px] uppercase tracking-wider transition flex items-center gap-1.5 font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Right: Specifications & Ring Builder Actions (Dark) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-1.5">
              <span>{diamond.certificateLab} Certified</span>
              <span>&bull;</span>
              <span>{diamond.type} Diamond</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-light leading-tight tracking-tight">
              {diamond.carat} Carat {diamond.shape} Diamond
            </h1>
            <p className="text-xs text-neutral-400 mt-1.5 tracking-wider">
              SKU: {diamond.sku} &bull; Report #{diamond.certificateNumber}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 bg-[#141414] border border-neutral-800">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block font-medium">
                  Direct Factory Price
                </span>
                <span className="font-serif text-3xl text-white mt-1 block font-light">
                  ${diamond.price?.toLocaleString()}
                </span>
              </div>
              <span className="px-2.5 py-1 bg-[#1F1F1F] border border-neutral-700 text-[10px] font-mono text-neutral-300 uppercase">
                Free Armored Delivery
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Price includes international GIA/IGI laboratory certificate, insured armored transit, and 30-day money-back guarantee.
            </p>
          </div>

          {/* Primary Action: Add to Custom Ring Builder */}
          <div className="space-y-3 p-5 bg-[#161616] border-2 border-white shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FBC90B]" />
                <span>Custom Ring Builder</span>
              </span>
              {selectedSetting ? (
                <span className="text-[11px] text-neutral-300">
                  Setting: {selectedSetting.name}
                </span>
              ) : (
                <span className="text-[11px] text-neutral-400">
                  Step 2 &bull; Pair with a Setting
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-300">
              {selectedSetting
                ? "You have already picked a setting! Click below to complete your custom ring and review."
                : "Select this diamond to pair with our handcrafted solitaire, halo, pave, or vintage settings."}
            </p>

            <button
              onClick={handlePairWithRingBuilder}
              className="w-full py-4 bg-white hover:bg-neutral-200 text-black text-xs uppercase tracking-widest font-medium transition duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#FBC90B]" />
              <span>
                {isSelectedInBuilder
                  ? "Selected &bull; Continue in Ring Builder &rarr;"
                  : selectedSetting
                  ? "Complete Ring with This Diamond &rarr;"
                  : "Pair Diamond with a Setting &rarr;"}
              </span>
            </button>
          </div>

          {/* 4Cs Primary Card */}
          <div className="grid grid-cols-4 gap-2 bg-[#141414] border border-neutral-800 p-4 text-center">
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Carat</span>
              <span className="text-lg text-white font-medium mt-1 block">{diamond.carat}ct</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Color</span>
              <span className="text-lg text-white font-medium mt-1 block">{diamond.color}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Clarity</span>
              <span className="text-lg text-white font-medium mt-1 block">{diamond.clarity}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Cut</span>
              <span className="text-lg text-white font-medium mt-1 block">{diamond.cut}</span>
            </div>
          </div>

          {/* Detailed Gemological Spec Table */}
          <div className="space-y-3 border-t border-neutral-800 pt-5">
            <h3 className="font-serif text-lg text-white font-light">
              Gemological Dossier
            </h3>
            <div className="divide-y divide-neutral-800 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-400">Shape &amp; Cutting Style:</span>
                <span className="font-medium text-white">{diamond.shape} Brilliant</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-400">Measurements:</span>
                <span className="font-medium text-white">{diamond.measurements}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-400">Polish:</span>
                <span className="font-medium text-white">{diamond.polish}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-400">Symmetry:</span>
                <span className="font-medium text-white">{diamond.symmetry}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-400">Fluorescence:</span>
                <span className="font-medium text-white">{diamond.fluorescence}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-400">Table Percentage:</span>
                <span className="font-medium text-white">{diamond.tablePct}%</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-400">Depth Percentage:</span>
                <span className="font-medium text-white">{diamond.depthPct}%</span>
              </div>
              {diamond.ratio && (
                <div className="py-2.5 flex justify-between">
                  <span className="text-neutral-400">Length-to-Width Ratio:</span>
                  <span className="font-medium text-white">{diamond.ratio}</span>
                </div>
              )}
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() =>
                addItem({
                  itemType: "diamond",
                  id: diamond.id,
                  sku: diamond.sku,
                  name: diamond.name,
                  image: diamond.images[0],
                  subtitle: `${diamond.carat}ct ${diamond.shape} ${diamond.type}`,
                  detail: `Color: ${diamond.color} | Clarity: ${diamond.clarity} | Lab: ${diamond.certificateLab} #${diamond.certificateNumber}`,
                })
              }
              className={`w-full py-3 text-xs uppercase tracking-widest font-medium transition duration-300 flex items-center justify-center gap-2 border ${
                isInEnquiry(diamond.id)
                  ? "bg-[#181818] border-white text-white"
                  : "border-neutral-700 text-neutral-300 hover:border-white hover:text-white"
              }`}
            >
              {isInEnquiry(diamond.id) ? (
                <>
                  <Check className="w-4 h-4 text-[#FBC90B]" />
                  <span>Stone In Selection Portfolio &check;</span>
                </>
              ) : (
                <span>Save Stone to Enquiry Portfolio</span>
              )}
            </button>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-neutral-700 hover:border-white text-neutral-300 hover:text-white text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 font-medium"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Inquire with Surat Gemologist on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Certificate Modal (Dark) */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#141414] border border-neutral-800 p-8 space-y-6 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#FBC90B]" />
                <h3 className="font-serif text-xl text-white font-light">
                  Gemological Laboratory Report Preview
                </h3>
              </div>
              <button
                onClick={() => setCertModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#1A1A1A] border border-neutral-800 p-6 space-y-3 text-xs">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Accredited Laboratory:</span>
                <span className="text-white font-semibold">{diamond.certificateLab}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Report Number:</span>
                <span className="text-white font-medium">{diamond.certificateNumber}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Shape and Cut:</span>
                <span className="text-white font-medium">{diamond.shape} Brilliant</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Carat Weight:</span>
                <span className="text-white font-medium">{diamond.carat} carat</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Color Grade:</span>
                <span className="text-white font-medium">{diamond.color}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Clarity Grade:</span>
                <span className="text-white font-medium">{diamond.clarity}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Cut Grade:</span>
                <span className="text-white font-medium">{diamond.cut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Measurements:</span>
                <span className="text-white font-medium">{diamond.measurements}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400">
              Physical original grading dossier and laser inscription match will accompany your insured worldwide armored delivery.
            </p>

            <button
              onClick={() => setCertModalOpen(false)}
              className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Price Transparency Modal (Dark) */}
      {transparencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#141414] border border-neutral-800 p-8 space-y-6 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="font-serif text-xl text-white font-light">
                  How Dhanlaxmi Transparent Pricing Works
                </h3>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mt-1">
                  Surat Direct Cutting Bench Advantage
                </span>
              </div>
              <button
                onClick={() => setTransparencyModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
              <p>
                Traditional luxury jewelers on 5th Avenue or Bond Street purchase from multiple intermediaries: miners &rarr; rough dealers &rarr; Surat polishers &rarr; international wholesalers &rarr; retail showrooms. Each layer adds a 20% to 50% markup.
              </p>
              <div className="p-4 bg-[#1A1A1A] border border-neutral-800 space-y-2">
                <h4 className="font-serif text-sm text-white">The Dhanlaxmi Direct Model:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Direct Surat Bench:</strong> We cut, polish, and calibrate in our own Surat facilities established in 2004.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Middlemen:</strong> You acquire your stone at true wholesale bench pricing plus our transparent modest operating margin.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Full Verification:</strong> Independent GIA / IGI dossier + laser inscription guarantee with every stone.</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setTransparencyModalOpen(false)}
              className="w-full py-3 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
