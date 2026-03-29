import React from 'react'
import SEO from '../components/SEO'

const SECTIONS = [
  { icon: '🚀', title: 'Getting Started', desc: 'Set up your account, add rooms, and invite your team in under 5 minutes.', links: ['Quick start guide', 'Adding your first room', 'Inviting team members', 'Setting up the door display'] },
  { icon: '📅', title: 'Room Booking', desc: 'Everything about the booking system, rules, approvals, and integrations.', links: ['How to book a room', 'Booking approval workflows', 'Recurring bookings', 'Buffer time settings'] },
  { icon: '👤', title: 'Visitor Management', desc: 'Pre-registration, check-in kiosks, badges, and host notifications.', links: ['Pre-registering visitors', 'Setting up the kiosk', 'Custom badge design', 'Host notification setup'] },
  { icon: '🔗', title: 'Integrations', desc: 'Connect Google Calendar, Microsoft 365, Zoom, SSO, and more.', links: ['Google Calendar sync', 'Microsoft 365 setup', 'Zoom auto-links', 'SSO configuration'] },
  { icon: '📊', title: 'Analytics', desc: 'Understanding your utilisation reports, exports, and custom filters.', links: ['Reading your dashboard', 'Exporting data as CSV', 'Setting up weekly reports', 'Understanding utilisation rates'] },
  { icon: '⚙️', title: 'Admin & Settings', desc: 'Manage roles, permissions, billing, and account settings.', links: ['User roles & permissions', 'Billing & plans', 'White-label setup', 'API access'] },
]

export default function Docs() {
  return (
    <>
      <SEO title="Documentation — SpacioHub Help & Setup Guides" description="Everything you need to set up and get the most out of SpacioHub — room booking, visitor management, integrations, and analytics." path="/docs" />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>
        <section style={{ background: 'linear-gradient(170deg,#eff6ff,#fff 60%)', borderBottom: '1px solid #e2e8f0', padding: '80px 0 64px', textAlign: 'center' }}>
          <div className="container">
            <span className="tag">Documentation</span>
            <h1 className="h1" style={{ marginBottom: 16 }}>How to use <span style={{ background: 'linear-gradient(135deg,#3b82f6,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>SpacioHub</span></h1>
            <p className="lead" style={{ maxWidth: 480, margin: '0 auto 32px' }}>Guides, setup instructions, and reference docs for every feature.</p>
            <div style={{ maxWidth: 400, margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none"><circle cx="9" cy="9" r="6" stroke="#94a3b8" strokeWidth="1.5"/><path d="M15 15l3 3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>Search documentation...</span>
            </div>
          </div>
        </section>
        <section style={{ padding: '64px 0', background: '#f8fafc' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SECTIONS.map(s => (
                <div key={s.title} className="card" style={{ background: '#fff' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {s.links.map(l => (
                      <a key={l} href="#" style={{ fontSize: 13, color: '#3b82f6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => e.currentTarget.style.color = '#00c07a'} onMouseLeave={e => e.currentTarget.style.color = '#3b82f6'}>
                        → {l}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <p style={{ color: '#64748b', marginBottom: 12 }}>Can't find what you're looking for?</p>
              <a href="mailto:contact@spaciohub.com" className="btn btn-primary">Email support →</a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
