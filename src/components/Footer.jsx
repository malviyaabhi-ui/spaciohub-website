import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from './ModalContext'

const LOGO = 'https://svksiwnalmrjjnskycqb.supabase.co/storage/v1/object/public/assets/logo-no-background.png'

export default function Footer() {
  const { openModal } = useModal()
  const [w, setW] = useState(window.innerWidth)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  const cols = w <= 480 ? '1fr' : w <= 768 ? '1fr 1fr' : '2fr 1fr 1fr 1fr 1fr'
  const pad  = w <= 768 ? '40px 20px' : '64px 48px'
  const botPad = w <= 768 ? '14px 20px' : '16px 48px'

  return (
    <footer style={{ fontFamily: 'Inter,sans-serif' }}>
      <div style={{ borderTop: '1px solid #e2e8f0', background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: cols, gap: w <= 768 ? 28 : 40 }}>

          {/* Brand */}
          <div style={{ gridColumn: w <= 480 ? '1' : w <= 768 ? '1 / -1' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <img src={LOGO} alt="SpacioHub" style={{ height: 24 }} />
              <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>SpacioHub</span>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, maxWidth: 240 }}>Smart workspace management for modern teams. Built by Riser Technologies.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a href="https://wa.me/971585889306" target="_blank" rel="noreferrer" style={{ width: 34, height: 34, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, textDecoration: 'none' }}>💬</a>
              <a href="mailto:contact@spaciohub.com" style={{ width: 34, height: 34, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, textDecoration: 'none' }}>✉️</a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Platform</h4>
            {[['Room Booking','/platform/booking'],['Visitor Management','/platform/visitors'],['Door Display','/platform/door-display'],['Analytics','/platform/analytics']].map(([l,h]) => (
              <Link key={l} to={h} style={{ display:'block', fontSize:13, color:'#64748b', textDecoration:'none', padding:'4px 0', transition:'color 0.15s' }}
                onMouseEnter={e=>e.target.style.color='#00c07a'} onMouseLeave={e=>e.target.style.color='#64748b'}>{l}</Link>
            ))}
          </div>

          {/* Use Cases */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Use Cases</h4>
            {[['Corporate Offices','/use-cases/corporate'],['Coworking Spaces','/use-cases/coworking'],['Hotels & Hospitality','/use-cases/hotels'],['SaaS Resellers','/use-cases/resellers']].map(([l,h]) => (
              <Link key={l} to={h} style={{ display:'block', fontSize:13, color:'#64748b', textDecoration:'none', padding:'4px 0', transition:'color 0.15s' }}
                onMouseEnter={e=>e.target.style.color='#00c07a'} onMouseLeave={e=>e.target.style.color='#64748b'}>{l}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Company</h4>
            {[['Pricing','/pricing'],['Roles','/roles']].map(([l,h]) => (
              <Link key={l} to={h} style={{ display:'block', fontSize:13, color:'#64748b', textDecoration:'none', padding:'4px 0', transition:'color 0.15s' }}
                onMouseEnter={e=>e.target.style.color='#00c07a'} onMouseLeave={e=>e.target.style.color='#64748b'}>{l}</Link>
            ))}
            <a href="mailto:contact@spaciohub.com" style={{ display:'block', fontSize:13, color:'#64748b', textDecoration:'none', padding:'4px 0' }}>Contact Us</a>
            <button onClick={openModal} style={{ display:'block', marginTop:8, fontSize:13, color:'#00c07a', background:'none', border:'none', cursor:'pointer', padding:'4px 0', fontFamily:'Inter,sans-serif', fontWeight:600 }}>Request Demo →</button>
          </div>

          {/* Get Started */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Get Started</h4>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ display:'block', fontSize:13, color:'#64748b', textDecoration:'none', padding:'4px 0' }}>Sign in</a>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ display:'block', fontSize:13, color:'#64748b', textDecoration:'none', padding:'4px 0' }}>Free Trial</a>
            <a href="mailto:contact@spaciohub.com" style={{ display:'block', fontSize:13, color:'#64748b', textDecoration:'none', padding:'4px 0' }}>contact@spaciohub.com</a>
            <a href="https://wa.me/971585889306" target="_blank" rel="noreferrer" style={{ display:'block', fontSize:13, color:'#64748b', textDecoration:'none', padding:'4px 0' }}>+971 58 588 9306</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background:'#f8fafc', borderTop:'1px solid #e2e8f0', padding: botPad, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
        <p style={{ fontSize:12, color:'#94a3b8' }}>© 2026 SpacioHub by Riser Technologies. All rights reserved.</p>
        <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ fontSize:12, color:'#94a3b8', textDecoration:'none' }}
          onMouseEnter={e=>e.target.style.color='#00c07a'} onMouseLeave={e=>e.target.style.color='#94a3b8'}>go.spaciohub.com →</a>
      </div>
    </footer>
  )
}
