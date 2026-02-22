'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type ScanResult = {
    url: string;
    overallScore: number;
    grade: string;
    categories: {
        name: string;
        score: number;
        color: string;
        issues: { severity: 'critical' | 'warning' | 'info'; message: string; impact: string }[];
    }[];
    summary: { critical: number; warnings: number; passed: number; total: number };
};

const MOCK_RESULTS: Record<string, ScanResult> = {
    default: {
        url: '',
        overallScore: 74,
        grade: 'C+',
        categories: [
            {
                name: 'Perceivable', score: 68, color: '#FF6B9D',
                issues: [
                    { severity: 'critical', message: 'Images missing alt text', impact: '12 images without descriptions (affects screen readers)' },
                    { severity: 'warning', message: 'Low color contrast ratio', impact: 'Text fails WCAG AA 4.5:1 ratio in 5 locations' },
                    { severity: 'info', message: 'Video lacks captions', impact: '2 videos without closed captions' },
                ]
            },
            {
                name: 'Operable', score: 82, color: '#6C63FF',
                issues: [
                    { severity: 'warning', message: 'Keyboard trap detected', impact: 'Modal dialog traps keyboard focus' },
                    { severity: 'info', message: 'Focus indicator missing', impact: 'Focus not visible on 3 interactive elements' },
                ]
            },
            {
                name: 'Understandable', score: 79, color: '#00D4AA',
                issues: [
                    { severity: 'warning', message: 'Language not declared', impact: 'lang attribute missing on HTML element' },
                    { severity: 'info', message: 'Form labels incomplete', impact: '4 form inputs lack proper labels' },
                ]
            },
            {
                name: 'Robust', score: 67, color: '#FFB347',
                issues: [
                    { severity: 'critical', message: 'ARIA roles misused', impact: 'role="button" on non-interactive div elements' },
                    { severity: 'critical', message: 'Duplicate IDs found', impact: '3 duplicate element IDs break accessibility APIs' },
                    { severity: 'warning', message: 'Deprecated HTML used', impact: 'font and center tags still present' },
                ]
            },
        ],
        summary: { critical: 3, warnings: 4, passed: 38, total: 45 },
    }
};

function ScoreRing({ score, color }: { score: number; color: string }) {
    const r = 54;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (score / 100) * circumference;
    return (
        <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }} role="img" aria-label={`Score: ${score} out of 100`}>
            <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
            <circle
                cx="65" cy="65" r={r} fill="none" stroke={color}
                strokeWidth="10" strokeDasharray={circumference}
                strokeDashoffset={offset} strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
        </svg>
    );
}

