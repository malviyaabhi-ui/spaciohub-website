import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useModal } from '../components/ModalContext'

const PILLARS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    color: '#00c07a', bg: '#ecfdf5', border: '#a7f3d0',
    title: 'Data encryption',
    desc: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Your workspace data never leaves our secured infrastructure without your permission.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe',
    title: 'Role-based access',
    desc: 'Four distinct permission levels — Super Admin, Admin, Member, and Guest. Every user sees exactly what they need to see, nothing more.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    color: '#0F799B', bg: '#e0f2fe', border: '#7dd3fc',
    title: 'License integrity',
    desc: 'Cryptographically signed licenses validated server-side on every login. No forged keys, no shared access, instant revocation when needed.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    color: '#f59e0b', bg: '#fefce8', border: '#fde68a',
    title: '99.9% uptime SLA',
    desc: 'Backed by Supabase infrastructure on AWS. Automatic failover, daily backups, and real-time monitoring across all services.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    color: '#00c07a', bg: '#ecfdf5', border: '#a7f3d0',
    title: 'Privacy by design',
    desc: 'You own your data. We never sell it, share it with third parties, or use it for any purpose other than delivering the service you paid for.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe',
    title: 'Visitor data safety',
    desc: 'Guest check-in data is accessible only to admins and automatically purged based on your retention policy. No data is kept longer than needed.',
  },
]

