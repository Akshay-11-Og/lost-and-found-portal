"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function DeleteItemButton({ itemId }: { itemId: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this item permanently? This also deletes any claims on it. This can't be undone."
    );
    if (!confirmed) return;

    setLoading(true);

    await supabase.from("item_claims").delete().eq("item_id", itemId);
    const { error } = await supabase.from("items").delete().eq("id", itemId);

    setLoading(false);

    if (error) {
      alert("Failed to delete: " + error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={loading}
      onClick={handleDelete}
      className="gap-1"
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Trash2 className="h-3 w-3" />
      )}
      Delete item
    </Button>
  );
}