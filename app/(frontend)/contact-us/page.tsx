import Faq from "@/app/components/sections/common/Faq";
import PageHero from "@/app/components/sections/common/PageHero";
import ConnectWithUs from "@/app/components/sections/Contact-Us/Connect";
import ContactForm from "@/app/components/sections/Contact-Us/ContactForm";
import ReadyToBuild from "@/app/components/sections/Contact-Us/ReadyTobuild";
import { contactfaqs } from "@/app/lib/contactFAQS";

export default function ContactUs() {
    return (
        <>
            <PageHero
                heading={<>Have a Project in Mind? <span className="text-primary">Let's Talk</ span></>}
                description="Whether it's a website that needs to convert, an app that needs to launch, or an AI solution that needs to be built, your next big move starts with a conversation. Tell us what you're working on, and let's figure out how to make it happen."
            />
            <ConnectWithUs />
            <ContactForm />
            <ReadyToBuild />
            <Faq faqs={contactfaqs} />
        </>
    );
}