import React from 'react'
import { useModal } from '../components/ModalContext'
import SEO from '../components/SEO'

export default function Blog() {
  const { openModal } = useModal()
  return (
    <>
      <SEO title="Blog — Workspace Management Tips & Updates" description="Insights on workspace management, room booking best practices, hybrid office tips, and SpacioHub product updates." path="/blog" />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>
        <section style={{ background: 'linear-gradient(170deg,#f0fdf8,#fff 60%)', borderBottom: '1px solid #e2e8f0', padding: '80px 0 64px', textAlign: 'center' }}>
          <div className="container">
            <span className="tag">Blog</span>
            <h1 className="h1" style={{ marginBottom: 16 }}>Workspace insights & <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>updates</span></h1>
            <p className="lead" style={{ maxWidth: 480, margin: '0 auto' }}>Tips on room booking, hybrid work, visitor management, and product news from the SpacioHub team.</p>
          </div>
        </section>
        <section style={{ padding: '80px 0', background: '#f8fafc' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, padding: '48px 40px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Coming soon</h2>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 24 }}>We're working on guides, case studies, and product updates. Subscribe to be notified when we publish our first posts.</p>
              <button onClick={openModal} className="btn btn-primary">Get notified →</button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
