"use client";

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

    return (
        <>
        
        <header className="absolute top-10 left-0 z-50 w-full">
            <div className="mx-auto flex h-[82px] max-w-[1280px] items-center justify-between rounded-[41px] border border-white/20 bg-gradient-to-l from-white/10 to-white/30 px-16 backdrop-blur-md shadow-[0_8px_51.7px_0_rgba(0,0,0,0.10)]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="Ainovex Logo"
                        width={140}
                        height={32}
                        priority // Ensures the logo loads immediately for better performance
                        className="h-auto w-auto" // Helps maintain aspect ratio
                    />
                </Link>

                {/* Navigation */}
                <nav className="flex flex-1 items-center justify-end px-12 gap-8 lg:flex">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`text-sm transition-colors hover:font-bold ${isActive ? "font-bold text-white" : "text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA Button */}
                <div className="hidden lg:block">
                    {/* Adjust the variant prop based on how your Button component is configured */}
                    <Button variant="solid">
                        Schedule a meeting
                    </Button>
                </div>
            </div>
        </header>
        
        </>
    );
}