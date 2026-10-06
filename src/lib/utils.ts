import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function mapsUrl(name: string, address: string) {
  const query = encodeURIComponent(`${name}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function priceMarks(price: 1 | 2 | 3 | 4) {
  return "$".repeat(price);
}
