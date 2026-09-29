"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CustomJewelryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    pieceType: "Engagement Ring",
    metal: "Platinum 950",
    stonePreference: "Natural Certified Diamond",
    diamondShape: "Round",
    caratRange: "2.0ct - 3.0ct",
    budgetRange: "$10,000 - $25,000",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#08090B] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-6 text-center pb-16 space-y-6">
        <span className="text-[11px] font-sans tracking-[0.25em] text-[#F59E0B] uppercase block font-mono drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]">
          Haute Joaillerie Atelier &bull; Bespoke Commissions
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          Your Vision. Crafted Into <span className="gold-gradient-text italic font-normal">Something Extraordinary.</span>
        </h1>
        <p className="text-sm md:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
          From initial hand sketches to master stone mounting at our Surat bench, collaborate directly with our gemologists and master jewelers to create a bespoke heirloom.
        </p>
      </section>

      {/* 3-Step Process Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-b border-amber-500/15">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-gradient-to-b from-[#15161C] to-[#0E0F14] border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 space-y-4 shadow-xl">
            <span className="text-4xl font-serif text-[#F59E0B] font-light block">01</span>
            <h3 className="font-serif text-2xl text-white font-light">Tell Us Your Vision</h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              Submit your bespoke brief below or connect with our concierge. We discuss setting architecture, band ergonomics, metal purity, and timeline.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-b from-[#15161C] to-[#0E0F14] border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 space-y-4 shadow-xl">
            <span className="text-4xl font-serif text-[#F59E0B] font-light block">02</span>
            <h3 className="font-serif text-2xl text-white font-light">Select Your Diamond</h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              We present a curated selection of loose GIA or IGI certified stones directly from our Surat vault inventory, matched to your exacting aesthetic standards.
            </p>
          </div>

          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-4">
            <span className="text-4xl font-serif text-[#FBC90B] font-light block">03</span>
            <h3 className="font-serif text-2xl text-white font-light">Create Your Piece</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Our bench jewelers forge your mount in 950 Platinum or 18k Gold, hand-setting each facet with microscopic precision before insured international armored delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Bespoke Inquiry Form */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-[#141414] border border-neutral-800 p-8 md:p-12 space-y-8 shadow-xl">
          <div className="text-center space-y-2 border-b border-neutral-800 pb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#FBC90B] font-medium block">
              Bespoke Commission Brief
            </span>
            <h2 className="font-serif text-3xl text-white font-light">
              Begin Your Custom Journey
            </h2>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Provide your initial ideas below. A dedicated diamond specialist will review your brief within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-white font-light">
                Bespoke Brief Received
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Our senior diamond atelier specialist in Surat will review your specifications and reach out to schedule your private design consultation.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 border border-neutral-700 text-xs uppercase tracking-widest text-neutral-300 hover:text-white hover:border-white transition font-medium"
                >
                  Submit Another Brief
                </button>
                <Link
                  href="/"
                  className="px-6 py-2.5 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-widest font-semibold transition"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                    Creation Type
                  </label>
                  <select
                    value={formData.pieceType}
                    onChange={(e) => setFormData({ ...formData, pieceType: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                  >
                    <option value="Engagement Ring">Solitaire Engagement Ring</option>
                    <option value="Toi et Moi Ring">Toi et Moi Dual Stone Ring</option>
                    <option value="Eternity Band">Diamond Eternity Band</option>
                    <option value="Tennis Bracelet">Diamond Tennis Bracelet</option>
                    <option value="Pendant / Necklace">High Jewelry Pendant / Necklace</option>
                    <option value="Diamond Studs / Earrings">Custom Diamond Earrings</option>
                    <option value="Other Bespoke Piece">Other Bespoke Piece</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                    Precious Metal
                  </label>
                  <select
                    value={formData.metal}
                    onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                  >
                    <option value="Platinum 950">Platinum 950 (Highest Purity)</option>
                    <option value="18k White Gold">18k White Gold</option>
                    <option value="18k Yellow Gold">18k Yellow Gold</option>
                    <option value="18k Rose Gold">18k Rose Gold</option>
                    <option value="Two-Tone Gold">Two-Tone Platinum &amp; Gold</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                    Stone Preference
                  </label>
                  <select
                    value={formData.stonePreference}
                    onChange={(e) => setFormData({ ...formData, stonePreference: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                  >
                    <option value="Natural Certified Diamond">Natural GIA Diamond</option>
                    <option value="Lab-Grown Type IIa Diamond">Lab-Grown IGI Diamond</option>
                    <option value="Fancy Colored Natural Diamond">Natural Fancy Colored Diamond</option>
                    <option value="Client Supplied Center Stone">I have my own stone (Mounting Only)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                    Desired Diamond Shape
                  </label>
                  <select
                    value={formData.diamondShape}
                    onChange={(e) => setFormData({ ...formData, diamondShape: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                  >
                    <option value="Round Brilliant">Round Brilliant</option>
                    <option value="Oval Brilliant">Oval Brilliant</option>
                    <option value="Emerald Cut">Emerald Cut</option>
                    <option value="Radiant Cut">Radiant Cut</option>
                    <option value="Cushion Cut">Cushion Cut</option>
                    <option value="Pear Brilliant">Pear Brilliant</option>
                    <option value="Asscher Cut">Asscher Cut</option>
                    <option value="Princess Cut">Princess Cut</option>
                    <option value="Marquise Cut">Marquise Cut</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                    Estimated Carat Weight
                  </label>
                  <select
                    value={formData.caratRange}
                    onChange={(e) => setFormData({ ...formData, caratRange: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                  >
                    <option value="1.00ct - 1.50ct">1.00ct - 1.50ct</option>
                    <option value="1.50ct - 2.00ct">1.50ct - 2.00ct</option>
                    <option value="2.00ct - 3.00ct">2.00ct - 3.00ct</option>
                    <option value="3.00ct - 5.00ct">3.00ct - 5.00ct</option>
                    <option value="5.00ct+ High Collector">5.00ct+ Connoisseur Tier</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
                    Approximate Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                  >
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000+ Haute Collector">$100,000+ Connoisseur</option>
                  </select>
                </div>
              </div>

              {/* Personal Contact Details */}
              <div className="border-t border-neutral-800 pt-6 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#FBC90B] font-medium block">
                  Your Consultation Contact Details
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                  >
                  </input>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp / Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Country / City *"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                  />
                </div>

                <textarea
                  rows={4}
                  placeholder="Describe your design inspirations, finger size, timeline, or any specific requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 gold-btn text-xs tracking-widest font-semibold transition duration-300 shadow-xl"
              >
                Submit Bespoke Brief for Review
              </button>

              <p className="text-[11px] text-center text-neutral-500">
                Your private information is kept strictly confidential. No obligations or fees apply for initial design consultations.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
