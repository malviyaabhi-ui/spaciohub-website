import SEO from '../../components/SEO'
import NetworkViz from '../../components/NetworkViz'
import { PAGE_SEO } from '../../components/pageSEO'
import React, { useState, useEffect, useRef } from 'react'
import { useModal } from '../../components/ModalContext'

const LOGOS = {
  gcal:    <svg viewBox="0 0 40 40" width="30" height="30" fill="none"><rect width="40" height="40" rx="10" fill="#fff"/><rect x="6" y="9" width="28" height="24" rx="2.5" fill="#4285F4" opacity="0.12"/><rect x="6" y="9" width="28" height="8" rx="2.5" fill="#1a73e8"/><rect x="12" y="5" width="3.5" height="8" rx="1.75" fill="#1a73e8"/><rect x="24.5" y="5" width="3.5" height="8" rx="1.75" fill="#1a73e8"/><rect x="11" y="21" width="5" height="5" rx="1.2" fill="#4285F4" opacity="0.8"/><rect x="18" y="21" width="5" height="5" rx="1.2" fill="#4285F4" opacity="0.5"/><rect x="25" y="21" width="5" height="5" rx="1.2" fill="#4285F4" opacity="0.3"/></svg>,
  outlook: <svg viewBox="0 0 40 40" width="30" height="30" fill="none"><rect width="40" height="40" rx="10" fill="#fff"/><rect x="6" y="6" width="13" height="13" rx="1.5" fill="#F25022"/><rect x="21" y="6" width="13" height="13" rx="1.5" fill="#7FBA00"/><rect x="6" y="21" width="13" height="13" rx="1.5" fill="#00A4EF"/><rect x="21" y="21" width="13" height="13" rx="1.5" fill="#FFB900"/></svg>,
  zoom:    <svg viewBox="0 0 40 40" width="30" height="30" fill="none"><rect width="40" height="40" rx="10" fill="#2D8CFF"/><rect x="6" y="13" width="19" height="14" rx="2.5" fill="#fff"/><path d="M27 16l9-4v16l-9-4V16z" fill="#fff"/></svg>,
  google:  <svg viewBox="0 0 40 40" width="30" height="30" fill="none"><rect width="40" height="40" rx="10" fill="#fff"/><path fill="#4285F4" d="M34 20.4c0-1.1-.1-2.1-.3-3.1H20v5.8h7.8c-.3 1.8-1.4 3.3-2.9 4.3v3.6h4.7C32.1 28.5 34 24.7 34 20.4z"/><path fill="#34A853" d="M20 34c3.9 0 7.1-1.3 9.5-3.5l-4.7-3.6c-1.3.9-2.9 1.4-4.8 1.4-3.7 0-6.8-2.5-7.9-5.8H7.2v3.7C9.6 30.9 14.4 34 20 34z"/><path fill="#FBBC05" d="M12.1 22.5c-.3-.9-.5-1.8-.5-2.8s.2-1.9.5-2.8v-3.7H7.2C6.1 15.5 5.5 17.7 5.5 20s.6 4.5 1.7 6.2l4.9-3.7z"/><path fill="#EA4335" d="M20 11.4c2 0 3.8.7 5.3 2l4-4C26.9 7.2 23.7 6 20 6c-5.6 0-10.4 3.1-12.8 7.7l4.9 3.7c1.1-3.3 4.2-6 7.9-6z"/></svg>,
  msso:    <svg viewBox="0 0 40 40" width="30" height="30" fill="none"><rect width="40" height="40" rx="10" fill="#0078D4"/><rect x="9" y="9" width="9" height="9" rx="1" fill="#fff" opacity=".9"/><rect x="22" y="9" width="9" height="9" rx="1" fill="#fff" opacity=".9"/><rect x="9" y="22" width="9" height="9" rx="1" fill="#fff" opacity=".9"/><rect x="22" y="22" width="9" height="9" rx="1" fill="#fff" opacity=".9"/></svg>,
  ical:    <svg viewBox="0 0 40 40" width="30" height="30" fill="none"><rect width="40" height="40" rx="10" fill="#FF3B30"/><rect x="6" y="13" width="28" height="20" rx="2" fill="#fff"/><rect x="6" y="13" width="28" height="8" rx="2" fill="#FF3B30"/><rect x="13" y="6" width="3.5" height="9" rx="1.75" fill="#CC2D26"/><rect x="23.5" y="6" width="3.5" height="9" rx="1.75" fill="#CC2D26"/><text x="20" y="28" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FF3B30" fontFamily="Inter,sans-serif">iCal</text></svg>,
  door:    <svg viewBox="0 0 40 40" width="30" height="30" fill="none"><rect width="40" height="40" rx="10" fill="#ecfdf5"/><rect x="10" y="6" width="20" height="28" rx="3" fill="#0f172a"/><rect x="12" y="8" width="16" height="20" rx="1.5" fill="#1e293b"/><rect x="12" y="9" width="16" height="4" rx="0.5" fill="#00c07a" opacity="0.8"/><circle cx="26" cy="21" r="1.8" fill="#475569"/></svg>,
  teams:   <svg viewBox="0 0 40 40" width="30" height="30" fill="none"><rect width="40" height="40" rx="10" fill="#5558AF"/><circle cx="25" cy="14" r="5" fill="#fff" opacity="0.9"/><rect x="16" y="20" width="18" height="11" rx="3" fill="#fff" opacity="0.9"/><circle cx="15" cy="16" r="4" fill="#fff"/><rect x="7" y="22" width="13" height="9" rx="2.5" fill="#fff" opacity="0.8"/></svg>,
}

