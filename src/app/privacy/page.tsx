import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dhanlaxmi Diamond",
  description:
    "International privacy practices, client data protection, and confidentiality commitments of Dhanlaxmi Diamond.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="border-b border-neutral-800 pb-6 space-y-2">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#FBC90B] font-medium block">
            Legal &bull; Trade Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-500">
            Last Updated: September 2026 &bull; Dhanlaxmi Diamond Head Office, Surat, Gujarat
          </p>
        </div>

        <div className="space-y-8 text-sm text-neutral-300 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-white font-light">
              1. Commitment to Client Confidentiality
            </h2>
            <p>
              Dhanlaxmi Diamond understands the paramount importance of privacy and discretion in the international diamond and fine jewelry trade. We never sell, rent, disclose, or distribute your identity, contact credentials, transaction values, or bespoke design blueprints to unauthorized third parties or marketers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-white font-light">
              2. Information We Collect
            </h2>
            <p>
              When you submit a consultation request, bespoke brief, or portfolio inquiry, we collect only the necessary credentials required to establish verified commercial communication:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
              <li>Full Name and Professional Title (if trade buyer)</li>
              <li>Official Email Address and WhatsApp / Telephone Number</li>
              <li>Country and Delivery Jurisdiction</li>
              <li>Diamond specifications, budget categories, and custom design references</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-white font-light">
              3. Trade Data &amp; Security
            </h2>
            <p>
              Internal records of stone inventory, grading certificates, and communication histories are stored in enterprise-grade databases protected by strict Row Level Security (RLS) and encrypted transport protocols. No sensitive vendor pricing, wholesale markup structures, or supplier identities are exposed in client-facing systems.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-white font-light">
              4. Direct Communication
            </h2>
            <p>
              We communicate with clients solely regarding requested stone inquiries, quotation updates, insured transit tracking, or scheduled consultations. You may request deletion or export of your private inquiry data at any time by contacting{" "}
              <a href="mailto:info@dhanlaxmidiamond.com" className="text-[#FBC90B] underline font-medium hover:text-white">
                info@dhanlaxmidiamond.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
