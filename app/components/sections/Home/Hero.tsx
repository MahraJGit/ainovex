"use client";

import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import HeroCard from "../../ui/HeroCard";

const heroStats = [
  { icon: "/icons/hero/solutions.svg", metric: "30+", label: "Digital Solutions" },
  { icon: "/icons/hero/industries.svg", metric: "10+", label: "Industries Served" },
  { icon: "/icons/hero/offices.svg", metric: "03", label: "Global Offices" },
  { icon: "/icons/hero/countries.svg", metric: "15+", label: "Countries Reached" },
];

export default function Hero() {
  const text = "Smart Technology";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(typing);
    }, 120);
    return () => clearInterval(typing);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <video
          src="/hero.webm"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      <div className="header-padding" />

      <div className="relative z-10 mx-auto flex  max-w-7xl flex-col gap-8 md:justify-between px-4 py-10 lg:px-8 lg:py-16">

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center">
            <span>
              <span className="font-bold">Transforming</span> Ideas
            </span>
            <br />
            into Digital Success with
            <br />
            <span>
              {displayText}
              <span className="cursor">|</span>
            </span>
          </h1>

          <p className="hero-desc">
            At Ainovex Technologies, we help businesses innovate, grow, and
            succeed through modern digital solutions and transformative
            technology.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button variant="solid">Get Started</Button>
            <Button variant="outline">Explore Our Services</Button>
          </div>
        </div>

        {/* 2×2 on mobile+tablet, 4-in-a-row on lg+ */}
        <div className="grid grid-cols-2 gap-3 md:pt-10 lg:grid-cols-4 lg:gap-4 lg:pt-12">
          {heroStats.map((stat) => (
            <HeroCard
              key={stat.label}
              icon={stat.icon}
              metric={stat.metric}
              label={stat.label}
            />
          ))}
        </div>

      </div>
    </section>
  );
}