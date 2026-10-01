import type { Metadata } from "next";
import Link from "next/link";
import { FiLayers, FiPlus } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Admin Dashboard | Ainovex",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
          Dashboard
        </h1>
        <p className="mt-2 text-[15px] text-white/60">
          Welcome back. Manage your site content from here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/services"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <FiLayers size={22} />
          </div>
          <h2 className="text-[18px] font-semibold text-white">Services</h2>
          <p className="mt-1 text-[14px] text-white/55">
            Add, edit, or remove services shown on the website.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-primary opacity-0 transition group-hover:opacity-100">
            Open <FiPlus size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
}
