import React, { useState } from 'react'
import { useModal } from '../components/ModalContext'

const ROLES = [
  {
    id: 'super_admin',
    icon: '🛡️',
    title: 'Super Admin',
    subtitle: 'Platform-level control',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    desc: 'The Super Admin is the platform owner — Riser Technologies or a white-label reseller. Has full visibility across all organisations, manages licensing, plans, and can impersonate any tenant.',
    capabilities: [
      { icon: '🏢', title: 'All Organisations', desc: 'View, edit, suspend or activate any organisation on the platform.' },
      { icon: '💰', title: 'MRR & Revenue Dashboard', desc: 'See total MRR, ARR, plan breakdown, and per-tenant revenue.' },
      { icon: '🔑', title: 'License Key Generation', desc: 'Generate and manage license keys for enterprise clients.' },
      { icon: '👁️', title: 'Impersonate Any Tenant', desc: 'View the app exactly as any organisation admin sees it — for troubleshooting and support.' },
      { icon: '⚙️', title: 'Plan Management', desc: 'Change any tenant\'s plan, limits (max rooms, max users), and billing cycle.' },
      { icon: '🚫', title: 'Suspend / Activate', desc: 'Immediately suspend or reactivate any organisation with one click.' },
    ],
    access: ['All pages', 'Super Admin Dashboard', 'All tenant data', 'Billing controls', 'License management']
  },
  {
    id: 'admin',
    icon: '👨‍💼',
    title: 'Admin',
    subtitle: 'Organisation-level control',
    color: '#0369a1',
    bg: '#f0f9ff',
    border: '#bae6fd',
    desc: 'The Admin is the person who set up SpacioHub for their organisation. They manage rooms, invite members, configure rules, and have access to full analytics and the Admin Panel.',
    capabilities: [
      { icon: '🚪', title: 'Room Management', desc: 'Create, edit, and delete rooms. Set capacity, floor, amenities, and photos.' },
      { icon: '👥', title: 'Member Management', desc: 'Invite members, set roles, and remove users from the organisation.' },
      { icon: '⚙️', title: 'Booking Rules', desc: 'Set booking windows, buffer times, maximum duration, and approval requirements.' },
      { icon: '📊', title: 'Full Analytics', desc: 'Access all analytics including utilisation, no-shows, CSV export, and reports.' },
      { icon: '🖥️', title: 'Door Display Config', desc: 'Configure door display settings, PIN, room assignment, and booking permissions.' },
      { icon: '🏷️', title: 'Amenities & Badges', desc: 'Manage room amenities, visitor badge templates, and organisation branding.' },
    ],
    access: ['Dashboard', 'All rooms', 'Admin Panel', 'Analytics (full)', 'Visitor Management', 'Settings']
  },
  {
    id: 'member',
    icon: '👤',
    title: 'Member',
    subtitle: 'Day-to-day booking',
    color: '#047857',
    bg: '#f0fdf4',
    border: '#a7f3d0',
    desc: 'Members are regular employees or users invited to the organisation. They can book rooms, view their own bookings, and use the door display — but cannot change organisation settings or see others\' private data.',
    capabilities: [
      { icon: '📅', title: 'Book Rooms', desc: 'Use the visual time grid to find and book any available room.' },
      { icon: '📋', title: 'My Bookings', desc: 'View, edit, cancel, and resend confirmations for their own bookings.' },
      { icon: '🤖', title: 'AI Room Booker', desc: 'Use the AI assistant to find and book rooms in plain language.' },
      { icon: '🖥️', title: 'Door Display', desc: 'Check in, extend, or end their meetings from the door display panel.' },
      { icon: '📊', title: 'Basic Analytics', desc: 'View their own meeting attendance and booking history.' },
      { icon: '⚙️', title: 'My Account', desc: 'Update their profile, display name, and notification preferences.' },
    ],
    access: ['Dashboard', 'Book a Room', 'My Bookings', 'Door Display', 'My Account']
  },
  {
    id: 'guest',
    icon: '🙋',
    title: 'Guest',
    subtitle: 'No account required',
    color: '#b45309',
    bg: '#fffbeb',
    border: '#fde68a',
    desc: 'Guests are visitors or external users who can interact with SpacioHub without creating an account. They can book rooms via the door display guest booking flow or check in as visitors at the kiosk.',
    capabilities: [
      { icon: '⚡', title: 'Guest Booking', desc: 'Book a room directly from the door display by providing their name and email only.' },
      { icon: '🖥️', title: 'Kiosk Check-in', desc: 'Check in as a visitor at the reception kiosk — no account or login needed.' },
      { icon: '📧', title: 'Booking Confirmation', desc: 'Receive an email confirmation for their guest booking with room details.' },
      { icon: '🚫', title: 'No Admin Access', desc: 'Guests cannot access the dashboard, settings, or any organisational data.' },
    ],
    access: ['Door Display (guest booking)', 'Visitor Kiosk (check-in)', 'Email confirmation only']
  }
]

export default function Roles() {
  const [active, setActive] = useState('admin')
  const { openModal } = useModal()
  const role = ROLES.find(r => r.id === active)

  return (
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
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
            {ROLES.map(r => (
              <button key={r.id} onClick={() => setActive(r.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, border: `1.5px solid ${active === r.id ? r.color : '#e2e8f0'}`, background: active === r.id ? r.bg : '#fff', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s' }}>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: active === r.id ? r.color : '#0f172a' }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.subtitle}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Role detail */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, alignItems: 'start', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ background: role.bg, border: `1px solid ${role.border}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{role.icon}</div>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
              {role.capabilities.map((cap, i) => (
                <div key={cap.title} className="card" style={{ animationDelay: `${i*0.06}s` }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{cap.icon}</div>
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
              ['License keys', true, false, false, false],
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
  )
}
