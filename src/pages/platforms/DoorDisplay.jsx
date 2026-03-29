import SEO from '../../components/SEO'
import { PAGE_SEO } from '../../components/pageSEO'
import React, { useState, useEffect, useRef } from 'react'
import { useModal } from '../../components/ModalContext'

const DOOR_FEATURES = [
  { icon: '🟢', label: 'Free Room',       title: "Instantly see what's available",    desc:"The display turns green and shows 'Free' with the day's schedule. Anyone can walk up and book — no login needed.", statusLabel:'Free',        statusColor:'#00c07a', bgRight:'linear-gradient(160deg,#00c07a,#009960)', roomName:'Conference Room', detail:'Available all day', detailLabel:null, schedule:null, actions:['Book Now','Guest Booking'], time:'10:30 AM' },
  { icon: '🟡', label: 'Starts Soon',     title: 'Never get caught off-guard',        desc:'Amber alert shows the upcoming meeting and start time so the current occupant knows to wrap up.', statusLabel:'Starts Soon', statusColor:'#f59e0b', bgRight:'linear-gradient(160deg,#f59e0b,#d97706)', roomName:'Conference Room', detail:'Team Standup', detailLabel:'NEXT UP', detailSub:'Starts 11:00 AM · sarah@acme.com', schedule:{title:'Team Standup',time:'11:00 AM – 11:30 AM',people:'5 people'}, actions:['Book Now','Guest Booking'], time:'10:55 AM' },
  { icon: '🔴', label: 'In Use',          title: 'Extend or end meetings on the spot', desc:'Red panel shows the live meeting. Staff can extend by 15 mins or end early — no login anywhere needed.', statusLabel:'In Use',     statusColor:'#ef4444', bgRight:'linear-gradient(160deg,#ef4444,#dc2626)', roomName:'Conference Room', detail:'Team Standup', detailLabel:'CURRENT MEETING', detailSub:'11:00 AM – 11:30 AM · 5 people', schedule:{title:'Team Standup',time:'11:00 AM – 11:30 AM',people:'5 people'}, actions:['End Now','+15 min','Guest Booking'], time:'11:05 AM' },
  { icon: '🔒', label: 'PIN Admin',       title: 'PIN-protected settings entry',       desc:"Tap the gear and a PIN pad appears. Only authorised admins can access settings — guests can't accidentally change anything.", isPin:true, statusLabel:'Admin', statusColor:'#3b82f6', time:'11:05 AM' },
  { icon: '⚙️', label: 'Settings',        title: 'Full control from the display itself',desc:'Room, Display, Booking and System tabs let you configure everything on-device — themes, permissions, and refresh intervals.', isSettings:true, statusLabel:'Settings', statusColor:'#3b82f6', time:'11:05 AM' },
]
const PROGRESS_DURATION = 4000

