import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: "Impact – AccessEase",
    description:
        "See how AccessEase is making a real impact for people with disabilities worldwide. Stories, data, and our mission.",
};

const impactStats = [
    { icon: "👥", value: "120,000+", label: "Active Users", color: "#38bdf8" },
    { icon: "🌍", value: "45+", label: "Countries Reached", color: "#34d399" },
    { icon: "⭐", value: "4.9/5", label: "Satisfaction Score", color: "#a78bfa" },
    { icon: "⏱️", value: "2.4M hrs", label: "Time Saved Monthly", color: "#fb923c" },
];

const stories = [
    {
        name: "Sarah M.",
        disability: "Visual Impairment",
        quote:
            "AccessEase's AI screen reader changed my life. I can now read news, shop online, and work independently — things I couldn't do before.",
        emoji: "👁️",
        location: "London, UK",
    },
    {
        name: "James T.",
        disability: "Motor Disability",
        quote:
            "The voice assistant means I don't need to rely on others to navigate the web. I feel empowered and independent again.",
        emoji: "🤟",
        location: "Toronto, Canada",
    },
    {
        name: "Priya R.",
        disability: "Dyslexia",
        quote:
            "The text simplifier makes reading so much easier. Complex articles are rewritten in plain language I can understand quickly.",
        emoji: "📝",
        location: "Mumbai, India",
    },
];

const milestones = [
    { year: "2023", event: "AccessEase founded with a vision of universal digital access" },
    { year: "2023", event: "First 1,000 users onboarded — voice assistant beta launched" },
    { year: "2024", event: "AI screen reader released, 25,000 users across 20 countries" },
    { year: "2025", event: "Gesture control launched, partnerships with 50+ organizations" },
    { year: "2026", event: "120,000+ global users, recognized by WHO as a key accessibility tool" },
];

export default function ImpactPage() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 72 }}>
                {/* Hero */}
                <section
                    style={{
                        background: "linear-gradient(135deg, #0f2d56 0%, #1a3f7a 100%)",
                        padding: "80px 24px",
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
                            background: "rgba(52,211,153,0.15)",
                            border: "1px solid rgba(52,211,153,0.4)",
                            color: "#6ee7b7",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            marginBottom: 24,
                        }}
                    >
                        🌱 Real Change, Real People
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(2.5rem, 6vw, 4rem)",
                            fontWeight: 900,
                            color: "#ffffff",
                            marginBottom: 20,
                        }}
                    >
                        Our{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, #38bdf8, #34d399)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Impact
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
                        Every feature we build, every line of code we write — it&apos;s all in service of
                        making the digital world a place where everyone belongs.
                    </p>
                </section>

                {/* Stats Grid */}
                <section style={{ padding: "80px 24px", background: "#f0f9ff" }}>
                    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                gap: 28,
                            }}
                        >
                            {impactStats.map((s) => (
                                <div
                                    key={s.label}
                                    style={{
                                        background: "white",
                                        borderRadius: 20,
                                        padding: "40px 24px",
                                        textAlign: "center",
                                        boxShadow: "0 4px 24px rgba(15,45,86,0.08)",
                                        border: `1px solid ${s.color}30`,
                                    }}
                                    className="hover-lift"
                                >
                                    <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{s.icon}</div>
                                    <div
                                        style={{
                                            fontSize: "2.5rem",
                                            fontWeight: 900,
                                            color: s.color,
                                            marginBottom: 8,
                                        }}
                                    >
                                        {s.value}
                                    </div>
                                    <div style={{ color: "#4b6a8a", fontWeight: 500 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* User Stories */}
                <section style={{ padding: "80px 24px", background: "white" }}>
                    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                        <h2
                            style={{
                                textAlign: "center",
                                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                                fontWeight: 800,
                                color: "#0f2d56",
                                marginBottom: 16,
                            }}
                        >
                            Real Stories from Real Users
                        </h2>
                        <p
                            style={{
                                textAlign: "center",
                                color: "#4b6a8a",
                                fontSize: "1.05rem",
                                marginBottom: 56,
                            }}
                        >
                            Hear how AccessEase has changed lives around the world.
                        </p>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: 28,
                            }}
                        >
                            {stories.map((story) => (
                                <div
                                    key={story.name}
                                    style={{
                                        background: "linear-gradient(145deg, #f0f9ff, #e8f4fd)",
                                        borderRadius: 20,
                                        padding: "36px 28px",
                                        border: "1px solid rgba(56,189,248,0.2)",
                                        boxShadow: "0 4px 20px rgba(15,45,86,0.07)",
                                    }}
                                >
                                    <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{story.emoji}</div>
                                    <p
                                        style={{
                                            color: "#1e3a5a",
                                            fontSize: "1rem",
                                            lineHeight: 1.7,
                                            fontStyle: "italic",
                                            marginBottom: 20,
                                        }}
                                    >
                                        &ldquo;{story.quote}&rdquo;
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div
                                            style={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: "50%",
                                                background: "linear-gradient(135deg, #38bdf8, #34d399)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#0f2d56",
                                                fontWeight: 700,
                                                fontSize: "1.1rem",
                                            }}
                                        >
                                            {story.name[0]}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: "#0f2d56", fontSize: "0.95rem" }}>
                                                {story.name}
                                            </div>
                                            <div style={{ color: "#38bdf8", fontSize: "0.8rem" }}>
                                                {story.disability} · {story.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section style={{ padding: "80px 24px", background: "#f0f9ff" }}>
                    <div style={{ maxWidth: 800, margin: "0 auto" }}>
                        <h2
                            style={{
                                textAlign: "center",
                                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                                fontWeight: 800,
                                color: "#0f2d56",
                                marginBottom: 56,
                            }}
                        >
                            Our Journey
                        </h2>
                        <div style={{ position: "relative" }}>
                            {/* Line */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: 0,
                                    bottom: 0,
                                    width: 2,
                                    background: "linear-gradient(180deg, #38bdf8, #34d399)",
                                    transform: "translateX(-50%)",
                                }}
                            />
                            {milestones.map((m, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: 40,
                                        flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "45%",
                                            padding: "20px 24px",
                                            background: "white",
                                            borderRadius: 16,
                                            boxShadow: "0 4px 20px rgba(15,45,86,0.08)",
                                            border: "1px solid rgba(56,189,248,0.2)",
                                        }}
                                    >
                                        <div
                                            style={{ color: "#38bdf8", fontWeight: 700, marginBottom: 6 }}
                                        >
                                            {m.year}
                                        </div>
                                        <p style={{ color: "#1e3a5a", fontSize: "0.9rem", lineHeight: 1.6 }}>
                                            {m.event}
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            width: "10%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 16,
                                                height: 16,
                                                borderRadius: "50%",
                                                background: "linear-gradient(135deg, #38bdf8, #34d399)",
                                                boxShadow: "0 0 15px rgba(56,189,248,0.5)",
                                            }}
                                        />
                                    </div>
                                    <div style={{ width: "45%" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
