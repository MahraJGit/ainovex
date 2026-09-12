"use client";

import CareerGrowth from "@/app/components/sections/Careers/CareerGrowth";
import Hero from "@/app/components/sections/Careers/Hero";
import HiringProcess from "@/app/components/sections/Careers/HiringProcess";
import WhyUs from "@/app/components/sections/Careers/WhyUs";

export default function Career() {
    return (
        <>
        <Hero />
        <WhyUs />
        <CareerGrowth />
        <HiringProcess />
        </>
    );  
}