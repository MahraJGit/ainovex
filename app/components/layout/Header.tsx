"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "@/app/components/ui/Button";
import NavLink from "@/app/components/ui/NavLink";

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

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

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

                    {/* Desktop navigation */}
                    <nav className="hidden flex-1 items-center justify-center gap-4 px-4 min-[990px]:flex min-[1025px]:justify-end min-[1180px]:gap-6 min-[1180px]:px-8 min-[1280px]:gap-8 min-[1280px]:px-12">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <NavLink
                                    key={link.label}
                                    href={link.href}
                                    className={`flex h-[82px] items-center whitespace-nowrap text-[14px] text-white ${isActive ? "font-bold" : "font-normal"
                                        }`}
                                >
                                    {link.label}
                                </NavLink>
                            );
                        })}
                    </nav>

                    <div className="flex shrink-0 items-center gap-3">
                        {/* CTA — hidden on mobile, visible from 990px */}
                        <div className="[&_*]:whitespace-nowrap hidden min-[640px]:block">
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
                                    className={`absolute left-0 block h-[2px] w-5 rounded bg-white transition-transform duration-300 ${open ? "top-[7px] rotate-45" : "top-0"
                                        }`}
                                />
                                <span
                                    className={`absolute left-0 top-[7px] block h-[2px] w-5 rounded bg-white transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"
                                        }`}
                                />
                                <span
                                    className={`absolute left-0 block h-[2px] w-5 rounded bg-white transition-transform duration-300 ${open ? "top-[7px] -rotate-45" : "top-[14px]"
                                        }`}
                                />
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <nav
                    id="mobile-nav"
                    className={`absolute left-0 right-0 top-[94px] origin-top rounded-[24px] border border-white/20 bg-gradient-to-l from-white/10 to-white/30 p-3 shadow-[0_8px_51.7px_0_rgba(0,0,0,0.10)] backdrop-blur-md transition-all duration-200 min-[990px]:hidden ${open
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
                                        className={`block rounded-2xl px-4 py-3 text-base text-white transition-colors hover:bg-white/15 ${isActive ? "font-bold" : "font-normal"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    {/* CTA inside mobile menu */}
                    <div className="min-[640px]:hidden px-2 pt-2 pb-1 mt-1">
                        <Button variant="solid" className="w-full">Schedule a meeting</Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}