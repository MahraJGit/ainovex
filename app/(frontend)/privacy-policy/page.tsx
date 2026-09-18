import PageHero from "@/app/components/sections/common/PageHero";
import PolicyContent from "@/app/components//sections/common/PolicyContent";
import { privacyIntro, privacySections } from "@/app/lib/privacyContent";
import PrivacyContact from "@/app/components/sections/terms/ContactUs";

export default function PrivacyPolicy() {
    return (
        <>
            <PageHero
                heading={<><span className="text-primary">Privacy </ span><span className="font-medium">Policy</span></>}
            />
            <PolicyContent intro={privacyIntro} sections={privacySections} />
            <PrivacyContact />
        </>
    );
}