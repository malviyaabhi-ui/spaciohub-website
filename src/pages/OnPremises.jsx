import SEO from '../components/SEO'
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../components/ModalContext'

const LOGO = 'https://svksiwnalmrjjnskycqb.supabase.co/storage/v1/object/public/assets/logo-no-background.png'

const FEATURES = [
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none"><rect width="48" height="48" rx="12" fill="#f0fdf4"/><path d="M24 8l14 9v13H10V17L24 8z" fill="#00c07a" opacity="0.15" stroke="#00c07a" strokeWidth="2" strokeLinejoin="round"/><rect x="17" y="28" width="14" height="12" rx="2" fill="#00c07a" opacity="0.35"/><rect x="20" y="31" width="8" height="9" rx="1" fill="#00c07a" opacity="0.6"/></svg>,
    color: '#00c07a', bg: '#f0fdf4', tag: 'DATA SOVEREIGNTY',
    title: 'Every record stays in your building',
    desc: 'Visitor logs, room bookings, badge prints -- nothing leaves your network. Your compliance team can answer exactly where every byte of data lives.'
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none"><rect width="48" height="48" rx="12" fill="#eff6ff"/><circle cx="24" cy="24" r="12" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="1.5"/><circle cx="24" cy="24" r="6" fill="#3b82f6" opacity="0.3"/><circle cx="24" cy="24" r="2" fill="#3b82f6"/><line x1="24" y1="10" x2="24" y2="14" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/><line x1="24" y1="34" x2="24" y2="38" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/><line x1="10" y1="24" x2="14" y2="24" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/><line x1="34" y1="24" x2="38" y2="24" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    color: '#3b82f6', bg: '#eff6ff', tag: 'RESILIENCE',
    title: 'Works when the internet does not',
    desc: 'Your kiosk, door displays, and booking system run on your LAN. An internet outage does not stop your lobby or your meetings.'
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none"><rect width="48" height="48" rx="12" fill="#fef3c7"/><rect x="10" y="20" width="28" height="18" rx="3" fill="#d97706" opacity="0.15" stroke="#d97706" strokeWidth="1.5"/><rect x="14" y="24" width="8" height="3" rx="1" fill="#d97706" opacity="0.6"/><rect x="14" y="29" width="5" height="3" rx="1" fill="#d97706" opacity="0.4"/><path d="M24 12l4 8H20l4-8z" fill="#d97706" opacity="0.7"/></svg>,
    color: '#d97706', bg: '#fef3c7', tag: 'ZERO COST INFRASTRUCTURE',
    title: 'Open-source stack, zero licence fees',
    desc: 'Ubuntu, PostgreSQL, Redis, Nginx, Docker -- all free. The only thing you pay Riser for is SpacioHub itself. No Windows Server licences. No Oracle fees.'
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none"><rect width="48" height="48" rx="12" fill="#f5f3ff"/><rect x="10" y="14" width="28" height="20" rx="3" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5"/><rect x="14" y="18" width="6" height="4" rx="1" fill="#8b5cf6" opacity="0.5"/><rect x="22" y="18" width="6" height="4" rx="1" fill="#8b5cf6" opacity="0.5"/><rect x="30" y="18" width="4" height="4" rx="1" fill="#8b5cf6" opacity="0.3"/><path d="M14 26h20" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/></svg>,
    color: '#8b5cf6', bg: '#f5f3ff', tag: 'MANAGED FOR YOU',
    title: 'Riser handles everything remotely',
    desc: 'Security patches, database backups, SSL renewals, software updates -- all handled by Riser Technologies every month without your IT team doing anything.'
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none"><rect width="48" height="48" rx="12" fill="#fff7ed"/><circle cx="24" cy="20" r="8" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5"/><path d="M16 36c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"/><circle cx="24" cy="20" r="3" fill="#f59e0b" opacity="0.7"/></svg>,
    color: '#f59e0b', bg: '#fff7ed', tag: 'FAST DEPLOYMENT',
    title: 'Live in 48 hours, not 6 weeks',
    desc: 'Day 1: Riser installs the stack on your server remotely. Day 2: kiosk goes live in your lobby. Your team does nothing except provide server access.'
  },
  {
    icon: <svg viewBox="0 0 48 48" width="40" height="40" fill="none"><rect width="48" height="48" rx="12" fill="#fdf2f8"/><path d="M24 10l3.5 10h10L29 26l3.5 10L24 30l-8.5 6L19 26l-8.5-6h10z" fill="#ec4899" opacity="0.6"/></svg>,
    color: '#ec4899', bg: '#fdf2f8', tag: 'COMPLIANCE READY',
    title: 'Built for regulated industries',
    desc: 'UAE PDPL, DHA healthcare standards, ADGM financial regulations -- on-prem makes answering compliance questions straightforward. Data residency is unambiguous.'
  },
]

