import SEO from '../components/SEO'
import { PAGE_SEO } from '../components/pageSEO'
import React, { useState } from 'react'
import { useModal } from '../components/ModalContext'

const I = {
  shield:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  building:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 22V12h6v10M9 7h.01M15 7h.01M9 12h.01M15 12h.01"/></svg>,
  trending:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  eye:       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  settings:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  ban:       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  door:      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M9 21V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v16"/><circle cx="14.5" cy="13" r=".5" fill="currentColor"/></svg>,
  users:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  calendar:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  bar:       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  monitor:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  tag:       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  robot:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
  user:      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  zap:       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  mail:      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  person:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
}

const ROLES = [
  {
    id: 'super_admin',
    icon: I.shield,
    title: 'Super Admin',
    subtitle: 'Platform-level control',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    desc: 'The Super Admin is the platform owner — Riser Technologies or a white-label reseller. Has full visibility across all organisations and can impersonate any tenant for support.',
    capabilities: [
      { icon: I.building, title: 'All Organisations', desc: 'View, edit, suspend or activate any organisation on the platform.' },
      { icon: I.trending, title: 'MRR & Revenue Dashboard', desc: 'See total MRR, ARR, plan breakdown, and per-tenant revenue.' },
      { icon: I.eye, title: 'Impersonate Any Tenant', desc: 'View the app exactly as any organisation admin sees it — for troubleshooting and support.' },
      { icon: I.settings, title: 'Plan Management', desc: 'Change any tenant\'s plan, limits (max rooms, max users), and billing cycle.' },
      { icon: I.monitor, title: 'Feature Flags', desc: 'Enable or disable specific features per organisation — door display, kiosk, signage, room service.' },
      { icon: I.ban, title: 'Suspend / Activate', desc: 'Immediately suspend or reactivate any organisation with one click.' },
    ],
    access: ['All pages', 'Super Admin Dashboard', 'All tenant data', 'Plan controls', 'Feature flags']
  },
  {
    id: 'admin',
    icon: I.users,
    title: 'Admin',
    subtitle: 'Organisation-level control',
    color: '#0369a1',
    bg: '#f0f9ff',
    border: '#bae6fd',
    desc: 'The Admin is the person who set up SpacioHub for their organisation. They manage rooms, invite members, configure rules, and have access to full analytics and the Admin Panel.',
    capabilities: [
      { icon: I.door, title: 'Room Management', desc: 'Create, edit, and delete rooms. Set capacity, floor, amenities, and photos.' },
      { icon: I.users, title: 'Member Management', desc: 'Invite members, set roles, and remove users from the organisation.' },
      { icon: I.settings, title: 'Booking Rules', desc: 'Set booking windows, buffer times, maximum duration, and approval requirements.' },
      { icon: I.bar, title: 'Full Analytics', desc: 'Access all analytics including utilisation, no-shows, CSV export, and reports.' },
      { icon: I.monitor, title: 'Door Display Config', desc: 'Configure door display settings, PIN, room assignment, and booking permissions.' },
      { icon: I.tag, title: 'Amenities & Badges', desc: 'Manage room amenities, visitor badge templates, and organisation branding.' },
    ],
    access: ['Dashboard', 'All rooms', 'Admin Panel', 'Analytics (full)', 'Visitor Management', 'Settings']
  },
  {
    id: 'member',
    icon: I.user,
    title: 'Member',
    subtitle: 'Day-to-day booking',
    color: '#047857',
    bg: '#f0fdf4',
    border: '#a7f3d0',
    desc: 'Members are regular employees or users invited to the organisation. They can book rooms, view their own bookings, and use the door display — but cannot change organisation settings.',
    capabilities: [
      { icon: I.calendar, title: 'Book Rooms', desc: 'Use the visual time grid to find and book any available room.' },
      { icon: I.calendar, title: 'My Bookings', desc: 'View, edit, cancel, and resend confirmations for their own bookings.' },
      { icon: I.robot, title: 'AI Room Booker', desc: 'Use the AI assistant to find and book rooms in plain language.' },
      { icon: I.monitor, title: 'Door Display', desc: 'Check in, extend, or end their meetings from the door display panel.' },
      { icon: I.bar, title: 'Basic Analytics', desc: 'View their own meeting attendance and booking history.' },
      { icon: I.user, title: 'My Account', desc: 'Update their profile, display name, and notification preferences.' },
    ],
    access: ['Dashboard', 'Book a Room', 'My Bookings', 'Door Display', 'My Account']
  },
  {
    id: 'guest',
    icon: I.person,
    title: 'Guest',
    subtitle: 'No account required',
    color: '#b45309',
    bg: '#fffbeb',
    border: '#fde68a',
    desc: 'Guests are visitors or external users who can interact with SpacioHub without creating an account. They can book rooms via the door display or check in as visitors at the kiosk.',
    capabilities: [
      { icon: I.zap, title: 'Guest Booking', desc: 'Book a room directly from the door display by providing their name and email only.' },
      { icon: I.monitor, title: 'Kiosk Check-in', desc: 'Check in as a visitor at the reception kiosk — no account or login needed.' },
      { icon: I.mail, title: 'Booking Confirmation', desc: 'Receive an email confirmation for their guest booking with room details.' },
      { icon: I.ban, title: 'No Admin Access', desc: 'Guests cannot access the dashboard, settings, or any organisational data.' },
    ],
    access: ['Door Display (guest booking)', 'Visitor Kiosk (check-in)', 'Email confirmation only']
  }
]

