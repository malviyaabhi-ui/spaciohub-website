import React, { useState } from 'react'
import SEO from '../components/SEO'
import { useModal } from '../components/ModalContext'

// ── ZOHO CRM WEB-TO-LEAD ENDPOINT ──────────────────────────────
// TODO: Replace with your actual Zoho CRM Web-to-Lead URL
// Get it from: Zoho CRM → Setup → Developer Space → Web Forms
const ZOHO_ENDPOINT = 'https://crm.zoho.com/crm/WebToLeadForm'
const ZOHO_OWNER    = 'YOUR_OWNER_ID'    // from Zoho form config
const ZOHO_FORM_ID  = 'YOUR_FORM_ID'     // from Zoho form config

const PLANS    = ['Not sure yet', 'Basic', 'Pro', 'Max', 'Enterprise']
const SOURCES  = ['Google Search', 'LinkedIn', 'Referral', 'Social Media', 'Product Hunt', 'Other']

export default function Contact() {
  const { openModal } = useModal()
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', message:'', plan:'', source:'' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Build form data for Zoho Web-to-Lead
    const data = new FormData()
    data.append('xnQsjsdp', ZOHO_FORM_ID)
    data.append('xmIwtLD', ZOHO_OWNER)
    data.append('actionType', 'TGVhZHM=')
    data.append('Last Name', form.name)
    data.append('Email', form.email)
    data.append('Phone', form.phone)
    data.append('Company', form.company)
    data.append('Description', form.message)
    data.append('Lead Source', form.source)
    data.append('LEADCF1', form.plan) // custom field: Plan Interest

    try {
      // When Zoho endpoint is configured, uncomment this:
      // await fetch(ZOHO_ENDPOINT, { method: 'POST', body: data, mode: 'no-cors' })

      // Simulated success for now
      await new Promise(r => setTimeout(r, 800))
      setSent(true)
    } catch {
      setError('Something went wrong. Please email us directly at contact@spaciohub.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Contact SpacioHub — Talk to Our Team" description="Get in touch with the SpacioHub team. Book a demo, ask about pricing, or get help with your workspace setup." path="/contact" />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

        {/* Hero */}
        <section style={{ background: 'linear-gradient(170deg,#f0fdf8,#fff 60%)', borderBottom: '1px solid #e2e8f0', padding: '72px 0 56px', textAlign: 'center' }}>
          <div className="container">
            <span className="tag">Contact Us</span>
            <h1 className="h1" style={{ marginBottom: 16 }}>Let's talk <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>workspaces</span></h1>
            <p className="lead" style={{ maxWidth: 460, margin: '0 auto' }}>Whether you're evaluating SpacioHub, need help with setup, or want a personalised demo — we're here.</p>
          </div>
        </section>

        {/* Main */}
        <section style={{ padding: '64px 0', background: '#f8fafc' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Left — info cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '📧', title: 'Email us', body: 'contact@spaciohub.com', sub: 'We reply within 24 hours', href: 'mailto:contact@spaciohub.com' },
                  { icon: '💬', title: 'WhatsApp', body: '+971 58 588 9306', sub: 'Quick questions? Chat now', href: 'https://wa.me/971585889306' },
                  { icon: '📍', title: 'Based in', body: 'Dubai, UAE', sub: 'Serving teams globally', href: null },
                  { icon: '🗓️', title: 'Book a demo', body: 'See it live in 20 mins', sub: 'We\'ll walk you through everything', href: null, onClick: openModal },
                ].map(c => (
                  <div key={c.title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '20px 22px', display: 'flex', gap: 14, alignItems: 'flex-start', cursor: c.href || c.onClick ? 'pointer' : 'default', transition: 'all 0.2s' }}
                    onClick={c.onClick}
                    onMouseEnter={e => { if(c.href||c.onClick) e.currentTarget.style.borderColor='#00c07a' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0' }}>
                    <div style={{ fontSize: 24, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{c.title}</div>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith('http')?'_blank':'_self'} rel="noreferrer"
                          style={{ fontSize: 13, color: '#00c07a', textDecoration: 'none', fontWeight: 600 }}>{c.body}</a>
                      ) : (
                        <div style={{ fontSize: 13, color: '#00c07a', fontWeight: 600 }}>{c.body}</div>
                      )}
                      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — form */}
              <div className="md:col-span-2">
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '40px' }}>
                  {sent ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Message received!</h2>
                      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, maxWidth: 340, margin: '0 auto 24px' }}>
                        Thanks for reaching out. Our team will get back to you within 24 hours. In the meantime, feel free to explore SpacioHub.
                      </p>
                      <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-primary">Try it free for 14 days →</a>
                    </div>
                  ) : (
                    <>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Send us a message</h2>
                      <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 28 }}>Fill in the form and we'll be in touch shortly.</p>

                      <form onSubmit={handleSubmit}>
                        {/* Name + Email */}
                        <div className="form-row-2" style={{ marginBottom: 14 }}>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label>Full Name *</label>
                            <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Jane Smith" required />
                          </div>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label>Work Email *</label>
                            <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="jane@company.com" required />
                          </div>
                        </div>

                        {/* Phone + Company */}
                        <div className="form-row-2" style={{ marginBottom: 14 }}>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label>Phone Number</label>
                            <input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+971 50 000 0000" />
                          </div>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label>Company Name</label>
                            <input value={form.company} onChange={e=>set('company',e.target.value)} placeholder="Acme Corp" />
                          </div>
                        </div>

                        {/* Plan + Source */}
                        <div className="form-row-2" style={{ marginBottom: 14 }}>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label>Plan Interest</label>
                            <select value={form.plan} onChange={e=>set('plan',e.target.value)} style={{ color: form.plan ? '#0f172a' : '#9ca3af' }}>
                              <option value="">Select a plan...</option>
                              {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                          </div>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label>How did you hear about us?</label>
                            <select value={form.source} onChange={e=>set('source',e.target.value)} style={{ color: form.source ? '#0f172a' : '#9ca3af' }}>
                              <option value="">Select...</option>
                              {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="form-group">
                          <label>Message *</label>
                          <textarea value={form.message} onChange={e=>set('message',e.target.value)} placeholder="Tell us about your workspace — how many rooms, team size, what you're looking for..." required style={{ height: 100 }} />
                        </div>

                        {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}

                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                          {loading ? 'Sending...' : 'Send message →'}
                        </button>

                        <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 12 }}>
                          We respect your privacy. No spam, ever. See our <a href="/privacy" style={{ color: '#94a3b8' }}>Privacy Policy</a>.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
