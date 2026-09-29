"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultAboutContent } from "@/lib/data/siteContent";
import { AboutPageContent } from "@/lib/types";
import { ShieldCheck, Award, Users, Hammer, Play, Sparkles, Film, Camera } from "lucide-react";

export function AboutContent() {
  const [content, setContent] = useState<AboutPageContent>(defaultAboutContent);

  useEffect(() => {
    const loadContent = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("dhanlaxmi_about_content");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setContent((prev) => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error("Failed to parse saved about content", e);
          }
        }
      }
    };

    loadContent();
    window.addEventListener("dhanlaxmi_about_updated", loadContent);
    window.addEventListener("storage", loadContent);
    return () => {
      window.removeEventListener("dhanlaxmi_about_updated", loadContent);
      window.removeEventListener("storage", loadContent);
    };
  }, []);

  // Helper to format YouTube URLs into embeddable format
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
    return url;
  };

  const isEmbedVideo =
    content.videoUrl &&
    (content.videoUrl.includes("youtube.com") ||
      content.videoUrl.includes("youtu.be") ||
      content.videoUrl.includes("vimeo.com"));

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-6 text-center pb-16 space-y-6">
        <span className="text-[11px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase block">
          Our Heritage &bull; Established 2004 in Surat, India
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          Forged by Precision, Defined by Hard Work
        </h1>
        <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
          Built not in corporate boardrooms, but at the craftsman&apos;s workbench in Surat, fueled by a shared passion for diamonds and an uncompromising commitment to optical perfection.
        </p>
      </section>

      {/* Hero Visual */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="relative aspect-[21/9] bg-[#141414] border border-neutral-800 overflow-hidden shadow-2xl">
          <Image
            src={content.heroImage || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop"}
            alt="Dhanlaxmi Diamond Artisanal Workbench"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-wider font-medium px-3.5 py-1.5 bg-black/85 text-white border border-neutral-700 shadow-sm">
            {content.heroBadge || "Surat Diamond Cutting Hub • Established 2004"}
          </div>
        </div>
      </section>

      {/* Authentic Brotherhood Story Section - Part 1 */}
      <section className="max-w-4xl mx-auto px-6 space-y-16">
        {/* Chapter 1: The Founding Bond */}
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium block">
            Chapter 01 &bull; The Founding Vision
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
            A Testament to Fraternity and Shared Purpose
          </h2>
          <div className="w-12 h-px bg-white" />
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            The story of Dhanlaxmi Diamond is a testament to fraternity, shared vision, and the unwavering belief that hard work pays. Founded in 2004 by three brothers, our company was built not in corporate boardrooms, but at the workbench, fueled by a shared passion for diamonds and a collective resolve to create something enduring.
          </p>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            From the very beginning, our culture has been shaped by this familial bond&mdash;a unity that values collaboration, trust, and the relentless pursuit of a common goal.
          </p>
        </div>

        {/* Chapter 2: The Bedrock of Craft */}
        <div className="space-y-6 pt-10 border-t border-neutral-800">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium block">
            Chapter 02 &bull; The Bedrock of Craft
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
            A Legacy of Uncompromising Discipline
          </h2>
          <div className="w-12 h-px bg-white" />
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            That brotherly ethos extends to every facet of our operation. We operate in a world where true luxury is defined by potential realized through sheer effort. Our master craftsmen, trained in the traditions upheld by our founders, are not merely artisans; they are disciples of discipline.
          </p>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            They embrace the grueling, meticulous process that lesser hands might bypass. They understand that the legendary fire of a perfect diamond is not released by accident. It is earned through countless hours of study, calculation, and painstaking precision. Each cut is a decision weighed, each angle a commitment made. This is where our renowned premium quality cuts and exceptional clarity are born: at the intersection of deep expertise and dogged perseverance.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ATELIER CINEMATIC VIDEO SHOWCASE                                          */}
      {/* ========================================================================= */}
      {content.showVideo !== false && content.videoUrl && (
        <section className="max-w-6xl mx-auto px-6 md:px-12 my-24 animate-fadeIn">
          <div className="bg-gradient-to-b from-[#13141B] via-[#0E0F14] to-[#0A0A0A] border border-amber-500/25 p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Gold Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto mb-8 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#F59E0B] font-mono block">
                {content.videoBadge || "Surat Diamond Atelier • Master Workbench"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight">
                {content.videoTitle || "The Generational Craft of Diamond Faceting"}
              </h2>
              <p className="text-xs md:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
                {content.videoDescription ||
                  "Step inside our Surat cutting facility to observe how master polishers transform ethically mined rough crystal into fire-emitting, triple-excellent diamonds."}
              </p>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video w-full max-w-5xl mx-auto bg-black border border-amber-500/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              {isEmbedVideo ? (
                <iframe
                  src={getEmbedUrl(content.videoUrl)}
                  title={content.videoTitle || "Dhanlaxmi Diamond Atelier Video"}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={content.videoUrl}
                  poster={content.videoPoster}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Authentic Brotherhood Story Section - Part 2 */}
      <section className="max-w-4xl mx-auto px-6 space-y-16">
        {/* Chapter 3: Natural and Colored Diamonds */}
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium block">
            Chapter 03 &bull; The Medium
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
            Natural and Colored Diamonds
          </h2>
          <div className="w-12 h-px bg-white" />
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            Guided by the founders&apos; original vision, we specialize in both the timeless brilliance of natural diamonds and the captivating rarity of colored diamonds. Each stone presents a unique challenge&mdash;a puzzle of inclusions, color saturation, and crystalline structure.
          </p>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            Our hard work begins with the meticulous selection of rough material. We seek out stones with the potential for greatness, and then our labor truly begins. Our process is a testament to the brothers&apos; core belief: that the most beautiful results are always the product of the most demanding effort.
          </p>
        </div>

        {/* Chapter 4: The Dhanlaxmi Promise */}
        <div className="space-y-6 pt-10 border-t border-neutral-800">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium block">
            Chapter 04 &bull; The Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
            The Tangible Result of Labor
          </h2>
          <div className="w-12 h-px bg-white" />
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            When you hold a Dhanlaxmi creation, you are holding more than a piece of jewelry. You are holding the tangible result of a brotherhood&apos;s discipline and dedication. You are feeling the weight of hours dedicated to perfecting a single facet. You are witnessing the brilliance that can only be achieved when there is no tolerance for &ldquo;almost.&rdquo;
          </p>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            We do not create fleeting trends; we forge enduring legacies. Our pieces are heirlooms, meant to symbolize the milestones earned through your own dedication and hard work. They are a reflection of your journey, matched by ours.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ATELIER PHOTOGRAPHY GALLERY SECTION                                       */}
      {/* ========================================================================= */}
      {content.galleryImages && content.galleryImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 my-28 pt-16 border-t border-neutral-800">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#F59E0B] font-mono block">
              Behind The Loupe &bull; Surat Facility
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              The Surat Atelier in Pictures
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              From rough crystal vetting and 3D laser mapping to hand-faceting on traditional cast-iron scaifes and artisanal platinum mountings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.galleryImages
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="group bg-[#121319] border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 overflow-hidden flex flex-col shadow-xl"
                >
                  {/* Photo Container */}
                  <div className="relative h-64 w-full bg-black overflow-hidden">
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/80 text-[#FBC90B] border border-amber-500/40 backdrop-blur-sm">
                      Phase 0{item.displayOrder || idx + 1}
                    </span>
                  </div>

                  {/* Caption & Title */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2 bg-[#121319]">
                    <h3 className="font-serif text-lg text-white font-medium group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Pillars Section (Dark) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-16 border-t border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-7 bg-[#141414] border border-neutral-800 space-y-3">
            <Hammer className="w-6 h-6 text-[#FBC90B]" />
            <h3 className="font-serif text-lg text-white">Workbench Heritage</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Founded in 2004 directly at the diamond cutter&apos;s bench in Surat, India.
            </p>
          </div>
          <div className="p-7 bg-[#141414] border border-neutral-800 space-y-3">
            <Users className="w-6 h-6 text-[#FBC90B]" />
            <h3 className="font-serif text-lg text-white">Fraternity &amp; Trust</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Steered by three brothers with unified values, craftsmanship, and direct personal service.
            </p>
          </div>
          <div className="p-7 bg-[#141414] border border-neutral-800 space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#FBC90B]" />
            <h3 className="font-serif text-lg text-white">Authentic Grading</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Accredited with GIA and IGI laboratory grading reports for complete transparency.
            </p>
          </div>
          <div className="p-7 bg-[#141414] border border-neutral-800 space-y-3">
            <Award className="w-6 h-6 text-[#FBC90B]" />
            <h3 className="font-serif text-lg text-white">Global Reach</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Supplying international jewelers and collectors across USA, Europe, UK, and UAE.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-6 mt-20 text-center space-y-6">
        <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
          Experience the Dhanlaxmi Standard
        </h3>
        <p className="text-sm text-neutral-400 max-w-lg mx-auto font-light">
          Explore our certified loose stones or schedule a private bespoke jewelry consultation with our senior gemologists.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/diamonds"
            className="px-8 py-3.5 bg-white text-black hover:bg-neutral-200 text-xs uppercase tracking-widest font-medium transition"
          >
            Explore Diamonds
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 border border-neutral-700 hover:border-white text-white text-xs uppercase tracking-widest font-medium transition"
          >
            Contact Surat HQ
          </Link>
        </div>
      </section>
    </div>
  );
}
