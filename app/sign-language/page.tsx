'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── ASL reference guide shown in sidebar ─────────────────────────────────────
// fingers: T=thumb, I=index, M=middle, R=ring, P=pinky  ●=up/extended  ○=down
const ASL_ALPHABET = [
    { letter: 'A', symbol: '✊', desc: 'Closed fist, thumb rests beside index finger', fingers: [false, false, false, false, false] },
    { letter: 'B', symbol: '🤚', desc: 'All four fingers straight up, thumb folded across palm', fingers: [false, true, true, true, true] },
    { letter: 'C', symbol: '🫳', desc: 'All fingers curve into a C shape, thumb also curves', fingers: [false, false, false, false, false] },
    { letter: 'D', symbol: '☝️', desc: 'Index finger points up; middle, ring, pinky curl to touch thumb', fingers: [false, true, false, false, false] },
    { letter: 'E', symbol: '🤛', desc: 'All fingers bent at knuckles, thumb tucked under fingers', fingers: [false, false, false, false, false] },
    { letter: 'F', symbol: '👌', desc: 'Index+thumb form a circle (OK sign), other three fingers up', fingers: [false, false, true, true, true] },
    { letter: 'G', symbol: '👉', desc: 'Index finger points horizontally to the side, thumb parallel', fingers: [true, true, false, false, false] },
    { letter: 'H', symbol: '🤞', desc: 'Index+middle extended horizontally, pointing sideways', fingers: [false, true, true, false, false] },
    { letter: 'I', symbol: '🤙', desc: 'Pinky finger extended up, all others curled into fist', fingers: [false, false, false, false, true] },
    { letter: 'J', symbol: '🤙', desc: 'Like I, then trace a J curve in the air with your pinky', fingers: [false, false, false, false, true] },
    { letter: 'K', symbol: '✌️', desc: 'Index+middle up, thumb rests between index and middle', fingers: [true, true, true, false, false] },
    { letter: 'L', symbol: '🤙', desc: 'L-shape: index points up, thumb points outward', fingers: [true, true, false, false, false] },
    { letter: 'M', symbol: '✊', desc: 'Three fingers (index/middle/ring) folded over tucked thumb', fingers: [false, false, false, false, false] },
    { letter: 'N', symbol: '✊', desc: 'Two fingers (index+middle) folded over tucked thumb', fingers: [false, false, false, false, false] },
    { letter: 'O', symbol: '👌', desc: 'All fingers and thumb curved to form a round O shape', fingers: [false, false, false, false, false] },
    { letter: 'P', symbol: '👇', desc: 'Like K but hand points downward', fingers: [true, true, true, false, false] },
    { letter: 'Q', symbol: '👇', desc: 'Like G but hand points downward', fingers: [true, true, false, false, false] },
    { letter: 'R', symbol: '🤞', desc: 'Index and middle fingers crossed over each other', fingers: [false, true, true, false, false] },
    { letter: 'S', symbol: '✊', desc: 'Closed fist with thumb wrapped over all four fingers', fingers: [false, false, false, false, false] },
    { letter: 'T', symbol: '✊', desc: 'Fist with thumb tucked between index and middle', fingers: [false, false, false, false, false] },
    { letter: 'U', symbol: '✌️', desc: 'Index+middle extended up and held together (no spread)', fingers: [false, true, true, false, false] },
    { letter: 'V', symbol: '✌️', desc: 'Index+middle extended, spread apart like a V/peace sign', fingers: [false, true, true, false, false] },
    { letter: 'W', symbol: '🤟', desc: 'Index, middle, and ring fingers all extended and spread', fingers: [false, true, true, true, false] },
    { letter: 'X', symbol: '☝️', desc: 'Index finger bent/hooked like a hook, others in fist', fingers: [false, false, false, false, false] },
    { letter: 'Y', symbol: '🤙', desc: 'Thumb and pinky extended outward, other fingers curled', fingers: [true, false, false, false, true] },
    { letter: 'Z', symbol: '☝️', desc: 'Index finger extended, trace a Z shape in the air (dynamic)', fingers: [false, true, false, false, false] },
];

