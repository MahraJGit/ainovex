import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer
            className="relative w-full overflow-hidden bg-[#1D1D1D]"
        >
            <div
                className="absolute -inset-10 blur-3xl"
                style={{
                    backgroundImage:
                        "linear-gradient(66deg, #1D1D1D 0%, #1D1D1D 25%, #1D5477 34%, #1C8AD0 45%, #1D5477 56%, #1D1D1D 70%, #1D1D1D 100%)"
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.4] mix-blend-overlay"
                style={{
                    backgroundImage: `
                url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E")
            `,
                }}
            />
            <div className="bg-black/30 absolute z-11 inset-0"></div>

            {/* Main Footer Content */}
            <div className="section-container relative z-12 mt-15">
                <div className="flex flex-row items-start gap-11">

                    {/* Column 1: Brand & Socials */}
                    <div className="flex flex-col items-start gap-4 max-w-[521px]">
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                alt="Ainovex Logo"
                                width={280}
                                height={102}
                                className="w-[169px] h-auto"
                            />
                        </Link>
                        <p className="text-md leading-relaxed tracking-[-0.23px] text-white max-w-[470px]">
                            A results driven IT company building smart digital solutions
                            that help businesses grow, compete, and succeed in the
                            modern world.
                        </p>
                        <div className="flex flex-col gap-2 mt-18">
                            <h4 className="text-[15px] font-semibold text-white">Follow Us On</h4>
                            <div className="flex items-center gap-4">
                                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#1C8AD0] transition-colors">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#1C8AD0] transition-colors">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#1C8AD0] transition-colors">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right columns pushed to end */}
                    <div className="flex flex-row gap-12 ml-16">

                        {/* Company */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[15px] font-bold text-white uppercase tracking-widest">Company</h4>
                            <nav className="flex flex-col gap-6">
                                {['Home', 'Careers', 'Services', 'About Us', 'Contact Us', 'Blog'].map((link) => (
                                    <Link
                                        key={link}
                                        href={`/${link.toLowerCase().replace(' ', '-') === 'home' ? '' : link.toLowerCase().replace(' ', '-')}`}
                                        className="text-[15px] text-white hover:text-[#1C8AD0] transition-colors w-fit"
                                    >
                                        {link}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Legal */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[15px] font-bold text-white uppercase tracking-widest">Legal</h4>
                            <nav className="flex flex-col gap-6">
                                <Link href="/privacy-policy" className="text-[15px] text-white hover:text-[#1C8AD0] transition-colors w-fit">
                                    Privacy policy
                                </Link>
                                <Link href="/terms-and-conditions" className="text-[15px] text-white hover:text-[#1C8AD0] transition-colors w-fit">
                                    Terms & conditions
                                </Link>
                            </nav>
                        </div>

                        {/* Contact Us */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[15px] font-bold text-white uppercase tracking-widest">Contact Us</h4>
                            <div className="flex flex-col gap-4 text-[15px] text-white">

                                <div className="flex items-start gap-3">
                                    <span className="text-[#1C8AD0] mt-0.5 shrink-0">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                    <a
                                        href="https://maps.app.goo.gl/JpSJs6K2RxSjU5Jd8"
                                        target="_blank"
                                        className="leading-relaxed max-w-[290px] hover:text-[#1C8AD0]">
                                        World Trade Center - Office <br /> Number - 4087 - Islamabad Pakistan
                                    </a>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-[#1C8AD0] mt-0.5 shrink-0">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <div className="flex flex-col gap-1">
                                        <a href="mailto:info@mahrajfloors.com" className="hover:text-[#1C8AD0] transition-colors">info@mahrajfloors.com</a>
                                        <a href="mailto:sales@mahrajfloors.com" className="hover:text-[#1C8AD0] transition-colors">sales@mahrajfloors.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 shrink-0">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="8" cy="8" r="8" fill="#1C8AD0" />
                                            <path d="M8 4V8L10.5 10.5" stroke="#1D1D1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <div className="flex flex-col gap-1">
                                        <p>Monday: 09:00am - 06:00pm</p>
                                        <p>Saturday: 09am-04:00pm</p>
                                        <p>Sunday: Off</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Copyright */}

            <div className="max-w-[1280px] mx-auto py-8 py-4 border-t border-white/40 relative z-12">
                <p className="text-center text-[15px] font-semibold text-white">
                    © Ainovex Technologies {new Date().getFullYear()}
                </p>
            </div>

        </footer>
    );
}