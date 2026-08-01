

import {
  mockItems,
  mockItemClaims,
  mockPendingUsers,
} from "./mock-data";
import { createClient } from "@/lib/supabase/server";

function mapItemRow(row: any) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    locationLost: row.location_lost,
    dateLost: row.date_lost,
    status: row.status,
    reportedBy: { id: row.reported_by_id, name: row.reported_by_name },
    createdAt: row.created_at,
  };
}

export async function getItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch items:", error);
    return [];
  }

  return (data ?? []).map(mapItemRow);
}

export async function getItem(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  const { data: claims } = await supabase
    .from("item_claims")
    .select("*")
    .eq("item_id", id)
    .order("created_at", { ascending: false });

  return { ...mapItemRow(data), claims: claims ?? [] };
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    name: user.user_metadata?.full_name ?? user.email,
    email: user.email,
  };
}

export async function getPendingUsers() {
  return mockPendingUsers;
}

export async function createItem(data: unknown) {
  console.log("createItem (mock):", data);
  return { id: "new-item", ...(data as object) };
}

export async function createClaim(itemId: string, data: unknown) {
  console.log("createClaim (mock):", itemId, data);
  return { id: "new-claim", itemId, status: "PENDING", ...(data as object) };
}

export async function reviewClaim(claimId: string, action: "APPROVE" | "REJECT") {
  console.log("reviewClaim (mock):", claimId, action);
  return { id: claimId, status: action === "APPROVE" ? "APPROVED" : "REJECTED" };
}

export async function verifyUser(userId: string, action: "APPROVE" | "REJECT") {
  console.log("verifyUser (mock):", userId, action);
  return { id: userId, verification: action === "APPROVE" ? "APPROVED" : "REJECTED" };
}

export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}

export async function getMyItems() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("reported_by_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map(mapItemRow);
}

export async function getPendingProfiles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("verification_status", "PENDING")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}