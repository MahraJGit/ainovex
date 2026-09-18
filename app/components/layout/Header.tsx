"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute top-10 left-0 z-50 w-full px-4">
        <div className="mx-auto flex h-[82px] max-w-[1280px] items-center justify-between rounded-[41px] border border-white/20 bg-gradient-to-l from-white/10 to-white/30 px-8 lg:px-16 backdrop-blur-md shadow-[0_8px_51.7px_0_rgba(0,0,0,0.10)]">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Ainovex Logo"
              width={140}
              height={32}
              priority
              className="h-auto w-auto"
            />
          </Link>

          {/* Desktop nav — visible above 990px */}
          <nav className="hidden items-center gap-6 xl:flex px-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-medium text-white transition-colors hover:font-bold
                    after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full
                    after:scale-x-0 after:bg-white after:transition-transform after:duration-200
                    hover:after:scale-x-100
                    ${isActive ? "font-bold" : ""}
                  `}
                  style={{ minWidth: "max-content" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA — desktop */}
          <div className="hidden xl:block shrink-0">
            <Button variant="solid">Schedule a meeting</Button>
          </div>

          {/* Hamburger — visible below 990px */}
          <button
            className="flex xl:hidden items-center justify-center text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <IoCloseOutline size={32} />
              : <IoMenuOutline size={32} />
            }
          </button>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mx-auto mt-3 max-w-[1280px] rounded-[24px] border border-white/20 bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-md px-8 py-6 xl:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-base font-medium text-white transition-colors hover:font-bold ${
                      isActive ? "font-bold" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6">
              <Button variant="solid">Schedule a meeting</Button>
            </div>
          </div>
        )}

      </header>
    </>
  );
}