"use client";

import { useState } from "react";
import Image from "next/image";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (message.trim().length < 10) {
      setError("Please tell us a little more about your project.");
      setStatus("error");
      return;
    }

    // 2. Send
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) throw new Error("Request failed");

      // 3. Reset on success
      setStatus("sent");
      setEmail("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
      setStatus("error");
    }
  };

  return (
    <section className="relative min-h-[760px] overflow-hidden">

      <img src="/images/banner.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
      <div className="relative z-10 flex min-h-[760px] items-center justify-center px-4 py-20">
        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[872px] rounded-[19px] border border-white bg-white/10 p-[50px] backdrop-blur-[2px]"
        >
          <h2 className="text-[32px] font-bold leading-tight text-white">Send Us a Message</h2>
          <p className="mt-3 max-w-[790px] text-[16px] font-normal leading-[1.5] text-white">
            Have a question about our services or a project you'd like to discuss? Fill out the form
            below, and we'll get back to you shortly.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-[12px] font-semibold tracking-[0.06em] text-white">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[53px] w-full rounded-[12px] bg-[#242424]/20 px-5 text-[16px] text-white outline-none transition-colors duration-200 placeholder:text-white/60 placeholder:text-[16px] focus:border-white/50"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-[12px] font-semibold tracking-[0.06em] text-white">
                Your Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Tell us about your project, like what you need, your timeline, and any specific goals."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="max-h-[96px] w-full resize-none rounded-[12px] bg-[#242424]/20 px-5 py-4 text-[16px] text-white outline-none transition-colors duration-200 placeholder:text-white placeholder:text-[16px] placeholder:max-w-[589px] focus:border-white/50"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#072957] text-[15px] font-semibold text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-70"
            >
              {status === "sending" ? "Sending..." : "Submit Request"}
              {status !== "sending" && <span aria-hidden>&rarr;</span>}
            </button>

            {/* Feedback */}
            {status === "sent" && (
              <p role="status" className="text-[14px] text-white">
                Thanks, your message is on its way. We'll get back to you shortly.
              </p>
            )}
            {status === "error" && error && (
              <p role="alert" className="text-[14px] text-white">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}