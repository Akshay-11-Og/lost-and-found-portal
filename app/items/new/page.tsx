"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = [
  "Bag",
  "Bottle",
  "ID Card",
  "Electronics",
  "Documents",
  "Keys",
  "Clothing",
  "Other",
];

export default function ReportItemPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [locationLost, setLocationLost] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiError, setAiError] = useState("");

  async function handleSuggest() {
    setAiError("");

    if (!title && !description) {
      setAiError("Type a title or a few notes first, then try AI suggest.");
      return;
    }

    setAiLoading(true);

    try {
      const res = await fetch("/api/suggest-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("AI suggestion failed");

      const data = await res.json();
      setCategory(data.category);
      setDescription(data.description);
    } catch {
      setAiError("Couldn't generate a suggestion right now. Try again in a moment.");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!category) {
      setError("Please select a category");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to report an item");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("items").insert({
      title,
      description,
      category,
      location_lost: locationLost,
      date_lost: dateLost,
      reported_by_id: user.id,
      reported_by_name: user.user_metadata?.full_name ?? user.email,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 pt-8 sm:pt-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="space-y-1">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <CardTitle className="text-2xl font-bold">Report a lost item</CardTitle>
              <CardDescription>
                Give as much detail as you can — it helps others recognize it.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="title">Item title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Black backpack"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Description</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={aiLoading}
                    onClick={handleSuggest}
                    className="h-7 gap-1 text-xs"
                  >
                    {aiLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
                    )}
                    Suggest with AI
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="e.g. Left near the library entrance, has a laptop sleeve inside."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                />
                {aiError && <p className="text-xs text-red-600">{aiError}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24, duration: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="locationLost">Location</Label>
                <Input
                  id="locationLost"
                  placeholder="e.g. Main Library"
                  value={locationLost}
                  onChange={(e) => setLocationLost(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.36, duration: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="dateLost">Date lost</Label>
                <Input
                  id="dateLost"
                  type="date"
                  value={dateLost}
                  onChange={(e) => setDateLost(e.target.value)}
                  required
                />
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-sm text-red-600"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.4 }}
              >
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Report item"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}