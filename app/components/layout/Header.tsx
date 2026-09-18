"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "@/app/components/ui/Button";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Careers", href: "/careers" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Blog", href: "/blog" },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Close the menu on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // Close it again if the screen grows past the breakpoint
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 990px)");
        const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    return (
        <header className="absolute top-10 left-0 z-50 w-full px-4">
            <div className="relative mx-auto max-w-[1280px]">
                {/* Bar */}
                <div className="flex h-[82px] items-center justify-between rounded-[41px] border border-white/20 bg-gradient-to-l from-white/10 to-white/30 px-5 shadow-[0_8px_51.7px_0_rgba(0,0,0,0.10)] backdrop-blur-md min-[990px]:px-8 min-[1180px]:px-12 min-[1280px]:px-16">
                    {/* Logo */}
                    <Link href="/" className="flex shrink-0 items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="Ainovex Logo"
                            width={140}
                            height={32}
                            priority
                            className="h-auto w-[112px] min-[1180px]:w-[140px]"
                        />
                    </Link>

                    {/* Desktop navigation: centered from 990 to 1024, right aligned above that */}
                    <nav className="hidden flex-1 items-center justify-center gap-4 px-4 min-[990px]:flex min-[1025px]:justify-end min-[1180px]:gap-6 min-[1180px]:px-8 min-[1280px]:gap-8 min-[1280px]:px-12">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`group/nav relative flex h-[82px] items-center whitespace-nowrap text-[13px] text-white min-[1180px]:text-sm ${
                                        isActive ? "font-bold" : "font-normal"
                                    }`}
                                >
                                    {/* Normal label, fades out under the bubble */}
                                    <span className="transition-opacity duration-200 group-hover/nav:opacity-0">
                                        {link.label}
                                    </span>

                                    {/* Magnifier bubble: absolute, so neighbours never move */}
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute left-1/2 top-1/2 flex h-[58px] -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full border border-white/40 bg-white/15 px-5 opacity-0 shadow-[0_6px_20px_rgba(0,0,0,0.18)] backdrop-blur-[6px] transition-all duration-300 ease-out group-hover/nav:scale-100 group-hover/nav:opacity-100"
                                    >
                                        <span className="block scale-[1.35] whitespace-nowrap font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
                                            {link.label}
                                        </span>
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTA stays in place at every size */}
                    <div className="flex shrink-0 items-center gap-3">
                        <div className="[&_*]:whitespace-nowrap">
                            <Button variant="solid">Schedule a meeting</Button>
                        </div>

                        {/* Hamburger, only below 990px */}
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            aria-controls="mobile-nav"
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white min-[990px]:hidden"
                        >
                            <span className="relative block h-4 w-5">
                                <span
                                    className={`absolute left-0 block h-[2px] w-5 rounded bg-white transition-transform duration-300 ${
                                        open ? "top-[7px] rotate-45" : "top-0"
                                    }`}
                                />
                                <span
                                    className={`absolute left-0 top-[7px] block h-[2px] w-5 rounded bg-white transition-opacity duration-200 ${
                                        open ? "opacity-0" : "opacity-100"
                                    }`}
                                />
                                <span
                                    className={`absolute left-0 block h-[2px] w-5 rounded bg-white transition-transform duration-300 ${
                                        open ? "top-[7px] -rotate-45" : "top-[14px]"
                                    }`}
                                />
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile menu: sibling of the bar, NOT inside it, so its own blur works */}
                <nav
                    id="mobile-nav"
                    className={`absolute left-0 right-0 top-[94px] origin-top rounded-[24px] border border-white/20 bg-gradient-to-l from-white/10 to-white/30 p-3 shadow-[0_8px_51.7px_0_rgba(0,0,0,0.10)] backdrop-blur-md transition-all duration-200 min-[990px]:hidden ${
                        open
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                >
                    <ul className="flex flex-col">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className={`block rounded-2xl px-4 py-3 text-base text-white transition-colors hover:bg-white/15 ${
                                            isActive ? "font-bold" : "font-normal"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}