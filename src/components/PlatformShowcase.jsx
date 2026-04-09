import React, { useState, useEffect, useRef } from 'react'
import { useModal } from './ModalContext'

const BOOKING_SUBSTEPS = [
  { id:'grid',  label:'Week view',           img:`/screenshots/02_BookARoom.jpg`,   orient:'landscape', badge:null },
  { id:'modal', label:'Booking form',        img:`/screenshots/booking_modal.jpg`,  orient:'portrait',  badge:null },
  { id:'ai',    label:'AI room suggestion',  img:`/screenshots/booking_modal.jpg`,  orient:'portrait',  badge:{ img:`/screenshots/ai_suggestion.jpg`, label:'AI Room Suggestion', color:'#6366f1', position:'bottom' } },
  { id:'zoom',  label:'Auto Zoom link',      img:`/screenshots/booking_modal.jpg`,  orient:'portrait',  badge:{ img:`/screenshots/zoom_feature.jpg`,  label:'Zoom Auto-Created',  color:'#2563eb', position:'top'    } },
]

const STEPS = [
  { id:'dashboard',   step:'01', label:'Dashboard',     title:'Smart Dashboard',       tag:'Dashboard',     color:'#00c07a', img:`/screenshots/01_Dashboard.jpg`,    orient:'landscape', desc:'Walk in knowing exactly which rooms are free, booked, and coming up — all at a glance.', highlights:['Active rooms & room availability','Upcoming bookings timeline','Quick stats: bookings, in-use, upcoming'], booking:false },
  { id:'booking',     step:'02', label:'Room Booking',  title:'Book in seconds',       tag:'Room Booking',  color:'#3b82f6', img:`/screenshots/02_BookARoom.jpg`,    orient:'landscape', desc:'Click any free slot on the visual grid. AI suggests the best room. Zoom link created automatically.',  highlights:['Visual week & day grid','AI room suggestion engine','Auto Zoom meeting link'], booking:true },
  { id:'roomstatus',  step:'03', label:'Door Panel',    title:'Live Room Status',      tag:'Door Panel',    color:'#10b981', img:`/screenshots/06_RoomStatus.jpg`,   orient:'portrait',  desc:'Every room shows live status on a tablet outside the door. Auto-releases if no one checks in.',    highlights:['Green / red / amber status','Quick book from the panel','Auto-release if no check-in'], booking:false },
  { id:'kiosk',       step:'04', label:'Visitor Kiosk', title:'Self-Service Check-in', tag:'Visitor Kiosk', color:'#8b5cf6', img:`/screenshots/03_VisitorKiosk.jpg`, orient:'landscape', desc:'Visitors scan a QR code or enter details at a sleek kiosk. No clipboard. Host notified instantly.', highlights:['QR code check-in','Manual entry option','Instant host notification'], booking:false },
  { id:'visitorpass', step:'05', label:'Visitor Pass',  title:'Instant Visitor Pass',  tag:'Visitor Pass',  color:'#0ea5e9', img:`/screenshots/07_VisitorPass.jpg`,  orient:'landscape', desc:'Every visitor gets a branded digital pass with their name, company, host, and a unique QR code.',   highlights:['Branded with your logo','QR code for scan check-in','Host and purpose captured'], booking:false },
  { id:'ai',          step:'06', label:'AI Booker',     title:'Mira — AI Booker',      tag:'AI Booker',     color:'#f59e0b', img:`/screenshots/05_AIBooker.jpg`,     orient:'portrait',  desc:'Tell Mira what you need in plain English. She finds the right room and books it in one conversation.', highlights:['Natural language booking','Room recommendations','Confirms and books instantly'], booking:false },
  { id:'analytics',   step:'07', label:'Analytics',     title:'Analytics & Insights',  tag:'Analytics',     color:'#ec4899', img:`/screenshots/04_Analytics.jpg`,    orient:'portrait',  desc:'See booking trends, peak hours, most used rooms. Export to CSV for your own BI tools.',           highlights:['Daily booking trend chart','Most booked rooms ranking','CSV export anytime'], booking:false },
]

