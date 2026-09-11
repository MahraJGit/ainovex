"use client";

import Button from "../../ui/Button";

export default function Hero() {
  return (
    <section
      id="careers-hero"
      className="relative min-h-[100dvh] overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/careers/career-hero-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Left-side gradient so text stays legible — fades to transparent on the right  bg-gradient-to-r from-black via-black/80 to-transparent*/}
        <div className="absolute inset-0 "
         style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0) 100%)",
          }}

          />
      </div>

      {/* Spacer to clear the fixed navbar (same as landing hero) */}
      <div className="lg:pt-8" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center py-16">
        <div className="max-w-3xl">
          <h1 className="text-left font-medium text-white">
            <span className="text-[#38BDF8] font-bold">Build</span> Your Future with
            <br />
            Ainovex Technologies
          </h1>

          <p className=" max-w-xl mt-6 text-base leading-relaxed text-white">
            At Ainovex Technologies, you&apos;re not just joining a company,
            you&apos;re becoming part of a team that transforms ideas into
            powerful digital experiences and meaningful results.
          </p>

          <div className="mt-8">
            <Button variant="solid">View Open Positions</Button>
          </div>
        </div>
      </div>
    </section>
  );
}