const FALLING = [
  { key: 'gcal',    label: 'Google Calendar', delay: 0, settleY: 280, floatDur: '3.8s', floatPhase: '0s'    },
  { key: 'outlook', label: 'Microsoft 365',   delay: 0, settleY: 200, floatDur: '4.4s', floatPhase: '-1.2s' },
  { key: 'zoom',    label: 'Zoom',            delay: 0, settleY: 320, floatDur: '3.2s', floatPhase: '-0.5s' },
  { key: 'teams',   label: 'MS Teams',        delay: 0, settleY: 160, floatDur: '5.0s', floatPhase: '-2.1s' },
  { key: 'google',  label: 'Google SSO',      delay: 0, settleY: 260, floatDur: '3.6s', floatPhase: '-0.8s' },
  { key: 'msso',    label: 'Microsoft SSO',   delay: 0, settleY: 190, floatDur: '4.2s', floatPhase: '-1.7s' },
  { key: 'ical',    label: 'iCal Feed',       delay: 0, settleY: 340, floatDur: '2.9s', floatPhase: '-0.3s' },
  { key: 'door',    label: 'Door Display',    delay: 0, settleY: 230, floatDur: '4.8s', floatPhase: '-1.4s' },
]

const INTEGRATIONS = [
  {
    category: 'Calendars', color: '#4285F4', bg: '#eff6ff', border: '#bfdbfe',
    items: [
      { name: 'Google Calendar', logo: 'gcal',    plan: 'Pro', planColor: '#0F799B', planBg: '#eff6ff',  desc: 'Two-way sync. Bookings appear in Google Calendar and calendar events block rooms automatically.', features: ['Two-way event sync', 'Room resource calendars', 'Auto-decline conflicts', 'Google Workspace ready'] },
      { name: 'Microsoft 365',   logo: 'outlook', plan: 'Pro', planColor: '#0F799B', planBg: '#eff6ff',  desc: 'Full Outlook & Exchange integration. Room resource calendars, Teams meetings, and two-way Outlook sync.', features: ['Outlook calendar sync', 'Exchange resources', 'Teams room integration', 'Microsoft 365 ready'] },
      { name: 'iCal Feed',       logo: 'ical',    plan: 'Starter', planColor: '#00c07a', planBg: '#ecfdf5', desc: "Subscribe to any room's live iCal URL in Apple Calendar, Outlook, or any iCal-compatible app.", features: ['Per-room iCal URLs', 'Live feed updates', 'Apple Calendar support', 'Any iCal-compatible app'] },
    ]
  },
  {
    category: 'Video Meetings', color: '#2D8CFF', bg: '#eff6ff', border: '#bfdbfe',
    items: [
      { name: 'Zoom',     logo: 'zoom',  plan: 'Pro', planColor: '#0F799B', planBg: '#eff6ff',  desc: 'Every booking auto-generates a Zoom meeting link. Attendees get it instantly in their confirmation email.', features: ['Auto meeting links', 'Links in email confirmations', 'Host key management', 'Zoom Pro+ supported'] },
      { name: 'MS Teams', logo: 'teams', plan: 'Max', planColor: '#7c3aed', planBg: '#f5f3ff',  desc: 'Auto-create Teams meeting links for every booking. Perfect for hybrid-first organisations on Microsoft 365.', features: ['Auto Teams links', 'Hybrid meeting support', 'Calendar integration', 'Works with M365'] },
    ]
  },
  {
    category: 'Single Sign-On', color: '#00c07a', bg: '#ecfdf5', border: '#a7f3d0',
    items: [
      { name: 'Google SSO',    logo: 'google', plan: 'Max', planColor: '#7c3aed', planBg: '#f5f3ff', desc: 'Let your team sign in with their existing Google accounts. No new passwords, no friction, no IT headache.', features: ['Google OAuth 2.0', 'Auto-provision users', 'Domain restriction', 'Google Workspace'] },
      { name: 'Microsoft SSO', logo: 'msso',   plan: 'Max', planColor: '#7c3aed', planBg: '#f5f3ff', desc: 'Sign in with Microsoft / Azure AD credentials. SAML 2.0 compatible, MFA supported out of the box.', features: ['Azure AD / Entra ID', 'SAML 2.0 support', 'MFA compatible', 'Auto-provision users'] },
    ]
  },
  {
    category: 'Notifications', color: '#f97316', bg: '#fff7ed', border: '#fed7aa',
    items: [
      { name: 'Email Alerts', logo: 'gcal', plan: 'Starter', planColor: '#00c07a', planBg: '#ecfdf5', desc: 'Instant booking confirmations, visitor arrival alerts, and no-show notifications sent automatically.', features: ['Booking confirmations', 'Visitor arrival alerts', 'No-show notifications', 'Custom email templates'] },
      { name: 'Door Display', logo: 'door', plan: 'Pro',     planColor: '#0F799B', planBg: '#eff6ff', desc: 'Any iPad or Android tablet becomes a live room panel. Real-time status, no-login booking, guest access.', features: ['Real-time status', 'No-login booking', 'Guest check-in', 'Any tablet device'] },
    ]
  },
]

