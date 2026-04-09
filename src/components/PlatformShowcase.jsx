import React, { useState, useEffect, useRef } from 'react'
import { useModal } from './ModalContext'

const BOOKING_SUBSTEPS = [
  { id:'grid',  label:'Browse the week view',      img:'/screenshots/02_BookARoom.jpg',    orient:'landscape', badge:null },
  { id:'modal', label:'Fill in booking details',   img:'/screenshots/booking_modal.jpg',   orient:'portrait',  badge:null },
  { id:'ai',    label:'AI picks the perfect room', img:'/screenshots/booking_modal.jpg',   orient:'portrait',  badge:{ img:'/screenshots/ai_suggestion.jpg', label:'AI Room Suggestion', color:'#6366f1', position:'bottom' } },
  { id:'zoom',  label:'Zoom link auto-created',    img:'/screenshots/booking_modal.jpg',   orient:'portrait',  badge:{ img:'/screenshots/zoom_feature.jpg',  label:'Auto Zoom Link',     color:'#2563eb', position:'top' } },
]

const STEPS = [
  { id:'dashboard',   step:'01', label:'See everything at a glance',   title:'Smart Dashboard',       desc:'Walk into your day knowing exactly which rooms are free, booked, and coming up — all on one screen.',                                                   tag:'Dashboard',    color:'#00c07a', img:'/screenshots/01_Dashboard.jpg',    orient:'landscape', highlights:['Active rooms at a glance','Upcoming bookings timeline','Live room availability'], booking:false },
  { id:'booking',     step:'02', label:'Book in seconds, not minutes',  title:'Visual Booking + AI',   desc:'Click any free slot, fill in details, and Mira AI suggests the perfect room. Zoom link created automatically.',                                      tag:'Room Booking', color:'#3b82f6', img:'/screenshots/02_BookARoom.jpg',    orient:'landscape', highlights:['Week and day view grid','AI room suggestion engine','Auto Zoom meeting link'],   booking:true  },
  { id:'roomstatus',  step:'03', label:'Rooms manage themselves',       title:'Live Room Status',      desc:'Every room shows real-time status on a tablet outside the door. Auto-releases if no check-in within your grace period.',                              tag:'Door Panel',   color:'#10b981', img:'/screenshots/06_RoomStatus.jpg',   orient:'portrait',  highlights:['Green / red / amber status','Quick book from the panel','Auto-release if no check-in'], booking:false },
  { id:'kiosk',       step:'04', label:'Visitors feel like VIPs',       title:'Self-Service Check-in', desc:'Visitors scan a QR code or enter details at a sleek kiosk. No clipboard. No receptionist. Host notified instantly.',                                  tag:'Visitor Kiosk',color:'#8b5cf6', img:'/screenshots/03_VisitorKiosk.jpg', orient:'landscape', highlights:['QR code check-in','Manual entry option','Instant host notification'],            booking:false },
  { id:'visitorpass', step:'05', label:'Professional visitor badge',    title:'Instant Visitor Pass',  desc:'Every visitor gets a branded digital pass with their name, company, host, purpose, and a unique QR code for scan check-in.',                          tag:'Visitor Pass', color:'#1e40af', img:'/screenshots/07_VisitorPass.jpg',  orient:'landscape', highlights:['Branded with your logo','QR code for scan check-in','Host and purpose captured'],  booking:false },
  { id:'ai',          step:'06', label:'Just say what you need',        title:'Mira — AI Room Booker', desc:'Tell Mira what you need in plain English. She finds the right room, confirms the details, and books it — all in one conversation.',                   tag:'AI Booker',    color:'#f59e0b', img:'/screenshots/05_AIBooker.jpg',    orient:'portrait',  highlights:['Natural language booking','Room recommendations with reasons','Confirms and books instantly'], booking:false },
  { id:'analytics',   step:'07', label:'Data that drives decisions',    title:'Analytics & Insights',  desc:'See booking trends, most used rooms, peak hours, and total hours booked. Export to CSV for your own BI tools.',                                         tag:'Analytics',    color:'#ec4899', img:'/screenshots/04_Analytics.jpg',    orient:'portrait',  highlights:['Booking trend chart','Most booked rooms ranking','Export CSV for your BI tools'], booking:false },
]

