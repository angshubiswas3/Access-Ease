'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CONTACTS = [
    { name: 'Emma Thompson', role: 'Primary Emergency Contact', phone: '+1 (555) 234-5678', relation: 'Sister', avatar: '👩', notified: false },
    { name: 'Dr. Michael Lee', role: 'Physician', phone: '+1 (555) 345-6789', relation: 'Doctor', avatar: '👨‍⚕️', notified: false },
    { name: 'James Johnson', role: 'Secondary Contact', phone: '+1 (555) 456-7890', relation: 'Father', avatar: '👨', notified: false },
];

const QUICK_MESSAGES = [
    'I need immediate help!',
    'I\'ve fallen and can\'t get up.',
    'I\'m having a medical emergency.',
    'Please call an ambulance.',
    'I\'m disoriented and need assistance.',
    'Send help to my location.',
];

export default function EmergencyPage() {
    const [sosActive, setSosActive] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [alertSent, setAlertSent] = useState(false);
    const [contacts, setContacts] = useState(CONTACTS);
    const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
    const [locating, setLocating] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(QUICK_MESSAGES[0]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (sosActive && countdown > 0) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        } else if (sosActive && countdown === 0) {
            sendAlerts();
        }
        return () => clearTimeout(timer);
    }, [sosActive, countdown]);

    const activateSOS = () => {
        setSosActive(true);
        setCountdown(5);
        setAlertSent(false);
        getLocation();
    };

    const cancelSOS = () => {
        setSosActive(false);
        setCountdown(5);
        setAlertSent(false);
    };

    const sendAlerts = () => {
        setSosActive(false);
        setAlertSent(true);
        setCountdown(5);
        setContacts(prev => prev.map(c => ({ ...c, notified: true })));
    };

    const getLocation = () => {
        setLocating(true);
        navigator.geolocation?.getCurrentPosition(
            pos => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    address: '456 Liberty Ave, San Francisco, CA 94105', // Simulated address
                });
                setLocating(false);
            },
            () => {
                setLocation({ lat: 37.7749, lng: -122.4194, address: '456 Liberty Ave, San Francisco, CA 94105 (approximate)' });
                setLocating(false);
            }
        );
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <Navbar />
            <main id="main-content" style={{ paddingTop: '90px', paddingBottom: '80px' }}>
                <div className="container">
                    {/* Alert Banner if SOS active */}
                    {sosActive && (
                        <div style={{
                            position: 'fixed', top: '80px', left: 0, right: 0, zIndex: 999,
                            background: 'linear-gradient(135deg, #FF4757, #FF6B9D)',
                            padding: '20px 24px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            gap: '16px', flexWrap: 'wrap',
                            boxShadow: '0 4px 20px rgba(255,71,87,0.5)',
                        }} role="alert" aria-live="assertive">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span style={{ fontSize: '32px', animation: 'pulse-glow 0.5s infinite' }}>🚨</span>
                                <div>
                                    <div style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem' }}>⚠️ SOS Alert Sending in {countdown} seconds</div>
                                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}>Contacting emergency contacts and sharing location</div>
                                </div>
                            </div>
                            <button onClick={cancelSOS} style={{
                                padding: '12px 24px', borderRadius: 'var(--radius-full)',
                                background: 'white', color: '#FF4757', fontWeight: '700',
                                border: 'none', cursor: 'pointer', fontSize: '0.95rem',
                            }}>
                                ✕ CANCEL
                            </button>
                        </div>
                    )}

                    {/* Alert Sent Banner */}
                    {alertSent && (
                        <div style={{
                            padding: '20px 24px', marginBottom: '24px',
                            background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex', alignItems: 'center', gap: '16px',
                        }} role="alert">
                            <span style={{ fontSize: '28px' }}>✅</span>
                            <div>
                                <div style={{ fontWeight: '700', color: '#2ECC71', fontSize: '1.05rem' }}>Emergency alerts sent successfully!</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
                                    All {contacts.length} contacts have been notified with your location. Help is on the way.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="badge badge-danger" style={{ marginBottom: '16px' }}>24/7 Emergency Support</span>
                        <h1 style={{ marginBottom: '16px' }}>
                            Emergency <span style={{ color: '#FF4757' }}>SOS</span>
                        </h1>
                        <p style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                            One tap to alert trusted contacts, share your precise location, and request immediate assistance.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
                        {/* Left: Main SOS */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                            {/* BIG SOS Button */}
                            <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}>
                                    {/* Ripple rings */}
                                    {!sosActive && [1, 2, 3].map(r => (
                                        <div key={r} style={{
                                            position: 'absolute', inset: `-${r * 20}px`, borderRadius: '50%',
                                            border: '2px solid rgba(255,71,87,0.2)',
                                            animation: `ripple ${1.5 + r * 0.3}s ease-out ${r * 0.2}s infinite`,
                                        }} />
                                    ))}

                                    <button
                                        onClick={sosActive ? cancelSOS : activateSOS}
                                        aria-label={sosActive ? `Cancel SOS - ${countdown} seconds remaining` : 'Activate Emergency SOS'}
                                        aria-pressed={sosActive}
                                        style={{
                                            width: '180px', height: '180px', borderRadius: '50%',
                                            border: 'none', cursor: 'pointer',
                                            background: sosActive
                                                ? 'linear-gradient(135deg, #FF4757, #d63031)'
                                                : 'linear-gradient(135deg, #FF4757, #FF6B9D)',
                                            boxShadow: sosActive
                                                ? '0 0 60px rgba(255,71,87,0.9), 0 0 120px rgba(255,71,87,0.4)'
                                                : '0 0 40px rgba(255,71,87,0.5)',
                                            animation: sosActive ? 'pulse-red 0.8s ease-in-out infinite' : 'pulse-red 3s ease-in-out infinite',
                                            display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center',
                                            gap: '4px',
                                        }}
                                    >
                                        <span style={{ fontSize: '48px' }}>🚨</span>
                                        <span style={{ color: 'white', fontWeight: '900', fontSize: '1.3rem', letterSpacing: '2px' }}>
                                            {sosActive ? `${countdown}s` : 'SOS'}
                                        </span>
                                        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
                                            {sosActive ? 'TAP TO CANCEL' : 'TAP FOR HELP'}
                                        </span>
                                    </button>
                                </div>

                                <h2 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                                    {sosActive ? '⚠️ Sending Alert...' : alertSent ? '✅ Help is Coming' : '🆘 Emergency Assistance'}
                                </h2>
                                <p style={{ fontSize: '0.9rem', maxWidth: '300px', margin: '0 auto' }}>
                                    {sosActive
                                        ? `Notifying ${contacts.length} contacts in ${countdown} seconds. Tap to cancel.`
                                        : 'When pressed, instantly alerts all your trusted contacts with your GPS location.'}
                                </p>
                            </div>

                            {/* Quick Message */}
                            <div className="card">
                                <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>✉️ Quick Emergency Message</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                                    {QUICK_MESSAGES.map((msg, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedMessage(msg)}
                                            aria-pressed={selectedMessage === msg}
                                            style={{
                                                padding: '12px 16px', borderRadius: 'var(--radius-md)',
                                                background: selectedMessage === msg ? 'rgba(255,71,87,0.1)' : 'rgba(255,255,255,0.02)',
                                                border: selectedMessage === msg ? '1px solid rgba(255,71,87,0.4)' : '1px solid var(--border)',
                                                color: selectedMessage === msg ? '#FF4757' : 'var(--text-secondary)',
                                                cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem',
                                                transition: 'all 0.2s ease',
                                                fontWeight: selectedMessage === msg ? '600' : '400',
                                            }}
                                        >
                                            {selectedMessage === msg ? '📌 ' : ''}{msg}
                                        </button>
                                    ))}
                                </div>
                                <div style={{
                                    padding: '12px 16px',
                                    background: 'rgba(255,71,87,0.05)',
                                    border: '1px solid rgba(255,71,87,0.2)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.85rem', color: 'var(--text-secondary)',
                                }}>
                                    Selected: <strong style={{ color: 'var(--text-primary)' }}>&quot;{selectedMessage}&quot;</strong>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h3 style={{ fontSize: '1rem' }}>📍 Your Location</h3>
                                    <button onClick={getLocation} className="btn btn-secondary btn-sm" disabled={locating}>
                                        {locating ? '⏳ Locating...' : '🔄 Refresh'}
                                    </button>
                                </div>
                                {location ? (
                                    <div>
                                        <div style={{
                                            padding: '14px 16px',
                                            background: 'rgba(0,212,170,0.08)',
                                            border: '1px solid rgba(0,212,170,0.2)',
                                            borderRadius: 'var(--radius-md)',
                                            marginBottom: '12px',
                                        }}>
                                            <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>📍 {location.address}</div>
                                            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                                                Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                            ✅ Location will be shared with emergency contacts when SOS is activated
                                        </p>
                                    </div>
                                ) : (
                                    <button onClick={getLocation} className="btn btn-secondary" style={{ width: '100%' }}>
                                        📍 Get My Location
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Right: Contacts */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Emergency Contacts */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h3 style={{ fontSize: '0.95rem' }}>👥 Emergency Contacts</h3>
                                    <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.8rem' }}>+ Add</button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {contacts.map((c, i) => (
                                        <div key={i} style={{
                                            padding: '14px',
                                            borderRadius: 'var(--radius-md)',
                                            background: c.notified ? 'rgba(46,204,113,0.08)' : 'rgba(255,255,255,0.02)',
                                            border: c.notified ? '1px solid rgba(46,204,113,0.3)' : '1px solid var(--border)',
                                            transition: 'all 0.3s ease',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                <div style={{
                                                    width: '38px', height: '38px', borderRadius: '50%',
                                                    background: 'var(--bg-secondary)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                                                }}>{c.avatar}</div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{c.name}</div>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{c.role}</div>
                                                </div>
                                                {c.notified && <span style={{ fontSize: '0.72rem', color: '#2ECC71', fontWeight: '600' }}>✅ Notified</span>}
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <a href={`tel:${c.phone}`} className="btn btn-secondary btn-sm"
                                                    style={{ flex: 1, fontSize: '0.78rem', textAlign: 'center' }}
                                                    aria-label={`Call ${c.name}`}>
                                                    📞 Call
                                                </a>
                                                <a href={`sms:${c.phone}`} className="btn btn-secondary btn-sm"
                                                    style={{ flex: 1, fontSize: '0.78rem', textAlign: 'center' }}
                                                    aria-label={`Text ${c.name}`}>
                                                    💬 Text
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Emergency Services */}
                            <div className="card" style={{
                                background: 'linear-gradient(135deg, rgba(255,71,87,0.08), transparent)',
                                border: '1px solid rgba(255,71,87,0.2)',
                            }}>
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '14px', color: '#FF4757' }}>🆘 Emergency Services</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {[
                                        { name: 'Police · Fire · Ambulance', number: '911', icon: '🚑' },
                                        { name: 'Disability Crisis Line', number: '1-800-799-4889', icon: '♿' },
                                        { name: 'Suicide Prevention', number: '988', icon: '💛' },
                                        { name: 'Poison Control', number: '1-800-222-1222', icon: '☠️' },
                                    ].map((s, i) => (
                                        <a key={i} href={`tel:${s.number}`} style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            padding: '10px 14px', borderRadius: 'var(--radius-md)',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            textDecoration: 'none',
                                        }}
                                            className="hover-lift"
                                            aria-label={`Call ${s.name}: ${s.number}`}
                                        >
                                            <span style={{ fontSize: '20px' }}>{s.icon}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{s.name}</div>
                                                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FF4757' }}>{s.number}</div>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>📞 Call</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Safety Tips */}
                            <div className="card">
                                <h3 style={{ fontSize: '0.95rem', marginBottom: '14px' }}>💡 Safety Tips</h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {[
                                        'Keep your phone charged above 20%',
                                        'Add at least 3 emergency contacts',
                                        'Enable location services for faster response',
                                        'Set up medical ID on your device',
                                    ].map((tip, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.85rem' }}>
                                            <span style={{ color: 'var(--secondary)', flexShrink: 0 }}>✓</span>
                                            <span style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
