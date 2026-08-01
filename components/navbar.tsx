import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavSignOutButton } from "./nav-sign-out-button";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "ADMIN";

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/dashboard" className="font-bold">
          Lost &amp; Found
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/myitems" className="hover:underline">
            My Items
          </Link>
          <Link href="/items/new" className="hover:underline">
            Report Item
          </Link>
          {isAdmin && (
            <Link href="/myadmin" className="hover:underline">
              Admin
            </Link>
          )}
          <NavSignOutButton />
        </div>
      </div>
    </nav>
  );
}