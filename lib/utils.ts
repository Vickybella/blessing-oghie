import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappUrl(phone: string) {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}
