import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from './ModalContext'

const LOGO = 'https://svksiwnalmrjjnskycqb.supabase.co/storage/v1/object/public/assets/logo-no-background.png'
const LANGUAGES = ['English', 'Arabic', 'French', 'German', 'Spanish']
const SOCIAL = [
  { name: 'LinkedIn',   href: 'https://linkedin.com/company/spaciohub',  icon: <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor"><path d="M16.67 0H3.33A3.33 3.33 0 000 3.33v13.34A3.33 3.33 0 003.33 20h13.34A3.33 3.33 0 0020 16.67V3.33A3.33 3.33 0 0016.67 0zM6.67 15.83H4.17V7.5h2.5v8.33zm-1.25-9.44a1.44 1.44 0 110-2.89 1.44 1.44 0 010 2.89zm10.41 9.44h-2.5v-4.05c0-.97-.02-2.2-1.34-2.2-1.35 0-1.55 1.05-1.55 2.14v4.11h-2.5V7.5h2.4v1.14h.03c.33-.63 1.15-1.3 2.37-1.3 2.54 0 3.01 1.67 3.01 3.84v4.65z"/></svg> },
  { name: 'X',          href: 'https://twitter.com/spaciohub',           icon: <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor"><path d="M15.75 1.5h2.9L12.5 8.77 19.6 18.5h-5.97l-4.47-5.84-5.1 5.84H1.14l6.5-7.44L.4 1.5h6.12l4.04 5.34L15.75 1.5zm-1.02 15.3h1.61L5.4 3.15H3.67l11.06 13.65z"/></svg> },
  { name: 'Instagram',  href: 'https://instagram.com/spaciohub',         icon: <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor"><path d="M10 1.8c2.67 0 2.99.01 4.04.06 2.74.13 4.02 1.42 4.14 4.14.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.13 2.72-1.4 4.02-4.14 4.14-1.05.05-1.36.06-4.04.06s-2.99-.01-4.04-.06C3.22 18.09 1.93 16.8 1.8 14.08 1.76 13.03 1.75 12.71 1.75 10s.01-2.99.06-4.04C1.93 3.22 3.22 1.93 5.96 1.8 7.01 1.76 7.33 1.8 10 1.8zm0-1.8C7.28 0 6.94.01 5.88.06 2.24.23.23 2.24.06 5.88.01 6.94 0 7.28 0 10s.01 3.06.06 4.12c.17 3.64 2.18 5.65 5.82 5.82C6.94 19.99 7.28 20 10 20s3.06-.01 4.12-.06c3.63-.17 5.65-2.18 5.82-5.82C19.99 13.06 20 12.72 20 10s-.01-3.06-.06-4.12C19.77 2.25 17.76.23 14.12.06 13.06.01 12.72 0 10 0zm0 4.86a5.14 5.14 0 100 10.28A5.14 5.14 0 0010 4.86zm0 8.48a3.34 3.34 0 110-6.68 3.34 3.34 0 010 6.68zm5.34-9.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/></svg> },
  { name: 'YouTube',    href: 'https://youtube.com/@spaciohub',          icon: <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor"><path d="M19.58 5.26a2.49 2.49 0 00-1.76-1.76C16.25 3.08 10 3.08 10 3.08s-6.25 0-7.82.42A2.49 2.49 0 00.42 5.26C0 6.83 0 10.08 0 10.08s0 3.25.42 4.82a2.49 2.49 0 001.76 1.76c1.57.42 7.82.42 7.82.42s6.25 0 7.82-.42a2.49 2.49 0 001.76-1.76c.42-1.57.42-4.82.42-4.82s0-3.25-.42-4.82zM8 12.91V7.25l5.23 2.83L8 12.91z"/></svg> },
]

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
              <div style={{ display:'flex', gap:8, marginBottom:24 }}>
                {SOCIAL.map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noreferrer" title={s.name}
                    style={{ width:34, height:34, background:'#1e293b', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#64748b', textDecoration:'none', transition:'all 0.2s', border:'1px solid #334155' }}
                    onMouseEnter={e=>{ e.currentTarget.style.background='#00c07a'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#00c07a' }}
                    onMouseLeave={e=>{ e.currentTarget.style.background='#1e293b'; e.currentTarget.style.color='#64748b'; e.currentTarget.style.borderColor='#334155' }}>
                    {s.icon}
                  </a>
                ))}
              </div>
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
