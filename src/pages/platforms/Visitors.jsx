import React from 'react'
import { useModal } from '../../components/ModalContext'

export default function PlatformVisitors() {
  const { openModal } = useModal()

  const steps = [
    { num: '01', title: 'Pre-register the visitor', desc: 'The host adds the visitor\'s name, email, and company before arrival. Visitor receives a welcome email with instructions.' },
    { num: '02', title: 'Visitor arrives & checks in', desc: 'At the entrance, the visitor taps their name on the self-service kiosk. No staff involvement needed.' },
    { num: '03', title: 'Badge printed', desc: 'A visitor badge is printed with their name, company, host, and expiry time. Custom branding available.' },
    { num: '04', title: 'Host notified instantly', desc: 'The host receives an email notification the moment their visitor checks in — no more waiting at reception.' },
  ]

  return (
    <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg,#f0fdf8,#fff)', borderBottom: '1px solid #e2e8f0', padding: '80px 0 64px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="tag animate-fade-up">Platform</span>
              <h1 className="h1 animate-fade-up delay-1" style={{ fontSize: 'clamp(32px,4vw,52px)', marginBottom: 20 }}>
                Visitor Management
              </h1>
              <p className="lead animate-fade-up delay-2" style={{ marginBottom: 36 }}>
                Create a professional, seamless visitor experience. Pre-register guests, enable self-service check-in, print custom badges, and keep hosts informed — automatically.
              </p>
              <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
                <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free</a>
              </div>
            </div>
            <div className="animate-fade-up delay-2">
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}>
                <div style={{ background: '#f8fafc', padding: '12px 20px', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>Visitor Check-in Kiosk</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>go.spaciohub.com/kiosk</div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>👋</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Welcome to Acme Corp</div>
                    <div style={{ fontSize: 13, color: '#94a3b8' }}>Please check in below</div>
                  </div>
                  <input readOnly style={{ width: '100%', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#94a3b8', fontFamily: 'Inter,sans-serif', marginBottom: 10 }} value="Search your name..." />
                  {[['James Wilson','Microsoft · 10:00 AM'],['Emma Clark','Freelance · 11:30 AM'],['David Park','Google · 2:00 PM']].map(([n,s]) => (
                    <div key={n} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <div><div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{n}</div><div style={{ fontSize: 11, color: '#94a3b8' }}>{s}</div></div>
                      <div style={{ background: '#ecfdf5', color: '#00c07a', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>Check in</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span className="tag reveal">How it works</span>
          <h2 className="h2 reveal" style={{ marginBottom: 48 }}>Seamless from invite to check-in</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {steps.map((s, i) => (
              <div key={s.num} className="reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ width: 40, height: 40, background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#00c07a', marginBottom: 16, fontFamily: 'DM Mono,monospace' }}>{s.num}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '72px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <span className="tag reveal">Features</span>
          <h2 className="h2 reveal" style={{ marginBottom: 40 }}>Everything in Visitor Management</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { icon: '📋', title: 'Pre-registration', desc: 'Hosts add visitors before arrival. Visitor receives welcome email with what to expect.' },
              { icon: '🖥️', title: 'Self-service Kiosk', desc: 'Visitors check in on a tablet at reception. No staff required for a smooth arrival.' },
              { icon: '📛', title: 'Custom Visitor Badges', desc: 'Badges include name, company, host, floor, and expiry time. Custom logo available.' },
              { icon: '📧', title: 'Instant Host Notification', desc: 'Host receives an email the moment their visitor checks in. Never leave a guest waiting.' },
              { icon: '📊', title: 'Visitor Analytics', desc: 'Track visitor volumes, peak times, frequent visitors, and host activity over time.' },
              { icon: '🔒', title: 'Visitor Log', desc: 'Complete audit trail of every visitor — for security, compliance, and fire safety records.' },
            ].map((f, i) => (
              <div key={f.title} className="card reveal" style={{ animationDelay: `${i*0.08}s` }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ color: '#fff', marginBottom: 14 }}>Make every visitor feel welcome</h2>
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
