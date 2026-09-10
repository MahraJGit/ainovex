"use client";
import Hero from "../components/sections/Home/Hero";
import Industries from "../components/sections/Home/Industries";
import Services from "../components/sections/Home/Services";
import SuccessStories from "../components/sections/Home/SuccessStories";
import Testimonials from "../components/sections/Home/Testimonials";
import WhyUs from "../components/sections/Home/WhyUs";
import WorkedWith from "../components/sections/Home/WorkedWith";
import Build from "../components/sections/Home/Build";
import LatestNews from "../components/sections/Home/LatestNews";
import Faq from "../components/sections/Home/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Services />
      <SuccessStories />
      <Industries />
      <Testimonials />
      <WorkedWith />
      <Build />
      <LatestNews />
      <Faq />
    </>
  );
}