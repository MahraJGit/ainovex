"use client";

import Button from "../../ui/Button";

export default function Hero() {
  return (
    <section id="careers-hero" className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/careers/career-hero-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      <div className="lg:pt-8" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-4 py-16 lg:px-8">
        <div className="max-w-3xl text-center lg:text-left">
          <h1 className="font-medium text-white">
            <span className="font-bold text-[#38BDF8]">Build</span> Your Future with{" "}
            <br className="hidden sm:block" />
            Ainovex Technologies
          </h1>

          <p className="mt-6 max-w-xl text-[14px] sm:text-base leading-relaxed text-white mx-auto lg:mx-0">
            At Ainovex Technologies, you&apos;re not just joining a company,
            you&apos;re becoming part of a team that transforms ideas into
            powerful digital experiences and meaningful results.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <Button href="#current-openings" variant="solid">View Open Positions</Button>
          </div>
        </div>
      </div>
    </section>
  );
}