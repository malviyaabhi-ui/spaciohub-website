import React, { useState } from 'react'
import { useModal } from './ModalContext'

export default function DemoModal() {
  const { open, closeModal } = useModal()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

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
      <div className="modal-box">
        <button className="modal-close" onClick={closeModal}>✕</button>

        {!sent ? (
          <>
            <div style={{ width: 48, height: 48, background: '#ecfdf5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>🚀</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>Request a Demo</h2>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>See SpacioHub in action. We'll reach out within 24 hours to schedule your personalised walkthrough.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-group"><label>FULL NAME *</label><input name="name" placeholder="Alex Johnson" required /></div>
                <div className="form-group"><label>COMPANY *</label><input name="company" placeholder="Acme Corp" required /></div>
              </div>
              <div className="form-row-2">
                <div className="form-group"><label>EMAIL *</label><input name="email" type="email" placeholder="alex@company.com" required /></div>
                <div className="form-group"><label>PHONE</label><input name="phone" type="tel" placeholder="+971 50 000 0000" /></div>
              </div>
              <div className="form-group">
                <label>NUMBER OF ROOMS</label>
                <select name="rooms">
                  <option value="" disabled defaultValue="">Select range</option>
                  <option>1–5 rooms</option><option>6–15 rooms</option><option>16–30 rooms</option><option>30+ rooms</option>
                </select>
              </div>
              <div className="form-group"><label>WHAT DO YOU NEED?</label><textarea name="message" placeholder="Tell us about your workspace and goals..." /></div>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: 13, background: loading ? '#94a3b8' : '#00c07a', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s', marginTop: 6 }}>
                {loading ? 'Sending...' : 'Request Demo →'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>We'll be in touch!</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>Thanks for reaching out. Our team will contact you within 24 hours to schedule your SpacioHub demo.</p>
            <button onClick={closeModal} style={{ marginTop: 24, padding: '10px 24px', background: '#00c07a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}
