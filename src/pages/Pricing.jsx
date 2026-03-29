import SEO from '../components/SEO'
import { PAGE_SEO } from '../components/pageSEO'
import React, { useState } from 'react'
import { useModal } from '../components/ModalContext'

const FEATURES_TABLE = [
  { cat: 'Booking', rows: [
    { name: 'Active rooms',              basic: '2',  pro: '5 + add-ons',  max: 'Unlimited', ent: 'Unlimited' },
    { name: 'Users / members',           basic: '5',  pro: '25', max: 'Unlimited', ent: 'Unlimited' },
    { name: 'Time grid booking',         basic: true,  pro: true,  max: true,  ent: true  },
    { name: 'Booking tags',              basic: true,  pro: true,  max: true,  ent: true  },
    { name: '15-min buffer enforcement', basic: true,  pro: true,  max: true,  ent: true  },
    { name: 'Booking approval workflow', basic: false, pro: true,  max: true,  ent: true  },
    { name: 'AI Room Booker',            basic: false, pro: false, max: true,  ent: true  },
  ]},
  { cat: 'Door Display', rows: [
    { name: 'Door display panels',       basic: '1',   pro: '5',  max: 'Unlimited', ent: 'Unlimited' },
    { name: 'Auto no-show release',      basic: true,  pro: true,  max: true,  ent: true  },
    { name: 'Guest booking from display',basic: false, pro: true,  max: true,  ent: true  },
    { name: 'PWA installation',          basic: true,  pro: true,  max: true,  ent: true  },
  ]},
  { cat: 'Integrations', rows: [
    { name: 'iCal feed per room',          basic: true,  pro: true,  max: true,  ent: true  },
    { name: 'Email alerts & notifications',basic: true,  pro: true,  max: true,  ent: true  },
    { name: 'Google Calendar sync',        basic: false, pro: true,  max: true,  ent: true  },
    { name: 'Microsoft 365 / Outlook',     basic: false, pro: true,  max: true,  ent: true  },
    { name: 'Zoom auto-links',             basic: false, pro: true,  max: true,  ent: true  },
    { name: 'MS Teams meeting links',      basic: false, pro: false, max: true,  ent: true  },
    { name: 'Google SSO',                  basic: false, pro: false, max: true,  ent: true  },
    { name: 'Microsoft SSO / Azure AD',    basic: false, pro: false, max: true,  ent: true  },
    { name: 'SAML SSO',                    basic: false, pro: false, max: false, ent: true  },
  ]},
  { cat: 'Visitors', rows: [
    { name: 'Visitor management',        basic: false, pro: true,  max: true,  ent: true  },
    { name: 'Self-service check-in kiosk',basic: false, pro: true,  max: true,  ent: true  },
    { name: 'Visitor badges',            basic: false, pro: true,  max: true,  ent: true  },
    { name: 'Pre-registration',          basic: false, pro: true,  max: true,  ent: true  },
  ]},
  { cat: 'Analytics', rows: [
    { name: 'Basic analytics',           basic: true,  pro: true,  max: true,  ent: true  },
    { name: 'Advanced analytics + charts',basic: false, pro: true,  max: true,  ent: true  },
    { name: 'No-show rate tracking',     basic: false, pro: true,  max: true,  ent: true  },
    { name: 'CSV data export',           basic: false, pro: false, max: true,  ent: true  },
    { name: 'Custom reports',            basic: false, pro: false, max: false, ent: true  },
  ]},
  { cat: 'Admin & Security', rows: [
    { name: 'Floor plans',               basic: false, pro: true,  max: true,  ent: true  },
    { name: 'White-label branding',      basic: false, pro: false, max: true,  ent: true  },
    { name: 'Custom domain',             basic: false, pro: false, max: false, ent: true  },
    { name: 'On-premise deployment',     basic: false, pro: false, max: false, ent: true  },
    { name: 'SLA guarantee',             basic: false, pro: false, max: false, ent: true  },
    { name: 'Dedicated support',         basic: false, pro: false, max: false, ent: true  },
  ]},
]

