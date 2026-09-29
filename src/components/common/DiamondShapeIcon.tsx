import React from "react";
import { DiamondShape } from "@/lib/types";

interface Props {
  shape: DiamondShape | string;
  className?: string;
  isActive?: boolean;
}

export const DiamondShapeIcon: React.FC<Props> = ({ shape, className = "w-7 h-7", isActive = false }) => {
  const fillColor = isActive ? "currentColor" : "none";
  const fillOpacity = isActive ? 0.2 : 0;

  switch (shape.toLowerCase()) {
    case "round":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <circle cx="50" cy="50" r="42" />
          <polygon points="50,15 75,30 75,70 50,85 25,70 25,30" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="18" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );
    case "oval":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <ellipse cx="50" cy="50" rx="34" ry="44" />
          <polygon points="50,12 70,30 70,70 50,88 30,70 30,30" strokeWidth="2.5" />
        </svg>
      );
    case "emerald":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <polygon points="26,12 74,12 88,26 88,74 74,88 26,88 12,74 12,26" />
          <rect x="24" y="24" width="52" height="52" strokeWidth="2.5" />
          <line x1="26" y1="12" x2="24" y2="24" strokeWidth="2" />
          <line x1="74" y1="12" x2="76" y2="24" strokeWidth="2" />
          <line x1="88" y1="74" x2="76" y2="76" strokeWidth="2" />
          <line x1="12" y1="74" x2="24" y2="76" strokeWidth="2" />
        </svg>
      );
    case "radiant":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <polygon points="24,14 76,14 88,26 88,74 76,86 24,86 12,74 12,26" />
          <line x1="50" y1="14" x2="50" y2="86" strokeWidth="2" />
          <line x1="12" y1="50" x2="88" y2="50" strokeWidth="2" />
          <polygon points="32,24 68,24 76,32 76,68 68,76 32,76 24,68 24,32" strokeWidth="2" />
        </svg>
      );
    case "cushion":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <rect x="14" y="14" width="72" height="72" rx="20" ry="20" />
          <rect x="26" y="26" width="48" height="48" rx="12" ry="12" strokeWidth="2.5" />
        </svg>
      );
    case "pear":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <path d="M 50,10 C 65,35 84,55 84,70 A 34,34 0 0,1 16,70 C 16,55 35,35 50,10 Z" />
          <circle cx="50" cy="64" r="14" strokeWidth="2" />
        </svg>
      );
    case "princess":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <rect x="15" y="15" width="70" height="70" />
          <line x1="15" y1="15" x2="85" y2="85" strokeWidth="2" />
          <line x1="85" y1="15" x2="15" y2="85" strokeWidth="2" />
          <rect x="32" y="32" width="36" height="36" strokeWidth="2" />
        </svg>
      );
    case "marquise":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <path d="M 50,8 C 80,32 80,68 50,92 C 20,68 20,32 50,8 Z" />
          <line x1="50" y1="8" x2="50" y2="92" strokeWidth="2" />
          <ellipse cx="50" cy="50" rx="14" ry="24" strokeWidth="2" />
        </svg>
      );
    case "asscher":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <polygon points="28,14 72,14 86,28 86,72 72,86 28,86 14,72 14,28" />
          <polygon points="34,24 66,24 76,34 76,66 66,76 34,76 24,66 24,34" strokeWidth="2" />
          <rect x="38" y="38" width="24" height="24" strokeWidth="2" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <path d="M 50,30 C 50,15 32,12 24,20 C 14,30 14,48 50,88 C 86,48 86,30 76,20 C 68,12 50,15 50,30 Z" />
          <line x1="50" y1="30" x2="50" y2="85" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" fill={fillColor} fillOpacity={fillOpacity} stroke="currentColor" strokeWidth="4" className={className}>
          <polygon points="50,10 88,40 70,90 30,90 12,40" />
        </svg>
      );
  }
};
