import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f2d56 0%, #1a3f7a 50%, #0c3547 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "24px",
            }}
        >
            <div
                style={{
                    fontSize: "8rem",
                    fontWeight: 900,
                    background: "linear-gradient(90deg, #38bdf8, #34d399)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                    marginBottom: 16,
                }}
            >
                404
            </div>
            <h1
                style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: 12,
                }}
            >
                Page Not Found
            </h1>
            <p
                style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "1.05rem",
                    maxWidth: 400,
                    marginBottom: 40,
                    lineHeight: 1.6,
                }}
            >
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back on track.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                <Link
                    href="/"
                    style={{
                        padding: "14px 32px",
                        borderRadius: 50,
                        fontWeight: 700,
                        background: "linear-gradient(90deg, #38bdf8, #34d399)",
                        color: "#0f2d56",
                        boxShadow: "0 8px 25px rgba(56,189,248,0.4)",
                    }}
                >
                    Go Home
                </Link>
                <Link
                    href="/features"
                    style={{
                        padding: "14px 32px",
                        borderRadius: 50,
                        fontWeight: 600,
                        background: "transparent",
                        color: "#7dd3fc",
                        border: "2px solid rgba(56,189,248,0.4)",
                    }}
                >
                    View Features
                </Link>
            </div>
        </div>
    );
}