function Screenshot({ img, orient, badge, show }) {
  const ip = orient === 'portrait'
  const [bv, setBv] = useState(false)

  useEffect(() => {
    setBv(false)
    if (badge?.img) { const t = setTimeout(() => setBv(true), 900); return () => clearTimeout(t) }
  }, [badge?.img, img])

  return (
    <div style={{
      position: 'relative',
      width: ip ? '55%' : '100%',
      maxWidth: ip ? 380 : '100%',
      margin: '0 auto',
      transform: show ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
      opacity: show ? 1 : 0,
      transition: 'all 0.5s cubic-bezier(0.34,1.3,0.64,1)',
    }}>
      {/* Outer device shell */}
      <div style={{
        background: '#1a1f2e',
        borderRadius: ip ? 36 : 16,
        padding: ip ? '16px 10px 20px' : '12px 12px 8px',
        boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>
        {/* Browser bar */}
        {!ip && (
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c=><div key={c} style={{ width:10,height:10,borderRadius:'50%',background:c }}/>)}
            <div style={{ flex:1, background:'#111827', borderRadius:6, height:22, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:10, color:'#4b5563', fontFamily:'DM Mono,monospace' }}>go.spaciohub.com</span>
            </div>
          </div>
        )}
        {/* Notch */}
        {ip && <div style={{ display:'flex', justifyContent:'center', marginBottom:10 }}><div style={{ width:48, height:5, background:'#111827', borderRadius:3 }}/></div>}

        {/* Screen */}
        <div style={{ borderRadius: ip ? 20 : 8, overflow:'hidden', position:'relative', background:'#f8fafc', lineHeight:0 }}>
          <img src={img} alt="" style={{ width:'100%', display:'block' }} loading="lazy" />
          {/* Floating badge */}
          {badge?.img && (
            <div style={{
              position:'absolute', left:'3%', right:'3%',
              top: badge.position==='top' ? '4%' : 'auto',
              bottom: badge.position==='bottom' ? '4%' : 'auto',
              borderRadius:10, overflow:'hidden',
              boxShadow:`0 12px 40px rgba(0,0,0,0.6), 0 0 0 2px ${badge.color}77`,
              transform: bv ? 'translateY(0) scale(1)' : badge.position==='top' ? 'translateY(-16px) scale(0.94)' : 'translateY(16px) scale(0.94)',
              opacity: bv ? 1 : 0,
              transition: 'all 0.55s cubic-bezier(0.34,1.4,0.64,1)',
            }}>
              <div style={{ padding:'7px 14px', background:badge.color, display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:7,height:7,borderRadius:'50%',background:'#fff',animation:'pulse 1.5s infinite' }}/>
                <span style={{ fontSize:11, fontWeight:700, color:'#fff', letterSpacing:'0.3px' }}>{badge.label}</span>
              </div>
              <img src={badge.img} alt={badge.label} style={{ width:'100%', display:'block', background:'#fff' }} />
            </div>
          )}
        </div>

        {ip && <div style={{ display:'flex', justifyContent:'center', marginTop:12 }}><div style={{ width:100, height:4, background:'#111827', borderRadius:2 }}/></div>}
      </div>

      {/* Glow */}
      <div style={{ position:'absolute', inset:'-20px', background:'radial-gradient(ellipse 60% 40% at 50% 100%,rgba(0,192,122,0.12),transparent 70%)', pointerEvents:'none', zIndex:-1 }}/>
    </div>
  )
}

function BookingFlow({ color }) {
  const [sub, setSub] = useState(0)
  const [show, setShow] = useState(true)
  const ref = useRef(null)

  const goSub = (i) => {
    clearInterval(ref.current)
    setShow(false)
    setTimeout(() => { setSub(i); setShow(true) }, 230)
  }

  useEffect(() => {
    ref.current = setInterval(() => {
      setShow(false)
      setTimeout(() => { setSub(p => (p+1)%BOOKING_SUBSTEPS.length); setShow(true) }, 230)
    }, 3800)
    return () => clearInterval(ref.current)
  }, [])

  const s = BOOKING_SUBSTEPS[sub]
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
      {/* Sub pills */}
      <div style={{ display:'flex', gap:6, flexWrap:'wrap', justifyContent:'center' }}>
        {BOOKING_SUBSTEPS.map((bs,i)=>(
          <button key={bs.id} onClick={()=>goSub(i)} style={{
            padding:'4px 13px', borderRadius:20, fontSize:11, fontWeight:600, cursor:'pointer',
            border:`1.5px solid ${sub===i ? color : 'rgba(255,255,255,0.12)'}`,
            background: sub===i ? color+'25' : 'transparent',
            color: sub===i ? color : 'rgba(255,255,255,0.35)',
            fontFamily:'Inter,sans-serif', transition:'all 0.2s',
          }}>{bs.label}</button>
        ))}
      </div>
      <Screenshot img={s.img} orient={s.orient} badge={s.badge} show={show} />
      {/* Dots */}
      <div style={{ display:'flex', gap:5 }}>
        {BOOKING_SUBSTEPS.map((_,i)=>(
          <div key={i} onClick={()=>goSub(i)} style={{ width:sub===i?22:5, height:4, borderRadius:2, background:sub===i?color:'rgba(255,255,255,0.15)', transition:'all 0.3s', cursor:'pointer' }}/>
        ))}
      </div>
    </div>
  )
}

