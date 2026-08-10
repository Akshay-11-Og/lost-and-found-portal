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
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f10]/90 backdrop-blur-md">
      <div className="flex w-full flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/dashboard" className="text-lg font-medium text-white">
          Lost<span className="text-[#f0997b]">&amp;</span>Found
        </Link>
        <div className="flex flex-wrap items-center gap-1 text-sm">
          <Link href="/dashboard" className="rounded-full px-3 py-1.5 text-zinc-400 transition hover:bg-white/5 hover:text-white">
            Dashboard
          </Link>
          <Link href="/myitems" className="rounded-full px-3 py-1.5 text-zinc-400 transition hover:bg-white/5 hover:text-white">
            My Items
          </Link>
          {isAdmin && (
            <Link href="/myadmin" className="rounded-full px-3 py-1.5 text-zinc-400 transition hover:bg-white/5 hover:text-white">
              Admin
            </Link>
          )}
          <Link href="/items/new" className="ml-1 rounded-full bg-[#7f77dd] px-4 py-1.5 font-medium text-white transition hover:bg-[#8f87ea]">
            Report item
          </Link>
          <NavSignOutButton />
        </div>
      </div>
    </nav>
  );
}