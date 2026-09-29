"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { initialJewelry } from "@/lib/data/jewelry";
import { initialCategories } from "@/lib/data/categories";
import { JewelryCategory, JewelryItem, CategoryItem } from "@/lib/types";
import { useEnquiry } from "@/context/EnquiryContext";
import { useRingBuilder } from "@/context/RingBuilderContext";
import { ArrowRight, Gem, Check, Sparkles } from "lucide-react";

function JewelryCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "All");
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);

  const { addItem, isInEnquiry } = useEnquiry();
  const { setSetting, selectedSetting } = useRingBuilder();

  // Load dynamically managed categories from Admin Panel
  useEffect(() => {
    const loadCategories = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("dhanlaxmi_categories");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCategories(parsed.filter((c: CategoryItem) => c.status === "Active"));
            }
          } catch (e) {
            console.error("Error loading categories", e);
          }
        }
      }
    };

    loadCategories();
    window.addEventListener("dhanlaxmi_categories_updated", loadCategories);
    window.addEventListener("storage", loadCategories);
    return () => {
      window.removeEventListener("dhanlaxmi_categories_updated", loadCategories);
      window.removeEventListener("storage", loadCategories);
    };
  }, []);

  const filteredJewelry = useMemo(() => {
    return initialJewelry.filter((item) => {
      if (selectedCategory !== "All") {
        return item.category.toLowerCase() === selectedCategory.toLowerCase();
      }
      return true;
    });
  }, [selectedCategory]);

  const handleUseInRingBuilder = (item: JewelryItem) => {
    setSetting(item);
    router.push("/ring-builder");
  };

  return (
    <>
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-10 border-b border-neutral-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase block">
                Haute Joaillerie &bull; Surat Atelier
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-[#141414] border border-neutral-800 text-neutral-300 uppercase tracking-wider font-semibold">
                Platinum &amp; 18k Solid Gold
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
              Fine Jewelry &amp; Settings
            </h1>
            <p className="text-sm text-neutral-400 max-w-xl font-light leading-relaxed">
              Curated masterworks individually mounted in solid 950 Platinum and 18k Gold, set with calibrated natural and lab-grown stones crafted by Surat master artisans.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/ring-builder"
              className="px-6 py-3 bg-white text-black hover:bg-neutral-200 text-xs uppercase tracking-widest font-medium transition text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FBC90B]" />
              <span>Custom Ring Builder</span>
            </Link>
            <Link
              href="/custom-jewelry"
              className="px-6 py-3 border border-neutral-700 text-white hover:border-white text-xs uppercase tracking-widest font-medium transition text-center"
            >
              Bespoke Atelier Commission
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-6 border-b border-neutral-900">
        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-5 py-2.5 text-xs uppercase tracking-wider transition font-medium ${
              selectedCategory === "All"
                ? "bg-[#FBC90B] text-black font-semibold shadow-md"
                : "border border-neutral-800 bg-[#121212] text-neutral-400 hover:border-neutral-600 hover:text-white"
            }`}
          >
            All Creations
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider transition font-medium ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? "bg-[#FBC90B] text-black font-semibold shadow-md"
                  : "border border-neutral-800 bg-[#121212] text-neutral-400 hover:border-neutral-600 hover:text-white"
              }`}
            >
              {cat.name === "Rings" ? "Engagement Rings & Settings" : cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {filteredJewelry.length === 0 ? (
          <div className="p-16 text-center bg-[#121212] border border-neutral-800 space-y-4">
            <Gem className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="font-serif text-2xl text-white">No Pieces in Selected Category</h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
              Our atelier produces limited bespoke pieces annually. Contact our custom design studio to realize your bespoke design.
            </p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-2 px-8 py-3 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition"
            >
              View All Creations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJewelry.map((item) => {
              const isRingSetting = item.category === "Rings" || Boolean(item.settingStyle);
              const isSelectedSetting = selectedSetting?.id === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-[#141414] border transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl ${
                    isSelectedSetting ? "border-white ring-1 ring-white" : "border-neutral-800 hover:border-neutral-500"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-[#181818]">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] uppercase font-sans tracking-wider px-2.5 py-1 bg-black/85 text-white border border-neutral-700 font-medium shadow-sm">
                        {item.category}
                      </span>
                      <span className="text-[10px] uppercase font-sans tracking-wider px-2.5 py-1 bg-black/85 text-neutral-300 border border-neutral-700 shadow-sm">
                        {item.metal}
                      </span>
                    </div>

                    {isRingSetting && item.price && (
                      <span className="absolute bottom-4 right-4 text-[11px] font-mono px-3 py-1 bg-black/85 backdrop-blur-sm text-white border border-neutral-700 shadow-sm">
                        Setting from ${item.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase text-neutral-500 tracking-[0.2em] block">
                          {item.sku}
                        </span>
                        <span className="text-[10px] text-neutral-400 uppercase">
                          {item.totalDiamondWeight}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl text-white mt-1 font-light tracking-tight group-hover:text-brand-gold transition">
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 space-y-2">
                      {isRingSetting && (
                        <button
                          onClick={() => handleUseInRingBuilder(item)}
                          className={`w-full py-2.5 text-xs uppercase tracking-widest font-medium transition flex items-center justify-center gap-1.5 ${
                            isSelectedSetting
                              ? "bg-white text-black"
                              : "bg-[#222222] hover:bg-white hover:text-black text-white"
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isSelectedSetting ? "Setting In Builder &rarr;" : "+ Pair in Ring Builder"}</span>
                        </button>
                      )}

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <button
                          onClick={() =>
                            addItem({
                              itemType: "jewelry",
                              id: item.id,
                              sku: item.sku,
                              name: item.name,
                              image: item.images[0],
                              subtitle: `${item.metal} &bull; ${item.category}`,
                              detail: item.totalDiamondWeight,
                            })
                          }
                          className={`text-[11px] uppercase tracking-wider font-medium py-1.5 px-2.5 border transition flex items-center gap-1 ${
                            isInEnquiry(item.id)
                              ? "bg-[#1C1C1C] border-white text-white"
                              : "border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white"
                          }`}
                        >
                          {isInEnquiry(item.id) ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#FBC90B]" />
                              <span>In Selection</span>
                            </>
                          ) : (
                            <span>+ Save</span>
                          )}
                        </button>

                        <Link
                          href={`/jewelry/${item.id}`}
                          className="text-[11px] text-neutral-300 hover:text-white hover:underline font-medium flex items-center gap-1 transition uppercase tracking-wider"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default function JewelryPage() {
  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-28 pb-24 min-h-screen">
      <Suspense
        fallback={
          <div className="p-24 text-center text-xs text-neutral-500 uppercase tracking-widest">
            Loading Fine Jewelry Catalog...
          </div>
        }
      >
        <JewelryCatalogContent />
      </Suspense>
    </div>
  );
}
