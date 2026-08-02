"use client";

import { Backpack, Key, GlassWater, IdCard, MapPin, Search, Sparkles, Compass } from "lucide-react";

type Sticker = {
  Icon: typeof Backpack;
  className: string;
  rotate: string;
  bg: string;
  text: string;
  hideOnMobile?: boolean;
};

const stickers: Sticker[] = [
  { Icon: Backpack, className: "top-24 left-6", rotate: "-rotate-12", bg: "bg-amber-200", text: "text-amber-800" },
  { Icon: Key, className: "top-40 right-10", rotate: "rotate-12", bg: "bg-orange-200", text: "text-orange-800", hideOnMobile: true },
  { Icon: GlassWater, className: "bottom-32 left-10", rotate: "rotate-6", bg: "bg-sky-200", text: "text-sky-800", hideOnMobile: true },
  { Icon: IdCard, className: "bottom-20 right-6", rotate: "-rotate-6", bg: "bg-violet-200", text: "text-violet-800" },
  { Icon: MapPin, className: "top-1/2 left-4", rotate: "rotate-3", bg: "bg-rose-200", text: "text-rose-800", hideOnMobile: true },
  { Icon: Compass, className: "top-16 right-1/3", rotate: "-rotate-3", bg: "bg-emerald-200", text: "text-emerald-800", hideOnMobile: true },
  { Icon: Search, className: "bottom-1/3 right-16", rotate: "rotate-12", bg: "bg-indigo-200", text: "text-indigo-800", hideOnMobile: true },
  { Icon: Sparkles, className: "bottom-10 left-1/3", rotate: "-rotate-12", bg: "bg-yellow-200", text: "text-yellow-800", hideOnMobile: true },
];

export function DecorativeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {stickers.map(({ Icon, className, rotate, bg, text, hideOnMobile }, i) => (
        <div
          key={i}
          className={`absolute ${className} ${rotate} ${bg} ${
            hideOnMobile ? "hidden sm:flex" : "flex"
          } h-14 w-14 items-center justify-center rounded-2xl shadow-sm opacity-70`}
        >
          <Icon className={`h-7 w-7 ${text}`} />
        </div>
      ))}
    </div>
  );
}