export default function PlatformShowcase() {
  const { openModal } = useModal()
  const [active, setActive] = useState(0)
  const [show, setShow] = useState(true)
  const [autoplay, setAutoplay] = useState(true)
  const timerRef = useRef(null)

  const go = (i) => {
    setShow(false)
    setTimeout(() => { setActive(i); setShow(true) }, 230)
  }

  useEffect(() => {
    if (!autoplay) return
    timerRef.current = setInterval(() => {
      setShow(false)
      setTimeout(() => { setActive(p => (p+1)%STEPS.length); setShow(true) }, 230)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [autoplay])

  const step = STEPS[active]

  return (
    <section style={{ background:'#060d1a', padding:'88px 0 72px', position:'relative', overflow:'hidden' }}>
      {/* Subtle grid */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'72px 72px' }}/>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:100, background:'linear-gradient(0deg,#060d1a,transparent)', pointerEvents:'none' }}/>

      <div className="container" style={{ position:'relative' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <span className="tag" style={{ color:'#00c07a' }}>Platform in Action</span>
          <h2 style={{ fontSize:'clamp(30px,4vw,52px)', fontWeight:900, color:'#fff', letterSpacing:'-1.8px', lineHeight:1.1, marginBottom:12 }}>
            See SpacioHub in action
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.4)', maxWidth:420, margin:'0 auto' }}>
            Real screenshots. Every feature. Walk through the full platform.
          </p>
        </div>

        {/* Step tabs */}
        <div style={{ display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap', marginBottom:44 }}>
          {STEPS.map((s,i)=>(
            <button key={s.id} onClick={()=>{ setAutoplay(false); clearInterval(timerRef.current); go(i) }}
              style={{
                padding:'7px 18px', borderRadius:24, fontSize:13, fontWeight:600, cursor:'pointer',
                border:`1.5px solid ${active===i ? s.color : 'rgba(255,255,255,0.1)'}`,
                background: active===i ? s.color+'22' : 'rgba(255,255,255,0.03)',
                color: active===i ? s.color : 'rgba(255,255,255,0.4)',
                fontFamily:'Inter,sans-serif', transition:'all 0.2s',
                backdropFilter:'blur(8px)',
              }}>
              <span style={{ opacity:0.6, fontSize:10, marginRight:4 }}>{s.step}</span>{s.label}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div style={{
          background:'rgba(255,255,255,0.03)',
          border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:24,
          padding:'40px 36px',
          backdropFilter:'blur(8px)',
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap:48, alignItems:'center' }}>

            {/* LEFT: info */}
            <div>
              {/* Tag + step */}
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
                <div style={{ width:36,height:36,borderRadius:10,background:step.color+'25',border:`1.5px solid ${step.color}55`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:step.color,fontFamily:'DM Mono,monospace',flexShrink:0 }}>{step.step}</div>
                <span style={{ fontSize:11,fontWeight:700,color:step.color,textTransform:'uppercase',letterSpacing:'1.5px' }}>{step.tag}</span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize:'clamp(28px,3.5vw,48px)', fontWeight:900, color:'#fff', letterSpacing:'-1.5px', lineHeight:1.05, marginBottom:16 }}>{step.title}</h3>

              {/* Description */}
              <p style={{ fontSize:16, color:'rgba(255,255,255,0.5)', lineHeight:1.8, marginBottom:28 }}>{step.desc}</p>

              {/* Highlights */}
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:36 }}>
                {step.highlights.map((h,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:22,height:22,borderRadius:7,flexShrink:0,background:step.color+'20',border:`1px solid ${step.color}40`,display:'flex',alignItems:'center',justifyContent:'center' }}>
                      <svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke={step.color} strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                    </div>
                    <span style={{ fontSize:14,color:'rgba(255,255,255,0.65)',fontWeight:500 }}>{h}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:`0 0 32px ${step.color}40` }}>
                  Request a Demo →
                </button>
                <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', padding:'14px 26px', borderRadius:8, fontSize:15, fontWeight:600, border:'1.5px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.65)', textDecoration:'none', transition:'all 0.2s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.35)'; e.currentTarget.style.color='#fff' }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.color='rgba(255,255,255,0.65)' }}>
                  Try free →
                </a>
              </div>

              {/* Progress dots */}
              <div style={{ display:'flex', gap:4, marginTop:32 }}>
                {STEPS.map((s,i)=>(
                  <div key={i} onClick={()=>{ setAutoplay(false); go(i) }}
                    style={{ height:3, borderRadius:2, flex:1, background:i===active?step.color:'rgba(255,255,255,0.08)', transition:'all 0.35s', cursor:'pointer', boxShadow:i===active?`0 0 8px ${step.color}80`:'' }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: screenshot */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
              {step.booking
                ? <BookingFlow color={step.color} />
                : <Screenshot img={step.img} orient={step.orient} show={show} badge={null} />
              }
            </div>

          </div>
        </div>

        {/* Autoplay toggle */}
        <div style={{ textAlign:'center', marginTop:20 }}>
          <button onClick={()=>setAutoplay(p=>!p)}
            style={{ background:'none',border:'none',cursor:'pointer',fontSize:11,color:'rgba(255,255,255,0.18)',fontFamily:'Inter,sans-serif',display:'inline-flex',alignItems:'center',gap:6 }}>
            <div style={{ width:22,height:12,borderRadius:6,background:autoplay?'rgba(0,192,122,0.3)':'rgba(255,255,255,0.08)',position:'relative',transition:'all 0.2s' }}>
              <div style={{ position:'absolute',top:2.5,left:autoplay?11:2.5,width:7,height:7,borderRadius:'50%',background:autoplay?'#00c07a':'rgba(255,255,255,0.3)',transition:'all 0.2s' }}/>
            </div>
            {autoplay ? 'Auto-advancing' : 'Paused'}
          </button>
        </div>
      </div>
    </section>
  )
}
