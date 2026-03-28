import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useModal } from './ModalContext'

const LOGO = 'https://svksiwnalmrjjnskycqb.supabase.co/storage/v1/object/public/assets/logo-no-background.png'

// ─── SVG ICONS ────────────────────────────────────────────────
const I = {
  booking:    <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#ecfdf5"/><rect x="7" y="9" width="18" height="16" rx="2" fill="#00c07a" opacity="0.15"/><rect x="7" y="9" width="18" height="5" rx="2" fill="#00c07a"/><rect x="11" y="5" width="2.5" height="6" rx="1.25" fill="#009960"/><rect x="18.5" y="5" width="2.5" height="6" rx="1.25" fill="#009960"/><rect x="10" y="18" width="4" height="4" rx="1" fill="#00c07a" opacity="0.6"/><rect x="16" y="18" width="4" height="4" rx="1" fill="#00c07a" opacity="0.6"/></svg>,
  visitors:   <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#fff7ed"/><circle cx="12" cy="12" r="4" fill="#f97316" opacity="0.8"/><circle cx="21" cy="12" r="4" fill="#f97316" opacity="0.4"/><path d="M4 27c0-4.5 3.5-8 8-8h8c4.5 0 8 3.5 8 8" stroke="#f97316" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>,
  door:       <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#eff6ff"/><rect x="9" y="4" width="14" height="24" rx="2.5" fill="#3b82f6" opacity="0.15"/><rect x="9" y="4" width="14" height="24" rx="2.5" stroke="#3b82f6" strokeWidth="1.5"/><rect x="11" y="6" width="10" height="3" rx="0.5" fill="#3b82f6" opacity="0.4"/><circle cx="20" cy="16" r="1.5" fill="#3b82f6"/></svg>,
  analytics:  <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#f5f3ff"/><rect x="7" y="20" width="4" height="7" rx="1" fill="#8b5cf6" opacity="0.4"/><rect x="13" y="15" width="4" height="12" rx="1" fill="#8b5cf6" opacity="0.65"/><rect x="19" y="10" width="4" height="17" rx="1" fill="#8b5cf6"/><path d="M8 19l6-5 6-4 5-3" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
  ai:         <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#fefce8"/><rect x="8" y="11" width="16" height="14" rx="3" fill="#f59e0b" opacity="0.2"/><rect x="8" y="11" width="16" height="14" rx="3" stroke="#f59e0b" strokeWidth="1.5"/><circle cx="13" cy="17" r="2" fill="#f59e0b"/><circle cx="19" cy="17" r="2" fill="#f59e0b"/><path d="M13 22h6" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/><rect x="15" y="7" width="2" height="4" rx="1" fill="#f59e0b"/></svg>,
  ical:       <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#fdf2f8"/><rect x="7" y="9" width="18" height="16" rx="2" fill="#ec4899" opacity="0.1"/><rect x="7" y="9" width="18" height="16" rx="2" stroke="#ec4899" strokeWidth="1.5"/><rect x="7" y="9" width="18" height="5" rx="2" fill="#ec4899" opacity="0.4"/><path d="M11 19h10M11 22h6" stroke="#ec4899" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  corporate:  <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#eff6ff"/><rect x="7" y="10" width="18" height="16" rx="1.5" fill="#3b82f6" opacity="0.15"/><rect x="7" y="10" width="18" height="4" rx="1.5" fill="#3b82f6"/><rect x="10" y="17" width="4" height="4" rx="1" fill="#3b82f6" opacity="0.7"/><rect x="16" y="17" width="4" height="4" rx="1" fill="#3b82f6" opacity="0.7"/><rect x="14" y="22" width="5" height="4" rx="1" fill="#3b82f6"/></svg>,
  coworking:  <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#ecfdf5"/><circle cx="13" cy="13" r="4" fill="#00c07a" opacity="0.8"/><circle cx="21" cy="13" r="4" fill="#00c07a" opacity="0.4"/><path d="M5 27c0-4.4 3.6-8 8-8h7c4.4 0 8 3.6 8 8" stroke="#00c07a" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>,
  hotels:     <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#fff7ed"/><path d="M16 6l2 6h6l-5 3.5 2 6L16 18l-5 3.5 2-6L8 12h6z" fill="#f59e0b"/><rect x="10" y="22" width="12" height="7" rx="1.5" fill="#f59e0b" opacity="0.3"/><rect x="10" y="22" width="12" height="3" rx="1" fill="#f59e0b" opacity="0.5"/></svg>,
  resellers:  <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#fdf2f8"/><rect x="7" y="10" width="13" height="10" rx="2.5" fill="#ec4899" opacity="0.7"/><rect x="13" y="15" width="13" height="10" rx="2.5" fill="#ec4899" opacity="0.35" stroke="#ec4899" strokeWidth="1.5"/><circle cx="19.5" cy="20" r="2.5" fill="#ec4899"/><path d="M18 20h3M19.5 18.5v3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  facilities: <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#f0fdf4"/><rect x="6" y="10" width="20" height="16" rx="2" fill="#16a34a" opacity="0.15"/><rect x="6" y="10" width="20" height="5" rx="2" fill="#16a34a" opacity="0.5"/><rect x="9" y="18" width="5" height="5" rx="1" fill="#16a34a" opacity="0.5"/><rect x="16" y="18" width="5" height="5" rx="1" fill="#16a34a" opacity="0.5"/><rect x="13" y="22" width="6" height="4" rx="1" fill="#16a34a"/></svg>,
  it:         <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#eff6ff"/><rect x="5" y="9" width="22" height="14" rx="2" fill="#2563eb" opacity="0.15"/><rect x="5" y="9" width="22" height="14" rx="2" stroke="#2563eb" strokeWidth="1.5"/><rect x="10" y="23" width="12" height="2.5" rx="1" fill="#2563eb" opacity="0.4"/><path d="M12 15l2 2-2 2M16 18h4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  hr:         <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#fdf4ff"/><circle cx="16" cy="12" r="4.5" fill="#a855f7" opacity="0.7"/><path d="M7 26c0-5 4-9 9-9s9 4 9 9" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>,
  gcal:       <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/><rect x="5" y="7" width="22" height="19" rx="2" fill="#4285F4" opacity="0.1"/><rect x="5" y="7" width="22" height="7" rx="2" fill="#1a73e8"/><rect x="9" y="4" width="3" height="6" rx="1.5" fill="#1a73e8"/><rect x="20" y="4" width="3" height="6" rx="1.5" fill="#1a73e8"/><rect x="9" y="17" width="4" height="4" rx="1" fill="#4285F4" opacity="0.8"/><rect x="15" y="17" width="4" height="4" rx="1" fill="#4285F4" opacity="0.5"/></svg>,
  outlook:    <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#fff" stroke="#e2e8f0" strokeWidth="1"/><rect x="5" y="5" width="10" height="10" rx="1" fill="#F25022"/><rect x="17" y="5" width="10" height="10" rx="1" fill="#7FBA00"/><rect x="5" y="17" width="10" height="10" rx="1" fill="#00A4EF"/><rect x="17" y="17" width="10" height="10" rx="1" fill="#FFB900"/></svg>,
  zoom:       <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#2D8CFF"/><rect x="5" y="10" width="15" height="12" rx="2" fill="#fff"/><path d="M21 13l7-4v14l-7-4V13z" fill="#fff"/></svg>,
  sso:        <svg viewBox="0 0 32 32" width="24" height="24" fill="none"><rect width="32" height="32" rx="8" fill="#f0fdf4"/><circle cx="14" cy="16" r="5" fill="#16a34a" opacity="0.2"/><circle cx="14" cy="16" r="5" stroke="#16a34a" strokeWidth="1.5"/><circle cx="14" cy="16" r="2" fill="#16a34a"/><path d="M17.5 19.5l7 5.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/></svg>,
}

