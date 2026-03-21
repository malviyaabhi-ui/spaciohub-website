import React, { useState } from 'react'
import { useModal } from '../components/ModalContext'

const FEATURES_TABLE = [
  { cat: 'Booking', rows: [
    { name: 'Active rooms', basic: '5', pro: '15', max: 'Unlimited', ent: 'Unlimited' },
    { name: 'Users / members', basic: '10', pro: '50', max: 'Unlimited', ent: 'Unlimited' },
    { name: 'Time grid booking', basic: true, pro: true, max: true, ent: true },
    { name: 'Booking tags', basic: true, pro: true, max: true, ent: true },
    { name: '15-min buffer enforcement', basic: true, pro: true, max: true, ent: true },
    { name: 'AI Room Booker', basic: false, pro: false, max: true, ent: true },
    { name: 'Booking approval workflow', basic: false, pro: true, max: true, ent: true },
  ]},
  { cat: 'Door Display', rows: [
    { name: 'Door display panel', basic: true, pro: true, max: true, ent: true },
    { name: 'Auto no-show release', basic: true, pro: true, max: true, ent: true },
    { name: 'Guest booking from display', basic: true, pro: true, max: true, ent: true },
    { name: 'PWA installation', basic: true, pro: true, max: true, ent: true },
  ]},
  { cat: 'Integrations', rows: [
    { name: 'Zoom auto-links', basic: false, pro: true, max: true, ent: true },
    { name: 'iCal feed per room', basic: false, pro: true, max: true, ent: true },
    { name: 'Google Calendar sync', basic: false, pro: true, max: true, ent: true },
    { name: 'Google SSO', basic: false, pro: true, max: true, ent: true },
    { name: 'Microsoft SSO', basic: false, pro: false, max: true, ent: true },
    { name: 'SAML SSO', basic: false, pro: false, max: false, ent: true },
  ]},
  { cat: 'Visitors', rows: [
    { name: 'Visitor management', basic: false, pro: true, max: true, ent: true },
    { name: 'Self-service check-in kiosk', basic: false, pro: true, max: true, ent: true },
    { name: 'Visitor badges', basic: false, pro: true, max: true, ent: true },
    { name: 'Pre-registration', basic: false, pro: true, max: true, ent: true },
  ]},
  { cat: 'Analytics', rows: [
    { name: 'Basic analytics', basic: true, pro: true, max: true, ent: true },
    { name: 'Advanced analytics + charts', basic: false, pro: true, max: true, ent: true },
    { name: 'No-show rate tracking', basic: false, pro: true, max: true, ent: true },
    { name: 'CSV data export', basic: false, pro: false, max: true, ent: true },
    { name: 'Custom reports', basic: false, pro: false, max: false, ent: true },
  ]},
  { cat: 'Admin & Security', rows: [
    { name: 'Floor plans', basic: false, pro: true, max: true, ent: true },
    { name: 'White-label branding', basic: false, pro: false, max: true, ent: true },
    { name: 'Custom domain', basic: false, pro: false, max: false, ent: true },
    { name: 'On-premise deployment', basic: false, pro: false, max: false, ent: true },
    { name: 'SLA guarantee', basic: false, pro: false, max: false, ent: true },
    { name: 'Dedicated support', basic: false, pro: false, max: false, ent: true },
  ]},
]