const ITEM_DURATION = 3500 // ms per item

// ── Falling logo — slow fall, settles mid-air, zoom-pulse forever ────────────
function FallingLogo({ logoKey, label, delay, settleY, floatDur, floatPhase }) {
  const [phase, setPhase] = useState('hidden')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('falling'), delay)
    const t2 = setTimeout(() => setPhase('floating'), delay + 6200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [delay])

  return (
    <>
      <style>{`
        @keyframes intFall_${logoKey} {
          0%   { opacity:0; transform: translateY(-560px); }
          70%  { opacity:1; transform: translateY(${-settleY + 16}px); }
          82%  { opacity:1; transform: translateY(${-settleY - 8}px); }
          91%  { opacity:1; transform: translateY(${-settleY + 3}px); }
          97%  { opacity:1; transform: translateY(${-settleY - 1}px); }
          100% { opacity:1; transform: translateY(${-settleY}px); }
        }
        @keyframes intPulse_${logoKey} {
          0%,100% { transform: translateY(${-settleY}px) scale(1);    }
          50%     { transform: translateY(${-settleY}px) scale(1.09); }
        }
      `}</style>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        visibility: phase === 'hidden' ? 'hidden' : 'visible',
        position: 'relative',
        zIndex: 4,
        animation:
          phase === 'falling'  ? `intFall_${logoKey} 6s cubic-bezier(0.22,1,0.36,1) forwards` :
          phase === 'floating' ? `intPulse_${logoKey} ${floatDur} ${floatPhase} ease-in-out infinite` :
          'none',
      }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 10, border: '1px solid #e2e8f0', boxShadow: '0 8px 28px rgba(0,0,0,0.10)' }}>
          {LOGOS[logoKey]}
        </div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.95)', padding: '2px 8px', borderRadius: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {label}
        </div>
      </div>
    </>
  )
}

