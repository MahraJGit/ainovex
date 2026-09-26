"use client";

import { useRef } from "react";
import Link from "next/link";

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    strength?: number;
};

export default function NavLink({
    href,
    children,
    className = "",
    strength = 0.4,
}: NavLinkProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = ref.current;
        const label = labelRef.current;
        if (!el || !label) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        label.style.transition = "transform 60ms linear";
        label.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const onLeave = () => {
        const label = labelRef.current;
        if (!label) return;
        label.style.transition = "transform 400ms cubic-bezier(0.22, 1.2, 0.36, 1)";
        label.style.transform = "translate(0px, 0px)";
    };

    return (
        <Link
            ref={ref}
            href={href}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
        >
            <span ref={labelRef} className="inline-block will-change-transform">
                {children}
            </span>
        </Link>
    );
}
