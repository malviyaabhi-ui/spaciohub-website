import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useModal } from './ModalContext'

const LOGO = 'https://svksiwnalmrjjnskycqb.supabase.co/storage/v1/object/public/assets/logo-no-background.png'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openModal } = useModal()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenu(null); setMobileOpen(false) }, [location])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 700,
    background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
    transition: 'all 0.2s',
    fontFamily: 'Inter, sans-serif'
  }

  const megaMenu = {
    solutions: [
      { label: 'Room Booking System', desc: 'Book, manage and track rooms', href: '/platform/booking', icon: '📅' },
      { label: 'Visitor Management', desc: 'Guest check-in and badges', href: '/platform/visitors', icon: '👥' },
      { label: 'Door Display', desc: 'Tablet panels for every room', href: '/platform/booking#door-display', icon: '🖥️' },
      { label: 'Analytics', desc: 'Utilisation and insights', href: '/platform/booking#analytics', icon: '📊' },
    ],
    usecases: [
      { label: 'Corporate Offices', href: '/use-cases/corporate', icon: '🏢' },
      { label: 'Coworking Spaces', href: '/use-cases/coworking', icon: '🤝' },
      { label: 'Hotels & Hospitality', href: '/use-cases/hotels', icon: '🏨' },
      { label: 'SaaS Resellers', href: '/use-cases/resellers', icon: '🛒' },
    ]
  }

  return (
    <>
      <nav style={navStyle} onMouseLeave={() => setMenu(null)}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 48px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src={LOGO} alt="SpacioHub" style={{ height: 26 }} />
            <span style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', letterSpacing: -0.3 }}>SpacioHub</span>
          </Link>

          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="nav-desktop">
            {[
              { label: 'Solutions', key: 'solutions' },
              { label: 'Use Cases', key: 'usecases' },
              { label: 'Roles', href: '/roles' },
              { label: 'Pricing', href: '/pricing' },
            ].map(item => (
              item.href ? (
                <Link key={item.label} to={item.href} style={{ padding: '8px 14px', fontSize: 14, fontWeight: 500, color: '#64748b', textDecoration: 'none', borderRadius: 7, transition: 'all 0.15s', background: location.pathname === item.href ? '#f1f5f9' : 'transparent' }}
                  onMouseEnter={e => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#0f172a'; setMenu(null) }}
                  onMouseLeave={e => { e.target.style.background = location.pathname === item.href ? '#f1f5f9' : 'transparent'; e.target.style.color = '#64748b' }}>
                  {item.label}
                </Link>
              ) : (
                <button key={item.label} onMouseEnter={() => setMenu(item.key)}
                  style={{ padding: '8px 14px', fontSize: 14, fontWeight: 500, color: menu === item.key ? '#0f172a' : '#64748b', background: menu === item.key ? '#f1f5f9' : 'transparent', border: 'none', borderRadius: 7, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {item.label} <span style={{ fontSize: 10 }}>▾</span>
                </button>
              )
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 500, color: '#64748b', textDecoration: 'none', padding: '8px 14px', borderRadius: 7, transition: 'all 0.15s' }}
              onMouseEnter={e => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#0f172a' }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#64748b' }}>
              Sign in
            </a>
            <button onClick={openModal} style={{ background: '#00c07a', color: '#fff', padding: '9px 20px', borderRadius: 7, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.target.style.background = '#009960'; e.target.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.target.style.background = '#00c07a'; e.target.style.transform = 'translateY(0)' }}>
              Request Demo
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {menu && (
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.12)', padding: 24, display: 'grid', gridTemplateColumns: menu === 'solutions' ? 'repeat(2,1fr)' : 'repeat(2,1fr)', gap: 8, width: menu === 'solutions' ? 520 : 380, animation: 'fadeUp 0.15s ease', zIndex: 10 }}>
            {menu === 'solutions' && megaMenu.solutions.map(item => (
              <Link key={item.label} to={item.href} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.15s', alignItems: 'flex-start' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{item.desc}</div>
                </div>
              </Link>
            ))}
            {menu === 'usecases' && megaMenu.usecases.map(item => (
              <Link key={item.label} to={item.href} style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.15s', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}
