import SEO from '../../components/SEO'
import { PAGE_SEO } from '../../components/pageSEO'
import React, { useState, useEffect } from 'react'
import { useModal } from '../../components/ModalContext'

const SVG_ICONS = {
  // Core primitives
  playlist:  `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  schedule:  `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  alert:     `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,

  // Slide sources
  canvas:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 14l5-5 5 5 3-3 5 5"/><circle cx="8" cy="8" r="1.5"/></svg>`,
  media:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  web:       `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,

  // Features
  ticker:    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  screens:   `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  library:   `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  brush:     `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
  lock:      `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  plug:      `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7V4H6v3"/><rect x="2" y="7" width="20" height="5" rx="2"/><path d="M6 12v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4"/></svg>`,
  refresh:   `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
}

// ══ PLAYLIST ITEMS shown rotating on the hero screen preview ═
const PLAYLIST_ITEMS = [
  { key: 'welcome', label: 'Visitor Welcome',   duration: '15s' },
  { key: 'rooms',   label: 'Room Availability', duration: '20s' },
  { key: 'today',   label: "Today's Events",    duration: '15s' },
  { key: 'brand',   label: 'Brand Video',       duration: '30s' },
]

// Rotating lobby-screen preview — demonstrates a playlist playing
function SignageScreenVisual() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % PLAYLIST_ITEMS.length), 4500)
    return () => clearInterval(t)
  }, [])

  const current = PLAYLIST_ITEMS[idx].key
  const nextItem = PLAYLIST_ITEMS[(idx + 1) % PLAYLIST_ITEMS.length]

  return (
    <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
      {/* Playlist badge above screen */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 100, padding: '4px 12px' }}>
          <div dangerouslySetInnerHTML={{ __html: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>` }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', letterSpacing: '0.5px' }}>PLAYLIST · LOBBY WELCOME LOOP</span>
        </div>
      </div>

      {/* Screen bezel */}
      <div style={{ background: 'linear-gradient(160deg,#0f172a,#1e293b)', borderRadius: 18, padding: 14, boxShadow: '0 20px 60px rgba(0,0,0,0.45)', border: '1px solid #334155' }}>
        <div style={{ background: '#000', borderRadius: 10, overflow: 'hidden', minHeight: 400, position: 'relative' }}>

          {/* Status bar */}
          <div style={{ position: 'absolute', top: 10, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: 'rgba(255,255,255,0.45)', zIndex: 2, fontFamily: 'DM Mono, monospace' }}>
            <span>SPACIOHUB · LOBBY SCREEN 01</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} /> LIVE · 10:42 AM
            </span>
          </div>

          {/* --- Visitor Welcome slide --- */}
          {current === 'welcome' && (
            <div style={{ padding: '60px 22px 52px', textAlign: 'center', animation: 'fadeIn 0.45s ease' }}>
              <div style={{ fontSize: 13, color: '#3b82f6', fontWeight: 700, letterSpacing: '0.5px', marginBottom: 6 }}>WELCOME</div>
              <div style={{ fontSize: 30, color: '#fff', fontWeight: 900, marginBottom: 10, lineHeight: 1.15 }}>Sarah Al&nbsp;Mansoori</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 24 }}>We're glad to have you at Riser Technologies today</div>
              <div style={{ display: 'inline-block', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 12, padding: '16px 22px', textAlign: 'left' }}>
                <div style={{ fontSize: 10, color: '#3b82f6', fontWeight: 700, letterSpacing: '0.5px', marginBottom: 6 }}>YOUR MEETING</div>
                <div style={{ fontSize: 15, color: '#fff', fontWeight: 700, marginBottom: 3 }}>Q2 Product Review</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>11:00 AM · Cedar Room · Floor 2</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Host: Ahmed Khan</div>
              </div>
            </div>
          )}

          {/* --- Room Availability slide --- */}
          {current === 'rooms' && (
            <div style={{ padding: '38px 22px 52px', animation: 'fadeIn 0.45s ease' }}>
              <div style={{ fontSize: 13, color: '#22c55e', fontWeight: 700, letterSpacing: '0.5px', marginBottom: 4 }}>ROOM AVAILABILITY · FLOOR 2</div>
              <div style={{ fontSize: 22, color: '#fff', fontWeight: 800, marginBottom: 20 }}>Meeting rooms right now</div>
              <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 10 }}>
                {[
                  { name: 'Aspen',   status: 'Free',   color: '#22c55e', detail: 'Until 12:00' },
                  { name: 'Birch',   status: 'In use', color: '#ef4444', detail: 'Till 11:30' },
                  { name: 'Cedar',   status: 'Soon',   color: '#f59e0b', detail: 'Starts 11:00' },
                  { name: 'Dogwood', status: 'Free',   color: '#22c55e', detail: 'All day' },
                  { name: 'Elm',     status: 'In use', color: '#ef4444', detail: 'Till 13:00' },
                  { name: 'Fir',     status: 'Free',   color: '#22c55e', detail: 'Until 14:30' },
                  { name: 'Ginkgo',  status: 'Free',   color: '#22c55e', detail: 'Until 15:00' },
                  { name: 'Hickory', status: 'Soon',   color: '#f59e0b', detail: 'Starts 11:15' },
                ].map(r => (
                  <div key={r.name} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${r.color}40`, borderLeft: `3px solid ${r.color}`, borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: r.color, fontWeight: 700, textTransform: 'uppercase', margin: '3px 0' }}>{r.status}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{r.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Today's Events slide --- */}
          {current === 'today' && (
            <div style={{ padding: '38px 22px 52px', animation: 'fadeIn 0.45s ease' }}>
              <div style={{ fontSize: 13, color: '#ec4899', fontWeight: 700, letterSpacing: '0.5px', marginBottom: 4 }}>TODAY · WED 23 APR</div>
              <div style={{ fontSize: 22, color: '#fff', fontWeight: 800, marginBottom: 18 }}>What's happening today</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { time: '09:00', title: 'Leadership standup',      room: 'Aspen',     color: '#22c55e' },
                  { time: '10:30', title: 'Client demo — Acme Corp', room: 'Cedar',     color: '#3b82f6' },
                  { time: '12:00', title: 'All-hands lunch',         room: 'Lobby',     color: '#f59e0b' },
                  { time: '14:00', title: 'Engineering sync',        room: 'Birch',     color: '#8b5cf6' },
                  { time: '16:00', title: 'Q2 board review',         room: 'Boardroom', color: '#ef4444' },
                ].map(e => (
                  <div key={e.title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${e.color}`, borderRadius: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'DM Mono, monospace', minWidth: 52 }}>{e.time}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>{e.title}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{e.room}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Brand Video slide --- */}
          {current === 'brand' && (
            <div style={{ padding: 0, minHeight: 400, animation: 'fadeIn 0.45s ease', background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '15%', right: '-10%', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,158,11,0.25),transparent 70%)' }} />
              <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.2),transparent 70%)' }} />
              <div style={{ position: 'relative', textAlign: 'center', zIndex: 1, padding: '0 28px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: 100, padding: '4px 14px', marginBottom: 20 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#f59e0b', letterSpacing: '0.5px' }}>VIDEO</span>
                </div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', marginBottom: 12, lineHeight: 1.1, letterSpacing: '-0.5px' }}>
                  Built for the <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>modern workspace</span>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
                  Upload any MP4, image, or brand loop from the Media Library.
                </div>
              </div>
            </div>
          )}

          {/* Ticker bar (at bottom, above progress) */}
          <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, background: 'rgba(139,92,246,0.15)', borderTop: '1px solid rgba(139,92,246,0.3)', borderBottom: '1px solid rgba(139,92,246,0.3)', padding: '6px 14px', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, flexShrink: 0, background: '#8b5cf6', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 9, fontWeight: 800, letterSpacing: '0.5px' }}>TICKER</div>
            <div style={{ fontSize: 11, color: '#fff', fontWeight: 500, whiteSpace: 'nowrap', animation: 'tickerScroll 20s linear infinite' }}>
              Town hall starts at 3:00 PM in the lobby · Building WiFi maintenance 6–8 PM tonight · Welcome to our new joiners Layla &amp; Omar · Q2 all-hands this Friday 10 AM
            </div>
          </div>

          {/* Bottom bar — "NEXT UP" + progress dots */}
          <div style={{ position: 'absolute', bottom: 6, left: 14, right: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.5px' }}>
              NEXT UP · {nextItem.label.toUpperCase()}
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              {PLAYLIST_ITEMS.map((p, i) => (
                <div key={p.key} style={{ width: i === idx ? 22 : 6, height: 4, borderRadius: 3, background: i === idx ? '#f59e0b' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Label under screen */}
      <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.5px' }}>
        NOW PLAYING · SLIDE {idx + 1} OF {PLAYLIST_ITEMS.length} · {PLAYLIST_ITEMS[idx].label.toUpperCase()} · {PLAYLIST_ITEMS[idx].duration}
      </div>

      {/* Inline keyframes for ticker */}
      <style>{`@keyframes tickerScroll { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }`}</style>
    </div>
  )
}

// ══ CANVAS EDITOR MOCKUP ═══════════════════════════════════
function CanvasEditorMockup() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      {/* Top chrome */}
      <div style={{ background: '#0f172a', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e' }} />
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.3px' }}>CANVAS EDITOR · LOBBY WELCOME.SLIDE</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)', padding: '3px 9px', borderRadius: 5 }}>Preview</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: '#f59e0b', padding: '3px 9px', borderRadius: 5 }}>Save</div>
        </div>
      </div>
      {/* Editor body */}
      <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', minHeight: 280 }}>
        {/* Left tool rail */}
        <div style={{ background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          {[
            { t: 'T', color: '#0f172a', bg: '#fff', active: true },
            { t: '▭', color: '#64748b', bg: 'transparent', active: false },
            { t: '◯', color: '#64748b', bg: 'transparent', active: false },
            { t: '▤', color: '#64748b', bg: 'transparent', active: false },
            { t: '▦', color: '#64748b', bg: 'transparent', active: false },
            { t: '⌘', color: '#64748b', bg: 'transparent', active: false },
          ].map((tool, i) => (
            <div key={i} style={{ width: 30, height: 30, borderRadius: 7, background: tool.active ? tool.bg : 'transparent', border: tool.active ? '1px solid #e2e8f0' : '1px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: tool.color, boxShadow: tool.active ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>{tool.t}</div>
          ))}
        </div>
        {/* Canvas area */}
        <div style={{ background: '#f1f5f9', padding: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: '22px 20px', width: '100%', maxWidth: 340, minHeight: 200, position: 'relative', boxShadow: '0 6px 18px rgba(0,0,0,0.15)' }}>
            {/* Simulated selection handles on a text element */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: '#3b82f6', fontWeight: 700, letterSpacing: '0.5px' }}>WELCOME</div>
              <div style={{ position: 'absolute', inset: '-4px -6px', border: '1.5px dashed #f59e0b', borderRadius: 3, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: -3, left: -5, width: 5, height: 5, background: '#f59e0b', borderRadius: 1 }} />
              <div style={{ position: 'absolute', top: -3, right: -7, width: 5, height: 5, background: '#f59e0b', borderRadius: 1 }} />
              <div style={{ position: 'absolute', bottom: -3, left: -5, width: 5, height: 5, background: '#f59e0b', borderRadius: 1 }} />
              <div style={{ position: 'absolute', bottom: -3, right: -7, width: 5, height: 5, background: '#f59e0b', borderRadius: 1 }} />
            </div>
            <div style={{ fontSize: 20, color: '#fff', fontWeight: 900, marginBottom: 14, lineHeight: 1.15 }}>Sarah Al Mansoori</div>
            {/* Simulated widget block */}
            <div style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 6, padding: '10px 12px' }}>
              <div style={{ fontSize: 8, color: '#3b82f6', fontWeight: 700, letterSpacing: '0.5px', marginBottom: 3 }}>WIDGET · YOUR MEETING</div>
              <div style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>Q2 Product Review</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>11:00 AM · Cedar Room · Floor 2</div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer status */}
      <div style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10, color: '#64748b', fontFamily: 'DM Mono, monospace' }}>
        <span>CANVAS · 1920 × 1080</span>
        <span>AUTOSAVED · JUST NOW</span>
      </div>
    </div>
  )
}

