import React from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../../components/ModalContext'

const UC_ICONS = {
  'Corporate Offices': (
    <svg viewBox="0 0 48 48" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#eff6ff"/>
      <rect x="10" y="14" width="28" height="26" rx="2" fill="#3b82f6" opacity="0.15"/>
      <rect x="10" y="14" width="28" height="4" rx="2" fill="#3b82f6"/>
      <rect x="14" y="22" width="5" height="5" rx="1" fill="#3b82f6" opacity="0.7"/>
      <rect x="22" y="22" width="5" height="5" rx="1" fill="#3b82f6" opacity="0.7"/>
      <rect x="30" y="22" width="5" height="5" rx="1" fill="#3b82f6" opacity="0.7"/>
      <rect x="14" y="30" width="5" height="5" rx="1" fill="#3b82f6" opacity="0.7"/>
      <rect x="22" y="30" width="5" height="5" rx="1" fill="#3b82f6" opacity="0.7"/>
      <rect x="30" y="30" width="5" height="5" rx="1" fill="#3b82f6" opacity="0.7"/>
      <rect x="20" y="35" width="8" height="5" rx="1" fill="#3b82f6"/>
    </svg>
  ),
  'Coworking Spaces': (
    <svg viewBox="0 0 48 48" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#ecfdf5"/>
      <circle cx="18" cy="19" r="5" fill="#00c07a" opacity="0.8"/>
      <circle cx="30" cy="19" r="5" fill="#00c07a" opacity="0.5"/>
      <path d="M8 36c0-5.5 4.5-10 10-10h12c5.5 0 10 4.5 10 10" stroke="#00c07a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="24" cy="32" r="3" fill="#00c07a"/>
    </svg>
  ),
  'Hotels & Hospitality': (
    <svg viewBox="0 0 48 48" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#fff7ed"/>
      <path d="M24 10l2.5 7h7.5l-6 4.5 2.5 7L24 25l-6.5 3.5 2.5-7L14 17h7.5z" fill="#f59e0b"/>
      <rect x="14" y="30" width="20" height="10" rx="2" fill="#f59e0b" opacity="0.3"/>
      <rect x="14" y="30" width="20" height="3" rx="1" fill="#f59e0b" opacity="0.6"/>
      <rect x="20" y="33" width="4" height="7" rx="1" fill="#f59e0b" opacity="0.7"/>
      <rect x="26" y="33" width="5" height="4" rx="1" fill="#f59e0b" opacity="0.5"/>
    </svg>
  ),
  'SaaS Resellers': (
    <svg viewBox="0 0 48 48" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#fdf2f8"/>
      <rect x="10" y="14" width="18" height="14" rx="3" fill="#ec4899" opacity="0.7"/>
      <rect x="20" y="20" width="18" height="14" rx="3" fill="#ec4899" opacity="0.4" stroke="#ec4899" strokeWidth="1.5"/>
      <circle cx="29" cy="27" r="3" fill="#ec4899"/>
      <path d="M27 27h4M29 25v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

// Map common feature emoji → inline SVG (receives accentColor, accentLight as args)
const FEAT_ICONS = {
  '🚪': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><rect x="11" y="6" width="18" height="28" rx="2.5" fill={ac} opacity="0.2"/><rect x="11" y="6" width="18" height="28" rx="2.5" stroke={ac} strokeWidth="1.5"/><rect x="13" y="8" width="14" height="4" rx="0.5" fill={ac} opacity="0.3"/><circle cx="25" cy="20" r="1.5" fill={ac}/></svg>,
  '👥': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><circle cx="16" cy="15" r="4.5" fill={ac} opacity="0.8"/><circle cx="26" cy="15" r="4.5" fill={ac} opacity="0.4"/><path d="M6 32c0-5 4-9 10-9h8c6 0 10 4 10 9" stroke={ac} strokeWidth="2" strokeLinecap="round" fill="none"/></svg>,
  '⚙️': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><circle cx="20" cy="20" r="4" fill={ac} opacity="0.3"/><circle cx="20" cy="20" r="4" stroke={ac} strokeWidth="1.5"/><path d="M20 10v3M20 27v3M10 20h3M27 20h3M13 13l2 2M25 25l2 2M27 13l-2 2M15 25l-2 2" stroke={ac} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  '📊': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><rect x="9" y="25" width="5" height="9" rx="1" fill={ac} opacity="0.4"/><rect x="16" y="19" width="5" height="15" rx="1" fill={ac} opacity="0.6"/><rect x="23" y="14" width="5" height="20" rx="1" fill={ac} opacity="0.8"/><rect x="30" y="10" width="4" height="24" rx="1" fill={ac}/></svg>,
  '📅': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><rect x="9" y="12" width="22" height="20" rx="2" fill={ac} opacity="0.15"/><rect x="9" y="12" width="22" height="6" rx="2" fill={ac}/><rect x="13" y="6" width="3" height="7" rx="1.5" fill={ac}/><rect x="24" y="6" width="3" height="7" rx="1.5" fill={ac}/><rect x="12" y="22" width="4" height="4" rx="1" fill={ac} opacity="0.6"/><rect x="18" y="22" width="4" height="4" rx="1" fill={ac} opacity="0.6"/></svg>,
  '🖥️': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><rect x="11" y="7" width="18" height="27" rx="2.5" fill={ac} opacity="0.15"/><rect x="11" y="7" width="18" height="27" rx="2.5" stroke={ac} strokeWidth="1.5"/><rect x="13" y="10" width="14" height="3" rx="0.5" fill={ac} opacity="0.5"/><circle cx="20" cy="31" r="1.2" fill={ac}/></svg>,
  '🤖': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><rect x="11" y="14" width="18" height="16" rx="3" fill={ac} opacity="0.2"/><rect x="11" y="14" width="18" height="16" rx="3" stroke={ac} strokeWidth="1.5"/><circle cx="16" cy="20" r="2" fill={ac}/><circle cx="24" cy="20" r="2" fill={ac}/><path d="M16 25h8" stroke={ac} strokeWidth="1.5" strokeLinecap="round"/><rect x="19" y="9" width="2" height="5" rx="1" fill={ac}/></svg>,
  '📋': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><rect x="11" y="9" width="18" height="23" rx="2" fill={ac} opacity="0.15"/><rect x="11" y="9" width="18" height="23" rx="2" stroke={ac} strokeWidth="1.5"/><rect x="15" y="7" width="10" height="4" rx="1.5" fill={ac}/><rect x="14" y="16" width="12" height="1.5" rx="0.75" fill={ac} opacity="0.6"/><rect x="14" y="20" width="9" height="1.5" rx="0.75" fill={ac} opacity="0.6"/><rect x="14" y="24" width="10" height="1.5" rx="0.75" fill={ac} opacity="0.6"/></svg>,
  '🏷️': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><path d="M10 10h12l9 10-9 10H10V10z" fill={ac} opacity="0.2"/><path d="M10 10h12l9 10-9 10H10V10z" stroke={ac} strokeWidth="1.5"/><circle cx="16" cy="20" r="2" fill={ac}/></svg>,
  '💰': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><circle cx="20" cy="20" r="10" fill={ac} opacity="0.15"/><circle cx="20" cy="20" r="10" stroke={ac} strokeWidth="1.5"/><path d="M20 13v14M16 16h5a2 2 0 010 4h-2a2 2 0 010 4h5" stroke={ac} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  '🔑': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><circle cx="16" cy="18" r="6" fill={ac} opacity="0.2"/><circle cx="16" cy="18" r="6" stroke={ac} strokeWidth="1.5"/><path d="M20 22l10 8M26 27l2 2" stroke={ac} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  '👁️': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><path d="M8 20s4-8 12-8 12 8 12 8-4 8-12 8-12-8-12-8z" fill={ac} opacity="0.15"/><path d="M8 20s4-8 12-8 12 8 12 8-4 8-12 8-12-8-12-8z" stroke={ac} strokeWidth="1.5"/><circle cx="20" cy="20" r="3" fill={ac}/></svg>,
  '🚫': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><circle cx="20" cy="20" r="10" fill={ac} opacity="0.15"/><circle cx="20" cy="20" r="10" stroke={ac} strokeWidth="1.5"/><path d="M13 13l14 14" stroke={ac} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  '⚡': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><path d="M22 9l-8 13h7l-3 10 10-14h-7l1-9z" fill={ac} opacity="0.3"/><path d="M22 9l-8 13h7l-3 10 10-14h-7l1-9z" stroke={ac} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  '📧': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><rect x="8" y="12" width="24" height="17" rx="2" fill={ac} opacity="0.15"/><rect x="8" y="12" width="24" height="17" rx="2" stroke={ac} strokeWidth="1.5"/><path d="M8 14l12 9 12-9" stroke={ac} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  '🏢': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><rect x="10" y="10" width="20" height="24" rx="2" fill={ac} opacity="0.15"/><rect x="10" y="10" width="20" height="5" rx="2" fill={ac}/><rect x="13" y="18" width="4" height="4" rx="1" fill={ac} opacity="0.6"/><rect x="19" y="18" width="4" height="4" rx="1" fill={ac} opacity="0.6"/><rect x="17" y="28" width="6" height="6" rx="1" fill={ac}/></svg>,
  '🌐': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><circle cx="20" cy="20" r="10" fill={ac} opacity="0.1"/><circle cx="20" cy="20" r="10" stroke={ac} strokeWidth="1.5"/><path d="M20 10c-3 4-3 12 0 20M20 10c3 4 3 12 0 20M10 20h20" stroke={ac} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  '🌟': (ac, al) => <svg viewBox="0 0 40 40" width="20" height="20" fill="none"><rect width="40" height="40" rx="10" fill={al}/><path d="M20 9l2.5 8h8l-6.5 5 2.5 8L20 26l-6.5 4 2.5-8-6.5-5h8z" fill={ac} opacity="0.3"/><path d="M20 9l2.5 8h8l-6.5 5 2.5 8L20 26l-6.5 4 2.5-8-6.5-5h8z" stroke={ac} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
}

function FeatureIcon({ icon, accentColor, accentLight }) {
  if (icon && typeof icon === 'object') return icon // already a React/SVG element
  const fn = FEAT_ICONS[icon]
  if (fn) return fn(accentColor, accentLight)
  return <span style={{ fontSize: 20 }}>{icon}</span>
}

export default function UseCasePage({ icon, title, subtitle, desc, hero_features, sections, testimonial, related, accentColor = '#00c07a', accentLight = '#ecfdf5', accentBorder = '#a7f3d0' }) {
  const { openModal } = useModal()

  // Split title at " for " to apply dual-tone to the use case name
  const titleParts = title.split(' for ')
  const titlePrefix = titleParts.length > 1 ? titleParts[0] + ' for ' : null
  const titleHighlight = titleParts.length > 1 ? titleParts[1] : title

  return (
    <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(160deg, ${accentLight} 0%, #ffffff 60%, #f8fafc 100%)`, borderBottom: '1px solid #e2e8f0', padding: '88px 0 72px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${accentColor}18, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${accentColor}08 1px,transparent 1px),linear-gradient(90deg,${accentColor}08 1px,transparent 1px)`, backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="tag animate-fade-up">{subtitle}</span>
              <div style={{ marginBottom: 16, animation: 'fadeIn 0.4s ease' }}>{typeof icon === 'string' ? <span style={{ fontSize: 56, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}>{icon}</span> : icon}</div>
              <h1 className="h1 animate-fade-up delay-1" style={{ fontSize: 'clamp(30px,4vw,50px)', marginBottom: 20, letterSpacing: -1.5 }}>
                {titlePrefix && <span style={{ color: '#0f172a' }}>{titlePrefix}</span>}
                <span style={{ background: `linear-gradient(135deg,${accentColor},#0F799B)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>{titleHighlight}</span>
              </h1>
              <p className="lead animate-fade-up delay-2" style={{ maxWidth: 480, marginBottom: 36 }}>{desc}</p>
              <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow: '0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo →</button>
                <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free for 14 days</a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {hero_features.map((f, i) => (
                <div key={i} className="animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.08}s`, background: '#fff', border: `1px solid ${i === 0 ? accentBorder : '#e2e8f0'}`, borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: i === 0 ? `0 4px 20px ${accentColor}15` : '0 1px 4px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accentBorder; e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = i === 0 ? accentBorder : '#e2e8f0'; e.currentTarget.style.transform = 'translateX(0)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: accentLight, border: `1px solid ${accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FeatureIcon icon={f.icon} accentColor={accentColor} accentLight={accentLight} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTIONS ══════════════════════════════════════ */}
      {sections.map((sec, si) => (
        <section key={si} style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', background: si % 2 === 1 ? '#f8fafc' : '#fff', position: 'relative', overflow: 'hidden' }}>
          {si % 2 === 0 && <div style={{ position: 'absolute', bottom: -150, left: -100, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${accentColor}06,transparent 70%)`, pointerEvents: 'none' }} />}
          <div className="container" style={{ position: 'relative' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Text side */}
              <div style={{ order: si % 2 === 1 ? 1 : 0 }}>
                <span className="tag reveal">{sec.tag}</span>
                <h2 className="h2 reveal" style={{ marginBottom: 16 }}>{sec.title}</h2>
                <p className="body reveal" style={{ marginBottom: 24 }}>{sec.desc}</p>
                <div className="check-list reveal">
                  {sec.checks.map((c, i) => (
                    <div key={i} className="check-item">
                      <div className="check-ic" style={{ background: accentColor }}>
                        <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                      </div>
                      <div className="check-text" dangerouslySetInnerHTML={{ __html: c }} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Visual side */}
              <div className="reveal" style={{ order: si % 2 === 1 ? 0 : 1 }}>
                <div style={{ background: sec.visual?.bg || '#f1f5f9', borderRadius: 20, padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.07)' }}>
                  {sec.visual?.label && <div style={{ fontSize: 10, fontWeight: 700, color: sec.visual.bg === '#0f172a' ? '#475569' : '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 14 }}>{sec.visual.label}</div>}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {sec.visual?.items?.map((item, i) => (
                      <div key={i} style={{ background: sec.visual.bg === '#0f172a' ? 'rgba(255,255,255,0.05)' : '#fff', borderRadius: 12, padding: '14px 18px', border: `1px solid ${sec.visual.bg === '#0f172a' ? 'rgba(255,255,255,0.08)' : '#f1f5f9'}`, display: 'flex', gap: 12, alignItems: 'center', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = accentBorder; e.currentTarget.style.transform = 'translateX(3px)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = sec.visual.bg === '#0f172a' ? 'rgba(255,255,255,0.08)' : '#f1f5f9'; e.currentTarget.style.transform = 'translateX(0)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FeatureIcon icon={item.icon} accentColor={accentColor} accentLight={accentLight} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: sec.visual.bg === '#0f172a' ? '#e2e8f0' : '#0f172a' }}>{item.title}</div>
                          {item.sub && <div style={{ fontSize: 11.5, color: sec.visual.bg === '#0f172a' ? '#475569' : '#94a3b8', marginTop: 2 }}>{item.sub}</div>}
                        </div>
                        {item.badge && (
                          <div style={{ background: accentColor, color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap' }}>{item.badge}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ══ TESTIMONIAL ═══════════════════════════════════ */}
      {testimonial && (
        <section style={{ padding: '80px 0', background: 'linear-gradient(135deg,#0a1628,#0f172a)', borderBottom: '1px solid #1e293b', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: `radial-gradient(ellipse,${accentColor}12,transparent 65%)`, pointerEvents: 'none' }} />
          <div className="container" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: 48, marginBottom: 24, opacity: 0.3, lineHeight: 1, color: accentColor }}>❝</div>
            <p style={{ fontSize: 22, color: '#e2e8f0', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 28 }}>{testimonial.quote}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#fff' }}>
                {testimonial.name[0]}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>{testimonial.name}</div>
                <div style={{ fontSize: 12, color: '#475569' }}>{testimonial.role}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ RELATED ═══════════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        <div className="container">
          <h2 className="h2 reveal" style={{ marginBottom: 8 }}>Explore more <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>use cases</span></h2>
          <p className="body reveal" style={{ marginBottom: 40, color: '#64748b' }}>SpacioHub works for every kind of space.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r, i) => (
              <Link key={r.title} to={r.href} className="glow-card reveal" style={{ textDecoration: 'none', padding: 28, animationDelay: `${i*0.1}s` }}>
                <div style={{ marginBottom: 14 }}>{UC_ICONS[r.title] || <span style={{ fontSize: 32 }}>{r.icon}</span>}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{r.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{r.desc}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: accentColor }}>Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(135deg, ${accentLight}, #fff)`, borderTop: `1px solid ${accentBorder}`, padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: `radial-gradient(ellipse,${accentColor}10,transparent 65%)`, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{typeof icon === 'string' ? <span style={{ fontSize: 48 }}>{icon}</span> : icon}</div>
          <h2 className="h2 reveal" style={{ marginBottom: 14 }}>Ready to <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>get started?</span></h2>
          <p className="lead reveal" style={{ marginBottom: 36, color: '#64748b' }}>14-day free trial. No credit card required. Set up in minutes.</p>
          <div className="reveal" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow: '0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Start free trial</a>
          </div>
        </div>
      </section>
    </main>
  )
}
