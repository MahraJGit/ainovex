import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";

const locations = [
  {
    title: "UAE Office",
    email: "info@ainovex.com",
    city: "Dubai, UAE",
    phone: "+971 123 4567",
    image: "/images/locations/uae-office.png",
  },
  {
    title: "Pakistan Office",
    email: "info@ainovex.com",
    city: "Islamabad, Pak",
    phone: "+92 300 1234567",
    image: "/images/locations/pak-office.png",
  },
  {
    title: "USA Office",
    email: "info@ainovex.com",
    city: "New York, USA",
    phone: "+1(925) 123 4567",
    image: "/images/locations/usa-office.png",
  },
];

// Eased fade: starts very gently, speeds up in the middle, settles softly.
// Many stops remove the visible seam a simple two stop gradient creates.
// Fully hidden for the first 25%, then the same eased fade, fully visible by 85%
const SMOOTH_FADE = `linear-gradient(to right,
  rgba(0,0,0,0) 0%,
  rgba(0,0,0,0) 25%,
  rgba(0,0,0,0.013) 29%,
  rgba(0,0,0,0.049) 33%,
  rgba(0,0,0,0.104) 37%,
  rgba(0,0,0,0.175) 41%,
  rgba(0,0,0,0.259) 45%,
  rgba(0,0,0,0.352) 49%,
  rgba(0,0,0,0.450) 53%,
  rgba(0,0,0,0.550) 57%,
  rgba(0,0,0,0.648) 61%,
  rgba(0,0,0,0.741) 65%,
  rgba(0,0,0,0.825) 69%,
  rgba(0,0,0,0.896) 73%,
  rgba(0,0,0,0.951) 77%,
  rgba(0,0,0,0.987) 81%,
  rgba(0,0,0,1) 85%)`;

function LocationCard({ title, email, city, phone, image }: (typeof locations)[0]) {
  return (
    <div className="relative flex min-h-[290px] flex-col justify-end">
      {/* Photo: right side, rounded only on the right, fading smoothly into the section on the left */}
      <div
        className="absolute inset-y-0 right-0 w-[100%] overflow-hidden rounded-r-[24px]"
        style={{
  WebkitMaskImage: SMOOTH_FADE,
  maskImage: SMOOTH_FADE,

}}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 30vw, 90vw"
          className="object-contain"
        />
      </div>

      {/* Content: sits on the left, over the faded part of the photo */}
      <div className="relative z-10 pb-7">
        <h3 className="text-[20px] font-semibold leading-tight text-white">{title}</h3>
        <p className="mt-3 text-[12px] font-normal text-white/60">{email}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="flex h-9 items-center rounded-lg border border-[#DEDEDE] px-2 py-1 text-[12px] font-normal text-white/60">
            {city}
          </span>
          <span className="flex h-9 items-center rounded-lg border border-[#DEDEDE] px-2 py-1 text-[12px] font-normal text-white/60">
            {phone}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Locations() {
  return (
    <section className="relative overflow-hidden bg-[#05080F]">
      <SectionGrid placement="left" />

      <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">
        <h2 className="mb-14 text-center text-white">
          <span className="text-primary">Ainovex</span> Locations
        </h2>

        <div className="grid grid-cols-1 gap-[32.5px] md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <LocationCard key={location.title} {...location} />
          ))}
        </div>
      </div>
    </section>
  );
}