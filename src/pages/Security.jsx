import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useModal } from '../components/ModalContext'

const PAGE_SEO_SECURITY = {
  title: 'Security — SpacioHub',
  description: 'SpacioHub takes security seriously. Enterprise-grade encryption, server-side license validation, role-based access control, and more.',
}

const PILLARS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: '#0d9488', bg: '#ccfbf1', border: '#5eead4',
    title: 'Data protection',
    desc: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Your workspace data never leaves our secured infrastructure without your permission.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    color: '#7c3aed', bg: '#ede9fe', border: '#c4b5fd',
    title: 'Access control',
    desc: 'Role-based permissions across four levels — Super Admin, Admin, Member, and Guest. Every user sees only what they need to see.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
      </svg>
    ),
    color: '#0369a1', bg: '#e0f2fe', border: '#7dd3fc',
    title: 'License integrity',
    desc: 'Cryptographically signed licenses validated server-side on every login. No forged keys. No shared access. Instant revocation if needed.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    color: '#b45309', bg: '#fef3c7', border: '#fcd34d',
    title: 'Uptime & reliability',
    desc: '99.9% uptime SLA backed by Supabase infrastructure. Automatic failover, daily backups, and real-time monitoring across all services.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    color: '#047857', bg: '#d1fae5', border: '#6ee7b7',
    title: 'Privacy by design',
    desc: 'You own your data. We never sell it, never share it with third parties, and you can export or delete everything at any time.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: '#be185d', bg: '#fce7f3', border: '#f9a8d4',
    title: 'Visitor data security',
    desc: 'Guest check-in data is handled with care. Visitor logs are accessible only to admins and are automatically purged based on your retention policy.',
  },
]

const LICENSE_BENEFITS = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    color: '#0d9488', bg: '#ccfbf1',
    title: 'No piracy risk',
    desc: 'Your license is unique to your organisation. If someone else tries to use it — it gets blocked instantly.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    color: '#7c3aed', bg: '#ede9fe',
    title: 'Never runs expired',
    desc: 'Automated reminders at 60, 30, and 15 days before expiry. No surprise downtime, no scrambling at renewal.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    color: '#0369a1', bg: '#e0f2fe',
    title: 'Instant revocation',
    desc: 'Device lost or stolen? We can lock it remotely within seconds — no hardware changes needed.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    color: '#b45309', bg: '#fef3c7',
    title: 'Fully auditable',
    desc: 'Every license is traceable — which screens it covers, when it was issued, and exactly when it expires.',
  },
]

const COMPLIANCE = [
  { label: 'TLS 1.3', desc: 'All data in transit' },
  { label: 'AES-256', desc: 'Data at rest' },
  { label: 'RBAC', desc: 'Role-based access' },
  { label: 'UAE law', desc: 'Governing jurisdiction' },
  { label: '99.9%', desc: 'Uptime SLA' },
  { label: 'GDPR-ready', desc: 'Data export & deletion' },
]

const FAQS = [
  { q: 'Where is my data stored?', a: 'Your data is stored in Supabase-managed infrastructure on AWS eu-west-2 (EU West, London). All data is encrypted at rest and in transit.' },
  { q: 'Can SpacioHub access my data?', a: 'Riser Technologies staff can access your data only for support purposes and only with your explicit permission. We never access data for any other reason.' },
  { q: 'What happens if I cancel?', a: 'Your data remains accessible for 30 days after cancellation. You can export everything during this period. After 30 days, all data is permanently deleted from our systems.' },
  { q: 'How does on-premise licensing work?', a: 'On-premise clients receive a cryptographically signed license key tied to their organisation. The key is validated server-side on every login — it cannot be shared, copied, or tampered with.' },
  { q: 'Do you share data with third parties?', a: 'Never. We do not sell, rent, or share your data with any third party for commercial purposes. We use a small number of sub-processors (Supabase, TurboSMTP) solely to deliver the service.' },
  { q: 'How do you handle a data breach?', a: 'In the unlikely event of a breach, we will notify affected customers within 72 hours, provide a full incident report, and work with you to mitigate any impact.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #e2e8f0' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', textAlign: 'left', padding: '18px 0',
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'Inter, sans-serif',
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 16 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div style={{ paddingBottom: 18, fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{a}</div>
      )}
    </div>
  )
}