// ══ THREE CORE PRIMITIVES ═══════════════════════════════════
const PRIMITIVES = [
  {
    icon: 'playlist', title: 'Playlists',
    tagline: 'Build a loop, play it anywhere',
    desc: 'Drag slides into order, set how long each plays, and loop. Assign one playlist to one screen or a hundred — any update pushes to all of them at once.',
    color: '#fffbeb', border: '#fde68a', accent: '#d97706',
  },
  {
    icon: 'schedule', title: 'Schedules',
    tagline: 'The right content at the right time',
    desc: 'Welcome loop in the morning, meeting schedule during the day, brand video after hours. Rules by time of day, weekday or date range — or just "All day".',
    color: '#eff6ff', border: '#bfdbfe', accent: '#3b82f6',
  },
  {
    icon: 'alert', title: 'Emergency Alert',
    tagline: 'Overrides all slides on every screen instantly',
    desc: 'Type the message, hit Activate Alert, and every display in the building switches to a full-screen notice in seconds. Clear the alert to return to normal playback.',
    color: '#fef2f2', border: '#fecaca', accent: '#ef4444',
  },
]

// ══ SLIDE SOURCES ══════════════════════════════════════════
const SLIDE_SOURCES = [
  { icon: 'canvas', title: 'Canvas Slides',        desc: 'Designed right in SpacioHub. Text, shapes, images, and live data widgets — no Photoshop, no designer.' },
  { icon: 'media',  title: 'Media Slides',         desc: 'Upload PNG, JPG, GIF or MP4 to the Media Library. Drop them into any playlist as a slide.' },
  { icon: 'web',    title: 'Web Slides',           desc: 'Embed any URL — a Notion page, a BI dashboard, a live status page, a Twitter feed. Auto-refreshes.' },
]

