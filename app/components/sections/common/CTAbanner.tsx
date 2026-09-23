import SectionGrid from "../../ui/SectionGrid";
import Button from "../../ui/Button";

type CTABannerProps = {
  heading: React.ReactNode;
  description: string;
  buttonText: string;
  href: string;
};

export default function CTABanner({
  heading,
  description,
  buttonText,
  href,
}: CTABannerProps) {
  return (
    <section id="cta-banner" className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-30">
      <SectionGrid placement="center" />
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8">
        <h2 className="text-black-v1/87 text-2xl md:text-3xl lg:text-4xl">{heading}</h2>
        <p className="mt-3 md:mt-4 text-sm md:text-base font-medium leading-relaxed text-text-black-v1/87 max-w-[90%] md:max-w-[600px] lg:max-w-[720px]">
          {description}
        </p>
        <div className="mt-8 md:mt-12 lg:mt-16">
          <Button variant="primary" href={href}>{buttonText}</Button>
        </div>
      </div>
    </section>
  );
}