const FAQS = [
  { q: 'Can I switch plans later?', a: 'Yes. You can upgrade or downgrade at any time. When upgrading, you get access to new features immediately. Downgrades take effect at the next billing cycle.' },
  { q: 'Does the free trial require a credit card?', a: 'No. You can start your 14-day free trial with just your email. No credit card is required until you choose a paid plan.' },
  { q: 'What counts as a "room"?', a: 'Any bookable space — meeting rooms, conference rooms, hot desks, event spaces, studios, or any resource you want people to book. Each unique bookable space counts as one room.' },
  { q: 'Can I have multiple organisations?', a: 'Yes. With the Max and Enterprise plans, each organisation is completely separate with its own rooms, users, settings, and analytics. Our Super Admin dashboard lets you manage all tenants from one place.' },
  { q: 'Do you offer discounts for non-profits or education?', a: "Yes. Contact us at contact@spaciohub.com with details about your organisation and we'll work out a suitable arrangement." },
  { q: 'How does the Door Display work?', a: "You install SpacioHub on any iPad or Android tablet mounted outside your meeting room. It shows live availability, today's schedule, and allows anyone to book or check in — no login required. It installs as a PWA so no app store is needed." },
  { q: 'What happens when the trial ends?', a: 'Your account moves to a limited free mode. Your data is preserved. You can upgrade at any time to restore full access.' },
  { q: 'Is my data secure?', a: 'Yes. SpacioHub is built on Supabase (PostgreSQL with row-level security), hosted on secure cloud infrastructure, with all data encrypted in transit and at rest.' },
]

const PLAN_CONFIGS = [
  { name: 'Basic',      icon: '🌱', monthlyPrice: null,  annualPrice: '$30',   period: 'per year',          desc: 'For small teams getting started',        cta: 'Get started free',  href: 'https://go.spaciohub.com', pop: false, color: '#f8fafc',     border: '#e2e8f0',  accent: '#64748b' },
  { name: 'Pro',        icon: '⚡', monthlyPrice: '$8',   annualPrice: '$4.99', period: 'per month',         desc: 'For growing teams with more needs',       cta: 'Start free trial',  href: 'https://go.spaciohub.com', pop: false, color: '#eff6ff',     border: '#bfdbfe',  accent: '#3b82f6' },
  { name: 'Max',        icon: '🚀', monthlyPrice: '$15',  annualPrice: '$8.99', period: 'per month',         desc: 'Unlimited everything for large teams',    cta: 'Request Demo',      href: null,                       pop: true,  color: '#0f172a',     border: '#00c07a',  accent: '#00c07a' },
  { name: 'Enterprise', icon: '🏢', monthlyPrice: null,   annualPrice: null,    period: '',                  desc: 'Custom for complex organisations',        cta: 'Contact Sales',     href: null,                       pop: false, color: '#fefce8',     border: '#fde68a',  accent: '#d97706' },
]

const QUESTIONS = [
  {
    id: 'rooms',
    q: 'How many meeting rooms do you need to manage?',
    options: [
      { label: '1–2 rooms',      value: 'basic', icon: '🚪' },
      { label: '3–5 rooms',      value: 'pro',   icon: '🏢' },
      { label: '6–15 rooms',     value: 'pro+',  icon: '🏬' },
      { label: '16+ or unlimited', value: 'max', icon: '🌐' },
    ]
  },
  {
    id: 'team',
    q: 'How many people will use SpacioHub?',
    options: [
      { label: 'Just me / 1–5 people', value: 'basic', icon: '👤' },
      { label: '6–25 people',           value: 'pro',   icon: '👥' },
      { label: '26–100 people',         value: 'max',   icon: '🏟️' },
      { label: '100+ or multiple orgs', value: 'ent',   icon: '🌍' },
    ]
  },
  {
    id: 'integrations',
    q: 'Which integrations do you need?',
    options: [
      { label: 'Just iCal / email alerts', value: 'basic', icon: '📧' },
      { label: 'Google or Outlook calendar sync', value: 'pro', icon: '📅' },
      { label: 'SSO (Google or Microsoft)',  value: 'max',  icon: '🔑' },
      { label: 'SAML SSO / custom setup',   value: 'ent',  icon: '🛡️' },
    ]
  },
  {
    id: 'usecase',
    q: 'What best describes your setup?',
    options: [
      { label: 'Small office / startup',       value: 'basic', icon: '🌱' },
      { label: 'Growing team or business',     value: 'pro',   icon: '⚡' },
      { label: 'Coworking / multi-floor corp', value: 'max',   icon: '🚀' },
      { label: 'Agency / reseller / enterprise', value: 'ent', icon: '🏢' },
    ]
  },
]