// ─── MEGA MENU CONFIGS ─────────────────────────────────────────
const MENUS = {
  solutions: {
    spotlight: {
      label: 'See it in action',
      desc: 'Watch how SpacioHub manages rooms, visitors and analytics in one place.',
      cta: 'Request a demo →',
      href: 'DEMO',
      bg: 'linear-gradient(135deg,#0f172a,#1e293b)',
      accent: '#00c07a',
    },
    groups: [
      {
        label: 'Platform', color: '#00c07a', bg: '#ecfdf5',
        items: [
          { label: 'Room Booking',      desc: 'Visual grid & smart scheduling', href: '/platform/booking',              icon: I.booking },
          { label: 'Visitor Management',desc: 'Check-in, kiosk & badges',       href: '/platform/visitors',             icon: I.visitors },
          { label: 'Door Display',      desc: 'Live room panels on any tablet', href: '/platform/door-display', icon: I.door },
          { label: 'Analytics',         desc: 'Utilisation & insights',         href: '/platform/analytics',    icon: I.analytics },
        ]
      },
      {
        label: 'Intelligence', color: '#f59e0b', bg: '#fefce8',
        items: [
          { label: 'AI Room Booker',   desc: 'Book in plain language',        href: '/platform/ai-booker',              icon: I.ai },
          { label: 'Calendar Sync',    desc: 'Google, Outlook & iCal',        href: '/platform/integrations', icon: I.ical },
        ]
      },
    ],
    footer: { label: 'Explore all platform features →', href: '/platform/booking' }
  },

  usecases: {
    spotlight: {
      label: 'Find your fit',
      desc: 'SpacioHub adapts to any workspace — from a 5-person studio to a 50-floor enterprise.',
      cta: 'See all use cases →',
      href: '/use-cases/corporate',
      bg: 'linear-gradient(135deg,#ecfdf5,#f0fdf8)',
      accent: '#00c07a',
    },
    groups: [
      {
        label: 'By Industry', color: '#3b82f6', bg: '#eff6ff',
        items: [
          { label: 'Corporate Offices',    href: '/use-cases/corporate',  icon: I.corporate },
          { label: 'Coworking Spaces',     href: '/use-cases/coworking',  icon: I.coworking },
          { label: 'Hotels & Hospitality', href: '/use-cases/hotels',     icon: I.hotels },
          { label: 'SaaS Resellers',       href: '/use-cases/resellers',  icon: I.resellers },
        ]
      },
      {
        label: 'By Role', color: '#8b5cf6', bg: '#f5f3ff',
        items: [
          { label: 'Facilities Manager', href: '/roles', icon: I.facilities },
          { label: 'IT Admin',           href: '/roles', icon: I.it },
          { label: 'HR Team',            href: '/roles', icon: I.hr },
          { label: 'SaaS / Reseller',    href: '/use-cases/resellers', icon: I.resellers },
        ]
      },
    ],
    footer: { label: 'Compare roles & permissions →', href: '/roles' }
  },

  integrations: {
    spotlight: {
      label: 'Plug in, not rip out',
      desc: 'SpacioHub works with the tools your team already uses — no new logins needed.',
      cta: 'View all integrations →',
      href: '/platform/integrations',
      bg: 'linear-gradient(135deg,#fdf2f8,#f5f3ff)',
      accent: '#ec4899',
    },
    groups: [
      {
        label: 'Calendars', color: '#4285F4', bg: '#eff6ff',
        items: [
          { label: 'Google Calendar', desc: 'Two-way sync',            href: '/platform/integrations', icon: I.gcal },
          { label: 'Microsoft 365',   desc: 'Outlook & Teams',         href: '/platform/integrations', icon: I.outlook },
          { label: 'iCal Feed',       desc: 'Apple Calendar & more',   href: '/platform/integrations', icon: I.ical },
        ]
      },
      {
        label: 'Meetings & Auth', color: '#00c07a', bg: '#ecfdf5',
        items: [
          { label: 'Zoom',          desc: 'Auto meeting links',    href: '/platform/integrations', icon: I.zoom },
          { label: 'Google SSO',    desc: 'Sign in with Google',   href: '/platform/integrations', icon: I.gcal },
          { label: 'Microsoft SSO', desc: 'Sign in with Microsoft',href: '/platform/integrations', icon: I.outlook },
        ]
      },
    ],
    footer: { label: 'See the full integration list →', href: '/platform/integrations' }
  },
}

