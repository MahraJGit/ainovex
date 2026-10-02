"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAdminSession, signInAdmin } from "@/app/lib/adminAuth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    void (async () => {
      const session = await getAdminSession();
      if (session) {
        router.replace("/admin");
        return;
      }
      setChecking(false);
    })();
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await signInAdmin(email, password);
    if (signInError) {
      setError(signInError);
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black-v0 text-white">
        <p className="text-sm text-white/60">Loading…</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black-v0 px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56,189,248,0.35), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(7,41,87,0.5), transparent)",
        }}
      />

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="mb-6">
            <Image
              src="/logo.svg"
              alt="Ainovex"
              width={160}
              height={36}
              priority
              className="h-auto w-[140px]"
            />
          </Link>
          <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
            Admin Login
          </h1>
          <p className="mt-2 text-[15px] text-white/70">
            Sign in with your Ainovex admin account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-md"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-email"
                className="text-[12px] font-semibold tracking-[0.06em] text-white/90"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@ainovex.com"
                className="h-[48px] w-full rounded-xl border border-white/10 bg-black-v1/40 px-4 text-[15px] text-white outline-none transition placeholder:text-white/40 focus:border-primary/60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-password"
                className="text-[12px] font-semibold tracking-[0.06em] text-white/90"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-[48px] w-full rounded-xl border border-white/10 bg-black-v1/40 px-4 text-[15px] text-white outline-none transition placeholder:text-white/40 focus:border-primary/60"
              />
            </div>

            {error ? (
              <p role="alert" className="text-[13px] text-red-300">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex h-[48px] w-full items-center justify-center rounded-xl bg-primary text-[15px] font-semibold text-black-v0 transition hover:bg-primary/90 disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-[13px] text-white/50">
          <Link href="/" className="text-primary hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
