"use client";

import { useState } from "react";

export default function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setEmail("");
  };

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-ink/10 p-8 lg:p-12">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 140% at 12% 0%, rgba(56,189,248,0.12) 0%, rgba(17,69,136,0.08) 45%, transparent 80%)",
        }}
      />

      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h3 className="text-[24px] font-bold text-ink lg:text-[28px]">
            One email a month. No noise.
          </h3>
          <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-ink/60">
            A short roundup of what we published, what we broke, and what we
            fixed. Unsubscribe whenever you like.
          </p>
        </div>

        <div className="w-full max-w-[420px]">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-full border border-ink/20 bg-ink/10 p-1.5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              className="h-11 flex-1 bg-transparent px-4 text-[14px] text-ink outline-none placeholder:text-ink/50"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-primary px-6 text-[14px] font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>

          {sent && (
            <p role="status" className="mt-3 text-[13px] text-ink/70">
              Thanks, you're on the list.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}