export default function Roles() {
  const [active, setActive] = useState('admin')
  const { openModal } = useModal()
  const role = ROLES.find(r => r.id === active)

  return (
    <>
      <SEO {...PAGE_SEO.roles} />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg,#f0fdf8,#fff)', borderBottom: '1px solid #e2e8f0', padding: '72px 0 56px', textAlign: 'center' }}>
        <div className="container">
          <span className="tag animate-fade-up">Roles & Permissions</span>
          <h1 className="h1 animate-fade-up delay-1" style={{ fontSize: 'clamp(32px,4.5vw,56px)', marginBottom: 20 }}>
            The right access<br />for <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>every person</span>
          </h1>
          <p className="lead animate-fade-up delay-2" style={{ maxWidth: 520, margin: '0 auto' }}>
            SpacioHub has four distinct roles. Each person gets exactly the access they need — no more, no less.
          </p>
        </div>
      </section>

      {/* ROLE SELECTOR */}
      <section style={{ padding: '56px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
            {ROLES.map(r => (
              <button key={r.id} onClick={() => setActive(r.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, border: `1.5px solid ${active === r.id ? r.color : '#e2e8f0'}`, background: active === r.id ? r.bg : '#fff', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s' }}>
                <span style={{ color: active === r.id ? r.color : '#94a3b8' }}>{r.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: active === r.id ? r.color : '#0f172a' }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.subtitle}</div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, alignItems: 'start', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ background: role.bg, border: `1px solid ${role.border}`, borderRadius: 16, padding: 28 }}>
              <div style={{ color: role.color, marginBottom: 12 }}>{role.icon}</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{role.title}</h2>
              <div style={{ fontSize: 12, fontWeight: 600, color: role.color, marginBottom: 16, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{role.subtitle}</div>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 24 }}>{role.desc}</p>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Pages & Access</div>
                {role.access.map(a => (
                  <div key={a} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '4px 0' }}>
                    <span style={{ color: role.color, fontSize: 12, fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 13, color: '#374151' }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: 12}}>
              {role.capabilities.map((cap, i) => (
                <div key={cap.title} className="card" style={{ animationDelay: `${i*0.06}s` }}>
                  <div style={{ color: role.color, marginBottom: 10 }}>{cap.icon}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: '#0f172a' }}>{cap.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: '64px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <h2 className="h2 reveal" style={{ marginBottom: 32 }}>Role comparison <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>at a glance</span></h2>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(4,1fr)', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '12px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>CAPABILITY</div>
              {ROLES.map(r => <div key={r.id} style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: r.color }}>{r.title}</div>)}
            </div>
            {[
              ['Book rooms', true, true, true, true],
              ['View own bookings', true, true, true, false],
              ['View all bookings', true, true, false, false],
              ['Manage rooms', true, true, false, false],
              ['Invite members', true, true, false, false],
              ['Admin Panel', true, true, false, false],
              ['Full analytics', true, true, false, false],
              ['Booking rules config', true, true, false, false],
              ['Visitor management', true, true, false, false],
              ['Door display config', true, true, false, false],
              ['Manage all orgs', true, false, false, false],
              ['MRR dashboard', true, false, false, false],
              ['Feature flag control', true, false, false, false],
              ['Impersonate tenants', true, false, false, false],
              ['Guest booking (no login)', false, false, false, true],
              ['Visitor kiosk check-in', false, false, false, true],
            ].map(([label, ...vals], ri) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(4,1fr)', padding: '11px 20px', borderBottom: '1px solid #f8fafc', background: ri % 2 === 0 ? '#fff' : '#fafafa' }}>
                <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{label}</div>
                {vals.map((v, i) => (
                  <div key={i} style={{ textAlign: 'center', fontSize: 15 }}>
                    {v ? <span style={{ color: '#00c07a', fontWeight: 700 }}>✓</span> : <span style={{ color: '#cbd5e1' }}>—</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ color: '#fff', marginBottom: 14 }}>Set up your team <span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>in minutes</span></h2>
          <p className="lead" style={{ color: '#94a3b8', marginBottom: 32 }}>Invite your team, assign roles, and you're ready to go.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1.5px solid #334155', textDecoration: 'none' }}>Start free trial</a>
          </div>
        </div>
      </section>
    </main>
  </>
  )
}
