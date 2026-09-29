"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { initialDiamonds } from "@/lib/data/diamonds";
import { initialJewelry } from "@/lib/data/jewelry";
import { initialCategories } from "@/lib/data/categories";
import { defaultSiteSettings, initialNavLinks, defaultAboutContent, initialAdminUsers } from "@/lib/data/siteContent";
import {
  Diamond,
  JewelryItem,
  CategoryItem,
  NavLinkItem,
  AboutPageContent,
  AboutGalleryImage,
  AdminUser,
  AdminPermission,
  AdminRole,
} from "@/lib/types";
import {
  Lock,
  LogOut,
  Search,
  Eye,
  Save,
  Plus,
  Pencil,
  Trash2,
  FolderPlus,
  Check,
  X,
  Layers,
  Sparkles,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Compass,
  SlidersHorizontal,
  Film,
  Video,
  Play,
  Camera,
  Users as UsersIcon,
  Key,
  Shield,
  UserPlus,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

interface MockEnquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCountry: string;
  requirementType: string;
  budgetRange: string;
  items: string[];
  status: "New" | "In Consultation" | "Quoted" | "Completed";
  date: string;
  notes: string;
}

const mockEnquiriesData: MockEnquiry[] = [
  {
    id: "ENQ-901",
    clientName: "David Sterling",
    clientEmail: "d.sterling@mayfairjewels.co.uk",
    clientPhone: "+44 7911 123456",
    clientCountry: "London, UK",
    requirementType: "Jewelry Retailer",
    budgetRange: "$25,000 - $50,000",
    items: ["DLD-NAT-RD-204 (2.04ct Round D VVS1)", "DLJ-BRC-TEN-02 (8.40ct Tennis Bracelet)"],
    status: "In Consultation",
    date: "2026-09-26",
    notes: "Client requires express Malca-Amit insured delivery to London vault. Sent proforma invoice.",
  },
  {
    id: "ENQ-902",
    clientName: "Amira Al-Mansoor",
    clientEmail: "amira.mansoor@gulfholding.ae",
    clientPhone: "+971 50 123 4567",
    clientCountry: "Dubai, UAE",
    requirementType: "Bespoke Commission",
    budgetRange: "$50,000 - $100,000",
    items: ["DLD-NAT-RD-402 (4.02ct Radiant E VS1 GIA)"],
    status: "New",
    date: "2026-09-27",
    notes: "Inquiring about mounting this 4ct stone in bespoke 950 Platinum bypass ring.",
  },
  {
    id: "ENQ-903",
    clientName: "Marcus Vance",
    clientEmail: "mvance@vancefinegems.com",
    clientPhone: "+1 (212) 555-0199",
    clientCountry: "New York, USA",
    requirementType: "Wholesaler",
    budgetRange: "$100,000+ Connoisseur Tier",
    items: ["DLD-NAT-EM-315 (3.15ct Emerald E VVS2)", "DLD-NAT-RD-152 (1.52ct Fancy Yellow)"],
    status: "Quoted",
    date: "2026-09-25",
    notes: "Wholesale allocation. Rapaport discount approved by senior partner.",
  },
];

