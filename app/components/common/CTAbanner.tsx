import SectionGrid from "../ui/SectionGrid";
import Button from "../ui/Button";

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
    <section id="cta-banner" className="relative overflow-hidden bg-white py-30">
      <SectionGrid placement="center" />
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h2 className="text-black-v1/87">{heading}</h2>
        <p className="mt-4 text-base font-medium leading-relaxed text-text-black-v1/87 max-w-[720px]">
          {description}
        </p>
        <div className="mt-16">
          <Button variant="primary" href={href}>{buttonText}</Button>
        </div>
      </div>
    </section>
  );
}