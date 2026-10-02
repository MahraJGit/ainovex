"use client";

import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/app/lib/supabase/client";

export type AdminProfile = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
};

export type AdminSession = {
  user: User;
  profile: AdminProfile;
};

export async function signInAdmin(email: string, password: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) {
    return { session: null as AdminSession | null, error: error.message };
  }

  if (!data.user) {
    return { session: null, error: "Unable to sign in." };
  }

  const profile = await fetchAdminProfile(data.user.id);
  if (!profile) {
    await supabase.auth.signOut();
    return {
      session: null,
      error: "No admin profile found for this account.",
    };
  }

  if (profile.role !== "admin" && profile.role !== "editor") {
    await supabase.auth.signOut();
    return { session: null, error: "You do not have admin access." };
  }

  return {
    session: { user: data.user, profile } satisfies AdminSession,
    error: null as string | null,
  };
}

export async function signOutAdmin() {
  const supabase = getSupabaseBrowserClient();
  await supabase.auth.signOut();
}

export async function fetchAdminProfile(
  userId: string
): Promise<AdminProfile | null> {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as AdminProfile;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = getSupabaseBrowserClient();
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;

  const profile = await fetchAdminProfile(user.id);
  if (!profile) return null;
  if (profile.role !== "admin" && profile.role !== "editor") return null;

  return { user, profile };
}
