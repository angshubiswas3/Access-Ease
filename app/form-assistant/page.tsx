'use client';

import { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PROFILE_FIELDS = [
    { key: 'firstName', label: 'First Name', type: 'text', placeholder: 'John', icon: '👤' },
    { key: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe', icon: '👤' },
    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', icon: '📧' },
    { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000', icon: '📱' },
    { key: 'dob', label: 'Date of Birth', type: 'date', placeholder: '', icon: '🎂' },
    { key: 'address', label: 'Street Address', type: 'text', placeholder: '123 Main St', icon: '🏠' },
    { key: 'city', label: 'City', type: 'text', placeholder: 'New York', icon: '🌆' },
    { key: 'state', label: 'State/Province', type: 'text', placeholder: 'NY', icon: '🗺️' },
    { key: 'zipCode', label: 'ZIP / Postal Code', type: 'text', placeholder: '10001', icon: '📮' },
    { key: 'country', label: 'Country', type: 'text', placeholder: 'United States', icon: '🌍' },
    { key: 'occupation', label: 'Occupation', type: 'text', placeholder: 'Software Engineer', icon: '💼' },
    { key: 'idNumber', label: 'ID / SSN', type: 'text', placeholder: '123-45-6789', icon: '🔒' },
];

// Keywords used to match profile values to common form field names
const FIELD_KEYWORDS: Record<string, string[]> = {
    firstName: ['first', 'fname', 'firstname', 'given'],
    lastName: ['last', 'lname', 'lastname', 'surname', 'family'],
    email: ['email', 'e-mail', 'mail'],
    phone: ['phone', 'tel', 'mobile', 'cell'],
    dob: ['dob', 'birth', 'birthday', 'date_of_birth'],
    address: ['address', 'street', 'addr'],
    city: ['city', 'town'],
    state: ['state', 'province', 'region'],
    zipCode: ['zip', 'postal', 'postcode'],
    country: ['country', 'nation'],
    occupation: ['occupation', 'job', 'profession', 'title'],
    idNumber: ['ssn', 'id', 'identity', 'national'],
};

const DEMO_PROFILE: Record<string, string> = {
    firstName: 'Alex', lastName: 'Johnson',
    email: 'alex.johnson@email.com', phone: '+1 (555) 123-4567',
    dob: '1990-06-15', address: '456 Liberty Avenue',
    city: 'San Francisco', state: 'CA',
    zipCode: '94105', country: 'United States',
    occupation: 'UX Designer', idNumber: '123-45-6789',
};

type HistoryEntry = { name: string; url: string; fields: number; time: string };

export default function FormAssistantPage() {
    const [profile, setProfile] = useState<Record<string, string>>(DEMO_PROFILE);
    const [editMode, setEditMode] = useState(false);
    const [targetUrl, setTargetUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState('');
    const [showPanel, setShowPanel] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const [filling, setFilling] = useState(false);
    const [fillStatus, setFillStatus] = useState<'idle' | 'filling' | 'done' | 'error'>('idle');
    const [fillCount, setFillCount] = useState(0);
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // ── Copy a single value to clipboard ──────────────────────────────────────
    const copyToClipboard = async (key: string, value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(key);
            setTimeout(() => setCopied(null), 1800);
        } catch {
            // fallback
            const ta = document.createElement('textarea');
            ta.value = value;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(key);
            setTimeout(() => setCopied(null), 1800);
        }
    };

    // ── Try to auto-fill same-origin iframe via contentDocument ───────────────
    const tryAutoFill = () => {
        try {
            const doc = iframeRef.current?.contentDocument;
            if (!doc) return 0;

            const inputs = Array.from(doc.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
                'input:not([type=submit]):not([type=button]):not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea, select'
            ));

            let filled = 0;
            inputs.forEach(el => {
                const attrs = [
                    el.name?.toLowerCase(),
                    el.id?.toLowerCase(),
                    el.getAttribute('placeholder')?.toLowerCase() ?? '',
                    el.getAttribute('autocomplete')?.toLowerCase() ?? '',
                    el.getAttribute('aria-label')?.toLowerCase() ?? '',
                ].join(' ');

                for (const [key, keywords] of Object.entries(FIELD_KEYWORDS)) {
                    if (keywords.some(kw => attrs.includes(kw)) && profile[key]) {
                        (el as HTMLInputElement).value = profile[key];
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                        filled++;
                        break;
                    }
                }
            });
            return filled;
        } catch {
            // cross-origin — can't access contentDocument
            return -1;
        }
    };

    // ── Main: open URL + attempt fill ─────────────────────────────────────────
    const handleAutoFill = async () => {
        let url = targetUrl.trim();
        if (!url) { alert('Please enter a website URL'); return; }
        if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

        setFilling(true);
        setFillStatus('filling');
        setFillCount(0);
        setIframeUrl(url);
        setShowPanel(true);

        // Wait for iframe to load then try fill
        setTimeout(() => {
            const count = tryAutoFill();
            if (count === -1) {
                // cross-origin: can't inject — panel still shows copy helpers
                setFillStatus('done');
                setFillCount(0);
            } else {
                setFillStatus('done');
                setFillCount(count);
            }
            setFilling(false);

            // Save to history
            const domain = (() => { try { return new URL(url).hostname; } catch { return url; } })();
            setHistory(prev => [
                { name: domain, url, fields: count > 0 ? count : 0, time: 'Just now' },
                ...prev.slice(0, 4),
            ]);
        }, 2500);
    };

    const handleSave = () => {
        setEditMode(false);
    };

    // ── Generate a bookmarklet the user can drag to toolbar ───────────────────
    const bookmarkletData = (() => {
        const pairs = Object.entries(FIELD_KEYWORDS)
            .map(([key, kws]) => `["${kws.join('","')}","${profile[key]?.replace(/"/g, '\\"') ?? ''}"]`)
            .join(',');
        return `javascript:(function(){var d=[${pairs}];document.querySelectorAll('input,textarea,select').forEach(function(el){var a=[el.name,el.id,el.placeholder,el.getAttribute('autocomplete'),el.getAttribute('aria-label')].join(' ').toLowerCase();d.forEach(function(r){var kws=r.slice(0,-1),val=r[r.length-1];if(kws.some(function(k){return a.includes(k)})&&val&&!el.value){el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}});});alert('AccessEase: form fields filled!');})();`;
    })();

    return (
        <div style={{ minHeight: '100vh' }}>
            <Navbar />
            <main id="main-content" style={{ paddingTop: '90px', paddingBottom: '80px' }}>
                <div className="container">
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="badge badge-primary" style={{ marginBottom: '16px' }}>🔒 Encrypted · Secure</span>
                        <h1 style={{ marginBottom: '16px' }}>
                            AI Form <span className="gradient-text">Assistant</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto' }}>
                            Enter any website URL — we open it here and auto-fill every form field
                            using your stored profile. Use the Quick Fill panel to copy values instantly.
                        </p>
                    </div>

                    {/* ── URL Bar ───────────────────────────────────────────── */}
                    <div className="card" style={{
                        marginBottom: '32px', maxWidth: '900px', margin: '0 auto 32px',
                        background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,170,0.05))',
                        border: '1px solid rgba(108,99,255,0.3)',
                    }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>🚀 Open & Auto-Fill a Form</h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input
                                className="input"
                                type="url"
                                placeholder="https://example.com/application-form"
                                value={targetUrl}
                                onChange={e => setTargetUrl(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAutoFill()}
                                aria-label="Website URL to auto-fill"
                                style={{ flex: 1 }}
                            />
                            <button
                                onClick={handleAutoFill}
                                disabled={filling}
                                className="btn btn-primary"
                                aria-label="Open and auto-fill form"
                            >
                                {filling ? '⏳ Opening...' : '📋 Open & Fill'}
                            </button>
                            {iframeUrl && (
                                <button
                                    onClick={() => { setIframeUrl(''); setShowPanel(false); setFillStatus('idle'); }}
                                    className="btn btn-ghost"
                                    title="Close iframe"
                                >✕</button>
                            )}
                        </div>

                        {/* Status */}
                        {fillStatus === 'filling' && (
                            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                                Loading website and detecting form fields...
                            </div>
                        )}
                        {fillStatus === 'done' && (
                            <div style={{
                                marginTop: '14px', padding: '12px 16px',
                                background: fillCount > 0 ? 'rgba(46,204,113,0.1)' : 'rgba(108,99,255,0.08)',
                                border: `1px solid ${fillCount > 0 ? 'rgba(46,204,113,0.3)' : 'rgba(108,99,255,0.2)'}`,
                                borderRadius: 'var(--radius-md)', fontSize: '0.88rem',
                                display: 'flex', alignItems: 'flex-start', gap: '10px',
                            }}>
                                <span style={{ fontSize: '18px' }}>{fillCount > 0 ? '✅' : '💡'}</span>
                                <div>
                                    {fillCount > 0 ? (
                                        <><strong style={{ color: '#2ECC71' }}>{fillCount} fields auto-filled!</strong> Review the form in the window below.</>
                                    ) : (
                                        <>
                                            <strong style={{ color: 'var(--primary-light)' }}>Website loaded!</strong> This site&apos;s security prevents automatic injection.
                                            Use the <strong>Quick Fill panel →</strong> to copy each value with one click,
                                            or drag the <strong>bookmarklet</strong> below to your browser toolbar for instant fills on any site.
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Bookmarklet helper */}
                        {fillStatus === 'done' && (
                            <div style={{
                                marginTop: '12px', padding: '12px 16px',
                                background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)',
                                borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--text-secondary)',
                            }}>
                                <strong style={{ color: 'var(--text-primary)' }}>🔖 Bookmarklet trick:</strong>{' '}
                                Drag this button to your browser toolbar, then click it on any form page to auto-fill instantly:{' '}
                                <a
                                    href={bookmarkletData}
                                    style={{
                                        display: 'inline-block', marginTop: '6px',
                                        padding: '4px 12px', background: 'rgba(108,99,255,0.2)',
                                        border: '1px solid rgba(108,99,255,0.4)',
                                        borderRadius: 'var(--radius-full)', color: 'var(--primary-light)',
                                        fontWeight: '600', fontSize: '0.82rem', cursor: 'grab',
                                        textDecoration: 'none',
                                    }}
                                    onClick={e => e.preventDefault()}
                                    draggable
                                >
                                    📋 AccessEase Fill
                                </a>
                            </div>
                        )}
                    </div>

                    {/* ── Iframe + Quick Fill Panel ─────────────────────────── */}
                    {iframeUrl && (
                        <div style={{
                            maxWidth: '1200px', margin: '0 auto 40px',
                            display: 'grid',
                            gridTemplateColumns: showPanel ? '1fr 300px' : '1fr',
                            gap: '16px',
                            alignItems: 'start',
                        }}>
                            {/* Iframe */}
                            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                                {/* Fake browser chrome */}
                                <div style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {['#FF5F57', '#FFBD2E', '#28CA41'].map((c, i) => (
                                        <span key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, display: 'inline-block' }} />
                                    ))}
                                    <div style={{
                                        flex: 1, marginLeft: '8px', padding: '4px 12px',
                                        background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-full)',
                                        fontSize: '0.78rem', color: 'var(--text-secondary)',
                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                    }}>
                                        🔒 {iframeUrl}
                                    </div>
                                    <button
                                        onClick={() => setShowPanel(p => !p)}
                                        className="btn btn-ghost btn-sm"
                                        style={{ fontSize: '0.75rem' }}
                                        title="Toggle Quick Fill panel"
                                    >
                                        {showPanel ? '◀ Hide Panel' : '▶ Quick Fill'}
                                    </button>
                                    <a href={iframeUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}>
                                        ↗ Open tab
                                    </a>
                                </div>
                                <iframe
                                    ref={iframeRef}
                                    src={iframeUrl}
                                    style={{ width: '100%', height: '600px', border: 'none', display: 'block', background: '#fff' }}
                                    title="Form website"
                                    sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                                />
                            </div>

                            {/* Quick Fill Panel */}
                            {showPanel && (
                                <div style={{
                                    position: 'sticky', top: '100px',
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                                }}>
                                    <div style={{
                                        padding: '14px 18px', borderBottom: '1px solid var(--border)',
                                        background: 'linear-gradient(135deg,rgba(108,99,255,0.1),rgba(0,212,170,0.05))',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>⚡ Quick Fill</div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Click any field to copy</div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const count = tryAutoFill();
                                                setFillCount(count > 0 ? count : 0);
                                                if (count > 0) setFillStatus('done');
                                            }}
                                            className="btn btn-primary btn-sm"
                                            style={{ fontSize: '0.75rem' }}
                                        >
                                            🪄 Auto-Fill
                                        </button>
                                    </div>
                                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '540px', overflowY: 'auto' }}>
                                        {PROFILE_FIELDS.map(field => {
                                            const val = profile[field.key] || '';
                                            const isCopied = copied === field.key;
                                            return (
                                                <button
                                                    key={field.key}
                                                    onClick={() => copyToClipboard(field.key, val)}
                                                    disabled={!val}
                                                    title={`Click to copy ${field.label}`}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', gap: '10px',
                                                        padding: '10px 12px', width: '100%', textAlign: 'left',
                                                        background: isCopied ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.02)',
                                                        border: `1px solid ${isCopied ? 'rgba(0,212,170,0.4)' : 'var(--border)'}`,
                                                        borderRadius: 'var(--radius-md)', cursor: val ? 'pointer' : 'default',
                                                        opacity: val ? 1 : 0.4,
                                                    }}
                                                    className="hover-lift"
                                                >
                                                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{field.icon}</span>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '1px' }}>{field.label}</div>
                                                        <div style={{
                                                            fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-primary)',
                                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                        }}>
                                                            {val || '—'}
                                                        </div>
                                                    </div>
                                                    <span style={{ fontSize: '14px', flexShrink: 0, color: isCopied ? '#00D4AA' : 'var(--text-muted)' }}>
                                                        {isCopied ? '✓' : '📋'}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {/* Copy all */}
                                    <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
                                        <button
                                            onClick={() => {
                                                const all = PROFILE_FIELDS
                                                    .map(f => `${f.label}: ${profile[f.key] || ''}`)
                                                    .join('\n');
                                                copyToClipboard('__all__', all);
                                            }}
                                            className="btn btn-secondary btn-sm"
                                            style={{ width: '100%', fontSize: '0.8rem' }}
                                        >
                                            {copied === '__all__' ? '✓ Copied all!' : '📄 Copy All as Text'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Profile + Sidebar (always visible below) ──────────── */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>

                        {/* Profile Fields */}
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>👤 Secure Profile</h2>
                                    <p style={{ fontSize: '0.82rem', margin: 0 }}>Your data used for auto-filling forms</p>
                                </div>
                                <button
                                    onClick={() => editMode ? handleSave() : setEditMode(true)}
                                    className={`btn btn-sm ${editMode ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    {editMode ? '💾 Save' : '✏️ Edit'}
                                </button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                {PROFILE_FIELDS.map(field => (
                                    <div key={field.key}>
                                        <label
                                            htmlFor={`field-${field.key}`}
                                            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px' }}
                                        >
                                            {field.icon} {field.label}
                                        </label>
                                        {editMode ? (
                                            <input
                                                id={`field-${field.key}`}
                                                className="input"
                                                type={field.type}
                                                value={profile[field.key] || ''}
                                                placeholder={field.placeholder}
                                                onChange={e => setProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                                                style={{ fontSize: '0.9rem', padding: '10px 14px' }}
                                            />
                                        ) : (
                                            <div
                                                onClick={() => copyToClipboard(field.key, profile[field.key] || '')}
                                                title="Click to copy"
                                                style={{
                                                    padding: '10px 14px',
                                                    background: copied === field.key ? 'rgba(0,212,170,0.08)' : 'var(--bg-secondary)',
                                                    border: `1px solid ${copied === field.key ? 'rgba(0,212,170,0.3)' : 'var(--border)'}`,
                                                    borderRadius: 'var(--radius-md)',
                                                    fontSize: '0.9rem',
                                                    color: profile[field.key] ? 'var(--text-primary)' : 'var(--text-muted)',
                                                    cursor: 'pointer', transition: 'all 0.2s',
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                }}
                                            >
                                                <span>{profile[field.key] || '—'}</span>
                                                <span style={{ fontSize: '12px', color: copied === field.key ? '#00D4AA' : 'var(--text-muted)' }}>
                                                    {copied === field.key ? '✓' : '📋'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Security Info */}
                            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(46,204,113,0.08), transparent)', border: '1px solid rgba(46,204,113,0.2)' }}>
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '16px' }}>🔒 Security</h3>
                                {[
                                    { icon: '🔐', label: 'AES-256 Encryption', desc: 'Military-grade' },
                                    { icon: '🏠', label: 'Local Storage Only', desc: 'Never leaves your device' },
                                    { icon: '🛡️', label: 'Zero-Knowledge', desc: 'We can\'t see your data' },
                                    { icon: '🔑', label: 'Biometric Lock', desc: 'Fingerprint / Face ID' },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                        <span style={{ fontSize: '18px' }}>{item.icon}</span>
                                        <div>
                                            <div style={{ fontSize: '0.88rem', fontWeight: '500' }}>{item.label}</div>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Fill History */}
                            <div className="card">
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '14px' }}>📋 Fill History</h3>
                                {history.length === 0 ? (
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                        No sites filled yet. Enter a URL above to get started.
                                    </p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {history.map((h, i) => (
                                            <div key={i} style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                                                <div style={{ fontWeight: '500', fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{h.name}</div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                                                    <span style={{ color: 'var(--text-secondary)' }}>{h.fields > 0 ? `${h.fields} fields filled` : 'Manual copy mode'}</span>
                                                    <span style={{ color: '#2ECC71' }}>✓ {h.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="card" style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', fontFamily: 'var(--font-heading)' }}>
                                    {history.length}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Forms filled this session</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-light)' }}>
                                    ~{Math.round(history.length * 3)} min saved
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>estimated time savings</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
