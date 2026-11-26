import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'

// Hardware product page — SpacioHub One (SPH-ONE-10)
// Specs below are the published SPH-ONE-10 specs; keep them verbatim.

const ZOHO_ENDPOINT = 'https://crm.zoho.com/crm/WebToLeadForm'
const ZOHO_OWNER    = 'f50286470ec29985ecf20548fce7796304c10dc30b2fb8d7e31dc8272a48931e9dc92aa6a167a2430dbd788c52659e90'
const ZOHO_FORM_ID  = 'af29bad243ed773e55de31855ccd9b688e5d89e5bcc7a8aec633359f355c049f'

const A = '/hardware/spaciohub-one/'
const GRAD = { background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
const Arrow = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>

const GALLERY = [
  { src: A + 'back-label.webp',     alt: 'Rear of SpacioHub One with its product label: SPH-ONE-10, 12 V 2 A, PoE 48 V 0.5 A, CE, RoHS', fit: 'contain' },
  { src: A + 'states/in-use.webp',  alt: 'SpacioHub One on a glass door, room in use', fit: 'cover' },
  { src: A + 'side-left.webp',      alt: 'Left side: 22 mm body, speaker grille and LED edge', fit: 'contain' },
  { src: A + 'side-right.webp',     alt: 'Right side with power button and green LED bar lit', fit: 'contain' },
  { src: A + 'ports-rear.webp',     alt: 'Rear I/O bay: DC, Serial, USB, power/reset, Type-C, card slot, LAN', fit: 'contain' },
  { src: '/screenshots/spaciohub-pad-panel.webp', alt: 'SpacioHub One with its LED status bar glowing green', fit: 'contain' },
]

const STATES = [
  { key: 'free',        label: 'Free',           color: '#00c07a', desc: 'Anyone can walk up and book. No login needed.' },
  { key: 'starts-soon', label: 'Starts soon',    color: '#f59e0b', desc: 'Amber warns the current occupant to wrap up.' },
  { key: 'in-use',      label: 'In use',         color: '#ef4444', desc: 'Live meeting with End now and +15 / +30 extend.' },
  { key: 'vip',         label: 'VIP meeting',    color: '#06b6d4', desc: 'Only the organiser or an attendee can end it.' },
  { key: 'dnd',         label: 'Do not disturb', color: '#8b5cf6', desc: 'Tells everyone the room must not be interrupted.' },
  { key: 'reserved',    label: 'Reserved',       color: '#3b82f6', desc: 'Held by an admin, so nobody grabs it.' },
]

function StatusShowcase() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI(n => (n + 1) % STATES.length), 3500)
    return () => clearInterval(t)
  }, [auto])
  const st = STATES[i]
  return (
    <section style={{ background: '#0b1220', padding: '72px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="tag reveal" style={{ color: st.color, transition: 'color .4s' }}>LED status bar</span>
          <h2 className="h2 reveal" style={{ color: '#fff' }}>One glance from <span style={{ color: st.color, transition: 'color .4s' }}>down the hall</span></h2>
          <p className="reveal" style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '12px auto 0' }}>The light bar around the panel takes the room's status colour, and the screen shows exactly what's happening.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 32, alignItems: 'center' }}>
          <div role="tablist" aria-label="Room states" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STATES.map((s, n) => (
              <button key={s.key} role="tab" aria-selected={n === i} onClick={() => { setI(n); setAuto(false) }}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start', textAlign: 'left', padding: '14px 16px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
                  background: n === i ? 'rgba(255,255,255,0.06)' : 'transparent', border: `1px solid ${n === i ? s.color + '66' : 'transparent'}`, transition: 'all .3s' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: s.color, boxShadow: n === i ? `0 0 14px ${s.color}` : 'none', marginTop: 5, flex: 'none' }} />
                <span>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: n === i ? '#fff' : 'rgba(255,255,255,0.6)' }}>{s.label}</span>
                  {n === i && <span style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{s.desc}</span>}
                </span>
              </button>
            ))}
          </div>
          <div style={{ gridColumn: 'span 2', position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '3/2', maxWidth: '100%', boxShadow: `0 30px 80px -20px ${st.color}55`, transition: 'box-shadow .5s' }}>
            {STATES.map((s, n) => (
              <img key={s.key} src={A + 'states/' + s.key + '.webp'} alt={`SpacioHub One on a glass meeting-room door showing ${s.label}`} loading={n ? 'lazy' : 'eager'} width="1536" height="1024"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: n === i ? 1 : 0, transition: 'opacity .6s' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const SPECS = [
  ['Display',          '10.1" IPS touchscreen'],
  ['Processor',        'Rockchip RK3576 octa-core'],
  ['Memory / Storage', '4 GB RAM / 32 GB'],
  ['OS',               'Android 14'],
  ['Wireless',         'Wi-Fi 2.4/5 GHz · Bluetooth'],
  ['NFC',              'Built-in reader'],
  ['Ethernet',         'RJ45 · PoE capable'],
  ['Power',            '12 V ⎓ 2 A · PoE 48 V 0.5 A'],
  ['Dimensions',       '260 × 171 × 22 mm'],
  ['Compliance',       'CE (RED 2014/53/EU) · RoHS · WEEE'],
  ['Manufacturer',     'Shenzhen Electron Technology Co., Ltd.'],
]

const PORTS = [['DC', '12 V in'], ['Serial', ''], ['USB', 'USB-A'], ['⏻', 'Power / reset'], ['Type-C', 'USB-C'], ['Card', 'Card slot'], ['LAN', 'RJ45 · PoE']]

const FEATURES = [
  { tag: 'LED status bar', title: 'Seen from down the hall', img: A + 'side-right.webp', pos: '50% 35%',
    text: 'A light bar wraps the whole bezel and takes the room’s status colour.',
    points: ['Full-perimeter RGB light bar', 'Follows the status set in SpacioHub'] },
  { tag: 'Power over Ethernet', title: 'One cable, power and data', img: A + 'ports-rear.webp', pos: '50% 50%',
    text: 'Run one Ethernet line from a PoE switch. No socket needed at the door.',
    points: ['PoE 48 V · 0.5 A, or 12 V DC', 'Wi-Fi 2.4 / 5 GHz and Bluetooth'] },
  { tag: 'NFC & scan to book', title: 'Tap a badge or scan', img: A + 'screen-in-use.webp', pos: '50% 50%',
    text: 'Badge tap confirms the booking. Guests scan the code, register or book.',
    points: ['Built-in NFC reader', 'Visitor and guest booking at the door'] },
]

function QuoteForm() {
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', country: '', qty: '', message: '' })
  const [state, setState] = useState('idle')
  const set = (k, v) => setF(p => ({ ...p, [k]: v }))
  const submit = async e => {
    e.preventDefault()
    setState('sending')
    const d = new FormData()
    d.append('xnQsjsdp', ZOHO_FORM_ID); d.append('xmIwtLD', ZOHO_OWNER); d.append('actionType', 'TGVhZHM=')
    d.append('Last Name', f.name); d.append('Email', f.email); d.append('Phone', f.phone); d.append('Company', f.company)
    d.append('Description', `Hardware quote: SpacioHub One (SPH-ONE-10)\nPanels: ${f.qty || 'n/a'}\nCountry: ${f.country || 'n/a'}\n\n${f.message}`)
    d.append('aG9uZXlwb3Q', '')
    try { await fetch(ZOHO_ENDPOINT, { method: 'POST', body: d, mode: 'no-cors' }); setState('sent') }
    catch { setState('error') }
  }
  if (state === 'sent') return (
    <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 14, padding: 32, textAlign: 'center' }}>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Request received</h3>
      <p className="body">We'll send pricing for SpacioHub One within one working day.</p>
    </div>
  )
  return (
    <form onSubmit={submit} className="card" style={{ padding: 32 }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ columnGap: 14 }}>
        <div className="form-group"><label htmlFor="q-name">FULL NAME *</label><input id="q-name" required value={f.name} onChange={e => set('name', e.target.value)} placeholder="Alex Johnson" /></div>
        <div className="form-group"><label htmlFor="q-company">COMPANY *</label><input id="q-company" required value={f.company} onChange={e => set('company', e.target.value)} placeholder="Acme Corp" /></div>
        <div className="form-group"><label htmlFor="q-email">EMAIL *</label><input id="q-email" type="email" required value={f.email} onChange={e => set('email', e.target.value)} placeholder="alex@company.com" /></div>
        <div className="form-group"><label htmlFor="q-phone">PHONE</label><input id="q-phone" type="tel" value={f.phone} onChange={e => set('phone', e.target.value)} placeholder="+971 50 000 0000" /></div>
        <div className="form-group"><label htmlFor="q-country">COUNTRY *</label>
          <select id="q-country" required value={f.country} onChange={e => set('country', e.target.value)}>
            <option value="" disabled>Select country</option>
            {['United Arab Emirates','Saudi Arabia','Qatar','Kuwait','Bahrain','Oman','Nigeria','Kenya','Egypt','South Africa','Other'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group"><label htmlFor="q-qty">NUMBER OF PANELS</label><input id="q-qty" type="number" min="1" value={f.qty} onChange={e => set('qty', e.target.value)} placeholder="10" /></div>
      </div>
      <div className="form-group"><label htmlFor="q-msg">ABOUT YOUR ROOMS</label><textarea id="q-msg" rows={4} value={f.message} onChange={e => set('message', e.target.value)} placeholder="e.g. 12 meeting rooms over two floors, PoE switches already installed" /></div>
      {state === 'error' && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>Something went wrong. Email us at contact@spaciohub.com.</p>}
      <button type="submit" className="btn btn-primary btn-lg" disabled={state === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
        {state === 'sending' ? 'Sending…' : 'Request a quote'} <Arrow />
      </button>
    </form>
  )
}

export default function SpacioHubOne() {
  const [active, setActive] = useState(0)
  const g = GALLERY[active]

  return (
    <>
      <SEO
        title="SpacioHub One — 10.1in PoE Meeting Room Door Display"
        description="SpacioHub One (SPH-ONE-10): 10.1-inch IPS meeting room panel with LED status bar, NFC, PoE and Android 14. Built for SpacioHub. Request a quote for UAE, GCC and Africa."
        path="/hardware/spaciohub-one"
      />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

        {/* ── Hero: copy + key specs | 3D clip ───────────────── */}
        <section style={{ background: 'linear-gradient(170deg,#f0fdf8 0%,#fff 55%,#f8fafc 100%)', padding: '72px 0 64px', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: 'center' }}>
              <div>
                <span className="tag animate-fade-up">Hardware · SPH-ONE-10</span>
                <h1 className="h1 animate-fade-up delay-1" style={{ marginBottom: 16 }}>SpacioHub <span style={{ ...GRAD, fontWeight: 900 }}>One</span></h1>
                <p className="lead animate-fade-up delay-2" style={{ marginBottom: 28, maxWidth: 500 }}>
                  The 10.1" door display built for SpacioHub. Live room schedules, an LED status bar you can read from down the hall, NFC check-in, and power over a single network cable.
                </p>
                <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="#quote" className="btn btn-primary btn-lg" style={{ boxShadow: '0 8px 28px rgba(0,192,122,0.3)' }}>Request a quote <Arrow /></a>
                  <a href="/spaciohub-pad/" className="btn btn-outline btn-lg">Explore it in 3D</a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 animate-fade-up delay-4" style={{ gap: 12, marginTop: 32 }}>
                  {[['10.1"', 'IPS touch', '#00c07a'], ['8-core', 'RK3576', '#3b82f6'], ['4+32 GB', 'RAM + storage', '#8b5cf6'], ['PoE', '48 V · one cable', '#f59e0b']].map(([v, l, c]) => (
                    <div key={l} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 14px' }}>
                      <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.6, color: c }}>{v}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="animate-fade-up delay-2" style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 30px 70px -20px rgba(15,23,42,0.35)', border: '1px solid #e2e8f0', aspectRatio: '16/9', maxWidth: '100%', background: '#e2e8f0' }}>
                <video autoPlay muted loop playsInline poster={A + 'orbit-3d-poster.jpg'} aria-label="SpacioHub One mounted in a meeting room, camera orbiting the panel"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                  <source src={A + 'orbit-3d.mp4'} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* ── LED states: list | glass-door shot ─────────────── */}
        <StatusShowcase />

        {/* ── Three features side by side ────────────────────── */}
        <section style={{ padding: '72px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="tag reveal">Built for the door</span>
              <h2 className="h2 reveal">Everything a <span style={{ ...GRAD, fontWeight: 900 }}>room panel needs</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 20 }}>
              {FEATURES.map(ft => (
                <div key={ft.tag} className="card reveal" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 200, background: '#0f172a', overflow: 'hidden' }}>
                    <img src={ft.img} alt={ft.tag} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: ft.pos, display: 'block' }} />
                  </div>
                  <div style={{ padding: 24 }}>
                    <span className="tag" style={{ marginBottom: 8 }}>{ft.tag}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, color: '#0f172a', marginBottom: 8 }}>{ft.title}</h3>
                    <p className="body" style={{ fontSize: 14, marginBottom: 14 }}>{ft.text}</p>
                    <div className="check-list">
                      {ft.points.map(p => <div key={p} className="check-item"><span className="check-ic"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="check-text">{p}</span></div>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery | Specifications ───────────────────────── */}
        <section id="specs" style={{ padding: '72px 0', background: '#fff', borderBottom: '1px solid #e2e8f0', scrollMarginTop: 64 }}>
          <div className="container">
            <div style={{ marginBottom: 32 }}>
              <span className="tag reveal">Specifications</span>
              <h2 className="h2 reveal">Every angle, <span style={{ ...GRAD, fontWeight: 900 }}>every spec</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 40, alignItems: 'start' }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ background: 'linear-gradient(170deg,#f8fafc,#eef2f7)', border: '1px solid #e2e8f0', borderRadius: 16, aspectRatio: '4/3', maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img key={g.src} src={g.src} alt={g.alt} className="animate-fade-in" style={{ width: g.fit === 'cover' ? '100%' : 'auto', height: g.fit === 'cover' ? '100%' : 'auto', maxWidth: '92%', maxHeight: '92%', objectFit: g.fit, ...(g.fit === 'cover' ? { maxWidth: '100%', maxHeight: '100%' } : {}) }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GALLERY.length},1fr)`, gap: 8, marginTop: 10 }}>
                  {GALLERY.map((img, i) => (
                    <button key={img.src} onClick={() => setActive(i)} aria-label={img.alt} aria-pressed={i === active}
                      style={{ aspectRatio: '1', padding: 4, borderRadius: 10, cursor: 'pointer', background: '#f8fafc', border: i === active ? '2px solid #00c07a' : '1px solid #e2e8f0' }}>
                      <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
                  {SPECS.map(([k, v], i) => (
                    <div key={k} style={{ display: 'grid', gridTemplateColumns: '38% 1fr', gap: 12, background: i % 2 ? '#fff' : '#f8fafc', padding: '11px 18px', borderTop: i ? '1px solid #f1f5f9' : 'none' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>{k}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginTop: 12, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                  {PORTS.map(([p, d]) => (
                    <div key={p} style={{ padding: '10px 4px', textAlign: 'center', borderLeft: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{p}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{d || 'Port'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quote: copy | form ─────────────────────────────── */}
        <section id="quote" style={{ padding: '72px 0', background: 'linear-gradient(170deg,#f0fdf8,#fff 60%)', scrollMarginTop: 64 }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: 'start' }}>
              <div>
                <span className="tag reveal">Request a quote</span>
                <h2 className="h2 reveal" style={{ marginBottom: 14 }}>Kit out every <span style={{ ...GRAD, fontWeight: 900 }}>meeting room</span></h2>
                <p className="lead reveal" style={{ marginBottom: 24 }}>Tell us how many rooms you have and where. We'll send panel pricing, a SpacioHub plan and installation options for the UAE, GCC and Africa.</p>
                <div className="check-list reveal">
                  {['Panel pricing and a SpacioHub plan in one quote', 'Works with your existing PoE switches', 'Runs the SpacioHub door display out of the box'].map(p => (
                    <div key={p} className="check-item"><span className="check-ic"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="check-text">{p}</span></div>
                  ))}
                </div>
                <p className="body reveal" style={{ marginTop: 24 }}>Already have tablets? The same display runs on any iPad or Android tablet. <Link to="/platform/door-display" style={{ color: '#00c07a', fontWeight: 600, textDecoration: 'none' }}>See Door Display →</Link></p>
              </div>
              <div className="reveal"><QuoteForm /></div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
