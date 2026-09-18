import SectionGrid from "../../ui/SectionGrid";
import ContactCard from "../../ui/ContactCard";

const cards = [
  {
    icon: "/icons/contact/call.svg",
    title: "Call",
    description: "Speak to our team directly.",
    action: { label: "+971 52 785 1523", href: "tel:+971527851523" },
  },
  {
    icon: "/icons/contact/email.svg",
    title: "Email",
    description: "Send us your project details and requirements.",
    action: { label: "INFO@AINOVEX.COM", href: "mailto:info@ainovex.com" },
  },
  {
    icon: "/icons/contact/email.svg",
    title: "Business Hours",
    description: "We're online and ready to help during these hours.",
    hours: ["Monday to Friday: 9:00 AM – 6:00 PM", "Saturday: 9:00 AM – 4:00 PM"],
  },
  {
    icon: "/icons/contact/location.svg",
    title: "Location",
    address: "World Trade Center, Office Number 4087, Islamabad, Pakistan",
    action: { label: "GET DIRECTIONS", href: "https://maps.app.goo.gl/JpSJs6K2RxSjU5Jd8" },
  },
];

export default function ConnectWithUs() {
  return (
    <section className="relative overflow-hidden bg-white">
      <SectionGrid placement="center" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-ink">
            Connect With Our <span className="text-primary">Team</span>
          </h2>
          <p className="mt-4 max-w-[704px] text-lg font-medium leading-[160%] text-ink/60">
            Prefer to call, email, or drop by in person? Pick whatever works best
            for you, we're ready to help either way.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <ContactCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}