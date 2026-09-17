"use client";

import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // handle form submission
  };

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4F6FD4] via-[#5B7FE8] to-[#7EC8E3]" />

      <div className="relative z-10 flex min-h-[600px] items-center justify-center px-4 py-20">
        {/* Card */}
        <div className="w-full max-w-[700px] rounded-2xl border border-white/20 bg-white/10 p-10 backdrop-blur-sm">
          
          <h2 className="text-3xl font-bold text-white">Send Us a Message</h2>
          <p className="mt-3 text-sm font-medium leading-[160%] text-white/80">
            Have a question about our services or a project you'd like to discuss? Fill out the form
            below, and we'll get back to you shortly.
          </p>

          <div className="mt-8 flex flex-col gap-6">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white/15 px-5 py-4 text-sm text-white placeholder:text-white/50 outline-none border border-transparent focus:border-white/40 transition-colors duration-200"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Your Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project, like what you need, your timeline, and any specific goals."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl bg-white/15 px-5 py-4 text-sm text-white placeholder:text-white/50 outline-none border border-transparent focus:border-white/40 transition-colors duration-200"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-[#002B59] px-6 py-4 text-base font-semibold text-white transition-opacity duration-200 hover:opacity-90"
            >
              Submit Request →
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}