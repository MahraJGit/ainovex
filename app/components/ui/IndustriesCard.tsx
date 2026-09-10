import Image from "next/image";

export default function IndustriesCard() {
    return (
        <div className="group w-full h-[300px] bg-white rounded-2xl flex justify-between items-center py-8 px-10">
            <div className="flex items-center gap-6">
                <h3
                    className="
    text-[195px] font-black leading-[100%]
    text-transparent
    [-webkit-text-stroke:1px_#868686]
    bg-[linear-gradient(to_top,var(--color-primary)_0%,var(--color-primary)_var(--fill),transparent_var(--fill),transparent_100%)]
    bg-clip-text
    [-webkit-background-clip:text]
    transition-[--fill]
    duration-900
    ease-in-out
    group-hover:[--fill:100%]
  "
                >
                    01
                </h3>

                <h4 className="text-[50px] font-black leading-[100%] text-black">
                    B2B Digital Marketing
                </h4>
            </div>

            <div className="bg-primary rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <Image
                    src="/icons/right-arrow.svg"
                    alt="Arrow Right"
                    width={44}
                    height={44}
                />
            </div>
        </div>
    );
}