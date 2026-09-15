"use client";

import CareerGrowth from "@/app/components/sections/Careers/CareerGrowth";
import Hero from "@/app/components/sections/Careers/Hero";
import HiringProcess from "@/app/components/sections/Careers/HiringProcess";
import WhatWeLookFor from "@/app/components/sections/Careers/WhatWeLook";
import WhyUs from "@/app/components/sections/Careers/WhyUs";
import TurnSkills from "@/app/components/sections/Careers/TurnSkills";
import CurrentOpenings from "@/app/components/sections/Careers/CurrentOpenings";
import LookingForMore from "@/app/components/sections/Careers/LookingForMore";

export default function Career() {
    return (
        <>
        <Hero />
        <WhyUs />
        <CareerGrowth />
        <HiringProcess />
        <WhatWeLookFor />
        <TurnSkills />
        <CurrentOpenings />
        <LookingForMore />
        </>
    );  
}