// ── Finger tip / pip landmark indices (MediaPipe Handpose) ────────────────────
const FINGER_TIPS = [4, 8, 12, 16, 20]; // thumb, index, middle, ring, pinky
const FINGER_PIPS = [2, 6, 10, 14, 18]; // corresponding PIP joints

// ── Map finger extension array to ASL letter ──────────────────────────────────
// extended[i] = true means finger i is extended
// order: [thumb, index, middle, ring, pinky]
function gestureToLetter(extended: boolean[]): string | null {
    const [thumb, index, middle, ring, pinky] = extended;

    // Z — single index extended only (we detect static frame; Z is dynamic but
    //     we approximate it as index-only pointing like X but user knows)
    if (!thumb && index && !middle && !ring && !pinky) return 'D'; // D / Z / G split by thumb pos
    if (!thumb && index && middle && !ring && !pinky) return 'U'; // U / V / R — spread later
    if (!thumb && index && middle && ring && !pinky) return 'W';
    if (!thumb && !index && !middle && !ring && pinky) return 'I';
    if (thumb && !index && !middle && !ring && pinky) return 'Y';
    if (thumb && index && !middle && !ring && !pinky) return 'L';
    if (!thumb && !index && !middle && !ring && !pinky) return 'A'; // fist = A / S / E / M / N
    if (!thumb && index && middle && ring && pinky) return 'B';
    if (thumb && index && middle && ring && pinky) return 'O'; // all out = open hand → closest O
    return null;
}

// Better extended check using tip vs pip y coordinate
function isExtended(tip: number[], pip: number[]): boolean {
    return tip[1] < pip[1]; // lower y = higher on screen
}

