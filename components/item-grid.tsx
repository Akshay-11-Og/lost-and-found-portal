"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statusStyles, statusLabels } from "@/lib/status-styles";
import { getCategoryStyle } from "@/lib/category-icons";

type Item = {
  id: string;
  title: string;
  description: string;
  category: string;
  locationLost: string;
  status: "OPEN" | "CLAIM_PENDING" | "RETURNED";
  reportedBy: { id: string; name: string };
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export function ItemGrid({
  items,
  showReporter = true,
}: {
  items: Item[];
  showReporter?: boolean;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((it) => {
        const style = getCategoryStyle(it.category);
        const CategoryIcon = style.icon;
        return (
          <motion.div key={it.id} variants={item}>
            <Link href={`/items/${it.id}`}>
              <Card className="h-full transition hover:shadow-md hover:-translate-y-0.5">
                <CardHeader className="flex flex-row items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${style.bg}`}
                    >
                      <CategoryIcon className={`h-5 w-5 ${style.text}`} />
                    </div>
                    <CardTitle className="text-base leading-tight">
                      {it.title}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className={statusStyles[it.status]}>
                    {statusLabels[it.status]}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-1.5 text-sm text-muted-foreground">
                  <p className="line-clamp-2">{it.description}</p>
                  <p>📍 {it.locationLost}</p>
                  {showReporter && <p>👤 Reported by {it.reportedBy.name}</p>}
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}