function DeviceFrame({ img, orient, label, ready, badge }) {
  const ip = orient === 'portrait'
  const [bv, setBv] = useState(false)

  useEffect(() => {
    setBv(false)
    if (badge?.img) {
      const t = setTimeout(() => setBv(true), 800)
      return () => clearTimeout(t)
    }
  }, [badge?.img, img])

  return (
    <div style={{ position:'relative', width:'100%', display:'flex', justifyContent:'center', alignItems:'center' }}>
      <div style={{ position:'absolute', width:'75%', height:'55%', background:'radial-gradient(ellipse,rgba(0,192,122,0.12),transparent 70%)', filter:'blur(44px)', pointerEvents:'none' }} />
      <div style={{
        position:'relative', width: ip?'52%':'94%', maxWidth: ip?340:660,
        background:'#111827', borderRadius: ip?28:14, padding: ip?'14px 10px':'10px',
        boxShadow:'0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)',
        transform: ready?'translateY(0) scale(1)':'translateY(10px) scale(0.97)',
        opacity: ready?1:0, transition:'all 0.45s cubic-bezier(0.34,1.4,0.64,1)',
      }}>
        {!ip && (
          <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:7, paddingLeft:3 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c=><div key={c} style={{ width:9, height:9, borderRadius:'50%', background:c }}/>)}
            <div style={{ flex:1, background:'#1f2937', borderRadius:5, height:19, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:9, color:'#4b5563', fontFamily:'DM Mono,monospace' }}>go.spaciohub.com</span>
            </div>
          </div>
        )}
        {ip && <div style={{ display:'flex', justifyContent:'center', marginBottom:8 }}><div style={{ width:36, height:4, background:'#1f2937', borderRadius:2 }}/></div>}

        <div style={{ borderRadius: ip?14:6, overflow:'hidden', border:'1px solid rgba(255,255,255,0.05)', position:'relative', background:'#fff' }}>
          <img src={img} alt={label} style={{ width:'100%', display:'block' }} loading="lazy" />
          {badge?.img && (
            <div style={{
              position:'absolute', left:'4%', right:'4%',
              top: badge.position==='top' ? '5%' : 'auto',
              bottom: badge.position==='bottom' ? '5%' : 'auto',
              borderRadius:10, overflow:'hidden',
              boxShadow:`0 8px 32px rgba(0,0,0,0.55), 0 0 0 2px ${badge.color}66`,
              transform: bv ? 'translateY(0) scale(1)' : badge.position==='top' ? 'translateY(-14px) scale(0.95)' : 'translateY(14px) scale(0.95)',
              opacity: bv ? 1 : 0,
              transition:'all 0.5s cubic-bezier(0.34,1.4,0.64,1)',
            }}>
              <div style={{ padding:'6px 12px', background:badge.color, display:'flex', alignItems:'center', gap:7 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,0.9)', animation:'pulse 1.5s infinite' }}/>
                <span style={{ fontSize:10, fontWeight:700, color:'#fff', letterSpacing:'0.5px' }}>{badge.label}</span>
              </div>
              <img src={badge.img} alt={badge.label} style={{ width:'100%', display:'block', background:'#fff' }} />
            </div>
          )}
        </div>
        {ip && <div style={{ display:'flex', justifyContent:'center', marginTop:8 }}><div style={{ width:80, height:3, background:'#1f2937', borderRadius:2 }}/></div>}
      </div>
    </div>
  )
}

