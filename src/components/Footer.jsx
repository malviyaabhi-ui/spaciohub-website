import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from './ModalContext'

const LOGO = 'https://svksiwnalmrjjnskycqb.supabase.co/storage/v1/object/public/assets/logo-no-background.png'
const LANGUAGES = ['English', 'Arabic', 'French', 'German', 'Spanish']

const FL = ({ to, href, children }) => {
  const s = { display:'block', fontSize:13, color:'#64748b', textDecoration:'none', padding:'4px 0', transition:'color 0.15s' }
  const h = { onMouseEnter:e=>e.target.style.color='#00c07a', onMouseLeave:e=>e.target.style.color='#64748b' }
  if (href) return <a href={href} target={href.startsWith('http')?'_blank':'_self'} rel="noreferrer" style={s} {...h}>{children}</a>
  return <Link to={to} style={s} {...h}>{children}</Link>
}

const ColHead = ({ children }) => (
  <h4 style={{ fontSize:11, fontWeight:700, color:'#fff', marginBottom:16, letterSpacing:'1px', textTransform:'uppercase' }}>{children}</h4>
)

export default function Footer() {
  const { openModal } = useModal()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [lang, setLang] = useState('English')
  const [langOpen, setLangOpen] = useState(false)

  return (
    <footer style={{ fontFamily:'Inter,sans-serif' }}>

      {/* ── MAIN ── */}
      <div style={{ background:'#0f172a', borderTop:'1px solid #1e293b' }}>
        <div className="container" style={{ padding:'64px 48px 48px' }}>

          {/* 5-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10" style={{ marginBottom:48 }}>

            {/* Brand — col-span-2 */}
            <div className="md:col-span-2">
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                <img src={LOGO} alt="SpacioHub" style={{ height:28, filter:'brightness(0) invert(1)' }} />
                <span style={{ fontSize:18, fontWeight:700, color:'#fff' }}>SpacioHub</span>
              </div>
              <p style={{ fontSize:13, color:'#64748b', lineHeight:1.8, maxWidth:260, marginBottom:24 }}>
                Smart workspace management for modern teams. Room booking, door displays, visitor management, and analytics in one platform.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                <a href="mailto:contact@spaciohub.com" style={{ fontSize:12, color:'#475569', textDecoration:'none', display:'flex', alignItems:'center', gap:7, transition:'color 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#00c07a'} onMouseLeave={e=>e.currentTarget.style.color='#475569'}>
                  <span>✉</span> contact@spaciohub.com
                </a>
                <a href="https://wa.me/971585889306" target="_blank" rel="noreferrer" style={{ fontSize:12, color:'#475569', textDecoration:'none', display:'flex', alignItems:'center', gap:7, transition:'color 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#00c07a'} onMouseLeave={e=>e.currentTarget.style.color='#475569'}>
                  <span>📱</span> +971 58 588 9306
                </a>
                <span style={{ fontSize:12, color:'#475569', display:'flex', alignItems:'center', gap:7 }}>
                  <span>📍</span> Dubai, UAE
                </span>
              </div>
            </div>

            {/* Platform */}
            <div>
              <ColHead>Platform</ColHead>
              <FL to="/platform/booking">Room Booking</FL>
              <FL to="/platform/visitors">Visitor Management</FL>
              <FL to="/platform/door-display">Door Display</FL>
              <FL to="/platform/analytics">Analytics</FL>
              <FL to="/platform/ai-booker">AI Room Booker</FL>
              <FL to="/platform/integrations">Integrations</FL>
              <FL to="/pricing">Pricing</FL>
            </div>

            {/* Use Cases */}
            <div>
              <ColHead>Use Cases</ColHead>
              <FL to="/use-cases/corporate">Corporate Offices</FL>
              <FL to="/use-cases/coworking">Coworking Spaces</FL>
              <FL to="/use-cases/hotels">Hotels and Venues</FL>
              <FL to="/use-cases/resellers">SaaS Resellers</FL>
              <FL to="/roles">Who Its For</FL>
              <div style={{ marginTop:20 }}>
                <ColHead>Company</ColHead>
                <FL to="/contact">Contact Us</FL>
                <button onClick={openModal} style={{ display:'block', fontSize:13, color:'#00c07a', background:'none', border:'none', cursor:'pointer', padding:'4px 0', fontFamily:'Inter,sans-serif', fontWeight:600 }}>
                  Request Demo
                </button>
              </div>
            </div>

            {/* Resources */}
            <div>
              <ColHead>Resources</ColHead>
              <FL href="https://go.spaciohub.com">Sign In</FL>
              <FL href="https://go.spaciohub.com">Free Trial</FL>
              <FL to="/help">Help Centre</FL>
              <FL to="/blog">Blog</FL>
              <FL to="/changelog">Changelog</FL>
              <div style={{ marginTop:20 }}>
                <ColHead>Legal</ColHead>
                <FL to="/privacy">Privacy Policy</FL>
                <FL to="/terms">Terms of Use</FL>
                <FL to="/cookies">Cookie Policy</FL>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div style={{ paddingTop:32, borderTop:'1px solid #1e293b' }}>
            <div style={{ maxWidth:480 }}>
              <h4 style={{ fontSize:13, fontWeight:700, color:'#fff', marginBottom:6 }}>Stay in the loop</h4>
              <p style={{ fontSize:12, color:'#64748b', marginBottom:14 }}>Product updates, workspace tips, new features. No spam ever.</p>
              {subscribed ? (
                <div style={{ color:'#00c07a', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
                  <span>✓</span> You are subscribed. Thanks!
                </div>
              ) : (
                <form onSubmit={e=>{e.preventDefault();if(email){setSubscribed(true);setEmail('')}}} style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" required
                    style={{ flex:1, minWidth:200, background:'#1e293b', border:'1px solid #334155', borderRadius:8, padding:'9px 14px', fontSize:13, color:'#fff', fontFamily:'Inter,sans-serif', outline:'none' }}
                    onFocus={e=>e.target.style.borderColor='#00c07a'} onBlur={e=>e.target.style.borderColor='#334155'} />
                  <button type="submit" style={{ background:'#00c07a', color:'#fff', border:'none', borderRadius:8, padding:'9px 20px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ background:'#080f1e', borderTop:'1px solid #1e293b', padding:'12px 48px' }}>
        <div className="container" style={{ padding:0, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
          <p style={{ fontSize:12, color:'#334155' }}>
            2026 SpacioHub by{' '}
            <a href="https://risertechnologies.net" target="_blank" rel="noreferrer" style={{ color:'#475569', textDecoration:'none' }}
              onMouseEnter={e=>e.target.style.color='#00c07a'} onMouseLeave={e=>e.target.style.color='#475569'}>
              Riser Technologies
            </a>. All rights reserved.
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ position:'relative' }}>
              <button onClick={()=>setLangOpen(o=>!o)}
                style={{ display:'flex', alignItems:'center', gap:5, background:'#1e293b', border:'1px solid #334155', borderRadius:7, padding:'5px 10px', fontSize:11, color:'#94a3b8', cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
                🌐 {lang} ▾
              </button>
              {langOpen && (
                <div style={{ position:'absolute', bottom:'100%', right:0, marginBottom:4, background:'#1e293b', border:'1px solid #334155', borderRadius:10, overflow:'hidden', zIndex:9999, minWidth:130, boxShadow:'0 8px 24px rgba(0,0,0,0.4)' }}>
                  {LANGUAGES.map(l=>(
                    <button key={l} onClick={()=>{setLang(l);setLangOpen(false)}}
                      style={{ display:'block', width:'100%', padding:'8px 14px', fontSize:12, color:l===lang?'#00c07a':'#94a3b8', background:'none', border:'none', cursor:'pointer', fontFamily:'Inter,sans-serif', textAlign:'left' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#0f172a'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer"
              style={{ fontSize:12, color:'#334155', textDecoration:'none' }}
              onMouseEnter={e=>e.target.style.color='#00c07a'} onMouseLeave={e=>e.target.style.color='#334155'}>
              go.spaciohub.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