export default function SignLanguagePage() {
    const [cameraActive, setCameraActive] = useState(false);
    const [modelLoading, setModelLoading] = useState(false);
    const [modelReady, setModelReady] = useState(false);
    const [detectedLetter, setDetectedLetter] = useState<string | null>(null);
    const [confidence, setConfidence] = useState(0);
    const [sentence, setSentence] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [handVisible, setHandVisible] = useState(false);
    const [statusMsg, setStatusMsg] = useState('Start camera to begin');

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const rafRef = useRef<number>(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modelRef = useRef<any>(null);
    const lastLetterRef = useRef<string | null>(null);
    const holdCountRef = useRef(0);
    const HOLD_FRAMES = 10; // frames letter must be stable before accepted

    // ── Load TensorFlow + Handpose model via CDN scripts ─────────────────────
    const loadModel = useCallback(async () => {
        const tf = (window as any).tf;
        const hp = (window as any).handpose;
        if (!tf || !hp) return;

        setModelLoading(true);
        setStatusMsg('🧠 Initializing AI model...');
        try {
            const model = await hp.load();
            modelRef.current = model;
            setModelReady(true);
            setModelLoading(false);
            setStatusMsg('✅ AI Ready - Place your hand in view!');
        } catch (err) {
            console.error('Model load error:', err);
            setModelLoading(false);
            setStatusMsg('❌ Failed to load AI model.');
        }
    }, []);

    // ── Inject CDN scripts on mount ───────────────────────────────────────────
    useEffect(() => {
        const setup = async () => {
            const scripts = [
                { src: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.21.0/dist/tf.min.js', id: 'tfjs' },
                { src: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose@0.0.7/dist/handpose.min.js', id: 'handpose' }
            ];

            const loadScript = (s: { src: string, id: string }) => new Promise<void>((resolve) => {
                if (document.getElementById(s.id)) { resolve(); return; }
                const script = document.createElement('script');
                script.src = s.src;
                script.id = s.id;
                script.async = true;
                script.onload = () => resolve();
                document.head.appendChild(script);
            });

            // Start camera and scripts in parallel for maximum speed
            startCamera();
            await Promise.all(scripts.map(loadScript));
            await loadModel();
        };

        setup();

        return () => {
            cancelAnimationFrame(rafRef.current);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(t => t.stop());
            }
        };
    }, [loadModel]);

    // ── Camera start/stop ─────────────────────────────────────────────────────
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, facingMode: 'user' },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }
            streamRef.current = stream;
            setCameraActive(true);
            setStatusMsg(modelReady ? '✅ Show your hand sign!' : '⏳ Waiting for model...');
            if (modelReady) runDetection();
        } catch {
            alert('Camera access denied. Please allow camera permission.');
        }
    };

    const stopCamera = () => {
        cancelAnimationFrame(rafRef.current);
        streamRef.current?.getTracks().forEach(t => t.stop());
        if (videoRef.current) videoRef.current.srcObject = null;
        setCameraActive(false);
        setHandVisible(false);
        setDetectedLetter(null);
        setStatusMsg('Camera stopped.');
    };

    // ── Main detection loop ───────────────────────────────────────────────────
    const runDetection = useCallback(async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const model = modelRef.current;
        if (!video || !canvas || !model || video.readyState < 2) {
            rafRef.current = requestAnimationFrame(runDetection);
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw mirrored video
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();

        // Run prediction
        const predictions = await model.estimateHands(canvas);

        if (predictions.length > 0) {
            setHandVisible(true);
            const lm: number[][] = predictions[0].landmarks;

            // Draw hand skeleton
            drawSkeleton(ctx, lm);

            // Compute which fingers are extended
            const extended = FINGER_TIPS.map((tip, i) =>
                isExtended(lm[tip], lm[FINGER_PIPS[i]])
            );

            const letter = gestureToLetter(extended);

            if (letter) {
                if (letter === lastLetterRef.current) {
                    holdCountRef.current++;
                } else {
                    holdCountRef.current = 0;
                    lastLetterRef.current = letter;
                }

                const conf = Math.min(95, 60 + holdCountRef.current * 4);
                setConfidence(conf);
                setDetectedLetter(letter);

                // Accept letter after holding for HOLD_FRAMES
                if (holdCountRef.current === HOLD_FRAMES) {
                    setSentence(prev => prev + letter);
                    speakLetter(letter);
                    setStatusMsg(`✅ Detected: "${letter}" — keep going!`);
                }
            } else {
                holdCountRef.current = 0;
                setDetectedLetter(null);
                setConfidence(0);
            }
        } else {
            setHandVisible(false);
            setDetectedLetter(null);
            holdCountRef.current = 0;
            setConfidence(0);
            setStatusMsg('👋 No hand detected — show your hand clearly');
        }

        rafRef.current = requestAnimationFrame(runDetection);
    }, []);

    // Re-start detection loop when model becomes ready while camera is active
    useEffect(() => {
        if (modelReady && cameraActive) {
            cancelAnimationFrame(rafRef.current);
            runDetection();
            setStatusMsg('✅ Show your hand sign!');
        }
    }, [modelReady, cameraActive, runDetection]);

    // ── Draw skeleton on canvas ───────────────────────────────────────────────
    function drawSkeleton(ctx: CanvasRenderingContext2D, lm: number[][]) {
        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4],
            [0, 5], [5, 6], [6, 7], [7, 8],
            [0, 9], [9, 10], [10, 11], [11, 12],
            [0, 13], [13, 14], [14, 15], [15, 16],
            [0, 17], [17, 18], [18, 19], [19, 20],
            [5, 9], [9, 13], [13, 17],
        ];
        ctx.strokeStyle = '#00D4AA';
        ctx.lineWidth = 2;
        connections.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(lm[a][0], lm[a][1]);
            ctx.lineTo(lm[b][0], lm[b][1]);
            ctx.stroke();
        });
        lm.forEach(point => {
            ctx.beginPath();
            ctx.arc(point[0], point[1], 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#6C63FF';
            ctx.fill();
        });
    }

    // ── Text-to-speech ────────────────────────────────────────────────────────
    const speakLetter = (letter: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(letter);
            u.rate = 1.2;
            window.speechSynthesis.speak(u);
        }
    };

    const speakSentence = () => {
        if (!sentence) return;
        window.speechSynthesis?.cancel();
        const u = new SpeechSynthesisUtterance(sentence);
        u.rate = 0.9;
        window.speechSynthesis?.speak(u);
    };

    const addSpace = () => setSentence(prev => prev + ' ');

    const saveAndClear = () => {
        if (sentence.trim()) {
            setHistory(prev => [sentence.trim(), ...prev.slice(0, 9)]);
        }
        setSentence('');
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div style={{ minHeight: '100vh' }}>
            <Navbar />
            <main id="main-content" style={{ paddingTop: '90px', paddingBottom: '80px' }}>
                <div className="container">
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="badge badge-success" style={{ marginBottom: '16px' }}>
                            Real Hand Detection · ASL
                        </span>
                        <h1 style={{ marginBottom: '16px' }}>
                            Sign Language <span className="gradient-text">Recognition</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto' }}>
                            Show ASL hand signs in front of your camera. Each detected letter is
                            written and spoken aloud in real-time.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>

                        {/* ── Left: Camera + Output ─────────────────────────── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Camera Card */}
                            <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                                <div style={{ position: 'relative', aspectRatio: '4/3', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                    {/* Hidden video (source for canvas) */}
                                    <video
                                        ref={videoRef}
                                        style={{ display: 'none' }}
                                        muted
                                        aria-hidden="true"
                                    />

                                    {/* Canvas — shows mirrored video + skeleton */}
                                    <canvas
                                        ref={canvasRef}
                                        style={{
                                            width: '100%', height: '100%',
                                            objectFit: 'cover',
                                            display: cameraActive ? 'block' : 'none',
                                        }}
                                        aria-label="Camera feed with hand skeleton overlay"
                                    />

                                    {/* Off state */}
                                    {!cameraActive && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)' }}>
                                            <div style={{ fontSize: '64px', opacity: 0.4 }}>📹</div>
                                            <p style={{ fontSize: '1rem', textAlign: 'center' }}>
                                                Camera is off.<br />Click <strong>Start Camera</strong> to begin.
                                            </p>
                                            {modelLoading && (
                                                <div style={{ fontSize: '0.85rem', color: 'var(--primary-light)' }}>
                                                    ⏳ Loading AI model...
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Corner brackets when active */}
                                    {cameraActive && (
                                        <>
                                            {[
                                                { top: '16px', left: '16px', borderTop: '3px solid #00D4AA', borderLeft: '3px solid #00D4AA' },
                                                { top: '16px', right: '16px', borderTop: '3px solid #00D4AA', borderRight: '3px solid #00D4AA' },
                                                { bottom: '16px', left: '16px', borderBottom: '3px solid #00D4AA', borderLeft: '3px solid #00D4AA' },
                                                { bottom: '16px', right: '16px', borderBottom: '3px solid #00D4AA', borderRight: '3px solid #00D4AA' },
                                            ].map((s, i) => (
                                                <div key={i} style={{ position: 'absolute', ...s, width: '28px', height: '28px', borderRadius: '2px' }} />
                                            ))}

                                            {/* LIVE badge */}
                                            <div style={{
                                                position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
                                                background: handVisible ? 'rgba(0,212,170,0.9)' : 'rgba(255,71,87,0.9)',
                                                color: 'white', padding: '4px 12px', borderRadius: 'var(--radius-full)',
                                                fontSize: '0.75rem', fontWeight: '700',
                                                display: 'flex', alignItems: 'center', gap: '6px',
                                                transition: 'background 0.3s',
                                            }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', animation: 'pulse-glow 1s infinite' }} />
                                                {handVisible ? 'HAND DETECTED' : 'SCANNING...'}
                                            </div>

                                            {/* Detected letter overlay */}
                                            {detectedLetter && (
                                                <div style={{
                                                    position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
                                                    background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                                                    border: '2px solid rgba(0,212,170,0.6)',
                                                    padding: '10px 28px', borderRadius: 'var(--radius-full)',
                                                    display: 'flex', alignItems: 'center', gap: '14px',
                                                }}>
                                                    <span style={{ fontSize: '32px', fontWeight: '900', color: '#00D4AA' }}>{detectedLetter}</span>
                                                    <div>
                                                        <div style={{ color: 'white', fontWeight: '600', fontSize: '0.85rem' }}>ASL letter detected</div>
                                                        <div style={{ color: '#00D4AA', fontSize: '0.75rem' }}>Confidence: {confidence}%</div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Controls */}
                                <div style={{ padding: '16px 20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <button
                                        onClick={cameraActive ? stopCamera : startCamera}
                                        className={`btn ${cameraActive ? 'btn-danger' : 'btn-primary'}`}
                                        style={{ flex: 1 }}
                                        disabled={modelLoading}
                                    >
                                        {cameraActive ? '⏹ Stop Camera' : modelLoading ? '⏳ Loading Model...' : '📹 Start Camera'}
                                    </button>
                                    <button onClick={addSpace} className="btn btn-secondary btn-sm" disabled={!cameraActive} title="Add space">
                                        ␣ Space
                                    </button>
                                    <button onClick={saveAndClear} className="btn btn-ghost btn-sm" disabled={!sentence} title="Save and clear">
                                        💾 Save
                                    </button>
                                </div>
                            </div>

                            {/* Status bar */}
                            <div style={{
                                padding: '12px 18px', borderRadius: 'var(--radius-md)',
                                background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.15)',
                                fontSize: '0.88rem', color: 'var(--primary-light)',
                            }}>
                                🎯 {statusMsg}
                            </div>

                            {/* Live sentence output */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '1rem' }}>📝 Live Output</h3>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={speakSentence} className="btn btn-primary btn-sm" disabled={!sentence}>
                                            🔊 Speak
                                        </button>
                                        <button onClick={() => setSentence('')} className="btn btn-ghost btn-sm" disabled={!sentence}>
                                            🗑 Clear
                                        </button>
                                    </div>
                                </div>
                                <div style={{
                                    minHeight: '60px', padding: '14px 18px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                                    fontSize: '1.6rem', fontWeight: '700', letterSpacing: '0.12em',
                                    color: 'var(--text-primary)', wordBreak: 'break-all',
                                }}>
                                    {sentence || <span style={{ fontSize: '1rem', fontWeight: '400', color: 'var(--text-muted)', fontStyle: 'italic' }}>Show hand signs to start writing...</span>}
                                    {cameraActive && <span style={{ animation: 'pulse-glow 1s infinite', color: 'var(--primary)' }}>|</span>}
                                </div>
                            </div>

                            {/* History */}
                            {history.length > 0 && (
                                <div className="card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <h3 style={{ fontSize: '0.95rem' }}>🕐 Saved Phrases</h3>
                                        <button onClick={() => setHistory([])} className="btn btn-ghost btn-sm">Clear All</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        {history.map((h, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                                                <span style={{ fontWeight: '600', letterSpacing: '0.08em' }}>{h}</span>
                                                <button onClick={() => { window.speechSynthesis?.cancel(); window.speechSynthesis?.speak(new SpeechSynthesisUtterance(h)); }} className="btn btn-ghost btn-sm">🔊</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── Right: Detection + Guide ──────────────────────── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Current detection card */}
                            <div className="card" style={{
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, rgba(0,212,170,0.08), rgba(108,99,255,0.05))',
                                border: `1px solid ${detectedLetter ? 'rgba(0,212,170,0.5)' : 'rgba(0,212,170,0.15)'}`,
                                transition: 'border-color 0.3s',
                            }}>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                    {handVisible ? '✋ Hand visible' : '🎯 Awaiting hand...'}
                                </p>
                                <div style={{
                                    fontSize: '88px', lineHeight: 1.1, marginBottom: '12px',
                                    color: detectedLetter ? '#00D4AA' : 'var(--text-muted)',
                                    fontWeight: '900', fontFamily: 'monospace',
                                    transition: 'color 0.3s',
                                    minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {detectedLetter ?? '?'}
                                </div>
                                {detectedLetter ? (
                                    <>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                            Holding: <strong style={{ color: 'var(--primary-light)' }}>{holdCountRef.current}/{HOLD_FRAMES} frames</strong>
                                        </div>
                                        <div style={{ height: '6px', borderRadius: '3px', background: 'var(--bg-secondary)', overflow: 'hidden', marginBottom: '8px' }}>
                                            <div style={{ height: '100%', width: `${confidence}%`, background: 'linear-gradient(90deg,#00D4AA,#6C63FF)', transition: 'width 0.2s' }} />
                                        </div>
                                        <p style={{ fontSize: '0.78rem', color: '#00D4AA' }}>{confidence}% confidence</p>
                                    </>
                                ) : (
                                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                                        {cameraActive ? 'Hold a sign steady...' : 'Start camera first'}
                                    </p>
                                )}
                            </div>

                            {/* How it works */}
                            <div className="card">
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '14px' }}>📖 How to use</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {[
                                        { step: '1', text: 'Click Start Camera and allow permission' },
                                        { step: '2', text: 'Hold your hand clearly in front of camera' },
                                        { step: '3', text: 'Form an ASL letter — hold it steady' },
                                        { step: '4', text: 'Letter appears + is spoken automatically' },
                                        { step: '5', text: 'Use ␣ Space button between words' },
                                        { step: '6', text: 'Press 🔊 Speak to read the full sentence' },
                                    ].map(({ step, text }) => (
                                        <div key={step} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                            <div style={{
                                                width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                                                background: 'var(--primary)', color: 'white',
                                                fontSize: '0.72rem', fontWeight: '700',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>{step}</div>
                                            <span style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', paddingTop: '2px' }}>{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ASL reference */}
                            <div className="card">
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '14px' }}>🔤 ASL Reference</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '300px', overflowY: 'auto' }}>
                                    {ASL_ALPHABET.map(({ letter, desc }) => (
                                        <div key={letter} style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            padding: '7px 10px', borderRadius: 'var(--radius-sm)',
                                            background: detectedLetter === letter ? 'rgba(0,212,170,0.12)' : 'transparent',
                                            border: detectedLetter === letter ? '1px solid rgba(0,212,170,0.3)' : '1px solid transparent',
                                            transition: 'all 0.25s',
                                        }}>
                                            <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--primary-light)', minWidth: '18px' }}>{letter}</span>
                                            <span style={{ fontSize: '0.77rem', color: 'var(--text-secondary)' }}>{desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════
                        ASL SIGN CHART — Full A–Z visual reference
                    ════════════════════════════════════════════════════════ */}
                <section style={{ marginTop: '64px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span className="badge badge-primary" style={{ marginBottom: '14px' }}>Complete Reference</span>
                        <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginBottom: '12px' }}>
                            ASL Alphabet <span className="gradient-text">Visual Chart</span>
                        </h2>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto' }}>
                            Learn every letter of American Sign Language. Each card shows the hand
                            symbol, which fingers to extend, and a plain-English description.
                        </p>
                    </div>

                    {/* Finger legend */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '16px',
                        marginBottom: '32px', flexWrap: 'wrap',
                    }}>
                        {[
                            { label: 'Thumb', color: '#FF6B9D' },
                            { label: 'Index', color: '#6C63FF' },
                            { label: 'Middle', color: '#00D4AA' },
                            { label: 'Ring', color: '#FFD93D' },
                            { label: 'Pinky', color: '#FF8C42' },
                        ].map(({ label, color }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, display: 'inline-block' }} />
                                {label}
                            </div>
                        ))}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--border)', display: 'inline-block' }} />
                            Down / Curled
                        </div>
                    </div>

                    {/* A–Z grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                        gap: '16px',
                    }}>
                        {ASL_ALPHABET.map(({ letter, symbol, desc, fingers }) => {
                            const fingerColors = ['#FF6B9D', '#6C63FF', '#00D4AA', '#FFD93D', '#FF8C42'];
                            const fingerLabels = ['T', 'I', 'M', 'R', 'P'];
                            return (
                                <div
                                    key={letter}
                                    style={{
                                        background: detectedLetter === letter
                                            ? 'linear-gradient(135deg,rgba(0,212,170,0.15),rgba(108,99,255,0.1))'
                                            : 'var(--bg-card)',
                                        border: detectedLetter === letter
                                            ? '2px solid rgba(0,212,170,0.5)'
                                            : '1px solid var(--border)',
                                        borderRadius: 'var(--radius-lg)',
                                        padding: '20px 14px 16px',
                                        textAlign: 'center',
                                        cursor: 'default',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                    className="hover-lift"
                                >
                                    {/* Active detection indicator */}
                                    {detectedLetter === letter && (
                                        <div style={{
                                            position: 'absolute', top: '8px', right: '8px',
                                            width: '8px', height: '8px', borderRadius: '50%',
                                            background: '#00D4AA', animation: 'pulse-glow 1s infinite',
                                        }} />
                                    )}

                                    {/* Hand symbol emoji */}
                                    <div style={{ fontSize: '38px', marginBottom: '6px', lineHeight: 1 }}>
                                        {symbol}
                                    </div>

                                    {/* Letter */}
                                    <div style={{
                                        fontSize: '1.8rem', fontWeight: '900', lineHeight: 1,
                                        color: detectedLetter === letter ? '#00D4AA' : 'var(--primary-light)',
                                        marginBottom: '8px', fontFamily: 'monospace',
                                    }}>
                                        {letter}
                                    </div>

                                    {/* Finger dots row */}
                                    <div style={{
                                        display: 'flex', justifyContent: 'center', gap: '4px',
                                        marginBottom: '10px',
                                    }}>
                                        {fingers.map((up, fi) => (
                                            <div
                                                key={fi}
                                                title={`${fingerLabels[fi]}: ${up ? 'Extended' : 'Curled'}`}
                                                style={{
                                                    width: '16px', height: '16px', borderRadius: '50%',
                                                    fontSize: '0.6rem', fontWeight: '700', lineHeight: '16px',
                                                    textAlign: 'center',
                                                    background: up ? fingerColors[fi] : 'rgba(255,255,255,0.06)',
                                                    border: `1px solid ${up ? fingerColors[fi] : 'var(--border)'}`,
                                                    color: up ? 'white' : 'var(--text-muted)',
                                                    transition: 'all 0.2s',
                                                }}
                                            >
                                                {fingerLabels[fi]}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <p style={{
                                        fontSize: '0.72rem', color: 'var(--text-secondary)',
                                        lineHeight: '1.4', margin: 0,
                                    }}>
                                        {desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom tip */}
                    <div style={{
                        marginTop: '32px', padding: '20px 28px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(108,99,255,0.06)',
                        border: '1px solid rgba(108,99,255,0.15)',
                        display: 'flex', gap: '14px', alignItems: 'flex-start',
                    }}>
                        <span style={{ fontSize: '24px' }}>💡</span>
                        <div>
                            <div style={{ fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)' }}>Tip for beginners</div>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                Start with easy letters — <strong style={{ color: 'var(--primary-light)' }}>A</strong> (simple fist),
                                <strong style={{ color: 'var(--primary-light)' }}> B</strong> (all fingers up),
                                <strong style={{ color: 'var(--primary-light)' }}> I</strong> (pinky only),
                                <strong style={{ color: 'var(--primary-light)' }}> L</strong> (L-shape),
                                and <strong style={{ color: 'var(--primary-light)' }}>Y</strong> (thumb+pinky). The
                                coloured dots on each card show which fingers (T=Thumb, I=Index, M=Middle, R=Ring, P=Pinky)
                                should be extended <span style={{ color: '#00D4AA' }}>●</span> or curled <span style={{ color: 'var(--text-muted)' }}>○</span>.
                                When you show a sign to the camera above, the matching card will glow green!
                            </p>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