// ══ FEATURES ═══════════════════════════════════════════════
const FEATURES = [
  { icon: 'screens',  title: 'Central screen registry', desc: 'Pair every display once, then manage it forever from the admin. Group by floor, building or site.',           color: '#ecfeff', border: '#a5f3fc' },
  { icon: 'ticker',   title: 'Scrolling ticker',        desc: 'Add a persistent ticker bar across every screen for news, notices or welcomes — independent of the playlist.', color: '#f5f3ff', border: '#ddd6fe' },
  { icon: 'library',  title: 'Media Library',           desc: 'Upload images and videos once, reuse them across playlists. Organised, searchable and versioned.',            color: '#f0fdf4', border: '#a7f3d0' },
  { icon: 'refresh',  title: 'Auto-refresh, always',    desc: 'Content updates in the background. No manual reloads, no stuck screens, no nightly reboots. Disconnect-safe.', color: '#eff6ff', border: '#bfdbfe' },
  { icon: 'brush',    title: 'Match your brand',        desc: 'Upload your logo, set accent colours, pick fonts. Every widget looks like it was designed for your office.',   color: '#fdf2f8', border: '#fbcfe8' },
  { icon: 'plug',     title: 'No hardware box',         desc: 'Re-use screens you already own. No proprietary media players, no per-display hardware fees, no vendor lock-in.', color: '#fffbeb', border: '#fde68a' },
]

