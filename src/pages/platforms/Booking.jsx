import React from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../../components/ModalContext'

const FEATURES = [
  { icon: '📅', title: 'Visual Time Grid', desc: 'See all rooms side by side in a live time grid. Click any slot to book instantly.' },
  { icon: '🤖', title: 'AI Room Booker', desc: 'Describe what you need in plain language. AI picks the best available room automatically.' },
  { icon: '🏷️', title: 'Booking Tags', desc: 'Tag bookings as Client Meeting, Training, All-Hands, Interview, and more. Filter and analyse by tag.' },
  { icon: '⏱️', title: '15-min Buffer Enforcement', desc: 'Automatic gap between meetings so rooms are ready for the next booking.' },
  { icon: '🎥', title: 'Zoom Auto-links', desc: 'Every booking automatically gets a Zoom meeting link. No manual setup needed.' },
  { icon: '🔗', title: 'iCal Feed per Room', desc: 'Subscribe to any room\'s live calendar in Google Calendar or Outlook.' },
  { icon: '📧', title: 'Email Confirmations', desc: 'Instant booking confirmations sent to organisers and attendees with all details.' },
  { icon: '🚫', title: 'No-show Auto-release', desc: 'If no one checks in within 15 minutes, the room is automatically freed.' },
]

export default function PlatformBooking() {
  const { openModal } = useModal()

  return (
    <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg,#f0fdf8,#fff)', borderBottom: '1px solid #e2e8f0', padding: '80px 0 64px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="tag animate-fade-up">Platform</span>
              <h1 className="h1 animate-fade-up delay-1" style={{ fontSize: 'clamp(32px,4vw,52px)', marginBottom: 20 }}>
                Room Booking System
              </h1>
              <p className="lead animate-fade-up delay-2" style={{ marginBottom: 36 }}>
                The complete meeting room booking platform. Visual time grid, AI suggestions, Zoom integration, door displays, and analytics — all in one place.
              </p>
              <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
                <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free</a>
              </div>
            </div>
            <div className="animate-fade-up delay-2">
              {/* Mini dashboard mockup */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}>
                <div style={{ background: '#f8fafc', padding: '10px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
                  <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'DM Mono,monospace', marginLeft: 8 }}>Book a Room</span>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(6,1fr)', gap: 3, marginBottom: 6 }}>
                    <div />
                    {['9AM','10AM','11AM','12PM','1PM','2PM'].map(h => <div key={h} style={{ fontSize: 9, color: '#cbd5e1', fontFamily: 'DM Mono,monospace', textAlign: 'center' }}>{h}</div>)}
                  </div>
                  {[{n:'Board Rm',c:'#8b5cf6',s:[0,1,1,0,0,1]},{n:'Team Rm',c:'#10b981',s:[1,0,0,1,1,0]},{n:'Focus Rm',c:'#3b82f6',s:[0,0,1,0,0,0]},{n:'Conf Rm',c:'#f59e0b',s:[1,1,0,0,1,1]}].map(r => (
                    <div key={r.n} style={{ display: 'grid', gridTemplateColumns: '80px repeat(6,1fr)', gap: 3, marginBottom: 3 }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: r.c }} />{r.n}
                      </div>
                      {r.s.map((bk, i) => <div key={i} style={{ height: 22, borderRadius: 3, background: bk ? r.c + '25' : '#f8fafc', borderLeft: bk ? `2px solid ${r.c}` : 'none' }} />)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" style={{ padding: '72px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span className="tag reveal">Features</span>
          <h2 className="h2 reveal" style={{ marginBottom: 48 }}>Everything in the booking system</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className="card reveal" style={{ animationDelay: `${i * 0.06}s` }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOOR DISPLAY */}
      <section id="door-display" style={{ padding: '72px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="tag reveal">Door Display</span>
              <h2 className="h2 reveal" style={{ marginBottom: 16 }}>Turn any tablet into a smart room panel</h2>
              <p className="body reveal" style={{ marginBottom: 24 }}>Mount on any iPad or Android outside your meeting room. Real-time status, quick book, check-in and extend — all without login. PIN-protected admin settings.</p>
              <div className="check-list reveal">
                {['<strong>Auto no-show release</strong> after 15 mins without check-in','<strong>PIN-protected settings</strong> — 4 tabs of display configuration','<strong>PWA install</strong> — add to home screen, no app store','<strong>Guest booking</strong> from the display without an account','<strong>Works offline</strong> — shows last known status'].map((c,i) => (
                  <div key={i} className="check-item">
                    <div className="check-ic"><svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg></div>
                    <div className="check-text" dangerouslySetInnerHTML={{ __html: c }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <div style={{ background: '#0f172a', borderRadius: 16, padding: 28, color: '#fff' }}>
                <div style={{ fontSize: 10, fontFamily: 'DM Mono,monospace', color: '#334155', marginBottom: 14 }}>SAT, MAR 21 · 11:16 AM</div>
                <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16 }}>Conference<br/>Room</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 100, background: 'rgba(0,192,122,0.12)', border: '1px solid rgba(0,192,122,0.25)', color: '#00c07a', fontSize: 12, fontWeight: 600 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00c07a', animation: 'pulse 2s infinite' }} />Available
                </div>
                <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #1e293b' }}>
                  <div style={{ fontSize: 10, fontFamily: 'DM Mono,monospace', color: '#334155', marginBottom: 6, letterSpacing: 1 }}>NEXT MEETING</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Team Standup</div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>2:00 PM — 2:30 PM · 5 attendees</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 18 }}>
                  <div style={{ background: 'rgba(0,192,122,0.12)', border: '1px solid rgba(0,192,122,0.25)', color: '#00c07a', padding: 10, borderRadius: 8, textAlign: 'center', fontSize: 12, fontWeight: 600 }}>⚡ Book Now</div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1e293b', color: '#475569', padding: 10, borderRadius: 8, textAlign: 'center', fontSize: 12 }}>Guest Booking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <section id="analytics" style={{ padding: '72px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span className="tag reveal">Analytics</span>
          <h2 className="h2 reveal" style={{ marginBottom: 16 }}>Understand how your space is used</h2>
          <p className="body reveal" style={{ marginBottom: 40, maxWidth: 520 }}>Real-time dashboards show peak hours, utilisation rates, no-show patterns, and booking tag breakdowns — everything to optimise your workspace.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { icon: '📊', title: 'Utilisation Rate', desc: 'See which rooms are over- and under-used. Optimise layouts based on real data.' },
              { icon: '⏰', title: 'Peak Hours', desc: 'Heatmap showing your busiest booking periods. Staff and plan accordingly.' },
              { icon: '👻', title: 'No-show Tracking', desc: 'Track ghost bookings and auto-release rates to reduce wasted room time.' },
              { icon: '🏷️', title: 'Tag Breakdown', desc: 'See which meeting types dominate. Client meetings vs internal vs training.' },
              { icon: '👤', title: 'Top Bookers', desc: 'Identify who books most and when. Spot patterns and optimise access.' },
              { icon: '📥', title: 'CSV Export', desc: 'Export all booking data for custom reporting, billing, or compliance.' },
            ].map((f,i) => (
              <div key={f.title} className="card reveal" style={{ animationDelay: `${i*0.08}s` }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: '#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" style={{ padding: '64px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
        <div className="container">
          <span className="tag reveal">Integrations</span>
          <h2 className="h2 reveal" style={{ marginBottom: 12 }}>Works with the tools you already use</h2>
          <p className="body reveal" style={{ marginBottom: 40 }}>No migration needed. SpacioHub connects to your existing calendar and communication tools.</p>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, maxWidth: 700, margin: '0 auto' }}>
            {[['📅','Google Calendar','Subscribe to room calendars'],['📆','Outlook / M365','Full calendar sync'],['🎥','Zoom','Auto-links on every booking'],['🔗','iCal Feed','Universal calendar standard'],['🔑','Google SSO','One-click sign in'],['🔑','Microsoft SSO','Azure AD integration'],['📱','PWA','Install on any device'],['📧','Email','Confirmations + reminders']].map(([ic,t,d]) => (
              <div key={t} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 14px', textAlign: 'left' }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{ic}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 3 }}>{t}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ color: '#fff', marginBottom: 14 }}>Ready to fix your room booking chaos?</h2>
          <p className="lead" style={{ color: '#94a3b8', marginBottom: 32 }}>14-day free trial. No credit card required.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1.5px solid #334155', textDecoration: 'none' }}>Try free for 14 days</a>
          </div>
        </div>
      </section>
    </main>
  )
}
