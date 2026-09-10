import Image from "next/image";
import { useId } from "react";
import Button from "./Button";

const CARD_SHAPE =
  "M381 0C394.255 0 405 10.7452 405 24V229C405 242.255 394.255 253 381 253H160.635C157.289 253 155 249.346 155 246V222C155 213.163 147.837 206 139 206H13C7.95724 206 0 202.288 0 197.245V24C3.57586e-06 10.7452 10.7452 0 24 0H381Z";

const CARD_BORDER =
  "M405 229H406V229H405ZM155 222H156V222H155ZM0 24H-1V24H0ZM381 0V1C393.703 1 404 11.2975 404 24H405H406C406 10.1929 394.807 -1 381 -1V0ZM405 24H404V229H405H406V24H405ZM405 229H404C404 241.703 393.703 252 381 252V253V254C394.807 254 406 242.807 406 229H405ZM381 253V252H160.635V253V254H381V253ZM155 246H156V222H155H154V246H155ZM155 222H156C156 212.611 148.389 205 139 205V206V207C147.284 207 154 213.716 154 222H155ZM139 206V205H13V206V207H139V206ZM0 197.245H1V24H0H-1V197.245H0ZM0 24H1C1 11.2975 11.2975 1 24 1V0V-1C10.1929 -1 -0.999996 10.1929 -1 24H0ZM24 0V1H381V0V-1H24V0ZM13 206V205C10.6813 205 7.60603 204.133 5.12023 202.654C2.58804 201.148 1 199.22 1 197.245H0H-1C-1 200.313 1.39058 202.763 4.0977 204.373C6.85121 206.011 10.2759 207 13 207V206ZM160.635 253V252C159.359 252 158.221 251.308 157.365 250.158C156.505 249.002 156 247.462 156 246H155H154C154 247.885 154.639 249.845 155.76 251.352C156.886 252.865 158.566 254 160.635 254V253Z";

export type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  href?: string;
};

export default function ServiceCard({
  icon,
  title,
  description,
  href = "#",
}: ServiceCardProps) {
  const maskId = useId();

  return (
    <article className="relative aspect-[405/250] w-full">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 405 253"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <mask id={maskId} fill="white">
          <path d={CARD_SHAPE} />
        </mask>
        <path d={CARD_SHAPE} fill="#0C1222" />
        <path d={CARD_BORDER} fill="#21325E" mask={`url(#${maskId})`} />
      </svg>

      <div className="relative z-10 flex h-full flex-col px-6 pb-[22%] pt-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-medium leading-[100%] tracking-[-0.02em] text-white">
            {title}
          </h3>
          <Image
            src={icon}
            alt=""
            width={32}
            height={32}
            className="size-8 shrink-0"
            aria-hidden
          />
        </div>
        <p className="mt-4 max-w-[310px] text-sm font-normal tracking-[-0.02em] text-white">
          {description}
        </p>
      </div>

      <Button
        href={href}
        variant="outline-dark"
        className="absolute bottom-[-2%] left-[-1%] z-20 !px-6 !py-2 text-sm"
      >
        Explore more
      </Button>
    </article>
  );
}
