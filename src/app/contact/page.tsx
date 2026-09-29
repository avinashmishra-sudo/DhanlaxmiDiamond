"use client";

import React, { useState } from "react";
import { Mail, MapPin, MessageSquare, CheckCircle2, Clock, Globe } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    "Hello Dhanlaxmi Diamond Concierge, I would like to connect with a diamond specialist regarding certified stones and fine jewelry."
  );

  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 text-center pb-16 space-y-6">
        <span className="text-[11px] font-sans tracking-[0.25em] text-[#D4AF37] uppercase block">
          Private Client &amp; Trade Advisory
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight tracking-tight">
          Connect With Our Diamond House
        </h1>
        <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
          Whether you are seeking a rare certified stone, custom bridal suite, or international wholesale allocation, our senior team is at your disposal.
        </p>
      </section>

      {/* Main Grid: Details Left, Form Right */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Contact Info (Dark) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-[#141414] border border-neutral-800 space-y-6 shadow-xl">
            <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#D4AF37] block font-medium">
              Surat Global Headquarters
            </span>
            <div className="space-y-5 text-sm text-neutral-400 leading-relaxed font-light">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif text-lg mb-1 font-light">
                    Dhanlaxmi Diamond Atelier
                  </strong>
                  <span>
                    2,3, A Building, E, Vakahariya Mill, SY -389/A/1, Plot -3, Ashwini Kumar Rd, near Visamo, Surat, Gujarat 395008, India.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-800">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">
                    Official Inquiries
                  </span>
                  <a
                    href="mailto:info@dhanlaxmidiamond.com"
                    className="text-white font-medium hover:underline"
                  >
                    info@dhanlaxmidiamond.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-800">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">
                    Instant WhatsApp Concierge
                  </span>
                  <a
                    href={`https://wa.me/919825100000?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-medium hover:underline"
                  >
                    +91 98251 00000 (Chat Directly)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-800">
                <Clock className="w-5 h-5 text-white shrink-0" />
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">
                    Atelier Hours (IST)
                  </span>
                  <span className="text-white">Monday &ndash; Saturday: 10:00 AM &ndash; 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* International Trade Notice */}
          <div className="p-7 bg-[#141414] border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-sans text-white uppercase tracking-wider font-medium">
              <Globe className="w-4 h-4 text-[#FBC90B]" />
              <span>International Delivery</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              We provide armored, fully insured transit via Malca-Amit and Brink&apos;s to international jewelers, wholesalers, and private clients worldwide.
            </p>
          </div>
        </div>

        {/* Form Right (Dark) */}
        <div className="lg:col-span-7">
          <div className="bg-[#141414] border border-neutral-800 p-8 md:p-10 space-y-6 shadow-xl">
            <div className="border-b border-neutral-800 pb-4">
              <h3 className="font-serif text-3xl text-white font-light">Send Direct Message</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Fill in the details below and an authorized representative will respond promptly.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-700 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-white font-light">Message Transmitted</h4>
                <p className="text-xs md:text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. Your inquiry has been routed to our senior team in Surat. We will review your requirements and reach out via email or phone.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 border border-neutral-700 text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition font-medium"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                      Contact / WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Loose Stone / Jewelry / Wholesale"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide details regarding carat preferences, shape, budget, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-700 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white hover:bg-neutral-200 text-black text-xs uppercase tracking-widest font-medium transition duration-300"
                >
                  Send Official Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Surat HQ Map Embed Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-neutral-900">
        <div className="space-y-2 mb-6">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D4AF37] block font-medium">
            Location Map
          </span>
          <h3 className="font-serif text-3xl text-white font-light">Visit Our Surat Atelier</h3>
        </div>
        <div className="relative aspect-[21/9] w-full bg-[#141414] border border-neutral-800 overflow-hidden shadow-sm">
          <iframe
            src="https://maps.google.com/maps?q=21.218667%2C%2072.846950&t=m&z=17&output=embed&iwloc=near"
            title="Dhanlaxmi Diamond Surat HQ"
            className="w-full h-full border-0 invert contrast-125 opacity-80 hover:opacity-100 transition duration-500"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
