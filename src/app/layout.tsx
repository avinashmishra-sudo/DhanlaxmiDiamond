import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { RingBuilderProvider } from "@/context/RingBuilderContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnquiryDrawer } from "@/components/enquiry/EnquiryDrawer";
import { WhatsAppFloatingBtn } from "@/components/common/WhatsAppFloatingBtn";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dhanlaxmidiamond.com"),
  title: {
    default: "Dhanlaxmi Diamond | High-Quality Natural Diamonds & Fine Jewelry House",
    template: "%s | Dhanlaxmi Diamond",
  },
  description:
    "Founded in 2004, Dhanlaxmi Diamond specializes in superlative natural diamonds, rare colored gems, precision lab-grown diamonds, and bespoke fine jewelry. Serving international jewelers, wholesalers, and private collectors worldwide.",
  keywords: [
    "Dhanlaxmi Diamond",
    "Natural Diamonds Surat",
    "Certified GIA Diamonds",
    "Fine Jewelry Manufacturer",
    "Diamond Wholesaler India",
    "Bespoke Diamond Rings",
    "Surat Diamond Exchange",
    "IGI Certified Lab-Grown Diamonds",
  ],
  authors: [{ name: "Dhanlaxmi Diamond" }],
  creator: "Dhanlaxmi Diamond",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dhanlaxmidiamond.com",
    siteName: "Dhanlaxmi Diamond",
    title: "Dhanlaxmi Diamond | Where Exceptional Diamonds Meet Timeless Craftsmanship",
    description:
      "Discover carefully selected diamonds and fine jewelry crafted for discerning clients worldwide. Established in 2004.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Dhanlaxmi Diamond Fine Jewelry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhanlaxmi Diamond | Exceptional Diamonds & Fine Jewelry",
    description: "Discover carefully selected natural diamonds and bespoke fine jewelry. Est. 2004.",
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: "Dhanlaxmi Diamond",
    url: "https://dhanlaxmidiamond.com",
    logo: "https://dhanlaxmidiamond.com/wp-content/uploads/2025/09/cropped-Logo-PNG-Original-2-194x65.png",
    description:
      "Dhanlaxmi Diamond is a professional diamond and fine jewelry house specializing in high-quality natural diamonds and premium jewelry. Founded in 2004.",
    foundingDate: "2004",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2,3, A Building, E, Vakahariya Mill, SY -389/A/1, Plot -3, Ashwini Kumar Rd, near Visamo",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      postalCode: "395008",
      addressCountry: "IN",
    },
    email: "info@dhanlaxmidiamond.com",
    sameAs: [
      "https://www.instagram.com/dhanlaxmidiamond/",
      "https://www.linkedin.com/company/dhanlaxmi-diamond/",
      "https://www.facebook.com/profile.php?id=61564307682071",
    ],
    priceRange: "$$$$",
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#EDEDED] selection:bg-brand-gold selection:text-black antialiased">
        <EnquiryProvider>
          <RingBuilderProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <EnquiryDrawer />
            <WhatsAppFloatingBtn />
          </RingBuilderProvider>
        </EnquiryProvider>
      </body>
    </html>
  );
}
