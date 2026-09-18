import Image from "next/image";

interface ContactCardProps {
  icon: string;
  title: string;
  description?: string;
  address?: string;
  action?: { label: string; href: string };
  hours?: string[];
}

export default function ContactCard({ icon, title, description, address, action, hours }: ContactCardProps) {
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

      {/* Title + description or address */}
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

      {/* Bottom: hours or action */}
      {hours ? (
        <div className="flex flex-col gap-5">
          {hours.map((hour) => (
            <p key={hour} className="text-[12px] font-bold text-[#333333] transition-colors duration-300 group-hover:text-white">
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