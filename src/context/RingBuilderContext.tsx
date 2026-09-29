"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Diamond, JewelryItem, PreciousMetal } from "@/lib/types";

export interface RingBuilderContextType {
  selectedDiamond: Diamond | null;
  selectedSetting: JewelryItem | null;
  selectedMetal: PreciousMetal;
  ringSize: string;
  step: 1 | 2 | 3;
  startWith: "setting" | "diamond";
  setDiamond: (diamond: Diamond) => void;
  setSetting: (setting: JewelryItem) => void;
  setSelectedMetal: (metal: PreciousMetal) => void;
  setRingSize: (size: string) => void;
  setStep: (step: 1 | 2 | 3) => void;
  startWithDiamond: () => void;
  startWithSetting: () => void;
  removeDiamond: () => void;
  removeSetting: () => void;
  resetRingBuilder: () => void;
  totalPrice: number;
}

const RingBuilderContext = createContext<RingBuilderContextType | undefined>(undefined);

export const RingBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | null>(null);
  const [selectedSetting, setSelectedSetting] = useState<JewelryItem | null>(null);
  const [selectedMetal, setSelectedMetal] = useState<PreciousMetal>("Platinum");
  const [ringSize, setRingSize] = useState<string>("6.0");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [startWith, setStartWith] = useState<"setting" | "diamond">("setting");

  // Load from session/localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("dld_ring_builder");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.selectedDiamond) setSelectedDiamond(parsed.selectedDiamond);
          if (parsed.selectedSetting) setSelectedSetting(parsed.selectedSetting);
          if (parsed.selectedMetal) setSelectedMetal(parsed.selectedMetal);
          if (parsed.ringSize) setRingSize(parsed.ringSize);
          if (parsed.step) setStep(parsed.step);
          if (parsed.startWith) setStartWith(parsed.startWith);
        }
      } catch {
        // ignore parse error
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "dld_ring_builder",
          JSON.stringify({
            selectedDiamond,
            selectedSetting,
            selectedMetal,
            ringSize,
            step,
            startWith,
          })
        );
      } catch {
        // ignore storage error
      }
    }
  }, [selectedDiamond, selectedSetting, selectedMetal, ringSize, step, startWith]);

  const setDiamond = (diamond: Diamond) => {
    setSelectedDiamond(diamond);
    if (selectedSetting) {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const setSetting = (setting: JewelryItem) => {
    setSelectedSetting(setting);
    if (setting.metal) {
      setSelectedMetal(setting.metal);
    }
    if (selectedDiamond) {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const startWithDiamond = () => {
    setStartWith("diamond");
    setStep(1);
  };

  const startWithSetting = () => {
    setStartWith("setting");
    setStep(1);
  };

  const removeDiamond = () => {
    setSelectedDiamond(null);
    setStep(startWith === "diamond" ? 1 : 2);
  };

  const removeSetting = () => {
    setSelectedSetting(null);
    setStep(startWith === "setting" ? 1 : 2);
  };

  const resetRingBuilder = () => {
    setSelectedDiamond(null);
    setSelectedSetting(null);
    setSelectedMetal("Platinum");
    setRingSize("6.0");
    setStep(1);
    setStartWith("setting");
    if (typeof window !== "undefined") {
      localStorage.removeItem("dld_ring_builder");
    }
  };

  const totalPrice = (selectedDiamond?.price || 0) + (selectedSetting?.price || 0);

  return (
    <RingBuilderContext.Provider
      value={{
        selectedDiamond,
        selectedSetting,
        selectedMetal,
        ringSize,
        step,
        startWith,
        setDiamond,
        setSetting,
        setSelectedMetal,
        setRingSize,
        setStep,
        startWithDiamond,
        startWithSetting,
        removeDiamond,
        removeSetting,
        resetRingBuilder,
        totalPrice,
      }}
    >
      {children}
    </RingBuilderContext.Provider>
  );
};

export const useRingBuilder = () => {
  const context = useContext(RingBuilderContext);
  if (!context) {
    throw new Error("useRingBuilder must be used within a RingBuilderProvider");
  }
  return context;
};
