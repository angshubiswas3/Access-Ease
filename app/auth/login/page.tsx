import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign In – AccessEase",
    description: "Sign in to your AccessEase account.",
};

export default function LoginPage() {
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
            {/* Decorative blob */}
            <div
                style={{
                    position: "absolute",
                    top: "-10%",
                    right: "-10%",
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
                    left: "-10%",
                    width: 400,
                    height: 400,
                    background: "radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 65%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                }}
            />

            {/* Card */}
            <div
                style={{
                    width: "100%",
                    maxWidth: 420,
                    background: "rgba(255,255,255,0.97)",
                    borderRadius: 28,
                    padding: "48px 40px",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
                    border: "1px solid rgba(56,189,248,0.2)",
                }}
            >
                {/* Logo */}
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
                    Welcome back
                </h1>
                <p style={{ color: "#4b6a8a", textAlign: "center", marginBottom: 32, fontSize: "0.95rem" }}>
                    Sign in to your AccessEase account
                </p>

                <form style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div>
                        <label
                            htmlFor="email"
                            style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0f2d56", marginBottom: 6 }}
                        >
                            Email address
                        </label>
                        <input
                            id="email"
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
                            htmlFor="password"
                            style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "#0f2d56", marginBottom: 6 }}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
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

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Link href="#" style={{ fontSize: "0.85rem", color: "#38bdf8", fontWeight: 600 }}>
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        id="login-btn"
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
                        }}
                        className="btn-auth-zoom"
                    >
                        Sign In
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: 28, color: "#4b6a8a", fontSize: "0.9rem" }}>
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/signup"
                        style={{ color: "#38bdf8", fontWeight: 700 }}
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
