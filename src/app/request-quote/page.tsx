"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEnquiry } from "@/context/EnquiryContext";
import { CheckCircle2, Trash2, Gem, MessageSquare } from "lucide-react";

export default function RequestQuotePage() {
  const { items, removeItem, clearEnquiry } = useEnquiry();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    requirementType: "Private Purchase",
    budgetRange: "$10,000 - $25,000",
    timeline: "Within 2-4 weeks",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearEnquiry();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dhanlaxmi Diamond Concierge, I would like to request an official consultation and quotation for:\n` +
      items.map((i, idx) => `${idx + 1}. ${i.name} (SKU: ${i.sku})`).join("\n") +
      `\n\nClient Name: ${formData.name || "Prospective Client"}`
  );

  return (
    <div className="bg-[#08090B] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center pb-16 space-y-6">
        <span className="text-[11px] font-sans tracking-[0.25em] text-[#F59E0B] uppercase block font-mono drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]">
          Private Client &amp; Wholesale Advisory
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          Request a <span className="gold-gradient-text italic font-normal">Consultation &amp; Quote</span>
        </h1>
        <p className="text-sm md:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed font-light">
          Review your selected portfolio pieces and specify your commercial or private requirements. Our senior gemologist will prepare a tailored valuation.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6">
        {submitted ? (
          <div className="p-12 md:p-16 bg-[#141414] border border-neutral-800 text-center space-y-6 animate-fadeIn shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
              Enquiry Portfolio Submitted
            </h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-lg mx-auto leading-relaxed font-light">
              Thank you. Our diamond specialist in Surat will review your portfolio and contact you promptly with tailored valuations.
            </p>
            <p className="text-xs text-neutral-500 font-mono">
              Reference: DLD-ENQ-{Date.now().toString().slice(-6)}
            </p>
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/diamonds"
                className="px-8 py-3 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-widest font-semibold transition"
              >
                Browse Certified Diamonds
              </Link>
              <Link
                href="/"
                className="px-8 py-3 border border-neutral-700 text-neutral-300 hover:text-white hover:border-white text-xs uppercase tracking-widest font-medium transition"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Selected Portfolio Pieces */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#141414] border border-neutral-800 p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Gem className="w-4 h-4 text-[#FBC90B]" />
                    <h3 className="font-serif text-lg text-white font-light">
                      Selected Portfolio
                    </h3>
                  </div>
                  <span className="text-xs text-neutral-300 font-medium">
                    {items.length} {items.length === 1 ? "Item" : "Items"}
                  </span>
                </div>

                {items.length === 0 ? (
                  <div className="py-8 text-center space-y-3">
                    <p className="text-xs text-neutral-400">
                      No specific stones or jewelry pieces currently attached to this enquiry.
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      You may still submit a general diamond request or custom sourcing brief below.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/diamonds"
                        className="text-xs uppercase tracking-widest text-[#FBC90B] hover:text-white font-medium underline"
                      >
                        + Add Certified Stones
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 p-3 bg-[#1A1A1A] border border-neutral-800 relative group shadow-sm"
                      >
                        <div className="relative w-16 h-16 bg-[#0F0F0F] shrink-0 overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 pr-6">
                          <span className="text-[10px] uppercase font-sans tracking-wider text-neutral-500 block">
                            {item.sku}
                          </span>
                          <h4 className="font-serif text-base text-white truncate">{item.name}</h4>
                          <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                            {item.detail}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-2 right-2 text-neutral-500 hover:text-red-400 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {items.length > 0 && (
                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-xs">
                    <span className="text-neutral-400">Trade Security:</span>
                    <span className="text-emerald-400 font-medium text-[11px]">Direct Surat Atelier</span>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Concierge Alternative */}
              {items.length > 0 && (
                <div className="p-6 bg-[#141414] border border-neutral-800 space-y-3 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-emerald-400 font-medium">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Instant Consultation</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Prefer direct chat? Transmit your selected pieces to our senior diamond specialist via WhatsApp.
                  </p>
                  <a
                    href={`https://wa.me/919825100000?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-widest font-semibold transition"
                  >
                    Open WhatsApp Concierge
                  </a>
                </div>
              )}
            </div>

            {/* Right: The Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#141414] border border-neutral-800 p-8 md:p-10 space-y-6 shadow-xl">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="font-serif text-3xl text-white font-light">Client Consultation Details</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Please provide your contact credentials and requirements.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="client@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                        Country / City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. New York, London, Dubai"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                        Client Category
                      </label>
                      <select
                        value={formData.requirementType}
                        onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                      >
                        <option value="Private Purchase">Private Client / Collector</option>
                        <option value="Jewelry Retailer">Jewelry Retailer</option>
                        <option value="Wholesaler">Diamond Wholesaler</option>
                        <option value="Bespoke Commission">Bespoke Jewelry Commission</option>
                        <option value="Designer / Studio">Designer / Trade Studio</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                        Estimated Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                      >
                        <option value="Under $5,000">Under $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                        <option value="$100,000+ Connoisseur Tier">$100,000+ Connoisseur</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                      Specific Requirements / Custom Instructions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify ring sizes, desired certificates, delivery timeframes, or specific cut preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 gold-btn text-xs tracking-widest font-semibold transition duration-300 shadow-xl"
                  >
                    Submit Portfolio for Specialist Review
                  </button>

                  <p className="text-[11px] text-center text-neutral-500">
                    No payment is taken online. A senior diamond specialist will review your request and provide a formal invoice or design proposal.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
