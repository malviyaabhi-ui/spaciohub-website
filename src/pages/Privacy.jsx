import React from 'react'
import SEO from '../components/SEO'

const SECTIONS = [
  { title: '1. Information We Collect', content: 'We collect information you provide directly to us when you create an account, use our services, or contact us. This includes your name, email address, company name, and usage data. We also collect information automatically when you use SpacioHub, such as log data, device information, and cookies.' },
  { title: '2. How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve our services; to process transactions; to send you technical notices and support messages; to respond to your comments and questions; and to send you information about products, services, and events.' },
  { title: '3. Information Sharing', content: 'We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except to trusted third parties who assist us in operating our website and services, as long as those parties agree to keep this information confidential.' },
  { title: '4. Data Security', content: 'We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorised access, disclosure, alteration and destruction. SpacioHub uses SSL encryption for all data in transit and encrypts sensitive data at rest.' },
  { title: '5. Data Retention', content: 'We retain your information for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time by contacting us at contact@spaciohub.com.' },
  { title: '6. GDPR Compliance', content: 'If you are located in the European Union, you have the right to access, rectify, or erase your personal data, restrict processing, object to processing, and data portability. To exercise these rights, please contact us.' },
  { title: '7. Cookies', content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.' },
  { title: '8. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at contact@spaciohub.com or by mail at: SpacioHub by Riser Technologies, Dubai, UAE.' },
]

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy — SpacioHub" description="SpacioHub Privacy Policy — how we collect, use, and protect your data." path="/privacy" />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>
        <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
            <span className="tag">Legal</span>
            <h1 className="h1" style={{ marginBottom: 12 }}>Privacy Policy</h1>
            <p style={{ fontSize: 14, color: '#94a3b8' }}>Last updated: March 2026</p>
          </div>
        </section>
        <section style={{ padding: '64px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 40 }}>
              SpacioHub by Riser Technologies ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our workspace management platform.
            </p>
            {SECTIONS.map(s => (
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
