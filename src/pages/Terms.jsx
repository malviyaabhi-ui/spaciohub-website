import React from 'react'
import SEO from '../components/SEO'

const SECTIONS = [
  { title: '1. Acceptance of Terms', content: 'By accessing or using SpacioHub, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.' },
  { title: '2. Use Licence', content: 'Permission is granted to temporarily access SpacioHub for personal, non-commercial transitory viewing only. This is the grant of a licence, not a transfer of title, and under this licence you may not modify or copy the materials, use the materials for any commercial purpose, or attempt to reverse engineer any software contained on the platform.' },
  { title: '3. Account Responsibilities', content: 'You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.' },
  { title: '4. Service Availability', content: 'SpacioHub aims to provide 99.9% uptime for paid plans. We reserve the right to modify or discontinue the service at any time with reasonable notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.' },
  { title: '5. Payment Terms', content: 'Paid plans are billed monthly or annually as selected. All fees are non-refundable except as required by law. We reserve the right to modify pricing with 30 days notice. Failure to pay may result in suspension of your account.' },
  { title: '6. Intellectual Property', content: 'The SpacioHub platform and its original content, features, and functionality are and will remain the exclusive property of Riser Technologies. Our trademarks may not be used in connection with any product or service without prior written consent.' },
  { title: '7. Limitation of Liability', content: 'In no event shall SpacioHub or Riser Technologies be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.' },
  { title: '8. Governing Law', content: 'These terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.' },
  { title: '9. Contact', content: 'Questions about the Terms of Use should be sent to us at contact@spaciohub.com.' },
]

export default function Terms() {
  return (
    <>
      <SEO title="Terms of Use — SpacioHub" description="SpacioHub Terms of Use — the rules and conditions for using our workspace management platform." path="/terms" />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>
        <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
            <span className="tag">Legal</span>
            <h1 className="h1" style={{ marginBottom: 12 }}>Terms of Use</h1>
            <p style={{ fontSize: 14, color: '#94a3b8' }}>Last updated: March 2026</p>
          </div>
        </section>
        <section style={{ padding: '64px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
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
