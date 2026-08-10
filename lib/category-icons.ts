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
  Bag: { icon: Backpack, bg: "bg-[#eab308]/20", text: "text-[#eab308]" },
  Bottle: { icon: GlassWater, bg: "bg-[#38bdf8]/20", text: "text-[#38bdf8]" },
  "ID Card": { icon: IdCard, bg: "bg-[#7f77dd]/20", text: "text-[#a89ff0]" },
  Electronics: { icon: Cpu, bg: "bg-[#818cf8]/20", text: "text-[#a5b4fc]" },
  Documents: { icon: FileText, bg: "bg-zinc-500/20", text: "text-zinc-300" },
  Keys: { icon: Key, bg: "bg-[#f0997b]/20", text: "text-[#f0997b]" },
  Clothing: { icon: Shirt, bg: "bg-[#d4537e]/20", text: "text-[#e88bab]" },
  Other: { icon: Package, bg: "bg-zinc-500/20", text: "text-zinc-400" },
};

export function getCategoryStyle(category: string): CategoryStyle {
  return categoryStyles[category] ?? categoryStyles.Other;
}