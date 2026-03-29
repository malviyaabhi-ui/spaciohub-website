import SEO from '../../components/SEO'
import { PAGE_SEO } from '../../components/pageSEO'
import React, { useState } from 'react'
import { useModal } from '../../components/ModalContext'

const STEPS = [
  { num: '01', title: 'Pre-register the visitor',    desc: "Host adds the visitor's name, email, and company before arrival. Visitor gets a welcome email.",       accent: '#00c07a' },
  { num: '02', title: 'Visitor arrives & checks in', desc: 'Visitor taps their name on the self-service kiosk at the entrance. No staff involvement needed.',       accent: '#3b82f6' },
  { num: '03', title: 'Badge printed instantly',     desc: 'Visitor badge prints with name, company, host, floor, and expiry. Custom branding available.',          accent: '#f97316' },
  { num: '04', title: 'Host notified instantly',     desc: 'Host gets an email the moment their visitor checks in — no more waiting at reception.',                  accent: '#8b5cf6' },
]

const FEATURES = [
  { title: 'Pre-registration',
    icon: <svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#fff7ed"/><rect x="10" y="8" width="20" height="25" rx="2" fill="#f97316" opacity="0.1"/><rect x="10" y="8" width="20" height="25" rx="2" stroke="#f97316" strokeWidth="1.5"/><rect x="14" y="6" width="12" height="5" rx="1.5" fill="#f97316"/><rect x="13" y="17" width="14" height="2" rx="1" fill="#f97316" opacity="0.5"/><rect x="13" y="21" width="10" height="2" rx="1" fill="#f97316" opacity="0.4"/><rect x="13" y="25" width="12" height="2" rx="1" fill="#f97316" opacity="0.3"/></svg>,
    desc: 'Hosts register visitors in advance with name, company, and expected arrival time.' },
  { title: 'Self-service kiosk',
    icon: <svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#fff7ed"/><rect x="12" y="5" width="16" height="28" rx="2.5" fill="#f97316" opacity="0.15"/><rect x="12" y="5" width="16" height="28" rx="2.5" stroke="#f97316" strokeWidth="1.5"/><rect x="14" y="8" width="12" height="3" rx="0.5" fill="#f97316" opacity="0.4"/><rect x="14" y="13" width="12" height="11" rx="1" fill="#f97316" opacity="0.1"/><rect x="14" y="14" width="12" height="3" rx="0.5" fill="#f97316" opacity="0.5"/><circle cx="20" cy="29" r="1.5" fill="#f97316"/></svg>,
    desc: 'Touch-based check-in on any tablet at the entrance — no receptionist needed.' },
  { title: 'Custom badges',
    icon: <svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#fff7ed"/><rect x="9" y="11" width="22" height="20" rx="2" fill="#f97316" opacity="0.15"/><rect x="9" y="11" width="22" height="20" rx="2" stroke="#f97316" strokeWidth="1.5"/><rect x="14" y="9" width="12" height="5" rx="1.5" fill="#f97316"/><circle cx="20" cy="19" r="3" fill="#f97316" opacity="0.5"/><rect x="13" y="24" width="14" height="2" rx="1" fill="#f97316" opacity="0.5"/><rect x="15" y="27" width="10" height="1.5" rx="0.75" fill="#f97316" opacity="0.3"/></svg>,
    desc: 'Print branded visitor badges with name, company, host, floor, and expiry.' },
  { title: 'Instant host alerts',
    icon: <svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#fff7ed"/><rect x="7" y="12" width="26" height="18" rx="2" fill="#f97316" opacity="0.15"/><rect x="7" y="12" width="26" height="18" rx="2" stroke="#f97316" strokeWidth="1.5"/><path d="M7 14l13 10 13-10" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    desc: 'Automatic email to the host the moment their guest arrives and checks in.' },
  { title: 'Visitor log',
    icon: <svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#fff7ed"/><rect x="9" y="8" width="22" height="26" rx="2" fill="#f97316" opacity="0.1"/><rect x="9" y="8" width="22" height="26" rx="2" stroke="#f97316" strokeWidth="1.5"/><rect x="13" y="14" width="14" height="2" rx="1" fill="#f97316" opacity="0.6"/><rect x="13" y="18" width="10" height="2" rx="1" fill="#f97316" opacity="0.4"/><rect x="13" y="22" width="12" height="2" rx="1" fill="#f97316" opacity="0.4"/><rect x="13" y="26" width="8" height="2" rx="1" fill="#f97316" opacity="0.3"/></svg>,
    desc: 'Complete audit trail of every visitor — who came, who hosted, when they left.' },
  { title: 'Security & compliance',
    icon: <svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#fff7ed"/><path d="M20 8l10 4v8c0 6-4 10-10 12C14 30 10 26 10 20v-8l10-4z" fill="#f97316" opacity="0.15"/><path d="M20 8l10 4v8c0 6-4 10-10 12C14 30 10 26 10 20v-8l10-4z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/><path d="M15 20l3 3 7-7" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    desc: 'GDPR-friendly data handling with configurable visitor data retention policies.' },
]

function VisitorMockup() {
  const [view, setView]           = useState('list')
  const [selected, setSelected]   = useState(null)
  const [formName, setFormName]   = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [checkedIn, setCheckedIn] = useState(['Emma Clark'])

  const visitors = [
    { name: 'James Wilson', company: 'Microsoft', host: 'Sarah J.', time: '10:00 AM', color: '#3b82f6' },
    { name: 'Emma Clark',   company: 'Freelance', host: 'Tom B.',   time: '11:30 AM', color: '#8b5cf6' },
    { name: 'David Park',   company: 'Google',    host: 'Lisa M.',  time: '2:00 PM',  color: '#f97316' },
    { name: 'Nina Patel',   company: 'Deloitte',  host: 'Ahmed K.', time: '3:30 PM',  color: '#ec4899' },
  ]

  const handleCheckin = (v) => { setSelected(v); setFormName(v.name); setFormEmail(''); setView('form') }
  const handleConfirm = () => { if (formEmail) { setCheckedIn(p => [...p, selected.name]); setView('done') } }
  const handleBack    = () => { setView('list'); setSelected(null); setFormName(''); setFormEmail('') }

  return (
    <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:18, overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.10)', fontFamily:'Inter,sans-serif' }}>

      {/* Browser top bar */}
      <div style={{ background:'linear-gradient(135deg,#fff7ed,#ffedd5)', padding:'10px 16px', borderBottom:'1px solid #fed7aa', display:'flex', alignItems:'center', gap:7 }}>
        <div style={{ display:'flex', gap:5 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }}/>)}
        </div>
        <div style={{ flex:1, textAlign:'center' }}>
          <div style={{ display:'inline-block', background:'rgba(255,255,255,0.65)', border:'1px solid #fed7aa', borderRadius:5, padding:'2px 14px', fontSize:10, fontFamily:'DM Mono,monospace', color:'#ea580c' }}>go.spaciohub.com/visitors</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:9, fontWeight:700, color:'#f97316' }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#f97316', animation:'pulse 2s infinite' }}/>LIVE
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'148px 1fr', minHeight:390 }}>

        {/* Sidebar */}
        <div style={{ borderRight:'1px solid #f1f5f9', padding:'14px 8px', background:'#fff' }}>
          <div style={{ fontSize:9, fontWeight:800, color:'#94a3b8', letterSpacing:'1px', textTransform:'uppercase', padding:'0 8px', marginBottom:8 }}>Visitors</div>
          {[
            { label:'All Visits',  key:'list' },
            { label:'New Visit',   key:'form' },
            { label:'Checked In',  key:'checkedin', badge: checkedIn.length },
            { label:'Expected',    key:'expected',  badge: visitors.length - checkedIn.length },
          ].map(item => (
            <div key={item.label} onClick={() => setView(item.key)}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7px 8px', borderRadius:7, fontSize:11.5, fontWeight:view===item.key?700:400, color:view===item.key?'#f97316':'#64748b', background:view===item.key?'#fff7ed':'transparent', cursor:'pointer', marginBottom:2, transition:'all 0.15s' }}>
              <span>{item.label}</span>
              {item.badge > 0 && <span style={{ background: view===item.key?'#f97316':'#e2e8f0', color:view===item.key?'#fff':'#64748b', fontSize:9, fontWeight:700, padding:'1px 5px', borderRadius:100 }}>{item.badge}</span>}
            </div>
          ))}
          <div style={{ marginTop:16, padding:'8px', borderRadius:9, background:'#f0fdf8', border:'1px solid #a7f3d0' }}>
            <div style={{ fontSize:9, fontWeight:700, color:'#00c07a', letterSpacing:'0.5px', marginBottom:2 }}>TODAY</div>
            <div style={{ fontSize:16, fontWeight:800, color:'#0f172a' }}>{visitors.length}</div>
            <div style={{ fontSize:9, color:'#64748b' }}>visitors expected</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ padding:14, background:'#fafafa' }}>

          {/* LIST VIEW */}
          {(view === 'list' || view === 'checkedin' || view === 'expected') && <>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#0f172a' }}>
                {view==='checkedin' ? 'Checked In' : view==='expected' ? 'Expected Today' : "Today's Visitors"}
              </div>
              <button onClick={() => setView('form')} style={{ background:'#f97316', color:'#fff', border:'none', borderRadius:6, padding:'4px 10px', fontSize:10, fontWeight:700, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>+ New Visit</button>
            </div>
            {visitors
              .filter(v => view==='checkedin' ? checkedIn.includes(v.name) : view==='expected' ? !checkedIn.includes(v.name) : true)
              .map(v => {
                const isIn = checkedIn.includes(v.name)
                return (
                  <div key={v.name}
                    style={{ background:'#fff', border:`1.5px solid ${isIn?'#a7f3d0':'#f1f5f9'}`, borderRadius:10, padding:'9px 11px', marginBottom:5, display:'flex', alignItems:'center', gap:9, cursor:isIn?'default':'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e => { if (!isIn) { e.currentTarget.style.borderColor='#fed7aa'; e.currentTarget.style.transform='translateX(2px)' } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor=isIn?'#a7f3d0':'#f1f5f9'; e.currentTarget.style.transform='translateX(0)' }}
                    onClick={() => !isIn && handleCheckin(v)}>
                    <div style={{ width:30, height:30, borderRadius:'50%', background:v.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', flexShrink:0 }}>{v.name[0]}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:11.5, fontWeight:600, color:'#0f172a' }}>{v.name}</div>
                      <div style={{ fontSize:10, color:'#94a3b8', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{v.company} · {v.time} · {v.host}</div>
                    </div>
                    <div style={{ fontSize:9, fontWeight:700, padding:'2px 8px', borderRadius:100, background:isIn?'#ecfdf5':'#eff6ff', color:isIn?'#00c07a':'#3b82f6', whiteSpace:'nowrap', flexShrink:0 }}>
                      {isIn ? '✓ Checked in' : 'Check in →'}
                    </div>
                  </div>
                )
            })}
          </>}

          {/* FORM VIEW */}
          {view === 'form' && (
            <div style={{ animation:'fadeIn 0.2s ease' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                <button onClick={handleBack} style={{ background:'#f1f5f9', border:'none', borderRadius:7, padding:'4px 9px', fontSize:10, color:'#64748b', cursor:'pointer', fontFamily:'Inter,sans-serif' }}>← Back</button>
                <div style={{ fontSize:12, fontWeight:700, color:'#0f172a' }}>New Visit</div>
              </div>
              {/* Date & time */}
              <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:9, padding:'8px 11px', marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontSize:10, color:'#94a3b8' }}>DATE & TIME</div>
                <div style={{ fontSize:11, fontWeight:600, color:'#0f172a' }}>Today · 10:00 AM – 11:00 AM</div>
              </div>
              {/* Host */}
              <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:9, padding:'8px 11px', marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontSize:10, color:'#94a3b8' }}>HOST</div>
                <div style={{ fontSize:11, fontWeight:600, color:'#0f172a' }}>Sarah Johnson</div>
              </div>
              {/* Visitor inputs */}
              <div style={{ fontSize:10, fontWeight:700, color:'#94a3b8', letterSpacing:'0.5px', marginBottom:5, marginTop:10 }}>VISITOR DETAILS</div>
              <input value={formName} onChange={e=>setFormName(e.target.value)} placeholder="Full name" style={{ width:'100%', border:'1.5px solid #e2e8f0', borderRadius:8, padding:'8px 11px', fontSize:11, fontFamily:'Inter,sans-serif', marginBottom:6, boxSizing:'border-box', outline:'none' }}
                onFocus={e=>e.target.style.borderColor='#f97316'} onBlur={e=>e.target.style.borderColor='#e2e8f0'}/>
              <input value={formEmail} onChange={e=>setFormEmail(e.target.value)} placeholder="Email address" style={{ width:'100%', border:'1.5px solid #e2e8f0', borderRadius:8, padding:'8px 11px', fontSize:11, fontFamily:'Inter,sans-serif', marginBottom:10, boxSizing:'border-box', outline:'none' }}
                onFocus={e=>e.target.style.borderColor='#f97316'} onBlur={e=>e.target.style.borderColor='#e2e8f0'}/>
              <button onClick={handleConfirm} style={{ width:'100%', background:formName&&formEmail?'#00c07a':'#e2e8f0', color:formName&&formEmail?'#fff':'#94a3b8', border:'none', borderRadius:9, padding:'10px', fontSize:12, fontWeight:700, cursor:formName&&formEmail?'pointer':'default', transition:'all 0.2s', fontFamily:'Inter,sans-serif' }}>
                Confirm Visit →
              </button>
            </div>
          )}

          {/* DONE / CHECKED IN VIEW */}
          {view === 'done' && (
            <div style={{ textAlign:'center', padding:'24px 0', animation:'heroBounceIn 0.4s cubic-bezier(.16,1,.3,1)' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#00c07a,#009960)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', boxShadow:'0 8px 28px rgba(0,192,122,0.35)' }}>
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M5 12l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{ fontSize:16, fontWeight:800, color:'#0f172a', marginBottom:4 }}>Checked in!</div>
              <div style={{ fontSize:11, color:'#64748b', marginBottom:14 }}>{formName} · Badge printing · Host notified</div>
              <div style={{ background:'#f0fdf8', border:'1px solid #a7f3d0', borderRadius:10, padding:'10px 14px', marginBottom:12, textAlign:'left' }}>
                {[['Visitor', formName],['Host notified','✓ Email sent'],['Badge','✓ Printing now'],['Time',new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})]].map(([k,v]) => (
                  <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:4, fontSize:11 }}>
                    <span style={{ color:'#94a3b8' }}>{k}</span>
                    <span style={{ fontWeight:600, color: v.includes('✓')?'#00c07a':'#0f172a' }}>{v}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleBack} style={{ background:'#f1f5f9', border:'none', borderRadius:8, padding:'7px 18px', fontSize:11, fontWeight:600, color:'#64748b', cursor:'pointer', fontFamily:'Inter,sans-serif' }}>Back to list</button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function PlatformVisitors() {
  const { openModal } = useModal()

  return (
    <>
      <SEO {...PAGE_SEO.platformVisitors} />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* HERO */}
      <section style={{ background:'#060d1a', borderBottom:'1px solid #1e293b', padding:'100px 0 80px', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute', top:'10%', left:'10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.10),transparent 70%)', animation:'orbFloat1 8s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'5%', right:'5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(236,72,153,0.08),transparent 70%)', animation:'orbFloat2 10s ease-in-out infinite 2s', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:200, background:'linear-gradient(0deg,#060d1a,transparent)', pointerEvents:'none' }} />
        <div className="container" style={{ position:'relative', textAlign:'center' }}>
          <span className="tag animate-fade-up" style={{ color:'#f97316' }}>Platform</span>
          <h1 className="animate-fade-up delay-1" style={{ fontSize:'clamp(36px,5vw,64px)', fontWeight:900, letterSpacing:'-2.5px', lineHeight:1.05, color:'#fff', marginBottom:20, maxWidth:680, margin:'0 auto 20px' }}>
            Visitor Management <span style={{ background:'linear-gradient(135deg,#f97316,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>that wows</span>
          </h1>
          <p className="animate-fade-up delay-2" style={{ maxWidth:520, margin:'0 auto 40px', fontSize:17, color:'rgba(255,255,255,0.55)', lineHeight:1.7 }}>Pre-register guests, self-service check-in, instant host notifications, and printed badges — your visitors feel like VIPs from the moment they arrive.</p>
          <div className="animate-fade-up delay-3" style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 0 40px rgba(249,115,22,0.35)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', borderRadius:8, fontSize:15, fontWeight:600, border:'1.5px solid rgba(255,255,255,0.2)', color:'#fff', textDecoration:'none', background:'rgba(255,255,255,0.06)', backdropFilter:'blur(8px)', transition:'all 0.2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.35)' }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)' }}>
              Try free for 14 days
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="tag reveal">How it works</span>
            <h2 className="h2 reveal">Seamless from <span style={{ background:'linear-gradient(135deg,#f97316,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>invite to check-in</span></h2>
            <p className="body reveal" style={{ color: '#64748b', maxWidth: 420, margin: '12px auto 0' }}>Four simple steps. Zero friction. Your guests feel like VIPs from the moment they arrive.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{gap: 16, position: 'relative'}}>
            <div style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 1, background: 'repeating-linear-gradient(90deg,#d1fae5 0,#d1fae5 8px,transparent 8px,transparent 16px)', zIndex: 0 }} />
            {STEPS.map((s, i) => (
              <div key={s.num} className="card reveal" style={{ animationDelay: `${i*0.1}s`, position: 'relative', zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', fontFamily: 'DM Mono,monospace', marginBottom: 16 }}>{s.num}</div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="tag reveal">Features</span>
            <h2 className="h2 reveal">Everything <span style={{ background:'linear-gradient(135deg,#f97316,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>visitor management</span> needs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{gap: 16}}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className="card reveal" style={{ animationDelay: `${i*0.08}s`, background: '#fff' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff7ed', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BADGE VISUAL */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: 64, alignItems: 'center'}}>
            <div>
              <span className="tag reveal">Visitor Badges</span>
              <h2 className="h2 reveal" style={{ marginBottom: 16 }}>Professional <span style={{ background:'linear-gradient(135deg,#f97316,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>badges</span>, printed in seconds</h2>
              <p className="body reveal" style={{ marginBottom: 24 }}>Every visitor gets a branded badge with their name, company, host, floor, and expiry. Security knows who belongs — and who doesn't.</p>
              <div className="check-list reveal">
                {['<strong>Custom logo & branding</strong> on every badge','<strong>Expiry time</strong> — badges automatically expire','<strong>Floor & zone access</strong> printed clearly','<strong>Host name</strong> so security can verify','<strong>Photo optional</strong> — take a photo on check-in'].map((c,i) => (
                  <div key={i} className="check-item">
                    <div className="check-ic" style={{ background: '#f97316' }}><svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg></div>
                    <div className="check-text" dangerouslySetInnerHTML={{ __html: c }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <div style={{ maxWidth: 280, margin: '0 auto', background: '#fff', borderRadius: 20, padding: 28, border: '2px solid #e2e8f0', boxShadow: '0 24px 60px rgba(0,0,0,0.1)' }}>
                <div style={{ background: 'linear-gradient(135deg,#00c07a,#009960)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff' }}>S</div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>SpacioHub</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>VISITOR</span>
                </div>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 auto 16px', border: '3px solid #e2e8f0' }}>JW</div>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>James Wilson</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>Microsoft Corporation</div>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: '10px 14px', fontSize: 12 }}>
                  {[['Host','Sarah Johnson',null],['Floor','Floor 3',null],['Expires','6:00 PM today','#f97316']].map(([k,v,col]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ color: '#94a3b8' }}>{k}</span>
                      <span style={{ fontWeight: 600, color: col || '#0f172a' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>Checked in 10:03 AM</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#ecfdf5', color: '#00c07a', padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c07a', display: 'inline-block' }} />Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#fff7ed,#fff)', borderTop: '1px solid #fed7aa', padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse,rgba(249,115,22,0.08),transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
            <svg viewBox="0 0 80 80" width="72" height="72" fill="none">
              <rect width="80" height="80" rx="20" fill="#fff7ed"/>
              <circle cx="28" cy="26" r="10" fill="#f97316" opacity="0.7"/>
              <circle cx="54" cy="26" r="10" fill="#f97316" opacity="0.35"/>
              <path d="M12 60c0-11 8-18 18-18h20c10 0 18 7 18 18" stroke="#f97316" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <circle cx="40" cy="52" r="5" fill="#f97316" opacity="0.5"/>
            </svg>
          </div>
          <h2 className="h2 reveal" style={{ marginBottom: 14 }}>Give every visitor a <span style={{ background:'linear-gradient(135deg,#f97316,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>great first impression</span></h2>
          <p className="lead reveal" style={{ marginBottom: 36, color: '#64748b' }}>14-day free trial. No credit card required.</p>
          <div className="reveal" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow: '0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Start free trial</a>
          </div>
        </div>
      </section>
    </main>
  </>
  )
}
