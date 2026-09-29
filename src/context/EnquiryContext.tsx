"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { EnquiryItem } from "@/lib/types";

interface EnquiryContextType {
  items: EnquiryItem[];
  addItem: (item: EnquiryItem) => void;
  removeItem: (id: string) => void;
  isInEnquiry: (id: string) => boolean;
  clearEnquiry: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

const STORAGE_KEY = "dhanlaxmi_diamond_enquiry_portfolio";

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // LocalStorage unavailable
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // LocalStorage save error
      }
    }
  }, [items, isLoaded]);

  const addItem = (item: EnquiryItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isInEnquiry = (id: string) => {
    return items.some((i) => i.id === id);
  };

  const clearEnquiry = () => {
    setItems([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <EnquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInEnquiry,
        clearEnquiry,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
};