// ── Auto-advancing integration section ──────────────────────────────────────
function IntegrationShowcase() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const [activeTab, setActiveTab] = useState(0)
  const [activeItem, setActiveItem] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const progressRef = useRef(null)
  const startRef = useRef(Date.now())
  const manualRef = useRef(false)

  const cat = INTEGRATIONS[activeTab]

  const startProgress = (tabIdx, itemIdx) => {
    clearInterval(intervalRef.current)
    clearInterval(progressRef.current)
    setProgress(0)
    startRef.current = Date.now()

    progressRef.current = setInterval(() => {
      const pct = Math.min(((Date.now() - startRef.current) / ITEM_DURATION) * 100, 100)
      setProgress(pct)
    }, 30)

    intervalRef.current = setTimeout(() => {
      const nextItem = itemIdx + 1
      if (nextItem < INTEGRATIONS[tabIdx].items.length) {
        setActiveItem(nextItem)
        startProgress(tabIdx, nextItem)
      } else {
        // move to next tab
        const nextTab = (tabIdx + 1) % INTEGRATIONS.length
        setActiveTab(nextTab)
        setActiveItem(0)
        startProgress(nextTab, 0)
      }
    }, ITEM_DURATION)
  }

  useEffect(() => {
    startProgress(0, 0)
    return () => { clearInterval(intervalRef.current); clearInterval(progressRef.current) }
  }, [])

  const handleTabClick = (i) => {
    setActiveTab(i); setActiveItem(0); startProgress(i, 0)
  }
  const handleItemClick = (i) => {
    setActiveItem(i); startProgress(activeTab, i)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
      {/* LEFT */}
      <div>
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          {INTEGRATIONS.map((c, i) => (
            <button key={c.category} onClick={() => handleTabClick(i)}
              style={{ padding: '7px 16px', borderRadius: 100, border: `1.5px solid ${activeTab===i ? c.color : '#e2e8f0'}`, background: activeTab===i ? c.bg : '#fff', color: activeTab===i ? c.color : '#64748b', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s' }}>
              {c.category}
            </button>
          ))}
        </div>

        {/* Item rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cat.items.map((item, i) => (
            <div key={item.name} onClick={() => handleItemClick(i)}
              style={{ background: activeItem===i ? '#fff' : 'transparent', border: `1px solid ${activeItem===i ? cat.border : 'transparent'}`, borderRadius: 14, padding: activeItem===i ? '16px 18px' : '12px 18px', cursor: 'pointer', transition: 'all 0.3s', boxShadow: activeItem===i ? '0 4px 20px rgba(0,0,0,0.07)' : 'none', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: activeItem===i ? cat.bg : '#f1f5f9', border: `1px solid ${activeItem===i ? cat.border : 'transparent'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                  {LOGOS[item.logo]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: activeItem===i ? '#0f172a' : '#64748b', transition: 'color 0.2s' }}>{item.name}</div>
                  {activeItem===i && (
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 3, lineHeight: 1.5, animation: 'intFadeIn 0.3s ease' }}>
                      {item.desc.slice(0, 65)}…
                    </div>
                  )}
                </div>
              </div>
              {/* Left accent bar */}
              {activeItem===i && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: cat.color, borderRadius: '14px 0 0 14px' }} />}
              {/* Progress bar at bottom */}
              {activeItem===i && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#f1f5f9', borderRadius: '0 0 14px 14px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg,${cat.color},${cat.color}bb)`, transition: 'width 0.03s linear' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — detail card */}
      <div>
        <div key={`${activeTab}-${activeItem}`} style={{ background: '#fff', border: `1.5px solid ${cat.border}`, borderRadius: 20, padding: 28, boxShadow: '0 16px 48px rgba(0,0,0,0.09)', animation: 'intSlideIn 0.35s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${cat.border}` }}>
            <div style={{ width: 58, height: 58, borderRadius: 16, background: cat.bg, border: `1px solid ${cat.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {LOGOS[cat.items[activeItem].logo]}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>{cat.items[activeItem].name}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: cat.items[activeItem].planBg, border: `1px solid ${cat.items[activeItem].planColor}30`, borderRadius: 100, padding: '3px 10px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: cat.items[activeItem].planColor }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: cat.items[activeItem].planColor }}>{cat.items[activeItem].plan} plan</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, marginBottom: 20 }}>{cat.items[activeItem].desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cat.items[activeItem].features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: cat.bg, border: `1px solid ${cat.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 10 10" width="9" height="9" fill="none"><path d="M2 5l2 2 4-4" stroke={cat.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Integrations() {
  const { openModal } = useModal()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <SEO {...PAGE_SEO.platformIntegrations} />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* ══ HERO — falling logos ════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #e2e8f0', background: '#fff', minHeight: isMobile ? 'auto' : 580 }}>
        {/* Grid background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,192,122,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(0,192,122,0.045) 1px,transparent 1px)', backgroundSize: '64px 64px', pointerEvents: 'none' }} />
        {/* Centre glow */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse,rgba(0,192,122,0.07),transparent 65%)', pointerEvents: 'none' }} />

        {/* LEFT logos — hidden on mobile */}
        {!isMobile && <div style={{ position: 'absolute', bottom: 0, left: 0, width: '22%', height: 440, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', padding: '0 8px', pointerEvents: 'none', zIndex: 2 }}>
          {FALLING.slice(0, 4).map(item => (
            <FallingLogo key={item.key} logoKey={item.key} label={item.label} delay={item.delay} settleY={item.settleY} floatDur={item.floatDur} floatPhase={item.floatPhase} />
          ))}
        </div>}

        {/* RIGHT logos — hidden on mobile */}
        {!isMobile && <div style={{ position: 'absolute', bottom: 0, right: 0, width: '22%', height: 440, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', padding: '0 8px', pointerEvents: 'none', zIndex: 2 }}>
          {FALLING.slice(4).map(item => (
            <FallingLogo key={item.key} logoKey={item.key} label={item.label} delay={item.delay} settleY={item.settleY} floatDur={item.floatDur} floatPhase={item.floatPhase} />
          ))}
        </div>}

        {/* Centre content */}
        <div style={{ position: 'relative', zIndex: 6, textAlign: 'center', padding: '80px 24px 200px' }}>
          <span className="tag animate-fade-up">Integrations</span>
          <h1 className="h1 animate-fade-up delay-1" style={{ fontSize: 'clamp(28px,3.5vw,52px)', marginBottom: 18 }}>
            Connects with <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>everything</span><br />your team already uses
          </h1>
          <p className="lead animate-fade-up delay-2" style={{ maxWidth: 460, margin: '0 auto 36px', color: '#64748b' }}>
            No ripping out your existing tools. SpacioHub plugs into Google, Microsoft, Zoom, and more — so your team keeps working the way they do.
          </p>
          <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow: '0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free for 14 days</a>
          </div>
          <div className="animate-fade-up delay-4" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['8+','Integrations','#00c07a','#ecfdf5','#a7f3d0'],['2','Calendar apps','#4285F4','#eff6ff','#bfdbfe'],['2','SSO providers','#0078D4','#eff6ff','#bfdbfe']].map(([n,l,col,bg,border]) => (
              <div key={l} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 12, padding: '10px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: col, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 3, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INTERACTIVE AUTO-ADVANCING SECTION ═════════════════ */}
      <section style={{ padding: '88px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="tag reveal">What's included</span>
            <h2 className="h2 reveal">Every integration, <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>out of the box</span></h2>
          </div>
          <div className="reveal"><IntegrationShowcase /></div>
        </div>
      </section>

      {/* ══ ALL INTEGRATIONS GRID ══════════════════════════════ */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="tag reveal">Full list</span>
            <h2 className="h2 reveal">All <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>integrations</span> at a glance</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 12 }}>
            {[
              { name: 'Google Calendar', sub: 'Two-way sync',       logo: 'gcal',    color: '#4285F4', bg: '#eff6ff', border: '#bfdbfe', plan: 'Pro',     planColor: '#0F799B' },
              { name: 'Microsoft 365',   sub: 'Outlook & Exchange', logo: 'outlook', color: '#0078D4', bg: '#eff6ff', border: '#bfdbfe', plan: 'Pro',     planColor: '#0F799B' },
              { name: 'Zoom',            sub: 'Auto meeting links', logo: 'zoom',    color: '#2D8CFF', bg: '#eff6ff', border: '#bfdbfe', plan: 'Pro',     planColor: '#0F799B' },
              { name: 'MS Teams',        sub: 'Meeting rooms',      logo: 'teams',   color: '#5558AF', bg: '#f0f0ff', border: '#c7d2fe', plan: 'Max',     planColor: '#7c3aed' },
              { name: 'Google SSO',      sub: 'OAuth 2.0',          logo: 'google',  color: '#34A853', bg: '#ecfdf5', border: '#a7f3d0', plan: 'Max',     planColor: '#7c3aed' },
              { name: 'Microsoft SSO',   sub: 'Azure AD / Entra',   logo: 'msso',    color: '#0078D4', bg: '#eff6ff', border: '#bfdbfe', plan: 'Max',     planColor: '#7c3aed' },
              { name: 'iCal Feed',       sub: 'Apple & Outlook',    logo: 'ical',    color: '#FF3B30', bg: '#fff1f2', border: '#fecdd3', plan: 'Starter', planColor: '#00c07a' },
              { name: 'Door Display',    sub: 'Real-time panels',   logo: 'door',    color: '#00c07a', bg: '#ecfdf5', border: '#a7f3d0', plan: 'Pro',     planColor: '#0F799B' },
            ].map((item, i) => (
              <div key={item.name} className="reveal" style={{ animationDelay: `${i*0.05}s`, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 10, transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.background = item.bg; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 10px 28px ${item.color}20` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: item.bg, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {LOGOS[item.logo]}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{item.sub}</div>
                  </div>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: item.plan === 'Starter' ? '#ecfdf5' : item.plan === 'Pro' ? '#eff6ff' : '#f5f3ff', borderRadius: 100, padding: '3px 9px', width: 'fit-content' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.planColor }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: item.planColor }}>{item.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══ NETWORK VISUALISATION ══════════════════════════════ */}
      <section style={{ background: '#080c18', padding: '80px 0 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, padding: '0 24px' }}>
          <span className="tag reveal" style={{ background: 'rgba(0,192,122,.15)', color: '#00c07a', border: '1px solid rgba(0,192,122,.25)' }}>Platform ecosystem</span>
          <h2 className="h2 reveal" style={{ color: '#f1f5f9' }}>See how <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>everything connects</span></h2>
          <p className="lead reveal" style={{ color: '#94a3b8', maxWidth: 480, margin: '0 auto' }}>
            SpacioHub sits at the centre of your workspace stack.
          </p>
          <p className="reveal" style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#00c07a', animation: 'vizHintPulse 2.5s ease-in-out infinite' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00c07a', display: 'inline-block', animation: 'vizDotPulse 2.5s ease-in-out infinite' }} />
            Click any node to explore
          </p>
          <style>{`
            @keyframes vizHintPulse {
              0%,100% { opacity: 1; }
              50%      { opacity: 0.4; }
            }
            @keyframes vizDotPulse {
              0%,100% { box-shadow: 0 0 0 0 rgba(0,192,122,0.5); }
              50%      { box-shadow: 0 0 0 6px rgba(0,192,122,0); }
            }
          `}</style>
        </div>
        <div className="reveal">
          <NetworkViz />
        </div>
      </section>

      {/* ══ SETUP STEPS ════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="tag reveal">Setup</span>
            <h2 className="h2 reveal">Connected in <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>minutes</span>, not days</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3,1fr)', gap: 24 }}>
            {[
              { num: '01', accent: '#00c07a', title: 'Connect your apps',        desc: 'Go to Settings → Integrations and connect Google or Microsoft with one click. No developer needed.' },
              { num: '02', accent: '#3b82f6', title: 'Rooms sync automatically', desc: 'SpacioHub pulls your existing rooms and calendars. Bookings flow both ways — nothing gets missed.' },
              { num: '03', accent: '#8b5cf6', title: 'Your team logs in',        desc: 'With SSO enabled, your team signs in with their existing Google or Microsoft account. Zero new passwords.' },
            ].map((s, i) => (
              <div key={s.num} className="card reveal" style={{ animationDelay: `${i*0.1}s`, textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'DM Mono,monospace', margin: '0 auto 16px' }}>{s.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#0f172a' }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg,#0a1628,#0f172a)', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse,rgba(0,192,122,0.12),transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <h2 className="h2 reveal" style={{ color: '#fff', marginBottom: 14 }}>Ready to <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>plug everything in?</span></h2>
          <p className="lead reveal" style={{ color: '#94a3b8', marginBottom: 36 }}>All integrations included on every plan. No extra cost, no plugins.</p>
          <div className="reveal" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow: '0 8px 28px rgba(0,192,122,0.35)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.12)', textDecoration: 'none' }}>Start free trial</a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes intSlideIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:none} }
        @keyframes intFadeIn  { from{opacity:0} to{opacity:1} }
        @media(max-width:768px){ .int-fall-row{ display:none !important } }
      `}</style>
    </main>
  </>
  )
}