export default function DigitalSignage() {
  const { openModal } = useModal()

  return (
    <>
      <SEO {...PAGE_SEO.platformSignage} />

      <main>

        {/* ══ HERO ════════════════════════════════════════════ */}
        <section style={{ padding: '96px 0 80px', background: 'linear-gradient(170deg,#1a1206 0%,#0f172a 60%,#111827 100%)', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse,rgba(245,158,11,0.14) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div className="container" style={{ position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.28)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', letterSpacing: '0.5px' }}>Digital Signage</span>
              </div>
              <h1 className="animate-fade-up h1" style={{ color: '#fff', marginBottom: 20, maxWidth: 780, margin: '0 auto 20px' }}>
                Every screen. <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>One dashboard.</span>
              </h1>
              <p className="animate-fade-up body" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto 36px', fontSize: 17, lineHeight: 1.65 }}>
                Design slides in the Canvas Editor, build them into playlists, schedule them across every screen in your building — and push emergency alerts to all of them with one click. No hardware box required.
              </p>
              <div className="animate-fade-up" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={openModal} style={{ boxShadow: '0 6px 20px rgba(245,158,11,0.35)', background: '#f59e0b', border: 'none' }}>
                  See it live →
                </button>
                <a href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 22px', borderRadius: 9, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  View pricing
                </a>
              </div>

              {/* Stats row */}
              <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 48, flexWrap: 'wrap' }}>
                {[
                  { value: 'No hardware',    label: 'runs on any browser' },
                  { value: '1-click',        label: 'emergency alerts' },
                  { value: 'Unlimited',      label: 'screens per site' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#f59e0b' }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero screen visual */}
            <div className="animate-fade-up">
              <SignageScreenVisual />
            </div>
          </div>
        </section>

        {/* ══ THREE PRIMITIVES ════════════════════════════════ */}
        <section style={{ padding: '88px 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="tag reveal">The core model</span>
              <h2 className="h2 reveal">
                Playlists. Schedules. <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>Alerts.</span>
              </h2>
              <p className="body reveal" style={{ maxWidth: 560, margin: '16px auto 0', color: '#64748b' }}>
                These three capabilities drive everything on screen. Slides, Screens and the Media Library are the raw materials that power them.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 reveal" style={{ gap: 22 }}>
              {PRIMITIVES.map((p, i) => (
                <div key={i} style={{ background: p.color, border: `1px solid ${p.border}`, borderRadius: 18, padding: '32px 26px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 13, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${p.border}`, marginBottom: 18 }} dangerouslySetInnerHTML={{ __html: SVG_ICONS[p.icon] }} />
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 6, letterSpacing: '-0.3px' }}>{p.title}</h3>
                  <div style={{ fontSize: 12, fontWeight: 700, color: p.accent, marginBottom: 12, letterSpacing: '0.2px' }}>{p.tagline}</div>
                  <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CANVAS EDITOR ═══════════════════════════════════ */}
        <section style={{ padding: '88px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 reveal" style={{ gap: 48, alignItems: 'center' }}>
              {/* Left: copy */}
              <div>
                <span className="tag">Canvas Editor</span>
                <h2 className="h2" style={{ marginTop: 16, marginBottom: 14 }}>
                  Design slides <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>right inside SpacioHub</span>
                </h2>
                <p className="body" style={{ color: '#64748b', marginBottom: 20, lineHeight: 1.7 }}>
                  The built-in Canvas Editor is a full visual slide designer. Drop in text, shapes, images, brand colours and live data widgets — no Photoshop, no designer, no round trips.
                </p>
                <div className="check-list">
                  {[
                    'Text, shapes, images, and backgrounds',
                    'Live widgets — room availability, today\'s events, visitor welcome',
                    'Brand fonts and colour palettes',
                    'Drag-to-resize, snap-to-grid, smart guides',
                    'Autosave — never lose a design',
                    'Duplicate and remix existing slides',
                  ].map((c, i) => (
                    <div key={i} className="check-item">
                      <div className="check-ic" style={{ background: '#f59e0b' }}>
                        <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3" /></svg>
                      </div>
                      <div className="check-text">{c}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: editor mockup */}
              <div>
                <CanvasEditorMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ══ SLIDE SOURCES ═══════════════════════════════════ */}
        <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="tag reveal">Three ways to build a slide</span>
              <h2 className="h2 reveal">Design, upload or <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>embed</span></h2>
              <p className="body reveal" style={{ maxWidth: 520, margin: '16px auto 0', color: '#64748b' }}>
                Mix and match any of these in a single playlist — a Canvas slide followed by a brand video, then a live web dashboard.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 reveal" style={{ gap: 18 }}>
              {SLIDE_SOURCES.map((s, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '24px 22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <div style={{ marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: SVG_ICONS[s.icon] }} />
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ════════════════════════════════════ */}
        <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="tag reveal">How It Works</span>
              <h2 className="h2 reveal">Live on your screens in <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>under 10 minutes</span></h2>
              <p className="body reveal" style={{ maxWidth: 520, margin: '16px auto 0', color: '#64748b' }}>
                No players to buy, no cables to run, no IT project. If your screen has a browser, you're a few steps away from going live.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 reveal" style={{ gap: 18 }}>
              {[
                { step: '01', title: 'Build a slide',         desc: 'Design in the Canvas Editor, upload media, or paste a web URL. Name it and save.',                     color: '#fffbeb', border: '#fde68a', accent: '#d97706' },
                { step: '02', title: 'Add to a playlist',     desc: 'Drag slides into the order you want. Set per-slide duration. Loop it.',                                color: '#fef2f2', border: '#fecaca', accent: '#ef4444' },
                { step: '03', title: 'Pair a screen',         desc: 'Open the unique screen URL on any smart TV, Fire stick, Chromebox or tablet. It pairs automatically.', color: '#eff6ff', border: '#bfdbfe', accent: '#3b82f6' },
                { step: '04', title: 'Schedule it',           desc: 'Pick times and days. All-day is fine too. Push emergency alerts anytime to override everything.',      color: '#f5f3ff', border: '#ddd6fe', accent: '#8b5cf6' },
              ].map((s, i) => (
                <div key={i} style={{ background: s.color, border: `1px solid ${s.border}`, borderRadius: 16, padding: '26px 22px' }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.accent, opacity: 0.3, marginBottom: 10, fontFamily: 'DM Mono, monospace' }}>{s.step}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES ═══════════════════════════════════════ */}
        <section style={{ padding: '80px 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="tag reveal">Features</span>
              <h2 className="h2 reveal">Signage that <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>just works</span></h2>
              <p className="body reveal" style={{ maxWidth: 520, margin: '16px auto 0', color: '#64748b' }}>
                No per-screen licences. No proprietary hardware. No nightly cron jobs to reboot frozen displays.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 reveal" style={{ gap: 20 }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ background: f.color, border: `1px solid ${f.border}`, borderRadius: 16, padding: '26px 22px' }}>
                  <div style={{ marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: SVG_ICONS[f.icon] }} />
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ NO HARDWARE BOX ═══════════════════════════════ */}
        <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 reveal" style={{ gap: 40, alignItems: 'center' }}>
              <div>
                <span className="tag">No hardware box required</span>
                <h2 className="h2" style={{ marginTop: 16, marginBottom: 14 }}>
                  Use the <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>screens you already own</span>
                </h2>
                <p className="body" style={{ color: '#64748b', marginBottom: 24, lineHeight: 1.65 }}>
                  Traditional signage vendors sell you a proprietary media player for every screen — and a yearly licence on top. SpacioHub runs in a regular browser, so any TV, stick or tablet with Wi-Fi will do.
                </p>
                <div className="check-list">
                  {[
                    'Unlimited screens per site',
                    'Unlimited playlists and schedules',
                    'Emergency alert override built in',
                    'Scrolling ticker layer included',
                    'No proprietary hardware needed',
                    'Central remote management',
                  ].map((c, i) => (
                    <div key={i} className="check-item">
                      <div className="check-ic" style={{ background: '#f59e0b' }}>
                        <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3" /></svg>
                      </div>
                      <div className="check-text">{c}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28 }}>
                  <a href="/pricing" className="btn btn-primary" style={{ background: '#f59e0b', border: 'none', boxShadow: '0 6px 20px rgba(245,158,11,0.3)' }}>See pricing →</a>
                </div>
              </div>

              {/* Right: Hardware compatibility */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 28, boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#f59e0b', letterSpacing: '0.5px', marginBottom: 4 }}>COMPATIBLE HARDWARE</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 18 }}>Works with anything web-capable</div>
                {[
                  { name: 'Smart TV (any brand)',    detail: 'Samsung, LG, Sony — open the built-in browser and go', color: '#f59e0b' },
                  { name: 'Amazon Fire TV Stick',    detail: 'Low cost per display. Silk browser in kiosk mode.',    color: '#ec4899' },
                  { name: 'Chromebox / Chromecast',  detail: 'Plug into HDMI, cast the screen URL',                  color: '#3b82f6' },
                  { name: 'Raspberry Pi (Chromium)', detail: 'Silent, low power, runs indefinitely',                 color: '#22c55e' },
                  { name: 'iPad / Android tablet',   detail: 'Wall-mount for smaller areas and desks',               color: '#8b5cf6' },
                ].map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: h.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{h.name}</div>
                      <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{h.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════ */}
        <section style={{ padding: '88px 0', background: 'linear-gradient(135deg,#1a1206,#0f172a)', textAlign: 'center' }}>
          <div className="container">
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </div>
            <h2 className="h2 reveal" style={{ color: '#fff', marginBottom: 16 }}>
              Turn any screen into a <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>smart display</span>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.65 }}>
              Book a 15-minute walkthrough and we'll help you design your first slide in the Canvas Editor, live — running on a TV in your office.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={openModal} style={{ background: '#f59e0b', border: 'none', boxShadow: '0 6px 20px rgba(245,158,11,0.35)', fontSize: 15, padding: '13px 28px' }}>
                Request a demo →
              </button>
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 24px', borderRadius: 9, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Contact us →
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
