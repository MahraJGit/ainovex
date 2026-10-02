"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  getAdminSession,
  signOutAdmin,
  type AdminSession,
} from "@/app/lib/adminAuth";
import { cn } from "@/app/lib/utils";
import { FiEdit3, FiGrid, FiLayers, FiLogOut, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: FiGrid },
  { label: "Blogs", href: "/admin/blogs", icon: FiEdit3 },
  { label: "Services", href: "/admin/services", icon: FiLayers },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    void (async () => {
      const s = await getAdminSession();
      if (!s) {
        router.replace("/login");
        return;
      }
      setSession(s);
      setReady(true);
    })();
  }, [router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await signOutAdmin();
    router.push("/login");
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1220] text-white">
        <p className="text-sm text-white/60">Loading admin…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0B1220] text-white">
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/10 bg-[#0F172A] transition-transform duration-200 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Ainovex"
              width={120}
              height={28}
              className="h-auto w-[110px]"
            />
          </Link>
          <button
            type="button"
            className="cursor-pointer rounded-lg p-2 text-white/70 hover:bg-white/5 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="truncate text-[12px] text-white/45">
            {session?.profile.email}
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-white/30">
            {session?.profile.role}
          </p>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="mt-3 flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-[14px] font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <FiLogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0F172A]/80 px-4 backdrop-blur lg:px-8">
          <button
            type="button"
            className="cursor-pointer rounded-lg p-2 text-white/70 hover:bg-white/5 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FiMenu size={22} />
          </button>
          <p className="hidden text-[14px] text-white/60 lg:block">
            Admin Panel
          </p>
          <Link
            href="/"
            className="text-[13px] text-primary hover:underline"
            target="_blank"
          >
            View site ↗
          </Link>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
