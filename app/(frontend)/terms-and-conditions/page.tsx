import PageHero from "@/app/components/sections/common/PageHero";
import PolicyContent from "@/app/components/sections/common/PolicyContent";
import { termsIntro, termsSections } from "@/app/lib/termsContent";

export default function TermsConditions() {
    return (
        <>
            <PageHero
                heading={<><span className="text-primary">Terms </ span><span className="font-medium">& Conditions</span></>}
            />
            <PolicyContent intro={termsIntro} sections={termsSections} />
            
        </>
    );
}