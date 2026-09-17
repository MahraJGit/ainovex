import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";

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

interface CardProps {
  icon: string;
  title: string;
  description?: string;
  address?: string;
  action?: { label: string; href: string };
  hours?: string[];
}

function ContactCard({ icon, title, description, address, action, hours }: CardProps) {
  const isExternal = action?.href.startsWith("http");

  return (
    <div
      className={`group relative flex h-[315px] flex-col items-center justify-between rounded-[12px] border border-[#DEDEDE] bg-white p-6 text-center transition-colors duration-300 hover:border-[#38BDF8] hover:bg-[#38BDF8] ${
        action ? "cursor-pointer" : ""
      }`}
    >
      {/* Icon */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E6F6FE] transition-colors duration-300 group-hover:bg-white/25">
        <Image
          src={icon}
          alt=""
          width={22}
          height={22}
          aria-hidden
          className="transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert"
        />
      </div>

      {/* Title with description, or title with address */}
      <div className={`flex flex-col items-center ${address ? "gap-14" : "gap-4"}`}>
        <h3 className="text-[22px] font-medium leading-tight text-black transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>

        {description && (
          <p className="max-w-[210px] text-[15px] font-normal leading-[1.5] text-[#555555] transition-colors duration-300 group-hover:text-white">
            {description}
          </p>
        )}

        {address && (
          <p className="max-w-[220px] text-[12px] font-bold leading-[1.4] text-[#333333] transition-colors duration-300 group-hover:text-white">
            {address}
          </p>
        )}
      </div>

      {/* Bottom: hours or action link */}
      {hours ? (
        <div className="flex flex-col gap-5">
          {hours.map((hour) => (
            <p
              key={hour}
              className="text-[12px] font-bold text-[#333333] transition-colors duration-300 group-hover:text-white"
            >
              {hour}
            </p>
          ))}
        </div>
      ) : action ? (
        <a
          href={action.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          aria-label={`${title}: ${action.label}`}
          className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#38BDF8] transition-all duration-300 group-hover:tracking-widest group-hover:text-white after:absolute after:inset-0 after:rounded-[12px] after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#38BDF8] focus-visible:after:ring-offset-2"
        >
          {action.label}
        </a>
      ) : null}
    </div>
  );
}

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