const FAQS = [
  { q: 'Can I switch plans later?', a: 'Yes. You can upgrade or downgrade at any time. When upgrading, you get access to new features immediately. Downgrades take effect at the next billing cycle.' },
  { q: 'Does the free trial require a credit card?', a: 'No. You can start your 14-day free trial with just your email. No credit card is required until you choose a paid plan.' },
  { q: 'What counts as a "room"?', a: 'Any bookable space — meeting rooms, conference rooms, hot desks, event spaces, studios, or any resource you want people to book. Each unique bookable space counts as one room.' },
  { q: 'Can I have multiple organisations?', a: 'Yes. With the Max and Enterprise plans, each organisation is completely separate with its own rooms, users, settings, and analytics. Our Super Admin dashboard lets you manage all tenants from one place.' },
  { q: 'Do you offer discounts for non-profits or education?', a: 'Yes. Contact us at contact@spaciohub.com with details about your organisation and we\'ll work out a suitable arrangement.' },
  { q: 'How does the Door Display work?', a: 'You install SpacioHub on any iPad or Android tablet mounted outside your meeting room. It shows live availability, today\'s schedule, and allows anyone to book or check in — no login required. It installs as a PWA so no app store is needed.' },
  { q: 'What happens when the trial ends?', a: 'Your account moves to a limited free mode. Your data is preserved. You can upgrade at any time to restore full access.' },
  { q: 'Is my data secure?', a: 'Yes. SpacioHub is built on Supabase (PostgreSQL with row-level security), hosted on secure cloud infrastructure, with all data encrypted in transit and at rest.' },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)
  const { openModal } = useModal()

  const plans = [
    { name: 'Basic', monthly: 2.5, annual: 30, period: annual ? '/year' : '/mo', desc: 'For small teams getting started', cta: 'Get started free', href: 'https://go.spaciohub.com', pop: false },
    { name: 'Pro', monthly: 8, annual: 4.99, period: annual ? '/mo' : '/mo', desc: 'For growing teams with more needs', cta: 'Start free trial', href: 'https://go.spaciohub.com', pop: false },
    { name: 'Max', monthly: 15, annual: 8.99, period: annual ? '/mo' : '/mo', desc: 'Unlimited everything for large teams', cta: 'Request Demo', href: null, pop: true },
    { name: 'Enterprise', monthly: null, annual: null, period: '', desc: 'Custom for complex organisations', cta: 'Contact Sales', href: null, pop: false },
  ]

  const getPrice = (p) => {
    if (p.name === 'Enterprise') return 'Custom'
    if (p.name === 'Basic') return annual ? `$${p.annual}` : `$${(p.annual/12).toFixed(2)}`
    return annual ? `$${p.annual}` : `$${p.monthly}`
  }

  const Check = () => <span style={{ color: '#00c07a', fontSize: 16, fontWeight: 700 }}>✓</span>
  const Cross = () => <span style={{ color: '#cbd5e1', fontSize: 16 }}>—</span>

  return (
    <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg,#f0fdf8,#fff)', borderBottom: '1px solid #e2e8f0', padding: '72px 0 60px', textAlign: 'center' }}>
        <div className="container">
          <span className="tag">Pricing</span>
          <h1 className="h1" style={{ fontSize: 'clamp(36px,5vw,60px)', marginBottom: 16 }}>Simple, transparent pricing</h1>
          <p className="lead" style={{ maxWidth: 480, margin: '0 auto 36px' }}>Start free. Scale as you grow. No hidden fees, no per-seat surprises.</p>

          {/* Toggle */}
          <div style={{ display: 'inline-flex', background: '#f1f5f9', borderRadius: 10, padding: 4, gap: 4, marginBottom: 12 }}>
            <button onClick={() => setAnnual(false)} style={{ padding: '8px 20px', borderRadius: 7, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', background: !annual ? '#fff' : 'transparent', color: !annual ? '#0f172a' : '#64748b', boxShadow: !annual ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>Monthly</button>
            <button onClick={() => setAnnual(true)} style={{ padding: '8px 20px', borderRadius: 7, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', background: annual ? '#fff' : 'transparent', color: annual ? '#0f172a' : '#64748b', boxShadow: annual ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6 }}>
              Annual <span style={{ background: '#00c07a', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 100 }}>Save 40%</span>
            </button>
          </div>
        </div>
      </section>

      {/* PLAN CARDS */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {plans.map(p => (
              <div key={p.name} style={{ background: p.pop ? 'linear-gradient(180deg,#f0fdf8,#fff)' : '#fff', border: `1.5px solid ${p.pop ? '#00c07a' : '#e2e8f0'}`, borderRadius: 14, padding: 28, position: 'relative', transition: 'all 0.2s', boxShadow: p.pop ? '0 8px 32px rgba(0,192,122,0.12)' : '0 1px 4px rgba(0,0,0,0.04)' }}>
                {p.pop && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#00c07a', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 14px', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: '0.5px' }}>MOST POPULAR</div>}
                <div style={{ fontSize: 12, fontWeight: 700, color: p.pop ? '#00c07a' : '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>{p.desc}</div>
                <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: -2, color: '#0f172a', marginBottom: 2 }}>{getPrice(p)}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 28 }}>{p.name !== 'Enterprise' && (annual && p.name === 'Basic' ? 'billed annually' : annual ? 'per month, billed annually' : 'per month')}</div>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', padding: 11, borderRadius: 8, fontSize: 14, fontWeight: 600, textAlign: 'center', textDecoration: 'none', background: p.pop ? '#00c07a' : '#fff', color: p.pop ? '#fff' : '#0f172a', border: `1.5px solid ${p.pop ? '#00c07a' : '#e2e8f0'}`, transition: 'all 0.2s' }}>{p.cta}</a>
                ) : (
                  <button onClick={openModal} style={{ display: 'block', width: '100%', padding: 11, borderRadius: 8, fontSize: 14, fontWeight: 600, textAlign: 'center', background: p.pop ? '#00c07a' : '#fff', color: p.pop ? '#fff' : '#0f172a', border: `1.5px solid ${p.pop ? '#00c07a' : '#e2e8f0'}`, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s' }}>{p.cta}</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <h2 className="h2 reveal" style={{ marginBottom: 8 }}>Full feature comparison</h2>
          <p className="body reveal" style={{ marginBottom: 40 }}>Everything you need to choose the right plan.</p>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4,120px)', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '14px 20px' }}>
              <div />
              {['Basic', 'Pro', 'Max', 'Enterprise'].map(n => (
                <div key={n} style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: n === 'Max' ? '#00c07a' : '#0f172a' }}>{n}</div>
              ))}
            </div>
            {FEATURES_TABLE.map(cat => (
              <div key={cat.cat}>
                <div style={{ padding: '10px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', borderTop: '1px solid #e2e8f0', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>{cat.cat}</div>
                {cat.rows.map((row, i) => (
                  <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4,120px)', padding: '12px 20px', borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{row.name}</div>
                    {['basic', 'pro', 'max', 'ent'].map(k => (
                      <div key={k} style={{ textAlign: 'center', fontSize: 13, color: '#0f172a', fontWeight: 500 }}>
                        {typeof row[k] === 'boolean' ? (row[k] ? <Check /> : <Cross />) : row[k]}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: '64px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: 760, margin: '0 auto', padding: '0 48px' }}>
          <h2 className="h2 reveal" style={{ marginBottom: 8, textAlign: 'center' }}>Frequently asked questions</h2>
          <p className="body reveal" style={{ textAlign: 'center', marginBottom: 40 }}>Can't find an answer? Email us at <a href="mailto:contact@spaciohub.com" style={{ color: '#00c07a' }}>contact@spaciohub.com</a></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="reveal" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', transition: 'all 0.2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter,sans-serif' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', paddingRight: 16 }}>{faq.q}</span>
                  <span style={{ fontSize: 18, color: '#94a3b8', flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#64748b', lineHeight: 1.7, animation: 'fadeIn 0.2s ease' }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ color: '#fff', marginBottom: 14 }}>Still have questions?</h2>
          <p className="lead" style={{ color: '#94a3b8', marginBottom: 32 }}>Talk to our team. We'll help you pick the right plan.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
            <a href="mailto:contact@spaciohub.com" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1.5px solid #334155', textDecoration: 'none' }}>Email Us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
