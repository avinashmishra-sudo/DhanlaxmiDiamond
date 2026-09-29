import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { initialBlogPosts } from "@/lib/data/blog";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Diamond Journal & Gemological Education | Dhanlaxmi Diamond",
  description:
    "Explore authoritative gemological guides on diamond grading, cut science, clarity nuances, natural vs lab-grown stones, and fine jewelry care.",
};

export default function BlogIndexPage() {
  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 text-center pb-16 space-y-6">
        <span className="text-[11px] font-sans tracking-[0.25em] text-[#FBC90B] uppercase block">
          The Connoisseur&apos;s Library &bull; Surat Atelier
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          Diamond Education &amp; Journal
        </h1>
        <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed font-light">
          Authoritative perspectives on optical geometry, crystalline purity, laboratory grading reports, and heirloom jewelry curation.
        </p>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {initialBlogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#141414] border border-neutral-800 hover:border-[#FBC90B] transition-all duration-300 flex flex-col justify-between group overflow-hidden hover:shadow-2xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0F0F0F]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider px-2.5 py-1 bg-black/90 text-white border border-neutral-800 font-medium shadow-md">
                  {post.category}
                </span>
              </div>

              <div className="p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2 font-light">
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FBC90B]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-[#FBC90B] transition leading-snug font-light">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs text-neutral-400 italic mt-1.5 font-serif">
                    {post.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 mt-3 line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs uppercase tracking-widest text-[#FBC90B] group-hover:text-white flex items-center gap-1.5 transition font-medium"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
