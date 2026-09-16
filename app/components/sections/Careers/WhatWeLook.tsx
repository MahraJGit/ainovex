"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import SectionGrid from "../../ui/SectionGrid";

const traits = [
    {
        icon: "/icons/careers/look-for/attitude.svg",
        number: "01",
        title: "Positive Attitude",
        description:
            "We look for people who bring energy, not excuses. A good attitude is contagious. It turns a tough day into a team win, and a workplace into a place people actually enjoy.",
    },
    {
        icon: "/icons/careers/look-for/problem-solving.svg",
        number: "02",
        title: "Problem Solving Mindset",
        description:
            "Challenges come up. What matters is how you handle them. We value people who stay calm, think clearly, and find smart solutions instead of getting stuck on the problem.",
    },
    {
        icon: "/icons/careers/look-for/teamwork.svg",
        number: "03",
        title: "Teamwork",
        description:
            "No one builds something great alone. We look for people who listen well, speak up when needed, and put the team's success above personal credit.",
    },
    {
        icon: "/icons/careers/look-for/professionalism.svg",
        number: "04",
        title: "Professionalism",
        description:
            "Trust is earned through small things, done right, every time. We value honesty, accountability, and people who follow through on what they say they'll do.",
    },
    {
        icon: "/icons/careers/look-for/learning.svg",
        number: "05",
        title: "Willingness to Learn",
        description:
            "The best people never stop growing. We look for curiosity, a hunger to improve, and the humility to learn something new, even from mistakes.",
    },
];

export default function WhatWeLookFor() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cursorPos = useRef<{ x: number; y: number } | null>(null);
    const rafId = useRef<number | null>(null);

    // Check which row the cursor is currently inside based on live bounding rects
    const updateActiveFromCursor = useCallback(() => {
        if (!cursorPos.current) {
            setActiveIndex(null);
            return;
        }

        const { x, y } = cursorPos.current;
        let found: number | null = null;

        for (let i = 0; i < rowRefs.current.length; i++) {
            const el = rowRefs.current[i];
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                found = i;
                break;
            }
        }

        setActiveIndex(found);
    }, []);

    // On scroll — recalculate which box the cursor is now inside
    useEffect(() => {
        const handleScroll = () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(updateActiveFromCursor);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [updateActiveFromCursor]);

    // On mouse move — update stored cursor position and recalculate
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        cursorPos.current = { x: e.clientX, y: e.clientY };
        updateActiveFromCursor();
    }, [updateActiveFromCursor]);

    // When cursor leaves the whole timeline section — clear everything
    const handleSectionLeave = useCallback(() => {
        cursorPos.current = null;
        setActiveIndex(null);
    }, []);

    return (
        <section id="what-we-look-for" className="relative overflow-hidden bg-white">
            <SectionGrid placement="left-light" />

            <div className="section-container relative z-10 py-[104px]! lg:py-[120px]!">

                {/* Header */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16 mb-16">
                    <div>
                        <h2 className="text-black-v1/87">
                            <span className="text-primary">What We</span> Look For
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <p className="text-base leading-snug text-md text-ink text-right">
                            We don't just hire skills. We hire people who care about doing great
                            work, growing every day, and lifting the team along the way.
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div
                    className="relative"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleSectionLeave}
                >
                    {/* Grey base vertical line */}
                    <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#D8D8D8]" />

                    <div className="flex flex-col">
                        {traits.map((trait, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <div
                                    key={trait.number}
                                    ref={(el) => { rowRefs.current[index] = el; }}
                                    className="relative grid min-h-[240px] grid-cols-[1fr_auto_1fr] items-center gap-8 rounded-xl px-8"
                                    style={{
                                        backgroundColor: isActive ? "#F7F7F7" : "transparent",
                                        transition: "background-color 0.6s ease",
                                    }}
                                >
                                    {/* Vertical gradient overlay — slides in from top */}
                                    <div
                                        className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-[#38BDF8] to-[#2989FF]"
                                        style={{
                                            transform: `scaleY(${isActive ? 1 : 0})`,
                                            transition: "transform 0.65s ease-in-out",
                                        }}
                                    />

                                    {/* Horizontal line */}
                                    <div
                                        className="absolute left-30 right-[460px] top-1/2 h-px -translate-y-1/2"
                                        style={{
                                            background: isActive
                                                ? "linear-gradient(to right, #38BDF8, #2989FF)"
                                                : "rgba(216,216,216,0.4)",
                                            transition: "background 0.6s ease",
                                        }}
                                    />

                                    {/* Left — icon */}
                                    <div className="relative z-10 flex justify-start">
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-white">
                                            <Image src={trait.icon} alt="" width={64} height={64} aria-hidden />
                                        </div>
                                    </div>

                                    {/* Center — number pill */}
                                    <div
                                        className="relative z-10 flex h-[34px] w-[52px] items-center justify-center rounded-full text-md"
                                        style={{
                                            background: isActive
                                                ? "linear-gradient(to bottom, #38BDF8, #2989FF)"
                                                : "#D8D8D8",
                                            color: isActive ? "white" : "inherit",
                                            transition: "background 0.4s ease, color 0.4s ease",
                                        }}
                                    >
                                        {trait.number}
                                    </div>

                                    {/* Right — title + description */}
                                    <div className="relative z-10 ml-30">
                                        <h3 className="text-[18px] font-bold">
                                            {trait.title}
                                        </h3>
                                        <p className="mt-2 max-w-[393px] text-md font-normal leading-tight">
                                            {trait.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}