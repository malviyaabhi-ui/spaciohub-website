import React from 'react'
import SEO from '../components/SEO'

export default function Cookies() {
  return (
    <>
      <SEO title="Cookie Policy — SpacioHub" description="SpacioHub Cookie Policy — how we use cookies and similar technologies on our platform." path="/cookies" />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>
        <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
            <span className="tag">Legal</span>
            <h1 className="h1" style={{ marginBottom: 12 }}>Cookie Policy</h1>
            <p style={{ fontSize: 14, color: '#94a3b8' }}>Last updated: March 2026</p>
          </div>
        </section>
        <section style={{ padding: '64px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
            {[
              { title: 'What Are Cookies', content: 'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.' },
              { title: 'How We Use Cookies', content: 'SpacioHub uses cookies to keep you logged in, remember your preferences, understand how you use our platform, and improve your experience. We also use analytics cookies to understand aggregate usage patterns.' },
              { title: 'Types of Cookies We Use', content: 'Essential cookies: Required for the platform to function (login sessions, security). Preference cookies: Remember your settings and preferences. Analytics cookies: Help us understand how visitors interact with our platform (we use privacy-friendly analytics). Marketing cookies: We do not use third-party advertising cookies.' },
              { title: 'Managing Cookies', content: 'You can control and delete cookies through your browser settings. Please note that disabling essential cookies may affect the functionality of SpacioHub. Most browsers allow you to refuse cookies, accept them, or delete them.' },
              { title: 'Contact', content: 'If you have questions about our Cookie Policy, please contact us at contact@spaciohub.com.' },
            ].map(s => (
              <div key={s.title} style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
