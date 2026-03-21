import React from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../components/ModalContext'

const FEATURES = [
  { icon: '📅', color: '#ecfdf5', border: '#a7f3d0', title: 'Smart Room Booking', desc: 'Visual time grid, 15-min buffer, AI suggestions, booking tags, and Zoom auto-links on every booking.', tag: 'CORE', link: '/platform/booking' },
  { icon: '🖥️', color: '#eff6ff', border: '#bfdbfe', title: 'Door Display Panel', desc: 'Real-time status on any tablet. Quick book, check-in, and guest booking — no login required.', tag: 'HARDWARE', link: '/platform/booking#door-display' },
  { icon: '📊', color: '#f5f3ff', border: '#ddd6fe', title: 'Analytics & Reports', desc: 'Peak hours, utilisation, no-show tracking, tag breakdowns, and full CSV export.', tag: 'INSIGHTS', link: '/platform/booking#analytics' },
  { icon: '👥', color: '#fff7ed', border: '#fed7aa', title: 'Visitor Management', desc: 'Pre-register guests, self-service check-in kiosk, custom badges, and instant host notifications.', tag: 'ENTERPRISE', link: '/platform/visitors' },
  { icon: '🔗', color: '#fdf2f8', border: '#fbcfe8', title: 'Calendar & iCal', desc: 'Subscribe to any room\'s live calendar in Google or Outlook. Always in sync, automatically.', tag: 'INTEGRATION', link: '/platform/booking#integrations' },
  { icon: '🤖', color: '#fefce8', border: '#fde68a', title: 'AI Room Booker', desc: 'Describe what you need in plain language and AI finds and books the best available room.', tag: 'AI', link: '/platform/booking' },
]

const USE_CASES = [
  { icon: '🏢', title: 'Corporate Offices', desc: 'Multi-floor room management with SSO, floor plans, and enterprise controls.', href: '/use-cases/corporate' },
  { icon: '🤝', title: 'Coworking Spaces', desc: 'Member self-booking, guest kiosk, and utilisation tracking to maximise revenue.', href: '/use-cases/coworking' },
  { icon: '🏨', title: 'Hotels & Hospitality', desc: 'Conference booking, catering tags, and five-star guest check-in experience.', href: '/use-cases/hotels' },
  { icon: '🛒', title: 'SaaS Resellers', desc: 'White-label for your clients with custom domains and super admin control.', href: '/use-cases/resellers' },
]

const INTEGRATIONS = ['📅 Google Calendar', '📆 Outlook / M365', '🎥 Zoom', '🔑 Google SSO', '🔑 Microsoft SSO', '📱 PWA / Tablet', '🔗 iCal Feed', '📧 Email Notifications']

