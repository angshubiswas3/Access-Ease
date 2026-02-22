'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const quickTools = [
    { icon: '🎤', label: 'Voice AI', href: '/voice-assistant', color: '#6C63FF', status: 'Ready' },
    { icon: '🤟', label: 'Sign Language', href: '/sign-language', color: '#00D4AA', status: 'Ready' },
    { icon: '📋', label: 'Form Fill', href: '/form-assistant', color: '#FF6B9D', status: 'Ready' },
    { icon: '🔍', label: 'A11y Scanner', href: '/scanner', color: '#FFB347', status: 'Ready' },
    { icon: '🚨', label: 'Emergency', href: '/emergency', color: '#FF4757', status: 'Active' },
    { icon: '⚙️', label: 'Settings', href: '/settings', color: '#A78BFA', status: 'Ready' },
];

const recentActivity = [
    { icon: '🎤', action: 'Voice command executed', detail: '"Open email app"', time: '2 min ago', status: 'success' },
    { icon: '🔍', action: 'Accessibility scan completed', detail: 'example.com — Score: 87/100', time: '15 min ago', status: 'success' },
    { icon: '📋', action: 'Form auto-filled', detail: 'Job application form — 8 fields', time: '1 hr ago', status: 'success' },
    { icon: '🚨', action: 'Emergency contact updated', detail: 'Added: Emma Thompson', time: '3 hr ago', status: 'info' },
    { icon: '🤟', action: 'Sign language session', detail: '12 gestures recognized', time: 'Yesterday', status: 'success' },
    { icon: '⚙️', action: 'Mode switched', detail: 'Visual → Motor mode', time: 'Yesterday', status: 'info' },
];

const accessibilityScores = [
    { label: 'Perceivable', score: 92, color: '#6C63FF' },
    { label: 'Operable', score: 88, color: '#00D4AA' },
    { label: 'Understandable', score: 95, color: '#FF6B9D' },
    { label: 'Robust', score: 79, color: '#FFB347' },
];

const profile = {
    name: 'Alex Johnson',
    plan: 'Pro',
    mode: 'Visual',
    sessionsThisWeek: 14,
    formsFilledThisMonth: 37,
    successRate: '96%',
};

