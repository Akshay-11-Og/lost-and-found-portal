"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function ProfileActions({ profileId }: { profileId: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleDecision(approve: boolean) {
    setLoading(true);
    await supabase
      .from("profiles")
      .update({ verification_status: approve ? "APPROVED" : "REJECTED" })
      .eq("id", profileId);
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" disabled={loading} onClick={() => handleDecision(true)}>
        {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
        Approve
      </Button>
      <Button size="sm" variant="outline" disabled={loading} onClick={() => handleDecision(false)}>
        {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
        Reject
      </Button>
    </div>
  );
}