function BookingSubStepper({ color }) {
  const [sub, setSub] = useState(0)
  const [ready, setReady] = useState(true)
  const timerRef = useRef(null)

  const goSub = (i) => {
    clearInterval(timerRef.current)
    setReady(false)
    setTimeout(() => { setSub(i); setReady(true) }, 220)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setReady(false)
      setTimeout(() => {
        setSub(p => (p + 1) % BOOKING_SUBSTEPS.length)
        setReady(true)
      }, 220)
    }, 3800)
    return () => clearInterval(timerRef.current)
  }, [])

  const s = BOOKING_SUBSTEPS[sub]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:0, width:'100%' }}>
      <div style={{ display:'flex', gap:6, marginBottom:18, flexWrap:'wrap' }}>
        {BOOKING_SUBSTEPS.map((bs, i) => (
          <button key={bs.id} onClick={() => goSub(i)} style={{
            padding:'5px 13px', borderRadius:16, fontSize:11, fontWeight:600, cursor:'pointer',
            border:`1.5px solid ${sub===i ? color : 'rgba(255,255,255,0.1)'}`,
            background: sub===i ? color+'25' : 'transparent',
            color: sub===i ? color : 'rgba(255,255,255,0.32)',
            fontFamily:'Inter,sans-serif', transition:'all 0.2s',
          }}>{bs.label}</button>
        ))}
      </div>
      <div style={{ opacity:ready?1:0, transition:'opacity 0.22s ease' }}>
        <DeviceFrame img={s.img} orient={s.orient} label={s.label} ready={ready} badge={s.badge} />
      </div>
      <div style={{ display:'flex', gap:5, justifyContent:'center', marginTop:14 }}>
        {BOOKING_SUBSTEPS.map((_, i) => (
          <div key={i} onClick={() => goSub(i)} style={{
            width: sub===i ? 22 : 6, height:4, borderRadius:2,
            background: sub===i ? color : 'rgba(255,255,255,0.14)',
            transition:'all 0.3s', cursor:'pointer',
          }}/>
        ))}
      </div>
    </div>
  )
}

