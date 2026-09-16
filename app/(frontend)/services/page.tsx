"use client"

import Industries from "@/app/components/sections/common/Industries";
import SuccessStories from "@/app/components/sections/Services/SuccessStories";
import Hero from "@/app/components/sections/Services/Hero";
import HowWeWork from "@/app/components/sections/common/HowweWork";
import OurServices from "@/app/components/sections/Services/OurServices";
import MeetOurTeam from "@/app/components/sections/common/OurTeam";
import TrustedPartners from "@/app/components/sections/Services/Partners";
import CTABanner from "@/app/components/sections/common/CTAbanner";

export default function Services() {
    return (
        <>
            <Hero />
            <OurServices />
            <Industries />
            <HowWeWork />
            <SuccessStories />
            <MeetOurTeam />
            <TrustedPartners />
            <CTABanner
                heading={
                    <>
                        Your Next <span className="text-primary">Level</span> is One Click Away
                    </>
                }
                description="Tell us about your business and get a tailored growth strategy delivered straight to your inbox."
                buttonText="Book My Free Call"
                href="#"
            />
        </>
    );
}