import React, { useState } from 'react'
import { useModal } from '../../components/ModalContext'

function AnalyticsVisual() {
  const [hover, setHover] = useState(null)
  const [tab, setTab] = useState('This week')
  const bars = [{h:55,l:'Mon'},{h:78,l:'Tue'},{h:92,l:'Wed'},{h:71,l:'Thu'},{h:45,l:'Fri'},{h:18,l:'Sat'},{h:8,l:'Sun'}]
  return (
    <div style={{ background:'linear-gradient(160deg,#0f172a,#1a2744)', borderRadius:20, padding:28, boxShadow:'0 24px 60px rgba(0,0,0,0.25)', border:'1px solid #1e293b' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <div style={{ fontSize:11,fontWeight:700,color:'#475569',letterSpacing:'1px',textTransform:'uppercase' }}>Space Utilisation</div>
        <div style={{ fontSize:10,color:'#00c07a',fontWeight:600 }}>● Live</div>
      </div>
      <div style={{ display:'flex', gap:6, marginBottom:18 }}>
        {['This week','Last week','Monthly'].map((t,i)=>(
          <div key={t} onClick={()=>setTab(t)} style={{ padding:'4px 10px',borderRadius:6,fontSize:10,fontWeight:700,background:tab===t?'rgba(0,192,122,0.15)':'transparent',color:tab===t?'#00c07a':'#334155',border:tab===t?'1px solid rgba(0,192,122,0.3)':'1px solid transparent',cursor:'pointer' }}>{t}</div>
        ))}
      </div>
      <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:100, marginBottom:6 }}>
        {bars.map((b,i)=>(
          <div key={i} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4,position:'relative' }}
            onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}>
            {hover===i&&<div style={{ position:'absolute',bottom:'100%',left:'50%',transform:'translateX(-50%)',background:'#fff',color:'#0f172a',fontSize:10,fontWeight:800,padding:'3px 8px',borderRadius:6,whiteSpace:'nowrap',marginBottom:4,boxShadow:'0 4px 12px rgba(0,0,0,0.2)' }}>{b.h}%</div>}
            <div style={{ width:'100%',height:`${b.h}%`,borderRadius:'5px 5px 0 0',background:i===2?'#00c07a':hover===i?'rgba(0,192,122,0.6)':'rgba(0,192,122,0.2)',transition:'all 0.25s',cursor:'pointer' }}/>
            <div style={{ fontSize:9,color:'#334155',fontWeight:600 }}>{b.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:16 }}>
        {[['72%','Avg Usage','#00c07a'],['340','Bookings','#3b82f6'],['18','No-shows','#f59e0b']].map(([v,l,c])=>(
          <div key={l} style={{ background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'12px 10px',textAlign:'center' }}>
            <div style={{ fontSize:22,fontWeight:900,color:c,letterSpacing:-0.5,lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:9,color:'#475569',marginTop:4,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px' }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:16 }}>
        <div style={{ fontSize:9,fontWeight:700,color:'#334155',letterSpacing:'1px',marginBottom:8 }}>ROOMS BY UTILISATION</div>
        {[['Board Room','#8b5cf6',87],['Conference','#f59e0b',74],['Team Room','#10b981',62],['Focus Room','#3b82f6',45]].map(([n,c,p])=>(
          <div key={n} style={{ display:'flex',alignItems:'center',gap:8,marginBottom:7 }}>
            <div style={{ width:6,height:6,borderRadius:'50%',background:c,flexShrink:0 }}/>
            <div style={{ fontSize:10,color:'#94a3b8',width:80,flexShrink:0 }}>{n}</div>
            <div style={{ flex:1,height:4,borderRadius:2,background:'#1e293b' }}><div style={{ height:'100%',width:`${p}%`,borderRadius:2,background:c }}/></div>
            <div style={{ fontSize:10,fontWeight:700,color:c,width:28,textAlign:'right' }}>{p}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Analytics() {
  const { openModal } = useModal()
  return (
    <main style={{ paddingTop:64, fontFamily:'Inter,sans-serif' }}>

      {/* HERO */}
      <section style={{ background:'linear-gradient(170deg,#f5f3ff,#fff 60%,#f8fafc)', borderBottom:'1px solid #e2e8f0', padding:'88px 0 72px', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute',top:-80,right:-80,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,0.08),transparent 65%)',pointerEvents:'none' }}/>
        <div className="container" style={{ position:'relative' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <span className="tag animate-fade-up">Platform</span>
              <h1 className="h1 animate-fade-up delay-1" style={{ fontSize:'clamp(30px,4vw,52px)', marginBottom:20 }}>
                Space <span style={{ background:'linear-gradient(135deg,#8b5cf6,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>Analytics</span>
              </h1>
              <p className="lead animate-fade-up delay-2" style={{ marginBottom:36 }}>Stop guessing. SpacioHub's live analytics reveal exactly how your spaces are used so you can optimise with confidence and reduce wasted real estate costs.</p>
              <div className="animate-fade-up delay-3" style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 8px 28px rgba(0,192,122,0.3)' }}>See analytics demo →</button>
                <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free</a>
              </div>
            </div>
            <div className="animate-fade-up delay-2"><AnalyticsVisual /></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'80px 0', borderBottom:'1px solid #e2e8f0', background:'#fff' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <span className="tag reveal">What you can measure</span>
            <h2 className="h2 reveal">Data that drives <span style={{ background:'linear-gradient(135deg,#8b5cf6,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>real decisions</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {[
              { title:'Peak hour heatmaps',    desc:'See your busiest times at a glance — by hour, day, and room. Know exactly when demand spikes.',        icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#f5f3ff"/><rect x="7" y="20" width="5" height="13" rx="1" fill="#8b5cf6" opacity="0.4"/><rect x="14" y="14" width="5" height="19" rx="1" fill="#8b5cf6" opacity="0.65"/><rect x="21" y="9" width="5" height="24" rx="1" fill="#8b5cf6"/><path d="M8 19l7-6 6-4 6-3" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg> },
              { title:'Room utilisation rates',desc:'Per room, per floor, per week. Instantly identify your over-booked and under-used spaces.',              icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#f5f3ff"/><circle cx="20" cy="20" r="11" fill="#8b5cf6" opacity="0.1"/><circle cx="20" cy="20" r="11" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="45 25"/><circle cx="20" cy="20" r="5" fill="#8b5cf6" opacity="0.3"/></svg> },
              { title:'No-show tracking',      desc:'Catch ghost bookings before they waste space. See who books and never shows up, by person and room.',   icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#fff1f2"/><circle cx="20" cy="18" r="7" fill="#ef4444" opacity="0.15"/><circle cx="20" cy="18" r="7" stroke="#ef4444" strokeWidth="1.5"/><path d="M16 18h8M20 14v8" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" style={{ transform:'rotate(45deg)', transformOrigin:'20px 18px' }}/></svg> },
              { title:'Tag breakdowns',        desc:'Analyse by meeting type — client meetings, training, all-hands. See which types dominate your spaces.',  icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#f5f3ff"/><path d="M9 9h13l10 11-10 11H9V9z" fill="#8b5cf6" opacity="0.2"/><path d="M9 9h13l10 11-10 11H9V9z" stroke="#8b5cf6" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="17" cy="20" r="2.5" fill="#8b5cf6"/></svg> },
              { title:'CSV & data export',     desc:'Export any report to CSV. Bring your utilisation data into Excel, BI tools, or your own dashboards.',    icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#f5f3ff"/><rect x="10" y="8" width="20" height="24" rx="2" fill="#8b5cf6" opacity="0.1"/><rect x="10" y="8" width="20" height="24" rx="2" stroke="#8b5cf6" strokeWidth="1.5"/><rect x="13" y="14" width="14" height="2" rx="1" fill="#8b5cf6" opacity="0.6"/><rect x="13" y="18" width="10" height="2" rx="1" fill="#8b5cf6" opacity="0.4"/><path d="M20 25v5M17 28l3 3 3-3" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { title:'Live dashboard',        desc:'Real-time overview of every room in your organisation — bookings, check-ins, and availability at a glance.', icon:<svg viewBox="0 0 40 40" width="22" height="22" fill="none"><rect width="40" height="40" rx="10" fill="#f5f3ff"/><rect x="8" y="8" width="11" height="11" rx="2" fill="#8b5cf6" opacity="0.5"/><rect x="21" y="8" width="11" height="11" rx="2" fill="#8b5cf6" opacity="0.3"/><rect x="8" y="21" width="11" height="11" rx="2" fill="#8b5cf6" opacity="0.3"/><rect x="21" y="21" width="11" height="11" rx="2" fill="#8b5cf6" opacity="0.6"/></svg> },
            ].map((f,i)=>(
              <div key={f.title} className="card reveal" style={{ animationDelay:`${i*0.08}s` }}>
                <div style={{ width:44,height:44,borderRadius:12,background:'#f5f3ff',border:'1px solid #ddd6fe',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16 }}>{f.icon}</div>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:8,color:'#0f172a' }}>{f.title}</h3>
                <p style={{ fontSize:13,color:'#64748b',lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEEP DIVE VISUAL */}
      <section style={{ padding:'80px 0', background:'#f8fafc', borderBottom:'1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <span className="tag reveal">ROI</span>
              <h2 className="h2 reveal" style={{ marginBottom:16 }}>Cut real estate costs with <span style={{ background:'linear-gradient(135deg,#8b5cf6,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>real data</span></h2>
              <p className="body reveal" style={{ marginBottom:24 }}>Most companies don't know which rooms get used and which sit empty. SpacioHub makes it obvious — so you can downsize underused rooms, reconfigure layouts, and justify every square metre.</p>
              <div className="check-list reveal">
                {[
                  '<strong>Peak hour heatmaps</strong> — see busiest times at a glance',
                  '<strong>No-show tracking</strong> — identify and reduce ghost bookings',
                  '<strong>Room utilisation rates</strong> — per room, per floor, per week',
                  '<strong>Tag-based breakdowns</strong> — analyse by meeting type',
                  '<strong>CSV export</strong> — bring data into your own BI tools',
                ].map((c,i)=>(
                  <div key={i} className="check-item">
                    <div className="check-ic" style={{ background:'#8b5cf6' }}><svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg></div>
                    <div className="check-text" dangerouslySetInnerHTML={{ __html:c }}/>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal"><AnalyticsVisual /></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'linear-gradient(135deg,#f5f3ff,#fff)', borderTop:'1px solid #ddd6fe', padding:'80px 0', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',top:-80,left:'50%',transform:'translateX(-50%)',width:600,height:300,background:'radial-gradient(ellipse,rgba(139,92,246,0.08),transparent 65%)',pointerEvents:'none' }}/>
        <div className="container" style={{ position:'relative' }}>
          <div style={{ marginBottom:16, display:'flex', justifyContent:'center' }}>
            <svg viewBox="0 0 80 80" width="72" height="72" fill="none"><rect width="80" height="80" rx="20" fill="#f5f3ff"/><rect x="12" y="48" width="12" height="22" rx="2" fill="#8b5cf6" opacity="0.4"/><rect x="28" y="36" width="12" height="34" rx="2" fill="#8b5cf6" opacity="0.65"/><rect x="44" y="24" width="12" height="46" rx="2" fill="#8b5cf6"/><path d="M16 46l14-12 16-10 14-8" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
          </div>
          <h2 className="h2 reveal" style={{ marginBottom:14 }}>Turn space data into <span style={{ background:'linear-gradient(135deg,#8b5cf6,#0F799B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:900 }}>real savings</span></h2>
          <p className="lead reveal" style={{ marginBottom:36, color:'#64748b' }}>14-day free trial. No credit card required.</p>
          <div className="reveal" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal} style={{ boxShadow:'0 8px 28px rgba(0,192,122,0.3)' }}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Start free trial</a>
          </div>
        </div>
      </section>
    </main>
  )
}