const LICENSE_CARDS = [
  { color: '#00c07a', bg: '#ecfdf5', border: '#a7f3d0',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'No piracy risk', desc: 'Your license is unique to your organisation. If someone else tries to use it — it gets blocked instantly.' },
  { color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Never runs expired', desc: 'Automated reminders at 60, 30, and 15 days before expiry. No surprise downtime, no scrambling at renewal.' },
  { color: '#0F799B', bg: '#e0f2fe', border: '#7dd3fc',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: 'Instant revocation', desc: 'Device lost or stolen? We lock it remotely in seconds — no hardware changes needed.' },
  { color: '#f59e0b', bg: '#fefce8', border: '#fde68a',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    title: 'Fully auditable', desc: 'Every license is traceable — which screens, when issued, and exactly when it expires.' },
]

const FAQS = [
  { q: 'Where is my data stored?', a: 'Your data is stored in Supabase-managed infrastructure on AWS eu-west-2 (EU West, London). All data is encrypted at rest and in transit.' },
  { q: 'Can SpacioHub access my data?', a: 'Riser Technologies staff can access your data only for support purposes and only with your explicit permission. We never access data for any other reason.' },
  { q: 'What happens to my data if I cancel?', a: 'Your data remains accessible for 30 days after cancellation. You can export everything during this period. After 30 days, all data is permanently deleted.' },
  { q: 'How does on-premise licensing work?', a: 'On-premise clients receive a cryptographically signed license key tied to their organisation. The key is validated server-side on every login — it cannot be shared, copied, or tampered with.' },
  { q: 'Do you share data with third parties?', a: 'Never. We do not sell, rent, or share your data with any third party. We use a small number of sub-processors (Supabase, TurboSMTP) solely to deliver the service.' },
  { q: 'How do you handle a data breach?', a: 'We will notify affected customers within 72 hours, provide a full incident report, and work with you to mitigate any impact.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #e2e8f0' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', textAlign: 'left', padding: '18px 0',
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'Inter,sans-serif',
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 16 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <div style={{ paddingBottom: 18, fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{a}</div>}
    </div>
  )
}

export default function Security() {
  const { openModal } = useModal()
  const [activeScene, setActiveScene] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveScene(s => (s + 1) % LICENSE_CARDS.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <SEO title="Security — SpacioHub" description="SpacioHub takes security seriously. Enterprise-grade encryption, server-side license validation, role-based access control, and 99.9% uptime SLA." />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(170deg,#0f172a,#1e293b 60%)', borderBottom: '1px solid #1e293b', padding: '80px 0 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 30%,rgba(0,192,122,0.1) 0%,transparent 70%)', pointerEvents: 'none' }}/>
          <div className="container" style={{ position: 'relative' }}>
            <span className="tag animate-fade-up" style={{ background: 'rgba(0,192,122,0.15)', color: '#00c07a', border: '1px solid rgba(0,192,122,0.3)' }}>Security & Trust</span>
            <h1 className="h1 animate-fade-up delay-1" style={{ color: '#fff', marginBottom: 20 }}>
              We take security <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>seriously.</span>
            </h1>
            <p className="lead animate-fade-up delay-2" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 36px' }}>
              Built for organisations that can't afford to compromise. Your data, access, and operations are protected at every layer.
            </p>
            <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={openModal}>Request a security brief →</button>
              <a href="mailto:contact@spaciohub.com" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>contact@spaciohub.com</a>
            </div>
          </div>
        </section>

        {/* COMPLIANCE STRIP */}
        <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '20px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 0 }}>
              {[
                { label: 'TLS 1.3', desc: 'Data in transit' },
                { label: 'AES-256', desc: 'Data at rest' },
                { label: 'RBAC', desc: 'Access control' },
                { label: '99.9%', desc: 'Uptime SLA' },
                { label: 'UAE law', desc: 'Jurisdiction' },
                { label: 'GDPR-ready', desc: 'Data portability' },
              ].map((c, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '8px 24px' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#00c07a' }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY PILLARS */}
        <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="tag reveal">Built-in protection</span>
              <h2 className="h2 reveal">Security at <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>every layer</span></h2>
              <p className="lead reveal" style={{ maxWidth: 480, margin: '12px auto 0' }}>From data encryption to visitor management — every part of SpacioHub is built with security in mind.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
              {PILLARS.map((p, i) => (
                <div key={i} className="card" style={{ borderTop: `3px solid ${p.color}`, padding: '28px 24px' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color, marginBottom: 16 }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LICENSE SECURITY */}
        <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="tag reveal">On-premise licensing</span>
              <h2 className="h2 reveal">Your software. <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>Your control.</span></h2>
              <p className="lead reveal" style={{ maxWidth: 520, margin: '12px auto 0' }}>
                SpacioHub on-premise clients get cryptographically signed license keys — the same approach used by enterprise software like Microsoft and Oracle.
              </p>
            </div>

            {/* Interactive benefit cards + dark scene */}
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start', marginBottom: 48 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {LICENSE_CARDS.map((c, i) => (
                  <div key={i} onClick={() => setActiveScene(i)} className="card" style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 20px',
                    border: `1.5px solid ${activeScene === i ? c.color : '#e2e8f0'}`,
                    background: activeScene === i ? c.bg : '#fff',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{c.title}</h3>
                      <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dark animated scene */}
              <div style={{ background: '#0f172a', borderRadius: 16, padding: 24, minHeight: 280 }}>
                {activeScene === 0 && (
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 14, fontWeight: 600, letterSpacing: 1 }}>ORGANISATION CHECK</div>
                    {[
                      { label: 'Your company — licensed', ok: true },
                      { label: 'Another company tries key', ok: false },
                      { label: 'Copied key on new device', ok: false },
                    ].map((row, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: row.ok ? 'rgba(0,192,122,0.15)' : 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {row.ok ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00c07a" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                            : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
                        </div>
                        <span style={{ fontSize: 13, color: row.ok ? 'rgba(255,255,255,0.75)' : 'rgba(239,68,68,0.6)', flex: 1 }}>{row.label}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: row.ok ? '#00c07a' : '#ef4444' }}>{row.ok ? 'GRANTED' : 'BLOCKED'}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeScene === 1 && (
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 14, fontWeight: 600, letterSpacing: 1 }}>RENEWAL TIMELINE</div>
                    {[
                      { days: '60 days', label: 'First reminder email sent', color: '#00c07a', w: '33%' },
                      { days: '30 days', label: 'Second reminder — act now', color: '#f59e0b', w: '66%' },
                      { days: '15 days', label: 'Urgent — renew immediately', color: '#ef4444', w: '92%' },
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                          <span style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>{item.days}</span>
                        </div>
                        <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: item.w, background: item.color, borderRadius: 4 }}/>
                        </div>
                      </div>
                    ))}
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>Emails sent automatically — no manual reminders needed.</div>
                  </div>
                )}
                {activeScene === 2 && (
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 14, fontWeight: 600, letterSpacing: 1 }}>REMOTE DEVICE MANAGEMENT</div>
                    {[
                      { name: 'Reception screen — Lobby', status: 'active' },
                      { name: 'Board room display — Floor 2', status: 'active' },
                      { name: 'Lost device — Unknown location', status: 'revoked' },
                    ].map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${d.status === 'revoked' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 10, marginBottom: 8 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: d.status === 'active' ? '#00c07a' : '#ef4444', flexShrink: 0 }}/>
                        <span style={{ fontSize: 13, color: d.status === 'active' ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)', flex: 1 }}>{d.name}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: d.status === 'active' ? '#00c07a' : '#ef4444' }}>{d.status === 'active' ? 'Active' : 'Revoked'}</span>
                      </div>
                    ))}
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>Revocation takes effect on next login — no hardware changes needed.</div>
                  </div>
                )}
                {activeScene === 3 && (
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 14, fontWeight: 600, letterSpacing: 1 }}>LICENSE AUDIT TRAIL</div>
                    {[
                      { label: 'Contract number', value: 'AMC-A1B2C3D4-2026' },
                      { label: 'Licensed to', value: 'Your Organisation' },
                      { label: 'Screens covered', value: '3 displays' },
                      { label: 'Users covered', value: 'Up to 20 users' },
                      { label: 'Valid until', value: '10 April 2027' },
                    ].map((r, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{r.label}</span>
                        <span style={{ fontSize: 12, color: '#fff', fontWeight: 500, fontFamily: r.label === 'Contract number' ? 'monospace' : 'inherit' }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal" style={{ maxWidth: 860, margin: '0 auto 48px' }}>
              {LICENSE_CARDS.map((c, i) => (
                <div key={i} className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px 24px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{c.title}</h3>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* License key visual */}
            <div className="reveal" style={{ maxWidth: 640, margin: '0 auto', background: '#0f172a', borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>SAMPLE LICENSE VALIDATION</div>
              {[
                { label: 'Organisation match', ok: true },
                { label: 'Signature verified (HMAC-SHA256)', ok: true },
                { label: 'Contract not expired', ok: true },
                { label: 'Key not revoked', ok: true },
                { label: 'Shared with another organisation', ok: false },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: row.ok ? 'rgba(0,192,122,0.15)' : 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {row.ok
                      ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00c07a" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    }
                  </div>
                  <span style={{ fontSize: 13, color: row.ok ? 'rgba(255,255,255,0.75)' : 'rgba(239,68,68,0.7)', flex: 1 }}>{row.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: row.ok ? '#00c07a' : '#ef4444' }}>{row.ok ? 'PASS' : 'BLOCKED'}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, background: 'rgba(0,192,122,0.08)', border: '1px solid rgba(0,192,122,0.2)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00c07a" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span style={{ fontSize: 13, color: '#00c07a', fontWeight: 600 }}>Access granted — app unlocked for this organisation</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <span className="tag reveal">Common questions</span>
                <h2 className="h2 reveal">Security <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>FAQs</span></h2>
              </div>
              {FAQS.map((f, i) => <FaqItem key={i} {...f} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <h2 className="h2" style={{ color: '#fff', marginBottom: 14 }}>Have a specific <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>security requirement?</span></h2>
            <p className="lead" style={{ color: '#94a3b8', marginBottom: 32 }}>We work with enterprise and government clients to meet specific compliance and security requirements.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={openModal}>Request a security brief →</button>
              <a href="mailto:contact@spaciohub.com" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>contact@spaciohub.com</a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