function TabletScreen({ feature, settingsTab, setSettingsTab }) {
  if (feature.isPin) return (
    <div style={{ background:'linear-gradient(160deg,#0f172a,#1e293b)', padding:'28px 20px', display:'flex', flexDirection:'column', alignItems:'center', minHeight:300, animation:'fadeIn 0.35s ease' }}>
      <div style={{ width:50,height:50,borderRadius:14,background:'#1e293b',border:'1px solid #334155',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:14 }}>⚙️</div>
      <div style={{ fontSize:18,fontWeight:800,color:'#fff',marginBottom:4 }}>Admin Access</div>
      <div style={{ fontSize:12,color:'#475569',marginBottom:20 }}>Enter your 4-digit PIN</div>
      <div style={{ display:'flex',gap:10,marginBottom:22 }}>
        {[1,2,3,4].map(i=><div key={i} style={{ width:12,height:12,borderRadius:'50%',background:i<=2?'#3b82f6':'#1e293b',border:'1px solid #334155' }}/>)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3" style={{gap:8,width:'100%',maxWidth:230}}>
        {[1,2,3,4,5,6,7,8,9,'',0,'DEL'].map((k,i)=>(
          <div key={i} style={{ background:k===''?'transparent':'#1e293b',border:k===''?'none':'1px solid #334155',borderRadius:10,padding:'11px 8px',textAlign:'center',fontSize:15,fontWeight:700,color:k==='DEL'?'#64748b':'#fff',cursor:k===''?'default':'pointer' }}>{k}</div>
        ))}
      </div>
    </div>
  )
  if (feature.isSettings) return (
    <div style={{ background:'#0f172a',padding:'18px 16px',minHeight:300,animation:'fadeIn 0.35s ease' }}>
      <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:14,paddingBottom:12,borderBottom:'1px solid #1e293b' }}>
        <div style={{ width:32,height:32,borderRadius:9,background:'#1e40af',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15 }}>🖥️</div>
        <span style={{ fontSize:13,fontWeight:700,color:'#fff' }}>Door Display Settings</span>
        <span style={{ marginLeft:'auto',color:'#475569',cursor:'pointer',fontSize:14 }}>✕</span>
      </div>
      <div style={{ display:'flex',gap:4,marginBottom:14 }}>
        {['Room','Display','Booking','System'].map(t=>(
          <div key={t} onClick={()=>setSettingsTab(t)} style={{ flex:1,padding:'6px 3px',borderRadius:7,textAlign:'center',fontSize:9,fontWeight:700,color:settingsTab===t?'#fff':'#475569',background:settingsTab===t?'#1e3a5f':'transparent',border:settingsTab===t?'1.5px solid #3b82f6':'1px solid transparent',cursor:'pointer',transition:'all 0.2s' }}>{t}</div>
        ))}
      </div>
      {settingsTab==='Room'&&<div style={{ animation:'fadeIn 0.2s ease' }}>
        {[['Focus Room','4 seats · Floor 1','#3b82f6',false],['Team Room','8 seats · Floor 1','#00c07a',true],['Conference','12 seats · Floor 1','#f59e0b',false],['Board Room','20 seats · Floor 1','#8b5cf6',false]].map(([n,s,c,a])=>(
          <div key={n} style={{ padding:'9px 10px',borderRadius:8,border:`1px solid ${a?'#3b82f6':'#1e293b'}`,marginBottom:5,background:a?'#0c1a2e':'transparent',display:'flex',alignItems:'center',gap:8 }}>
            <div style={{ width:8,height:8,borderRadius:'50%',background:c }}/><div style={{ flex:1 }}><div style={{ fontSize:11,fontWeight:700,color:'#fff' }}>{n}</div><div style={{ fontSize:9,color:'#475569' }}>{s}</div></div>
            {a&&<span style={{ fontSize:9,color:'#3b82f6',fontWeight:700 }}>Active</span>}
          </div>
        ))}
      </div>}
      {settingsTab==='Display'&&<div style={{ animation:'fadeIn 0.2s ease' }}>
        {[['Auto (status-based)','Red when busy, green when free',true],['Always Dark','Dark background always',false]].map(([l,s,sel])=>(
          <div key={l} style={{ padding:'9px 10px',borderRadius:8,border:`1px solid ${sel?'#3b82f6':'#1e293b'}`,marginBottom:5,background:sel?'#0c1a2e':'transparent',display:'flex',alignItems:'center',gap:8 }}>
            <div style={{ width:12,height:12,borderRadius:'50%',border:`2px solid ${sel?'#3b82f6':'#334155'}`,display:'flex',alignItems:'center',justifyContent:'center' }}>{sel&&<div style={{ width:5,height:5,borderRadius:'50%',background:'#3b82f6' }}/>}</div>
            <div><div style={{ fontSize:11,fontWeight:700,color:'#fff' }}>{l}</div><div style={{ fontSize:9,color:'#475569' }}>{s}</div></div>
          </div>
        ))}
      </div>}
      {settingsTab==='Booking'&&<div style={{ animation:'fadeIn 0.2s ease' }}>
        {[['Allow Quick Booking','Book directly from this display'],['Allow Guest Booking','Visitors book without an account']].map(([l,s])=>(
          <div key={l} style={{ padding:'10px',borderRadius:8,border:'1px solid #1e293b',marginBottom:7,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <div><div style={{ fontSize:12,fontWeight:700,color:'#fff' }}>{l}</div><div style={{ fontSize:10,color:'#475569',marginTop:2 }}>{s}</div></div>
            <div style={{ width:30,height:17,borderRadius:9,background:'#3b82f6',position:'relative',flexShrink:0,marginLeft:8 }}><div style={{ width:13,height:13,borderRadius:'50%',background:'#fff',position:'absolute',right:2,top:2 }}/></div>
          </div>
        ))}
      </div>}
      {settingsTab==='System'&&<div style={{ animation:'fadeIn 0.2s ease' }}>
        <div style={{ display:'flex',gap:5,marginBottom:12 }}>
          {['30s','1 min','2 min','5 min'].map(t=>(
            <div key={t} style={{ flex:1,padding:'8px 3px',borderRadius:7,background:t==='1 min'?'#1e3a5f':'#1e293b',border:`1px solid ${t==='1 min'?'#3b82f6':'#334155'}`,textAlign:'center',fontSize:9,color:t==='1 min'?'#fff':'#64748b',fontWeight:700,cursor:'pointer' }}>{t}</div>
          ))}
        </div>
      </div>}
    </div>
  )
  return (
    <div style={{ display:'grid',gridTemplateColumns:'42% 58%',minHeight:300,animation:'fadeIn 0.35s ease' }}>
      <div style={{ background:'#0f172a',padding:'16px 14px',display:'flex',flexDirection:'column' }}>
        <div style={{ display:'flex',justifyContent:'space-between',marginBottom:14 }}>
          <div style={{ fontSize:9,color:'#334155',fontWeight:600 }}>Fri, Mar 27</div>
          <div style={{ fontSize:11,color:'#334155' }}>⚙</div>
        </div>
        <div style={{ fontSize:18,fontWeight:900,color:'#fff',lineHeight:1.1,marginBottom:10,letterSpacing:-0.5 }}>{feature.roomName}</div>
        <div style={{ display:'inline-flex',alignItems:'center',gap:5,background:`${feature.statusColor}22`,border:`1px solid ${feature.statusColor}44`,borderRadius:7,padding:'4px 9px',marginBottom:10,width:'fit-content' }}>
          <div style={{ width:6,height:6,borderRadius:'50%',background:feature.statusColor,animation:'pulse 2s infinite' }}/>
          <span style={{ fontSize:11,fontWeight:800,color:feature.statusColor }}>{feature.statusLabel}</span>
        </div>
        {feature.detailLabel&&<div style={{ fontSize:8,color:'#334155',fontWeight:700,letterSpacing:'1px',marginBottom:3 }}>{feature.detailLabel}</div>}
        <div style={{ fontSize:12,fontWeight:700,color:'#e2e8f0',marginBottom:2 }}>{feature.detail}</div>
        {feature.detailSub&&<div style={{ fontSize:9,color:'#475569' }}>{feature.detailSub}</div>}
        <div style={{ marginTop:'auto' }}>
          <div style={{ display:'flex',flexWrap:'wrap',gap:3,marginBottom:8 }}>
            {['TV','Whiteboard','WiFi','A/C'].map(a=><div key={a} style={{ fontSize:7,color:'#334155',background:'#1e293b',border:'1px solid #263352',padding:'2px 5px',borderRadius:3,fontWeight:600 }}>{a}</div>)}
          </div>
          <div style={{ fontSize:17,fontWeight:900,color:'#fff',letterSpacing:-0.5 }}>{feature.time}</div>
        </div>
      </div>
      <div style={{ background:feature.bgRight,display:'flex',flexDirection:'column' }}>
        <div style={{ padding:'12px 12px 6px',fontSize:8,fontWeight:700,color:'rgba(255,255,255,0.5)',letterSpacing:'1.5px' }}>SCHEDULE</div>
        <div style={{ flex:1,padding:'0 12px' }}>
          {!feature.schedule
            ?<div style={{ fontSize:11,color:'rgba(255,255,255,0.45)',marginTop:16 }}>No meetings scheduled today</div>
            :<div style={{ background:'rgba(255,255,255,0.15)',borderRadius:7,padding:'9px 10px' }}>
              <div style={{ fontSize:9,color:'rgba(255,255,255,0.65)',fontWeight:700,marginBottom:3 }}>{feature.schedule.time}</div>
              <div style={{ fontSize:12,fontWeight:800,color:'#fff' }}>{feature.schedule.title}</div>
              <div style={{ fontSize:9,color:'rgba(255,255,255,0.55)',marginTop:3 }}>sarah@acme.com · {feature.schedule.people}</div>
            </div>}
        </div>
        <div style={{ padding:'8px',borderTop:'rgba(0,0,0,0.15) 1px solid',background:'rgba(0,0,0,0.1)',display:'flex',gap:5,justifyContent:'flex-end' }}>
          {feature.actions.map((a,i)=>(
            <div key={a} style={{ padding:'5px 8px',borderRadius:6,background:i===0?'#fff':'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.2)',fontSize:9,fontWeight:700,color:i===0?'#0f172a':'#fff',cursor:'pointer',whiteSpace:'nowrap' }}>{a}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DoorDisplay() {
  const { openModal } = useModal()
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [settingsTab, setSettingsTab] = useState('Room')
  const intervalRef = useRef(null)
  const progressRef = useRef(null)
  const startTimeRef = useRef(Date.now())

  const startProgress = (idx) => {
    clearInterval(intervalRef.current); clearInterval(progressRef.current)
    setProgress(0); startTimeRef.current = Date.now()
    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now()-startTimeRef.current)/PROGRESS_DURATION)*100,100))
    }, 30)
    intervalRef.current = setTimeout(() => {
      const next=(idx+1)%DOOR_FEATURES.length; setActive(next)
      if(next===4)setSettingsTab('Room'); startProgress(next)
    }, PROGRESS_DURATION)
  }
  useEffect(() => { startProgress(0); return ()=>{ clearInterval(intervalRef.current); clearInterval(progressRef.current) } }, [])

  return (
    <>
      <SEO {...PAGE_SEO.platformDoorDisplay} />
      <main style={{ paddingTop:64, fontFamily:'Inter,sans-serif' }}>

      {/* HERO */}
      <section style={{ background:'#060d1a', borderBottom:'1px solid #1e293b', padding:'100px 0 80px', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute', top:'10%', left:'10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.10),transparent 70%)', animation:'orbFloat1 8s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'5%', right:'5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(15,121,155,0.10),transparent 70%)', animation:'orbFloat2 10s ease-in-out infinite 2s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:200, background:'linear-gradient(0deg,#060d1a,transparent)', pointerEvents:'none' }} />
        <div className="container" style={{ position:'relative', textAlign:'center' }}>
          <span className="tag animate-fade-up" style={{ color:'#3b82f6' }}>Platform</span>
          <h1 className="animate-fade-up delay-1" style={{ fontSize:'clamp(36px,5vw,64px)', fontWeight:900, letterSpacing:'-2.5px', lineHeight:1.05, color:'#fff', marginBottom:20, maxWidth:680, margin:'0 auto 20px' }}>
            Door Display <span style={{ background:'linear-gradient(135deg,#3b82f6,#0cb8b6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Panel</span>
          </h1>
          <p className="animate-fade-up delay-2" style={{ maxWidth:520, margin:'0 auto 40px', fontSize:17, color:'rgba(255,255,255,0.55)', lineHeight:1.7 }}>Real-time room status on any tablet. Let anyone book, check in, or extend a meeting — right from the door. No logins, no apps.</p>
          <div className="animate-fade-up delay-3" style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 0 40px rgba(59,130,246,0.35)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', borderRadius:8, fontSize:15, fontWeight:600, border:'1.5px solid rgba(255,255,255,0.2)', color:'#fff', textDecoration:'none', background:'rgba(255,255,255,0.06)', backdropFilter:'blur(8px)', transition:'all 0.2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.35)' }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)' }}>
              Try free for 14 days
            </a>
          </div>
        </div>
      </section>
      <section style={{ background:'linear-gradient(170deg,#eff6ff,#fff 60%,#f8fafc)', borderBottom:'1px solid #e2e8f0', padding:'88px 0 72px', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute',top:-80,right:-80,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.08),transparent 65%)',pointerEvents:'none' }}/>
        <div className="container" style={{ position:'relative' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{gap:64, alignItems:'center'}}>
            <div>
              <span className="tag animate-fade-up">Platform</span>
              <h1 className="h1 animate-fade-up delay-1" style={{ fontSize:'clamp(30px,4vw,52px)', marginBottom:20 }}>
                Door Display <span style={{ background:'linear-gradient(135deg,#3b82f6,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>Panels</span>
              </h1>
              <p className="lead animate-fade-up delay-2" style={{ marginBottom:36 }}>Mount any iPad or Android tablet outside every meeting room. Live status, instant booking, guest access — no login required.</p>
              <div className="animate-fade-up delay-3" style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo →</button>
                <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free</a>
              </div>
              <div className="animate-fade-up delay-4" style={{ display:'flex', gap:12, marginTop:36, flexWrap:'wrap' }}>
                {[['Any tablet','iPad, Android, Fire'],['No login','Guests book directly'],['Works offline','Auto-reconnects']].map(([t,s])=>(
                  <div key={t} style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:6,height:6,borderRadius:'50%',background:'#00c07a' }}/>
                    <div><div style={{ fontSize:12,fontWeight:700,color:'#0f172a' }}>{t}</div><div style={{ fontSize:11,color:'#94a3b8' }}>{s}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-up delay-2" style={{ position:'relative' }}>
              <div style={{ background:'#1a1a2e',borderRadius:28,padding:'16px 12px 14px',boxShadow:'0 40px 100px rgba(0,0,0,0.45), inset 0 0 0 2px rgba(255,255,255,0.05)',maxWidth:320,margin:'0 auto' }}>
                <div style={{ width:7,height:7,borderRadius:'50%',background:'#2d2d4e',margin:'0 auto 9px',border:'1px solid #333' }}/>
                <div style={{ borderRadius:13,overflow:'hidden',background:'#0f172a' }}>
                  <TabletScreen feature={DOOR_FEATURES[active]} settingsTab={settingsTab} setSettingsTab={setSettingsTab}/>
                </div>
                <div style={{ width:30,height:3,borderRadius:2,background:'#2d2d4e',margin:'9px auto 0' }}/>
              </div>
              <div style={{ position:'absolute',top:-14,right:10,background:'#fff',border:'1px solid #e2e8f0',borderRadius:10,padding:'6px 12px',display:'flex',alignItems:'center',gap:6,boxShadow:'0 4px 20px rgba(0,0,0,0.1)',fontSize:11,fontWeight:700,color:'#0f172a',animation:'float 4s ease-in-out infinite' }}>
                <div style={{ width:8,height:8,borderRadius:'50%',background:DOOR_FEATURES[active].statusColor,animation:'pulse 2s infinite' }}/>
                {DOOR_FEATURES[active].label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section style={{ padding:'88px 0', background:'linear-gradient(170deg,#f8fafc,#fff)', borderBottom:'1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <span className="tag reveal">Interactive Demo</span>
            <h2 className="h2 reveal">Every state, <span style={{ background:'linear-gradient(135deg,#3b82f6,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>purpose-built</span></h2>
            <p className="body reveal" style={{ color:'#64748b', maxWidth:400, margin:'12px auto 0' }}>Click each state to see exactly what your team sees outside every room.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{gap:64, alignItems:'center'}}>
            <div>
              {DOOR_FEATURES.map((f,i)=>(
                <div key={i} onClick={()=>{ setActive(i); if(i===4)setSettingsTab('Room'); startProgress(i) }}
                  style={{ background:active===i?'#fff':'transparent', border:`1px solid ${active===i?'#e2e8f0':'transparent'}`, borderRadius:14, padding:active===i?'16px 18px':'12px 18px', cursor:'pointer', transition:'all 0.25s', boxShadow:active===i?'0 4px 20px rgba(0,0,0,0.07)':'none', position:'relative', overflow:'hidden', marginBottom:8 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:36,height:36,borderRadius:10,background:active===i?'#f8fafc':'#f1f5f9',border:`1px solid ${active===i?'#e2e8f0':'transparent'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0 }}>{f.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14,fontWeight:700,color:active===i?'#0f172a':'#64748b' }}>{f.title}</div>
                      {active===i&&<div style={{ fontSize:13,color:'#64748b',lineHeight:1.6,marginTop:4,animation:'fadeIn 0.3s ease' }}>{f.desc}</div>}
                    </div>
                  </div>
                  {active===i&&<div style={{ position:'absolute',bottom:0,left:0,right:0,height:3,background:'#f1f5f9',borderRadius:'0 0 14px 14px',overflow:'hidden' }}>
                    <div style={{ height:'100%',width:`${progress}%`,background:`linear-gradient(90deg,${f.statusColor||'#3b82f6'},${f.statusColor||'#3b82f6'}cc)`,transition:'width 0.03s linear' }}/>
                  </div>}
                </div>
              ))}
            </div>
            <div style={{ position:'relative' }}>
              <div style={{ background:'#1a1a2e',borderRadius:28,padding:'16px 12px 14px',boxShadow:'0 40px 100px rgba(0,0,0,0.45), inset 0 0 0 2px rgba(255,255,255,0.05)' }}>
                <div style={{ width:7,height:7,borderRadius:'50%',background:'#2d2d4e',margin:'0 auto 9px',border:'1px solid #333' }}/>
                <div style={{ borderRadius:13,overflow:'hidden',background:'#0f172a' }}>
                  <TabletScreen feature={DOOR_FEATURES[active]} settingsTab={settingsTab} setSettingsTab={setSettingsTab}/>
                </div>
                <div style={{ width:30,height:3,borderRadius:2,background:'#2d2d4e',margin:'9px auto 0' }}/>
              </div>
              <div style={{ position:'absolute',top:-14,right:-10,background:'#fff',border:'1px solid #e2e8f0',borderRadius:10,padding:'6px 12px',display:'flex',alignItems:'center',gap:6,boxShadow:'0 4px 20px rgba(0,0,0,0.1)',fontSize:11,fontWeight:700,color:'#0f172a',animation:'float 4s ease-in-out infinite' }}>
                <div style={{ width:8,height:8,borderRadius:'50%',background:DOOR_FEATURES[active].statusColor,animation:'pulse 2s infinite' }}/>
                {DOOR_FEATURES[active].label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'80px 0', borderBottom:'1px solid #e2e8f0', background:'#fff' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <span className="tag reveal">Features</span>
            <h2 className="h2 reveal">Everything a <span style={{ background:'linear-gradient(135deg,#3b82f6,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>door panel needs</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{gap:16}}>
            {[
              { title:'Works on any tablet',   desc:'iPad, Android, Amazon Fire — any modern tablet. No special hardware.', icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#eff6ff"/><rect x="11" y="5" width="18" height="30" rx="3" fill="#3b82f6" opacity="0.15"/><rect x="11" y="5" width="18" height="30" rx="3" stroke="#3b82f6" strokeWidth="1.5"/><rect x="13" y="8" width="14" height="3" rx="0.5" fill="#3b82f6" opacity="0.4"/><circle cx="20" cy="30" r="2" fill="#3b82f6" opacity="0.5"/></svg> },
              { title:'No login required',      desc:'Anyone can book, check in, or extend a meeting directly from the panel.', icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#ecfdf5"/><circle cx="20" cy="18" r="6" fill="#00c07a" opacity="0.2"/><circle cx="20" cy="18" r="6" stroke="#00c07a" strokeWidth="1.5"/><path d="M14 30c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#00c07a" strokeWidth="1.5" strokeLinecap="round" fill="none"/><path d="M16 18l3 3 5-5" stroke="#00c07a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { title:'Auto no-show release',   desc:'No check-in within 15 mins? Room automatically freed for others.', icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#fff7ed"/><circle cx="20" cy="20" r="9" fill="#f97316" opacity="0.1"/><circle cx="20" cy="20" r="9" stroke="#f97316" strokeWidth="1.5"/><path d="M20 14v6l4 3" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/></svg> },
              { title:'PIN-protected admin',    desc:'Settings locked behind a PIN — only authorised staff can change things.', icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#eff6ff"/><rect x="13" y="19" width="14" height="12" rx="2" fill="#3b82f6" opacity="0.15"/><rect x="13" y="19" width="14" height="12" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M15 19v-4a5 5 0 0110 0v4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20" cy="25" r="1.5" fill="#3b82f6"/></svg> },
              { title:'Works offline',          desc:'Shows last known status if connection drops. Auto-reconnects when back online.', icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#f5f3ff"/><path d="M10 24c3-5 7-7 10-7s7 2 10 7" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/><path d="M13 28c2-3 4-4 7-4s5 1 7 4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.65"/><circle cx="20" cy="31" r="2" fill="#8b5cf6"/></svg> },
              { title:'Real-time sync',         desc:'Updates the instant a booking is made or cancelled from anywhere in the system.', icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#ecfdf5"/><path d="M28 14A10 10 0 1112 26" stroke="#00c07a" strokeWidth="1.5" strokeLinecap="round"/><path d="M28 14v-4l-4 4" stroke="#00c07a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            ].map((f,i)=>(
              <div key={f.title} className="card reveal" style={{ animationDelay:`${i*0.08}s` }}>
                <div style={{ width:44,height:44,borderRadius:12,background:'#eff6ff',border:'1px solid #bfdbfe',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16 }}>{f.icon}</div>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:8,color:'#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize:13,color:'#64748b',lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'linear-gradient(135deg,#0a1628,#0f172a)', borderTop:'1px solid #1e293b', padding:'80px 0', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',top:-80,left:'50%',transform:'translateX(-50%)',width:600,height:300,background:'radial-gradient(ellipse,rgba(59,130,246,0.08),transparent 65%)',pointerEvents:'none' }}/>
        <div className="container" style={{ position:'relative' }}>
          <div style={{ marginBottom:16, display:'flex', justifyContent:'center' }}>
            <svg viewBox="0 0 80 80" width="72" height="72" fill="none"><rect width="80" height="80" rx="20" fill="#eff6ff"/><rect x="20" y="8" width="40" height="64" rx="6" fill="#3b82f6" opacity="0.15"/><rect x="20" y="8" width="40" height="64" rx="6" stroke="#3b82f6" strokeWidth="2"/><rect x="24" y="14" width="32" height="6" rx="1" fill="#3b82f6" opacity="0.4"/><rect x="24" y="24" width="32" height="7" rx="1" fill="#3b82f6" opacity="0.3"/><circle cx="56" cy="62" r="3" fill="#3b82f6" opacity="0.5"/></svg>
          </div>
          <h2 className="h2 reveal" style={{ marginBottom:14 }}>Put a display on <span style={{ background:'linear-gradient(135deg,#3b82f6,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>every room</span></h2>
          <p className="lead reveal" style={{ marginBottom:36, color:'#64748b' }}>Works on any tablet. Set up in under 5 minutes. No special hardware needed.</p>
          <div className="reveal" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Start free trial</a>
          </div>
        </div>
      </section>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </main>
  </>
  )
}