export default function ScannerPage() {
    const [url, setUrl] = useState('');
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState<ScanResult | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const handleScan = async () => {
        if (!url.trim()) return;
        setScanning(true);
        setProgress(0);
        setResults(null);

        const steps = [
            'Crawling page structure...',
            'Analyzing color contrast...',
            'Checking alt text...',
            'Testing keyboard navigation...',
            'Validating ARIA roles...',
            'Running WCAG 2.1 checks...',
            'Generating report...',
        ];

        for (let i = 0; i <= 100; i += 2) {
            await new Promise(r => setTimeout(r, 50));
            setProgress(i);
        }

        setResults({ ...MOCK_RESULTS.default, url });
        setScanning(false);
    };

    const getGradeColor = (g: string) => {
        if (g.startsWith('A')) return '#2ECC71';
        if (g.startsWith('B')) return '#00D4AA';
        if (g.startsWith('C')) return '#FFB347';
        return '#FF4757';
    };

    const getSeverityColor = (s: string) => {
        if (s === 'critical') return '#FF4757';
        if (s === 'warning') return '#FFB347';
        return '#6C63FF';
    };

    const getSeverityIcon = (s: string) => {
        if (s === 'critical') return '🔴';
        if (s === 'warning') return '🟡';
        return '🔵';
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <Navbar />
            <main id="main-content" style={{ paddingTop: '90px', paddingBottom: '80px' }}>
                <div className="container">
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="badge badge-warning" style={{ marginBottom: '16px' }}>WCAG 2.1 · Section 508</span>
                        <h1 style={{ marginBottom: '16px' }}>
                            Accessibility <span className="gradient-text">Scanner</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto' }}>
                            Enter any website URL and get a comprehensive accessibility audit with scores,
                            issues, and actionable recommendations in seconds.
                        </p>
                    </div>

                    {/* Scanner Bar */}
                    <div className="card" style={{
                        maxWidth: '800px', margin: '0 auto 40px',
                        background: 'linear-gradient(135deg, rgba(255,179,71,0.08), transparent)',
                        border: '1px solid rgba(255,179,71,0.3)',
                    }}>
                        <label htmlFor="scan-url" style={{ display: 'block', fontWeight: '600', marginBottom: '12px', fontSize: '0.95rem' }}>
                            🔍 Website URL to Scan
                        </label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input
                                id="scan-url"
                                className="input"
                                type="url"
                                placeholder="https://example.com"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleScan()}
                                aria-label="Enter URL to scan for accessibility issues"
                                style={{ flex: 1 }}
                            />
                            <button
                                onClick={handleScan}
                                disabled={scanning || !url.trim()}
                                className="btn btn-primary"
                                aria-label="Start accessibility scan"
                            >
                                {scanning ? '⏳ Scanning...' : '🔍 Scan Now'}
                            </button>
                        </div>

                        {/* Progress */}
                        {scanning && (
                            <div style={{ marginTop: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>
                                        {progress < 30 ? '🔎 Crawling page structure...' :
                                            progress < 60 ? '🎨 Analyzing accessibility rules...' :
                                                progress < 90 ? '✅ Running WCAG checks...' : '📊 Building report...'}
                                    </span>
                                    <span style={{ color: 'var(--warning)', fontWeight: '600' }}>{progress}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, #FFB347, #FF6B9D)',
                                    }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results */}
                    {results && (
                        <div style={{ maxWidth: '900px', margin: '0 auto', animation: 'fadeInUp 0.5s ease' }}>

                            {/* Overview Card */}
                            <div className="card" style={{
                                marginBottom: '24px',
                                background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,170,0.05))',
                                border: '1px solid rgba(108,99,255,0.3)',
                            }}>
                                <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    {/* Score Ring */}
                                    <div style={{ position: 'relative', flexShrink: 0 }}>
                                        <ScoreRing score={results.overallScore} color={getGradeColor(results.grade)} />
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <div style={{
                                                fontSize: '2rem', fontWeight: '800',
                                                color: getGradeColor(results.grade),
                                                fontFamily: 'var(--font-heading)',
                                            }}>{results.overallScore}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>/100</div>
                                        </div>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                            <h2 style={{ fontSize: '1.3rem', margin: 0 }}>
                                                {results.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                            </h2>
                                            <span style={{
                                                fontSize: '1.2rem', fontWeight: '800',
                                                padding: '4px 16px', borderRadius: 'var(--radius-full)',
                                                background: `${getGradeColor(results.grade)}20`,
                                                color: getGradeColor(results.grade),
                                                border: `1.5px solid ${getGradeColor(results.grade)}40`,
                                                fontFamily: 'var(--font-heading)',
                                            }}>
                                                Grade: {results.grade}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
                                            Accessibility audit completed · {results.summary.total} checks performed
                                        </p>
                                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FF4757' }}>{results.summary.critical}</div>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Critical</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFB347' }}>{results.summary.warnings}</div>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Warnings</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2ECC71' }}>{results.summary.passed}</div>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Passed</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Category Scores */}
                            <div className="grid-2" style={{ marginBottom: '24px', gap: '16px' }}>
                                {results.categories.map(cat => (
                                    <div key={cat.name} className="card hover-lift" style={{
                                        borderColor: `${cat.color}20`,
                                        cursor: 'pointer',
                                    }}
                                        onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                                        role="button"
                                        aria-expanded={expandedCategory === cat.name}
                                        aria-label={`${cat.name}: ${cat.score}% - click to expand issues`}
                                        tabIndex={0}
                                        onKeyDown={e => e.key === 'Enter' && setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <h3 style={{ fontSize: '0.95rem' }}>{cat.name}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: cat.color }}>{cat.score}%</span>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                    {expandedCategory === cat.name ? '▲' : '▼'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="progress-bar" style={{ marginBottom: '12px' }}>
                                            <div className="progress-fill" style={{
                                                width: `${cat.score}%`,
                                                background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                                            }} />
                                        </div>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                                            {cat.issues.length} issues · Click to expand
                                        </div>

                                        {/* Expanded Issues */}
                                        {expandedCategory === cat.name && (
                                            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                                                {cat.issues.map((issue, i) => (
                                                    <div key={i} style={{
                                                        marginBottom: '12px',
                                                        padding: '12px',
                                                        borderRadius: 'var(--radius-md)',
                                                        background: `${getSeverityColor(issue.severity)}0D`,
                                                        border: `1px solid ${getSeverityColor(issue.severity)}25`,
                                                    }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                                            <span>{getSeverityIcon(issue.severity)}</span>
                                                            <span style={{ fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-primary)' }}>{issue.message}</span>
                                                        </div>
                                                        <p style={{ fontSize: '0.8rem', margin: 0, paddingLeft: '24px' }}>{issue.impact}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Recommendations */}
                            <div className="card">
                                <h2 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>💡 Top Recommendations</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { priority: 'Critical', rec: 'Add alt attributes to all 12 images immediately', effort: 'Low effort · High impact', color: '#FF4757' },
                                        { priority: 'Critical', rec: 'Fix duplicate element IDs across the page', effort: 'Low effort · High impact', color: '#FF4757' },
                                        { priority: 'High', rec: 'Increase color contrast ratio to meet WCAG AA (4.5:1)', effort: 'Medium effort · High impact', color: '#FFB347' },
                                        { priority: 'High', rec: 'Fix ARIA role misuse on interactive elements', effort: 'Medium effort · High impact', color: '#FFB347' },
                                        { priority: 'Medium', rec: 'Add captions to all video content', effort: 'High effort · Medium impact', color: '#6C63FF' },
                                        { priority: 'Medium', rec: 'Ensure all form inputs have proper labels', effort: 'Low effort · Medium impact', color: '#6C63FF' },
                                    ].map((r, i) => (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: '16px',
                                            padding: '16px', borderRadius: 'var(--radius-md)',
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid var(--border)',
                                        }}>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                                fontSize: '0.72rem', fontWeight: '700',
                                                background: `${r.color}20`, color: r.color,
                                                border: `1px solid ${r.color}40`, flexShrink: 0,
                                            }}>{r.priority}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)' }}>{r.rec}</div>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{r.effort}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Empty state */}
                    {!results && !scanning && (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <div style={{ fontSize: '80px', marginBottom: '16px', opacity: 0.5 }}>🔍</div>
                            <p style={{ color: 'var(--text-secondary)' }}>Enter a URL above to get started</p>

                            <div style={{ marginTop: '32px' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Try scanning these:</p>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {['https://example.com', 'https://gov.uk', 'https://wikipedia.org'].map(u => (
                                        <button key={u} onClick={() => { setUrl(u); }} className="btn btn-secondary btn-sm" style={{ fontSize: '0.82rem' }}>
                                            {u.replace('https://', '')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
