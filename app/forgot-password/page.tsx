"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 pt-8 sm:pt-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
            <CardDescription>
              Enter your email and we&apos;ll send you a reset link.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {sent ? (
              <div className="text-center py-4 space-y-4">
                <p className="text-sm text-slate-700">
                  Check <span className="font-medium">{email}</span> for a
                  password reset link.
                </p>
                <Link
                  href="/login"
                  className="inline-block text-sm font-medium text-slate-900 hover:underline"
                >
                  Back to log in
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@indiraicem.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>

                <p className="text-center text-sm text-slate-500">
                  <Link href="/login" className="font-medium text-slate-900 hover:underline">
                    Back to log in
                  </Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
