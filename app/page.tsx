import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
    title: "AccessEase – AI-Powered Accessibility Tools for Everyone",
    description:
        "AccessEase empowers people with disabilities with AI-powered tools: voice assistants, screen readers, gesture controls, and more.",
};

const features = [
    {
        icon: "🎙️",
        title: "Voice Assistant",
        desc: "Navigate any website hands-free with our advanced speech recognition and natural language AI.",
    },
    {
        icon: "👁️",
        title: "Screen Reader",
        desc: "Smart AI describes images, charts, and complex layouts for users with visual impairments.",
    },
    {
        icon: "🤟",
        title: "Gesture Control",
        desc: "Control your device using hand gestures detected by your camera — no touch required.",
    },
    {
        icon: "📝",
        title: "Text Simplifier",
        desc: "AI rewrites complex text in plain language for users with cognitive disabilities.",
    },
    {
        icon: "🎨",
        title: "Color Contrast",
        desc: "Instantly adjust color contrast and font sizes for users with low vision or dyslexia.",
    },
    {
        icon: "⌨️",
        title: "Keyboard Nav",
        desc: "Enhanced keyboard navigation with focus indicators for motor-impaired users.",
    },
];

const stats = [
    { value: "1.3B+", label: "People with disabilities worldwide" },
    { value: "97%", label: "Of websites fail accessibility standards" },
    { value: "100K+", label: "Users empowered by AccessEase" },
    { value: "4.9★", label: "Average user rating" },
];

export default function HomePage() {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #0f2d56 0%, #1a3f7a 50%, #0c3547 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "120px 24px 80px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative blobs */}
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        left: "5%",
                        width: 400,
                        height: 400,
                        background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        right: "5%",
                        width: 500,
                        height: 500,
                        background: "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                    }}
                />

                {/* Badge */}
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 20px",
                        borderRadius: 50,
                        background: "rgba(56,189,248,0.15)",
                        border: "1px solid rgba(56,189,248,0.4)",
                        color: "#7dd3fc",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        marginBottom: 32,
                        animation: "fadeInUp 0.5s ease",
                    }}
                >
                    ✨ AI-powered accessibility tools
                </div>

                <h1
                    style={{
                        fontSize: "clamp(2.5rem, 7vw, 5rem)",
                        fontWeight: 900,
                        lineHeight: 1.1,
                        color: "#ffffff",
                        maxWidth: 900,
                        marginBottom: 24,
                        letterSpacing: "-1px",
                        animation: "fadeInUp 0.6s ease",
                    }}
                >
                    The Digital World,{" "}
                    <span
                        style={{
                            background: "linear-gradient(90deg, #38bdf8, #34d399)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Accessible
                    </span>{" "}
                    to All
                </h1>

                <p
                    style={{
                        fontSize: "1.25rem",
                        color: "rgba(255,255,255,0.75)",
                        maxWidth: 600,
                        marginBottom: 48,
                        lineHeight: 1.7,
                        animation: "fadeInUp 0.7s ease",
                    }}
                >
                    AccessEase uses cutting-edge AI to break down digital barriers — empowering
                    people with disabilities to navigate, communicate, and thrive online.
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        flexWrap: "wrap",
                        justifyContent: "center",
                        animation: "fadeInUp 0.8s ease",
                    }}
                >
                    <Link
                        href="/features"
                        style={{
                            padding: "16px 36px",
                            borderRadius: 50,
                            fontWeight: 700,
                            fontSize: "1rem",
                            background: "linear-gradient(90deg, #38bdf8, #34d399)",
                            color: "#0f2d56",
                            boxShadow: "0 8px 30px rgba(56,189,248,0.4)",
                            transition: "all 0.3s ease",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        Explore Features →
                    </Link>
                    <Link
                        href="/voice-assistant"
                        style={{
                            padding: "16px 36px",
                            borderRadius: 50,
                            fontWeight: 600,
                            fontSize: "1rem",
                            background: "transparent",
                            color: "#7dd3fc",
                            border: "2px solid rgba(56,189,248,0.5)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        Try Voice Assistant
                    </Link>
                </div>

                {/* Stats Row */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 24,
                        maxWidth: 900,
                        width: "100%",
                        marginTop: 80,
                        animation: "fadeInUp 0.9s ease",
                    }}
                >
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(56,189,248,0.2)",
                                borderRadius: 16,
                                padding: "24px 16px",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "2rem",
                                    fontWeight: 900,
                                    background: "linear-gradient(90deg, #38bdf8, #34d399)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    marginBottom: 4,
                                }}
                            >
                                {stat.value}
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: "100px 24px", background: "#f0f9ff" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <h2
                            style={{
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                                fontWeight: 800,
                                color: "#0f2d56",
                                marginBottom: 16,
                            }}
                        >
                            Everything You Need to{" "}
                            <span
                                style={{
                                    background: "linear-gradient(90deg, #38bdf8, #34d399)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Access Anything
                            </span>
                        </h2>
                        <p style={{ color: "#4b6a8a", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>
                            Six powerful tools built for real accessibility needs.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: 28,
                        }}
                    >
                        {features.map((feat) => (
                            <div
                                key={feat.title}
                                style={{
                                    background: "white",
                                    borderRadius: 20,
                                    padding: "36px 28px",
                                    boxShadow: "0 4px 24px rgba(15,45,86,0.08)",
                                    border: "1px solid rgba(56,189,248,0.15)",
                                }}
                                className="hover-lift"
                            >
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(52,211,153,0.15))",
                                        borderRadius: 16,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1.7rem",
                                        marginBottom: 20,
                                    }}
                                >
                                    {feat.icon}
                                </div>
                                <h3
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "1.2rem",
                                        color: "#0f2d56",
                                        marginBottom: 10,
                                    }}
                                >
                                    {feat.title}
                                </h3>
                                <p style={{ color: "#4b6a8a", lineHeight: 1.6, fontSize: "0.95rem" }}>
                                    {feat.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                style={{
                    padding: "100px 24px",
                    background: "linear-gradient(135deg, #0f2d56, #1a3f7a)",
                    textAlign: "center",
                }}
            >
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    <h2
                        style={{
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            fontWeight: 900,
                            color: "#ffffff",
                            marginBottom: 20,
                            lineHeight: 1.2,
                        }}
                    >
                        Ready to Make the Web{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, #38bdf8, #34d399)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Accessible?
                        </span>
                    </h2>
                    <p
                        style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "1.1rem",
                            marginBottom: 40,
                        }}
                    >
                        Join 100,000+ users who are already experiencing the difference.
                    </p>
                    <Link
                        href="/auth/signup"
                        style={{
                            padding: "18px 48px",
                            borderRadius: 50,
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            background: "linear-gradient(90deg, #38bdf8, #34d399)",
                            color: "#0f2d56",
                            boxShadow: "0 8px 30px rgba(56,189,248,0.4)",
                            display: "inline-block",
                        }}
                    >
                        Start Free Today →
                    </Link>
                </div>
            </section>

            <Footer />

            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          section:first-of-type div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
        </>
    );
}
