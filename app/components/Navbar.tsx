"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/features", label: "Features" },
    { href: "/voice-assistant", label: "Voice Assistant" },
    { href: "/sign-language", label: "Sign Language" },
    { href: "/impact", label: "Impact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: "0 24px",
                height: "72px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: scrolled
                    ? "rgba(15, 45, 86, 0.95)"
                    : "rgba(15, 45, 86, 0.7)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: scrolled
                    ? "1px solid rgba(56, 189, 248, 0.3)"
                    : "1px solid transparent",
                transition: "all 0.3s ease",
                boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
            }}
        >
            {/* Logo */}
            <Link
                href="/"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "#ffffff",
                    letterSpacing: "-0.5px",
                }}
            >
                <span
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #38bdf8, #34d399)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        boxShadow: "0 0 15px rgba(56,189,248,0.4)",
                    }}
                >
                    ♿
                </span>
                <span>
                    Access<span style={{ color: "#38bdf8" }}>Ease</span>
                </span>
            </Link>

            {/* Desktop Nav */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
                className="desktop-nav"
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        style={{
                            padding: "8px 12px",
                            borderRadius: "20px",
                            fontWeight: 500,
                            fontSize: "0.85rem",
                            color:
                                pathname === link.href
                                    ? "#38bdf8"
                                    : "rgba(255,255,255,0.85)",
                            background:
                                pathname === link.href
                                    ? "rgba(56,189,248,0.15)"
                                    : "transparent",
                            transition: "all 0.2s ease",
                            border:
                                pathname === link.href
                                    ? "1px solid rgba(56,189,248,0.4)"
                                    : "1px solid transparent",
                        }}
                    >
                        {link.label}
                    </Link>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
                    <Link
                        href="/auth/login"
                        style={{
                            padding: "8px 16px",
                            borderRadius: "20px",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            color: "#ffffff",
                            border: "1px solid rgba(255,255,255,0.2)",
                            transition: "all 0.2s ease",
                        }}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/emergency"
                        style={{
                            padding: "8px 20px",
                            borderRadius: "50px",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            background: "rgba(239, 68, 68, 0.2)",
                            color: "#ef4444",
                            border: "1px solid rgba(239, 68, 68, 0.4)",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        🚨 SOS
                    </Link>
                </div>
            </div>


            {/* Mobile Hamburger */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: "none",
                    background: "transparent",
                    color: "white",
                    fontSize: "1.5rem",
                    padding: "4px",
                }}
                className="mobile-menu-btn"
                aria-label="Toggle menu"
            >
                {menuOpen ? "✕" : "☰"}
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "rgba(15,45,86,0.97)",
                        backdropFilter: "blur(16px)",
                        padding: "20px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        borderBottom: "1px solid rgba(56,189,248,0.2)",
                    }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "12px",
                                fontWeight: 500,
                                color:
                                    pathname === link.href ? "#38bdf8" : "rgba(255,255,255,0.85)",
                                background:
                                    pathname === link.href ? "rgba(56,189,248,0.15)" : "transparent",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/auth/login"
                        onClick={() => setMenuOpen(false)}
                        style={{
                            marginTop: "8px",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            fontWeight: 700,
                            background: "linear-gradient(90deg, #38bdf8, #34d399)",
                            color: "#0f2d56",
                            textAlign: "center",
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
        </nav>
    );
}
