"use client"

import CoreServices from "@/app/components/sections/About-Us/CoreServices";
import DigitalGrowth from "@/app/components/sections/About-Us/DigitalGrowth";
import AboutHero from "@/app/components/sections/About-Us/Hero"
import MissionVision from "@/app/components/sections/About-Us/Mission";
import WhyAinovex from "@/app/components/sections/About-Us/Why";
import HowWeWork from "@/app/components/sections/common/HowweWork";
import MeetOurTeam from "@/app/components/sections/common/OurTeam";
import ReadyToBuild from "@/app/components/sections/About-Us/ReadyToBuild";
import WhyChooseUs from "@/app/components/sections/About-Us/WhyUs";
import ExpertServices from "@/app/components/sections/About-Us/ExpertServices";
import Locations from "@/app/components/sections/About-Us/Locations";

export default function AboutUs(){
    return(
        <>
        <AboutHero />
        <MissionVision />
        <WhyAinovex />
        <DigitalGrowth />
        <WhyChooseUs />
        <CoreServices />
        <ExpertServices />
        <HowWeWork />
        <MeetOurTeam />
        <ReadyToBuild />
        <Locations />
        </>
    );
}