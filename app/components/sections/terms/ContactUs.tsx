import SectionGrid from "../../ui/SectionGrid";
import ContactCard from "../../ui/ContactCard";

const cards = [
  {
    icon: "/icons/contact/email.svg",
    title: "Email",
    description: "Send us your project details and requirements.",
    action: { label: "INFO@AINOVEX.COM", href: "mailto:info@ainovex.com" },
  },
  {
    icon: "/icons/contact/location.svg",
    title: "Location",
    address: "World Trade Center, Office Number 4087, Islamabad, Pakistan",
    action: { label: "GET DIRECTIONS", href: "https://maps.app.goo.gl/JpSJs6K2RxSjU5Jd8" },
  },
];

export default function PrivacyContact() {
  return (
    <section className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">

        <div className="flex flex-col items-center text-center">
          <h2 className="text-ink">
            <span className="text-primary">Contact</span> Us
          </h2>
          <p className="mt-4 max-w-md text-base font-medium leading-[160%] text-ink/60">
            If you have any questions about this Privacy Policy or your privacy rights,
            please contact us using the contact details below.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <ContactCard key={card.title} {...card} />
          ))}
        </div>

      </div>
    </section>
  );
}