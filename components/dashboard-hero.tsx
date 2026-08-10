"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function DashboardHero({
  userName,
  total,
  open,
  pending,
  returned,
}: {
  userName: string;
  total: number;
  open: number;
  pending: number;
  returned: number;
}) {
  return (
    <div className="mb-10">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-1 flex items-center gap-2"
      >
        <h1 className="text-3xl font-medium tracking-tight text-white">
          hey {userName} <span className="inline-block">👋</span>
        </h1>
      </motion.div>
      <p className="mb-6 text-sm text-zinc-400">
        {total === 0
          ? "nothing reported yet — be the first."
          : `${total} thing${total === 1 ? "" : "s"} reported. here's the state of campus lost & found.`}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          whileHover={{ y: -3 }}
          className="col-span-2 row-span-2 flex flex-col justify-between rounded-2xl bg-[#1d9e75] p-5"
        >
          <span className="flex items-center gap-1 text-xs font-medium text-[#e1f5ee]">
            <Sparkles className="h-3.5 w-3.5" /> RETURNED
          </span>
          <span className="text-5xl font-medium text-white">{returned}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.13, duration: 0.35 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl bg-[#1a1a1d] p-4"
        >
          <p className="text-2xl font-medium text-white">{total}</p>
          <p className="mt-0.5 text-xs text-zinc-500">total</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.19, duration: 0.35 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl bg-[#1a1a1d] p-4"
        >
          <p className="text-2xl font-medium text-white">{open}</p>
          <p className="mt-0.5 text-xs text-zinc-500">still open</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          whileHover={{ y: -3 }}
          className="col-span-2 rounded-2xl bg-[#eab308]/90 p-4"
        >
          <p className="text-2xl font-medium text-[#241c00]">{pending}</p>
          <p className="mt-0.5 text-xs text-[#4a3b03]">claim pending</p>
        </motion.div>
      </div>
    </div>
  );
}