export default function PlatformShowcase() {
  const { openModal } = useModal()
  const [active, setActive] = useState(0)
  const [imgReady, setImgReady] = useState(true)
  const [autoplay, setAutoplay] = useState(true)
  const timerRef = useRef(null)

  const go = (idx) => {
    setImgReady(false)
    setTimeout(() => { setActive(idx); setImgReady(true) }, 220)
  }

  useEffect(() => {
    if (!autoplay) return
    timerRef.current = setInterval(() => {
      setImgReady(false)
      setTimeout(() => {
        setActive(p => (p + 1) % STEPS.length)
        setImgReady(true)
      }, 220)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [autoplay])

  const step = STEPS[active]

  return (
    <section style={{ background:'#060d1a', padding:'96px 0 80px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'64px 64px' }}/>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:'linear-gradient(0deg,#060d1a,transparent)', pointerEvents:'none' }}/>

      <div className="container" style={{ position:'relative' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <span className="tag" style={{ color:'#00c07a' }}>Platform in Action</span>
          <h2 style={{ fontSize:'clamp(32px,4.5vw,56px)', fontWeight:900, color:'#fff', letterSpacing:'-2px', lineHeight:1.08, marginBottom:14 }}>
            See exactly how<br/>
            <span style={{ background:'linear-gradient(135deg,#00c07a,#0cb8b6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>SpacioHub works</span>
          </h2>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.4)', maxWidth:460, margin:'0 auto' }}>Real screenshots. A complete walk-through from first login to live analytics.</p>
        </div>

        {/* Feature pills */}
        <div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap', marginBottom:52 }}>
          {STEPS.map((s, i) => (
            <button key={s.id} onClick={() => { setAutoplay(false); clearInterval(timerRef.current); go(i) }}
              style={{
                padding:'5px 15px', borderRadius:20, fontSize:12, fontWeight:600, cursor:'pointer',
                border:`1.5px solid ${active===i ? s.color : 'rgba(255,255,255,0.09)'}`,
                background: active===i ? s.color+'20' : 'transparent',
                color: active===i ? s.color : 'rgba(255,255,255,0.35)',
                fontFamily:'Inter,sans-serif', transition:'all 0.2s',
              }}>
              {s.step} · {s.tag}
            </button>
          ))}
        </div>

        {/* Main split */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap:52, alignItems:'center', minHeight:500 }}>

          {/* Left */}
          <div>
            <div style={{ marginBottom:28 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <div style={{ width:40, height:40, borderRadius:11, background:step.color+'22', border:`1.5px solid ${step.color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:step.color, fontFamily:'DM Mono,monospace', flexShrink:0 }}>{step.step}</div>
                <span style={{ fontSize:11, fontWeight:700, color:step.color, textTransform:'uppercase', letterSpacing:'1.2px' }}>{step.tag}</span>
              </div>
              <h3 style={{ fontSize:'clamp(24px,3vw,40px)', fontWeight:900, color:'#fff', letterSpacing:'-1.2px', lineHeight:1.08, marginBottom:14 }}>{step.title}</h3>
              <p style={{ fontSize:15, color:'rgba(255,255,255,0.5)', lineHeight:1.8, marginBottom:22 }}>{step.desc}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                {step.highlights.map((h, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:18, height:18, borderRadius:5, flexShrink:0, background:step.color+'22', border:`1px solid ${step.color}44`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg viewBox="0 0 12 12" width="8" height="8" fill="none" stroke={step.color} strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                    </div>
                    <span style={{ fontSize:13, color:'rgba(255,255,255,0.6)' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step navigator */}
            <div style={{ borderLeft:'1px solid rgba(255,255,255,0.07)', marginBottom:24 }}>
              {STEPS.map((s, i) => (
                <button key={s.id} onClick={() => { setAutoplay(false); clearInterval(timerRef.current); go(i) }}
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'8px 0 8px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontFamily:'Inter,sans-serif', position:'relative', width:'100%' }}>
                  {active===i && <div style={{ position:'absolute', left:-1, top:0, bottom:0, width:2, background:s.color, borderRadius:1 }}/>}
                  <div style={{ width:5, height:5, borderRadius:'50%', flexShrink:0, background:active===i ? s.color : 'rgba(255,255,255,0.16)', transition:'all 0.3s' }}/>
                  <span style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.22)', fontFamily:'DM Mono,monospace', minWidth:20 }}>{s.step}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:active===i ? '#fff' : 'rgba(255,255,255,0.33)', transition:'color 0.2s' }}>{s.label}</span>
                </button>
              ))}
            </div>

            {/* Progress */}
            <div style={{ display:'flex', gap:4, marginBottom:28 }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{ flex:1, height:2, borderRadius:1, background:'rgba(255,255,255,0.07)', overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:1, background:i<=active ? step.color : 'transparent', width:'100%', opacity:i<=active?1:0, transition:'opacity 0.3s' }}/>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <button className="btn btn-primary" onClick={openModal} style={{ boxShadow:`0 0 28px ${step.color}40` }}>Request a Demo →</button>
              <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', padding:'11px 22px', borderRadius:8, fontSize:14, fontWeight:600, border:'1.5px solid rgba(255,255,255,0.14)', color:'rgba(255,255,255,0.6)', textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'; e.currentTarget.style.color='#fff' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.14)'; e.currentTarget.style.color='rgba(255,255,255,0.6)' }}>
                Try free for 14 days
              </a>
            </div>
          </div>

          {/* Right */}
          <div style={{ opacity:imgReady?1:0, transition:'opacity 0.22s ease' }}>
            {step.booking
              ? <BookingSubStepper color={step.color} />
              : <DeviceFrame img={step.img} orient={step.orient} label={step.title} ready={imgReady} badge={null} />
            }
          </div>
        </div>

        {/* Autoplay toggle */}
        <div style={{ textAlign:'center', marginTop:24 }}>
          <button onClick={() => { setAutoplay(p => { if(!p) return true; clearInterval(timerRef.current); return false }) }}
            style={{ background:'none', border:'none', cursor:'pointer', fontSize:11, color:'rgba(255,255,255,0.2)', fontFamily:'Inter,sans-serif', display:'inline-flex', alignItems:'center', gap:6 }}>
            <div style={{ width:20, height:11, borderRadius:6, background:autoplay?'rgba(0,192,122,0.35)':'rgba(255,255,255,0.08)', position:'relative', transition:'all 0.2s' }}>
              <div style={{ position:'absolute', top:2, left:autoplay?10:2, width:7, height:7, borderRadius:'50%', background:autoplay?'#00c07a':'rgba(255,255,255,0.3)', transition:'all 0.2s' }}/>
            </div>
            {autoplay ? 'Auto-advancing every 5s' : 'Paused — click any step to continue'}
          </button>
        </div>
      </div>
    </section>
  )
}