const MODELS = [
  {
    letter: 'A',
    name: 'Cloud SaaS',
    desc: 'Use SpacioHub on our infrastructure. Fastest to get started.',
    riser: ['App, hosting, updates -- Riser', 'Automatic backups -- Riser', 'No server needed'],
    customer: ['Kiosk tablet + badge printer'],
    best: 'SMEs and teams who want zero IT involvement.',
    featured: false,
  },
  {
    letter: 'B',
    name: 'Riser-managed on-prem',
    desc: 'SpacioHub on your server. Riser installs, monitors, and maintains it. Your IT team does nothing.',
    riser: ['SpacioHub deployed on your server', 'All updates + monitoring -- Riser', 'Backups + SSL -- Riser'],
    customer: ['Server hardware -- you own', 'Kiosk tablet + badge printer'],
    best: 'Government, hospitals, banks -- data on-prem, zero IT overhead.',
    featured: true,
  },
  {
    letter: 'C',
    name: 'Self-managed',
    desc: 'Your IT team installs and runs everything. Riser provides the licence and documentation.',
    riser: ['SpacioHub licence + docs -- Riser'],
    customer: ['Server, OS, all updates -- your IT', 'Full control, full responsibility'],
    best: 'Large enterprises with strong internal DevOps teams.',
    featured: false,
  },
]

const WHO = [
  { icon: '🏛', label: 'Government', desc: 'Strict data residency, full audit trail for inspections, UAE PDPL compliant.' },
  { icon: '🏥', label: 'Healthcare', desc: 'DHA compliance, patient-adjacent visitor data stays on hospital infrastructure.' },
  { icon: '🏦', label: 'Banking', desc: 'ADGM and DFSA regulated. Physical access logs tied to security policy.' },
  { icon: '🎓', label: 'Universities', desc: 'Campus-wide deployment across buildings with centralised admin control.' },
  { icon: '🏢', label: 'Enterprise campuses', desc: '50+ screens, multi-building, high-availability cluster support.' },
]

