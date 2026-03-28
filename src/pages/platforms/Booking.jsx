import React, { useState, useEffect, useRef } from 'react'
import { useModal } from '../../components/ModalContext'

const FEATURES = [
  { icon: '📅', title: 'Visual Time Grid', desc: 'See all rooms side by side in a live time grid. Click any slot to book instantly.', color: '#ecfdf5', border: '#a7f3d0' },
  { icon: '✨', title: 'AI Room Booker', desc: 'Describe what you need in plain language. AI picks the best available room automatically.', color: '#fefce8', border: '#fde68a' },
  { icon: '🏷️', title: 'Booking Tags', desc: 'Tag bookings as Client Meeting, Training, All-Hands, Interview. Filter and analyse by tag.', color: '#f5f3ff', border: '#ddd6fe' },
  { icon: '⏱️', title: '15-min Buffer', desc: 'Automatic gap between meetings so rooms are always ready for the next booking.', color: '#fff7ed', border: '#fed7aa' },
  { icon: '🔵', title: 'Zoom Meeting Links', desc: 'Every booking automatically gets a Zoom meeting link. No manual setup needed.', color: '#eff6ff', border: '#bfdbfe' },
  { icon: '🔗', title: 'iCal Feed per Room', desc: "Subscribe to any room's live calendar in Google or Outlook.", color: '#fdf2f8', border: '#fbcfe8' },
  { icon: '📧', title: 'Email Confirmations', desc: 'Instant booking confirmations sent to organisers and attendees with all details.', color: '#ecfdf5', border: '#a7f3d0' },
  { icon: '🚫', title: 'No-show Auto-release', desc: "If no one checks in within 15 minutes, the room is automatically freed.", color: '#fff1f2', border: '#fecdd3' },
]

const DOOR_FEATURES = [
  {
    icon: '🟢',
    label: 'Free Room',
    title: "Instantly see what's available",
    desc: 'The display turns green and shows "Free" with a full-day schedule. Anyone can walk up and book directly — no login needed.',
    statusLabel: 'Free', statusColor: '#00c07a',
    bgRight: 'linear-gradient(160deg,#00c07a,#009960)',
    roomName: 'Conference Room',
    detail: 'Available all day', detailLabel: null,
    schedule: null,
    actions: ['Book Now', 'Guest Booking'],
    time: '10:30 AM',
  },
  {
    icon: '🟡',
    label: 'Starts Soon',
    title: 'Never get caught off-guard',
    desc: 'Amber alert shows the upcoming meeting and start time. The current occupant knows to wrap up — no awkward interruptions.',
    statusLabel: 'Starts Soon', statusColor: '#f59e0b',
    bgRight: 'linear-gradient(160deg,#f59e0b,#d97706)',
    roomName: 'Conference Room',
    detail: 'Team Standup', detailLabel: 'NEXT UP',
    detailSub: 'Starts 11:00 AM · sarah@acme.com',
    schedule: { title: 'Team Standup', time: '11:00 AM  –  11:30 AM', people: '5 people' },
    actions: ['Book Now', 'Guest Booking'],
    time: '10:55 AM',
  },
  {
    icon: '🔴',
    label: 'In Use',
    title: 'Extend or end meetings on the spot',
    desc: 'Red panel shows the live meeting. Staff can extend by 15 mins or end early directly from the panel — no need to log in anywhere.',
    statusLabel: 'In Use', statusColor: '#ef4444',
    bgRight: 'linear-gradient(160deg,#ef4444,#dc2626)',
    roomName: 'Conference Room',
    detail: 'Team Standup', detailLabel: 'CURRENT MEETING',
    detailSub: '11:00 AM – 11:30 AM · sarah@acme.com · 5 people',
    schedule: { title: 'Team Standup', time: '11:00 AM  –  11:30 AM', people: '5 people' },
    actions: ['End Now', '+15 min', 'Guest Booking'],
    time: '11:05 AM',
  },
  {
    icon: '🔒',
    label: 'PIN Admin Access',
    title: 'PIN-protected settings entry',
    desc: "Tap the settings gear and a PIN pad appears. Only authorised admins can access configuration — guests can't accidentally change settings.",
    isPin: true,
    statusLabel: 'Admin', statusColor: '#3b82f6',
    time: '11:05 AM',
  },
  {
    icon: '⚙️',
    label: '4-Tab Settings',
    title: 'Full control from the display itself',
    desc: 'Room, Display, Booking and System tabs let you configure everything on-device — themes, visibility, booking permissions, and refresh intervals.',
    isSettings: true,
    statusLabel: 'Settings', statusColor: '#3b82f6',
    time: '11:05 AM',
  },
]

const PROGRESS_DURATION = 4000 // ms per tab