// ─── MEGA MENU PANEL ──────────────────────────────────────────
function MegaMenu({ config, onClose, openModal }) {
  const { spotlight, groups, footer } = config
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 8px)', left: 0,
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18,
      boxShadow: '0 24px 64px rgba(0,0,0,0.13)',
      display: 'flex', flexDirection: 'column',
      minWidth: 580, overflow: 'hidden',
      animation: 'fadeUp 0.15s ease', zIndex: 9999,
    }}>
      {/* Body: spotlight + groups */}
      <div style={{ display: 'flex', gap: 0 }}>

        {/* Spotlight card */}
        <div style={{ width: 180, flexShrink: 0, background: spotlight.bg, padding: '24px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${spotlight.accent}22`, border: `1px solid ${spotlight.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
                <path d="M4 10l4 4 8-8" stroke={spotlight.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: spotlight.bg.includes('0f172a') ? '#f1f5f9' : '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>{spotlight.label}</div>
            <div style={{ fontSize: 11.5, color: spotlight.bg.includes('0f172a') ? '#94a3b8' : '#64748b', lineHeight: 1.6 }}>{spotlight.desc}</div>
          </div>
          {spotlight.href === 'DEMO'
            ? <button onClick={() => { onClose(); openModal() }} style={{ fontSize: 12, fontWeight: 700, color: spotlight.accent, background: 'none', border: 'none', cursor: 'pointer', marginTop: 20, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Inter,sans-serif', padding: 0 }}>{spotlight.cta}</button>
            : <Link to={spotlight.href} onClick={onClose} style={{ fontSize: 12, fontWeight: 700, color: spotlight.accent, textDecoration: 'none', marginTop: 20, display: 'flex', alignItems: 'center', gap: 4 }}>{spotlight.cta}</Link>
          }
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: '#f1f5f9', flexShrink: 0 }} />

        {/* Groups */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${groups.length}, 1fr)`, padding: '20px 8px 16px' }}>
          {groups.map((group, gi) => (
            <div key={group.label} style={{ padding: '0 10px', borderRight: gi < groups.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              {/* Group pill header */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: group.bg, border: `1px solid ${group.color}22`, borderRadius: 100, padding: '3px 10px 3px 6px', marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: group.color }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: group.color, letterSpacing: '0.3px' }}>{group.label}</span>
              </div>
              {/* Items */}
              {group.items.map(item => (
                <Link key={item.label} to={item.href} onClick={onClose}
                  style={{ display: 'flex', gap: 10, padding: '7px 8px', borderRadius: 9, textDecoration: 'none', transition: 'all 0.12s', alignItems: 'center', marginBottom: 1 }}
                  onMouseEnter={e => { e.currentTarget.style.background = group.bg; e.currentTarget.style.transform = 'translateX(2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)' }}>
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', lineHeight: 1.25 }}>{item.label}</div>
                    {item.desc && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{item.desc}</div>}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ borderTop: '1px solid #f1f5f9', padding: '10px 20px', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
        <Link to={footer.href} onClick={onClose}
          style={{ fontSize: 12, fontWeight: 600, color: '#00c07a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'gap 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.gap = '8px'}
          onMouseLeave={e => e.currentTarget.style.gap = '4px'}>
          {footer.label}
        </Link>
      </div>
    </div>
  )
}

function NavDropdown({ label, menuKey, active, config, onEnter, onLeave, onClose, openModal }) {
  return (
    <div style={{ position: 'relative' }} onMouseEnter={() => onEnter(menuKey)} onMouseLeave={onLeave}>
      <button style={{
        padding: '8px 14px', fontSize: 14, fontWeight: 500,
        color: active ? '#0f172a' : '#64748b',
        background: active ? '#f1f5f9' : 'transparent',
        border: 'none', borderRadius: 7, cursor: 'pointer',
        transition: 'all 0.15s', fontFamily: 'Inter,sans-serif',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {label}
        <span style={{ fontSize: 10, display: 'inline-block', transition: 'transform 0.2s', transform: active ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
      </button>
      {active && <MegaMenu config={config} onClose={onClose} openModal={openModal} />}
    </div>
  )
}

// ─── MAIN NAV ─────────────────────────────────────────────────
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const { openModal } = useModal()
  const location = useLocation()
  const leaveTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenu(null); setMobileOpen(false); setMobileExpanded(null) }, [location])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleEnter = (key) => { clearTimeout(leaveTimer.current); setMenu(key) }
  const handleLeave = () => { leaveTimer.current = setTimeout(() => setMenu(null), 120) }
  const handleClose = () => setMenu(null)

  const mobileMenuItems = [
    { label: 'Solutions', key: 'solutions', groups: MENUS.solutions.groups },
    { label: 'Use Cases', key: 'usecases', groups: MENUS.usecases.groups },
    { label: 'Integrations', key: 'integrations', groups: MENUS.integrations.groups },
    { label: 'Roles', href: '/roles' },
    { label: 'Pricing', href: '/pricing' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 700,
        background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.2s', fontFamily: 'Inter, sans-serif', overflow: 'visible',
      }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginRight: 8 }}>
              <img src={LOGO} alt="SpacioHub" style={{ height: 52 }} />
            </Link>

            {/* Desktop nav */}
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="nav-desktop">
              <NavDropdown label="Solutions"    menuKey="solutions"    active={menu === 'solutions'}    config={MENUS.solutions}    onEnter={handleEnter} onLeave={handleLeave} onClose={handleClose} openModal={openModal} />
              <NavDropdown label="Use Cases"    menuKey="usecases"     active={menu === 'usecases'}     config={MENUS.usecases}     onEnter={handleEnter} onLeave={handleLeave} onClose={handleClose} openModal={openModal} />
              <NavDropdown label="Integrations" menuKey="integrations" active={menu === 'integrations'} config={MENUS.integrations} onEnter={handleEnter} onLeave={handleLeave} onClose={handleClose} openModal={openModal} />
              {[{ label: 'Roles', href: '/roles' }, { label: 'Pricing', href: '/pricing' }].map(item => (
                <Link key={item.label} to={item.href}
                  style={{ padding: '8px 14px', fontSize: 14, fontWeight: 500, color: '#64748b', textDecoration: 'none', borderRadius: 7, transition: 'all 0.15s', background: location.pathname === item.href ? '#f1f5f9' : 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a'; setMenu(null) }}
                  onMouseLeave={e => { e.currentTarget.style.background = location.pathname === item.href ? '#f1f5f9' : 'transparent'; e.currentTarget.style.color = '#64748b' }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop right side */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer"
              style={{ fontSize: 14, fontWeight: 500, color: '#64748b', textDecoration: 'none', padding: '8px 14px', borderRadius: 7, transition: 'all 0.15s' }}
              className="nav-desktop"
              onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#0f172a' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b' }}>
              Sign in
            </a>
            <button onClick={openModal}
              style={{ background: '#00c07a', color: '#fff', padding: '9px 20px', borderRadius: 7, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s' }}
              className="nav-desktop"
              onMouseEnter={e => { e.currentTarget.style.background = '#009960'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#00c07a'; e.currentTarget.style.transform = 'translateY(0)' }}>
              Request Demo
            </button>

            {/* Hamburger — mobile only */}
            <button className="nav-mobile-only" onClick={() => setMobileOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ display: 'block', width: 22, height: 2, background: '#0f172a', borderRadius: 2, transition: 'all 0.25s', transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#0f172a', borderRadius: 2, transition: 'all 0.25s', opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#0f172a', borderRadius: 2, transition: 'all 0.25s', transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, background: '#fff', zIndex: 699, overflowY: 'auto', borderTop: '1px solid #e2e8f0', animation: 'slideDown 0.2s ease' }}>
            <div style={{ padding: '12px 20px 32px' }}>

              {mobileMenuItems.map(item => (
                <div key={item.label}>
                  {item.href ? (
                    <Link to={item.href}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 4px', borderBottom: '1px solid #f1f5f9', textDecoration: 'none', fontSize: 16, fontWeight: 600, color: '#0f172a' }}>
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 4px', borderBottom: '1px solid #f1f5f9', background: 'none', border: 'none', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#f1f5f9', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: 16, fontWeight: 600, color: '#0f172a', textAlign: 'left' }}>
                        {item.label}
                        <span style={{ fontSize: 12, color: '#94a3b8', transition: 'transform 0.2s', display: 'inline-block', transform: mobileExpanded === item.key ? 'rotate(180deg)' : 'none' }}>▾</span>
                      </button>
                      {mobileExpanded === item.key && (
                        <div style={{ padding: '8px 0 12px 8px', animation: 'slideDown 0.15s ease' }}>
                          {item.groups.map(group => (
                            <div key={group.label} style={{ marginBottom: 12 }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: group.bg, border: `1px solid ${group.color}22`, borderRadius: 100, padding: '2px 8px 2px 5px', marginBottom: 6 }}>
                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: group.color }} />
                                <span style={{ fontSize: 10, fontWeight: 700, color: group.color }}>{group.label}</span>
                              </div>
                              {group.items.map(gitem => (
                                <Link key={gitem.label} to={gitem.href}
                                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9, textDecoration: 'none', marginBottom: 2 }}
                                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                  <span style={{ flexShrink: 0 }}>{gitem.icon}</span>
                                  <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{gitem.label}</div>
                                    {gitem.desc && <div style={{ fontSize: 11, color: '#94a3b8' }}>{gitem.desc}</div>}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Mobile CTAs */}
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer"
                  style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 15, fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>
                  Sign in
                </a>
                <button onClick={() => { openModal(); setMobileOpen(false) }}
                  style={{ background: '#00c07a', color: '#fff', padding: '13px', borderRadius: 10, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                  Request Demo →
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @media (min-width: 961px) { .nav-mobile-only { display: none !important; } }
        @media (max-width: 960px) { .nav-desktop { display: none !important; } }
      `}</style>
    </>
  )
}
