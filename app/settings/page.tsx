'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type SettingValue = boolean | string | number;

const SETTING_SECTIONS = [
    {
        id: 'accessibility',
        title: '♿ Accessibility',
        icon: '♿',
        settings: [
            { key: 'highContrast', label: 'High Contrast Mode', desc: 'Increase visual contrast for better visibility', type: 'toggle', value: false },
            { key: 'largeText', label: 'Large Text', desc: 'Increase font size across the platform', type: 'toggle', value: false },
            { key: 'screenReader', label: 'Screen Reader Mode', desc: 'Optimize for screen reader software', type: 'toggle', value: true },
            { key: 'reduceMotion', label: 'Reduce Motion', desc: 'Minimize animations and transitions', type: 'toggle', value: false },
            { key: 'focusIndicator', label: 'Enhanced Focus Indicator', desc: 'Bold keyboard focus ring for navigation', type: 'toggle', value: true },
            { key: 'textSize', label: 'Text Size', desc: 'Choose your preferred text size', type: 'select', value: 'normal', options: ['small', 'normal', 'large', 'xlarge'] },
        ]
    },
    {
        id: 'voice',
        title: '🎤 Voice & Audio',
        icon: '🎤',
        settings: [
            { key: 'voiceEnabled', label: 'Voice Assistant', desc: 'Enable hands-free voice control', type: 'toggle', value: true },
            { key: 'voiceLanguage', label: 'Voice Language', desc: 'Language for speech recognition', type: 'select', value: 'en-US', options: ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN'] },
            { key: 'voiceSpeed', label: 'Speech Rate', desc: 'Speed of text-to-speech playback', type: 'range', value: 1, min: 0.5, max: 2, step: 0.1 },
            { key: 'voicePitch', label: 'Voice Pitch', desc: 'Pitch of text-to-speech voice', type: 'range', value: 1, min: 0.5, max: 2, step: 0.1 },
            { key: 'soundEffects', label: 'Sound Effects', desc: 'Play audio cues for UI actions', type: 'toggle', value: true },
            { key: 'voiceActivation', label: 'Wake Word Activation', desc: 'Say "Hey Access" to activate', type: 'toggle', value: false },
        ]
    },
    {
        id: 'display',
        title: '🎨 Display',
        icon: '🎨',
        settings: [
            { key: 'theme', label: 'Color Theme', desc: 'Choose your interface theme', type: 'select', value: 'dark', options: ['dark', 'light', 'auto', 'high-contrast'] },
            { key: 'colorMode', label: 'Accessibility Mode', desc: 'Pre-configured accessibility profile', type: 'select', value: 'visual', options: ['visual', 'hearing', 'motor', 'cognitive', 'elderly', 'none'] },
            { key: 'captions', label: 'Auto Captions', desc: 'Show captions for all audio content', type: 'toggle', value: true },
            { key: 'cursorSize', label: 'Cursor Size', desc: 'Make the cursor easier to see', type: 'select', value: 'normal', options: ['normal', 'large', 'xlarge'] },
        ]
    },
    {
        id: 'privacy',
        title: '🔒 Privacy & Security',
        icon: '🔒',
        settings: [
            { key: 'biometric', label: 'Biometric Lock', desc: 'Protect profle with fingerprint/face', type: 'toggle', value: false },
            { key: 'dataEncryption', label: 'Local Encryption', desc: 'Encrypt all stored data on device', type: 'toggle', value: true },
            { key: 'analytics', label: 'Usage Analytics', desc: 'Help improve AccessEase (anonymous)', type: 'toggle', value: true },
            { key: 'locationPermission', label: 'Location Access', desc: 'Allow location for emergency SOS', type: 'toggle', value: true },
        ]
    },
    {
        id: 'notifications',
        title: '🔔 Notifications',
        icon: '🔔',
        settings: [
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive important accessibility alerts', type: 'toggle', value: true },
            { key: 'emergencyAlerts', label: 'Emergency Alerts', desc: 'Always receive emergency notifications', type: 'toggle', value: true },
            { key: 'weeklyReport', label: 'Weekly Accessibility Report', desc: 'Summary of your accessibility usage', type: 'toggle', value: false },
        ]
    },
];

export default function SettingsPage() {
    const [settings, setSettings] = useState<Record<string, SettingValue>>(() => {
        const init: Record<string, SettingValue> = {};
        SETTING_SECTIONS.forEach(s => s.settings.forEach(setting => { init[setting.key] = setting.value; }));
        return init;
    });
    const [activeSection, setActiveSection] = useState('accessibility');
    const [saved, setSaved] = useState(false);

    const updateSetting = (key: string, value: SettingValue) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        // Apply accessibility settings immediately
        if (key === 'highContrast') {
            document.documentElement.dataset.contrast = value ? 'high' : 'normal';
        }
        if (key === 'textSize') {
            document.documentElement.dataset.textSize = String(value);
        }
        if (key === 'reduceMotion') {
            document.documentElement.style.setProperty('--transition-base', value ? '0s' : '0.25s ease');
        }
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const activeData = SETTING_SECTIONS.find(s => s.id === activeSection);

    return (
        <div style={{ minHeight: '100vh' }}>
            <Navbar />
            <main id="main-content" style={{ paddingTop: '90px', paddingBottom: '80px' }}>
                <div className="container">
                    {/* Header */}
                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '8px' }}>
                            ⚙️ <span className="gradient-text">Settings</span>
                        </h1>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                            Customize AccessEase to fit your exact needs. All changes apply instantly.
                        </p>
                    </div>

                    {/* Saved Banner */}
                    {saved && (
                        <div style={{
                            padding: '14px 20px', marginBottom: '20px',
                            background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex', alignItems: 'center', gap: '10px',
                        }} role="status">
                            <span>✅</span>
                            <span style={{ color: '#2ECC71', fontWeight: '600' }}>Settings saved successfully!</span>
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px' }}>
                        {/* Sidebar Navigation */}
                        <nav aria-label="Settings sections">
                            <div className="card" style={{ padding: '8px' }}>
                                {SETTING_SECTIONS.map(section => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        aria-current={activeSection === section.id ? 'page' : undefined}
                                        style={{
                                            width: '100%', padding: '12px 16px',
                                            borderRadius: 'var(--radius-md)',
                                            background: activeSection === section.id ? 'var(--primary)' : 'transparent',
                                            border: 'none',
                                            color: activeSection === section.id ? 'white' : 'var(--text-secondary)',
                                            cursor: 'pointer', textAlign: 'left',
                                            fontSize: '0.9rem', fontWeight: activeSection === section.id ? '600' : '400',
                                            transition: 'all 0.2s ease', display: 'flex', gap: '10px', alignItems: 'center',
                                            marginBottom: '2px',
                                        }}
                                    >
                                        <span>{section.icon}</span>
                                        <span style={{ fontSize: '0.85rem' }}>{section.title.replace(/^[^\s]+\s/, '')}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    const init: Record<string, SettingValue> = {};
                                    SETTING_SECTIONS.forEach(s => s.settings.forEach(setting => { init[setting.key] = setting.value; }));
                                    setSettings(init);
                                    document.documentElement.dataset.contrast = 'normal';
                                    document.documentElement.dataset.textSize = 'normal';
                                }}
                                className="btn btn-ghost btn-sm"
                                style={{ width: '100%', marginTop: '8px', color: 'var(--danger)' }}
                                aria-label="Reset all settings to defaults"
                            >
                                ↺ Reset to Defaults
                            </button>
                        </nav>

                        {/* Settings Content */}
                        <div>
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                                    <h2 style={{ fontSize: '1.2rem' }}>{activeData?.title}</h2>
                                    <button onClick={handleSave} className="btn btn-primary btn-sm">
                                        💾 Save Changes
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {activeData?.settings.map((setting, i) => (
                                        <div key={setting.key}>
                                            {i > 0 && <div className="divider" style={{ margin: '4px 0' }} />}
                                            <div style={{
                                                display: 'flex', alignItems: 'center', gap: '20px',
                                                padding: '18px 16px', borderRadius: 'var(--radius-md)',
                                            }}
                                                className="hover-lift"
                                            >
                                                <div style={{ flex: 1 }}>
                                                    <label
                                                        htmlFor={`setting-${setting.key}`}
                                                        style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-primary)', display: 'block', cursor: 'pointer' }}
                                                    >
                                                        {setting.label}
                                                    </label>
                                                    <p style={{ fontSize: '0.83rem', margin: 0, marginTop: '2px' }}>{setting.desc}</p>
                                                </div>

                                                {/* Toggle */}
                                                {setting.type === 'toggle' && (
                                                    <label className="toggle" aria-label={setting.label}>
                                                        <input
                                                            id={`setting-${setting.key}`}
                                                            type="checkbox"
                                                            checked={!!settings[setting.key]}
                                                            onChange={e => updateSetting(setting.key, e.target.checked)}
                                                            aria-describedby={`desc-${setting.key}`}
                                                        />
                                                        <span className="toggle-slider" />
                                                    </label>
                                                )}

                                                {/* Select */}
                                                {setting.type === 'select' && (
                                                    <select
                                                        id={`setting-${setting.key}`}
                                                        value={String(settings[setting.key])}
                                                        onChange={e => updateSetting(setting.key, e.target.value)}
                                                        style={{
                                                            padding: '10px 14px', width: '160px',
                                                            background: 'var(--bg-secondary)',
                                                            border: '1.5px solid var(--border)',
                                                            borderRadius: 'var(--radius-md)',
                                                            color: 'var(--text-primary)',
                                                            fontSize: '0.9rem', cursor: 'pointer',
                                                        }}
                                                        aria-label={setting.label}
                                                    >
                                                        {setting.options?.map(opt => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                )}

                                                {/* Range */}
                                                {setting.type === 'range' && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '200px' }}>
                                                        <input
                                                            id={`setting-${setting.key}`}
                                                            type="range"
                                                            min={setting.min}
                                                            max={setting.max}
                                                            step={setting.step}
                                                            value={Number(settings[setting.key])}
                                                            onChange={e => updateSetting(setting.key, parseFloat(e.target.value))}
                                                            style={{ flex: 1, accentColor: 'var(--primary)' }}
                                                            aria-label={`${setting.label}: ${Number(settings[setting.key]).toFixed(1)}`}
                                                        />
                                                        <span style={{
                                                            minWidth: '36px', textAlign: 'center',
                                                            color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.9rem',
                                                        }}>
                                                            {Number(settings[setting.key]).toFixed(1)}x
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Keyboard Shortcuts */}
                            {activeSection === 'voice' && (
                                <div className="card" style={{ marginTop: '20px' }}>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>⌨️ Keyboard Shortcuts</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        {[
                                            { key: 'Alt + V', action: 'Toggle Voice Assistant' },
                                            { key: 'Alt + H', action: 'Activate Help' },
                                            { key: 'Alt + E', action: 'Emergency SOS' },
                                            { key: 'Alt + S', action: 'Open Scanner' },
                                            { key: 'Alt + F', action: 'Form Auto-Fill' },
                                            { key: 'Tab', action: 'Navigate Forward' },
                                            { key: 'Shift + Tab', action: 'Navigate Backward' },
                                            { key: 'Enter / Space', action: 'Activate Element' },
                                        ].map((item, i) => (
                                            <div key={i} style={{
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                padding: '10px 14px', borderRadius: 'var(--radius-md)',
                                                background: 'rgba(108,99,255,0.05)',
                                            }}>
                                                <kbd style={{
                                                    padding: '4px 8px', borderRadius: '6px',
                                                    background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                                                    fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: '600',
                                                    color: 'var(--primary-light)', whiteSpace: 'nowrap',
                                                }}>{item.key}</kbd>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.action}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
