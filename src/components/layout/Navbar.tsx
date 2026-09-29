"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEnquiry } from "@/context/EnquiryContext";
import { useRingBuilder } from "@/context/RingBuilderContext";
import { defaultSiteSettings, initialNavLinks } from "@/lib/data/siteContent";
import { SiteSettings, NavLinkItem } from "@/lib/types";
import { Menu, X, Gem, ChevronDown, PhoneCall, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [diamondsDropdown, setDiamondsDropdown] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [navLinks, setNavLinks] = useState<NavLinkItem[]>(initialNavLinks);
  const pathname = usePathname();
  const { items, openDrawer } = useEnquiry();
  const { selectedDiamond, selectedSetting, step } = useRingBuilder();

  // Do not render consumer website navbar on Admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isRingBuilderInProgress = Boolean(selectedDiamond || selectedSetting);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hydrate header settings and nav links dynamically
  useEffect(() => {
    const loadHeaderData = () => {
      if (typeof window !== "undefined") {
        // Load Site Settings (announcement bar, CTA button)
        const savedSettings = localStorage.getItem("dhanlaxmi_site_settings");
        if (savedSettings) {
          try {
            const parsed = JSON.parse(savedSettings);
            setSiteSettings((prev) => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error("Failed to parse saved site settings", e);
          }
        }

        // Load Nav Links
        const savedNav = localStorage.getItem("dhanlaxmi_nav_links");
        if (savedNav) {
          try {
            const parsedNav: NavLinkItem[] = JSON.parse(savedNav);
            if (Array.isArray(parsedNav) && parsedNav.length > 0) {
              const hasBlog = parsedNav.some((item) => item.href === "/blog");
              if (!hasBlog) {
                parsedNav.push({
                  id: "nav-blog",
                  name: "Education & Journal",
                  href: "/blog",
                  displayOrder: parsedNav.length + 1,
                  visible: true,
                });
              }
              setNavLinks(parsedNav);
            }
          } catch (e) {
            console.error("Failed to parse saved nav links", e);
          }
        }
      }
    };

    loadHeaderData();
    window.addEventListener("dhanlaxmi_site_settings_updated", loadHeaderData);
    window.addEventListener("dhanlaxmi_nav_links_updated", loadHeaderData);
    window.addEventListener("storage", loadHeaderData);
    return () => {
      window.removeEventListener("dhanlaxmi_site_settings_updated", loadHeaderData);
      window.removeEventListener("dhanlaxmi_nav_links_updated", loadHeaderData);
      window.removeEventListener("storage", loadHeaderData);
    };
  }, []);

  const activeNavLinks = navLinks
    .filter((l) => l.visible !== false)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        {/* Imperial Obsidian & Champagne Gold Top Service Ribbon */}
        {siteSettings.showAnnouncement !== false && (
          <div className="bg-[#050608] border-b border-amber-500/20 py-2 px-6 text-center text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-sans text-amber-200/90 font-light flex items-center justify-center gap-3">
            <span>
              {siteSettings.announcementText ||
                "FREE INSURED WORLDWIDE ARMORED DELIVERY • DIRECT SURAT CUTTER BENCH PRICING • GIA & IGI CERTIFIED • 30-DAY RETURNS"}
            </span>
          </div>
        )}

        {/* Main Sticky Obsidian & Gold Navigation Bar */}
        <div
          className={`bg-[#08090B]/95 backdrop-blur-md transition-all duration-300 border-b border-amber-500/15 ${
            isScrolled ? "py-3 shadow-[0_10px_35px_rgba(0,0,0,0.85)]" : "py-4 md:py-5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* Brand Logo for Dark Background */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-8 md:h-10 w-36 md:w-44 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/logo-dark-bg.png"
                  alt="Dhanlaxmi Diamond"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-[12px] tracking-[0.2em] uppercase font-light text-neutral-300">
              {activeNavLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                if (link.isHighlighted) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-all duration-300 font-medium ${
                        isActive
                          ? "bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] text-black border-amber-400 font-semibold shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                          : "border-amber-500/40 bg-amber-500/10 text-amber-200 hover:border-amber-400 hover:bg-amber-500/20 hover:text-white shadow-[0_0_15px_rgba(245,158,11,0.12)]"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
                      <span>{link.name}</span>
                      {isRingBuilderInProgress && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
                      )}
                    </Link>
                  );
                }

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative group py-2"
                      onMouseEnter={() => setDiamondsDropdown(true)}
                      onMouseLeave={() => setDiamondsDropdown(false)}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1.5 transition-colors duration-200 ${
                          isActive ? "text-amber-300 font-medium border-b-2 border-amber-400 pb-0.5" : "text-neutral-300 hover:text-amber-300"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-3 h-3 text-amber-400/80 group-hover:rotate-180 transition-transform duration-200" />
                      </Link>

                      {/* Dropdown Menu (Dark Glass with Gold Trim) */}
                      {diamondsDropdown && (
                        <div className="absolute top-full left-0 w-72 pt-2">
                          <div className="bg-[#101116] border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(245,158,11,0.1)] p-4 space-y-2 animate-fadeIn">
                            <Link
                              href="/diamonds"
                              className="block p-2.5 hover:bg-amber-500/10 transition border-b border-white/[0.06] group/item"
                            >
                              <span className="text-xs uppercase tracking-widest text-white group-hover/item:text-amber-300 block font-serif transition-colors">
                                All Certified Stones
                              </span>
                              <span className="text-[11px] text-neutral-400 normal-case block tracking-normal mt-0.5">
                                Grid &amp; Table Inventory View
                              </span>
                            </Link>
                            <Link
                              href="/natural-diamonds"
                              className="block p-2.5 hover:bg-amber-500/10 transition border-b border-white/[0.06] group/item"
                            >
                              <span className="text-xs uppercase tracking-widest text-white group-hover/item:text-amber-300 block font-serif transition-colors">
                                Natural Diamonds
                              </span>
                              <span className="text-[11px] text-neutral-400 normal-case block tracking-normal mt-0.5">
                                Earth-mined rare stones &bull; GIA certified
                              </span>
                            </Link>
                            <Link
                              href="/lab-grown-diamonds"
                              className="block p-2.5 hover:bg-amber-500/10 transition border-b border-white/[0.06] group/item"
                            >
                              <span className="text-xs uppercase tracking-widest text-white group-hover/item:text-amber-300 block font-serif transition-colors">
                                Lab-Grown Diamonds
                              </span>
                              <span className="text-[11px] text-neutral-400 normal-case block tracking-normal mt-0.5">
                                Precision Type IIa &bull; IGI certified
                              </span>
                            </Link>
                            <div className="pt-2">
                              <Link
                                href="/ring-builder"
                                className="text-[11px] uppercase tracking-widest text-amber-200 hover:text-white flex items-center justify-between px-3 py-2 font-medium bg-gradient-to-r from-amber-500/20 to-transparent border border-amber-500/40 hover:border-amber-400 transition"
                              >
                                <span>Custom Ring Wizard</span>
                                <span>&rarr;</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-amber-300 font-medium border-b-2 border-amber-400 pb-0.5" : "text-neutral-300 hover:text-amber-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-4 md:space-x-5">
              {/* Ring Builder Floating Tracker Button (Desktop) */}
              {isRingBuilderInProgress && (
                <Link
                  href="/ring-builder"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#14151D] border border-amber-500/40 text-[11px] uppercase tracking-wider font-medium text-amber-200 hover:border-amber-400 hover:text-white transition shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  title="Return to Custom Ring Builder"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Ring: Step {step}/3</span>
                </Link>
              )}

              {/* Enquiry Portfolio Trigger */}
              <button
                onClick={openDrawer}
                className="relative p-2 text-neutral-300 hover:text-amber-300 transition flex items-center gap-2 group"
                aria-label="View Enquiry Portfolio"
              >
                <div className="relative">
                  <Gem className="w-4 h-4 stroke-[1.5] text-amber-400/90 group-hover:scale-110 transition-transform" />
                  {items.length > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                      {items.length}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline text-[11px] uppercase tracking-widest font-normal text-neutral-300 group-hover:text-amber-200">
                  Portfolio {items.length > 0 && `(${items.length})`}
                </span>
              </button>

              {/* Luminous Imperial Gold CTA Button */}
              <Link
                href={siteSettings.headerCtaHref || "/request-quote"}
                className="hidden sm:inline-flex items-center justify-center py-2.5 px-5 gold-btn text-[11px] tracking-[0.2em]"
              >
                {siteSettings.headerCtaText || "Request Quote"}
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-neutral-300 hover:text-amber-300 transition"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Imperial Obsidian & Champagne Gold) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#08090B] text-white animate-fadeIn">
          {/* Drawer Top */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-amber-500/20 bg-[#050608]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <div className="relative h-8 w-36">
                <Image
                  src="/logo-dark-bg.png"
                  alt="Dhanlaxmi Diamond"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-amber-300 transition"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            {/* Custom Ring Builder Feature Link in Mobile Drawer */}
            <div className="p-4 bg-gradient-to-r from-amber-500/15 via-[#14151D] to-[#101116] border border-amber-500/40 space-y-2 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F59E0B] block">
                Interactive Studio
              </span>
              <Link
                href="/ring-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-lg text-white flex items-center justify-between font-medium"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F59E0B] animate-pulse" />
                  <span className="text-white">Custom Ring Builder</span>
                </span>
                <span className="text-amber-400">&rarr;</span>
              </Link>
              <p className="text-[11px] text-neutral-300">
                Design your ring in 3 steps: Setting + Diamond + Complete
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/90 font-mono block">
                Diamonds &amp; Fine Jewelry
              </span>
              <div className="pl-2 space-y-3 text-lg font-serif">
                <Link
                  href="/diamonds"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition"
                >
                  All Diamonds (Catalog &amp; Table)
                </Link>
                <Link
                  href="/natural-diamonds"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-neutral-300 hover:text-amber-300 text-sm pl-2 transition"
                >
                  &bull; Natural Diamonds (GIA)
                </Link>
                <Link
                  href="/lab-grown-diamonds"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-neutral-300 hover:text-amber-300 text-sm pl-2 transition"
                >
                  &bull; Lab-Grown Diamonds (IGI)
                </Link>
                <Link
                  href="/ring-builder?step=1"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition pt-1"
                >
                  Engagement Rings
                </Link>
                <Link
                  href="/jewelry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition"
                >
                  Fine Jewelry Creations
                </Link>
                <Link
                  href="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition"
                >
                  Diamond Collections
                </Link>
                <Link
                  href="/custom-jewelry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition"
                >
                  Bespoke Atelier Commission
                </Link>
              </div>
            </div>

            <div className="border-t border-white/[0.08] pt-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/90 font-mono block">
                The House
              </span>
              <div className="pl-2 space-y-3 text-lg font-serif">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition"
                >
                  About Our Legacy (Est. 2004)
                </Link>
                <Link
                  href="/quality"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition"
                >
                  Certifications &amp; 4Cs
                </Link>
                <Link
                  href="/sustainability"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition"
                >
                  Ethical Sourcing &amp; Kimberley Process
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition"
                >
                  Diamond Education &amp; Journal
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:text-amber-300 transition"
                >
                  Contact Concierge
                </Link>
              </div>
            </div>

            <div className="border-t border-white/[0.08] pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
                className="w-full flex items-center justify-between p-3.5 bg-[#121319] border border-amber-500/30 text-xs tracking-wider uppercase text-white shadow-md"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Gem className="w-4 h-4 text-amber-400" />
                  Enquiry Portfolio
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {items.length} {items.length === 1 ? "stone" : "stones"}
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Direct Channels */}
          <div className="p-6 border-t border-amber-500/20 bg-[#050608] space-y-3">
            <Link
              href={siteSettings.headerCtaHref || "/request-quote"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 gold-btn flex items-center justify-center text-xs tracking-widest font-semibold"
            >
              {siteSettings.headerCtaText || "Request a Quote"}
            </Link>
            <a
              href="tel:+919825100000"
              className="w-full py-3 gold-outline-btn flex items-center justify-center gap-2 text-xs tracking-widest"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              Speak to Diamond Specialist
            </a>
          </div>
        </div>
      )}
    </>
  );
};