const PLAN_RESULT = {
  basic: { name: 'Basic',      color: '#64748b', bg: '#f8fafc', border: '#e2e8f0', desc: 'Perfect for small teams just getting started. 2 rooms, 5 users, iCal and email included.',    cta: 'Get started free' },
  pro:   { name: 'Pro',        color: '#0F799B', bg: '#eff6ff', border: '#bfdbfe', desc: 'Great for growing teams. 5 rooms + add-ons, 25 users, calendar sync and Zoom included.',       cta: 'Start free trial' },
  max:   { name: 'Max',        color: '#00c07a', bg: '#ecfdf5', border: '#a7f3d0', desc: 'Unlimited rooms and users. SSO, white-label, AI Booker, and full analytics included.',          cta: 'Request a Demo' },
  ent:   { name: 'Enterprise', color: '#d97706', bg: '#fefce8', border: '#fde68a', desc: 'Custom setup for complex orgs. SAML SSO, custom domain, SLA, dedicated support, and more.', cta: 'Contact Sales' },
}

const PLAN_SCORE = { basic: 0, 'pro+': 1, pro: 1, max: 2, ent: 3 }

function PlanFinder({ openModal }) {
  const [answers, setAnswers] = useState({})
  const [revealed, setRevealed] = useState(false)

  const toggle = (qid, val) => {
    setAnswers(prev => ({ ...prev, [qid]: val }))
    setRevealed(false)
  }

  const answered = Object.keys(answers).length
  const allDone = answered === QUESTIONS.length

  // Score each plan
  const recommended = (() => {
    if (!allDone) return null
    const scores = { basic: 0, pro: 0, max: 0, ent: 0 }
    Object.values(answers).forEach(v => {
      if (v === 'basic') scores.basic += 1
      else if (v === 'pro' || v === 'pro+') { scores.pro += 1 }
      else if (v === 'max') scores.max += 1
      else if (v === 'ent') scores.ent += 1
    })
    // Pick highest plan with most votes, escalate if any ent/max
    if (scores.ent > 0) return 'ent'
    if (scores.max > 0) return 'max'
    if (scores.pro > 0) return 'pro'
    return 'basic'
  })()

  const result = recommended ? PLAN_RESULT[recommended] : null

  return (
    <div>
      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {QUESTIONS.map((q, qi) => (
          <div key={q.id} className="reveal" style={{ animationDelay: `${qi * 0.1}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: answers[q.id] ? '#00c07a' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                {answers[q.id]
                  ? <svg viewBox="0 0 10 10" width="10" height="10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>{qi + 1}</span>
                }
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{q.q}</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4" style={{gap: '4px 8px', paddingLeft: 32}}>
              {q.options.map(opt => {
                const selected = answers[q.id] === opt.value
                return (
                  <label key={opt.label} onClick={() => toggle(q.id, opt.value)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 4px', cursor: 'pointer', transition: 'all 0.15s', userSelect: 'none' }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${selected ? '#00c07a' : '#d1d5db'}`, background: selected ? '#00c07a' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                      {selected && <svg viewBox="0 0 10 10" width="9" height="9" fill="none"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: selected ? 600 : 400, color: selected ? '#009960' : '#64748b' }}>{opt.label}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#f1f5f9', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(answered / QUESTIONS.length) * 100}%`, background: 'linear-gradient(90deg,#00c07a,#0F799B)', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{answered}/{QUESTIONS.length} answered</span>
      </div>

      {/* Result */}
      {allDone && (
        <div style={{ marginTop: 32, animation: 'finderReveal 0.4s ease' }}>
          <div style={{ background: `linear-gradient(135deg,${result.bg},#fff)`, border: `2px solid ${result.color}`, borderRadius: 20, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', boxShadow: `0 12px 40px ${result.color}20` }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>We recommend</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: result.color, marginBottom: 8, letterSpacing: -0.5 }}>{result.name} Plan</div>
              <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{result.desc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'stretch', minWidth: 180 }}>
              {result.name === 'Enterprise' || result.name === 'Max'
                ? <button onClick={openModal} style={{ background: result.color, color: '#fff', border: 'none', borderRadius: 10, padding: '13px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s', boxShadow: `0 6px 20px ${result.color}40` }}>{result.cta} →</button>
                : <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ background: result.color, color: '#fff', borderRadius: 10, padding: '13px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center', transition: 'all 0.2s', boxShadow: `0 6px 20px ${result.color}40` }}>{result.cta} →</a>
              }
              <button onClick={() => setAnswers({})} style={{ background: 'transparent', color: '#94a3b8', border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '10px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Start over</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes finderReveal { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }`}</style>
    </div>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)
  const { openModal } = useModal()

  return (
    <>
      <SEO {...PAGE_SEO.pricing} />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(170deg,#f0fdf8 0%,#ffffff 60%,#f8fafc 100%)', borderBottom: '1px solid #e2e8f0', padding: '80px 0 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse,rgba(0,192,122,0.10),transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,192,122,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,192,122,0.025) 1px,transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="tag">Pricing</span>
          <h1 className="h1 animate-fade-up" style={{ fontSize: 'clamp(36px,5vw,60px)', marginBottom: 16 }}>
            Simple, <span style={{ background: 'linear-gradient(135deg,#00c07a,#0090ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>transparent</span> pricing
          </h1>
          <p className="lead animate-fade-up delay-1" style={{ maxWidth: 480, margin: '0 auto 36px' }}>Start free. Scale as you grow. No hidden fees, no per-seat surprises.</p>
          {/* Toggle */}
          <div className="animate-fade-up delay-2" style={{ display: 'inline-flex', background: '#f1f5f9', borderRadius: 12, padding: 4, gap: 4, marginBottom: 16 }}>
            <button onClick={() => setAnnual(false)} style={{ padding: '9px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', background: !annual ? '#fff' : 'transparent', color: !annual ? '#0f172a' : '#64748b', boxShadow: !annual ? '0 1px 6px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>Monthly</button>
            <button onClick={() => setAnnual(true)} style={{ padding: '9px 22px', borderRadius: 9, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', background: annual ? '#fff' : 'transparent', color: annual ? '#0f172a' : '#64748b', boxShadow: annual ? '0 1px 6px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
              Annual <span style={{ background: 'linear-gradient(135deg,#00c07a,#009960)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>Save 40%</span>
            </button>
          </div>
        </div>
      </section>

      {/* ══ PLAN CARDS ════════════════════════════════════ */}
      <section style={{ padding: '56px 0', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{gap: 16, alignItems: 'start'}}>
            {PLAN_CONFIGS.map((p, idx) => {
              const price = p.name === 'Enterprise' ? 'Custom' : annual ? p.annualPrice : p.monthlyPrice || p.annualPrice
              const subline = p.name === 'Enterprise' ? 'Talk to our team' : p.name === 'Basic' ? (annual ? 'billed annually' : 'per year') : annual ? 'per month, billed annually' : 'per month'
              return (
                <div key={p.name} className="reveal" style={{ animationDelay: `${idx*0.08}s`, background: p.pop ? 'linear-gradient(160deg,#0f172a,#1a2744)' : p.color, border: `1.5px solid ${p.border}`, borderRadius: 20, padding: '28px 24px', position: 'relative', boxShadow: p.pop ? '0 20px 60px rgba(0,192,122,0.2)' : '0 2px 8px rgba(0,0,0,0.04)', transform: p.pop ? 'translateY(-8px)' : 'none' }}>
                  {p.pop && <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#00c07a,#009960)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 16px', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: '0.5px', boxShadow: '0 4px 14px rgba(0,192,122,0.4)' }}>MOST POPULAR</div>}
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: p.pop ? '#00c07a' : p.accent, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: p.pop ? '#64748b' : '#94a3b8', marginBottom: 20, lineHeight: 1.5 }}>{p.desc}</div>
                  <div style={{ marginBottom: 6 }}>
                    <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: -2, color: p.pop ? '#fff' : '#0f172a', lineHeight: 1 }}>{price}</span>
                  </div>
                  <div style={{ fontSize: 12, color: p.pop ? '#475569' : '#94a3b8', marginBottom: 28 }}>{subline}</div>
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700, textAlign: 'center', textDecoration: 'none', background: p.pop ? '#00c07a' : 'transparent', color: p.pop ? '#fff' : p.accent, border: `1.5px solid ${p.pop ? '#00c07a' : p.border}`, transition: 'all 0.2s', boxShadow: p.pop ? '0 4px 16px rgba(0,192,122,0.3)' : 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow=`0 8px 20px ${p.accent}30` }}
                      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=p.pop?'0 4px 16px rgba(0,192,122,0.3)':'none' }}>
                      {p.cta}
                    </a>
                  ) : (
                    <button onClick={openModal} style={{ display: 'block', width: '100%', padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700, textAlign: 'center', background: p.pop ? '#00c07a' : 'transparent', color: p.pop ? '#fff' : p.accent, border: `1.5px solid ${p.pop ? '#00c07a' : p.border}`, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s', boxShadow: p.pop ? '0 4px 16px rgba(0,192,122,0.3)' : 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow=`0 8px 20px ${p.accent}30` }}
                      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=p.pop?'0 4px 16px rgba(0,192,122,0.3)':'none' }}>
                      {p.cta}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          {/* Trust bar */}
          <div style={{ display: 'flex', gap: 28, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
            {['✓ 14-day free trial','✓ No credit card needed','✓ Cancel anytime','✓ GDPR compliant','✓ 5-min setup'].map(item => (
              <span key={item} style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{item}</span>
            ))}
          </div>

          {/* Agency / Coworking note */}
          <div style={{ marginTop: 32, background: 'linear-gradient(135deg,#fdf2f8,#f5f3ff)', border: '1px solid #e9d5ff', borderRadius: 16, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 20 20" width="18" height="18" fill="none"><rect x="2" y="6" width="10" height="10" rx="2" fill="#fff" opacity="0.8"/><rect x="9" y="9" width="10" height="10" rx="2" fill="#fff" opacity="0.5" stroke="#fff" strokeWidth="1"/><path d="M7 6V5a2 2 0 014 0v1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>Running a coworking space or managing multiple clients?</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Our <strong style={{ color: '#8b5cf6' }}>Max plan</strong> and <strong style={{ color: '#d97706' }}>Enterprise plan</strong> include white-label branding, unlimited rooms, and a super admin dashboard to manage all your organisations from one place. On Pro, additional rooms can be purchased at any time.
              </div>
            </div>
            <button onClick={openModal} style={{ background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Talk to us →
            </button>
          </div>
        </div>
      </section>

      {/* ══ PLAN FINDER ═══════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="tag reveal">Not sure?</span>
            <h2 className="h2 reveal">Find your <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>perfect plan</span></h2>
            <p className="body reveal" style={{ color: '#64748b', marginTop: 10 }}>Answer 4 quick questions and we'll highlight the right fit.</p>
          </div>
          <PlanFinder openModal={openModal} />
        </div>
      </section>

      {/* ══ COMPARISON TABLE ══════════════════════════════ */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="tag reveal">Compare plans</span>
            <h2 className="h2 reveal">Full <span style={{ background:'linear-gradient(135deg,#00c07a,#0090ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>feature comparison</span></h2>
            <p className="body reveal" style={{ color: '#64748b', marginTop: 10 }}>Everything you need to choose the right plan.</p>
          </div>

          <div className="pricing-table-wrap reveal">
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', minWidth: 620 }}>

            {/* Sticky header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4,1fr)', padding: '0 24px', background: '#fff', borderBottom: '2px solid #e2e8f0', position: 'sticky', top: 64, zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ padding: '20px 0', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>Capability</div>
              {[
                { name: 'Basic',      color: '#64748b', bg: '#f8fafc', border: '#e2e8f0', note: null },
                { name: 'Pro',        color: '#0F799B', bg: '#eff6ff', border: '#bfdbfe', note: null },
                { name: 'Max',        color: '#00c07a', bg: '#ecfdf5', border: '#a7f3d0', note: null },
                { name: 'Enterprise', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', note: null },
              ].map(p => (
                <div key={p.name} style={{ padding: '14px 0', textAlign: 'center' }}>
                  <div style={{ display: 'inline-block', background: p.bg, border: `1px solid ${p.border}`, borderRadius: 100, padding: '5px 16px' }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: p.color }}>{p.name}</span>
                  </div>
                  {p.note && <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600, marginTop: 4 }}>{p.note}</div>}
                </div>
              ))}
            </div>

            {/* Category groups */}
            {FEATURES_TABLE.map((cat, ci) => (
              <div key={cat.cat}>
                {/* Category pill header */}
                <div style={{ padding: '14px 24px 8px', borderTop: ci > 0 ? '1px solid #f1f5f9' : 'none', background: '#fafafa' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 100, padding: '3px 12px 3px 8px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c07a' }} />
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#009960', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{cat.cat}</span>
                  </div>
                </div>

                {/* Rows */}
                {cat.rows.map((row, ri) => (
                  <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4,1fr)', padding: '12px 24px', borderTop: '1px solid #f8fafc', transition: 'background 0.12s', alignItems: 'center' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f0fdf8'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ padding: '12px 0', fontSize: 13, color: '#374151', fontWeight: 500 }}>{row.name}</div>
                    {['basic','pro','max','ent'].map((k, ki) => {
                      const colors = ['#64748b','#0F799B','#00c07a','#7c3aed']
                      const bgs    = ['#f8fafc','#eff6ff','#ecfdf5','#f5f3ff']
                      const val = row[k]
                      return (
                        <div key={k} style={{ padding: '12px 0', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {typeof val === 'boolean'
                            ? val
                              ? <div style={{ width: 22, height: 22, borderRadius: '50%', background: bgs[ki], border: `1px solid ${colors[ki]}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <svg viewBox="0 0 10 10" width="10" height="10" fill="none"><path d="M2 5l2 2 4-4" stroke={colors[ki]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                              : <span style={{ color: '#d1d5db', fontSize: 14 }}>—</span>
                            : val.includes('+')
                              ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                  <span style={{ fontSize: 11, fontWeight: 800, color: colors[ki], background: bgs[ki], padding: '3px 10px', borderRadius: 100, border: `1px solid ${colors[ki]}25` }}>{val.split(' + ')[0]}</span>
                                  <span style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600 }}>+ add-ons available</span>
                                </div>
                              : <span style={{ fontSize: 11, fontWeight: 800, color: colors[ki], background: bgs[ki], padding: '3px 10px', borderRadius: 100, display: 'inline-block', border: `1px solid ${colors[ki]}25` }}>{val}</span>
                          }
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            ))}

            {/* Bottom CTA row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4,1fr)', padding: '20px 24px', borderTop: '1px solid #f1f5f9', background: '#fafafa' }}>
              <div />
              {[
                { label: 'Get started', href: 'https://go.spaciohub.com', color: '#64748b', border: '#e2e8f0', bg: '#fff' },
                { label: 'Start trial',  href: 'https://go.spaciohub.com', color: '#0F799B', border: '#bfdbfe', bg: '#eff6ff' },
                { label: 'Request Demo', href: null,                        color: '#fff',    border: '#00c07a', bg: '#00c07a' },
                { label: 'Contact Sales',href: null,                        color: '#7c3aed', border: '#ddd6fe', bg: '#f5f3ff' },
              ].map((btn, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '0 6px' }}>
                  {btn.href
                    ? <a href={btn.href} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '8px 4px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: btn.color, background: btn.bg, border: `1.5px solid ${btn.border}`, textDecoration: 'none', transition: 'all 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                        {btn.label}
                      </a>
                    : <button onClick={openModal} style={{ display: 'block', width: '100%', padding: '8px 4px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: btn.color, background: btn.bg, border: `1.5px solid ${btn.border}`, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                        {btn.label}
                      </button>
                  }
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="tag reveal">FAQs</span>
            <h2 className="h2 reveal">Frequently <span style={{ background:'linear-gradient(135deg,#00c07a,#0090ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>asked questions</span></h2>
            <p className="body reveal" style={{ marginTop: 10, color: '#64748b' }}>Can't find an answer? Email <a href="mailto:contact@spaciohub.com" style={{ color: '#00c07a', fontWeight: 600 }}>contact@spaciohub.com</a></p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="reveal" style={{ background: openFaq === i ? '#f0fdf8' : '#fff', border: `1px solid ${openFaq === i ? '#a7f3d0' : '#e2e8f0'}`, borderRadius: 14, overflow: 'hidden', transition: 'all 0.25s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter,sans-serif' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', paddingRight: 16 }}>{faq.q}</span>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: openFaq === i ? '#00c07a' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: openFaq === i ? '#fff' : '#94a3b8', fontSize: 14, fontWeight: 700, flexShrink: 0, transition: 'all 0.25s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 22px 18px', fontSize: 14, color: '#64748b', lineHeight: 1.75, animation: 'fadeIn 0.2s ease' }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg,#0a1628,#0f172a)', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse,rgba(0,192,122,0.10),transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <h2 className="h2" style={{ color: '#fff', marginBottom: 14 }}>Still have <span style={{ background:'linear-gradient(135deg,#00c07a,#0090ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>questions?</span></h2>
          <p className="lead" style={{ color: '#64748b', marginBottom: 36 }}>Talk to our team. We'll help you pick the right plan.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow: '0 8px 28px rgba(0,192,122,0.35)' }}>Request a Demo →</button>
            <a href="mailto:contact@spaciohub.com" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.12)', textDecoration: 'none' }}>Email Us</a>
          </div>
        </div>
      </section>
    </main>
  </>
  )
}
