import React from 'react'
import SEO from '../components/SEO'

const UPDATES = [
  { date: 'March 2026', version: 'v2.4', tag: 'New', color: '#00c07a', bg: '#ecfdf5', items: ['AI Room Booker — book rooms in plain language', 'Integrations page with falling logo hero animation', 'Plan Finder quiz on Pricing page', 'Mobile-responsive design across all pages'] },
  { date: 'February 2026', version: 'v2.3', tag: 'Improved', color: '#3b82f6', bg: '#eff6ff', items: ['Door Display page — full interactive tablet demo', 'Analytics page with weekly report mockup', 'Pricing table redesign with sticky header', 'SEO meta tags on all pages'] },
  { date: 'January 2026', version: 'v2.2', tag: 'New', color: '#00c07a', bg: '#ecfdf5', items: ['Visitor Management — interactive 3-screen kiosk demo', 'Use case pages — Corporate, Coworking, Hotels, Resellers', 'Nav mega menu with spotlight cards', 'Google Calendar & Microsoft 365 two-way sync'] },
  { date: 'December 2025', version: 'v2.1', tag: 'Fix', color: '#f59e0b', bg: '#fefce8', items: ['Improved no-show auto-release reliability', 'Fixed Zoom link generation on recurring bookings', 'Door display offline mode improvements', 'Performance improvements across dashboard'] },
  { date: 'November 2025', version: 'v2.0', tag: 'Major', color: '#8b5cf6', bg: '#f5f3ff', items: ['Full platform rewrite — faster and more reliable', 'New visual time grid for room booking', 'Door display PWA — works on any tablet', 'Utilisation analytics dashboard launched'] },
  { date: 'October 2025', version: 'v1.9', tag: 'New', color: '#00c07a', bg: '#ecfdf5', items: ['Visitor kiosk — self check-in with badge printing', 'Room service portal for facilities requests', 'Email OTP login — no passwords required', 'Booking confirmation emails with branded templates'] },
  { date: 'September 2025', version: 'v1.8', tag: 'Improved', color: '#3b82f6', bg: '#eff6ff', items: ['Door display now supports guest booking without login', 'Improved room search with floor and capacity filters', 'Admin panel — bulk room management', 'Faster dashboard load times'] },
  { date: 'August 2025', version: 'v1.7', tag: 'Fix', color: '#f59e0b', bg: '#fefce8', items: ['Fixed iCal feed sync on recurring bookings', 'Resolved badge printing alignment on A4 paper', 'Admin analytics CSV export now includes tags', 'Notification email delivery improvements'] },
  { date: 'July 2025', version: 'v1.6', tag: 'New', color: '#00c07a', bg: '#ecfdf5', items: ['Zoom integration — auto-generate meeting links on booking', 'Booking tags — categorise meetings by type', 'Floor plan upload in room settings', 'Kiosk mode — full-screen check-in experience'] },
  { date: 'June 2025', version: 'v1.5', tag: 'Improved', color: '#3b82f6', bg: '#eff6ff', items: ['Role-based permissions — Admin, Member, Guest', 'Visitor pre-registration by host', 'Booking approval workflows for controlled rooms', 'RBAC — Super Admin with multi-tenant support'] },
  { date: 'May 2025', version: 'v1.4', tag: 'New', color: '#00c07a', bg: '#ecfdf5', items: ['Analytics dashboard — room utilisation and no-show rates', 'iCal feed for Google Calendar and Outlook', 'Amenities management per room', 'Door display PIN configuration'] },
  { date: 'April 2025', version: 'v1.3', tag: 'Major', color: '#8b5cf6', bg: '#f5f3ff', items: ['SpacioHub v1 — initial platform launch', 'Room booking with visual time grid', 'Door display panel on tablet', 'Multi-tenant architecture', 'Invite-based organisation onboarding'] },
]

export default function Changelog() {
  return (
    <>
      <SEO title="Changelog — SpacioHub Product Updates" description="See what's new in SpacioHub. Product updates, new features, bug fixes, and improvements — updated regularly." path="/changelog" />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>
        <section style={{ background: 'linear-gradient(170deg,#f5f3ff,#fff 60%)', borderBottom: '1px solid #e2e8f0', padding: '80px 0 64px', textAlign: 'center' }}>
          <div className="container">
            <span className="tag">Changelog</span>
            <h1 className="h1" style={{ marginBottom: 16 }}>What's <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>new</span></h1>
            <p className="lead" style={{ maxWidth: 440, margin: '0 auto' }}>Every update, improvement, and fix — since day one.</p>
          </div>
        </section>
        <section style={{ padding: '64px 0', background: '#f8fafc' }}>
          <div className="container" style={{ maxWidth: 720, margin: '0 auto' }}>
            {UPDATES.map((u, i) => (
              <div key={u.version} style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: u.color, flexShrink: 0, marginTop: 6 }} />
                  {i < UPDATES.length - 1 && <div style={{ width: 1, flex: 1, background: '#e2e8f0', marginTop: 6 }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>{u.version}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: u.color, background: u.bg, padding: '2px 10px', borderRadius: 100 }}>{u.tag}</span>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{u.date}</span>
                  </div>
                  <div className="card" style={{ background: '#fff', padding: '20px 24px' }}>
                    {u.items.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: u.color, flexShrink: 0, marginTop: 5 }} />
                        <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
