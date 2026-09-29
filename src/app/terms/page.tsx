import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Dhanlaxmi Diamond",
  description:
    "Official terms of trade, diamond certification policies, quotation procedures, and international delivery protocols of Dhanlaxmi Diamond.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#0A0A0A] text-[#EDEDED] pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="border-b border-neutral-800 pb-6 space-y-2">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#FBC90B] font-medium block">
            Legal &bull; Trade Protocols
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-neutral-500">
            Dhanlaxmi Diamond &bull; Surat, Gujarat, India &bull; Established 2004
          </p>
        </div>

        <div className="space-y-8 text-sm text-neutral-300 font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-white font-light">
              1. Non-Transactional Inquiries
            </h2>
            <p>
              The Dhanlaxmi Diamond digital portal functions as an exclusive digital showcase and private client consultation platform. The submission of an enquiry portfolio or quotation request does not constitute an automated consumer sale. All transactions are formally processed via personalized trade contracts, proforma invoices, and agreed international banking transfers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-white font-light">
              2. Gemological Reports &amp; Stone Verification
            </h2>
            <p>
              Diamonds listed with GIA or IGI certificates are backed by authentic laboratory grading reports. Because loose stones and diamond rough are unique natural or lab-synthesized crystals, dimensions, carat weights, and inclusion structures are certified to laboratory accuracy. In the rare event a specific stone has been committed to a prior client, Dhanlaxmi will propose an identical or superior stone from the vault.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-white font-light">
              3. Insured International Armored Delivery
            </h2>
            <p>
              All shipments dispatched to international clients across the United States, Europe, United Kingdom, and the Middle East are transferred via specialized armored courier services (including Malca-Amit and Brink&apos;s) and are 100% insured until signature handover.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-white font-light">
              4. Kimberley Process &amp; Conflict-Free Guarantee
            </h2>
            <p>
              Dhanlaxmi Diamond guarantees that every natural rough diamond sourced by our company complies with the Kimberley Process Certification Scheme and World Diamond Council warranties.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
