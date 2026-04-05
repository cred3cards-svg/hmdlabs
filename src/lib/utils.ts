import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDatetime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateDiscountPct(mrp: number, discounted: number): number {
  return Math.round(((mrp - discounted) / mrp) * 100);
}

export function generateOrderNumber(): string {
  const prefix = "HMD";
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${ts}-${rand}`;
}

export function maskPhone(phone: string): string {
  return phone.replace(/(\d{2})\d{6}(\d{2})/, "$1XXXXXX$2");
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  const masked = user.substring(0, 2) + "***" + user.slice(-1);
  return `${masked}@${domain}`;
}

// Calculate franchise lead score (0–100)
export function calculateFranchiseLeadScore(data: {
  investmentCapacity?: number;
  existingSpace?: boolean;
  businessExperience?: number;
  franchiseType: string;
}): number {
  let score = 0;

  // Investment capacity (max 30 pts)
  if (data.investmentCapacity) {
    if (data.investmentCapacity >= 5000000) score += 30;
    else if (data.investmentCapacity >= 2000000) score += 20;
    else if (data.investmentCapacity >= 500000) score += 10;
  }

  // Existing space (20 pts)
  if (data.existingSpace) score += 20;

  // Business experience (max 25 pts)
  if (data.businessExperience) {
    if (data.businessExperience >= 10) score += 25;
    else if (data.businessExperience >= 5) score += 15;
    else if (data.businessExperience >= 2) score += 8;
  }

  // Franchise type (max 25 pts)
  const typeScores: Record<string, number> = {
    FULL_LAB: 25,
    MINI_LAB: 18,
    COLLECTION_CENTER: 12,
    MOBILE_UNIT: 10,
  };
  score += typeScores[data.franchiseType] || 0;

  return Math.min(100, score);
}

export function getLeadScoreLabel(score: number): "HOT" | "WARM" | "COLD" {
  if (score >= 65) return "HOT";
  if (score >= 35) return "WARM";
  return "COLD";
}

export const WB_DISTRICTS = [
  "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
  "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram",
  "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia",
  "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur",
  "Purba Bardhaman", "Purba Medinipur", "Purulia",
  "South 24 Parganas", "Uttar Dinajpur",
] as const;

export type WBDistrictName = (typeof WB_DISTRICTS)[number];
