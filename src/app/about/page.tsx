import React from "react";
import { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Our Heritage (Est. 2004) | Dhanlaxmi Diamond",
  description:
    "The story of Dhanlaxmi Diamond: Founded in 2004 by three brothers at the craftsman's workbench in Surat, built on fraternity, hard work, and precision.",
};

export default function AboutPage() {
  return <AboutContent />;
}