export default function Security() {
  const { openModal } = useModal()
  const [activeScene, setActiveScene] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScene(s => (s + 1) % LICENSE_BENEFITS.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <SEO {...PAGE_SEO_SECURITY} />
      <main style={{ paddingTop: 64, fontFamily: 'Inter, sans-serif' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(180deg,#0a1628 0%,#0d1f3c 100%)', padding: '88px 0 72px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 30%,rgba(13,148,136,0.12) 0%,transparent 70%)', pointerEvents: 'none' }}/>
          <div className="container" style={{ position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0d9488', letterSpacing: 0.5 }}>Security & Trust</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
              We take security<br/><span style={{ color: '#0d9488' }}>seriously.</span>
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
              SpacioHub is built for organisations that can't afford to compromise. Your data, your access, and your operations are protected at every layer.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={openModal} style={{ background: '#0d9488', color: '#fff', padding: '13px 28px', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Request a security brief →
              </button>
              <a href="mailto:contact@spaciohub.com" style={{ background: 'transparent', color: '#fff', padding: '13px 28px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.2)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                contact@spaciohub.com
              </a>
            </div>
          </div>
        </section>

        {/* COMPLIANCE STRIP */}
        <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '20px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: 0, justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {COMPLIANCE.map((c, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '8px 20px', borderRight: i < COMPLIANCE.length - 1 ? '1px solid #e2e8f0' : 'none', flex: 1, minWidth: 80 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0d9488' }}>{c.label}</div>
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
              <span style={{ fontSize: 11, fontWeight: 700, color: '#0d9488', letterSpacing: 2, textTransform: 'uppercase' }}>Built-in protection</span>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginTop: 8, marginBottom: 12 }}>Security at every layer</h2>
              <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>From data encryption to visitor management — every part of SpacioHub is designed with security in mind.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
              {PILLARS.map((p, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '28px 24px', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: p.color }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LICENSE SECURITY SECTION */}
        <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0d9488', letterSpacing: 2, textTransform: 'uppercase' }}>On-premise licensing</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginTop: 8, marginBottom: 16, lineHeight: 1.2 }}>Your software.<br/>Your control.</h2>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.8, marginBottom: 32 }}>
                  SpacioHub on-premise clients get cryptographically signed license keys — the same approach used by enterprise software like Microsoft and Oracle. Each key is unique to your organisation, validated server-side, and can be revoked in seconds.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {LICENSE_BENEFITS.map((b, i) => (
                    <div key={i} onClick={() => setActiveScene(i)} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px',
                      borderRadius: 12, border: `1.5px solid ${activeScene === i ? b.color : '#e2e8f0'}`,
                      background: activeScene === i ? b.bg : '#fff',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.color, flexShrink: 0 }}>
                        {b.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>{b.title}</div>
                        <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated scene */}
              <div style={{ background: '#0a1628', borderRadius: 20, padding: 28, minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {activeScene === 0 && (
                  <div style={{ animation: 'fadeUp 0.4s ease' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>License validation check</div>
                    {[
                      { label: 'Organisation match', ok: true },
                      { label: 'Signature verified', ok: true },
                      { label: 'Not expired', ok: true },
                      { label: 'Key not revoked', ok: true },
                      { label: 'Shared with another org', ok: false },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.ok ? 'rgba(13,148,136,0.2)' : 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {item.ok
                            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                            : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          }
                        </div>
                        <span style={{ fontSize: 13, color: item.ok ? 'rgba(255,255,255,0.8)' : 'rgba(239,68,68,0.7)' }}>{item.label}</span>
                        <span style={{ marginLeft: 'auto', fontSize: 11, color: item.ok ? '#0d9488' : '#ef4444', fontWeight: 600 }}>{item.ok ? 'PASS' : 'BLOCKED'}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 16, background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.3)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <span style={{ fontSize: 13, color: '#0d9488', fontWeight: 600 }}>Access granted — app unlocked</span>
                    </div>
                  </div>
                )}
                {activeScene === 1 && (
                  <div style={{ animation: 'fadeUp 0.4s ease' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Renewal reminder timeline</div>
                    {[
                      { days: '60 days', label: 'First reminder sent', color: '#0d9488', w: '33%' },
                      { days: '30 days', label: 'Second reminder — action needed', color: '#f59e0b', w: '66%' },
                      { days: '15 days', label: 'Urgent — renew immediately', color: '#ef4444', w: '90%' },
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                          <span style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>{item.days}</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: item.w, background: item.color, borderRadius: 4, transition: 'width 1s ease' }}/>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                      Emails are sent automatically. You never have to remember — we remind you every step of the way.
                    </div>
                  </div>
                )}
                {activeScene === 2 && (
                  <div style={{ animation: 'fadeUp 0.4s ease' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Remote device management</div>
                    {[
                      { name: 'Reception screen — Lobby', status: 'active' },
                      { name: 'Board room display — Floor 2', status: 'active' },
                      { name: 'Lost device — Unknown location', status: 'revoked' },
                    ].map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${d.status === 'revoked' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 10, marginBottom: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.status === 'active' ? '#0d9488' : '#ef4444', flexShrink: 0 }}/>
                        <span style={{ fontSize: 13, color: d.status === 'active' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', flex: 1 }}>{d.name}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: d.status === 'active' ? '#0d9488' : '#ef4444', background: d.status === 'active' ? 'rgba(13,148,136,0.1)' : 'rgba(239,68,68,0.1)', padding: '3px 8px', borderRadius: 6 }}>
                          {d.status === 'active' ? 'Active' : 'Revoked'}
                        </span>
                      </div>
                    ))}
                    <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Revocation takes effect on the next login — no hardware changes required.</div>
                  </div>
                )}
                {activeScene === 3 && (
                  <div style={{ animation: 'fadeUp 0.4s ease' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Your license audit trail</div>
                    {[
                      { label: 'Contract number', value: 'AMC-A1B2C3D4-2026' },
                      { label: 'Licensed to', value: 'Your Organisation' },
                      { label: 'Screens covered', value: '3 displays' },
                      { label: 'Users covered', value: 'Up to 20 users' },
                      { label: 'Valid until', value: '10 April 2027' },
                      { label: 'Issued by', value: 'Riser Technologies' },
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
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0d9488', letterSpacing: 2, textTransform: 'uppercase' }}>Common questions</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginTop: 8 }}>Security FAQs</h2>
              </div>
              {FAQS.map((faq, i) => <FaqItem key={i} {...faq} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0d9488' }}>Security-first by design</span>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 14 }}>
              Have a specific security requirement?
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
              We work closely with enterprise and government clients to meet specific compliance and security requirements.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={openModal} style={{ background: '#0d9488', color: '#fff', padding: '14px 28px', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Request a security brief →
              </button>
              <a href="mailto:contact@spaciohub.com" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 10, border: '1.5px solid #334155', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                contact@spaciohub.com
              </a>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }
      `}</style>
    </>
  )
}
