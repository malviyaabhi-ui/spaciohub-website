import React, { useState } from 'react'
import { useModal } from './ModalContext'

export default function DemoModal() {
  const { open, closeModal } = useModal()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('live')

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.target)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
    const body = encodeURIComponent(`Demo Request\n\nName: ${fd.get('name')}\nCompany: ${fd.get('company')}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone')}\nRooms: ${fd.get('rooms')}\nMessage: ${fd.get('message')}`)
    const sub = encodeURIComponent('SpacioHub Demo Request')
    setTimeout(() => { window.location.href = `mailto:contact@spaciohub.com?subject=${sub}&body=${body}` }, 600)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()} style={{ animation: 'fadeIn 0.2s ease' }}>
      <div className="modal-box" style={{ maxWidth: 520 }}>
        <button className="modal-close" onClick={closeModal}>✕</button>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: '#f1f5f9', borderRadius: 10, padding: 4 }}>
          <button onClick={() => setTab('live')} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 600, transition: 'all 0.15s', background: tab === 'live' ? '#fff' : 'transparent', color: tab === 'live' ? '#0f172a' : '#64748b', boxShadow: tab === 'live' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>🚀 Try Live Demo</button>
          <button onClick={() => setTab('request')} style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 600, transition: 'all 0.15s', background: tab === 'request' ? '#fff' : 'transparent', color: tab === 'request' ? '#0f172a' : '#64748b', boxShadow: tab === 'request' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>📅 Request Walkthrough</button>
        </div>
        {tab === 'live' && (
          <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🚀</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 10 }}>Explore SpacioHub Live</h2>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28, lineHeight: 1.7 }}>Jump straight into a fully populated demo workspace — Thundertail Media. No signup, no credit card.</p>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px', marginBottom: 24, textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>What you will see</div>
              {['7 meeting rooms with live availability','Room booking calendar and filters','Visitor management and check-in','Digital signage and door displays','Analytics and utilisation reports','AI room booker (Mira)'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#ecfdf5', border: '1px solid #00c07a33', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg viewBox="0 0 12 12" width="10" height="10"><path d="M2 6l3 3 5-5" stroke="#00c07a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: '#374151' }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://go.spaciohub.com?demo=true" target="_blank" rel="noreferrer" onClick={closeModal} style={{ display: 'block', width: '100%', padding: '14px', background: '#00c07a', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter,sans-serif', textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box' }}>Launch Live Demo →</a>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 12 }}>Opens in a new tab · No account needed</p>
          </div>
        )}
        {tab === 'request' && !sent && (
          <>
            <div style={{ width: 48, height: 48, background: '#ecfdf5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>📅</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>Request a Walkthrough</h2>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>We will reach out within 24 hours to schedule your personalised walkthrough.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-group"><label>FULL NAME *</label><input name="name" placeholder="Alex Johnson" required /></div>
                <div className="form-group"><label>COMPANY *</label><input name="company" placeholder="Acme Corp" required /></div>
              </div>
              <div className="form-row-2">
                <div className="form-group"><label>EMAIL *</label><input name="email" type="email" placeholder="alex@company.com" required /></div>
                <div className="form-group"><label>PHONE</label><input name="phone" type="tel" placeholder="+971 50 000 0000" /></div>
              </div>
              <div className="form-group"><label>NUMBER OF ROOMS</label><select name="rooms"><option value="" disabled defaultValue="">Select range</option><option>1-5 rooms</option><option>6-15 rooms</option><option>16-30 rooms</option><option>30+ rooms</option></select></div>
              <div className="form-group"><label>WHAT DO YOU NEED?</label><textarea name="message" placeholder="Tell us about your workspace and goals..." /></div>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: 13, background: loading ? '#94a3b8' : '#00c07a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s', marginTop: 6 }}>{loading ? 'Sending...' : 'Request Walkthrough →'}</button>
            </form>
          </>
        )}
        {tab === 'request' && sent && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>We will be in touch!</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>Thanks for reaching out. Our team will contact you within 24 hours.</p>
            <button onClick={closeModal} style={{ marginTop: 24, padding: '10px 24px', background: '#00c07a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}
