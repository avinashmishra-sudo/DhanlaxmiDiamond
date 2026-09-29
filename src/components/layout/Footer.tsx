"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Instagram, Linkedin, Facebook, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Do not render consumer website footer on Admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#050608] border-t border-amber-500/20 text-neutral-300 text-xs font-light">
      {/* Top Banner: Service Assurance Bar */}
      <div className="border-b border-amber-500/15 bg-[#08090B]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <p className="font-serif text-sm text-white tracking-wider">
                GIA &amp; IGI Certified Diamonds &bull; 100% Conflict-Free KPCS Sourcing
              </p>
              <p className="text-[11px] text-neutral-300 tracking-wide mt-0.5">
                Every stone is independently audited for cut accuracy, color grading, and structural purity directly from our Surat cutters.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/request-quote"
              className="px-6 py-2.5 gold-btn text-[11px] tracking-widest font-semibold"
            >
              Private Consultation
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 gold-outline-btn text-[11px] tracking-widest font-medium"
            >
              Contact Surat HQ
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Col 1: Heritage & Official Logo */}
        <div className="lg:col-span-2 space-y-5">
          <Link href="/" className="inline-block group">
            <div className="relative h-10 w-44 mb-2 transition-transform group-hover:scale-105">
              <Image
                src="/logo-dark-bg.png"
                alt="Dhanlaxmi Diamond"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#F59E0B] block font-mono">
              Surat Atelier &bull; Established 2004
            </span>
          </Link>
          <p className="text-neutral-300 leading-relaxed text-xs pr-6 font-light">
            Founded in 2004 by three brothers at the craftsman&apos;s workbench in Surat, Dhanlaxmi Diamond
            has built an enduring international legacy in high-quality natural diamonds, rare colored gems,
            and bespoke fine jewelry defined by optical perfection and quiet luxury.
          </p>
          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono block mb-1">
              Global Presence &amp; Inquiries
            </span>
            <p className="text-[11px] text-neutral-300">
              Serving high jewelry retail partners, wholesalers, and private collectors in USA, Europe,
              UK, Middle East, and worldwide.
            </p>
          </div>
        </div>

        {/* Col 2: Diamonds & Jewelry */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm tracking-[0.2em] text-amber-400 uppercase font-medium">
            Creations
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
            <li>
              <Link href="/ring-builder" className="hover:text-amber-300 transition font-medium text-white flex items-center gap-1.5">
                <span className="text-[#F59E0B]">★</span> Custom Ring Builder
              </Link>
            </li>
            <li>
              <Link href="/diamonds" className="hover:text-amber-300 transition">
                Certified Diamonds &amp; Table
              </Link>
            </li>
            <li>
              <Link href="/ring-builder?step=1" className="hover:text-amber-300 transition">
                Engagement Ring Settings
              </Link>
            </li>
            <li>
              <Link href="/natural-diamonds" className="hover:text-amber-300 transition">
                Natural Diamonds (GIA)
              </Link>
            </li>
            <li>
              <Link href="/lab-grown-diamonds" className="hover:text-amber-300 transition">
                Lab-Grown Diamonds (IGI)
              </Link>
            </li>
            <li>
              <Link href="/jewelry" className="hover:text-amber-300 transition">
                High Jewelry
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-amber-300 transition">
                Signature Collections
              </Link>
            </li>
            <li>
              <Link href="/custom-jewelry" className="hover:text-amber-300 transition">
                Bespoke Atelier
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: The House & Assurance */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm tracking-[0.2em] text-amber-400 uppercase font-medium">
            The House
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
            <li>
              <Link href="/about" className="hover:text-amber-300 transition">
                Our Story (Est. 2004)
              </Link>
            </li>
            <li>
              <Link href="/quality" className="hover:text-amber-300 transition">
                Diamond Certifications
              </Link>
            </li>
            <li>
              <Link href="/sustainability" className="hover:text-amber-300 transition">
                Kimberley Process &amp; Ethics
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-amber-300 transition">
                Diamond Education
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-amber-300 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-amber-300 transition">
                Terms of Trade
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Head Office & Direct Channels */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm tracking-[0.2em] text-amber-400 uppercase font-medium">
            Surat Headquarters
          </h4>
          <div className="space-y-3 text-xs text-neutral-300 leading-relaxed font-light">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                2,3, A Building, E, Vakahariya Mill, SY -389/A/1, Plot -3, Ashwini Kumar Rd, near Visamo, Surat, Gujarat 395008
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="mailto:info@dhanlaxmidiamond.com" className="hover:text-amber-300 transition">
                info@dhanlaxmidiamond.com
              </a>
            </div>
          </div>

          <div className="pt-2">
            <h5 className="text-[10px] uppercase tracking-widest text-amber-300 font-mono mb-2">
              Direct Inquiries
            </h5>
            <div className="flex space-x-3 text-amber-300">
              <a
                href="https://www.instagram.com/dhanlaxmidiamond/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center hover:border-amber-400 hover:bg-amber-500/20 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/company/dhanlaxmi-diamond/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center hover:border-amber-400 hover:bg-amber-500/20 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61564307682071"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center hover:border-amber-400 hover:bg-amber-500/20 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-amber-500/15 bg-[#030405]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Dhanlaxmi Diamond. All Rights Reserved. Surat, Gujarat, India.</p>
          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-wider">
            <span className="text-amber-400/80">Kimberley Process Compliant</span>
            <span>&bull;</span>
            <span className="text-amber-400/80">GIA &amp; IGI Audited</span>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-amber-300 transition">
              Confidentiality
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
