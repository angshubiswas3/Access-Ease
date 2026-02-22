"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Message = {
    role: "user" | "assistant";
    text: string;
    timestamp: Date;
};

export default function VoiceAssistantPage() {
    const router = useRouter();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            text: "Hello! I'm your AccessEase voice assistant. I can help you navigate to the Dashboard, Features, Scanner, Sign Language, Emergency, or Settings. Just say 'Go to dashboard' or 'Open settings'.",
            timestamp: new Date(),
        },
    ]);
    const [isBrowserSupported, setIsBrowserSupported] = useState(true);
    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hasSpeechRecognition =
            typeof window !== "undefined" &&
            ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
        if (!hasSpeechRecognition) {
            setTimeout(() => setIsBrowserSupported(false), 0);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const speak = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.95;
            utterance.pitch = 1.05;
            window.speechSynthesis.speak(utterance);
        }
    };

    const generateResponse = (userText: string): string => {
        const lower = userText.toLowerCase().trim();

        // Navigation commands
        if (lower.includes("dashboard")) {
            setTimeout(() => router.push("/dashboard"), 1200);
            return "Sure, I'm opening your personal dashboard right now.";
        }
        if (lower.includes("emergency") || lower.includes("sos") || lower.includes("help me")) {
            setTimeout(() => router.push("/emergency"), 800);
            return "Emergency SOS mode activated. Redirecting you to help immediately.";
        }
        if (lower.includes("scan") || lower.includes("scanner")) {
            setTimeout(() => router.push("/scanner"), 1200);
            return "Opening the WCAG accessibility scanner tool.";
        }
        if (lower.includes("sign language") || lower.includes("gesture") || lower.includes("camera")) {
            setTimeout(() => router.push("/sign-language"), 1200);
            return "Opening the sign language recognition camera.";
        }
        if (lower.includes("form") || lower.includes("autofill") || lower.includes("assistant")) {
            setTimeout(() => router.push("/form-assistant"), 1200);
            return "Launching the smart form assistant.";
        }
        if (lower.includes("settings") || lower.includes("preference") || lower.includes("config")) {
            setTimeout(() => router.push("/settings"), 1200);
            return "Opening your accessibility settings.";
        }
        if (lower.includes("home") || lower.includes("main page")) {
            setTimeout(() => router.push("/"), 1200);
            return "Going back to the home page.";
        }
        if (lower.includes("feature")) {
            setTimeout(() => router.push("/features"), 1200);
            return "Opening our features overview.";
        }
        if (lower.includes("impact") || lower.includes("roadmap")) {
            setTimeout(() => router.push("/impact"), 1200);
            return "Opening the impact and roadmap page.";
        }

        // Informational
        if (lower.includes("hello") || lower.includes("hi")) {
            return "Hello! I'm your AI accessibility assistant. How can I help you navigate today?";
        }
        if (lower.includes("what can you do") || lower.includes("help")) {
            return "I can help you navigate to any part of AccessEase. Try saying 'Go to dashboard', 'Open scanner', 'Start sign language assistant', or 'Open emergency SOS'.";
        }
        if (lower.includes("thank")) {
            return "You're very welcome! I'm here to make your experience smoother.";
        }

        return `I heard: "${userText}". Try saying 'Go to dashboard' or 'Open settings' to navigate the platform.`;
    };

    const startListening = () => {
        if (!isBrowserSupported) return;

        const SpeechRecognitionAPI =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognitionAPI) return;

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            const current = event.resultIndex;
            const result = event.results[current];
            const text = result[0].transcript;
            setTranscript(text);

            if (result.isFinal) {
                const userMessage: Message = {
                    role: "user",
                    text,
                    timestamp: new Date(),
                };
                const response = generateResponse(text);
                const assistantMessage: Message = {
                    role: "assistant",
                    text: response,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, userMessage, assistantMessage]);
                speak(response);
                setTranscript("");
            }
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setIsListening(false);
    };

    const clearChat = () => {
        setMessages([
            {
                role: "assistant",
                text: "Chat cleared. How can I assist you?",
                timestamp: new Date(),
            },
        ]);
    };

    return (
        <>
            <Navbar />
            <main
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(150deg, #0f2d56 0%, #1a3f7a 100%)",
                    paddingTop: 100,
                    color: "white",
                }}
            >
                <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 16 }}>Voice AI Command Center</h1>
                        <p style={{ color: "rgba(255,255,255,0.7)" }}>Speech-to-navigation assistant for a hands-free web experience.</p>
                    </div>

                    {!isBrowserSupported && (
                        <div style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 12, padding: 16, color: "#fecaca", marginBottom: 24, textAlign: "center" }}>
                            ⚠️ Browser Speech Recognition not supported. Please use Chrome.
                        </div>
                    )}

                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)", padding: 24, height: 450, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: 12 }}>
                                <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: 16, background: msg.role === "user" ? "#38bdf8" : "rgba(255,255,255,0.1)", color: msg.role === "user" ? "#0f2d56" : "white" }}>
                                    {msg.text}
                                    <div style={{ fontSize: "0.7rem", marginTop: 4, opacity: 0.6 }}>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </div>
                            </div>
                        ))}
                        {transcript && (
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <div style={{ padding: "12px 16px", borderRadius: 16, background: "rgba(56,189,248,0.3)", fontStyle: "italic", color: "white" }}>{transcript}...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
                        <button
                            onClick={isListening ? stopListening : startListening}
                            style={{
                                width: 80, height: 80, borderRadius: "50%",
                                border: "none", cursor: "pointer", fontSize: "2rem",
                                background: isListening ? "#ef4444" : "linear-gradient(135deg, #38bdf8, #34d399)",
                                boxShadow: isListening ? "0 0 30px rgba(239,68,68,0.5)" : "0 0 30px rgba(56,189,248,0.4)",
                                transition: "all 0.3s ease",
                                animation: isListening ? "pulse-voice 1.5s infinite" : "none"
                            }}
                        >
                            {isListening ? "🛑" : "🎙️"}
                        </button>
                        <p style={{ fontWeight: 600, color: isListening ? "#38bdf8" : "white" }}>
                            {isListening ? "Listening... Speak now" : "Tap the microphone to start"}
                        </p>
                        <button onClick={clearChat} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "8px 20px", borderRadius: 20, cursor: "pointer", fontSize: "0.85rem" }}>Clear Chat</button>
                    </div>
                </div>
                <style>{`
                    @keyframes pulse-voice {
                        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
                        70% { transform: scale(1.1); box-shadow: 0 0 0 20px rgba(239,68,68,0); }
                        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239,68,68,0); }
                    }
                `}</style>
            </main>
            <Footer />
        </>
    );
}
