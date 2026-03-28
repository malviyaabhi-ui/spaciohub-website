import React from 'react'
import UseCasePage from './UseCasePage'

const AC = '#ec4899'
const AL = '#fdf2f8'
const AB = '#fbcfe8'

const T = (plain, bold) => (
  <>{plain}<span style={{ background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>{bold}</span></>
)

// Hero icons
const IcoTag = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><path d="M9 9h11l9 9-9 9H9V9z" fill={AC} opacity="0.2"/><path d="M9 9h11l9 9-9 9H9V9z" stroke={AC} strokeWidth="1.5" strokeLinejoin="round"/><circle cx="15" cy="18" r="2" fill={AC}/></svg>
const IcoKey = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="15" cy="18" r="6" fill={AC} opacity="0.2"/><circle cx="15" cy="18" r="6" stroke={AC} strokeWidth="1.5"/><circle cx="15" cy="18" r="2" fill={AC}/><path d="M19 22l9 7M25 26l2 2" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/></svg>
const IcoMoney = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="18" cy="18" r="9" fill={AC} opacity="0.1"/><circle cx="18" cy="18" r="9" stroke={AC} strokeWidth="1.5"/><path d="M18 11v14M14 14h5a2.5 2.5 0 010 5h-2a2.5 2.5 0 010 5h6" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/></svg>
const IcoGlobe = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="18" cy="18" r="9" fill={AC} opacity="0.1"/><circle cx="18" cy="18" r="9" stroke={AC} strokeWidth="1.5"/><path d="M18 9c-3 4-3 14 0 18M18 9c3 4 3 14 0 18M9 18h18" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/><path d="M11 14h14M11 22h14" stroke={AC} strokeWidth="1" strokeLinecap="round" opacity="0.5"/></svg>

// Section 1 visual icons (multi-tenant)
const IcoCorp = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="9" y="12" width="18" height="17" rx="2" fill={AC} opacity="0.15"/><rect x="9" y="12" width="18" height="5" rx="2" fill={AC} opacity="0.6"/><rect x="12" y="20" width="4" height="4" rx="1" fill={AC} opacity="0.5"/><rect x="18" y="20" width="4" height="4" rx="1" fill={AC} opacity="0.5"/><rect x="15" y="25" width="6" height="4" rx="1" fill={AC} opacity="0.4"/></svg>
const IcoHandshake = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><path d="M7 20l4-4 4 2 4-2 4 4-4 4-4-2-4 2-4-4z" fill={AC} opacity="0.2"/><path d="M7 20l4-4 4 2 4-2 4 4-4 4-4-2-4 2-4-4z" stroke={AC} strokeWidth="1.5" strokeLinejoin="round"/><path d="M11 16l-4-4M25 16l4-4" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/></svg>
const IcoHotel = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><path d="M18 8l2.2 6.8h7.1L22 20l2.2 6.8L18 23l-6.2 3.8L14 20l-5.3-4.2h7.1z" fill={AC} opacity="0.25"/><path d="M18 8l2.2 6.8h7.1L22 20l2.2 6.8L18 23l-6.2 3.8L14 20l-5.3-4.2h7.1z" stroke={AC} strokeWidth="1.3" strokeLinejoin="round"/></svg>

// Section 2 visual icons (super admin)
const IcoMRR = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="18" cy="18" r="8" fill={AC} opacity="0.1"/><circle cx="18" cy="18" r="8" stroke={AC} strokeWidth="1.5"/><path d="M18 12v12M15 14.5h4a1.5 1.5 0 010 3h-2a1.5 1.5 0 010 3h5" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/></svg>
const IcoPlan = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="8" y="23" width="5" height="7" rx="1" fill={AC} opacity="0.35"/><rect x="15" y="17" width="5" height="13" rx="1" fill={AC} opacity="0.6"/><rect x="22" y="12" width="5" height="18" rx="1" fill={AC}/></svg>
const IcoLicense = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="8" y="11" width="20" height="14" rx="2" fill={AC} opacity="0.1"/><rect x="8" y="11" width="20" height="14" rx="2" stroke={AC} strokeWidth="1.5"/><rect x="11" y="14" width="8" height="2" rx="1" fill={AC} opacity="0.5"/><rect x="11" y="18" width="12" height="2" rx="1" fill={AC} opacity="0.35"/><rect x="11" y="22" width="6" height="1.5" rx="0.75" fill={AC} opacity="0.25"/></svg>

export default function Resellers() {
  return <UseCasePage
    icon={<svg viewBox="0 0 80 80" width="72" height="72" fill="none"><rect width="80" height="80" rx="20" fill="#fdf2f8"/><rect x="14" y="24" width="30" height="22" rx="6" fill="#ec4899" opacity="0.7"/><rect x="36" y="34" width="30" height="22" rx="6" fill="#ec4899" opacity="0.35" stroke="#ec4899" strokeWidth="2.5"/><circle cx="51" cy="45" r="6" fill="#ec4899"/><path d="M48 45h6M51 42v6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>}
    subtitle="Use Case"
    title="SpacioHub for SaaS Resellers"
    accentColor={AC}
    accentLight={AL}
    accentBorder={AB}
    desc="White-label SpacioHub for your clients. Each organisation gets their own workspace, branding, and subdomain. You manage everything from one super admin dashboard — and keep the margin."
    hero_features={[
      { icon: IcoTag,   title: 'White-label Branding',    desc: 'Your logo, your colours, your domain. Clients never see SpacioHub.' },
      { icon: IcoKey,   title: 'Super Admin Dashboard',   desc: 'Manage all client organisations, plans, and licenses from one place.' },
      { icon: IcoMoney, title: 'Your Pricing',            desc: 'Set your own pricing for each client. SpacioHub charges you wholesale.' },
      { icon: IcoGlobe, title: 'Custom Domains',          desc: 'Each client gets their own subdomain or custom domain.' },
    ]}
    sections={[
      {
        tag: 'Multi-tenant Architecture',
        title: T('One platform, ', 'unlimited clients'),
        desc: "SpacioHub is built multi-tenant from the ground up. Every client organisation is completely isolated — separate data, separate rooms, separate users, separate analytics. Add new clients in seconds.",
        checks: [
          '<strong>Complete data isolation</strong> — clients never see each other',
          '<strong>Separate admin per org</strong> — clients manage their own teams',
          '<strong>Custom plan limits</strong> — set rooms and users per client',
          '<strong>Instant provisioning</strong> — new client live in under a minute',
          '<strong>License key generation</strong> per client',
        ],
        visual: {
          bg: '#f8fafc',
          items: [
            { icon: IcoCorp,      title: 'Acme Corp',   sub: 'Max plan · 12 rooms · 45 users',         badge: 'Active' },
            { icon: IcoHandshake, title: 'StartupHub',  sub: 'Pro plan · 8 rooms · 30 users',          badge: 'Active' },
            { icon: IcoHotel,     title: 'Grand Hotel', sub: 'Enterprise · Unlimited · Custom domain',  badge: 'Enterprise' },
          ]
        }
      },
      {
        tag: 'Super Admin',
        title: T('Full control from ', 'one dashboard'),
        desc: "Your super admin dashboard gives you a bird's-eye view of all clients — MRR, plan status, room counts, user counts, and the ability to change plans, suspend, or generate license keys in one click.",
        checks: [
          '<strong>MRR and ARR overview</strong> across all clients',
          '<strong>Plan management</strong> — upgrade, downgrade, suspend any client',
          '<strong>License key generation</strong> for enterprise clients',
          '<strong>Impersonate any client</strong> to see their view and troubleshoot',
          '<strong>Usage analytics</strong> across your entire client base',
        ],
        visual: {
          bg: '#fdf2f8',
          items: [
            { icon: IcoMRR,     title: 'MRR: $2,840',        sub: 'ARR: $34,080 · 8 active clients' },
            { icon: IcoPlan,    title: 'Plan breakdown',      sub: '3× Max · 4× Pro · 1× Enterprise' },
            { icon: IcoLicense, title: 'License key generated', sub: 'SPH-ACME-CORP-X7K9 · Expires 2027' },
          ]
        }
      }
    ]}
    testimonial={{ quote: "We resell SpacioHub to our facility management clients at a 3x markup. The super admin dashboard makes it effortless to manage 12 clients simultaneously.", name: "Director", role: "Facility management software company" }}
    related={[
      { title: 'Corporate Offices',   desc: 'Multi-floor room management with SSO.',        href: '/use-cases/corporate' },
      { title: 'Coworking Spaces',    desc: 'Member self-booking and revenue analytics.',    href: '/use-cases/coworking' },
      { title: 'Hotels & Hospitality',desc: 'Conference booking with catering tags.',        href: '/use-cases/hotels' },
    ]}
  />
}
