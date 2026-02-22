import Link from "next/link";

export default function Footer() {
    return (
        <footer
            style={{
                background: "linear-gradient(135deg, #0f2d56 0%, #0c3547 100%)",
                color: "rgba(255,255,255,0.8)",
                padding: "60px 24px 30px",
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Top Row */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr",
                        gap: "40px",
                        marginBottom: "48px",
                    }}
                >
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                fontWeight: 800,
                                fontSize: "1.4rem",
                                color: "#ffffff",
                                marginBottom: "16px",
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
                                }}
                            >
                                ♿
                            </span>
                            Access<span style={{ color: "#38bdf8" }}>Ease</span>
                        </Link>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 280 }}>
                            Empowering people with disabilities through AI-powered accessibility tools.
                            Making the digital world accessible for everyone.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "16px" }}>
                            Product
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {["Features", "Voice Assistant", "Impact", "Pricing"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                                    style={{ fontSize: "0.875rem" }}
                                    className="footer-link"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "16px" }}>
                            Company
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {["About", "Blog", "Careers", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    style={{ fontSize: "0.875rem" }}
                                    className="footer-link"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "16px" }}>
                            Legal
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {["Privacy Policy", "Terms of Service", "Accessibility"].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    style={{ fontSize: "0.875rem" }}
                                    className="footer-link"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div
                    style={{
                        borderTop: "1px solid rgba(56,189,248,0.2)",
                        paddingTop: "24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                    }}
                >
                    <p style={{ fontSize: "0.85rem" }}>
                        © 2026 AccessEase. All rights reserved.
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#38bdf8" }}>
                        Built with ♿ for everyone
                    </p>
                </div>
            </div>
        </footer>
    );
}
