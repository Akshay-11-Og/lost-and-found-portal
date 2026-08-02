import {
  Backpack,
  GlassWater,
  IdCard,
  Cpu,
  FileText,
  Key,
  Shirt,
  Package,
  type LucideIcon,
} from "lucide-react";

type CategoryStyle = {
  icon: LucideIcon;
  bg: string;
  text: string;
};

export const categoryStyles: Record<string, CategoryStyle> = {
  Bag: { icon: Backpack, bg: "bg-amber-100", text: "text-amber-700" },
  Bottle: { icon: GlassWater, bg: "bg-sky-100", text: "text-sky-700" },
  "ID Card": { icon: IdCard, bg: "bg-violet-100", text: "text-violet-700" },
  Electronics: { icon: Cpu, bg: "bg-indigo-100", text: "text-indigo-700" },
  Documents: { icon: FileText, bg: "bg-slate-200", text: "text-slate-700" },
  Keys: { icon: Key, bg: "bg-orange-100", text: "text-orange-700" },
  Clothing: { icon: Shirt, bg: "bg-pink-100", text: "text-pink-700" },
  Other: { icon: Package, bg: "bg-gray-200", text: "text-gray-700" },
};

export function getCategoryStyle(category: string): CategoryStyle {
  return categoryStyles[category] ?? categoryStyles.Other;
}