export default function Home() {
  const { openModal } = useModal()

  return (
    <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg,#f0fdf8 0%,#ffffff 70%)', borderBottom: '1px solid #e2e8f0', padding: '100px 0 80px', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse,rgba(0,192,122,0.09),transparent 70%)', pointerEvents: 'none' }} />
        <div className="container">
          <div className="badge animate-fade-up" style={{ marginBottom: 28 }}>
            <div className="badge-dot" />
            Now live at go.spaciohub.com
          </div>
          <h1 className="h1 animate-fade-up delay-1" style={{ marginBottom: 20 }}>
            The smartest way to<br />manage your <span className="accent">workspace</span>
          </h1>
          <p className="lead animate-fade-up delay-2" style={{ maxWidth: 540, margin: '0 auto 44px' }}>
            SpacioHub replaces chaotic email chains and spreadsheets with intelligent room booking, live door displays, visitor management, and real-time analytics.
          </p>
          <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free for 14 days</a>
          </div>
          <div className="animate-fade-up delay-4" style={{ display: 'flex', gap: 0, justifyContent: 'center', border: '1px solid #e2e8f0', borderRadius: 12, background: '#fff', overflow: 'hidden', maxWidth: 560, margin: '0 auto', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            {[['14', 'Day free trial'], ['5 min', 'Setup time'], ['$0', 'Setup cost'], ['∞', 'Scalability']].map(([n, l], i) => (
              <div key={l} style={{ flex: 1, padding: '20px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid #e2e8f0' : 'none' }}>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, color: '#0f172a' }}>{n}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ padding: '28px 0', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 16 }}>Trusted by modern workplaces</p>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Corporate Offices', 'Coworking Spaces', 'Hotels & Events', 'Universities', 'Healthcare'].map(t => (
              <span key={t} style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SCREEN MOCKUP */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="reveal" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.07)' }}>
            <div style={{ background: '#fff', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid #f1f5f9' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
              <div style={{ flex: 1, textAlign: 'center' }}><div style={{ display: 'inline-block', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 5, padding: '3px 20px', fontSize: 11, fontFamily: 'DM Mono,monospace', color: '#94a3b8' }}>go.spaciohub.com/Dashboard</div></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 360 }}>
              <div style={{ background: '#fff', borderRight: '1px solid #f1f5f9', padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px', borderRadius: 8, background: '#f8fafc', marginBottom: 16 }}>
                  <div style={{ width: 26, height: 26, background: '#00c07a', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>S</div>
                  <div><div style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>SpacioHub</div><div style={{ fontSize: 10, color: '#94a3b8' }}>Acme Corp</div></div>
                </div>
                {[['📊', 'Dashboard', true], ['📅', 'Book a Room'], ['🚪', 'Rooms'], ['📋', 'My Bookings'], ['🖥️', 'Door Display'], ['👥', 'Visitors'], ['📈', 'Analytics'], ['🤖', 'AI Booker']].map(([ic, label, active]) => (
                  <div key={label} style={{ padding: '7px 10px', borderRadius: 6, fontSize: 12, color: active ? '#00c07a' : '#94a3b8', background: active ? '#f0fdf8' : 'transparent', fontWeight: active ? 600 : 400, marginBottom: 1, display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span>{ic}</span>{label}
                  </div>
                ))}
              </div>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, background: '#f8fafc' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
                  {[['12', 'Active Rooms', true], ['38', "Today's Bookings"], ['4', 'In Use Now'], ['94%', 'Utilization']].map(([n, l, hi]) => (
                    <div key={l} style={{ background: hi ? '#f0fdf8' : '#fff', border: `1px solid ${hi ? '#d1fae5' : '#f1f5f9'}`, borderRadius: 10, padding: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: hi ? '#00c07a' : '#0f172a' }}>{n}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 10, padding: 16, flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(9,1fr)', gap: 3, marginBottom: 6 }}>
                    <div />{['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM'].map(h => <div key={h} style={{ fontSize: 9, color: '#cbd5e1', fontFamily: 'DM Mono,monospace', textAlign: 'center' }}>{h}</div>)}
                  </div>
                  {[{n:'Focus Room',c:'#3b82f6',s:[0,0,1,1,0,0,1,0,0]},{n:'Team Room',c:'#10b981',s:[1,1,0,0,1,0,0,1,0]},{n:'Conference',c:'#f59e0b',s:[0,1,1,0,0,1,1,0,1]},{n:'Board Room',c:'#8b5cf6',s:[0,0,0,1,1,0,0,0,0]}].map(r => (
                    <div key={r.n} style={{ display: 'grid', gridTemplateColumns: '90px repeat(9,1fr)', gap: 3, marginBottom: 4, alignItems: 'center' }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 5, overflow: 'hidden' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.c, flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.n}</span>
                      </div>
                      {r.s.map((bk, i) => <div key={i} style={{ height: 24, borderRadius: 3, background: bk ? r.c + '22' : '#f8fafc', borderLeft: bk ? `2px solid ${r.c}` : 'none' }} />)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="tag reveal">Features</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
              <h2 className="h2 reveal">Everything your workspace needs,<br />nothing it doesn't</h2>
              <p className="body reveal" style={{ maxWidth: 360 }}>Built for modern teams. Every feature designed to reduce admin work and improve how your space gets used.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#e2e8f0', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>
            {FEATURES.map((f, i) => (
              <Link key={f.title} to={f.link} style={{ background: '#fff', padding: 32, textDecoration: 'none', transition: 'background 0.2s', display: 'block', animationDelay: `${i * 0.08}s` }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                <div style={{ width: 44, height: 44, background: f.color, border: `1px solid ${f.border}`, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{f.desc}</p>
                <span style={{ display: 'inline-block', marginTop: 12, fontSize: 10, fontWeight: 700, color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: 100, letterSpacing: '0.5px' }}>{f.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span className="tag reveal">Use Cases</span>
          <h2 className="h2 reveal" style={{ marginBottom: 48 }}>Built for every kind of workspace</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {USE_CASES.map((uc, i) => (
              <Link key={uc.title} to={uc.href} className="card reveal" style={{ textDecoration: 'none', animationDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{uc.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{uc.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{uc.desc}</p>
                <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: '#00c07a' }}>Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section style={{ padding: '56px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="reveal" style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500, marginBottom: 24, letterSpacing: '0.3px' }}>Works seamlessly with your existing tools</p>
          <div className="reveal" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {INTEGRATIONS.map(i => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, color: '#374151', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>{i}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '96px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2 reveal" style={{ color: '#fff', marginBottom: 16 }}>Ready to transform your workspace?</h2>
          <p className="lead reveal" style={{ color: '#94a3b8', marginBottom: 36 }}>14-day free trial. No credit card required. Up and running in 5 minutes.</p>
          <div className="reveal" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1.5px solid #334155', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 8 }}>Try free for 14 days</a>
          </div>
        </div>
      </section>
    </main>
  )
}
