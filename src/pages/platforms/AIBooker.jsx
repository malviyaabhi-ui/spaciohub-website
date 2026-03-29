import SEO from '../../components/SEO'
import { PAGE_SEO } from '../../components/pageSEO'
import React, { useState, useEffect, useRef } from 'react'
import { useModal } from '../../components/ModalContext'

const PROMPTS = [
  { text: '"Book a quiet room for 2 hours this afternoon"',    result: { room:'Focus Room',time:'2:00 – 4:00 PM',floor:'Floor 1',cap:'4 people',reason:'Quiet, soundproofed, no conflicts' } },
  { text: '"Find a space for 10 people with a projector"',     result: { room:'Conference Room',time:'Available now',floor:'Floor 2',cap:'12 people',reason:'Projector + whiteboard, fits your group' } },
  { text: '"Schedule weekly standup somewhere free at 9"',     result: { room:'Team Room',time:'9:00 – 9:30 AM',floor:'Floor 1',cap:'8 people',reason:'Your usual room, open every Monday' } },
  { text: '"I need a private call booth for 30 mins"',         result: { room:'Phone Booth 2',time:'Next available: 11:00 AM',floor:'Ground',cap:'1 person',reason:'Soundproofed, available immediately' } },
]

function AIDemo() {
  const [promptIdx, setPromptIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState('typing')
  const timerRef = useRef(null)
  const typeRef = useRef(null)

  const runSequence = (idx) => {
    const prompt = PROMPTS[idx].text
    setTyped(''); setPhase('typing')
    let i = 0
    typeRef.current = setInterval(() => {
      i++; setTyped(prompt.slice(0, i))
      if (i >= prompt.length) {
        clearInterval(typeRef.current)
        setPhase('thinking')
        timerRef.current = setTimeout(() => {
          setPhase('result')
          timerRef.current = setTimeout(() => {
            const next = (idx + 1) % PROMPTS.length
            setPromptIdx(next); runSequence(next)
          }, 3500)
        }, 1200)
      }
    }, 40)
  }

  useEffect(() => {
    runSequence(0)
    return () => { clearInterval(typeRef.current); clearTimeout(timerRef.current) }
  }, [])

  const result = PROMPTS[promptIdx].result
  return (
    <div style={{ background:'linear-gradient(160deg,#0f172a,#1a2744)', borderRadius:20, padding:28, boxShadow:'0 24px 60px rgba(0,0,0,0.25)', border:'1px solid #1e293b' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
        <div style={{ width:32,height:32,borderRadius:9,background:'linear-gradient(135deg,#f59e0b,#d97706)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16 }}>✨</div>
        <div>
          <div style={{ fontSize:12,fontWeight:700,color:'#fff' }}>AI Room Booker</div>
          <div style={{ fontSize:10,color:'#475569' }}>Powered by SpacioHub AI</div>
        </div>
        <div style={{ marginLeft:'auto',fontSize:9,color:'#00c07a',fontWeight:600,background:'rgba(0,192,122,0.1)',border:'1px solid rgba(0,192,122,0.2)',padding:'2px 8px',borderRadius:100 }}>Active</div>
      </div>
      <div style={{ background:'#1e293b',borderRadius:12,padding:'12px 14px',marginBottom:16,border:'1px solid #334155',minHeight:48,display:'flex',alignItems:'center',gap:8 }}>
        <span style={{ fontSize:13,color:'#94a3b8',flex:1,fontStyle:'italic' }}>{typed}</span>
        <div style={{ width:28,height:28,borderRadius:7,background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      {phase === 'thinking' && (
        <div style={{ display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:'rgba(245,158,11,0.08)',borderRadius:10,border:'1px solid rgba(245,158,11,0.15)' }}>
          <div style={{ display:'flex',gap:4 }}>
            {[0,1,2].map(i => <div key={i} style={{ width:6,height:6,borderRadius:'50%',background:'#f59e0b',animation:`dotBounce 0.8s ${i*0.15}s infinite` }}/>)}
          </div>
          <span style={{ fontSize:12,color:'#f59e0b',fontWeight:500 }}>Finding the best available room...</span>
        </div>
      )}
      {phase === 'result' && (
        <div>
          <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:12 }}>
            <div style={{ width:18,height:18,borderRadius:'50%',background:'#00c07a',display:'flex',alignItems:'center',justifyContent:'center' }}>
              <svg viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontSize:12,color:'#00c07a',fontWeight:700 }}>Found the perfect room</span>
          </div>
          <div style={{ background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'14px 16px',border:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize:16,fontWeight:800,color:'#fff',marginBottom:4 }}>{result.room}</div>
            <div style={{ fontSize:12,color:'#00c07a',fontWeight:600,marginBottom:12 }}>{result.time}</div>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{gap:8,marginBottom:12}}>
              {[['Floor',result.floor],['Capacity',result.cap]].map(([k,v]) => (
                <div key={k} style={{ background:'rgba(255,255,255,0.04)',borderRadius:8,padding:'8px 10px' }}>
                  <div style={{ fontSize:9,color:'#475569',fontWeight:600,letterSpacing:'0.5px',textTransform:'uppercase' }}>{k}</div>
                  <div style={{ fontSize:12,fontWeight:700,color:'#e2e8f0',marginTop:2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:11,color:'#475569',fontStyle:'italic',marginBottom:12 }}>{result.reason}</div>
            <button style={{ width:'100%',background:'#00c07a',color:'#fff',border:'none',borderRadius:8,padding:'10px',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif' }}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes dotBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
    </div>
  )
}

export default function AIBooker() {
  const { openModal } = useModal()
  return (
    <>
      <SEO {...PAGE_SEO.platformAIBooker} />
      <main style={{ paddingTop:64, fontFamily:'Inter,sans-serif' }}>
      <section style={{ background:'linear-gradient(170deg,#fefce8,#fff 60%,#f8fafc)', borderBottom:'1px solid #e2e8f0', padding:'88px 0 72px', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute',top:-80,right:-80,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,0.08),transparent 65%)',pointerEvents:'none' }}/>
        <div className="container" style={{ position:'relative' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{gap:64, alignItems:'center'}}>
            <div>
              <span className="tag animate-fade-up">Platform · AI</span>
              <h1 className="h1 animate-fade-up delay-1" style={{ fontSize:'clamp(30px,4vw,52px)', marginBottom:20 }}>
                AI Room <span style={{ background:'linear-gradient(135deg,#f59e0b,#ea580c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>Booker</span>
              </h1>
              <p className="lead animate-fade-up delay-2" style={{ marginBottom:36 }}>Describe what you need in plain language. SpacioHub AI finds and books the perfect available room in seconds — no clicking required.</p>
              <div className="animate-fade-up delay-3" style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo</button>
                <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free</a>
              </div>
            </div>
            <div className="animate-fade-up delay-2"><AIDemo /></div>
          </div>
        </div>
      </section>

      <section style={{ padding:'80px 0', borderBottom:'1px solid #e2e8f0', background:'#fff' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <span className="tag reveal">How it works</span>
            <h2 className="h2 reveal">Three steps to <span style={{ background:'linear-gradient(135deg,#f59e0b,#ea580c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>the right room</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{gap:24}}>
            {[
              { num:'01', title:'Describe your need',       desc:'Just type what you need — "quiet room for 2 hours", "space for 10 with a projector", "call booth this afternoon". Anything works.', accent:'#f59e0b', bg:'#fefce8', border:'#fde68a' },
              { num:'02', title:'AI finds the best match',  desc:"SpacioHub checks availability, capacity, amenities, and your team's booking patterns to suggest the best room for your request.", accent:'#f97316', bg:'#fff7ed', border:'#fed7aa' },
              { num:'03', title:'Confirm in one click',     desc:'Review the suggestion and confirm. Zoom link generated, attendees notified, calendar updated. Done in under 10 seconds.', accent:'#00c07a', bg:'#ecfdf5', border:'#a7f3d0' },
            ].map((s,i) => (
              <div key={s.num} className="card reveal" style={{ animationDelay:`${i*0.12}s`, background:s.bg, border:`1px solid ${s.border}` }}>
                <div style={{ width:44,height:44,borderRadius:12,background:s.accent,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:800,color:'#fff',fontFamily:'DM Mono,monospace',marginBottom:16 }}>{s.num}</div>
                <h3 style={{ fontSize:16,fontWeight:700,marginBottom:10,color:'#0f172a' }}>{s.title}</h3>
                <p style={{ fontSize:13,color:'#64748b',lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'80px 0', background:'#f8fafc', borderBottom:'1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <span className="tag reveal">Capabilities</span>
            <h2 className="h2 reveal">What the AI <span style={{ background:'linear-gradient(135deg,#f59e0b,#ea580c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>understands</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{gap:16}}>
            {[
              { title:'Natural language',      desc:'No rigid forms — type what you need and the AI parses your intent, time, duration, and preferences.' },
              { title:'Live availability',     desc:'Checks real-time room availability, buffer times, and existing bookings before making a suggestion.' },
              { title:'Amenity matching',      desc:'Understands "projector", "whiteboard", "soundproofed" and filters rooms by the amenities you need.' },
              { title:'Show alternatives',     desc:'Ask for alternatives and the AI shows you the next best options with clear reasons why.' },
              { title:'Instant confirmation',  desc:'Confirm in one click — booking created, Zoom link generated, attendees notified automatically.' },
              { title:'Learns your patterns',  desc:'Notices your preferred rooms, usual times, and recurring bookings to make smarter suggestions over time.' },
            ].map((f,i) => (
              <div key={f.title} className="card reveal" style={{ animationDelay:`${i*0.08}s` }}>
                <div style={{ width:36,height:36,borderRadius:9,background:'#fefce8',border:'1px solid #fde68a',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14,fontSize:18 }}>✨</div>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:8,color:'#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize:13,color:'#64748b',lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:'linear-gradient(135deg,#fefce8,#fff)', borderTop:'1px solid #fde68a', padding:'80px 0', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',top:-80,left:'50%',transform:'translateX(-50%)',width:600,height:300,background:'radial-gradient(ellipse,rgba(245,158,11,0.08),transparent 65%)',pointerEvents:'none' }}/>
        <div className="container" style={{ position:'relative' }}>
          <div style={{ fontSize:56, marginBottom:16 }}>✨</div>
          <h2 className="h2 reveal" style={{ marginBottom:14 }}>Book any room by just <span style={{ background:'linear-gradient(135deg,#f59e0b,#ea580c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>describing it</span></h2>
          <p className="lead reveal" style={{ marginBottom:36, color:'#64748b' }}>14-day free trial. No credit card required.</p>
          <div className="reveal" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Start free trial</a>
          </div>
        </div>
      </section>
    </main>
  </>
  )
}
