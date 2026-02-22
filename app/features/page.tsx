import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: "Features – AccessEase",
    description:
        "Explore all AccessEase accessibility features: voice assistant, screen reader, gesture control, text simplifier, and more.",
};

const features = [
    {
        icon: "🎙️",
        title: "Voice Assistant",
        tagline: "Hands-free navigation",
        description:
            "Our AI-powered voice assistant understands natural language commands, letting you navigate websites, fill forms, click buttons, and interact with any web content using only your voice.",
        capabilities: [
            "Navigate between pages by voice",
            "Fill in forms and submit data",
            "Search and read content aloud",
            "Control media playback",
        ],
        color: "#38bdf8",
        href: "/voice-assistant",
    },
    {
        icon: "👁️",
        title: "AI Screen Reader",
        tagline: "See the unseen",
        description:
            "Our intelligent screen reader goes beyond basic alt-text. It uses computer vision AI to describe complex images, charts, infographics, and diagrams in natural language.",
        capabilities: [
            "AI-generated image descriptions",
            "Chart and graph interpretation",
            "OCR for text in images",
            "Reading mode for complex layouts",
        ],
        color: "#34d399",
        href: "/scanner",
    },
    {
        icon: "🤟",
        title: "Gesture Control",
        tagline: "Zero touch needed",
        description:
            "Control your entire device with hand gestures captured by your camera. Our gesture recognition system supports 20+ gestures for navigation, scrolling, clicking, and more.",
        capabilities: [
            "20+ custom gesture commands",
            "Works with any camera",
            "Real-time gesture detection",
            "Customizable gesture mapping",
        ],
        color: "#a78bfa",
        href: "/sign-language",
    },
    {
        icon: "📝",
        title: "Text Simplifier",
        tagline: "Plain language for everyone",
        description:
            "Powered by GPT-class AI, our text simplifier rewrites complex articles, legal documents, and technical content into easy-to-read plain language — instantly.",
        capabilities: [
            "Adjustable reading level (Gr. 3–12)",
            "Preserves key information",
            "Works on any webpage",
            "Audio readout of simplified text",
        ],
        color: "#fb923c",
        href: "/dashboard",
    },
    {
        icon: "🎨",
        title: "Color & Contrast",
        tagline: "See comfortably",
        description:
            "Instantly adjust any webpage's color scheme, contrast ratio, font size, and spacing to match your visual needs without installing browser extensions.",
        capabilities: [
            "One-click high contrast mode",
            "Adjustable font size & weight",
            "Color blindness simulation & filter",
            "Dark, light, and grayscale modes",
        ],
        color: "#f472b6",
        href: "/settings",
    },
    {
        icon: "⌨️",
        title: "Enhanced Keyboard Nav",
        tagline: "Mouse-free control",
        description:
            "Complete keyboard navigation with visible focus indicators, skip-to-content links, and intelligent tab ordering — fully conforming to WCAG 2.2 AA standards.",
        capabilities: [
            "Custom focus ring styles",
            "Skip navigation links",
            "WCAG 2.2 AA conformance",
            "Keyboard shortcut cheat sheet",
        ],
        color: "#38bdf8",
        href: "/settings",
    },
];

export default function FeaturesPage() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 72 }}>
                {/* Hero */}
                <section
                    style={{
                        background: "linear-gradient(135deg, #0f2d56 0%, #1a3f7a 100%)",
                        padding: "80px 24px 100px",
                        textAlign: "center",
                    }}
                >
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
                            marginBottom: 24,
                        }}
                    >
                        🛠️ Powerful Accessibility Tools
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(2.5rem, 6vw, 4rem)",
                            fontWeight: 900,
                            color: "#ffffff",
                            marginBottom: 20,
                            lineHeight: 1.15,
                        }}
                    >
                        All Our{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, #38bdf8, #34d399)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Features
                        </span>
                    </h1>
                    <p
                        style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "1.15rem",
                            maxWidth: 600,
                            margin: "0 auto",
                            lineHeight: 1.7,
                        }}
                    >
                        Six powerful, AI-driven tools built to make the entire web accessible
                        for people with any disability.
                    </p>
                </section>

                {/* Feature Cards */}
                <section
                    style={{
                        padding: "80px 24px",
                        background: "#f0f9ff",
                        marginTop: -30,
                        borderRadius: "30px 30px 0 0",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1200,
                            margin: "0 auto",
                            display: "grid",
                            gap: 40,
                        }}
                    >
                        {features.map((feat, i) => (
                            <div
                                key={feat.title}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr",
                                    gap: 48,
                                    alignItems: "center",
                                    background: "white",
                                    borderRadius: 24,
                                    padding: "48px",
                                    boxShadow: "0 4px 30px rgba(15,45,86,0.08)",
                                    border: "1px solid rgba(56,189,248,0.12)",
                                }}
                                className="hover-lift"
                            >
                                {/* Info */}
                                <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 8,
                                            padding: "6px 16px",
                                            borderRadius: 50,
                                            background: `${feat.color}18`,
                                            color: feat.color,
                                            fontWeight: 600,
                                            fontSize: "0.8rem",
                                            marginBottom: 16,
                                        }}
                                    >
                                        {feat.icon} {feat.tagline}
                                    </div>
                                    <h2
                                        style={{
                                            fontSize: "2rem",
                                            fontWeight: 800,
                                            color: "#0f2d56",
                                            marginBottom: 16,
                                        }}
                                    >
                                        {feat.title}
                                    </h2>
                                    <p style={{ color: "#4b6a8a", lineHeight: 1.7, marginBottom: 24 }}>
                                        {feat.description}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 10,
                                        }}
                                    >
                                        {feat.capabilities.map((c) => (
                                            <div
                                                key={c}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 10,
                                                    fontSize: "0.9rem",
                                                    color: "#1e3a5a",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: "50%",
                                                        background: `${feat.color}20`,
                                                        color: feat.color,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "0.7rem",
                                                        fontWeight: 700,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    ✓
                                                </span>
                                                {c}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Visual */}
                                <div
                                    style={{
                                        order: i % 2 === 0 ? 2 : 1,
                                        height: 220,
                                        borderRadius: 20,
                                        background: `linear-gradient(135deg, ${feat.color}15, ${feat.color}30)`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "5rem",
                                        border: `1px solid ${feat.color}30`,
                                    }}
                                >
                                    {feat.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section
                    style={{
                        padding: "80px 24px",
                        background: "linear-gradient(135deg, #0f2d56, #1a3f7a)",
                        textAlign: "center",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "clamp(1.8rem, 5vw, 3rem)",
                            fontWeight: 800,
                            color: "#ffffff",
                            marginBottom: 16,
                        }}
                    >
                        Ready to experience the difference?
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 32, fontSize: "1.05rem" }}>
                        Start free today — no credit card required.
                    </p>
                    <a
                        href="/auth/signup"
                        style={{
                            padding: "16px 40px",
                            borderRadius: 50,
                            fontWeight: 700,
                            fontSize: "1rem",
                            background: "linear-gradient(90deg, #38bdf8, #34d399)",
                            color: "#0f2d56",
                            boxShadow: "0 8px 30px rgba(56,189,248,0.4)",
                            display: "inline-block",
                        }}
                    >
                        Get Started Free →
                    </a>
                </section>
            </main>
            <Footer />
        </>
    );
}
