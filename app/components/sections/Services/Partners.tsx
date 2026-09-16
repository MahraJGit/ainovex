"use client";
import LogoRow from "../../ui/LogoRow";

export default function TrustedPartners() {
  return (
    <section id="trusted-partners" className="relative overflow-hidden bg-[#0A0F1C] py-30">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-white tracking-[-2.25px]">
          <span className="text-primary">Trusted</span> Partners
        </h2>
      </div>
      <LogoRow />
    </section>
  );
}