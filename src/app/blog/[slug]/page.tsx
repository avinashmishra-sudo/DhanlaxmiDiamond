import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { initialBlogPosts } from "@/lib/data/blog";
import { ArrowLeft, Clock, Calendar, User, Gem } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = initialBlogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }
  return {
    title: `${post.title} | Dhanlaxmi Diamond Journal`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = initialBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-28 pb-24 min-h-screen">
      {/* Back Nav */}
      <div className="max-w-4xl mx-auto px-6 py-6 border-b border-neutral-800">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-[#FBC90B] transition font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Diamond Education</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#FBC90B] font-sans block">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="text-base text-neutral-400 italic font-serif">
            {post.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400 pt-2 border-t border-neutral-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FBC90B]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FBC90B]" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#FBC90B]" />
              {post.author}
            </span>
          </div>
        </div>

        {/* Feature Cover Image */}
        <div className="relative aspect-[16/9] w-full bg-[#0F0F0F] border border-neutral-800 overflow-hidden shadow-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Excerpt Lead */}
        <p className="text-base sm:text-lg text-neutral-200 font-serif italic border-l-2 border-[#FBC90B] pl-6 py-1 leading-relaxed">
          &ldquo;{post.excerpt}&rdquo;
        </p>

        {/* Body Paragraphs */}
        <div className="space-y-6 text-base text-neutral-300 font-light leading-relaxed pt-4">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Article Footer & Consultation CTA */}
        <div className="mt-16 p-8 bg-[#141414] border border-neutral-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Gem className="w-6 h-6 text-[#FBC90B]" />
            <h3 className="font-serif text-2xl text-white font-light">
              Have Questions Regarding Diamond Grading or Bespoke Creation?
            </h3>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed font-light">
            Our Surat gemological advisory team is available to assist you with loose stone selection, certificate comparisons, or bespoke fine jewelry commissions.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/request-quote"
              className="px-8 py-3.5 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-widest font-semibold transition text-center"
            >
              Consult With a Gemologist
            </Link>
            <Link
              href="/diamonds"
              className="px-8 py-3.5 border border-neutral-700 hover:border-white text-neutral-300 hover:text-white text-xs uppercase tracking-widest font-medium transition text-center"
            >
              View Certified Diamond Vault
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
