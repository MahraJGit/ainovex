"use client";
import Hero from "../components/sections/Home/Hero";
import Industries from "../components/sections/common/Industries";
import Services from "../components/sections/Home/Services";
import SuccessStories from "../components/sections/Home/SuccessStories";
import Testimonials from "../components/sections/Home/Testimonials";
import WhyUs from "../components/sections/Home/WhyUs";
import WorkedWith from "../components/sections/Home/WorkedWith";
import Build from "../components/sections/Home/Build";
import LatestNews from "../components/sections/Home/LatestNews";
import Faq from "../components/sections/common/Faq";
import { homefaqs } from "../lib/homeFAQS"

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
      <Faq faqs={homefaqs} />
    </>
  );
}