export default function AdminPortalPage() {
  // Authentication & Session state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsersList, setAdminUsersList] = useState<AdminUser[]>(initialAdminUsers);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Login Form State
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMode, setLoginMode] = useState<"credentials" | "passcode">("credentials");
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Master Password Update State
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState<string | null>(null);

  // User CRUD Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deleteUserConfirmId, setDeleteUserConfirmId] = useState<string | null>(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "Sales Concierge" as AdminRole,
    permissions: ["enquiries", "dashboard"] as AdminPermission[],
    status: "Active" as "Active" | "Inactive",
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "diamonds" | "jewelry" | "categories" | "header" | "about" | "enquiries" | "cms" | "seo" | "users"
  >("dashboard");

  // Diamonds state
  const [diamondsList, setDiamondsList] = useState<Diamond[]>(initialDiamonds);
  const [diamondSearch, setDiamondSearch] = useState("");

  // Jewelry state
  const [jewelryList, setJewelryList] = useState<JewelryItem[]>(initialJewelry);

  // Categories CRUD state
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>(initialCategories);
  const [categorySearch, setCategorySearch] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Category Add / Edit Form State
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    status: "Active" as "Active" | "Draft" | "Archived",
    featured: true,
    displayOrder: 1,
  });

  // Navigation Links CRUD state
  const [navLinksList, setNavLinksList] = useState<NavLinkItem[]>(initialNavLinks);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const [editingNav, setEditingNav] = useState<NavLinkItem | null>(null);
  const [deleteNavConfirmId, setDeleteNavConfirmId] = useState<string | null>(null);
  const [navFormData, setNavFormData] = useState({
    name: "",
    href: "",
    isHighlighted: false,
    hasDropdown: false,
    displayOrder: 1,
    visible: true,
  });

  // About Page Media state
  const [aboutContent, setAboutContent] = useState<AboutPageContent>(defaultAboutContent);
  const [aboutSaved, setAboutSaved] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryImage, setEditingGalleryImage] = useState<AboutGalleryImage | null>(null);
  const [deleteGalleryConfirmId, setDeleteGalleryConfirmId] = useState<string | null>(null);
  const [galleryFormData, setGalleryFormData] = useState({
    title: "",
    caption: "",
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    displayOrder: 1,
  });

  // Enquiries state
  const [enquiries, setEnquiries] = useState<MockEnquiry[]>(mockEnquiriesData);
  const [selectedEnquiry, setSelectedEnquiry] = useState<MockEnquiry | null>(null);

  // CMS state
  const [cmsSettings, setCmsSettings] = useState(defaultSiteSettings);
  const [cmsSaved, setCmsSaved] = useState(false);

  // Load saved CMS, Categories & Nav settings on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. CMS Settings
      const saved = localStorage.getItem("dhanlaxmi_site_settings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCmsSettings((prev) => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error("Failed to parse saved CMS settings", e);
        }
      }

      // 2. Categories
      const savedCats = localStorage.getItem("dhanlaxmi_categories");
      if (savedCats) {
        try {
          const parsedCats = JSON.parse(savedCats);
          if (Array.isArray(parsedCats) && parsedCats.length > 0) {
            setCategoriesList(parsedCats);
          }
        } catch (e) {
          console.error("Failed to parse saved categories", e);
        }
      }

      // 3. Navigation Links
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
            setNavLinksList(parsedNav);
          }
        } catch (e) {
          console.error("Failed to parse saved nav links", e);
        }
      }

      // 4. About House Media
      const savedAbout = localStorage.getItem("dhanlaxmi_about_content");
      if (savedAbout) {
        try {
          const parsedAbout = JSON.parse(savedAbout);
          setAboutContent((prev) => ({ ...prev, ...parsedAbout }));
        } catch (e) {
          console.error("Failed to parse saved about content", e);
        }
      }

      // 5. Admin Users & Session
      let loadedUsers = initialAdminUsers;
      const savedUsers = localStorage.getItem("dhanlaxmi_admin_users");
      if (savedUsers) {
        try {
          const parsedUsers = JSON.parse(savedUsers);
          if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
            loadedUsers = parsedUsers;
            setAdminUsersList(parsedUsers);
          }
        } catch (e) {
          console.error("Failed to parse saved admin users", e);
        }
      } else {
        localStorage.setItem("dhanlaxmi_admin_users", JSON.stringify(initialAdminUsers));
      }

      // Check active session
      const savedSession = localStorage.getItem("dhanlaxmi_admin_session");
      if (savedSession) {
        try {
          const parsedSession = JSON.parse(savedSession);
          const matchedUser = loadedUsers.find(
            (u) => u.id === parsedSession.id && u.status === "Active"
          );
          if (matchedUser) {
            setCurrentUser(matchedUser);
            setIsAuthenticated(true);
          }
        } catch (e) {
          console.error("Failed to parse saved admin session", e);
        }
      }
    }
  }, []);

  // Helper to persist nav links
  const saveNavLinksToStorage = (newList: NavLinkItem[]) => {
    setNavLinksList(newList);
    if (typeof window !== "undefined") {
      localStorage.setItem("dhanlaxmi_nav_links", JSON.stringify(newList));
      window.dispatchEvent(new Event("dhanlaxmi_nav_links_updated"));
    }
  };

  const handleOpenAddNav = () => {
    setEditingNav(null);
    setNavFormData({
      name: "",
      href: "/",
      isHighlighted: false,
      hasDropdown: false,
      displayOrder: navLinksList.length + 1,
      visible: true,
    });
    setIsNavModalOpen(true);
  };

  const handleOpenEditNav = (item: NavLinkItem) => {
    setEditingNav(item);
    setNavFormData({
      name: item.name,
      href: item.href,
      isHighlighted: Boolean(item.isHighlighted),
      hasDropdown: Boolean(item.hasDropdown),
      displayOrder: item.displayOrder,
      visible: item.visible !== false,
    });
    setIsNavModalOpen(true);
  };

  const handleSaveNavSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navFormData.name.trim() || !navFormData.href.trim()) return;

    if (editingNav) {
      const updated = navLinksList.map((item) =>
        item.id === editingNav.id
          ? {
              ...item,
              name: navFormData.name.trim(),
              href: navFormData.href.trim(),
              isHighlighted: navFormData.isHighlighted,
              hasDropdown: navFormData.hasDropdown,
              displayOrder: Number(navFormData.displayOrder) || item.displayOrder,
              visible: navFormData.visible,
            }
          : item
      );
      saveNavLinksToStorage(updated);
    } else {
      const newNav: NavLinkItem = {
        id: `nav-${Date.now()}`,
        name: navFormData.name.trim(),
        href: navFormData.href.trim(),
        isHighlighted: navFormData.isHighlighted,
        hasDropdown: navFormData.hasDropdown,
        displayOrder: Number(navFormData.displayOrder) || navLinksList.length + 1,
        visible: navFormData.visible,
      };
      saveNavLinksToStorage([...navLinksList, newNav]);
    }
    setIsNavModalOpen(false);
  };

  const handleDeleteNav = (id: string) => {
    const updated = navLinksList.filter((item) => item.id !== id);
    saveNavLinksToStorage(updated);
    setDeleteNavConfirmId(null);
  };

  const handleToggleNavVisibility = (id: string) => {
    const updated = navLinksList.map((item) =>
      item.id === id ? { ...item, visible: !item.visible } : item
    );
    saveNavLinksToStorage(updated);
  };

  const handleMoveNav = (id: string, direction: "up" | "down") => {
    const sorted = [...navLinksList].sort((a, b) => a.displayOrder - b.displayOrder);
    const index = sorted.findIndex((item) => item.id === id);
    if (index === -1) return;

    if (direction === "up" && index > 0) {
      const temp = sorted[index].displayOrder;
      sorted[index].displayOrder = sorted[index - 1].displayOrder;
      sorted[index - 1].displayOrder = temp;
    } else if (direction === "down" && index < sorted.length - 1) {
      const temp = sorted[index].displayOrder;
      sorted[index].displayOrder = sorted[index + 1].displayOrder;
      sorted[index + 1].displayOrder = temp;
    }

    saveNavLinksToStorage(sorted);
  };

  // Helper to persist categories
  const saveCategoriesToStorage = (newList: CategoryItem[]) => {
    setCategoriesList(newList);
    if (typeof window !== "undefined") {
      localStorage.setItem("dhanlaxmi_categories", JSON.stringify(newList));
      window.dispatchEvent(new Event("dhanlaxmi_categories_updated"));
    }
  };

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({
      name: "",
      slug: "",
      description: "",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
      status: "Active",
      featured: true,
      displayOrder: categoriesList.length + 1,
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setCategoryFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      status: cat.status,
      featured: Boolean(cat.featured),
      displayOrder: cat.displayOrder,
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormData.name.trim()) return;

    const slug = categoryFormData.slug.trim()
      ? categoryFormData.slug.trim().toLowerCase().replace(/\s+/g, "-")
      : categoryFormData.name.trim().toLowerCase().replace(/\s+/g, "-");

    if (editingCategory) {
      // UPDATE
      const updated = categoriesList.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: categoryFormData.name.trim(),
              slug,
              description: categoryFormData.description.trim(),
              image: categoryFormData.image.trim() || c.image,
              status: categoryFormData.status,
              featured: categoryFormData.featured,
              displayOrder: Number(categoryFormData.displayOrder) || c.displayOrder,
            }
          : c
      );
      saveCategoriesToStorage(updated);
    } else {
      // CREATE
      const newCategory: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: categoryFormData.name.trim(),
        slug,
        description: categoryFormData.description.trim(),
        image:
          categoryFormData.image.trim() ||
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
        status: categoryFormData.status,
        featured: categoryFormData.featured,
        displayOrder: Number(categoryFormData.displayOrder) || categoriesList.length + 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveCategoriesToStorage([...categoriesList, newCategory]);
    }
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    const updated = categoriesList.filter((c) => c.id !== id);
    saveCategoriesToStorage(updated);
    setDeleteConfirmId(null);
  };

  const handleToggleCategoryStatus = (id: string) => {
    const updated = categoriesList.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === "Active" ? ("Archived" as const) : ("Active" as const),
        };
      }
      return c;
    });
    saveCategoriesToStorage(updated);
  };

  // Helper to persist About media content
  const saveAboutContentToStorage = (updated: AboutPageContent) => {
    setAboutContent(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("dhanlaxmi_about_content", JSON.stringify(updated));
      window.dispatchEvent(new Event("dhanlaxmi_about_updated"));
    }
  };

  const handleSaveAboutMedia = (e: React.FormEvent) => {
    e.preventDefault();
    saveAboutContentToStorage(aboutContent);
    setAboutSaved(true);
    setTimeout(() => setAboutSaved(false), 3500);
  };

  const handleOpenAddGallery = () => {
    setEditingGalleryImage(null);
    setGalleryFormData({
      title: "",
      caption: "",
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
      displayOrder: (aboutContent.galleryImages?.length || 0) + 1,
    });
    setIsGalleryModalOpen(true);
  };

  const handleOpenEditGallery = (item: AboutGalleryImage) => {
    setEditingGalleryImage(item);
    setGalleryFormData({
      title: item.title,
      caption: item.caption,
      url: item.url,
      displayOrder: item.displayOrder,
    });
    setIsGalleryModalOpen(true);
  };

  const handleSaveGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFormData.title.trim() || !galleryFormData.url.trim()) return;

    let updatedImages: AboutGalleryImage[];
    if (editingGalleryImage) {
      updatedImages = (aboutContent.galleryImages || []).map((img) =>
        img.id === editingGalleryImage.id
          ? {
              ...img,
              title: galleryFormData.title.trim(),
              caption: galleryFormData.caption.trim(),
              url: galleryFormData.url.trim(),
              displayOrder: Number(galleryFormData.displayOrder) || img.displayOrder,
            }
          : img
      );
    } else {
      const newImage: AboutGalleryImage = {
        id: `gal-${Date.now().toString().slice(-6)}`,
        title: galleryFormData.title.trim(),
        caption: galleryFormData.caption.trim(),
        url: galleryFormData.url.trim(),
        displayOrder: Number(galleryFormData.displayOrder) || (aboutContent.galleryImages?.length || 0) + 1,
      };
      updatedImages = [...(aboutContent.galleryImages || []), newImage];
    }

    updatedImages.sort((a, b) => a.displayOrder - b.displayOrder);
    const reindexed = updatedImages.map((img, idx) => ({ ...img, displayOrder: idx + 1 }));
    const updatedContent = { ...aboutContent, galleryImages: reindexed };
    saveAboutContentToStorage(updatedContent);
    setIsGalleryModalOpen(false);
  };

  const handleDeleteGallery = (id: string | null) => {
    if (!id) return;
    const filtered = (aboutContent.galleryImages || []).filter((img) => img.id !== id);
    const reindexed = filtered.map((img, idx) => ({ ...img, displayOrder: idx + 1 }));
    const updatedContent = { ...aboutContent, galleryImages: reindexed };
    saveAboutContentToStorage(updatedContent);
    setDeleteGalleryConfirmId(null);
  };

  const handleMoveGallery = (id: string, direction: "up" | "down") => {
    const currentImages = [...(aboutContent.galleryImages || [])].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
    const index = currentImages.findIndex((img) => img.id === id);
    if (index === -1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentImages.length) return;

    const temp = currentImages[index];
    currentImages[index] = currentImages[targetIndex];
    currentImages[targetIndex] = temp;

    const reindexed = currentImages.map((img, idx) => ({ ...img, displayOrder: idx + 1 }));
    const updatedContent = { ...aboutContent, galleryImages: reindexed };
    saveAboutContentToStorage(updatedContent);
  };

  // Helper to format YouTube URLs into embeddable format for admin preview
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
    return url;
  };

  // Helper to persist Admin Users
  const saveAdminUsersToStorage = (updatedUsers: AdminUser[]) => {
    setAdminUsersList(updatedUsers);
    if (typeof window !== "undefined") {
      localStorage.setItem("dhanlaxmi_admin_users", JSON.stringify(updatedUsers));
    }
  };

  // Permission access checker
  const canAccess = (perm: AdminPermission): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === "Super Admin" || currentUser.isPrimaryAdmin) return true;
    return currentUser.permissions.includes(perm);
  };

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    let matchedUser: AdminUser | undefined;

    if (loginMode === "passcode") {
      const code = passcode.trim();
      if (!code) {
        setLoginError("Please enter authorization passcode");
        return;
      }
      const primaryAdmin = adminUsersList.find((u) => u.isPrimaryAdmin) || adminUsersList[0];
      if (
        primaryAdmin &&
        (code === primaryAdmin.password ||
          code.toUpperCase() === "DHANLAXMI" ||
          code === "2004" ||
          code.toUpperCase() === "ADMIN")
      ) {
        matchedUser = primaryAdmin;
      } else {
        matchedUser = adminUsersList.find(
          (u) => u.status === "Active" && u.password === code
        );
      }
    } else {
      // Credentials mode
      const uName = loginUsername.trim().toLowerCase();
      const pwd = loginPassword.trim();

      if (!uName || !pwd) {
        setLoginError("Please provide both username and password");
        return;
      }

      matchedUser = adminUsersList.find(
        (u) =>
          u.username.toLowerCase() === uName &&
          (u.password === pwd ||
            (u.isPrimaryAdmin && (pwd.toUpperCase() === "DHANLAXMI" || pwd === "2004")))
      );
    }

    if (!matchedUser) {
      setLoginError("Invalid credentials. Please verify your username and password.");
      return;
    }

    if (matchedUser.status === "Inactive") {
      setLoginError("This staff account has been deactivated. Please contact the Executive Admin.");
      return;
    }

    // Success
    const updatedUser: AdminUser = {
      ...matchedUser,
      lastLogin: new Date().toISOString().replace("T", " ").slice(0, 16),
    };

    const updatedList = adminUsersList.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    saveAdminUsersToStorage(updatedList);
    setCurrentUser(updatedUser);
    setIsAuthenticated(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("dhanlaxmi_admin_session", JSON.stringify(updatedUser));
    }

    // Auto-switch to first permitted tab if activeTab is forbidden
    if (updatedUser.role !== "Super Admin" && !updatedUser.isPrimaryAdmin) {
      if (!updatedUser.permissions.includes(activeTab as AdminPermission)) {
        setActiveTab(updatedUser.permissions[0] || "dashboard");
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setPasscode("");
    setLoginPassword("");
    setLoginError(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("dhanlaxmi_admin_session");
    }
  };

  // Master Admin Password Update
  const handleUpdateMasterPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordUpdateError(null);
    setPasswordUpdateSuccess(false);

    if (!currentUser) return;

    const isCurrentValid =
      currentPasswordInput === currentUser.password ||
      (currentUser.isPrimaryAdmin &&
        (currentPasswordInput.toUpperCase() === "DHANLAXMI" || currentPasswordInput === "2004"));

    if (!isCurrentValid) {
      setPasswordUpdateError("Current password verification failed. Please enter your existing password.");
      return;
    }

    if (newPasswordInput.length < 4) {
      setPasswordUpdateError("New password must be at least 4 characters.");
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordUpdateError("New passwords do not match. Please re-enter.");
      return;
    }

    const updatedUser = { ...currentUser, password: newPasswordInput };
    const updatedList = adminUsersList.map((u) =>
      u.id === currentUser.id ? updatedUser : u
    );

    saveAdminUsersToStorage(updatedList);
    setCurrentUser(updatedUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("dhanlaxmi_admin_session", JSON.stringify(updatedUser));
    }

    setPasswordUpdateSuccess(true);
    setCurrentPasswordInput("");
    setNewPasswordInput("");
    setConfirmPasswordInput("");
    setTimeout(() => setPasswordUpdateSuccess(false), 4000);
  };

  // User CRUD Handlers
  const handleOpenAddUser = () => {
    setEditingUser(null);
    setUserFormData({
      name: "",
      username: "",
      password: "",
      role: "Sales Concierge",
      permissions: ["enquiries", "dashboard"],
      status: "Active",
    });
    setIsUserModalOpen(true);
  };

  const handleOpenEditUser = (user: AdminUser) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name,
      username: user.username,
      password: user.password,
      role: user.role,
      permissions: [...user.permissions],
      status: user.status,
    });
    setIsUserModalOpen(true);
  };

  const handleRolePresetChange = (role: AdminRole) => {
    let perms: AdminPermission[] = [];
    if (role === "Super Admin") {
      perms = [
        "dashboard",
        "diamonds",
        "jewelry",
        "categories",
        "header",
        "about",
        "enquiries",
        "cms",
        "seo",
        "users",
      ];
    } else if (role === "Store Manager") {
      perms = ["dashboard", "diamonds", "jewelry", "categories", "header", "about", "enquiries", "cms", "seo"];
    } else if (role === "Inventory Specialist") {
      perms = ["diamonds", "jewelry", "categories"];
    } else if (role === "Sales Concierge") {
      perms = ["enquiries", "dashboard"];
    } else {
      perms = userFormData.permissions;
    }
    setUserFormData({ ...userFormData, role, permissions: perms });
  };

  const handleTogglePermission = (perm: AdminPermission) => {
    const has = userFormData.permissions.includes(perm);
    const updated = has
      ? userFormData.permissions.filter((p) => p !== perm)
      : [...userFormData.permissions, perm];
    setUserFormData({ ...userFormData, permissions: updated });
  };

  const handleSaveUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormData.name.trim() || !userFormData.username.trim() || !userFormData.password.trim()) {
      return;
    }

    const trimmedUsername = userFormData.username.trim().toLowerCase();

    // Check username uniqueness
    const exists = adminUsersList.some(
      (u) => u.username.toLowerCase() === trimmedUsername && u.id !== editingUser?.id
    );
    if (exists) {
      alert(`Username "${trimmedUsername}" is already in use by another user.`);
      return;
    }

    if (editingUser) {
      const updatedList = adminUsersList.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              name: userFormData.name.trim(),
              username: trimmedUsername,
              password: userFormData.password.trim(),
              role: userFormData.role,
              permissions: userFormData.permissions,
              status: userFormData.status,
            }
          : u
      );
      saveAdminUsersToStorage(updatedList);
      if (currentUser?.id === editingUser.id) {
        setCurrentUser({
          ...currentUser,
          name: userFormData.name.trim(),
          username: trimmedUsername,
          password: userFormData.password.trim(),
          role: userFormData.role,
          permissions: userFormData.permissions,
          status: userFormData.status,
        });
      }
    } else {
      const newUser: AdminUser = {
        id: `user-${Date.now().toString().slice(-6)}`,
        name: userFormData.name.trim(),
        username: trimmedUsername,
        password: userFormData.password.trim(),
        role: userFormData.role,
        permissions: userFormData.permissions,
        status: userFormData.status,
        createdAt: new Date().toISOString().split("T")[0],
        isPrimaryAdmin: false,
      };
      saveAdminUsersToStorage([...adminUsersList, newUser]);
    }

    setIsUserModalOpen(false);
  };

  const handleDeleteUser = (id: string | null) => {
    if (!id) return;
    const target = adminUsersList.find((u) => u.id === id);
    if (target?.isPrimaryAdmin) {
      alert("The primary Super Admin account cannot be deleted.");
      setDeleteUserConfirmId(null);
      return;
    }
    if (target?.id === currentUser?.id) {
      alert("You cannot delete your own active account.");
      setDeleteUserConfirmId(null);
      return;
    }

    const updatedList = adminUsersList.filter((u) => u.id !== id);
    saveAdminUsersToStorage(updatedList);
    setDeleteUserConfirmId(null);
  };

  const handleToggleUserStatus = (id: string) => {
    const target = adminUsersList.find((u) => u.id === id);
    if (target?.isPrimaryAdmin) {
      alert("Primary Super Admin account must remain active.");
      return;
    }
    const updatedList = adminUsersList.map((u) =>
      u.id === id
        ? {
            ...u,
            status: u.status === "Active" ? ("Inactive" as const) : ("Active" as const),
          }
        : u
    );
    saveAdminUsersToStorage(updatedList);
  };

  const toggleDiamondStock = (id: string) => {
    setDiamondsList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, inStock: !d.inStock } : d))
    );
  };

  const toggleJewelryStock = (id: string) => {
    setJewelryList((prev) =>
      prev.map((j) => (j.id === id ? { ...j, inStock: !j.inStock } : j))
    );
  };

  const updateEnquiryStatus = (id: string, status: MockEnquiry["status"]) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("dhanlaxmi_site_settings", JSON.stringify(cmsSettings));
      window.dispatchEvent(new Event("dhanlaxmi_site_settings_updated"));
    }
    setCmsSaved(true);
    setTimeout(() => setCmsSaved(false), 3500);
  };

  // Login Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 text-[#EDEDED]">
        <div className="w-full max-w-md bg-[#141414] border border-neutral-800 p-8 md:p-10 space-y-6 shadow-2xl">
          <div className="text-center space-y-3">
            <div className="relative h-12 w-48 mx-auto">
              <Image
                src="/logo-dark-bg.png"
                alt="Dhanlaxmi Diamond"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-[#FBC90B] uppercase tracking-[0.2em] font-medium pt-1">
              Executive Vault &bull; Staff Authentication
            </p>
          </div>

          {/* Login Mode Toggle Tabs */}
          <div className="grid grid-cols-2 bg-[#1A1A1A] p-1 border border-neutral-800 text-xs">
            <button
              type="button"
              onClick={() => {
                setLoginMode("credentials");
                setLoginError(null);
              }}
              className={`py-2 text-center transition font-medium ${
                loginMode === "credentials"
                  ? "bg-[#FBC90B] text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Staff Credentials
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode("passcode");
                setLoginError(null);
              }}
              className={`py-2 text-center transition font-medium ${
                loginMode === "passcode"
                  ? "bg-[#FBC90B] text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Master Passcode
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginMode === "credentials" ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., admin, sales, vault"
                    value={loginUsername}
                    onChange={(e) => {
                      setLoginUsername(e.target.value);
                      setLoginError(null);
                    }}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter account password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginError(null);
                    }}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                  Atelier Master Passcode
                </label>
                <input
                  type="password"
                  placeholder="Enter passcode (e.g. 2004 or DHANLAXMI)"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setLoginError(null);
                  }}
                  className="w-full bg-[#181818] border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none font-mono"
                />
              </div>
            )}

            {loginError && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-widest font-semibold transition duration-300 shadow-lg hover:shadow-amber-500/20"
            >
              Authenticate &amp; Access Vault
            </button>
          </form>

          {/* Quick Demo Credentials Accordion */}
          <div className="pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-400 space-y-1.5 font-light">
            <span className="text-[#FBC90B] uppercase tracking-wider block font-medium text-[10px]">
              Default Credentials Available:
            </span>
            <div className="grid grid-cols-1 gap-1 text-[11px] font-mono">
              <div>
                &bull; <strong className="text-white">admin</strong> /{" "}
                <span className="text-neutral-300">DHANLAXMI</span> (Super Admin)
              </div>
              <div>
                &bull; <strong className="text-white">sales</strong> /{" "}
                <span className="text-neutral-300">SALES2026</span> (Concierge Only)
              </div>
              <div>
                &bull; Passcode: <span className="text-amber-400">2004</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-1">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-white transition underline font-medium"
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Diamonds in Admin
  const filteredAdminDiamonds = diamondsList.filter(
    (d) =>
      d.name.toLowerCase().includes(diamondSearch.toLowerCase()) ||
      d.sku.toLowerCase().includes(diamondSearch.toLowerCase()) ||
      d.certificateNumber.toLowerCase().includes(diamondSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] pb-20">
      {/* Top Admin Header Bar */}
      <div className="bg-[#141414] border-b border-neutral-800 sticky top-0 z-30 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-7 w-28">
                <Image
                  src="/logo-dark-bg.png"
                  alt="Dhanlaxmi Diamond"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[#FBC90B] text-[10px] uppercase font-medium border border-neutral-700 bg-neutral-900 px-2 py-0.5 tracking-wider">
                Admin CMS
              </span>
            </Link>
            <span className="hidden sm:inline px-2.5 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] uppercase tracking-wider font-medium">
              Surat Atelier Online
            </span>
          </div>

          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-neutral-800">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-900/40 border border-amber-500/40 flex items-center justify-center text-[#FBC90B] text-xs font-semibold">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left text-xs">
                  <div className="font-medium text-white flex items-center gap-1.5 leading-tight">
                    <span>{currentUser.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/20 text-[#FBC90B] font-mono border border-amber-500/30">
                      {currentUser.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">@{currentUser.username}</span>
                </div>
              </div>
            )}

            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#FBC90B] font-medium"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 border border-neutral-700 hover:border-red-500 text-xs text-neutral-400 hover:text-red-400 transition flex items-center gap-1.5 font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs (Filtered by User Permissions) */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-4 mb-8">
          {canAccess("dashboard") && (
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium ${
                activeTab === "dashboard"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Dashboard
            </button>
          )}

          {canAccess("diamonds") && (
            <button
              onClick={() => setActiveTab("diamonds")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium ${
                activeTab === "diamonds"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Diamonds ({diamondsList.length})
            </button>
          )}

          {canAccess("jewelry") && (
            <button
              onClick={() => setActiveTab("jewelry")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium ${
                activeTab === "jewelry"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Fine Jewelry ({jewelryList.length})
            </button>
          )}

          {canAccess("categories") && (
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium flex items-center gap-1.5 ${
                activeTab === "categories"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Categories ({categoriesList.length})</span>
            </button>
          )}

          {canAccess("header") && (
            <button
              onClick={() => setActiveTab("header")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium flex items-center gap-1.5 ${
                activeTab === "header"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Header &amp; Nav ({navLinksList.length})</span>
            </button>
          )}

          {canAccess("about") && (
            <button
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium flex items-center gap-1.5 ${
                activeTab === "about"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>About Media ({aboutContent.galleryImages?.length || 0})</span>
            </button>
          )}

          {canAccess("enquiries") && (
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition flex items-center gap-1.5 font-medium ${
                activeTab === "enquiries"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>Enquiries</span>
              <span className="w-2 h-2 rounded-full bg-[#FBC90B]" />
            </button>
          )}

          {canAccess("cms") && (
            <button
              onClick={() => setActiveTab("cms")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium ${
                activeTab === "cms"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              CMS &amp; Homepage
            </button>
          )}

          {canAccess("seo") && (
            <button
              onClick={() => setActiveTab("seo")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium ${
                activeTab === "seo"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              SEO &amp; Analytics
            </button>
          )}

          {canAccess("users") && (
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition font-medium flex items-center gap-1.5 ${
                activeTab === "users"
                  ? "bg-[#FBC90B] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Team &amp; Access ({adminUsersList.length})</span>
            </button>
          )}
        </div>

        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="p-6 bg-[#141414] border border-neutral-800 space-y-2 shadow-xl">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                  Active Diamond Vault
                </span>
                <span className="font-serif text-3xl text-white font-light block">
                  {diamondsList.filter((d) => d.inStock).length} Stones
                </span>
                <p className="text-xs text-neutral-500">GIA &amp; IGI Certified</p>
              </div>

              <div className="p-6 bg-[#141414] border border-neutral-800 space-y-2 shadow-xl">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                  Fine Jewelry Catalog
                </span>
                <span className="font-serif text-3xl text-white font-light block">
                  {jewelryList.filter((j) => j.inStock).length} Creations
                </span>
                <p className="text-xs text-neutral-500">Platinum &amp; 18k Gold</p>
              </div>

              <div
                onClick={() => setActiveTab("categories")}
                className="p-6 bg-[#141414] border border-neutral-800 hover:border-amber-500/50 cursor-pointer transition space-y-2 shadow-xl group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium group-hover:text-amber-400 transition">
                    Categories
                  </span>
                  <span className="text-[10px] text-amber-400 opacity-0 group-hover:opacity-100 transition">Manage &rarr;</span>
                </div>
                <span className="font-serif text-3xl text-white group-hover:text-amber-300 font-light block transition">
                  {categoriesList.length} Categories
                </span>
                <p className="text-xs text-neutral-500">{categoriesList.filter(c => c.status === "Active").length} Active Storefront</p>
              </div>

              <div className="p-6 bg-[#141414] border border-neutral-800 space-y-2 shadow-xl">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                  Open Client Enquiries
                </span>
                <span className="font-serif text-3xl text-[#FBC90B] font-light block">
                  {enquiries.filter((e) => e.status !== "Completed").length} Active
                </span>
                <p className="text-xs text-neutral-500">Pending Quotations</p>
              </div>

              <div className="p-6 bg-[#141414] border border-neutral-800 space-y-2 shadow-xl">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                  Primary Hub
                </span>
                <span className="font-serif text-3xl text-white font-light block">Surat, India</span>
                <p className="text-xs text-neutral-500">Manufacturing HQ</p>
              </div>
            </div>

            {/* Recent Enquiries Preview */}
            <div className="bg-[#141414] border border-neutral-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="font-serif text-xl text-white font-light">Recent Client Inquiries</h3>
                <button
                  onClick={() => setActiveTab("enquiries")}
                  className="text-xs uppercase tracking-widest text-[#FBC90B] hover:text-white font-medium"
                >
                  View All &rarr;
                </button>
              </div>
              <div className="divide-y divide-neutral-800 text-xs">
                {enquiries.slice(0, 3).map((enq) => (
                  <div key={enq.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-medium text-white block text-sm">{enq.clientName}</span>
                      <span className="text-xs text-neutral-400">
                        {enq.clientCountry} &bull; {enq.requirementType}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium ${
                        enq.status === "New"
                          ? "bg-amber-950/60 text-amber-300 border border-amber-500/40"
                          : enq.status === "In Consultation"
                          ? "bg-blue-950/60 text-blue-300 border border-blue-500/40"
                          : "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIAMONDS INVENTORY MANAGEMENT */}
        {activeTab === "diamonds" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by SKU, shape, or certificate #..."
                  value={diamondSearch}
                  onChange={(e) => setDiamondSearch(e.target.value)}
                  className="w-full bg-[#181818] border border-neutral-800 pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                />
              </div>
              <span className="text-xs text-neutral-400">
                Showing {filteredAdminDiamonds.length} of {diamondsList.length} diamonds
              </span>
            </div>

            <div className="bg-[#141414] border border-neutral-800 overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] border-b border-neutral-800 text-neutral-300 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">SKU / Stone</th>
                    <th className="p-4">Origin</th>
                    <th className="p-4">Shape</th>
                    <th className="p-4">Carat</th>
                    <th className="p-4">Color / Clarity</th>
                    <th className="p-4">Certificate</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {filteredAdminDiamonds.map((d) => (
                    <tr key={d.id} className="hover:bg-[#1A1A1A]">
                      <td className="p-4 font-medium text-white">{d.name}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-medium ${
                            d.type === "Natural"
                              ? "bg-amber-950/60 text-amber-300 border border-amber-500/40"
                              : "bg-blue-950/60 text-blue-300 border border-blue-500/40"
                          }`}
                        >
                          {d.type}
                        </span>
                      </td>
                      <td className="p-4 text-neutral-300">{d.shape}</td>
                      <td className="p-4 text-[#FBC90B] font-semibold">{d.carat}ct</td>
                      <td className="p-4 text-neutral-300">
                        {d.color} / {d.clarity}
                      </td>
                      <td className="p-4 text-neutral-400">
                        {d.certificateLab} #{d.certificateNumber}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleDiamondStock(d.id)}
                          className={`px-2.5 py-0.5 text-[10px] uppercase font-medium transition ${
                            d.inStock
                              ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                              : "bg-red-950/60 text-red-300 border border-red-500/40"
                          }`}
                        >
                          {d.inStock ? "In Vault" : "Committed"}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/diamonds/${d.id}`}
                          target="_blank"
                          className="text-[#FBC90B] hover:text-white hover:underline text-[11px] font-medium"
                        >
                          View Live
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: FINE JEWELRY MANAGEMENT */}
        {activeTab === "jewelry" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#141414] border border-neutral-800 overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] border-b border-neutral-800 text-neutral-300 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">SKU / Piece</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Metal</th>
                    <th className="p-4">Diamond Weight</th>
                    <th className="p-4">Visibility</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {jewelryList.map((item) => (
                    <tr key={item.id} className="hover:bg-[#1A1A1A]">
                      <td className="p-4 font-medium text-white">{item.name}</td>
                      <td className="p-4 text-neutral-300">{item.category}</td>
                      <td className="p-4 text-neutral-300">{item.metal}</td>
                      <td className="p-4 text-[#FBC90B] font-semibold">{item.totalDiamondWeight}</td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleJewelryStock(item.id)}
                          className={`px-2.5 py-0.5 text-[10px] uppercase font-medium transition ${
                            item.inStock
                              ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                              : "bg-red-950/60 text-red-300 border border-red-500/40"
                          }`}
                        >
                          {item.inStock ? "Active" : "Archived"}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/jewelry/${item.id}`}
                          target="_blank"
                          className="text-[#111111] hover:underline text-[11px] font-medium"
                        >
                          View Live
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CATEGORIES CRUD MANAGEMENT */}
        {activeTab === "categories" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header with Search and Create Action */}
            <div className="bg-[#141414] border border-neutral-800 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#FBC90B]" />
                  <h3 className="font-serif text-2xl text-white font-light">Jewelry &amp; Creation Categories</h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Manage product categories, storefront filter pills, and collection taxonomy across Dhanlaxmi Diamond.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="w-full bg-[#181818] border border-neutral-800 pl-8 pr-4 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                  />
                  {categorySearch && (
                    <button
                      onClick={() => setCategorySearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
                    >
                      &times;
                    </button>
                  )}
                </div>

                <button
                  onClick={handleOpenAddCategory}
                  className="px-4 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shrink-0 shadow-lg hover:shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>
            </div>

            {/* Categories Data Table */}
            <div className="bg-[#141414] border border-neutral-800 overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] border-b border-neutral-800 text-neutral-300 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Category &amp; Image</th>
                    <th className="p-4">Slug / Route</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Linked Creations</th>
                    <th className="p-4">Order</th>
                    <th className="p-4">Visibility</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {categoriesList
                    .filter(
                      (c) =>
                        c.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
                        c.slug.toLowerCase().includes(categorySearch.toLowerCase()) ||
                        c.description.toLowerCase().includes(categorySearch.toLowerCase())
                    )
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((cat) => {
                      const linkedCount = jewelryList.filter(
                        (j) => j.category.toLowerCase() === cat.name.toLowerCase()
                      ).length;

                      return (
                        <tr key={cat.id} className="hover:bg-[#1A1A1A] transition">
                          {/* Name & Cover Image */}
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 bg-black border border-neutral-800 overflow-hidden shrink-0">
                                <Image
                                  src={cat.image || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop"}
                                  alt={cat.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className="font-serif text-base text-white block font-medium">
                                  {cat.name}
                                </span>
                                {cat.featured && (
                                  <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-amber-400" /> Featured on Homepage
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Slug */}
                          <td className="p-4">
                            <span className="font-mono text-neutral-400 text-[11px] bg-neutral-900 border border-neutral-800 px-2 py-0.5">
                              /{cat.slug}
                            </span>
                          </td>

                          {/* Description */}
                          <td className="p-4 max-w-xs text-neutral-400 text-xs truncate" title={cat.description}>
                            {cat.description || "—"}
                          </td>

                          {/* Linked Creations */}
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[#FBC90B] font-semibold text-[11px]">
                              {linkedCount} Pieces
                            </span>
                          </td>

                          {/* Display Order */}
                          <td className="p-4 text-neutral-400 font-mono text-xs">
                            #{cat.displayOrder}
                          </td>

                          {/* Visibility Toggle */}
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleCategoryStatus(cat.id)}
                              className={`px-2.5 py-0.5 text-[10px] uppercase font-medium transition ${
                                cat.status === "Active"
                                  ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60"
                                  : cat.status === "Draft"
                                  ? "bg-amber-950/60 text-amber-300 border border-amber-500/40 hover:bg-amber-900/60"
                                  : "bg-neutral-900 text-neutral-400 border border-neutral-700 hover:text-white"
                              }`}
                              title="Click to toggle status"
                            >
                              {cat.status}
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/jewelry?category=${encodeURIComponent(cat.name)}`}
                                target="_blank"
                                className="p-1.5 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition"
                                title="View live category on store"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>

                              <button
                                onClick={() => handleOpenEditCategory(cat)}
                                className="px-2.5 py-1 border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-[#FBC90B] transition flex items-center gap-1 font-medium text-[11px]"
                                title="Edit category"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => setDeleteConfirmId(cat.id)}
                                className="p-1.5 border border-neutral-800 hover:border-red-500 text-neutral-400 hover:text-red-400 transition"
                                title="Delete category"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              {categoriesList.filter((c) =>
                c.name.toLowerCase().includes(categorySearch.toLowerCase())
              ).length === 0 && (
                <div className="p-12 text-center text-neutral-500 text-xs space-y-3">
                  <p>No categories match your search query &ldquo;{categorySearch}&rdquo;.</p>
                  <button
                    onClick={() => setCategorySearch("")}
                    className="text-[#FBC90B] underline font-medium"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            {/* ADD / EDIT CATEGORY MODAL */}
            {isCategoryModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141414] border border-neutral-700 w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <div>
                      <span className="text-[10px] uppercase text-[#FBC90B] tracking-wider font-mono block">
                        Category Dossier
                      </span>
                      <h4 className="font-serif text-2xl text-white font-light">
                        {editingCategory ? `Edit Category: ${editingCategory.name}` : "Create New Category"}
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsCategoryModalOpen(false)}
                      className="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCategorySubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Category Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pendants, Eternity Bands"
                          value={categoryFormData.name}
                          onChange={(e) => {
                            const name = e.target.value;
                            setCategoryFormData((prev) => ({
                              ...prev,
                              name,
                              slug: editingCategory ? prev.slug : name.toLowerCase().replace(/\s+/g, "-"),
                            }));
                          }}
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                        />
                      </div>

                      {/* Slug */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          URL Slug *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. pendants"
                          value={categoryFormData.slug}
                          onChange={(e) => setCategoryFormData({ ...categoryFormData, slug: e.target.value })}
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Status */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Visibility Status
                        </label>
                        <select
                          value={categoryFormData.status}
                          onChange={(e) =>
                            setCategoryFormData({
                              ...categoryFormData,
                              status: e.target.value as "Active" | "Draft" | "Archived",
                            })
                          }
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:border-[#FBC90B] focus:outline-none"
                        >
                          <option value="Active">Active (Visible in Store)</option>
                          <option value="Draft">Draft (Internal Only)</option>
                          <option value="Archived">Archived (Hidden)</option>
                        </select>
                      </div>

                      {/* Display Order */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Display Order
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={categoryFormData.displayOrder}
                          onChange={(e) =>
                            setCategoryFormData({ ...categoryFormData, displayOrder: parseInt(e.target.value) || 1 })
                          }
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="categoryFeatured"
                        checked={categoryFormData.featured}
                        onChange={(e) => setCategoryFormData({ ...categoryFormData, featured: e.target.checked })}
                        className="accent-[#FBC90B] w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="categoryFeatured" className="text-neutral-300 cursor-pointer select-none font-medium">
                        Highlight on Storefront &amp; Featured Navigation
                      </label>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Editorial Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Short summary displayed on category headers and catalog filters..."
                        value={categoryFormData.description}
                        onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                      />
                    </div>

                    {/* Image URL with Preset Pickers */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={categoryFormData.image}
                        onChange={(e) => setCategoryFormData({ ...categoryFormData, image: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none text-[11px]"
                      />

                      {/* Quick Presets */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] text-neutral-500 block">Or select a curated luxury preset:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            {
                              label: "Rings",
                              url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
                            },
                            {
                              label: "Earrings",
                              url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
                            },
                            {
                              label: "Necklaces",
                              url: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
                            },
                            {
                              label: "Bracelets",
                              url: "https://images.unsplash.com/photo-1611591475819-79b8b730ab61?q=80&w=800&auto=format&fit=crop",
                            },
                            {
                              label: "Bridal",
                              url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
                            },
                            {
                              label: "Pendants",
                              url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop",
                            },
                          ].map((preset) => (
                            <button
                              type="button"
                              key={preset.label}
                              onClick={() => setCategoryFormData({ ...categoryFormData, image: preset.url })}
                              className="px-2 py-1 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-[10px] text-neutral-300 hover:text-white transition"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Image Preview Box */}
                    {categoryFormData.image && (
                      <div className="relative w-full h-32 bg-black border border-neutral-800 overflow-hidden">
                        <Image
                          src={categoryFormData.image}
                          alt="Category Preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                          <span className="text-white font-serif text-sm font-medium">
                            {categoryFormData.name || "Preview Title"}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setIsCategoryModalOpen(false)}
                        className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-lg hover:shadow-amber-500/20"
                      >
                        <Check className="w-4 h-4" />
                        <span>{editingCategory ? "Update Category" : "Create Category"}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deleteConfirmId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141414] border border-red-500/40 w-full max-w-md p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center gap-3 text-red-400">
                    <Trash2 className="w-5 h-5 shrink-0" />
                    <h4 className="font-serif text-xl text-white font-light">Delete Category</h4>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Are you sure you want to permanently delete category &ldquo;
                    <strong className="text-white">
                      {categoriesList.find((c) => c.id === deleteConfirmId)?.name}
                    </strong>
                    &rdquo;?
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    This removes the category filter pill from the live website. Inventory pieces linked to this category will remain safe.
                  </p>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(deleteConfirmId)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Confirm Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: HEADER & NAVIGATION MANAGEMENT */}
        {activeTab === "header" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Banner */}
            <div className="bg-[#141414] border border-neutral-800 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#FBC90B]" />
                  <h3 className="font-serif text-2xl text-white font-light">Header, Navigation Tabs &amp; Ribbon</h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Control all top-level header tabs, the announcement ribbon, and the primary header call-to-action button.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenAddNav}
                  className="px-4 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-lg hover:shadow-amber-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Navigation Tab</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Header Preview */}
            <div className="bg-[#141414] border border-neutral-800 p-6 space-y-3 shadow-xl">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                Live Storefront Header Preview
              </span>
              <div className="border border-amber-500/30 overflow-hidden bg-[#08090B]">
                {/* Announcement Bar Preview */}
                {cmsSettings.showAnnouncement !== false && (
                  <div className="bg-[#050608] border-b border-amber-500/20 py-2 px-4 text-center text-[10px] tracking-[0.2em] uppercase font-sans text-amber-200/90 font-light truncate">
                    {cmsSettings.announcementText ||
                      "FREE INSURED WORLDWIDE ARMORED DELIVERY • DIRECT SURAT CUTTER BENCH PRICING • GIA & IGI CERTIFIED • 30-DAY RETURNS"}
                  </div>
                )}

                {/* Main Nav Bar Preview */}
                <div className="p-4 px-6 flex items-center justify-between gap-4 border-b border-amber-500/15">
                  <div className="relative h-7 w-32 shrink-0">
                    <Image
                      src="/logo-dark-bg.png"
                      alt="Dhanlaxmi Diamond"
                      fill
                      className="object-contain object-left"
                    />
                  </div>

                  <div className="hidden lg:flex items-center space-x-5 text-[11px] tracking-[0.18em] uppercase font-light text-neutral-300">
                    {navLinksList
                      .filter((l) => l.visible !== false)
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((link) => (
                        <span
                          key={link.id}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 ${
                            link.isHighlighted
                              ? "border border-amber-400 bg-amber-500/15 text-amber-200 font-medium"
                              : "text-neutral-300"
                          }`}
                        >
                          {link.isHighlighted && <Sparkles className="w-3 h-3 text-[#F59E0B]" />}
                          {link.name}
                          {link.hasDropdown && <span className="text-[9px] text-amber-400">&darr;</span>}
                        </span>
                      ))}
                  </div>

                  <div className="shrink-0">
                    <span className="inline-block py-2 px-4 gold-btn text-[10px] tracking-widest font-semibold">
                      {cmsSettings.headerCtaText || "Request Quote"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcement Ribbon & CTA Button Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Top Announcement Ribbon Card */}
              <div className="lg:col-span-7 bg-[#141414] border border-neutral-800 p-6 space-y-4 shadow-xl">
                <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
                  <h4 className="font-serif text-lg text-white font-light">Top Announcement Ribbon</h4>
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={cmsSettings.showAnnouncement !== false}
                      onChange={(e) => {
                        const updated = { ...cmsSettings, showAnnouncement: e.target.checked };
                        setCmsSettings(updated);
                        if (typeof window !== "undefined") {
                          localStorage.setItem("dhanlaxmi_site_settings", JSON.stringify(updated));
                          window.dispatchEvent(new Event("dhanlaxmi_site_settings_updated"));
                        }
                      }}
                      className="accent-[#FBC90B] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-neutral-300 font-medium">Show on Storefront</span>
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                    Ribbon Message Text
                  </label>
                  <textarea
                    rows={2}
                    value={
                      cmsSettings.announcementText ??
                      "FREE INSURED WORLDWIDE ARMORED DELIVERY • DIRECT SURAT CUTTER BENCH PRICING • GIA & IGI CERTIFIED • 30-DAY RETURNS"
                    }
                    onChange={(e) => {
                      const updated = { ...cmsSettings, announcementText: e.target.value };
                      setCmsSettings(updated);
                    }}
                    className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                    placeholder="Enter announcement banner message..."
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={(e) => handleSaveCMS(e)}
                    className="px-4 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Ribbon Text</span>
                  </button>
                </div>
              </div>

              {/* Primary Call-to-Action (CTA) Button Card */}
              <div className="lg:col-span-5 bg-[#141414] border border-neutral-800 p-6 space-y-4 shadow-xl">
                <div className="border-b border-neutral-800 pb-3">
                  <h4 className="font-serif text-lg text-white font-light">Header CTA Button</h4>
                  <p className="text-[11px] text-neutral-400">Controls the gold action button at the top right of the navbar.</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={cmsSettings.headerCtaText ?? "Request Quote"}
                      onChange={(e) => setCmsSettings({ ...cmsSettings, headerCtaText: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                      placeholder="e.g. Request Quote, Private Consultation"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                      Destination Link
                    </label>
                    <input
                      type="text"
                      value={cmsSettings.headerCtaHref ?? "/request-quote"}
                      onChange={(e) => setCmsSettings({ ...cmsSettings, headerCtaHref: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none font-mono"
                      placeholder="e.g. /request-quote or /contact"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={(e) => handleSaveCMS(e)}
                      className="px-4 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Button</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs List Table */}
            <div className="bg-[#141414] border border-neutral-800 overflow-x-auto shadow-xl">
              <div className="p-4 px-6 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg text-white font-light">Navigation Tabs ({navLinksList.length})</h4>
                  <p className="text-[11px] text-neutral-400">Reorder, edit, hide, or add tabs to the main navigation menu.</p>
                </div>
                <button
                  onClick={handleOpenAddNav}
                  className="px-3 py-1.5 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Tab</span>
                </button>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] border-b border-neutral-800 text-neutral-300 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4 w-28">Order</th>
                    <th className="p-4">Tab Title &amp; Style</th>
                    <th className="p-4">Destination Link</th>
                    <th className="p-4">Features</th>
                    <th className="p-4">Visibility</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {[...navLinksList]
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((item, idx, arr) => (
                      <tr key={item.id} className="hover:bg-[#1A1A1A] transition">
                        {/* Order & Reordering Controls */}
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-neutral-400 text-xs w-6">#{item.displayOrder}</span>
                            <div className="flex flex-col gap-0.5">
                              <button
                                disabled={idx === 0}
                                onClick={() => handleMoveNav(item.id, "up")}
                                className="p-1 text-neutral-500 hover:text-white disabled:opacity-20 transition"
                                title="Move Tab Up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                disabled={idx === arr.length - 1}
                                onClick={() => handleMoveNav(item.id, "down")}
                                className="p-1 text-neutral-500 hover:text-white disabled:opacity-20 transition"
                                title="Move Tab Down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Tab Title & Badge */}
                        <td className="p-4 font-medium text-white">
                          <div className="flex items-center gap-2">
                            <span>{item.name}</span>
                            {item.isHighlighted && (
                              <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Gold Highlight
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Destination Link */}
                        <td className="p-4">
                          <span className="font-mono text-neutral-300 text-xs bg-neutral-900 border border-neutral-800 px-2 py-0.5">
                            {item.href}
                          </span>
                        </td>

                        {/* Features */}
                        <td className="p-4 text-neutral-400 text-xs">
                          {item.hasDropdown ? (
                            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px]">
                              Dropdown Submenu
                            </span>
                          ) : (
                            <span className="text-neutral-500 text-[11px]">Direct Link</span>
                          )}
                        </td>

                        {/* Visibility */}
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleNavVisibility(item.id)}
                            className={`px-2.5 py-0.5 text-[10px] uppercase font-medium transition ${
                              item.visible !== false
                                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60"
                                : "bg-neutral-900 text-neutral-500 border border-neutral-800 hover:text-neutral-300"
                            }`}
                          >
                            {item.visible !== false ? "Active" : "Hidden"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditNav(item)}
                              className="px-2.5 py-1 border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-[#FBC90B] transition flex items-center gap-1 font-medium text-[11px]"
                              title="Edit Tab"
                            >
                              <Pencil className="w-3 h-3" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => setDeleteNavConfirmId(item.id)}
                              className="p-1.5 border border-neutral-800 hover:border-red-500 text-neutral-400 hover:text-red-400 transition"
                              title="Delete Tab"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* ADD / EDIT NAV TAB MODAL */}
            {isNavModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141414] border border-neutral-700 w-full max-w-lg p-6 md:p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <div>
                      <span className="text-[10px] uppercase text-[#FBC90B] tracking-wider font-mono block">
                        Navigation Taxonomy
                      </span>
                      <h4 className="font-serif text-2xl text-white font-light">
                        {editingNav ? `Edit Tab: ${editingNav.name}` : "Create Navigation Tab"}
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsNavModalOpen(false)}
                      className="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveNavSubmit} className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Tab Label / Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ring Builder, Education, Diamonds"
                        value={navFormData.name}
                        onChange={(e) => setNavFormData({ ...navFormData, name: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Destination Link (Route or URL) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. /ring-builder or /diamonds"
                        value={navFormData.href}
                        onChange={(e) => setNavFormData({ ...navFormData, href: e.target.value })}
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Display Order
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={navFormData.displayOrder}
                          onChange={(e) =>
                            setNavFormData({ ...navFormData, displayOrder: parseInt(e.target.value) || 1 })
                          }
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Visibility
                        </label>
                        <select
                          value={navFormData.visible ? "true" : "false"}
                          onChange={(e) =>
                            setNavFormData({ ...navFormData, visible: e.target.value === "true" })
                          }
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-white focus:border-[#FBC90B] focus:outline-none"
                        >
                          <option value="true">Active (Show in Header)</option>
                          <option value="false">Hidden (Draft)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-neutral-800">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={navFormData.isHighlighted}
                          onChange={(e) =>
                            setNavFormData({ ...navFormData, isHighlighted: e.target.checked })
                          }
                          className="accent-[#FBC90B] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-white font-medium">
                          Highlight with Imperial Gold Badge (Like Ring Builder)
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={navFormData.hasDropdown}
                          onChange={(e) =>
                            setNavFormData({ ...navFormData, hasDropdown: e.target.checked })
                          }
                          className="accent-[#FBC90B] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-neutral-300">
                          Show Dropdown Arrow &amp; Submenu
                        </span>
                      </label>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setIsNavModalOpen(false)}
                        className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-lg hover:shadow-amber-500/20"
                      >
                        <Check className="w-4 h-4" />
                        <span>{editingNav ? "Update Tab" : "Create Tab"}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* DELETE NAV CONFIRMATION MODAL */}
            {deleteNavConfirmId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141414] border border-red-500/40 w-full max-w-md p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center gap-3 text-red-400">
                    <Trash2 className="w-5 h-5 shrink-0" />
                    <h4 className="font-serif text-xl text-white font-light">Delete Navigation Tab</h4>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Are you sure you want to remove the &ldquo;
                    <strong className="text-white">
                      {navLinksList.find((l) => l.id === deleteNavConfirmId)?.name}
                    </strong>
                    &rdquo; tab from the website header?
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    The underlying page will still exist, but this link will no longer appear in the top navigation bar.
                  </p>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      onClick={() => setDeleteNavConfirmId(null)}
                      className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteNav(deleteNavConfirmId)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Confirm Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: ABOUT THE HOUSE MEDIA (VIDEO & IMAGES) */}
        {activeTab === "about" && (
          <div className="space-y-10 animate-fadeIn">
            {/* Top Bar with Feedback & Live Link */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141414] border border-neutral-800 p-6 shadow-xl">
              <div>
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#FBC90B]" />
                  <h3 className="font-serif text-2xl text-white font-light">
                    About the House — Media &amp; Atelier Gallery
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Manage the cinematic atelier video, Surat workbench visual, and photo gallery on the &ldquo;About Our Heritage&rdquo; page.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {aboutSaved && (
                  <span className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Media Synchronized!</span>
                  </span>
                )}
                <Link
                  href="/about"
                  target="_blank"
                  className="px-4 py-2 border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-[#FBC90B] text-xs uppercase tracking-wider font-medium transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview /about Page</span>
                </Link>
                <button
                  type="button"
                  onClick={(e) => handleSaveAboutMedia(e)}
                  className="px-4 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: CINEMATIC ATELIER VIDEO SHOWCASE */}
            <div className="bg-[#141414] border border-neutral-800 p-6 md:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-neutral-800 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#FBC90B]" />
                    <h4 className="font-serif text-xl text-white font-light">Cinematic Atelier Video Showcase</h4>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Feature a high-definition video of the diamond cutting process, workbench craft, or facility walkthrough.
                  </p>
                </div>

                <label className="flex items-center gap-2.5 px-3 py-2 bg-[#1C1C1C] border border-neutral-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={aboutContent.showVideo !== false}
                    onChange={(e) => {
                      const updated = { ...aboutContent, showVideo: e.target.checked };
                      saveAboutContentToStorage(updated);
                    }}
                    className="accent-[#FBC90B] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-medium text-white">
                    {aboutContent.showVideo !== false ? "Video Showcase Active" : "Video Showcase Hidden"}
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Controls */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Video Badge / Overline
                      </label>
                      <input
                        type="text"
                        value={aboutContent.videoBadge || ""}
                        onChange={(e) =>
                          setAboutContent({ ...aboutContent, videoBadge: e.target.value })
                        }
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                        placeholder="e.g., Surat Diamond Atelier • Master Workbench"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Video Title
                      </label>
                      <input
                        type="text"
                        value={aboutContent.videoTitle || ""}
                        onChange={(e) =>
                          setAboutContent({ ...aboutContent, videoTitle: e.target.value })
                        }
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                        placeholder="e.g., The Generational Craft of Diamond Faceting"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                      Video Description
                    </label>
                    <textarea
                      rows={3}
                      value={aboutContent.videoDescription || ""}
                      onChange={(e) =>
                        setAboutContent({ ...aboutContent, videoDescription: e.target.value })
                      }
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                      placeholder="Explain what the viewer will experience in this video..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                      Video Stream URL (YouTube, Vimeo, or .MP4)
                    </label>
                    <input
                      type="text"
                      value={aboutContent.videoUrl || ""}
                      onChange={(e) =>
                        setAboutContent({ ...aboutContent, videoUrl: e.target.value })
                      }
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                      placeholder="https://www.youtube.com/watch?v=... or https://.../video.mp4"
                    />
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-neutral-500">Quick Presets:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAboutContent({
                            ...aboutContent,
                            videoUrl: "https://www.youtube.com/embed/g-NfL3qV7zM",
                          })
                        }
                        className="text-[10px] px-2 py-0.5 bg-[#202020] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white transition"
                      >
                        YouTube Faceting
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAboutContent({
                            ...aboutContent,
                            videoUrl:
                              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                          })
                        }
                        className="text-[10px] px-2 py-0.5 bg-[#202020] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white transition"
                      >
                        Direct MP4 Video
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                      Video Poster / Preview Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={aboutContent.videoPoster || ""}
                      onChange={(e) =>
                        setAboutContent({ ...aboutContent, videoPoster: e.target.value })
                      }
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => handleSaveAboutMedia(e)}
                      className="px-4 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Update Video Settings</span>
                    </button>
                  </div>
                </div>

                {/* Live Video Player Preview */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-1">
                    <span className="uppercase tracking-wider font-medium">Live Video Preview</span>
                    <span className="font-mono text-[#FBC90B]">16:9 Aspect Ratio</span>
                  </div>

                  <div className="relative aspect-video bg-black border border-neutral-700 overflow-hidden shadow-2xl flex items-center justify-center">
                    {aboutContent.videoUrl ? (
                      aboutContent.videoUrl.includes("youtube.com") ||
                      aboutContent.videoUrl.includes("youtu.be") ||
                      aboutContent.videoUrl.includes("vimeo.com") ? (
                        <iframe
                          src={getEmbedUrl(aboutContent.videoUrl)}
                          title="Video Preview"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={aboutContent.videoUrl}
                          poster={aboutContent.videoPoster}
                          controls
                          className="w-full h-full object-cover"
                        >
                          Your browser does not support HTML5 video.
                        </video>
                      )
                    ) : (
                      <div className="text-center p-6 space-y-2 text-neutral-500">
                        <Video className="w-8 h-8 mx-auto stroke-1" />
                        <p className="text-xs">No video URL entered yet</p>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-500 text-center">
                    This player displays exactly as visitors will experience it on the public /about page.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 2: WORKBENCH HERO VISUAL */}
            <div className="bg-[#141414] border border-neutral-800 p-6 md:p-8 space-y-6 shadow-xl">
              <div className="pb-4 border-b border-neutral-800 space-y-1">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#FBC90B]" />
                  <h4 className="font-serif text-xl text-white font-light">Main Workbench Hero Visual</h4>
                </div>
                <p className="text-xs text-neutral-400">
                  The widescreen flagship hero banner positioned directly underneath the main story headline.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                      Hero Banner Image URL
                    </label>
                    <input
                      type="text"
                      value={aboutContent.heroImage || ""}
                      onChange={(e) =>
                        setAboutContent({ ...aboutContent, heroImage: e.target.value })
                      }
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-neutral-500">Presets:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAboutContent({
                            ...aboutContent,
                            heroImage:
                              "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop",
                          })
                        }
                        className="text-[10px] px-2 py-0.5 bg-[#202020] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white transition"
                      >
                        Surat Bench
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAboutContent({
                            ...aboutContent,
                            heroImage:
                              "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1600&auto=format&fit=crop",
                          })
                        }
                        className="text-[10px] px-2 py-0.5 bg-[#202020] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white transition"
                      >
                        Gemologist Inspection
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAboutContent({
                            ...aboutContent,
                            heroImage:
                              "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1600&auto=format&fit=crop",
                          })
                        }
                        className="text-[10px] px-2 py-0.5 bg-[#202020] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white transition"
                      >
                        Platinum Setting
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                      Hero Badge Overlay Text
                    </label>
                    <input
                      type="text"
                      value={aboutContent.heroBadge || ""}
                      onChange={(e) =>
                        setAboutContent({ ...aboutContent, heroBadge: e.target.value })
                      }
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                      placeholder="e.g., Surat Diamond Cutting Hub • Established 2004"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => handleSaveAboutMedia(e)}
                      className="px-4 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Update Hero Banner</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-medium">
                    Hero Preview (21:9 Cinema Ratio)
                  </span>
                  <div className="relative aspect-[21/9] bg-[#1a1a1a] border border-neutral-700 overflow-hidden shadow-2xl">
                    {aboutContent.heroImage && (
                      <Image
                        src={aboutContent.heroImage}
                        alt="Hero Visual Preview"
                        fill
                        className="object-cover"
                      />
                    )}
                    {aboutContent.heroBadge && (
                      <div className="absolute bottom-3 left-3 text-[9px] uppercase tracking-wider font-medium px-2.5 py-1 bg-black/85 text-white border border-neutral-700">
                        {aboutContent.heroBadge}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: ARTISANAL PHOTOGRAPHY GALLERY (CRUD) */}
            <div className="bg-[#141414] border border-neutral-800 overflow-x-auto shadow-xl">
              <div className="p-6 border-b border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FBC90B]" />
                    <h4 className="font-serif text-xl text-white font-light">
                      Surat Atelier in Pictures — Photo Gallery ({aboutContent.galleryImages?.length || 0})
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Add, edit, reorder, or delete high-resolution photos showcasing the 6-step diamond crafting journey.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddGallery}
                  className="px-4 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shrink-0 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Image to Gallery</span>
                </button>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] border-b border-neutral-800 text-neutral-300 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4 w-28">Order</th>
                    <th className="p-4 w-24">Preview</th>
                    <th className="p-4">Title &amp; Story</th>
                    <th className="p-4">Image Source</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {aboutContent.galleryImages && aboutContent.galleryImages.length > 0 ? (
                    [...aboutContent.galleryImages]
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((item, idx, arr) => (
                        <tr key={item.id} className="hover:bg-[#1A1A1A] transition">
                          {/* Order & Reordering */}
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-neutral-400 text-xs w-6">
                                #{item.displayOrder}
                              </span>
                              <div className="flex flex-col gap-0.5">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveGallery(item.id, "up")}
                                  className="p-1 text-neutral-500 hover:text-white disabled:opacity-20 transition"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === arr.length - 1}
                                  onClick={() => handleMoveGallery(item.id, "down")}
                                  className="p-1 text-neutral-500 hover:text-white disabled:opacity-20 transition"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Thumbnail */}
                          <td className="p-4">
                            <div className="relative w-14 h-14 bg-black border border-neutral-700 overflow-hidden shrink-0">
                              <Image
                                src={item.url}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </td>

                          {/* Title & Caption */}
                          <td className="p-4">
                            <div className="space-y-1">
                              <span className="font-medium text-white block text-sm">
                                {item.title}
                              </span>
                              <p className="text-neutral-400 text-xs line-clamp-2 max-w-xl font-light">
                                {item.caption}
                              </p>
                            </div>
                          </td>

                          {/* URL */}
                          <td className="p-4 font-mono text-[11px] text-neutral-400 max-w-[200px] truncate">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-[#FBC90B] transition flex items-center gap-1 underline"
                            >
                              <span className="truncate">{item.url}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEditGallery(item)}
                                className="px-3 py-1.5 border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-[#FBC90B] transition flex items-center gap-1 font-medium text-[11px]"
                                title="Edit Photo"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteGalleryConfirmId(item.id)}
                                className="p-1.5 border border-neutral-800 hover:border-red-500 text-neutral-400 hover:text-red-400 transition"
                                title="Delete Photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-neutral-500 text-xs">
                        No photos in the atelier gallery. Click &ldquo;Add Image to Gallery&rdquo; above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ADD / EDIT GALLERY PHOTO MODAL */}
            {isGalleryModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141414] border border-neutral-700 w-full max-w-2xl p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <div>
                      <span className="text-[10px] uppercase text-[#FBC90B] tracking-wider font-mono block">
                        Atelier Visual Archive
                      </span>
                      <h4 className="font-serif text-2xl text-white font-light">
                        {editingGalleryImage ? `Edit Photo: ${editingGalleryImage.title}` : "Add Image to Gallery"}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsGalleryModalOpen(false)}
                      className="p-1.5 text-neutral-400 hover:text-white transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveGallerySubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Image Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={galleryFormData.title}
                        onChange={(e) =>
                          setGalleryFormData({ ...galleryFormData, title: e.target.value })
                        }
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                        placeholder="e.g., Surat Laser Cleaving & Planning"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Craft Caption / Description *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={galleryFormData.caption}
                        onChange={(e) =>
                          setGalleryFormData({ ...galleryFormData, caption: e.target.value })
                        }
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-light"
                        placeholder="Describe the craft step, precision tooling, or artisanal benchmark..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Image URL (Unsplash or CDN) *
                      </label>
                      <input
                        type="url"
                        required
                        value={galleryFormData.url}
                        onChange={(e) =>
                          setGalleryFormData({ ...galleryFormData, url: e.target.value })
                        }
                        className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    {/* Curated Presets Bar */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                        Or Pick Curated Atelier Preset:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryFormData({
                              title: "Rough Diamond Vetting & Planning",
                              caption: "Using Sarine laser tomography to map internal inclusions and optimal facet angles.",
                              url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
                              displayOrder: galleryFormData.displayOrder,
                            })
                          }
                          className="text-[10px] p-2 bg-[#1A1A1A] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white text-left transition"
                        >
                          1. 3D Rough Planning
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryFormData({
                              title: "Generational Surat Polishing Workbench",
                              caption: "Seasoned master cutters with decades of generational craft shape each facet by hand.",
                              url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
                              displayOrder: galleryFormData.displayOrder,
                            })
                          }
                          className="text-[10px] p-2 bg-[#1A1A1A] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white text-left transition"
                        >
                          2. Polishing Scaife
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryFormData({
                              title: "Micro-Pavé Setting in 950 Platinum",
                              caption: "Securing delicate brilliant-cut diamonds under high-magnification stereomicroscopes.",
                              url: "https://images.unsplash.com/photo-1611591475819-79b8b730ab61?q=80&w=800&auto=format&fit=crop",
                              displayOrder: galleryFormData.displayOrder,
                            })
                          }
                          className="text-[10px] p-2 bg-[#1A1A1A] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white text-left transition"
                        >
                          3. Micro-Pavé Setting
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryFormData({
                              title: "GIA Laboratory Benchmark Scrutiny",
                              caption: "Audited for Polish, Symmetry, and Triple-Excellent light return before client delivery.",
                              url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
                              displayOrder: galleryFormData.displayOrder,
                            })
                          }
                          className="text-[10px] p-2 bg-[#1A1A1A] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white text-left transition"
                        >
                          4. GIA Quality Audit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryFormData({
                              title: "Haute Joaillerie Mountings",
                              caption: "Cast in solid 18k gold and high-density platinum for heirloom endurance.",
                              url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
                              displayOrder: galleryFormData.displayOrder,
                            })
                          }
                          className="text-[10px] p-2 bg-[#1A1A1A] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white text-left transition"
                        >
                          5. Haute Mountings
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryFormData({
                              title: "Final 40x Darkfield Inspection",
                              caption: "Every creation inspected under 40x darkfield illumination for unyielding optical perfection.",
                              url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop",
                              displayOrder: galleryFormData.displayOrder,
                            })
                          }
                          className="text-[10px] p-2 bg-[#1A1A1A] border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-white text-left transition"
                        >
                          6. 40x Darkfield QC
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Display Position Order
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={50}
                          value={galleryFormData.displayOrder}
                          onChange={(e) =>
                            setGalleryFormData({
                              ...galleryFormData,
                              displayOrder: parseInt(e.target.value) || 1,
                            })
                          }
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Live Thumbnail Preview
                        </label>
                        <div className="relative aspect-video w-full bg-black border border-neutral-700 overflow-hidden">
                          {galleryFormData.url ? (
                            <Image
                              src={galleryFormData.url}
                              alt="Thumbnail Preview"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-[10px] text-neutral-500">
                              No image URL
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setIsGalleryModalOpen(false)}
                        className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-md"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{editingGalleryImage ? "Save Photo Changes" : "Add Image to Gallery"}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* DELETE GALLERY PHOTO CONFIRMATION MODAL */}
            {deleteGalleryConfirmId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141414] border border-red-500/40 w-full max-w-md p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center gap-3 text-red-400">
                    <Trash2 className="w-5 h-5 shrink-0" />
                    <h4 className="font-serif text-xl text-white font-light">Delete Gallery Photo</h4>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Are you sure you want to remove &ldquo;
                    <strong className="text-white">
                      {aboutContent.galleryImages?.find((img) => img.id === deleteGalleryConfirmId)?.title}
                    </strong>
                    &rdquo; from the About the House gallery?
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    This photo will immediately be removed from the public website gallery.
                  </p>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setDeleteGalleryConfirmId(null)}
                      className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteGallery(deleteGalleryConfirmId)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Confirm Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                Incoming Consultation Dossiers ({enquiries.length})
              </span>
              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className={`p-4 border transition cursor-pointer ${
                      selectedEnquiry?.id === enq.id
                        ? "border-[#FBC90B] bg-[#1C1C1C] shadow-lg"
                        : "border-neutral-800 bg-[#141414] hover:border-neutral-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base text-white">{enq.clientName}</span>
                      <span
                        className={`px-2 py-0.5 text-[10px] uppercase font-medium ${
                          enq.status === "New"
                            ? "bg-amber-950/60 text-amber-300 border border-amber-500/40"
                            : enq.status === "In Consultation"
                            ? "bg-blue-950/60 text-blue-300 border border-blue-500/40"
                            : "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      {enq.clientCountry} &bull; {enq.budgetRange}
                    </div>
                    <div className="text-xs text-neutral-300 mt-2 truncate">
                      {enq.items.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Enquiry Details Pane */}
            <div className="lg:col-span-7">
              {selectedEnquiry ? (
                <div className="bg-[#141414] border border-neutral-800 p-8 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-500 block font-medium">
                        Dossier Reference: {selectedEnquiry.id}
                      </span>
                      <h3 className="font-serif text-2xl text-white font-light">{selectedEnquiry.clientName}</h3>
                    </div>
                    <div className="flex gap-2">
                      {(["New", "In Consultation", "Quoted", "Completed"] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => updateEnquiryStatus(selectedEnquiry.id, st)}
                          className={`px-2.5 py-1 text-[10px] uppercase border transition font-medium ${
                            selectedEnquiry.status === st
                              ? "border-[#FBC90B] bg-[#FBC90B] text-black font-semibold"
                              : "border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-[#181818] border border-neutral-800 space-y-1">
                      <span className="text-neutral-500 text-[10px] block uppercase font-medium">Official Email</span>
                      <a
                        href={`mailto:${selectedEnquiry.clientEmail}`}
                        className="text-[#FBC90B] hover:underline font-medium truncate block"
                      >
                        {selectedEnquiry.clientEmail}
                      </a>
                    </div>
                    <div className="p-3 bg-[#181818] border border-neutral-800 space-y-1">
                      <span className="text-neutral-500 text-[10px] block uppercase font-medium">Direct Phone</span>
                      <a
                        href={`tel:${selectedEnquiry.clientPhone}`}
                        className="text-[#FBC90B] hover:underline font-medium block"
                      >
                        {selectedEnquiry.clientPhone}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                      Stones &amp; Creations Attached:
                    </span>
                    <ul className="list-disc pl-5 text-xs text-neutral-300 space-y-1">
                      {selectedEnquiry.items.map((it, idx) => (
                        <li key={idx}>{it}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-neutral-800">
                    <span className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                      Internal Specialist Notes:
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed p-3 bg-[#181818] border border-neutral-800">
                      {selectedEnquiry.notes}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-12 border border-dashed border-neutral-800 text-center text-xs text-neutral-500">
                  Select a consultation dossier on the left to inspect client parameters and update quotation pipeline.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: CMS & CONTENT */}
        {activeTab === "cms" && (
          <form onSubmit={handleSaveCMS} className="max-w-4xl space-y-8 animate-fadeIn">
            {/* Panel 1: Hero Section ("Create Your Dream Ring") */}
            <div className="bg-[#141414] border border-neutral-800 p-8 space-y-6 shadow-xl">
              <div className="border-b border-neutral-800 pb-4 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FBC90B]" />
                    <h3 className="font-serif text-2xl text-white font-light">Homepage Hero Banner &amp; Tagline</h3>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Control the primary headline, italicized gold accent text, and descriptive subtitle shown above the ring builder.
                  </p>
                </div>
                {cmsSaved && (
                  <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium animate-pulse">
                    Changes Saved &check;
                  </span>
                )}
              </div>

              {/* Live Preview of Hero Banner */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                  Live Typography Preview
                </span>
                <div className="p-6 bg-gradient-to-b from-[#111216] to-[#0A0A0A] border border-amber-500/30 text-center rounded-none space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#F59E0B] font-mono block">
                    {cmsSettings.heroBadge || "Surat Diamond House • Handcrafted Custom Fine Jewelry"}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
                    {(cmsSettings.heroTitleMain ?? "Create Your")}{" "}
                    <span className="gold-gradient-text italic font-normal">
                      {(cmsSettings.heroTitleHighlight ?? "Dream Ring")}
                    </span>
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
                    {cmsSettings.heroSubtitle || "Design a one-of-a-kind engagement ring directly from master cutters in Surat. Choose your diamond or setting to begin."}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                    Top Badge / Tagline
                  </label>
                  <input
                    type="text"
                    value={cmsSettings.heroBadge ?? "Surat Diamond House • Handcrafted Custom Fine Jewelry"}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, heroBadge: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                    placeholder="e.g. Surat Diamond House • Handcrafted Custom Fine Jewelry"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                      Headline Prefix
                    </label>
                    <input
                      type="text"
                      value={cmsSettings.heroTitleMain ?? "Create Your"}
                      onChange={(e) => setCmsSettings({ ...cmsSettings, heroTitleMain: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-800 px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                      placeholder="e.g. Create Your"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-amber-400 block font-medium">
                      Headline Accent (Gold / Italic)
                    </label>
                    <input
                      type="text"
                      value={cmsSettings.heroTitleHighlight ?? "Dream Ring"}
                      onChange={(e) => setCmsSettings({ ...cmsSettings, heroTitleHighlight: e.target.value })}
                      className="w-full bg-[#181818] border border-amber-500/40 px-4 py-2.5 text-xs text-amber-300 placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                      placeholder="e.g. Dream Ring"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                    Hero Subtitle &amp; Description
                  </label>
                  <textarea
                    rows={3}
                    value={cmsSettings.heroSubtitle ?? "Design a one-of-a-kind engagement ring directly from master cutters in Surat. Choose your diamond or setting to begin."}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, heroSubtitle: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                    placeholder="Descriptive sentence shown below the title"
                  />
                </div>
              </div>
            </div>

            {/* Panel 2: Official Contact & Headquarters Info */}
            <div className="bg-[#141414] border border-neutral-800 p-8 space-y-6 shadow-xl">
              <div className="border-b border-neutral-800 pb-4">
                <h3 className="font-serif text-2xl text-white font-light">Global Brand &amp; Atelier Contacts</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Verified business contacts displayed in the footer, inquiry forms, and customer concierge.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                      Official Contact Email
                    </label>
                    <input
                      type="text"
                      value={cmsSettings.contactEmail}
                      onChange={(e) => setCmsSettings({ ...cmsSettings, contactEmail: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-800 px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                      WhatsApp Concierge Number
                    </label>
                    <input
                      type="text"
                      value={cmsSettings.whatsappNumber}
                      onChange={(e) => setCmsSettings({ ...cmsSettings, whatsappNumber: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-800 px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                    Surat Headquarters Address
                  </label>
                  <textarea
                    rows={2}
                    value={cmsSettings.headOfficeAddress}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, headOfficeAddress: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-800 px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#FBC90B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-widest font-semibold transition flex items-center gap-2 shadow-lg hover:shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save CMS Settings</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 6: SEO */}
        {activeTab === "seo" && (
          <div className="max-w-4xl bg-[#141414] border border-neutral-800 p-8 space-y-6 animate-fadeIn shadow-xl">
            <div className="border-b border-neutral-800 pb-4">
              <h3 className="font-serif text-2xl text-white font-light">Search Engine Optimization Metadata</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Configure global OpenGraph, JSON-LD Schema, and meta titles for search crawlers.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#181818] border border-neutral-800 space-y-1">
                <span className="text-neutral-500 text-[10px] block uppercase font-medium">Default Title Tag</span>
                <p className="text-white font-medium">Dhanlaxmi Diamond | High-Quality Natural Diamonds &amp; Fine Jewelry House</p>
              </div>
              <div className="p-4 bg-[#181818] border border-neutral-800 space-y-1">
                <span className="text-neutral-500 text-[10px] block uppercase font-medium">Meta Description</span>
                <p className="text-neutral-300">
                  Founded in 2004, Dhanlaxmi Diamond specializes in superlative natural diamonds, rare colored gems, and bespoke fine jewelry. Serving international jewelers worldwide.
                </p>
              </div>
              <div className="p-4 bg-[#181818] border border-neutral-800 space-y-1">
                <span className="text-neutral-500 text-[10px] block uppercase font-medium">Canonical Domain</span>
                <p className="text-emerald-400 font-medium">https://dhanlaxmidiamond.com</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: TEAM & ACCESS CONTROL (PASSWORD & USERS) */}
        {activeTab === "users" && (
          <div className="space-y-10 animate-fadeIn">
            {/* Top Bar Header */}
            <div className="bg-[#141414] border border-neutral-800 p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <Key className="w-5 h-5 text-[#FBC90B]" />
                  <h3 className="font-serif text-2xl text-white font-light">
                    Team Management &amp; Role-Based Access Control
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Update your master administrator password, add staff members, and assign custom department rights.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddUser}
                className="px-4 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            </div>

            {/* CARD 1: UPDATE ADMIN PASSWORD */}
            <div className="bg-[#141414] border border-neutral-800 p-6 md:p-8 space-y-6 shadow-xl">
              <div className="border-b border-neutral-800 pb-4 space-y-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#FBC90B]" />
                  <h4 className="font-serif text-xl text-white font-light">
                    Update Account Password
                  </h4>
                </div>
                <p className="text-xs text-neutral-400">
                  Update the password for{" "}
                  <strong className="text-white font-mono">
                    {currentUser?.name} (@{currentUser?.username})
                  </strong>
                  . Changes take effect immediately.
                </p>
              </div>

              {passwordUpdateSuccess && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Password updated successfully! Your new credentials are now active.</span>
                </div>
              )}

              {passwordUpdateError && (
                <div className="p-4 bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{passwordUpdateError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateMasterPassword} className="max-w-xl space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter existing password"
                    value={currentPasswordInput}
                    onChange={(e) => {
                      setCurrentPasswordInput(e.target.value);
                      setPasswordUpdateError(null);
                    }}
                    className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Minimum 4 characters"
                      value={newPasswordInput}
                      onChange={(e) => {
                        setNewPasswordInput(e.target.value);
                        setPasswordUpdateError(null);
                      }}
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter new password"
                      value={confirmPasswordInput}
                      onChange={(e) => {
                        setConfirmPasswordInput(e.target.value);
                        setPasswordUpdateError(null);
                      }}
                      className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-2 shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>

            {/* CARD 2: TEAM MEMBERS & ACCESS ROSTER */}
            <div className="bg-[#141414] border border-neutral-800 overflow-x-auto shadow-xl">
              <div className="p-6 border-b border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-[#FBC90B]" />
                    <h4 className="font-serif text-xl text-white font-light">
                      Staff Accounts &amp; Department Permissions ({adminUsersList.length})
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage team member credentials and their authorized departments.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddUser}
                  className="px-3.5 py-1.5 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] border-b border-neutral-800 text-neutral-300 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">User &amp; Identity</th>
                    <th className="p-4">Role &amp; Status</th>
                    <th className="p-4">Authorized Departments</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {adminUsersList.map((user) => (
                    <tr key={user.id} className="hover:bg-[#1A1A1A] transition">
                      {/* Identity */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white font-semibold text-xs">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-white flex items-center gap-2">
                              <span>{user.name}</span>
                              {user.isPrimaryAdmin && (
                                <span className="px-1.5 py-0.5 bg-amber-500/20 text-[#FBC90B] text-[9px] font-mono border border-amber-500/30">
                                  Primary
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-neutral-400 font-mono">
                              @{user.username}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role & Status */}
                      <td className="p-4">
                        <div className="space-y-1.5">
                          <span className="font-medium text-neutral-200 block text-xs">
                            {user.role}
                          </span>
                          <button
                            type="button"
                            disabled={user.isPrimaryAdmin}
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`px-2 py-0.5 text-[10px] font-mono border transition ${
                              user.status === "Active"
                                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60"
                                : "bg-neutral-800/80 border-neutral-700 text-neutral-400 hover:bg-neutral-700"
                            } ${user.isPrimaryAdmin ? "cursor-default opacity-80" : "cursor-pointer"}`}
                            title={user.isPrimaryAdmin ? "Primary admin must remain active" : "Toggle status"}
                          >
                            {user.status}
                          </button>
                        </div>
                      </td>

                      {/* Permissions Pills */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-md">
                          {user.role === "Super Admin" || user.isPrimaryAdmin ? (
                            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-[#FBC90B] text-[10px] font-mono">
                              Full Administrative Vault (All Rights)
                            </span>
                          ) : user.permissions && user.permissions.length > 0 ? (
                            user.permissions.map((p) => (
                              <span
                                key={p}
                                className="px-2 py-0.5 bg-[#202020] border border-neutral-700 text-neutral-300 text-[10px] uppercase font-mono"
                              >
                                {p}
                              </span>
                            ))
                          ) : (
                            <span className="text-[11px] text-neutral-500 italic">No departments assigned</span>
                          )}
                        </div>
                      </td>

                      {/* Last Activity */}
                      <td className="p-4 font-mono text-[11px] text-neutral-400">
                        {user.lastLogin || "Never"}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditUser(user)}
                            className="px-2.5 py-1 border border-neutral-700 hover:border-[#FBC90B] text-neutral-300 hover:text-[#FBC90B] transition flex items-center gap-1 font-medium text-[11px]"
                            title="Edit User & Permissions"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>Edit</span>
                          </button>

                          {!user.isPrimaryAdmin && (
                            <button
                              type="button"
                              onClick={() => setDeleteUserConfirmId(user.id)}
                              className="p-1.5 border border-neutral-800 hover:border-red-500 text-neutral-400 hover:text-red-400 transition"
                              title="Delete User"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ADD / EDIT USER MODAL */}
            {isUserModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141414] border border-neutral-700 w-full max-w-2xl p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <div>
                      <span className="text-[10px] uppercase text-[#FBC90B] tracking-wider font-mono block">
                        Staff Authorization
                      </span>
                      <h4 className="font-serif text-2xl text-white font-light">
                        {editingUser ? `Edit Staff Member: ${editingUser.name}` : "Create Team Member"}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsUserModalOpen(false)}
                      className="p-1.5 text-neutral-400 hover:text-white transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveUserSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={userFormData.name}
                          onChange={(e) =>
                            setUserFormData({ ...userFormData, name: e.target.value })
                          }
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                          placeholder="e.g., Rajesh Patel"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Username * (for login)
                        </label>
                        <input
                          type="text"
                          required
                          value={userFormData.username}
                          onChange={(e) =>
                            setUserFormData({ ...userFormData, username: e.target.value })
                          }
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                          placeholder="e.g., rajesh.patel"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Account Password *
                        </label>
                        <input
                          type="text"
                          required
                          value={userFormData.password}
                          onChange={(e) =>
                            setUserFormData({ ...userFormData, password: e.target.value })
                          }
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none font-mono"
                          placeholder="Enter password for user"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                          Role Preset
                        </label>
                        <select
                          value={userFormData.role}
                          onChange={(e) => handleRolePresetChange(e.target.value as AdminRole)}
                          className="w-full bg-[#181818] border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:border-[#FBC90B] focus:outline-none"
                        >
                          <option value="Super Admin">Super Admin (All Permissions)</option>
                          <option value="Store Manager">Store Manager (Catalog, CMS, Enquiries)</option>
                          <option value="Inventory Specialist">Inventory Specialist (Diamonds &amp; Jewelry)</option>
                          <option value="Sales Concierge">Sales Concierge (Enquiries Only)</option>
                          <option value="Custom">Custom (Manual selection below)</option>
                        </select>
                      </div>
                    </div>

                    {/* Department Permissions Checkbox Grid */}
                    <div className="space-y-2 pt-2 border-t border-neutral-800">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] uppercase tracking-wider text-[#FBC90B] font-mono block">
                          Department Access Rights (Check what user can view):
                        </label>
                        <span className="text-[10px] text-neutral-500">
                          {userFormData.permissions.length} departments granted
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {[
                          { key: "dashboard", label: "Executive Dashboard", desc: "View key store metrics & overview" },
                          { key: "diamonds", label: "Diamonds Vault", desc: "Manage diamond stones & stock status" },
                          { key: "jewelry", label: "Fine Jewelry Catalog", desc: "Manage jewelry pieces & pricing" },
                          { key: "categories", label: "Category Taxonomy", desc: "Manage jewelry categories & CRUD" },
                          { key: "header", label: "Header & Navigation", desc: "Edit navigation tabs & service ribbon" },
                          { key: "about", label: "About Media Showcase", desc: "Manage video player & workshop gallery" },
                          { key: "enquiries", label: "Customer Enquiries", desc: "View dossiers & update consultation states" },
                          { key: "cms", label: "CMS & Homepage", desc: "Edit homepage headline & contact info" },
                          { key: "seo", label: "SEO & Metadata", desc: "View OpenGraph & Schema configurations" },
                          { key: "users", label: "Team & Security Access", desc: "Manage user accounts & password updates" },
                        ].map((dept) => {
                          const isChecked = userFormData.permissions.includes(dept.key as AdminPermission);
                          return (
                            <label
                              key={dept.key}
                              className={`p-3 border flex items-start gap-3 cursor-pointer transition select-none ${
                                isChecked
                                  ? "bg-amber-950/20 border-amber-500/40 text-white"
                                  : "bg-[#181818] border-neutral-800 text-neutral-400 hover:border-neutral-700"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleTogglePermission(dept.key as AdminPermission)}
                                className="accent-[#FBC90B] w-4 h-4 mt-0.5 cursor-pointer"
                              />
                              <div className="space-y-0.5">
                                <span className="text-xs font-medium block text-white">
                                  {dept.label}
                                </span>
                                <span className="text-[10px] text-neutral-400 block leading-tight">
                                  {dept.desc}
                                </span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setIsUserModalOpen(false)}
                        className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#FBC90B] hover:bg-white text-black text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5 shadow-md"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{editingUser ? "Save User Changes" : "Create Account"}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* DELETE USER CONFIRMATION MODAL */}
            {deleteUserConfirmId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="bg-[#141414] border border-red-500/40 w-full max-w-md p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center gap-3 text-red-400">
                    <Trash2 className="w-5 h-5 shrink-0" />
                    <h4 className="font-serif text-xl text-white font-light">Delete Staff Member</h4>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Are you sure you want to remove{" "}
                    <strong className="text-white">
                      {adminUsersList.find((u) => u.id === deleteUserConfirmId)?.name} (@
                      {adminUsersList.find((u) => u.id === deleteUserConfirmId)?.username})
                    </strong>
                    ? This user will no longer be able to log into the Admin Vault.
                  </p>
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setDeleteUserConfirmId(null)}
                      className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteUser(deleteUserConfirmId)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Confirm Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
