import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Create Account – AccessEase",
    description: "Create your free AccessEase account and start using accessibility tools today.",
};

export default function SignupPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f2d56 0%, #1a3f7a 50%, #0c3547 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "-10%",
                    left: "-10%",
                    width: 500,
                    height: 500,
                    background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-10%",
                    right: "-10%",
                    width: 400,
                    height: 400,
                    background: "radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 65%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    width: "100%",
                    maxWidth: 440,
                    background: "rgba(255,255,255,0.97)",
                    borderRadius: 28,
                    padding: "48px 40px",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
                    border: "1px solid rgba(56,189,248,0.2)",
                }}
            >
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontWeight: 800,
                        fontSize: "1.3rem",
                        color: "#0f2d56",
                        marginBottom: 32,
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
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

                <h1
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: 800,
                        color: "#0f2d56",
                        marginBottom: 6,
                        textAlign: "center",
                    }}
                >
                    Get started free
                </h1>
                <p style={{ color: "#4b6a8a", textAlign: "center", marginBottom: 32, fontSize: "0.95rem" }}>
                    Create your account in seconds
                </p>

                <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 12,
                        }}
                    >
                        <div>
                            <label
                                htmlFor="first-name"
                                style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0f2d56", marginBottom: 6 }}
                            >
                                First name
                            </label>
                            <input
                                id="first-name"
                                type="text"
                                placeholder="Jane"
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    borderRadius: 12,
                                    border: "1.5px solid #c3dff4",
                                    fontSize: "0.9rem",
                                    color: "#0f2d56",
                                    background: "#f0f9ff",
                                }}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="last-name"
                                style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0f2d56", marginBottom: 6 }}
                            >
                                Last name
                            </label>
                            <input
                                id="last-name"
                                type="text"
                                placeholder="Doe"
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    borderRadius: 12,
                                    border: "1.5px solid #c3dff4",
                                    fontSize: "0.9rem",
                                    color: "#0f2d56",
                                    background: "#f0f9ff",
                                }}
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="signup-email"
                            style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0f2d56", marginBottom: 6 }}
                        >
                            Email address
                        </label>
                        <input
                            id="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                borderRadius: 12,
                                border: "1.5px solid #c3dff4",
                                fontSize: "0.95rem",
                                color: "#0f2d56",
                                background: "#f0f9ff",
                            }}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="signup-password"
                            style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0f2d56", marginBottom: 6 }}
                        >
                            Password
                        </label>
                        <input
                            id="signup-password"
                            type="password"
                            placeholder="Choose a strong password"
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                borderRadius: 12,
                                border: "1.5px solid #c3dff4",
                                fontSize: "0.95rem",
                                color: "#0f2d56",
                                background: "#f0f9ff",
                            }}
                            className="input-field"
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            fontSize: "0.85rem",
                            color: "#4b6a8a",
                        }}
                    >
                        <input id="terms" type="checkbox" style={{ marginTop: 2, accentColor: "#38bdf8" }} />
                        <label htmlFor="terms">
                            I agree to the{" "}
                            <Link href="#" style={{ color: "#38bdf8", fontWeight: 600 }}>
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="#" style={{ color: "#38bdf8", fontWeight: 600 }}>
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        id="signup-btn"
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: 50,
                            background: "linear-gradient(90deg, #38bdf8, #34d399)",
                            color: "#0f2d56",
                            fontWeight: 700,
                            fontSize: "1rem",
                            cursor: "pointer",
                            boxShadow: "0 6px 20px rgba(56,189,248,0.4)",
                            marginTop: 4,
                        }}
                        className="btn-auth-zoom"
                    >
                        Create Account
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: 24, color: "#4b6a8a", fontSize: "0.9rem" }}>
                    Already have an account?{" "}
                    <Link href="/auth/login" style={{ color: "#38bdf8", fontWeight: 700 }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
