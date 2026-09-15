import React from 'react'
import SEO from '../components/SEO'

const STEPS = [
  { n: '1', title: 'Sign in to SpacioHub', body: 'Open go.spaciohub.com in any browser and log in with the email and password associated with your account.' },
  { n: '2', title: 'Open your Account settings', body: 'Click "My Account" in the left sidebar. Scroll to the bottom of the page.' },
  { n: '3', title: 'Locate the Delete Account section', body: 'Under the "Danger zone" panel, you will see a "Delete Account" option marked in red.' },
  { n: '4', title: 'Confirm the deletion', body: 'Click "Delete" and then confirm on the dialog that appears. Your account and associated data will be permanently removed. This action cannot be undone.' },
]

const DELETED = [
  'Your profile: name, email address, role, and preferences',
  'Your authentication credentials',
  'Room bookings you created',
  'Visitor records you registered',
  'Push notification subscriptions',
  'In-app notifications you received',
]

const RETAINED = [
  { label: 'Anonymised analytics', body: 'Usage patterns with no personal identifiers, retained indefinitely.' },
  { label: 'Audit logs', body: 'Records of admin actions, retained for up to 12 months for security and compliance.' },
  { label: 'Encrypted backup snapshots', body: 'May contain your data for up to 30 days before rolling off.' },
  { label: 'Billing records', body: 'Where required by UAE tax law (up to 5 years for VAT records).' },
]

export default function DeleteAccount() {
  return (
    <>
      <SEO title="Delete Your Account — SpacioHub" description="How to permanently delete your SpacioHub account and associated data." path="/delete-account" />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>
        <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
            <span className="tag">Account</span>
            <h1 className="h1" style={{ marginBottom: 12 }}>Delete Your Account</h1>
            <p style={{ fontSize: 14, color: '#94a3b8' }}>Last updated: September 2026</p>
          </div>
        </section>
        <section style={{ padding: '64px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 40 }}>
              You can permanently delete your SpacioHub account and its associated data at any time. This page explains how to do it, what gets deleted, and what we retain for legal and security reasons.
            </p>

            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>How to delete your account</h2>
              {STEPS.map(s => (
                <div key={s.n} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: '#0F799B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{s.n}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>What is deleted</h2>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, marginBottom: 12 }}>When you delete your account, the following data is permanently removed:</p>
              <ul style={{ paddingLeft: 20, fontSize: 14, color: '#374151', lineHeight: 1.9, margin: 0 }}>
                {DELETED.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>What is retained</h2>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, marginBottom: 12 }}>For legal, security, and business continuity reasons, we may retain:</p>
              {RETAINED.map(item => (
                <div key={item.label} style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 14, color: '#0f172a', fontWeight: 600, margin: '0 0 4px' }}>{item.label}</p>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 40, padding: 20, background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: 12 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: '#78350f', marginBottom: 8, marginTop: 0 }}>Workspace ownership</h2>
              <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.7, margin: 0 }}>
                If you are the owner or sole administrator of a SpacioHub workspace (tenant), deleting your account may also delete the entire workspace and all data within it. Before deleting, please transfer ownership to another admin or contact us for assistance.
              </p>
            </div>

            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Need help?</h2>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
                If you cannot access your account or need assistance with deletion, email us at <a href="mailto:contact@spaciohub.com" style={{ color: '#0F799B', textDecoration: 'none', fontWeight: 500 }}>contact@spaciohub.com</a> and we will process your request within 7 business days.
              </p>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, marginTop: 12 }}>
                For full details on how we handle your data, see our <a href="/privacy" style={{ color: '#0F799B', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