function TabletScreen({ feature, settingsTab, setSettingsTab }) {
  if (feature.isPin) {
    return (
      <div style={{ background: 'linear-gradient(160deg,#0f172a,#1e293b)', padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 300, animation: 'fadeIn 0.35s ease' }}>
        <div style={{ width: 50, height: 50, borderRadius: 14, background: '#1e293b', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 14 }}>⚙️</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Admin Access</div>
        <div style={{ fontSize: 12, color: '#475569', marginBottom: 20 }}>Enter your 4-digit PIN</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i <= 2 ? '#3b82f6' : '#1e293b', border: '1px solid #334155', transition: 'background 0.2s' }} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, width: '100%', maxWidth: 230 }}>
          {[1,2,3,4,5,6,7,8,9,'',0,'DEL'].map((k,i) => (
            <div key={i} style={{ background: k==='' ? 'transparent' : '#1e293b', border: k==='' ? 'none' : '1px solid #334155', borderRadius: 10, padding: '11px 8px', textAlign: 'center', fontSize: 15, fontWeight: 700, color: k==='DEL'?'#64748b':'#fff', cursor: k===''?'default':'pointer', transition: 'background 0.15s' }}>{k}</div>
          ))}
        </div>
      </div>
    )
  }

  if (feature.isSettings) {
    return (
      <div style={{ background: '#0f172a', padding: '18px 16px', minHeight: 300, animation: 'fadeIn 0.35s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #1e293b' }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🖥️</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Door Display Settings</span>
          <span style={{ marginLeft: 'auto', color: '#475569', cursor: 'pointer', fontSize: 14 }}>✕</span>
        </div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
          {['Room','Display','Booking','System'].map(t => (
            <div key={t} onClick={() => setSettingsTab(t)} style={{ flex: 1, padding: '6px 3px', borderRadius: 7, textAlign: 'center', fontSize: 9, fontWeight: 700, color: settingsTab===t?'#fff':'#475569', background: settingsTab===t?'#1e3a5f':'transparent', border: settingsTab===t?'1.5px solid #3b82f6':'1px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>{t}</div>
          ))}
        </div>
        {settingsTab === 'Room' && (
          <div style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ fontSize: 8, color: '#475569', fontWeight: 700, letterSpacing: '1px', marginBottom: 7 }}>SELECT ROOM</div>
            {[['Focus Room','4 seats · Floor 1','#3b82f6',false],['Team Room','8 seats · Floor 1','#00c07a',true],['Conference Room','12 seats · Floor 1','#f59e0b',false],['Board Room','20 seats · Floor 1','#8b5cf6',false]].map(([n,s,c,active])=>(
              <div key={n} style={{ padding:'9px 10px', borderRadius:8, border:`1px solid ${active?'#3b82f6':'#1e293b'}`, marginBottom:5, background:active?'#0c1a2e':'transparent', display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:c, flexShrink:0 }}/>
                <div style={{ flex:1 }}><div style={{ fontSize:11, fontWeight:700, color:'#fff' }}>{n}</div><div style={{ fontSize:9, color:'#475569' }}>{s}</div></div>
                {active && <span style={{ fontSize:9, color:'#3b82f6', fontWeight:700 }}>Active</span>}
              </div>
            ))}
          </div>
        )}
        {settingsTab === 'Display' && (
          <div style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ fontSize: 8, color: '#475569', fontWeight: 700, letterSpacing: '1px', marginBottom: 7 }}>THEME</div>
            {[['Auto (status-based)','Red when busy, green when free',true],['Always Dark','Dark background always',false]].map(([l,s,sel])=>(
              <div key={l} style={{ padding:'9px 10px', borderRadius:8, border:`1px solid ${sel?'#3b82f6':'#1e293b'}`, marginBottom:5, background:sel?'#0c1a2e':'transparent', display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:12, height:12, borderRadius:'50%', border:`2px solid ${sel?'#3b82f6':'#334155'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{sel&&<div style={{ width:5, height:5, borderRadius:'50%', background:'#3b82f6' }}/>}</div>
                <div><div style={{ fontSize:11, fontWeight:700, color:'#fff' }}>{l}</div><div style={{ fontSize:9, color:'#475569' }}>{s}</div></div>
              </div>
            ))}
            <div style={{ fontSize: 8, color: '#475569', fontWeight: 700, letterSpacing: '1px', margin: '10px 0 7px' }}>VISIBILITY</div>
            {["Show Today's Schedule","Show Room Amenities","Show Capacity"].map(l=>(
              <div key={l} style={{ padding:'8px 10px', borderRadius:8, border:'1px solid #1e293b', marginBottom:5, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:11, color:'#e2e8f0', fontWeight:500 }}>{l}</span>
                <div style={{ width:28, height:16, borderRadius:8, background:'#3b82f6', position:'relative', flexShrink:0 }}><div style={{ width:12, height:12, borderRadius:'50%', background:'#fff', position:'absolute', right:2, top:2 }}/></div>
              </div>
            ))}
          </div>
        )}
        {settingsTab === 'Booking' && (
          <div style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ fontSize: 8, color: '#475569', fontWeight: 700, letterSpacing: '1px', marginBottom: 7 }}>BOOKING PERMISSIONS</div>
            {[['Allow Quick Booking','Users can book directly from this display'],['Allow Guest Booking','Visitors can book without an account']].map(([l,s])=>(
              <div key={l} style={{ padding:'10px', borderRadius:8, border:'1px solid #1e293b', marginBottom:7, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div><div style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{l}</div><div style={{ fontSize:10, color:'#475569', marginTop:2 }}>{s}</div></div>
                <div style={{ width:30, height:17, borderRadius:9, background:'#3b82f6', position:'relative', flexShrink:0, marginLeft:8 }}><div style={{ width:13, height:13, borderRadius:'50%', background:'#fff', position:'absolute', right:2, top:2 }}/></div>
              </div>
            ))}
          </div>
        )}
        {settingsTab === 'System' && (
          <div style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ fontSize: 8, color: '#475569', fontWeight: 700, letterSpacing: '1px', marginBottom: 7 }}>AUTO REFRESH INTERVAL</div>
            <div style={{ display:'flex', gap:5, marginBottom:12 }}>
              {['30s','1 min','2 min','5 min'].map(t=>(
                <div key={t} style={{ flex:1, padding:'8px 3px', borderRadius:7, background:t==='1 min'?'#1e3a5f':'#1e293b', border:`1px solid ${t==='1 min'?'#3b82f6':'#334155'}`, textAlign:'center', fontSize:9, color:t==='1 min'?'#fff':'#64748b', fontWeight:700, cursor:'pointer' }}>{t}</div>
              ))}
            </div>
            <div style={{ padding:'9px 10px', borderRadius:8, border:'1px solid #1e293b', marginBottom:7, display:'flex', alignItems:'center', gap:6, cursor:'pointer' }}>
              <span style={{ fontSize:13 }}>🔄</span><span style={{ fontSize:11, color:'#e2e8f0', fontWeight:600 }}>Reload Display</span>
            </div>
            <div style={{ padding:'9px 10px', borderRadius:8, border:'1px solid rgba(239,68,68,0.3)', background:'rgba(239,68,68,0.06)', display:'flex', alignItems:'center', gap:6, cursor:'pointer' }}>
              <span style={{ fontSize:13 }}>🗑️</span><span style={{ fontSize:11, color:'#ef4444', fontWeight:700 }}>Reset Setup (Clear Room & PIN)</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Normal status display
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '42% 58%', minHeight: 300, animation: 'fadeIn 0.35s ease' }}>
      <div style={{ background: '#0f172a', padding: '16px 14px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 9, color: '#334155', fontWeight: 600 }}>Fri, Mar 27</div>
          <div style={{ display: 'flex', gap: 6, fontSize: 11, color: '#334155' }}>⤢ ⌂ ⚙</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 10, letterSpacing: -0.5 }}>{feature.roomName}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${feature.statusColor}22`, border: `1px solid ${feature.statusColor}44`, borderRadius: 7, padding: '4px 9px', marginBottom: 10, width: 'fit-content' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: feature.statusColor, animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: feature.statusColor }}>{feature.statusLabel}</span>
        </div>
        {feature.detailLabel && <div style={{ fontSize: 8, color: '#334155', fontWeight: 700, letterSpacing: '1px', marginBottom: 3 }}>{feature.detailLabel}</div>}
        <div style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0', marginBottom: 2 }}>{feature.detail}</div>
        {feature.detailSub && <div style={{ fontSize: 9, color: '#475569' }}>{feature.detailSub}</div>}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 8 }}>
            {['TV','Whiteboard','WiFi','A/C'].map(a => <div key={a} style={{ fontSize: 7, color: '#334155', background: '#1e293b', border: '1px solid #263352', padding: '2px 5px', borderRadius: 3, fontWeight: 600 }}>{a}</div>)}
          </div>
          <div style={{ fontSize: 17, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>{feature.time}</div>
        </div>
      </div>
      <div style={{ background: feature.bgRight, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 12px 6px', fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px' }}>SCHEDULE</div>
        <div style={{ flex: 1, padding: '0 12px' }}>
          {!feature.schedule
            ? <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 16 }}>No meetings scheduled today</div>
            : <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 7, padding: '9px 10px' }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', fontWeight: 700, marginBottom: 3 }}>{feature.schedule.time}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{feature.schedule.title}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>sarah@acme.com · 👥 {feature.schedule.people}</div>
              </div>
          }
        </div>
        <div style={{ padding: '8px', borderTop: 'rgba(0,0,0,0.15) 1px solid', background: 'rgba(0,0,0,0.1)', display: 'flex', gap: 5, justifyContent: 'flex-end' }}>
          {feature.actions.map((a, i) => (
            <div key={a} style={{ padding: '5px 8px', borderRadius: 6, background: i===0?'#fff':'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', fontSize: 9, fontWeight: 700, color: i===0?'#0f172a':'#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {a==='Book Now'&&'📅 '}{a==='End Now'&&'⊗ '}{a==='+15 min'&&'⊕ '}{a==='Guest Booking'&&'👤 '}{a}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DoorDisplaySection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [settingsTab, setSettingsTab] = useState('Room')
  const intervalRef = useRef(null)
  const progressRef = useRef(null)
  const startTime = useRef(Date.now())

  const startProgress = (idx) => {
    clearInterval(intervalRef.current)
    clearInterval(progressRef.current)
    setProgress(0)
    startTime.current = Date.now()
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime.current
      const pct = Math.min((elapsed / PROGRESS_DURATION) * 100, 100)
      setProgress(pct)
    }, 30)
    intervalRef.current = setTimeout(() => {
      const next = (idx + 1) % DOOR_FEATURES.length
      setActive(next)
      if (next === 4) setSettingsTab('Room')
      startProgress(next)
    }, PROGRESS_DURATION)
  }

  useEffect(() => {
    startProgress(0)
    return () => { clearInterval(intervalRef.current); clearInterval(progressRef.current) }
  }, [])

  const handleClick = (i) => {
    setActive(i)
    if (i === 4) setSettingsTab('Room')
    startProgress(i)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
      {/* LEFT — feature list */}
      <div>
        <span className="tag reveal">Door Display</span>
        <h2 className="h2 reveal" style={{ marginBottom: 8 }}>Smart panels on <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>every room</span></h2>
        <p className="body reveal" style={{ marginBottom: 32, color: '#64748b' }}>Mount any iPad or Android outside your meeting rooms. Status changes colour automatically — and every state is purpose-built.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DOOR_FEATURES.map((f, i) => (
            <div key={i} onClick={() => handleClick(i)}
              style={{ background: active===i ? '#fff' : 'transparent', border: `1px solid ${active===i ? '#e2e8f0' : 'transparent'}`, borderRadius: 14, padding: active===i ? '16px 18px' : '12px 18px', cursor: 'pointer', transition: 'all 0.25s cubic-bezier(.16,1,.3,1)', boxShadow: active===i ? '0 4px 20px rgba(0,0,0,0.07)' : 'none', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: active===i ? '#f8fafc' : '#f1f5f9', border: `1px solid ${active===i ? '#e2e8f0' : 'transparent'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, transition: 'all 0.25s' }}>{f.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: active===i ? '#0f172a' : '#64748b', transition: 'color 0.2s' }}>{f.title}</div>
                  {active === i && <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginTop: 4, animation: 'fadeIn 0.3s ease' }}>{f.desc}</div>}
                </div>
              </div>
              {/* Progress bar */}
              {active === i && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#f1f5f9', borderRadius: '0 0 14px 14px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${f.statusColor || '#00c07a'}, ${f.statusColor || '#00c07a'}cc)`, borderRadius: '0 0 14px 14px', transition: 'width 0.03s linear' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — iPad tablet with animated screen */}
      <div className="reveal" style={{ position: 'relative' }}>
        <div style={{ background: '#1a1a2e', borderRadius: 28, padding: '16px 12px 14px', boxShadow: '0 40px 100px rgba(0,0,0,0.45), inset 0 0 0 2px rgba(255,255,255,0.05)' }}>
          {/* Camera */}
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2d2d4e', margin: '0 auto 9px', border: '1px solid #333' }} />
          {/* Screen */}
          <div style={{ borderRadius: 13, overflow: 'hidden', background: '#0f172a' }}>
            <TabletScreen feature={DOOR_FEATURES[active]} settingsTab={settingsTab} setSettingsTab={setSettingsTab} />
          </div>
          {/* Home bar */}
          <div style={{ width: 30, height: 3, borderRadius: 2, background: '#2d2d4e', margin: '9px auto 0' }} />
        </div>
        {/* Floating label */}
        <div style={{ position: 'absolute', top: -14, right: -10, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 11, fontWeight: 700, color: '#0f172a', animation: 'float 4s ease-in-out infinite' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: DOOR_FEATURES[active].statusColor || '#00c07a', animation: 'pulse 2s infinite' }} />
          {DOOR_FEATURES[active].label}
        </div>
      </div>
    </div>
  )
}

// Analytics visual
function AnalyticsVisual() {
  const [hover, setHover] = useState(null)
  const bars = [{h:55,l:'Mon'},{h:78,l:'Tue'},{h:92,l:'Wed'},{h:71,l:'Thu'},{h:45,l:'Fri'},{h:18,l:'Sat'},{h:8,l:'Sun'}]
  return (
    <div style={{ background:'linear-gradient(160deg,#0f172a,#1a2744)', borderRadius:20, padding:28, boxShadow:'0 24px 60px rgba(0,0,0,0.25)', border:'1px solid #1e293b' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#475569', letterSpacing:'1px', textTransform:'uppercase' }}>Space Utilisation</div>
        <div style={{ fontSize:10, color:'#00c07a', fontWeight:600 }}>● Live</div>
      </div>
      <div style={{ display:'flex', gap:6, marginBottom:18 }}>
        {['This week','Last week','Monthly'].map((t,i)=>(
          <div key={t} style={{ padding:'4px 10px', borderRadius:6, fontSize:10, fontWeight:700, background:i===0?'rgba(0,192,122,0.15)':'transparent', color:i===0?'#00c07a':'#334155', border:i===0?'1px solid rgba(0,192,122,0.3)':'1px solid transparent', cursor:'pointer' }}>{t}</div>
        ))}
      </div>
      <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:100, marginBottom:6 }}>
        {bars.map((b,i)=>(
          <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, position:'relative' }}
            onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>
            {hover===i && <div style={{ position:'absolute', bottom:'100%', left:'50%', transform:'translateX(-50%)', background:'#fff', color:'#0f172a', fontSize:10, fontWeight:800, padding:'3px 8px', borderRadius:6, whiteSpace:'nowrap', marginBottom:4, boxShadow:'0 4px 12px rgba(0,0,0,0.2)' }}>{b.h}%</div>}
            <div style={{ width:'100%', height:`${b.h}%`, borderRadius:'5px 5px 0 0', background:i===2?'#00c07a':hover===i?'rgba(0,192,122,0.6)':'rgba(0,192,122,0.2)', transition:'all 0.25s', cursor:'pointer' }}/>
            <div style={{ fontSize:9, color:'#334155', fontWeight:600 }}>{b.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:16 }}>
        {[['72%','Avg Usage','#00c07a'],['340','Bookings','#3b82f6'],['18','No-shows','#f59e0b']].map(([v,l,c])=>(
          <div key={l} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'12px 10px', textAlign:'center' }}>
            <div style={{ fontSize:22, fontWeight:900, color:c, letterSpacing:-0.5, lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:9, color:'#475569', marginTop:4, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px' }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:16 }}>
        <div style={{ fontSize:9, fontWeight:700, color:'#334155', letterSpacing:'1px', marginBottom:8 }}>ROOMS BY UTILISATION</div>
        {[['Board Room','#8b5cf6',87],['Conference','#f59e0b',74],['Team Room','#10b981',62],['Focus Room','#3b82f6',45]].map(([n,c,p])=>(
          <div key={n} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:c, flexShrink:0 }}/>
            <div style={{ fontSize:10, color:'#94a3b8', width:80, flexShrink:0 }}>{n}</div>
            <div style={{ flex:1, height:4, borderRadius:2, background:'#1e293b' }}><div style={{ height:'100%', width:`${p}%`, borderRadius:2, background:c }}/></div>
            <div style={{ fontSize:10, fontWeight:700, color:c, width:28, textAlign:'right' }}>{p}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PlatformBooking() {
  const { openModal } = useModal()

  return (
    <main style={{ paddingTop:64, fontFamily:'Inter,sans-serif' }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{ background:'linear-gradient(170deg,#f0fdf8,#ffffff 55%,#f8fafc)', borderBottom:'1px solid #e2e8f0', padding:'88px 0 72px', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,192,122,0.10),transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,192,122,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,192,122,0.03) 1px,transparent 1px)', backgroundSize:'50px 50px', pointerEvents:'none' }}/>
        <div className="container" style={{ position:'relative', textAlign:'center' }}>
          <span className="tag animate-fade-up">Platform</span>
          <h1 className="h1 animate-fade-up delay-1" style={{ fontSize:'clamp(30px,4vw,52px)', marginBottom:20, maxWidth:600, margin:'0 auto 20px' }}>
            Room Booking <span style={{ background:'linear-gradient(135deg,#00c07a,#0090ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>System</span>
          </h1>
          <p className="lead animate-fade-up delay-2" style={{ marginBottom:36, maxWidth:520, margin:'0 auto 36px' }}>The complete meeting room booking platform. Visual time grid, smart suggestions, Zoom integration, door displays, and analytics — all in one place.</p>
          <div className="animate-fade-up delay-3" style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free</a>
          </div>
          <div className="animate-fade-up delay-5" style={{ maxWidth:760, margin:'48px auto 0', background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.09)' }}>
            <div style={{ background:'#f8fafc', padding:'11px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', gap:6 }}>
              {['#ff5f57','#febc2e','#28c840'].map(c=><div key={c} style={{ width:9, height:9, borderRadius:'50%', background:c }}/>)}
              <span style={{ fontSize:10, color:'#94a3b8', fontFamily:'DM Mono,monospace', marginLeft:8 }}>Book a Room · go.spaciohub.com</span>
              <div style={{ marginLeft:'auto', fontSize:10, color:'#00c07a', fontWeight:600 }}>● Live</div>
            </div>
            <div style={{ padding:18 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#0f172a' }}>Today's Availability</div>
                <div style={{ display:'flex', gap:6 }}>
                  <div style={{ padding:'4px 10px', borderRadius:6, background:'#f0fdf8', border:'1px solid #d1fae5', fontSize:10, color:'#00c07a', fontWeight:600 }}>✨ AI Book</div>
                  <div style={{ padding:'4px 10px', borderRadius:6, background:'#f8fafc', border:'1px solid #e2e8f0', fontSize:10, color:'#64748b', fontWeight:600 }}>Today ▾</div>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'80px repeat(8,1fr)', gap:3, marginBottom:6 }}>
                <div/>{['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM'].map(h=><div key={h} style={{ fontSize:9, color:'#cbd5e1', fontFamily:'DM Mono,monospace', textAlign:'center' }}>{h}</div>)}
              </div>
              {[{n:'Board Rm',c:'#8b5cf6',s:[0,1,1,0,0,1,0,0]},{n:'Team Rm',c:'#10b981',s:[1,0,0,1,1,0,0,1]},{n:'Focus Rm',c:'#3b82f6',s:[0,0,1,0,0,0,1,0]},{n:'Conf Rm',c:'#f59e0b',s:[1,1,0,0,1,1,0,0]}].map(r=>(
                <div key={r.n} style={{ display:'grid', gridTemplateColumns:'80px repeat(8,1fr)', gap:3, marginBottom:4 }}>
                  <div style={{ fontSize:10, color:'#94a3b8', display:'flex', alignItems:'center', gap:4 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:r.c, boxShadow:`0 0 4px ${r.c}` }}/>{r.n}
                  </div>
                  {r.s.map((bk,i)=><div key={i} style={{ height:26, borderRadius:4, background:bk?r.c+'22':'#f8fafc', borderLeft:bk?`2.5px solid ${r.c}`:'none' }}/>)}
                </div>
              ))}
              <div style={{ marginTop:12, padding:'10px 12px', background:'linear-gradient(135deg,#f0fdf8,#e8faf3)', borderRadius:10, border:'1px solid #d1fae5', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:16 }}>✨</span>
                <div style={{ fontSize:12, color:'#374151' }}><strong style={{ color:'#009960' }}>AI Suggestion:</strong> "Focus Room is free for your 1hr slot at 11AM — no conflicts"</div>
                <div style={{ marginLeft:'auto', padding:'4px 10px', background:'#00c07a', borderRadius:6, fontSize:10, fontWeight:700, color:'#fff', cursor:'pointer' }}>Book →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════ */}
      <section id="features" style={{ padding:'80px 0', borderBottom:'1px solid #e2e8f0', background:'#fff' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <span className="tag reveal">Features</span>
            <h2 className="h2 reveal">Everything in the <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>booking system</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
            {FEATURES.map((f,i)=>(
              <div key={f.title} className="reveal" style={{ animationDelay:`${i*0.06}s`, background:f.color, border:`1px solid ${f.border}`, borderRadius:16, padding:'24px 22px', transition:'transform 0.25s, box-shadow 0.25s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 16px 40px ${f.border}80`}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{ fontSize:28, marginBottom:14 }}>{f.icon}</div>
                <h3 style={{ fontSize:14, fontWeight:700, marginBottom:8, color:'#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize:13, color:'#64748b', lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DOOR DISPLAY — Crisp-style ════════════════════ */}
      <section id="door-display" style={{ padding:'88px 0', background:'linear-gradient(170deg,#f8fafc,#fff)', borderBottom:'1px solid #e2e8f0' }}>
        <div className="container">
          <DoorDisplaySection />
        </div>
      </section>

      {/* ══ ANALYTICS ═════════════════════════════════════ */}
      <section id="analytics" style={{ padding:'80px 0', borderBottom:'1px solid #e2e8f0', background:'#fff' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <span className="tag reveal">Analytics</span>
              <h2 className="h2 reveal" style={{ marginBottom:16 }}>Data-driven <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>space decisions</span></h2>
              <p className="body reveal" style={{ marginBottom:24 }}>Stop guessing. SpacioHub's live analytics reveal exactly how your spaces are being used so you can optimise with confidence and reduce wasted real estate costs.</p>
              <div className="check-list reveal">
                {['<strong>Peak hour heatmaps</strong> — see busiest times at a glance','<strong>No-show tracking</strong> — identify and reduce ghost bookings','<strong>Room utilisation rates</strong> — per room, per floor, per week','<strong>Tag-based breakdowns</strong> — analyse by meeting type','<strong>CSV export</strong> — bring data into your own BI tools'].map((c,i)=>(
                  <div key={i} className="check-item">
                    <div className="check-ic"><svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg></div>
                    <div className="check-text" dangerouslySetInnerHTML={{ __html:c }}/>
                  </div>
                ))}
              </div>
              <div className="reveal" style={{ marginTop:24 }}>
                <button className="btn btn-primary" onClick={openModal} style={{ boxShadow:'0 6px 20px rgba(0,192,122,0.3)' }}>See analytics demo →</button>
              </div>
            </div>
            <div className="reveal"><AnalyticsVisual /></div>
          </div>
        </div>
      </section>

      {/* ══ 1. CONFLICT PREVENTION ════════════════════════ */}
      <section style={{ padding:'80px 0', background:'#f8fafc', borderBottom:'1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <span className="tag reveal">Zero Double Bookings</span>
              <h2 className="h2 reveal" style={{ marginBottom:16 }}>
                <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>Real-time availability,</span> conflict prevention guaranteed
              </h2>
              <p className="body reveal" style={{ marginBottom:24 }}>SpacioHub locks slots the moment someone starts booking — so two people can never accidentally grab the same room at the same time. Ever.</p>
              <div className="check-list reveal">
                {['<strong>Live conflict detection</strong> — slots lock instantly, no race conditions','<strong>Day and week grid view</strong> — see all rooms side by side','<strong>15-minute buffer rules</strong> — automatic gaps between meetings','<strong>Two-way calendar sync</strong> — Microsoft 365 and Google Workspace stay in perfect sync','<strong>Multi-slot and multi-day</strong> — bulk book recurring meetings with one click'].map((item,i)=>(
                  <div key={i} className="check-item">
                    <div className="check-ic"><svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg></div>
                    <div className="check-text" dangerouslySetInnerHTML={{ __html:item }}/>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.08)' }}>
                <div style={{ padding:'14px 18px', borderBottom:'1px solid #f1f5f9', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:13, fontWeight:700, color:'#0f172a' }}>Room Availability — Today</span>
                  <span style={{ fontSize:11, color:'#00c07a', fontWeight:600 }}>● Live</span>
                </div>
                <div style={{ padding:'16px 18px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'90px repeat(8,1fr)', gap:4, marginBottom:8 }}>
                    <div/>{['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM'].map(h=><div key={h} style={{ fontSize:9, color:'#94a3b8', textAlign:'center', fontFamily:'DM Mono,monospace' }}>{h}</div>)}
                  </div>
                  {[{n:'Board Room',c:'#8b5cf6',s:[0,1,1,0,0,1,0,0]},{n:'Team Room',c:'#10b981',s:[1,0,0,1,1,0,0,1]},{n:'Focus Room',c:'#3b82f6',s:[0,0,1,0,0,0,1,0]},{n:'Conf Room',c:'#f59e0b',s:[1,1,0,0,1,1,0,0]}].map(r=>(
                    <div key={r.n} style={{ display:'grid', gridTemplateColumns:'90px repeat(8,1fr)', gap:4, marginBottom:6, alignItems:'center' }}>
                      <div style={{ fontSize:10, color:'#64748b', display:'flex', alignItems:'center', gap:5 }}>
                        <div style={{ width:6, height:6, borderRadius:'50%', background:r.c, flexShrink:0 }}/>{r.n}
                      </div>
                      {r.s.map((bk,i)=><div key={i} style={{ height:28, borderRadius:5, background:bk?r.c+'25':'#f8fafc', borderLeft:bk?'3px solid '+r.c:'none' }}/>)}
                    </div>
                  ))}
                  <div style={{ marginTop:14, padding:'10px 14px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10, display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:16 }}>⚠️</span>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:'#dc2626' }}>Conflict prevented</div>
                      <div style={{ fontSize:11, color:'#ef4444' }}>Board Room 11AM already booked — showing next available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. CHECK-IN / QR / AUTO-RELEASE ══════════════ */}
      <section style={{ padding:'80px 0', borderBottom:'1px solid #e2e8f0', background:'#fff' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div className="reveal">
              <div style={{ background:'linear-gradient(160deg,#0f172a,#1a2744)', borderRadius:20, padding:28, boxShadow:'0 24px 60px rgba(0,0,0,0.2)' }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#475569', letterSpacing:'1px', textTransform:'uppercase', marginBottom:16 }}>Check-in Flow</div>
                {[{time:'10:00',label:'Meeting starts',sub:'Booking confirmed · Board Room',color:'#00c07a',done:true},{time:'10:05',label:'QR check-in scanned',sub:'sarah@acme.com checked in ✓',color:'#00c07a',done:true},{time:'10:15',label:'Grace period ends',sub:'Auto-release cancelled — room in use',color:'#3b82f6',done:true},{time:'10:30',label:'No-show detected',sub:'No check-in → room auto-released 🔓',color:'#f59e0b',done:false}].map((s,i)=>(
                  <div key={i} style={{ display:'flex', gap:14, marginBottom:16 }}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                      <div style={{ width:10, height:10, borderRadius:'50%', background:s.done?s.color:'#1e293b', border:'2px solid '+s.color, flexShrink:0, marginTop:3 }}/>
                      {i<3 && <div style={{ width:1, height:32, background:'#1e293b', marginTop:4 }}/>}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:10, color:'#475569', fontFamily:'DM Mono,monospace', marginBottom:2 }}>{s.time} AM</div>
                      <div style={{ fontSize:13, fontWeight:700, color:'#e2e8f0' }}>{s.label}</div>
                      <div style={{ fontSize:11, color:'#475569', marginTop:2 }}>{s.sub}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop:8, padding:'14px', background:'#fff', borderRadius:12, display:'flex', alignItems:'center', gap:14 }}>
                  <div style={{ width:52, height:52, background:'#0f172a', borderRadius:8, padding:4, flexShrink:0, display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:2 }}>
                    {[1,1,1,1,1,1,0,0,0,1,1,0,1,0,1,1,0,0,0,1,1,1,1,1,1].map((v,i)=><div key={i} style={{ background:v?'#fff':'transparent', borderRadius:1 }}/>)}
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:'#0f172a' }}>Scan to check in</div>
                    <div style={{ fontSize:11, color:'#64748b', marginTop:2 }}>Or tap the link in your booking confirmation</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="tag reveal">Check-in & Auto-release</span>
              <h2 className="h2 reveal" style={{ marginBottom:16 }}>End <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>ghost bookings</span> for good</h2>
              <p className="body reveal" style={{ marginBottom:24 }}>Rooms booked but never used cost money and frustrate your team. SpacioHub's check-in system automatically frees no-show rooms so they're always available for someone who needs them.</p>
              <div className="check-list reveal">
                {['<strong>QR code check-in</strong> — scan outside the room or tap the link in your confirmation','<strong>Configurable grace period</strong> — 5, 10, or 15 minutes before auto-release kicks in','<strong>Auto-release no-shows</strong> — room freed automatically, others notified instantly','<strong>Extend meeting button</strong> — add 15 or 30 mins from door display or app','<strong>End now flow</strong> — release the room early so colleagues can use it'].map((item,i)=>(
                  <div key={i} className="check-item">
                    <div className="check-ic"><svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg></div>
                    <div className="check-text" dangerouslySetInnerHTML={{ __html:item }}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. APPROVAL WORKFLOWS ═════════════════════════ */}
      <section style={{ padding:'80px 0', background:'#f8fafc', borderBottom:'1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <span className="tag reveal">Rules & Approvals</span>
              <h2 className="h2 reveal" style={{ marginBottom:16 }}>Your rooms, your <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>rules</span></h2>
              <p className="body reveal" style={{ marginBottom:24 }}>Not every room should be open to everyone. SpacioHub lets you define exactly who can book what, when, and for how long — with optional approval flows for high-demand or restricted spaces.</p>
              <div className="check-list reveal">
                {['<strong>Per-room access rules</strong> — restrict rooms to specific teams, roles, or departments','<strong>Approval workflows</strong> — require manager sign-off for boardrooms or all-hands spaces','<strong>Booking windows</strong> — set min/max lead time (same-day only, or max 14 days ahead)','<strong>Duration limits</strong> — enforce minimum and maximum meeting lengths per room','<strong>User quotas</strong> — cap hours per day/week or concurrent bookings per person','<strong>Blackout dates</strong> — block rooms for maintenance, holidays, or special events'].map((item,i)=>(
                  <div key={i} className="check-item">
                    <div className="check-ic"><svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg></div>
                    <div className="check-text" dangerouslySetInnerHTML={{ __html:item }}/>
                  </div>
                ))}
              </div>
              <div className="reveal" style={{ marginTop:28 }}>
                <button className="btn btn-primary" onClick={openModal} style={{ boxShadow:'0 6px 20px rgba(0,192,122,0.3)' }}>See it in action →</button>
              </div>
            </div>
            <div className="reveal">
              <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.07)' }}>
                <div style={{ padding:'14px 18px', borderBottom:'1px solid #f1f5f9', display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:'#fef3c7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg viewBox="0 0 20 20" width="16" height="16" fill="none"><circle cx="10" cy="10" r="7" stroke="#f59e0b" strokeWidth="1.5"/><path d="M10 6v4l3 2" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#0f172a' }}>Pending Approval</div>
                    <div style={{ fontSize:11, color:'#94a3b8' }}>Board Room · Fri 2PM–4PM</div>
                  </div>
                  <div style={{ marginLeft:'auto', fontSize:10, fontWeight:700, color:'#f59e0b', background:'#fef3c7', padding:'3px 10px', borderRadius:100 }}>Awaiting</div>
                </div>
                <div style={{ padding:'16px 18px' }}>
                  {[
                    { label:'Requested by',  val:'James O. · Engineering',           svg: <svg viewBox="0 0 28 28" width="20" height="20" fill="none"><rect width="28" height="28" rx="7" fill="#eff6ff"/><circle cx="14" cy="10" r="4" fill="#3b82f6" opacity="0.7"/><path d="M6 22c0-4.5 3.5-8 8-8s8 3.5 8 8" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg> },
                    { label:'Purpose',       val:'Q3 All-Hands (40 people)',          svg: <svg viewBox="0 0 28 28" width="20" height="20" fill="none"><rect width="28" height="28" rx="7" fill="#fef3c7"/><circle cx="14" cy="14" r="7" stroke="#f59e0b" strokeWidth="1.5"/><circle cx="14" cy="14" r="3" fill="#f59e0b" opacity="0.4"/><circle cx="14" cy="14" r="1.5" fill="#f59e0b"/></svg> },
                    { label:'Approver',      val:'Sarah K. · Facilities Admin',       svg: <svg viewBox="0 0 28 28" width="20" height="20" fill="none"><rect width="28" height="28" rx="7" fill="#ecfdf5"/><circle cx="14" cy="14" r="7" fill="#00c07a" opacity="0.15"/><path d="M9 14l3.5 3.5 6.5-7" stroke="#00c07a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                    { label:'Rule triggered',val:'Board Room: approval required 2h+', svg: <svg viewBox="0 0 28 28" width="20" height="20" fill="none"><rect width="28" height="28" rx="7" fill="#f5f3ff"/><rect x="7" y="6" width="14" height="17" rx="2" fill="#8b5cf6" opacity="0.1"/><rect x="7" y="6" width="14" height="17" rx="2" stroke="#8b5cf6" strokeWidth="1.5"/><rect x="10" y="11" width="8" height="1.5" rx="0.75" fill="#8b5cf6" opacity="0.6"/><rect x="10" y="14" width="6" height="1.5" rx="0.75" fill="#8b5cf6" opacity="0.5"/><rect x="10" y="17" width="7" height="1.5" rx="0.75" fill="#8b5cf6" opacity="0.4"/></svg> },
                  ].map(({label,val,svg})=>(
                    <div key={label} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:12 }}>
                      <span style={{ flexShrink:0, marginTop:1 }}>{svg}</span>
                      <div>
                        <div style={{ fontSize:10, color:'#94a3b8', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px' }}>{label}</div>
                        <div style={{ fontSize:12, fontWeight:600, color:'#0f172a', marginTop:1 }}>{val}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ display:'flex', gap:8, marginTop:8 }}>
                    <button style={{ flex:1, padding:'10px', borderRadius:8, background:'#00c07a', color:'#fff', border:'none', fontSize:13, fontWeight:700, cursor:'pointer' }}>✓ Approve</button>
                    <button style={{ flex:1, padding:'10px', borderRadius:8, background:'#f8fafc', color:'#64748b', border:'1px solid #e2e8f0', fontSize:13, fontWeight:600, cursor:'pointer' }}>✕ Decline</button>
                  </div>
                  <div style={{ marginTop:10, padding:'10px 12px', background:'#f0fdf8', borderRadius:8, fontSize:11, color:'#009960', display:'flex', alignItems:'center', gap:6 }}>
                    <svg viewBox="0 0 16 16" width="13" height="13" fill="none"><rect x="1" y="2" width="14" height="10" rx="2" fill="#00c07a" opacity="0.15"/><rect x="1" y="2" width="14" height="10" rx="2" stroke="#00c07a" strokeWidth="1.2"/><path d="M4 13l2-2h2" stroke="#00c07a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Add a note to James about this booking...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════ */}
      <section style={{ background:'linear-gradient(135deg,#0a1628,#0f172a)', padding:'80px 0', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, left:'50%', transform:'translateX(-50%)', width:600, height:400, background:'radial-gradient(ellipse,rgba(0,192,122,0.10),transparent 65%)', pointerEvents:'none' }}/>
        <div className="container" style={{ position:'relative' }}>
          <h2 className="h2" style={{ color:'#fff', marginBottom:14 }}>See it <span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>in action</span></h2>
          <p className="lead" style={{ color:'#64748b', marginBottom:36 }}>14-day free trial. No credit card required.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 8px 28px rgba(0,192,122,0.35)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ background:'rgba(255,255,255,0.05)', color:'#fff', padding:'14px 28px', borderRadius:8, fontSize:15, fontWeight:600, border:'1.5px solid rgba(255,255,255,0.12)', textDecoration:'none' }}>Try free for 14 days</a>
          </div>
        </div>
      </section>
    </main>
  )
}
