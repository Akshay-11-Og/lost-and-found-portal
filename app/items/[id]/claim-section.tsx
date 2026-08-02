"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

type Claim = {
  id: string;
  claimant_id: string;
  claimant_name: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
};

export function ClaimSection({
  itemId,
  itemStatus,
  isOwner,
  currentUserId,
  claims,
}: {
  itemId: string;
  itemStatus: string;
  isOwner: boolean;
  currentUserId: string | null;
  claims: Claim[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const myClaim = claims.find((c) => c.claimant_id === currentUserId);

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to claim an item");
      setLoading(false);
      return;
    }

    const { error: claimError } = await supabase.from("item_claims").insert({
      item_id: itemId,
      claimant_id: user.id,
      claimant_name: user.user_metadata?.full_name ?? user.email,
      message,
    });

    if (claimError) {
      setError(claimError.message);
      setLoading(false);
      return;
    }

    await supabase.from("items").update({ status: "CLAIM_PENDING" }).eq("id", itemId);

    setLoading(false);
    router.refresh();
  }

  async function handleDecision(claimId: string, approve: boolean) {
    setLoading(true);

    await supabase
      .from("item_claims")
      .update({ status: approve ? "APPROVED" : "REJECTED" })
      .eq("id", claimId);

    await supabase
      .from("items")
      .update({ status: approve ? "RETURNED" : "OPEN" })
      .eq("id", itemId);

    setLoading(false);
    router.refresh();
  }

  if (isOwner) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Claims</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {claims.length === 0 && (
            <p className="text-sm text-muted-foreground">No claims yet.</p>
          )}
          {claims.map((claim) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-md border p-3 text-sm space-y-2"
            >
              <p className="font-medium">{claim.claimant_name}</p>
              <p className="text-muted-foreground">{claim.message}</p>
              {claim.status === "PENDING" ? (
                <div className="flex gap-2">
                  <Button size="sm" disabled={loading} onClick={() => handleDecision(claim.id, true)}>
                    {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={loading}
                    onClick={() => handleDecision(claim.id, false)}
                  >
                    {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                    Reject
                  </Button>
                </div>
              ) : (
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  {claim.status}
                </p>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (itemStatus === "RETURNED") {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground">
          This item has already been returned to its owner.
        </CardContent>
      </Card>
    );
  }

  if (myClaim) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm">
          You&apos;ve already submitted a claim for this item. Status:{" "}
          <span className="font-medium">{myClaim.status}</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Claim this item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleClaim} className="space-y-3">
          <Textarea
            placeholder="Describe why this item is yours (e.g. a unique detail only the owner would know)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Submitting..." : "Submit claim"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}