export default function OnPremises() {
  const { openModal } = useModal()
  const heroRef = useRef(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <>
      <SEO
        title="On-Premises Edition -- SpacioHub Enterprise"
        description="Run SpacioHub entirely on your own infrastructure. Visitor management, room booking, digital signage and door displays -- with your data never leaving your building. Riser-managed, live in 48 hours."
      />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

        {/* HERO */}
        <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', padding: '120px 0 96px', textAlign: 'center', background: '#060d1a', borderBottom: '1px solid #1e293b' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(0,192,122,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(15,121,155,0.1) 0%, transparent 60%)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:200, background:'linear-gradient(0deg,#060d1a,transparent)', pointerEvents:'none' }} />

          <div className="container" style={{ position:'relative', zIndex:2 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,192,122,0.12)', border:'1px solid rgba(0,192,122,0.3)', color:'#4ade80', padding:'5px 14px', borderRadius:100, fontSize:12, fontWeight:600, marginBottom:28, backdropFilter:'blur(8px)' }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'#00c07a', animation:'pulse 2s infinite' }} />
              SpacioHub Enterprise -- On-Premises Edition
            </div>

            <h1 style={{ fontSize:'clamp(40px,6vw,76px)', fontWeight:900, letterSpacing:'-3px', lineHeight:1.0, color:'#fff', marginBottom:22, textAlign:'center' }}>
              Your data.<br />
              <span style={{ background:'linear-gradient(135deg,#00c07a 0%,#0cb8b6 50%,#3b82f6 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Your building.</span><br />
              Zero headache.
            </h1>

            <p style={{ maxWidth:540, margin:'0 auto 44px', fontSize:17, color:'rgba(255,255,255,0.55)', lineHeight:1.75, fontWeight:400 }}>
              SpacioHub runs entirely inside your own walls -- the same platform your team loves, on your own infrastructure. Riser sets it up, Riser keeps it running. You just use it.
            </p>

            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 0 40px rgba(0,192,122,0.35)' }}>Request an on-prem demo</button>
              <a href="https://go.spaciohub.com/Dashboard?demo=true" target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 28px', borderRadius:8, fontSize:15, fontWeight:600, border:'1.5px solid rgba(255,255,255,0.2)', color:'#fff', textDecoration:'none', background:'rgba(255,255,255,0.06)', backdropFilter:'blur(8px)', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)' }}>
                Try live demo
              </a>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'18px 0' }}>
          <div className="container">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:40, flexWrap:'wrap' }}>
              {['Zero third-party software licences','Data never leaves your network','Works without internet','Riser manages everything remotely','Live in 48 hours'].map(t => (
                <div key={t} style={{ display:'flex', alignItems:'center', gap:7, fontSize:12, fontWeight:600, color:'#64748b' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00c07a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ background:'linear-gradient(135deg,#0f172a,#1e293b)', padding:'56px 0', borderBottom:'1px solid #1e293b' }}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ textAlign:'center' }}>
              {[
                { num:'$0',   label:'Software licence cost',  sub:'Full open-source stack',    color:'#00c07a' },
                { num:'48h',  label:'Deployment time',        sub:'Contract to go-live',        color:'#3b82f6' },
                { num:'99.9%',label:'Uptime SLA',             sub:'Riser monitors remotely',    color:'#8b5cf6' },
                { num:'0',    label:'IT tasks for your team', sub:'We handle everything',       color:'#f59e0b' },
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

        {/* WHY ON-PREM FEATURES */}
        <section style={{ padding:'96px 0', borderBottom:'1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ marginBottom:56 }}>
              <span className="tag reveal">Why on-premises</span>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20 }}>
                <h2 className="h2 reveal">Your workplace platform.<br /><span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>Completely in your control.</span></h2>
                <p className="body reveal" style={{ maxWidth:360 }}>Same SpacioHub features. Room booking, visitor management, digital signage, door displays. The difference is only where your data lives.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FEATURES.map((f, i) => (
                <div key={i} className="reveal card" style={{ display:'flex', flexDirection:'column', gap:0, border:'1px solid #e2e8f0', animationDelay: i * 0.07 + 's' }}>
                  <div style={{ marginBottom:16 }}>{f.icon}</div>
                  <span style={{ fontSize:10, fontWeight:700, color:f.color, letterSpacing:'1px', textTransform:'uppercase', marginBottom:10, background:f.bg, padding:'3px 10px', borderRadius:100, display:'inline-block', width:'fit-content' }}>{f.tag}</span>
                  <h3 style={{ fontSize:16, fontWeight:800, color:'#0f172a', marginBottom:10, letterSpacing:-0.5 }}>{f.title}</h3>
                  <p style={{ fontSize:13, color:'#64748b', lineHeight:1.7, flex:1 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IS IT FOR */}
        <section style={{ padding:'80px 0', background:'#f8fafc', borderBottom:'1px solid #e2e8f0' }}>
          <div className="container">
            <span className="tag reveal">Who it is for</span>
            <h2 className="h2 reveal" style={{ marginBottom:12 }}>Built for organisations that<br /><span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>cannot compromise on data.</span></h2>
            <p className="body reveal" style={{ maxWidth:520, marginBottom:48 }}>If your industry, your regulators, or your IT policy requires visitor and workspace data to stay inside your building -- this is built for you.</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {WHO.map((w, i) => (
                <div key={i} className="reveal card" style={{ textAlign:'center', animationDelay: i * 0.08 + 's' }}>
                  <div style={{ fontSize:32, marginBottom:12 }}>{w.icon}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#0f172a', marginBottom:6 }}>{w.label}</div>
                  <div style={{ fontSize:12, color:'#64748b', lineHeight:1.6 }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THREE MODELS */}
        <section style={{ padding:'96px 0', borderBottom:'1px solid #e2e8f0' }}>
          <div className="container">
            <span className="tag reveal">Deployment options</span>
            <h2 className="h2 reveal">Three ways to run SpacioHub.<br /><span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>You pick the level of control.</span></h2>
            <p className="body reveal" style={{ maxWidth:500, marginBottom:48 }}>From cloud-hosted to fully self-managed -- the same full platform with different levels of ownership.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MODELS.map((m, i) => (
                <div key={i} className="reveal" style={{ borderRadius:20, border: m.featured ? '2px solid #00c07a' : '1px solid #e2e8f0', background:'#fff', overflow:'hidden', transition:'transform 0.25s,box-shadow 0.25s', animationDelay: i * 0.1 + 's' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 20px 48px rgba(0,0,0,0.09)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
                  {m.featured && <div style={{ background:'#00c07a', color:'#fff', textAlign:'center', padding:'7px', fontSize:10, fontWeight:700, letterSpacing:'0.05em', textTransform:'uppercase' }}>Recommended for enterprise</div>}
                  <div style={{ padding:'24px 22px 0' }}>
                    <div style={{ width:40, height:40, borderRadius:11, background: m.featured ? '#f0fdf8' : '#f8fafc', border: m.featured ? '1px solid #a7f3d0' : '1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:17, color: m.featured ? '#00c07a' : '#64748b', marginBottom:14 }}>{m.letter}</div>
                    <div style={{ fontSize:18, fontWeight:800, letterSpacing:-0.5, marginBottom:6 }}>{m.name}</div>
                    <div style={{ fontSize:13, color:'#64748b', lineHeight:1.65, marginBottom:20 }}>{m.desc}</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
                      {m.riser.map(r => (
                        <div key={r} style={{ display:'flex', alignItems:'flex-start', gap:9, fontSize:13 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00c07a" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink:0, marginTop:2 }}><polyline points="20 6 9 17 4 12"/></svg>
                          {r}
                        </div>
                      ))}
                      {m.customer.map(c => (
                        <div key={c} style={{ display:'flex', alignItems:'flex-start', gap:9, fontSize:13, color:'#64748b' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" style={{ flexShrink:0, marginTop:2 }}><circle cx="12" cy="12" r="4"/></svg>
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: m.featured ? '#f0fdf8' : '#f8fafc', borderTop:'1px solid #f1f5f9', padding:'14px 22px' }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', color:'#94a3b8', marginBottom:4, letterSpacing:'0.06em' }}>Best for</div>
                    <div style={{ fontSize:12, color:'#374151', lineHeight:1.55 }}>{m.best}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background:'linear-gradient(135deg,#0f172a,#1e293b)', padding:'96px 0', textAlign:'center' }}>
          <div className="container">
            <h2 className="h2 reveal" style={{ marginBottom:16, color:'#fff' }}>Ready to run SpacioHub<br /><span style={{ background:'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>inside your own walls?</span></h2>
            <p className="lead reveal" style={{ color:'#94a3b8', marginBottom:36, maxWidth:440, margin:'12px auto 36px' }}>Talk to us. We will scope your deployment, recommend the right setup, and give you a go-live timeline -- in one 30-minute call.</p>
            <div className="reveal" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={openModal}>Request an on-prem demo</button>
              <Link to="/pricing" style={{ background:'transparent', color:'#fff', padding:'14px 28px', borderRadius:8, fontSize:15, fontWeight:600, border:'1.5px solid #334155', textDecoration:'none', transition:'all 0.2s', display:'inline-flex', alignItems:'center', gap:8 }}
                onMouseEnter={e => e.currentTarget.style.borderColor='#64748b'}
                onMouseLeave={e => e.currentTarget.style.borderColor='#334155'}>
                See enterprise pricing
              </Link>
            </div>
          </div>
        </section>

        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </main>
    </>
  )
}
