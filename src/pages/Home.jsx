import SEO from '../components/SEO'
import { PAGE_SEO } from '../components/pageSEO'
import PlatformShowcase from '../components/PlatformShowcase'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../components/ModalContext'

const LOGO = 'https://svksiwnalmrjjnskycqb.supabase.co/storage/v1/object/public/assets/logo-no-background.png'

const FEATURES = [
{ icon: '📅', color: '#ecfdf5', border: '#a7f3d0', title: 'Smart Room Booking', desc: 'Visual time grid, 15-min buffer, AI suggestions, booking tags, and Zoom auto-links on every booking.', tag: 'CORE', link: '/platform/booking' },
{ icon: '🖥️', color: '#eff6ff', border: '#bfdbfe', title: 'Door Display Panel', desc: 'Real-time status on any tablet. Quick book, check-in, and guest booking -- no login required.', tag: 'HARDWARE', link: '/platform/booking#door-display' },
{ icon: '📊', color: '#f5f3ff', border: '#ddd6fe', title: 'Analytics & Reports', desc: 'Peak hours, utilisation, no-show tracking, tag breakdowns, and full CSV export.', tag: 'INSIGHTS', link: '/platform/booking#analytics' },
{ icon: '👥', color: '#fff7ed', border: '#fed7aa', title: 'Visitor Management', desc: 'Pre-register guests, self-service check-in kiosk, custom badges, and instant host notifications.', tag: 'ENTERPRISE', link: '/platform/visitors' },
{ icon: '🔗', color: '#fdf2f8', border: '#fbcfe8', title: 'Calendar & iCal', desc: "Subscribe to any room's live calendar in Google or Outlook. Always in sync, automatically.", tag: 'INTEGRATION', link: '/platform/booking#integrations' },
{ icon: '✨', color: '#fefce8', border: '#fde68a', title: 'AI Room Booker', desc: 'Describe what you need in plain language and AI finds and books the best available room.', tag: 'AI', link: '/platform/booking' },
]

