"use client";

import { motion } from "framer-motion";

export function MyItemsHero({
  total,
  open,
  pending,
  returned,
}: {
  total: number;
  open: number;
  pending: number;
  returned: number;
}) {
  const stats = [
    { label: "Total reported", value: total, bg: "bg-slate-900", text: "text-white" },
    { label: "Still open", value: open, bg: "bg-blue-100", text: "text-blue-700" },
    { label: "Claim pending", value: pending, bg: "bg-amber-100", text: "text-amber-700" },
    { label: "Returned", value: returned, bg: "bg-emerald-100", text: "text-emerald-700" },
  ];

  return (
    <div className="mb-8">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold tracking-tight"
      >
        Your{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
          reported items
        </span>
      </motion.h1>
      <p className="mt-1 text-muted-foreground">
        Track the status of everything you&apos;ve reported.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
            className={`rounded-xl p-4 ${s.bg}`}
          >
            <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
            <p className={`text-xs font-medium ${s.text} opacity-80`}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}