export default function DashboardPage() {
    const [currentMode, setCurrentMode] = useState('Visual');
    const modes = ['Visual', 'Hearing', 'Motor', 'Cognitive', 'Elderly'];

    return (
        <div style={{ minHeight: '100vh' }}>
            <Navbar />

            <main id="main-content" style={{ paddingTop: '90px', paddingBottom: '80px', minHeight: '100vh' }}>
                <div className="container">

                    {/* Header */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        flexWrap: 'wrap', gap: '16px', marginBottom: '40px',
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '14px',
                                    background: 'linear-gradient(135deg, #6C63FF, #00D4AA)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '22px',
                                }}>👤</div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Welcome back,</p>
                                    <h1 style={{ fontSize: '1.6rem', margin: 0 }}>{profile.name}</h1>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <span className="badge badge-success">
                                <span className="status-dot active" /> Active Session
                            </span>
                            <span className="badge badge-primary">Pro Plan</span>
                            <Link href="/emergency" className="btn btn-danger btn-sm">
                                🚨 SOS
                            </Link>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid-4" style={{ marginBottom: '32px' }}>
                        {[
                            { icon: '🗓️', value: profile.sessionsThisWeek, label: 'Sessions This Week', color: '#6C63FF' },
                            { icon: '📋', value: profile.formsFilledThisMonth, label: 'Forms Auto-Filled', color: '#00D4AA' },
                            { icon: '✅', value: profile.successRate, label: 'Task Success Rate', color: '#2ECC71' },
                            { icon: '⚡', value: '98ms', label: 'Avg. Response Time', color: '#FFB347' },
                        ].map((stat, i) => (
                            <div key={i} className="card" style={{
                                textAlign: 'center',
                                borderColor: `${stat.color}20`,
                                background: `linear-gradient(135deg, ${stat.color}08, transparent)`,
                            }}>
                                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{stat.icon}</div>
                                <div style={{
                                    fontSize: '2rem', fontWeight: '800',
                                    fontFamily: 'var(--font-heading)',
                                    color: stat.color, marginBottom: '4px',
                                }}>{stat.value}</div>
                                <p style={{ fontSize: '0.82rem', margin: 0 }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
                        {/* Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                            {/* Quick Access Tools */}
                            <div className="card">
                                <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    ⚡ Quick Access Tools
                                </h2>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '12px',
                                }}>
                                    {quickTools.map((tool, i) => (
                                        <Link key={i} href={tool.href} style={{ textDecoration: 'none' }}>
                                            <div className="hover-lift" style={{
                                                padding: '20px 16px',
                                                borderRadius: 'var(--radius-md)',
                                                background: `${tool.color}0D`,
                                                border: `1px solid ${tool.color}25`,
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                            }}>
                                                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{tool.icon}</div>
                                                <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{tool.label}</div>
                                                <div style={{
                                                    fontSize: '0.7rem', fontWeight: '600',
                                                    color: tool.color, textTransform: 'uppercase', letterSpacing: '0.5px',
                                                }}>{tool.status}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Accessibility Scores */}
                            <div className="card" id="accessibility">
                                <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>
                                    📊 WCAG Compliance Overview
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {accessibilityScores.map((item, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>{item.label}</span>
                                                <span style={{ fontWeight: '700', color: item.color }}>{item.score}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{
                                                    width: `${item.score}%`,
                                                    background: `linear-gradient(90deg, ${item.color}, ${item.color}AA)`,
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Overall WCAG Score</span>
                                        <div style={{
                                            fontSize: '1.5rem', fontWeight: '800',
                                            background: 'var(--gradient-primary)',
                                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                        }}>88.5 / 100</div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="card" id="activity">
                                <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                                    🕒 Recent Activity
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {recentActivity.map((item, i) => (
                                        <div key={i} className="hover-lift" style={{
                                            display: 'flex', alignItems: 'center', gap: '14px',
                                            padding: '14px 16px', borderRadius: 'var(--radius-md)',
                                        }}>
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '10px',
                                                background: item.status === 'success'
                                                    ? 'rgba(46,204,113,0.1)'
                                                    : 'rgba(108,99,255,0.1)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                                                flexShrink: 0,
                                            }}>{item.icon}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: '500', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.action}</div>
                                                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.detail}</div>
                                            </div>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', flexShrink: 0 }}>{item.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Mode Switcher */}
                            <div className="card">
                                <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>🎯 Accessibility Mode</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {modes.map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => setCurrentMode(mode)}
                                            aria-pressed={currentMode === mode}
                                            style={{
                                                padding: '12px 16px',
                                                borderRadius: 'var(--radius-md)',
                                                background: currentMode === mode ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                                                border: currentMode === mode ? 'none' : '1px solid var(--border)',
                                                color: currentMode === mode ? 'white' : 'var(--text-secondary)',
                                                fontWeight: currentMode === mode ? '600' : '400',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                textAlign: 'left',
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            {currentMode === mode ? '✅ ' : ''}{mode} Mode
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Profile Card */}
                            <div className="card" id="profile" style={{
                                background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,170,0.05))',
                                border: '1px solid rgba(108,99,255,0.2)',
                            }}>
                                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                    <div style={{
                                        width: '72px', height: '72px', borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #6C63FF, #00D4AA)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '32px', margin: '0 auto 12px',
                                    }}>👤</div>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{profile.name}</h3>
                                    <span className="badge badge-primary">Pro Plan</span>
                                </div>
                                <div className="divider" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {[
                                        { label: 'Active Mode', value: currentMode },
                                        { label: 'Sessions', value: '14 this week' },
                                        { label: 'Member since', value: 'Jan 2025' },
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                                            <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/settings" className="btn btn-secondary" style={{ width: '100%', marginTop: '16px', textAlign: 'center' }}>
                                    ⚙️ Settings
                                </Link>
                            </div>

                            {/* Quick Emergency */}
                            <Link href="/emergency" style={{ textDecoration: 'none' }}>
                                <div style={{
                                    padding: '24px',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'linear-gradient(135deg, rgba(255,71,87,0.15), rgba(255,107,157,0.1))',
                                    border: '1px solid rgba(255,71,87,0.3)',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    animation: 'pulse-glow 3s ease-in-out infinite',
                                }}>
                                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>🚨</div>
                                    <div style={{ fontWeight: '700', color: '#FF4757', fontSize: '1rem', marginBottom: '4px' }}>Emergency SOS</div>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                                        One tap to alert your trusted contacts
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