const UC_ICONS = {
corporate: (
<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
coworking: (
<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" rx="12" fill="#ecfdf5"/>
<circle cx="18" cy="19" r="5" fill="#00c07a" opacity="0.8"/>
<circle cx="30" cy="19" r="5" fill="#00c07a" opacity="0.5"/>
<path d="M8 36c0-5.5 4.5-10 10-10h12c5.5 0 10 4.5 10 10" stroke="#00c07a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
<circle cx="24" cy="32" r="3" fill="#00c07a"/>
</svg>
),
hotels: (
<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" rx="12" fill="#fff7ed"/>
<path d="M24 10l2.5 7h7.5l-6 4.5 2.5 7L24 25l-6.5 3.5 2.5-7L14 17h7.5z" fill="#f59e0b"/>
<rect x="14" y="30" width="20" height="10" rx="2" fill="#f59e0b" opacity="0.3"/>
<rect x="14" y="30" width="20" height="3" rx="1" fill="#f59e0b" opacity="0.6"/>
<rect x="20" y="33" width="4" height="7" rx="1" fill="#f59e0b" opacity="0.7"/>
<rect x="26" y="33" width="5" height="4" rx="1" fill="#f59e0b" opacity="0.5"/>
</svg>
),
resellers: (
<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" rx="12" fill="#fdf2f8"/>
<rect x="10" y="14" width="18" height="14" rx="3" fill="#ec4899" opacity="0.7"/>
<rect x="20" y="20" width="18" height="14" rx="3" fill="#ec4899" opacity="0.4" stroke="#ec4899" strokeWidth="1.5"/>
<circle cx="29" cy="27" r="3" fill="#ec4899"/>
<path d="M27 27h4M29 25v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
</svg>
),
}

const UC_ICONS_ENTERPRISE = (
<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" rx="12" fill="#f0fdf4"/>
<path d="M24 10l2 6h7l-5.5 4 2 6L24 22l-5.5 4 2-6L15 16h7z" fill="#00c07a" opacity="0.3"/>
<rect x="10" y="28" width="28" height="12" rx="2" fill="#00c07a" opacity="0.15"/>
<rect x="10" y="28" width="28" height="3" rx="1" fill="#00c07a" opacity="0.5"/>
<rect x="14" y="33" width="5" height="7" rx="1" fill="#00c07a" opacity="0.6"/>
<rect x="22" y="33" width="5" height="5" rx="1" fill="#00c07a" opacity="0.4"/>
<rect x="30" y="33" width="5" height="7" rx="1" fill="#00c07a" opacity="0.6"/>
</svg>
)

const USE_CASES = [
{ icon: UC_ICONS.corporate, title: 'Corporate Offices', desc: 'Multi-floor room management with SSO, floor plans, and enterprise controls.', href: '/use-cases/corporate', accent: '#3b82f6' },
{ icon: UC_ICONS.coworking, title: 'Coworking Spaces', desc: 'Member self-booking, guest kiosk, and utilisation tracking to maximise revenue.', href: '/use-cases/coworking', accent: '#00c07a' },
{ icon: UC_ICONS.hotels, title: 'Hotels & Hospitality', desc: 'Conference booking, catering tags, and five-star guest check-in experience.', href: '/use-cases/hotels', accent: '#f59e0b' },
{ icon: UC_ICONS.resellers, title: 'SaaS Resellers', desc: 'White-label for your clients with custom domains and super admin control.', href: '/use-cases/resellers', accent: '#ec4899' },
{ icon: UC_ICONS_ENTERPRISE, title: 'Government & Enterprise', desc: 'On-premises deployment -- data stays inside your building. UAE PDPL compliant, Riser-managed.', href: '/on-premises', accent: '#00c07a' },
]

const TESTIMONIALS = [
{ quote: "SpacioHub completely eliminated the 'is this room free?' confusion in our office. Setup took less than a day -- everyone loves it.", name: 'Aarav Mehta', role: 'Head of Operations, Nexum Technologies', avatar: 'AM', color: '#00c07a' },
{ quote: "The door display panels are a game-changer. Our clients see a professional check-in experience from the moment they walk in.", name: 'Fatima Al Rashidi', role: 'Facilities Manager, Dubai Coworking Hub', avatar: 'FA', color: '#3b82f6' },
{ quote: "Analytics revealed we were overbooked on two floors and underusing three others. We reconfigured within a week. Incredible ROI.", name: 'James Okonkwo', role: 'CTO, Meridian Group', avatar: 'JO', color: '#8b5cf6' },
]

const STEPS = [
{ num: '01', icon: '🏗️', title: 'Add your spaces', desc: 'Upload your floor plan, add rooms, desks, and resources. Assign rules and capacities in minutes.' },
{ num: '02', icon: '✉️', title: 'Invite your team', desc: 'Send invite links or connect via Google / Microsoft SSO. Permissions auto-apply by role.' },
{ num: '03', icon: '✅', title: 'Book from anywhere', desc: 'Web, mobile, door panel, or AI chat -- confirm a room in seconds from any device.' },
{ num: '04', icon: '📈', title: 'Track & optimise', desc: 'Live analytics reveal peak hours, no-shows, and underused spaces to right-size your real estate.' },
]

// Integration hub data
const INTEGRATIONS = [
{ name: 'Google Calendar', action: 'Event synced', color: '#4285F4', bg: '#eff6ff', logo: <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="6" fill="#fff"/><rect x="6" y="8" width="20" height="18" rx="2" fill="#4285F4"/><rect x="6" y="8" width="20" height="6" rx="2" fill="#1a73e8"/><rect x="10" y="4" width="3" height="7" rx="1.5" fill="#1a73e8"/><rect x="19" y="4" width="3" height="7" rx="1.5" fill="#1a73e8"/><rect x="9" y="18" width="4" height="4" rx="1" fill="#fff"/><rect x="14" y="18" width="4" height="4" rx="1" fill="#fff"/></svg> },
{ name: 'Microsoft 365', action: 'Meeting created', color: '#0078D4', bg: '#eff6ff', logo: <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="6" fill="#fff"/><rect x="5" y="5" width="10" height="10" rx="1" fill="#F25022"/><rect x="17" y="5" width="10" height="10" rx="1" fill="#7FBA00"/><rect x="5" y="17" width="10" height="10" rx="1" fill="#00A4EF"/><rect x="17" y="17" width="10" height="10" rx="1" fill="#FFB900"/></svg> },
{ name: 'Zoom', action: 'Meeting link sent', color: '#2D8CFF', bg: '#eff6ff', logo: <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="6" fill="#2D8CFF"/><rect x="5" y="10" width="16" height="12" rx="2" fill="#fff"/><path d="M23 13l5-3v12l-5-3V13z" fill="#fff"/></svg> },
{ name: 'Google SSO', action: 'User signed in', color: '#34A853', bg: '#ecfdf5', logo: <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="6" fill="#fff"/><path fill="#4285F4" d="M28 16.3c0-.9-.1-1.7-.2-2.5H16v4.7h6.7c-.3 1.5-1.2 2.8-2.5 3.6v3h4c2.3-2.2 3.8-5.3 3.8-8.8z"/><path fill="#34A853" d="M16 28c3.2 0 5.9-1.1 7.9-2.9l-4-3.1c-1.1.7-2.4 1.2-3.9 1.2-3 0-5.6-2-6.5-4.8H3.4v3.2C5.4 25.3 10.4 28 16 28z"/><path fill="#FBBC05" d="M9.5 18.4c-.2-.7-.4-1.5-.4-2.4 0-.9.1-1.7.4-2.4V10.4H3.4C2.5 12.2 2 14.1 2 16s.5 3.8 1.4 5.6l6.1-3.2z"/><path fill="#EA4335" d="M16 9.2c1.7 0 3.2.6 4.4 1.7l3.3-3.3C21.8 5.7 19.1 4.5 16 4.5c-5.6 0-10.6 3.2-12.6 7.9l6.1 3.2c.9-2.8 3.5-4.8 6.5-4.8z"/></svg> },
{ name: 'Microsoft SSO', action: 'SSO login success', color: '#0078D4', bg: '#eff6ff', logo: <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="6" fill="#0078D4"/><rect x="7" y="7" width="8" height="8" rx="1" fill="#fff" opacity=".9"/><rect x="17" y="7" width="8" height="8" rx="1" fill="#fff" opacity=".9"/><rect x="7" y="17" width="8" height="8" rx="1" fill="#fff" opacity=".9"/><rect x="17" y="17" width="8" height="8" rx="1" fill="#fff" opacity=".9"/></svg> },
{ name: 'iCal Feed', action: 'Calendar subscribed', color: '#FF3B30', bg: '#fff1f2', logo: <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="6" fill="#FF3B30"/><rect x="5" y="10" width="22" height="16" rx="2" fill="#fff"/><rect x="5" y="10" width="22" height="6" rx="2" fill="#FF3B30"/><rect x="10" y="5" width="3" height="6" rx="1.5" fill="#CC2D26"/><rect x="19" y="5" width="3" height="6" rx="1.5" fill="#CC2D26"/><text x="16" y="23" textAnchor="middle" fontSize="7" fontWeight="800" fill="#FF3B30">iCal</text></svg> },
{ name: 'Door Display', action: 'Panel connected', color: '#00c07a', bg: '#ecfdf5', logo: <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="6" fill="#ecfdf5"/><rect x="8" y="5" width="16" height="22" rx="2" fill="#0f172a"/><rect x="10" y="7" width="12" height="16" rx="1" fill="#1e293b"/><circle cx="16" cy="25" r="1" fill="#475569"/><rect x="11" y="8" width="10" height="2" rx="1" fill="#00c07a"/><rect x="11" y="12" width="7" height="1.5" rx="0.75" fill="#334155"/><rect x="11" y="15" width="9" height="1.5" rx="0.75" fill="#334155"/></svg> },
{ name: 'Email Alerts', action: 'Notification sent', color: '#00c07a', bg: '#ecfdf5', logo: <svg viewBox="0 0 32 32" width="28" height="28"><rect width="32" height="32" rx="6" fill="#ecfdf5"/><rect x="5" y="9" width="22" height="15" rx="2" fill="#00c07a"/><path d="M5 11l11 8 11-8" stroke="#fff" strokeWidth="1.5" fill="none"/></svg> },
]

const CX = 370, CY = 270, W = 800, H = 560, CARD_W = 138, CARD_H = 70
const HUB_NODES = [
{ idx: 0, x: 320, y: 10 }, { idx: 1, x: 590, y: 55 }, { idx: 2, x: 650, y: 230 },
{ idx: 3, x: 560, y: 430 }, { idx: 4, x: 270, y: 480 }, { idx: 5, x: 20, y: 430 },
{ idx: 6, x: -20, y: 230 }, { idx: 7, x: 70, y: 55 },
]

function IntegrationHub() {
const [activeIdx, setActiveIdx] = useState(-1)
const [doneSet, setDoneSet] = useState(new Set())
const [visible, setVisible] = useState(false)
const ref = useRef(null)
const timer = useRef(null)

useEffect(() => {
const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
if (ref.current) obs.observe(ref.current)
return () => obs.disconnect()
}, [])

useEffect(() => {
if (!visible) return
let i = 0
const run = () => {
setActiveIdx(i)
timer.current = setTimeout(() => {
const ci = i
setDoneSet(prev => new Set([...prev, ci]))
i++
if (i < INTEGRATIONS.length) { timer.current = setTimeout(run, 400) }
else {
timer.current = setTimeout(() => {
setActiveIdx(-1); setDoneSet(new Set()); i = 0
timer.current = setTimeout(run, 800)
}, 3500)
}
}, 900)
}
timer.current = setTimeout(run, 600)
return () => clearTimeout(timer.current)
}, [visible])

return (
<div ref={ref} style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
<div style={{ position: 'relative', width: '100%', paddingBottom: `${(H/W)*100}%` }}>
<div style={{ position: 'absolute', inset: 0 }}>
<svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible' }}
viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
<defs>
{INTEGRATIONS.map((item, i) => (
<marker key={i} id={`arr-${i}`} markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
<path d="M0,0 L0,7 L7,3.5 z" fill={doneSet.has(i) ? item.color : activeIdx===i ? item.color : '#d1d5db'} />
</marker>
))}
</defs>
{HUB_NODES.map(({ idx, x, y }) => {
const item = INTEGRATIONS[idx]
const isDone = doneSet.has(idx), isActive = activeIdx === idx
const cx2 = x+CARD_W/2, cy2 = y+CARD_H/2
const dx = cx2-CX, dy = cy2-CY, dist = Math.sqrt(dx*dx+dy*dy)
const sx = CX+(dx/dist)*115, sy = CY+(dy/dist)*115
const ex = cx2-(dx/dist)*14, ey = cy2-(dy/dist)*14
return <line key={idx} x1={sx} y1={sy} x2={ex} y2={ey}
stroke={isDone ? item.color : isActive ? item.color : '#e2e8f0'}
strokeWidth={isDone ? 2 : isActive ? 1.5 : 1}
strokeDasharray={isDone ? 'none' : isActive ? '5 3' : '4 4'}
markerEnd={`url(#arr-${idx})`}
style={{ transition: 'stroke 0.4s, stroke-width 0.3s' }} />
})}
</svg>

```
      <div style={{ position:'absolute', left:`${(CX/W)*100}%`, top:`${(CY/H)*100}%`, transform:'translate(-50%,-50%)', zIndex:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,192,122,0.14) 0%, rgba(0,192,122,0.05) 50%, transparent 70%)', animation:'pulseRing 2.5s ease-in-out infinite' }}/>
        <img src={LOGO} alt="SpacioHub" style={{ width:200, height:200, objectFit:'contain', position:'relative', zIndex:2, filter:'drop-shadow(0 8px 32px rgba(0,192,122,0.5))' }}/>
      </div>

      {HUB_NODES.map(({ idx, x, y }) => {
        const item = INTEGRATIONS[idx]
        const isDone = doneSet.has(idx), isActive = activeIdx === idx
        return (
          <div key={idx} style={{ position:'absolute', left:`${(x/W)*100}%`, top:`${(y/H)*100}%`, width:CARD_W, height:CARD_H, background:isDone?item.bg:'#fff', border:`2px solid ${isDone?item.color:isActive?item.color+'99':'#e2e8f0'}`, borderRadius:14, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3, boxShadow:isDone?`0 6px 24px ${item.color}30`:isActive?`0 4px 16px ${item.color}20`:'0 2px 8px rgba(0,0,0,0.06)', transition:'all 0.4s cubic-bezier(.16,1,.3,1)', transform:isDone?'scale(1.05)':isActive?'scale(1.02)':'scale(1)', opacity:visible?1:0, zIndex:5 }}>
            {item.logo}
            <div style={{ fontSize:10, fontWeight:700, color:isDone?'#0f172a':'#94a3b8', textAlign:'center', lineHeight:1.2, padding:'0 6px' }}>{item.name}</div>
            {(isDone||isActive) && <div style={{ fontSize:8, fontWeight:700, color:item.color, background:`${item.color}15`, padding:'1px 7px', borderRadius:100, whiteSpace:'nowrap' }}>{isDone?`✓ ${item.action}`:'⟳ Connecting...'}</div>}
          </div>
        )
      })}
    </div>
  </div>
  <div style={{ textAlign:'center', marginTop:12, fontSize:13, color:'#64748b', fontWeight:500 }}>
    {doneSet.size === INTEGRATIONS.length ? <span style={{ color:'#00c07a', fontWeight:700 }}>✓ All {INTEGRATIONS.length} integrations connected</span>
      : doneSet.size > 0 ? <span>{doneSet.size} of {INTEGRATIONS.length} connected...</span>
      : <span style={{ opacity:0.5 }}>Initialising connections...</span>}
  </div>
  <style>{`@keyframes pulseRing{0%,100%{box-shadow:0 0 0 10px rgba(0,192,122,0.10),0 8px 32px rgba(0,192,122,0.35);}50%{box-shadow:0 0 0 16px rgba(0,192,122,0.06),0 8px 40px rgba(0,192,122,0.45);}}`}</style>
</div>
```

)
}

function useCountUp(target, duration = 1200, start = false) {
const [val, setVal] = useState(0)
useEffect(() => {
if (!start || target === '∞' || target === '$0' || isNaN(parseInt(target))) { setVal(target); return }
const n = parseInt(target)
const step = Math.ceil(n / (duration / 16))
let cur = 0
const t = setInterval(() => {
cur = Math.min(cur + step, n)
setVal(cur)
if (cur >= n) clearInterval(t)
}, 16)
return () => clearInterval(t)
}, [start, target])
return val
}

function StatPill({ n, label, col, bg, border, started }) {
const val = useCountUp(n, 1000, started)
return (
<div style={{ display:'flex', flexDirection:'column', alignItems:'center', background:bg, border:`1.5px solid ${border}`, borderRadius:16, padding:'18px 28px', minWidth:120, transition:'transform 0.3s', cursor:'default' }}
onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px) scale(1.04)'}
onMouseLeave={e => e.currentTarget.style.transform='translateY(0) scale(1)'}>
<div style={{ fontSize:32, fontWeight:900, letterSpacing:-1.5, background:`linear-gradient(135deg,${col},${col}99)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1 }}>
{n === '∞' ? '∞' : n === '$0' ? '$0' : n.includes('min') ? `${val} min` : val}
</div>
<div style={{ fontSize:11, color:'#64748b', marginTop:5, fontWeight:600, textAlign:'center' }}>{label}</div>
</div>
)
}

export default function Home() {
const { openModal } = useModal()
const heroRef = useRef(null)
const [statsStarted, setStatsStarted] = useState(false)
const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)

useEffect(() => {
const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsStarted(true) }, { threshold: 0.3 })
if (heroRef.current) obs.observe(heroRef.current)
return () => obs.disconnect()
}, [])

useEffect(() => {
const onResize = () => setIsMobile(window.innerWidth <= 900)
window.addEventListener('resize', onResize)
return () => window.removeEventListener('resize', onResize)
}, [])

return (
<>
<SEO {...PAGE_SEO.home} />
<main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

```
  {/* HERO */}
  <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #1e293b', padding: '120px 0 96px', textAlign: 'center', background: '#060d1a' }}>

    {/* Animated mesh gradient bg */}
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(0,192,122,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(15,121,155,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 50% 80%, rgba(59,130,246,0.08) 0%, transparent 60%)', animation:'meshMove 12s ease-in-out infinite', pointerEvents:'none' }} />
    {/* Animated orbs */}
    <div style={{ position:'absolute', top:'10%', left:'15%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,192,122,0.08),transparent 70%)', animation:'orbFloat1 8s ease-in-out infinite', pointerEvents:'none' }} />
    <div style={{ position:'absolute', bottom:'10%', right:'10%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(15,121,155,0.1),transparent 70%)', animation:'orbFloat2 10s ease-in-out infinite 2s', pointerEvents:'none' }} />
    <div style={{ position:'absolute', top:'40%', right:'25%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.07),transparent 70%)', animation:'orbFloat1 14s ease-in-out infinite 4s', pointerEvents:'none' }} />
    {/* Grid lines */}
    <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />
    {/* Bottom fade */}
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:200, background:'linear-gradient(0deg,#060d1a,transparent)', pointerEvents:'none' }} />

    {/* Floating card -- top left */}
    {!isMobile && <div className='hero-float-card' style={{ position:'absolute', left:'6%', top:'18%', animation:'heroFloat1 5s ease-in-out infinite', animationDelay:'0.6s', zIndex:2 }}>
      <div style={{ background:'#fff', border:'1px solid #a7f3d0', borderRadius:14, padding:'10px 14px', boxShadow:'0 8px 28px rgba(0,192,122,0.15)', display:'flex', alignItems:'center', gap:10, whiteSpace:'nowrap', animation:'heroBounceIn 0.5s cubic-bezier(.16,1,.3,1) 0.4s both' }}>
        <div style={{ width:30, height:30, borderRadius:8, background:'#ecfdf5', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" fill="#00c07a" opacity="0.15"/><rect x="3" y="4" width="14" height="4" rx="2" fill="#00c07a"/><rect x="5" y="11" width="3" height="3" rx="0.5" fill="#00c07a" opacity="0.6"/><rect x="9" y="11" width="3" height="3" rx="0.5" fill="#00c07a" opacity="0.6"/></svg>
        </div>
        <div style={{ textAlign:'left' }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#0f172a' }}>Board Room booked</div>
          <div style={{ fontSize:10, color:'#94a3b8' }}>2:00 - 3:00 PM · Sarah J.</div>
        </div>
        <div style={{ width:7, height:7, borderRadius:'50%', background:'#00c07a', animation:'pulse 2s infinite', flexShrink:0 }} />
      </div>
    </div>}

    {/* Floating card -- top right */}
    {!isMobile && <div className='hero-float-card' style={{ position:'absolute', right:'6%', top:'14%', animation:'heroFloat2 6s ease-in-out infinite', animationDelay:'1s', zIndex:2 }}>
      <div style={{ background:'#fff', border:'1px solid #bfdbfe', borderRadius:14, padding:'10px 14px', boxShadow:'0 8px 28px rgba(59,130,246,0.12)', display:'flex', alignItems:'center', gap:10, whiteSpace:'nowrap', animation:'heroBounceIn 0.5s cubic-bezier(.16,1,.3,1) 0.7s both' }}>
        <div style={{ width:30, height:30, borderRadius:8, background:'#eff6ff', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none"><circle cx="8" cy="8" r="4" fill="#3b82f6" opacity="0.6"/><path d="M3 16c0-3 2.2-5 5-5h4c2.8 0 5 2 5 5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
        </div>
        <div style={{ textAlign:'left' }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#0f172a' }}>James Wilson arrived</div>
          <div style={{ fontSize:10, color:'#94a3b8' }}>Visitor · Host: Emily K.</div>
        </div>
        <div style={{ background:'#eff6ff', color:'#3b82f6', fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:100 }}>Checked in</div>
      </div>
    </div>}

    {/* Floating card -- bottom left */}
    {!isMobile && <div className='hero-float-card' style={{ position:'absolute', left:'8%', bottom:'22%', animation:'heroFloat3 7s ease-in-out infinite', animationDelay:'1.4s', zIndex:2 }}>
      <div style={{ background:'#fff', border:'1px solid #ddd6fe', borderRadius:14, padding:'10px 14px', boxShadow:'0 8px 28px rgba(139,92,246,0.12)', display:'flex', alignItems:'center', gap:10, whiteSpace:'nowrap', animation:'heroBounceIn 0.5s cubic-bezier(.16,1,.3,1) 1.0s both' }}>
        <div style={{ width:30, height:30, borderRadius:8, background:'#f5f3ff', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none"><rect x="3" y="12" width="3" height="5" rx="1" fill="#8b5cf6" opacity="0.4"/><rect x="8" y="8" width="3" height="9" rx="1" fill="#8b5cf6" opacity="0.65"/><rect x="13" y="5" width="3" height="12" rx="1" fill="#8b5cf6"/></svg>
        </div>
        <div style={{ textAlign:'left' }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#0f172a' }}>94% utilisation</div>
          <div style={{ fontSize:10, color:'#94a3b8' }}>This week · +12% vs last</div>
        </div>
      </div>
    </div>}

    {/* Floating card -- bottom right */}
    {!isMobile && <div className='hero-float-card' style={{ position:'absolute', right:'7%', bottom:'25%', animation:'heroFloat1 5.5s ease-in-out infinite 1s', zIndex:2 }}>
      <div style={{ background:'#fff', border:'1px solid #fde68a', borderRadius:14, padding:'10px 14px', boxShadow:'0 8px 28px rgba(245,158,11,0.12)', display:'flex', alignItems:'center', gap:10, whiteSpace:'nowrap', animation:'heroBounceIn 0.5s cubic-bezier(.16,1,.3,1) 1.2s both' }}>
        <div style={{ width:30, height:30, borderRadius:8, background:'#fefce8', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none"><rect x="7" y="8" width="6" height="9" rx="1" fill="#f59e0b" opacity="0.2"/><rect x="7" y="8" width="6" height="9" rx="1" stroke="#f59e0b" strokeWidth="1.2"/><circle cx="10" cy="12" r="1.5" fill="#f59e0b"/><rect x="9" y="4" width="2" height="4" rx="1" fill="#f59e0b"/></svg>
        </div>
        <div style={{ textAlign:'left' }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#0f172a' }}>AI booked Focus Room</div>
          <div style={{ fontSize:10, color:'#94a3b8' }}>"Quiet space for 2hrs"</div>
        </div>
      </div>
    </div>}

    <div className="container" style={{ position:'relative', zIndex:3 }}>
      <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="animate-fade-up" style={{ marginBottom:28, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,192,122,0.12)', border:'1px solid rgba(0,192,122,0.3)', color:'#4ade80', padding:'5px 14px', borderRadius:100, fontSize:12, fontWeight:600, backdropFilter:'blur(8px)' }}>
        <div style={{ width:7, height:7, borderRadius:'50%', background:'#00c07a', animation:'pulse 2s infinite' }} />
        Now live at go.spaciohub.com →
      </a>
      <h1 className="animate-fade-up delay-1" style={{ fontSize:'clamp(42px,6vw,80px)', fontWeight:900, letterSpacing:'-3px', lineHeight:1.0, color:'#fff', marginBottom:24, textAlign:'center' }}>
        One platform.<br />
        <span style={{ background:'linear-gradient(135deg,#00c07a 0%,#0cb8b6 50%,#3b82f6 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Every corner of your workplace.</span>
      </h1>
      {/* Animated rotating descriptor */}
      <div className="animate-fade-up delay-2" style={{ height:32, overflow:'hidden', marginBottom:28 }}>
        <div style={{ animation:'rotateWords 9s infinite', display:'flex', flexDirection:'column', gap:8 }}>
          {['Book rooms in seconds. Run every screen in your building.','Visitors check in -- hosts get notified instantly.','One platform. Signage, booking, visitors and more.'].map(t=>(
            <div key={t} style={{ height:32, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:16, color:'rgba(255,255,255,0.6)', fontWeight:500, letterSpacing:'-0.2px' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="animate-fade-up delay-3" style={{ maxWidth:560, margin:'0 auto 44px', fontSize:17, color:'rgba(255,255,255,0.55)', lineHeight:1.7, fontWeight:400 }}>
        SpacioHub brings room booking, visitor management, digital signage, door displays, and AI scheduling into a single platform -- with the option to run it entirely on your own infrastructure.
      </p>
      <div className="animate-fade-up delay-4 hero-cta-row" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:56, textAlign:'center' }}>
        <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 0 40px rgba(0,192,122,0.35)' }}>Request a Demo →</button>
        <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', borderRadius:8, fontSize:15, fontWeight:600, border:'1.5px solid rgba(255,255,255,0.2)', color:'#fff', textDecoration:'none', background:'rgba(255,255,255,0.06)', backdropFilter:'blur(8px)', transition:'all 0.2s' }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.35)' }}
          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)' }}>
          Try free for 14 days
        </a>
      </div>
    </div>
  </section>
  <style>{`
    @keyframes heroFloat1    { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-12px)} }
    @keyframes meshMove    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.05)} }
    @keyframes orbFloat1   { 0%,100%{transform:translate(0,0)} 33%{transform:translate(30px,-20px)} 66%{transform:translate(-20px,15px)} }
    @keyframes orbFloat2   { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-25px,20px)} 66%{transform:translate(20px,-15px)} }
    @keyframes rotateWords   { 0%{transform:translateY(0)} 30%{transform:translateY(0)} 33%{transform:translateY(-40px)} 63%{transform:translateY(-40px)} 66%{transform:translateY(-80px)} 96%{transform:translateY(-80px)} 100%{transform:translateY(0)} }
    @keyframes heroFloat2    { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-16px)} }
    @keyframes heroFloat3    { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
    @keyframes heroBounceIn  { from{opacity:0;transform:scale(0.7) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
  `}</style>

  {/* STATS STRIP */}
  <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '56px 0', borderBottom: '1px solid #334155' }}>
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ textAlign: 'center' }}>
        {[
          { num: '500+',   label: 'Rooms managed',     sub: 'across all workspaces',  color: '#00c07a' },
          { num: '50K+',   label: 'Bookings made',     sub: 'and counting every day', color: '#3b82f6' },
          { num: '99.9%',  label: 'Uptime SLA',        sub: 'guaranteed on all plans', color: '#8b5cf6' },
          { num: '5 min',  label: 'Average setup',     sub: 'from signup to live',     color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="reveal">
            <div style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:900, color:s.color, letterSpacing:'-2px', lineHeight:1, marginBottom:8 }}>{s.num}</div>
            <div style={{ fontSize:14, fontWeight:700, color:'#fff', marginBottom:3 }}>{s.label}</div>
            <div style={{ fontSize:11, color:'#64748b' }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* PLATFORM PILLARS -- 5 modules overview */}
  <section style={{ padding: '72px 0', borderBottom: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ textAlign:'center', marginBottom:40 }}>
        <span className="tag reveal">The platform</span>
        <h2 className="h2 reveal">Five modules. <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>One login.</span></h2>
        <p className="body reveal" style={{ maxWidth:440, margin:'12px auto 0', color:'#64748b' }}>Every tool your workplace needs -- built to work together from day one.</p>
      </div>
      <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12 }}>
        {[
          { bg:'#ecfdf5', border:'#a7f3d0', col:'#00c07a', title:'Room Booking', desc:'Visual grid, AI suggestions, Zoom links, approvals', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00c07a" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
          { bg:'#fffbeb', border:'#fde68a', col:'#d97706', title:'Digital Signage', desc:'Playlists, schedules, emergency alerts on any screen', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
          { bg:'#fff7ed', border:'#fed7aa', col:'#ea580c', title:'Visitor Management', desc:'Pre-register, kiosk check-in, badges, host alerts', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
          { bg:'#eff6ff', border:'#bfdbfe', col:'#2563eb', title:'Door Displays', desc:'Live room status on any tablet, no app needed', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"><rect x="9" y="2" width="6" height="20" rx="2"/><rect x="1" y="8" width="8" height="14" rx="2"/><rect x="15" y="5" width="8" height="17" rx="2"/></svg> },
          { bg:'#fefce8', border:'#fde68a', col:'#ca8a04', title:'Mira AI Booker', desc:'Describe your meeting -- Mira finds and books it', icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
        ].map((p, i) => (
          <div key={p.title} className="reveal" style={{ background:'#fff', border:`1px solid ${p.border}`, borderRadius:14, padding:'20px 16px', textAlign:'center', transition:'transform .2s,box-shadow .2s', animationDelay:`${i*0.08}s`, cursor:'default' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 16px 40px ${p.border}80`}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
            <div style={{ width:48,height:48,borderRadius:14,background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px' }}>{p.icon}</div>
            <div style={{ fontSize:13,fontWeight:700,color:'#0f172a',marginBottom:4 }}>{p.title}</div>
            <div style={{ fontSize:11,color:'#64748b',lineHeight:1.5 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* SCREEN MOCKUP -- exact from live site */}
  <section style={{ padding: '64px 0', borderBottom: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ position:'relative' }}>
        <div className="float-badge animate-fade-up delay-5" style={{ position:'absolute', top:-18, right:20, zIndex:20, animation:'float 4s ease-in-out infinite', boxShadow:'0 8px 24px rgba(0,192,122,0.2)' }}>
          <span style={{ width:20,height:20,borderRadius:'50%',background:'#00c07a',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#fff',fontWeight:800 }}>✓</span>
          Board Room booked!
        </div>
        <div className="float-badge animate-fade-up delay-6" style={{ position:'absolute', bottom:40, left:-10, zIndex:20, animation:'float 5s ease-in-out infinite 1.5s', fontSize:11 }}>
          <span style={{ width:8,height:8,borderRadius:'50%',background:'#00c07a',display:'inline-block',animation:'pulse 2s infinite' }}/> Live · 94% utilised
        </div>
      <div className="reveal" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.07)' }}>
        <div style={{ background: '#fff', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid #f1f5f9' }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
          <div style={{ flex: 1, textAlign: 'center' }}><div style={{ display: 'inline-block', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 5, padding: '3px 20px', fontSize: 11, fontFamily: 'DM Mono,monospace', color: '#94a3b8' }}>go.spaciohub.com/Dashboard</div></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 360 }}>
          <div style={{ background: '#fff', borderRight: '1px solid #f1f5f9', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px', borderRadius: 8, background: '#f8fafc', marginBottom: 16 }}>
              <img src={LOGO} alt="S" style={{ width: 26, height: 26, objectFit: 'contain' }} />
              <div><div style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>SpacioHub</div><div style={{ fontSize: 10, color: '#94a3b8' }}>Acme Corp</div></div>
            </div>
            {[['📊','Dashboard',true],['📅','Book a Room'],['🚪','Rooms'],['📋','My Bookings'],['🖥️','Door Display'],['👥','Visitors'],['📈','Analytics'],['💡','AI Booker']].map(([ic, label, active]) => (
              <div key={label} style={{ padding: '7px 10px', borderRadius: 6, fontSize: 12, color: active ? '#00c07a' : '#94a3b8', background: active ? '#f0fdf8' : 'transparent', fontWeight: active ? 600 : 400, marginBottom: 1, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span>{ic}</span>{label}
              </div>
            ))}
          </div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, background: '#f8fafc' }}>
            <div className="grid grid-cols-2 md:grid-cols-4" style={{gap: 10}}>
              {[['12','Active Rooms',true],['38',"Today's Bookings"],['4','In Use Now'],['94%','Utilization']].map(([n, l, hi]) => (
                <div key={l} style={{ background: hi ? '#f0fdf8' : '#fff', border: `1px solid ${hi ? '#d1fae5' : '#f1f5f9'}`, borderRadius: 10, padding: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: hi ? '#00c07a' : '#0f172a' }}>{n}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 10, padding: 16, flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(9,1fr)', gap: 3, marginBottom: 6 }}>
                <div />{['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM'].map(h => <div key={h} style={{ fontSize: 9, color: '#cbd5e1', fontFamily: 'DM Mono,monospace', textAlign: 'center' }}>{h}</div>)}
              </div>
              {[{n:'Focus Room',c:'#3b82f6',s:[0,0,1,1,0,0,1,0,0]},{n:'Team Room',c:'#10b981',s:[1,1,0,0,1,0,0,1,0]},{n:'Conference',c:'#f59e0b',s:[0,1,1,0,0,1,1,0,1]},{n:'Board Room',c:'#8b5cf6',s:[0,0,0,1,1,0,0,0,0]}].map(r => (
                <div key={r.n} style={{ display: 'grid', gridTemplateColumns: '90px repeat(9,1fr)', gap: 3, marginBottom: 4, alignItems: 'center' }}>
                  <div style={{ fontSize: 10, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 5, overflow: 'hidden' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.c, flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.n}</span>
                  </div>
                  {r.s.map((bk, i) => <div key={i} style={{ height: 24, borderRadius: 3, background: bk ? r.c+'22' : '#f8fafc', borderLeft: bk ? `2px solid ${r.c}` : 'none' }} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>

  {/* FEATURES -- bento grid */}
  <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ marginBottom: 48 }}>
        <span className="tag reveal">Features</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <h2 className="h2 reveal">Everything your <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>workplace needs</span>,<br />room booking to digital signage</h2>
          <p className="body reveal" style={{ maxWidth: 360 }}>Built for modern teams. Every feature designed to reduce admin work and improve how your space gets used.</p>
        </div>
      </div>
      <div className="bento-grid grid grid-cols-12 gap-4">

        {/* Card 1 -- Large green: Smart Room Booking */}
        <Link to="/platform/booking" className="reveal col-span-12 md:col-span-5" style={{  textDecoration:'none', borderRadius:20, background:'linear-gradient(135deg,#f0fdf8,#dcfce7)', border:'1px solid #a7f3d0', padding:'36px 32px', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', transition:'transform 0.25s,box-shadow 0.25s', minHeight:260 }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(0,192,122,0.15)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{ position:'absolute',top:-30,right:-30,width:160,height:160,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,192,122,0.15),transparent 70%)' }}/>
          <div style={{ fontSize:36,marginBottom:20 }}>📅</div>
          <span style={{ fontSize:10,fontWeight:700,color:'#009960',letterSpacing:'1px',textTransform:'uppercase',marginBottom:10,background:'rgba(0,192,122,0.15)',padding:'3px 10px',borderRadius:100,display:'inline-block',width:'fit-content' }}>CORE</span>
          <h3 style={{ fontSize:20,fontWeight:800,color:'#0f172a',marginBottom:12,letterSpacing:-0.5 }}>Smart Room Booking</h3>
          <p style={{ fontSize:14,color:'#374151',lineHeight:1.7,flex:1 }}>Visual time grid, 15-min buffer, AI suggestions, booking tags, and Zoom auto-links on every booking.</p>
          <div style={{ marginTop:20,fontSize:13,fontWeight:700,color:'#009960' }}>Explore feature →</div>
        </Link>

        {/* Card 2 -- Blue: Door Display */}
        <Link to="/platform/booking#door-display" className="reveal col-span-12 md:col-span-4" style={{  textDecoration:'none', borderRadius:20, background:'linear-gradient(135deg,#eff6ff,#dbeafe)', border:'1px solid #bfdbfe', padding:'36px 32px', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', transition:'transform 0.25s,box-shadow 0.25s', minHeight:260 }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(59,130,246,0.15)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{ position:'absolute',top:-20,right:-20,width:130,height:130,borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.12),transparent 70%)' }}/>
          <div style={{ fontSize:36,marginBottom:20 }}>🖥️</div>
          <span style={{ fontSize:10,fontWeight:700,color:'#2563eb',letterSpacing:'1px',textTransform:'uppercase',marginBottom:10,background:'rgba(59,130,246,0.12)',padding:'3px 10px',borderRadius:100,display:'inline-block',width:'fit-content' }}>HARDWARE</span>
          <h3 style={{ fontSize:20,fontWeight:800,color:'#0f172a',marginBottom:12,letterSpacing:-0.5 }}>Door Display Panel</h3>
          <p style={{ fontSize:14,color:'#374151',lineHeight:1.7,flex:1 }}>Real-time status on any tablet. Quick book, check-in, and guest booking -- no login required.</p>
          <div style={{ marginTop:20,fontSize:13,fontWeight:700,color:'#2563eb' }}>Explore feature →</div>
        </Link>

        {/* Card 3 -- Dark: AI */}
        <Link to="/platform/booking" className="reveal col-span-12 md:col-span-3" style={{  textDecoration:'none', borderRadius:20, background:'linear-gradient(160deg,#0f172a,#1e293b)', border:'1px solid #334155', padding:'32px 28px', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', transition:'transform 0.25s,box-shadow 0.25s', minHeight:260 }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.25)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{ position:'absolute',top:-40,right:-40,width:180,height:180,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,192,122,0.15),transparent 70%)' }}/>
          <div style={{ fontSize:36,marginBottom:20 }}>✨</div>
          <span style={{ fontSize:10,fontWeight:700,color:'#00c07a',letterSpacing:'1px',textTransform:'uppercase',marginBottom:10,background:'rgba(0,192,122,0.15)',padding:'3px 10px',borderRadius:100,display:'inline-block',width:'fit-content' }}>AI</span>
          <h3 style={{ fontSize:18,fontWeight:800,color:'#fff',marginBottom:10,letterSpacing:-0.5 }}>AI Room Booker</h3>
          <p style={{ fontSize:13,color:'#94a3b8',lineHeight:1.7,flex:1 }}>Describe what you need in plain language -- AI finds and books the perfect room instantly.</p>
          <div style={{ marginTop:20,fontSize:13,fontWeight:700,color:'#00c07a' }}>Try it →</div>
        </Link>

        {/* Card 4 -- Purple: Analytics */}
        <Link to="/platform/booking#analytics" className="reveal col-span-12 md:col-span-4" style={{  textDecoration:'none', borderRadius:20, background:'linear-gradient(135deg,#f5f3ff,#ede9fe)', border:'1px solid #ddd6fe', padding:'32px 28px', display:'flex', flexDirection:'column', overflow:'hidden', transition:'transform 0.25s,box-shadow 0.25s', minHeight:220 }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(139,92,246,0.15)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{ display:'flex',alignItems:'flex-end',gap:5,marginBottom:20,height:40 }}>
            {[60,80,45,90,65,100,72].map((h,i)=><div key={i} style={{ flex:1,height:`${h}%`,borderRadius:4,background:i===5?'#8b5cf6':'rgba(139,92,246,0.25)' }}/>)}
          </div>
          <span style={{ fontSize:10,fontWeight:700,color:'#7c3aed',letterSpacing:'1px',textTransform:'uppercase',marginBottom:10,background:'rgba(139,92,246,0.12)',padding:'3px 10px',borderRadius:100,display:'inline-block',width:'fit-content' }}>INSIGHTS</span>
          <h3 style={{ fontSize:18,fontWeight:800,color:'#0f172a',marginBottom:8,letterSpacing:-0.5 }}>Analytics & Reports</h3>
          <p style={{ fontSize:13,color:'#374151',lineHeight:1.65,flex:1 }}>Peak hours, utilisation, no-show tracking, and full CSV export.</p>
        </Link>

        {/* Card 5 -- Orange: Visitor Management */}
        <Link to="/platform/visitors" className="reveal col-span-12 md:col-span-4" style={{  textDecoration:'none', borderRadius:20, background:'linear-gradient(135deg,#fff7ed,#ffedd5)', border:'1px solid #fed7aa', padding:'32px 28px', display:'flex', flexDirection:'column', overflow:'hidden', transition:'transform 0.25s,box-shadow 0.25s', minHeight:220 }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(249,115,22,0.12)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{ display:'flex',gap:6,marginBottom:20 }}>
            {['Sarah K.','John D.','Maria L.'].map((n,i)=>(
              <div key={n} style={{ flex:1,background:'#fff',borderRadius:8,padding:'6px 8px',border:'1px solid #fed7aa' }}>
                <div style={{ width:20,height:20,borderRadius:'50%',background:['#f97316','#22c55e','#3b82f6'][i],display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,color:'#fff',fontWeight:800,margin:'0 auto 4px' }}>{n[0]}</div>
                <div style={{ fontSize:7,color:'#64748b',textAlign:'center',fontWeight:600 }}>{n}</div>
                <div style={{ fontSize:7,color:['#f97316','#22c55e','#3b82f6'][i],textAlign:'center',marginTop:2 }}>{['Expected','In ✓','Expected'][i]}</div>
              </div>
            ))}
          </div>
          <span style={{ fontSize:10,fontWeight:700,color:'#ea580c',letterSpacing:'1px',textTransform:'uppercase',marginBottom:10,background:'rgba(249,115,22,0.12)',padding:'3px 10px',borderRadius:100,display:'inline-block',width:'fit-content' }}>ENTERPRISE</span>
          <h3 style={{ fontSize:18,fontWeight:800,color:'#0f172a',marginBottom:8,letterSpacing:-0.5 }}>Visitor Management</h3>
          <p style={{ fontSize:13,color:'#374151',lineHeight:1.65,flex:1 }}>Pre-register guests, self-service kiosk, custom badges, and instant host notifications.</p>
        </Link>

        {/* Card 6 -- Pink: Calendar */}
        <Link to="/platform/booking#integrations" className="reveal col-span-12 md:col-span-4" style={{  textDecoration:'none', borderRadius:20, background:'linear-gradient(135deg,#fdf2f8,#fce7f3)', border:'1px solid #fbcfe8', padding:'32px 28px', display:'flex', flexDirection:'column', overflow:'hidden', transition:'transform 0.25s,box-shadow 0.25s', minHeight:220 }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(236,72,153,0.12)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:20 }}>
            <div style={{ width:32,height:32,borderRadius:8,background:'#fff',border:'1px solid #fbcfe8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>📅</div>
            <div style={{ display:'flex',gap:3 }}>{[0,1,2].map(i=><div key={i} style={{ width:5,height:5,borderRadius:'50%',background:'#ec4899',opacity:0.3+i*0.3,animation:`pulse ${1+i*0.3}s infinite` }}/>)}</div>
            <div style={{ width:32,height:32,borderRadius:8,background:'#fff',border:'1px solid #fbcfe8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>📆</div>
          </div>
          <span style={{ fontSize:10,fontWeight:700,color:'#be185d',letterSpacing:'1px',textTransform:'uppercase',marginBottom:10,background:'rgba(236,72,153,0.1)',padding:'3px 10px',borderRadius:100,display:'inline-block',width:'fit-content' }}>INTEGRATION</span>
          <h3 style={{ fontSize:18,fontWeight:800,color:'#0f172a',marginBottom:8,letterSpacing:-0.5 }}>Calendar & iCal</h3>
          <p style={{ fontSize:13,color:'#374151',lineHeight:1.65,flex:1 }}>Subscribe to any room's live calendar in Google or Outlook. Always in sync, automatically.</p>
        </Link>

        {/* Card 7 -- Amber: Digital Signage (NEW) */}
        <Link to="/platform/signage" className="reveal col-span-12 md:col-span-6" style={{ textDecoration:'none', borderRadius:20, background:'linear-gradient(135deg,#fffbeb,#fef3c7)', border:'1px solid #fde68a', padding:'32px 28px', display:'flex', flexDirection:'column', overflow:'hidden', transition:'transform 0.25s,box-shadow 0.25s', minHeight:220 }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(245,158,11,0.15)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{ display:'flex',gap:8,marginBottom:20 }}>
            {['Lobby Display','Meeting Room TV','Reception Screen'].map((s,i)=>(
              <div key={s} style={{ flex:1,background:'#fff',borderRadius:8,padding:'8px 6px',border:'1px solid #fde68a',textAlign:'center' }}>
                <div style={{ width:24,height:16,background:'#0f172a',borderRadius:3,margin:'0 auto 4px',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <div style={{ width:18,height:10,background:['#00c07a','#3b82f6','#f59e0b'][i],borderRadius:2,opacity:.8 }}/>
                </div>
                <div style={{ fontSize:7,color:'#64748b',fontWeight:600,lineHeight:1.3 }}>{s}</div>
                <div style={{ fontSize:6,color:'#d97706',marginTop:2,fontWeight:700 }}>● Live</div>
              </div>
            ))}
          </div>
          <span style={{ fontSize:10,fontWeight:700,color:'#b45309',letterSpacing:'1px',textTransform:'uppercase',marginBottom:10,background:'rgba(245,158,11,0.15)',padding:'3px 10px',borderRadius:100,display:'inline-block',width:'fit-content' }}>DIGITAL SIGNAGE</span>
          <h3 style={{ fontSize:18,fontWeight:800,color:'#0f172a',marginBottom:8,letterSpacing:-0.5 }}>Every screen. One dashboard.</h3>
          <p style={{ fontSize:13,color:'#374151',lineHeight:1.65,flex:1 }}>Create playlists, set schedules, push emergency alerts, and manage every display in your building -- from a single admin panel. Works on any TV or tablet, no hardware lock-in.</p>
          <div style={{ marginTop:16,fontSize:13,fontWeight:700,color:'#b45309' }}>Explore signage →</div>
        </Link>

        {/* Card 8 -- On-Premises full-width dark strip (NEW) */}
        <Link to="/on-premises" className="reveal col-span-12 md:col-span-6" style={{ textDecoration:'none', borderRadius:20, background:'linear-gradient(135deg,#0f172a,#1e293b)', border:'1px solid #334155', padding:'28px 32px', display:'flex', alignItems:'center', gap:28, overflow:'hidden', transition:'transform 0.25s,box-shadow 0.25s', minHeight:220 }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.3)'}}
          onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
          <div style={{ position:'absolute',top:-40,right:-40,width:200,height:200,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,192,122,0.12),transparent 70%)' }}/>
          <div style={{ width:52,height:52,borderRadius:14,background:'rgba(0,192,122,0.15)',border:'1px solid rgba(0,192,122,0.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00c07a" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div style={{ flex:1, position:'relative', zIndex:1 }}>
            <span style={{ fontSize:10,fontWeight:700,color:'#00c07a',letterSpacing:'1px',textTransform:'uppercase',marginBottom:8,background:'rgba(0,192,122,0.15)',padding:'3px 10px',borderRadius:100,display:'inline-block' }}>ON-PREMISES EDITION</span>
            <h3 style={{ fontSize:18,fontWeight:800,color:'#fff',marginBottom:8,letterSpacing:-0.5 }}>Run SpacioHub on your own infrastructure</h3>
            <p style={{ fontSize:13,color:'#94a3b8',lineHeight:1.65,marginBottom:12 }}>For government, hospitals, banks, and enterprise campuses. Data never leaves your building. Riser Technologies deploys and manages it -- your IT team does nothing.</p>
            <div style={{ display:'flex',gap:16,flexWrap:'wrap' }}>
              {['Zero software licence cost','Data stays in your building','Live in 48 hours'].map(f=>(
                <span key={f} style={{ display:'flex',alignItems:'center',gap:5,fontSize:11,color:'#4ade80',fontWeight:500 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>{f}
                </span>
              ))}
            </div>
          </div>
          <div style={{ fontSize:13,fontWeight:700,color:'#00c07a',whiteSpace:'nowrap',flexShrink:0,position:'relative',zIndex:1 }}>Learn more →</div>
        </Link>

      </div>
    </div>
  </section>

  {/* HOW IT WORKS */}
  <section style={{ padding: '96px 0', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <span className="tag reveal">How it works</span>
        <h2 className="h2 reveal">Up and running in <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>5 minutes</span></h2>
        <p className="lead reveal" style={{ maxWidth: 440, margin: '12px auto 0' }}>No IT department needed. No complex setup. Just add your rooms and go.</p>
      </div>
      <div style={{ position: 'relative' }}>
        {/* Connecting line -- desktop only */}
        <div className="hidden md:block" style={{ position:'absolute', top:36, left:'12.5%', right:'12.5%', height:2, background:'linear-gradient(90deg,#00c07a,#0F799B,#3b82f6,#8b5cf6)', borderRadius:2, opacity:0.25 }} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { num:'01', icon:'🏗️', color:'#00c07a', bg:'#ecfdf5', border:'#a7f3d0', title:'Add your spaces', desc:'Upload your floor plan, name your rooms, set capacities and rules. Takes about 2 minutes.' },
            { num:'02', icon:'✉️', color:'#0F799B', bg:'#eff6ff', border:'#bfdbfe', title:'Invite your team', desc:'Send invite links or connect via Google or Microsoft SSO. Permissions auto-apply by role.' },
            { num:'03', icon:'✅', color:'#8b5cf6', bg:'#f5f3ff', border:'#ddd6fe', title:'Book from anywhere', desc:'Web, mobile, door panel, or AI chat -- confirm a room in seconds from any device.' },
            { num:'04', icon:'📈', color:'#f59e0b', bg:'#fefce8', border:'#fde68a', title:'Track and optimise', desc:'Live analytics reveal peak hours, no-shows, and underused spaces to right-size your real estate.' },
          ].map((step, i) => (
            <div key={step.num} className="reveal" style={{ textAlign:'center', animationDelay:`${i*0.1}s` }}>
              <div style={{ position:'relative', display:'inline-flex', marginBottom:20 }}>
                <div style={{ width:72, height:72, borderRadius:20, background:step.bg, border:`2px solid ${step.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30 }}>
                  {step.icon}
                </div>
                <div style={{ position:'absolute', top:-8, right:-8, width:22, height:22, borderRadius:'50%', background:step.color, color:'#fff', fontSize:9, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #fff' }}>
                  {step.num}
                </div>
              </div>
              <h3 style={{ fontSize:16, fontWeight:700, color:'#0f172a', marginBottom:8 }}>{step.title}</h3>
              <p style={{ fontSize:13, color:'#64748b', lineHeight:1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign:'center', marginTop:48 }}>
        <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg reveal">
          Start your free trial -- no card needed →
        </a>
      </div>
    </div>
  </section>

  {/* PLATFORM SHOWCASE */}
  <PlatformShowcase />

  {/* USE CASES -- exact from live site */}
  <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0' }}>
    <div className="container">
      <span className="tag reveal">Use Cases</span>
      <h2 className="h2 reveal" style={{ marginBottom: 48 }}>Built for every kind of <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>workspace</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-5" style={{gap: 16}}>
        {USE_CASES.map((uc, i) => (
          <Link key={uc.title} to={uc.href} className="card reveal" style={{ textDecoration: 'none', animationDelay: `${i * 0.1}s` }}>
            <div style={{ marginBottom: 14 }}>{uc.icon}</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{uc.title}</h3>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{uc.desc}</p>
            <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: uc.accent || '#00c07a' }}>Learn more →</div>
          </Link>
        ))}
      </div>
    </div>
  </section>

  {/* TESTIMONIALS -- new */}
  <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="tag reveal">Customer Stories</span>
        <h2 className="h2 reveal">Loved by <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>workplace teams</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3" style={{gap: 20}}>
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className="card reveal" style={{ animationDelay: `${i*0.12}s`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
              {[...Array(5)].map((_,si) => <span key={si} style={{ color: '#fbbf24', fontSize: 14 }}>★</span>)}
            </div>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.75, fontStyle: 'italic', flex: 1, marginBottom: 20 }}>"{t.quote}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{t.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* INTEGRATIONS HUB */}
  <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', overflow: 'hidden' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="tag reveal">Integrations</span>
        <h2 className="h2 reveal">Connects with <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>everything</span><br />your team already uses</h2>
        <p className="body reveal" style={{ color: '#64748b', maxWidth: 380, margin: '12px auto 0' }}>Watch SpacioHub connect to your entire stack -- one integration at a time.</p>
      </div>
      {/* Desktop: animated hub */}
      <div className="reveal hidden md:block"><IntegrationHub /></div>
      {/* Mobile: simple logo grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden mt-8">
        {[
          { name: 'Google Calendar', color: '#4285F4', bg: '#eff6ff' },
          { name: 'Microsoft 365',   color: '#0078D4', bg: '#eff6ff' },
          { name: 'Zoom',            color: '#2D8CFF', bg: '#eff6ff' },
          { name: 'MS Teams',        color: '#5558AF', bg: '#f0f0ff' },
          { name: 'Google SSO',      color: '#34A853', bg: '#ecfdf5' },
          { name: 'Microsoft SSO',   color: '#0078D4', bg: '#eff6ff' },
          { name: 'iCal Feed',       color: '#FF3B30', bg: '#fff1f2' },
          { name: 'Door Display',    color: '#00c07a', bg: '#ecfdf5' },
        ].map(item => (
          <div key={item.name} style={{ background: item.bg, borderRadius: 14, padding: '16px', textAlign: 'center', border: `1px solid ${item.color}25` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.name}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>✓ Connected</div>
          </div>
        ))}
      </div>
    </div>
  </section>


  {/* SECURITY SECTION */}
  <section style={{ padding: '96px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <span className="tag reveal">Security & trust</span>
          <h2 className="h2 reveal" style={{ marginTop: 12, marginBottom: 16 }}>
            We take security <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>seriously.</span>
          </h2>
          <p className="body reveal" style={{ maxWidth: 420, marginBottom: 28 }}>
            SpacioHub is built for organisations that can't afford to compromise. Your data is encrypted, your access is controlled, and your license is cryptographically protected.
          </p>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            {[
              { color: '#00c07a', bg: '#ecfdf5', label: 'TLS 1.3 + AES-256 encryption', desc: 'All data encrypted in transit and at rest' },
              { color: '#8b5cf6', bg: '#f5f3ff', label: 'Role-based access control', desc: 'Four permission levels -- everyone sees only what they need' },
              { color: '#0F799B', bg: '#e0f2fe', label: 'Cryptographic license protection', desc: 'Server-side validation -- keys cannot be forged or shared' },
              { color: '#f59e0b', bg: '#fefce8', label: '99.9% uptime SLA', desc: 'Automatic failover and daily backups included' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/security" className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#00c07a', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Read our full security overview →
          </Link>
        </div>

        {/* Visual */}
        <div className="reveal" style={{ background: '#0f172a', borderRadius: 20, padding: 28 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>LICENSE VALIDATION</div>
          {[
            { label: 'Organisation match', ok: true },
            { label: 'Signature verified', ok: true },
            { label: 'Contract not expired', ok: true },
            { label: 'Key not revoked', ok: true },
            { label: 'Shared with another org', ok: false },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: row.ok ? 'rgba(0,192,122,0.15)' : 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {row.ok
                  ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00c07a" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                }
              </div>
              <span style={{ fontSize: 13, color: row.ok ? 'rgba(255,255,255,0.75)' : 'rgba(239,68,68,0.6)', flex: 1 }}>{row.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: row.ok ? '#00c07a' : '#ef4444' }}>{row.ok ? 'PASS' : 'BLOCKED'}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, background: 'rgba(0,192,122,0.08)', border: '1px solid rgba(0,192,122,0.2)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00c07a" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style={{ fontSize: 12, color: '#00c07a', fontWeight: 600 }}>Access granted -- app unlocked</span>
          </div>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Encryption', value: 'AES-256' },
              { label: 'Protocol', value: 'TLS 1.3' },
              { label: 'Signing', value: 'HMAC-SHA256' },
              { label: 'Uptime', value: '99.9% SLA' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 12px' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* PRICING TEASER */}
  <section style={{ padding: '96px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <span className="tag reveal">Pricing</span>
        <h2 className="h2 reveal">Simple, <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>honest pricing</span></h2>
        <p className="lead reveal" style={{ maxWidth:400, margin:'12px auto 0' }}>Start free. Upgrade when you're ready. No hidden fees.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal" style={{ maxWidth:860, margin:'0 auto' }}>
        {[
          { name:'Basic',      price:'$30',    period:'/year',  color:'#64748b', bg:'#fff',    border:'#e2e8f0', features:['2 rooms', '5 users', '1 door display', 'Core booking', 'iCal feed'] },
          { name:'Pro',        price:'$4.99',  period:'/mo',    color:'#3b82f6', bg:'#fff',    border:'#bfdbfe', features:['5 rooms + add-ons', '25 users', 'Visitor management', 'Google & Outlook sync', 'Advanced analytics'], pop:false },
          { name:'Max',        price:'$8.99',  period:'/mo',    color:'#00c07a', bg:'#0f172a', border:'#00c07a', features:['Unlimited rooms', 'Unlimited users', 'AI Room Booker', 'Google & Microsoft SSO', 'White-label'], pop:true, dark:true },
        ].map(p => (
          <div key={p.name} style={{ background:p.bg, border:`2px solid ${p.border}`, borderRadius:20, padding:'32px 28px', position:'relative', transition:'all 0.25s' }}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 20px 48px ${p.color}20` }}
            onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
            {p.pop && <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', background:p.color, color:'#fff', fontSize:10, fontWeight:800, padding:'4px 14px', borderRadius:100, whiteSpace:'nowrap', letterSpacing:'0.5px' }}>MOST POPULAR</div>}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:p.dark?'#94a3b8':'#64748b', textTransform:'uppercase', letterSpacing:'1px', marginBottom:8 }}>{p.name}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
                <span style={{ fontSize:40, fontWeight:900, color:p.dark?'#fff':p.color, letterSpacing:'-2px' }}>{p.price}</span>
                <span style={{ fontSize:13, color:p.dark?'#64748b':'#94a3b8' }}>{p.period} · billed annually</span>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:28 }}>
              {p.features.map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:p.dark?'#cbd5e1':'#374151' }}>
                  <span style={{ color:p.color, flexShrink:0 }}>✓</span> {f}
                </div>
              ))}
            </div>
            <Link to="/pricing" style={{ display:'block', textAlign:'center', padding:'11px', borderRadius:10, background: p.dark ? p.color : 'transparent', border:`1.5px solid ${p.dark ? p.color : p.color+'55'}`, color: p.dark ? '#fff' : p.color, textDecoration:'none', fontSize:13, fontWeight:700, transition:'all 0.2s' }}
              onMouseEnter={e=>{ if(!p.dark){ e.currentTarget.style.background=p.color; e.currentTarget.style.color='#fff' }}}
              onMouseLeave={e=>{ if(!p.dark){ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=p.color }}}>
              {p.dark ? 'Start free trial →' : 'See plan details'}
            </Link>
          </div>
        ))}
      </div>
      <p className="reveal" style={{ textAlign:'center', fontSize:13, color:'#94a3b8', marginTop:24 }}>
        All plans include a 14-day free trial. <Link to="/pricing" style={{ color:'#00c07a', textDecoration:'none', fontWeight:600 }}>Compare all features →</Link>
      </p>
    </div>
  </section>

        {/* CTA -- exact from live site */}
  <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '96px 0', textAlign: 'center' }}>
    <div className="container">
      <h2 className="h2 reveal" style={{ marginBottom: 16, color: '#fff' }}>Ready to <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>transform your workspace?</span></h2>
      <p className="lead reveal" style={{ color: '#94a3b8', marginBottom: 36 }}>14-day free trial. No credit card required. Up and running in 5 minutes.</p>
      <div className="reveal" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
        <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1.5px solid #334155', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 8 }}>Try free for 14 days</a>
      </div>
    </div>
  </section>
</main>
```

</>
)
}