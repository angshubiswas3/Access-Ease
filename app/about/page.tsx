import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: "About Us – AccessEase",
    description:
        "Learn about the AccessEase team, our mission to make the web universally accessible, and our commitment to disability inclusion.",
};

const team = [
    {
        name: "Angshu Biswas",
        role: "Founder & CEO",
        bio: "Passionate about building technology that truly serves everyone. On a mission to eliminate digital barriers.",
        emoji: "👨‍💻",
    },
    {
        name: "AI Research Lead",
        role: "Head of AI",
        bio: "Building the state-of-the-art models that power our accessibility features.",
        emoji: "🧠",
    },
    {
        name: "Design Director",
        role: "UX & Accessibility",
        bio: "Ensuring our interfaces are intuitive and meet the highest accessibility standards.",
        emoji: "🎨",
    },
];

const values = [
    {
        icon: "🌍",
        title: "Universal Access",
        desc: "We believe every person deserves full access to the digital world, regardless of disability.",
    },
    {
        icon: "🤝",
        title: "Community First",
        desc: "We build with and for the disability community, not just for them. Every feature is co-designed.",
    },
    {
        icon: "🔬",
        title: "Science-Driven",
        desc: "Our tools are grounded in the latest research in AI, HCI, and accessibility science.",
    },
    {
        icon: "🔒",
        title: "Privacy by Design",
        desc: "We never sell data. Voice processing happens locally, and you own your information.",
    },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 72 }}>
                {/* Hero */}
                <section
                    style={{
                        background: "linear-gradient(135deg, #0f2d56, #1a3f7a)",
                        padding: "80px 24px",
                        textAlign: "center",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "clamp(2.5rem, 6vw, 4rem)",
                            fontWeight: 900,
                            color: "#ffffff",
                            marginBottom: 20,
                        }}
                    >
                        About{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, #38bdf8, #34d399)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            AccessEase
                        </span>
                    </h1>
                    <p
                        style={{
                            color: "rgba(255,255,255,0.75)",
                            fontSize: "1.15rem",
                            maxWidth: 600,
                            margin: "0 auto",
                            lineHeight: 1.7,
                        }}
                    >
                        We&apos;re a team of engineers, designers, and advocates united by a single belief:
                        the internet should be for everyone.
                    </p>
                </section>

                {/* Mission */}
                <section style={{ padding: "80px 24px", background: "#f0f9ff" }}>
                    <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
                        <h2
                            style={{
                                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                                fontWeight: 800,
                                color: "#0f2d56",
                                marginBottom: 24,
                            }}
                        >
                            Our Mission
                        </h2>
                        <p
                            style={{
                                fontSize: "1.15rem",
                                color: "#4b6a8a",
                                lineHeight: 1.8,
                                maxWidth: 700,
                                margin: "0 auto 40px",
                            }}
                        >
                            AccessEase exists to tear down every digital barrier that prevents people with
                            disabilities from participating fully in online life. We do this by building
                            powerful, beautiful, and easy-to-use AI-powered accessibility tools — and we&apos;ll
                            never stop until the web is truly universal.
                        </p>
                        <div
                            style={{
                                display: "inline-flex",
                                gap: 12,
                                padding: "20px 32px",
                                background: "linear-gradient(135deg, #0f2d56, #1a3f7a)",
                                borderRadius: 20,
                                color: "white",
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                boxShadow: "0 8px 30px rgba(15,45,86,0.25)",
                            }}
                        >
                            🎯 &ldquo;Accessible by default, not as an afterthought.&rdquo;
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section style={{ padding: "80px 24px", background: "white" }}>
                    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                        <h2
                            style={{
                                textAlign: "center",
                                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                                fontWeight: 800,
                                color: "#0f2d56",
                                marginBottom: 56,
                            }}
                        >
                            Our Values
                        </h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                                gap: 28,
                            }}
                        >
                            {values.map((v) => (
                                <div
                                    key={v.title}
                                    style={{
                                        background: "#f0f9ff",
                                        borderRadius: 20,
                                        padding: "36px 28px",
                                        border: "1px solid rgba(56,189,248,0.2)",
                                    }}
                                >
                                    <div style={{ fontSize: "2rem", marginBottom: 16 }}>{v.icon}</div>
                                    <h3
                                        style={{
                                            fontWeight: 700,
                                            fontSize: "1.15rem",
                                            color: "#0f2d56",
                                            marginBottom: 10,
                                        }}
                                    >
                                        {v.title}
                                    </h3>
                                    <p style={{ color: "#4b6a8a", lineHeight: 1.6, fontSize: "0.9rem" }}>
                                        {v.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section style={{ padding: "80px 24px", background: "#f0f9ff" }}>
                    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                        <h2
                            style={{
                                textAlign: "center",
                                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                                fontWeight: 800,
                                color: "#0f2d56",
                                marginBottom: 56,
                            }}
                        >
                            Meet the Team
                        </h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                                gap: 28,
                            }}
                        >
                            {team.map((member) => (
                                <div
                                    key={member.name}
                                    style={{
                                        background: "white",
                                        borderRadius: 20,
                                        padding: "40px 28px",
                                        textAlign: "center",
                                        boxShadow: "0 4px 24px rgba(15,45,86,0.08)",
                                        border: "1px solid rgba(56,189,248,0.15)",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #38bdf8, #34d399)",
                                            fontSize: "2.5rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto 20px",
                                        }}
                                    >
                                        {member.emoji}
                                    </div>
                                    <h3
                                        style={{
                                            fontWeight: 700,
                                            fontSize: "1.1rem",
                                            color: "#0f2d56",
                                            marginBottom: 4,
                                        }}
                                    >
                                        {member.name}
                                    </h3>
                                    <div
                                        style={{ color: "#38bdf8", fontWeight: 600, fontSize: "0.85rem", marginBottom: 12 }}
                                    >
                                        {member.role}
                                    </div>
                                    <p style={{ color: "#4b6a8a", fontSize: "0.9rem", lineHeight: 1.6 }}>
                                        {member.bio}
                                    </p>
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

