import SEO from '../../components/SEO'
import { PAGE_SEO } from '../../components/pageSEO'
import React from 'react'
import UseCasePage from './UseCasePage'

const AC = '#3b82f6'
const AL = '#eff6ff'
const AB = '#bfdbfe'

// Dual-tone title helper
const T = (plain, bold) => (
  <>{plain}<span style={{ background: 'linear-gradient(135deg,#3b82f6,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>{bold}</span></>
)

// Hero feature icons
const IcoSSO = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="15" cy="18" r="6" fill={AC} opacity="0.2"/><circle cx="15" cy="18" r="6" stroke={AC} strokeWidth="1.5"/><circle cx="15" cy="18" r="2" fill={AC}/><path d="M19 22l8 6M25 26l2 2" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/></svg>
const IcoMap = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="7" y="9" width="22" height="18" rx="2" fill={AC} opacity="0.1"/><rect x="7" y="9" width="22" height="18" rx="2" stroke={AC} strokeWidth="1.5"/><line x1="18" y1="9" x2="18" y2="27" stroke={AC} strokeWidth="1" opacity="0.4"/><line x1="7" y1="19" x2="29" y2="19" stroke={AC} strokeWidth="1" opacity="0.4"/><circle cx="14" cy="15" r="2.5" fill={AC}/><path d="M14 15v0" stroke="#fff" strokeWidth="1"/></svg>
const IcoBars = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="8" y="22" width="5" height="8" rx="1" fill={AC} opacity="0.4"/><rect x="15" y="16" width="5" height="14" rx="1" fill={AC} opacity="0.65"/><rect x="22" y="11" width="5" height="19" rx="1" fill={AC}/></svg>
const IcoPeople = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="14" cy="14" r="4" fill={AC} opacity="0.7"/><circle cx="24" cy="14" r="4" fill={AC} opacity="0.35"/><path d="M6 28c0-4.5 3.5-8 8-8h8c4.5 0 8 3.5 8 8" stroke={AC} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>

// Section 1 visual icons (booking)
const IcoCalBooked = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="8" y="10" width="20" height="18" rx="2" fill={AC} opacity="0.15"/><rect x="8" y="10" width="20" height="5" rx="2" fill={AC}/><rect x="12" y="5" width="2.5" height="6" rx="1" fill={AC}/><rect x="21.5" y="5" width="2.5" height="6" rx="1" fill={AC}/><path d="M13 22l3 3 7-7" stroke={AC} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoCalFree = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill="#ecfdf5"/><rect x="8" y="10" width="20" height="18" rx="2" fill="#00c07a" opacity="0.1"/><rect x="8" y="10" width="20" height="18" rx="2" stroke="#00c07a" strokeWidth="1.5"/><rect x="8" y="10" width="20" height="5" rx="2" fill="#00c07a" opacity="0.4"/><circle cx="18" cy="22" r="3" fill="#00c07a" opacity="0.4"/></svg>
const IcoVideo = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="6" y="12" width="16" height="12" rx="2" fill={AC} opacity="0.15"/><rect x="6" y="12" width="16" height="12" rx="2" stroke={AC} strokeWidth="1.5"/><path d="M24 15l7-3v12l-7-3V15z" fill={AC}/></svg>

// Section 2 visual icons (door display) — shown on dark card
const IcoAvail = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill="#ecfdf5"/><circle cx="18" cy="18" r="8" fill="#00c07a" opacity="0.2"/><circle cx="18" cy="18" r="5" fill="#00c07a"/></svg>
const IcoInUse = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill="#fff1f2"/><circle cx="18" cy="18" r="8" fill="#ef4444" opacity="0.2"/><circle cx="18" cy="18" r="5" fill="#ef4444"/></svg>
const IcoSoon = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill="#fefce8"/><circle cx="18" cy="18" r="8" stroke="#f59e0b" strokeWidth="1.5"/><path d="M18 12v6l4 3" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/></svg>

// Section 3 visual icons (visitor)
const IcoPerson = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="18" cy="13" r="5" fill={AC} opacity="0.7"/><path d="M8 30c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke={AC} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
const IcoBadge = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="9" y="10" width="18" height="18" rx="2" fill={AC} opacity="0.15"/><rect x="9" y="10" width="18" height="18" rx="2" stroke={AC} strokeWidth="1.5"/><rect x="13" y="8" width="10" height="5" rx="1.5" fill={AC}/><rect x="12" y="19" width="12" height="1.5" rx="0.75" fill={AC} opacity="0.5"/><rect x="12" y="22" width="8" height="1.5" rx="0.75" fill={AC} opacity="0.35"/></svg>
const IcoEmail = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="7" y="11" width="22" height="16" rx="2" fill={AC} opacity="0.15"/><rect x="7" y="11" width="22" height="16" rx="2" stroke={AC} strokeWidth="1.5"/><path d="M7 13l11 9 11-9" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/></svg>

export default function Corporate() {
  return (<><SEO {...PAGE_SEO.useCaseCorporate} /><UseCasePage
    icon={<svg viewBox="0 0 80 80" width="72" height="72" fill="none"><rect width="80" height="80" rx="20" fill="#eff6ff"/><rect x="18" y="28" width="44" height="38" rx="3" fill="#3b82f6" opacity="0.15"/><rect x="18" y="28" width="44" height="9" rx="3" fill="#3b82f6"/><rect x="25" y="42" width="9" height="9" rx="2" fill="#3b82f6" opacity="0.7"/><rect x="37" y="42" width="9" height="9" rx="2" fill="#3b82f6" opacity="0.7"/><rect x="49" y="42" width="8" height="9" rx="2" fill="#3b82f6" opacity="0.7"/><rect x="25" y="55" width="9" height="8" rx="2" fill="#3b82f6" opacity="0.7"/><rect x="37" y="55" width="9" height="8" rx="2" fill="#3b82f6" opacity="0.7"/><rect x="34" y="63" width="12" height="9" rx="2" fill="#3b82f6"/></svg>}
    subtitle="Use Case"
    title="SpacioHub for Corporate Offices"
    accentColor={AC}
    accentLight={AL}
    accentBorder={AB}
    desc="Manage meeting rooms, hot desks, and visitor flow across multiple floors and buildings. With Google and Microsoft SSO, employees sign in with existing credentials — no new accounts needed."
    hero_features={[
      { icon: IcoSSO,    title: 'Single Sign-On (SSO)',        desc: 'Google and Microsoft SSO so employees use existing credentials.' },
      { icon: IcoMap,    title: 'Interactive Floor Plans',     desc: 'Visual floor map so employees find and book the right room instantly.' },
      { icon: IcoBars,   title: 'Space Utilisation Reports',   desc: 'See which rooms are over- and under-used to optimise your office layout.' },
      { icon: IcoPeople, title: 'Role-based Access',           desc: 'Admins, members, and guests — each with the right level of access.' },
    ]}
    sections={[
      {
        tag: 'Booking',
        title: T('Stop the ', 'double-booking chaos'),
        desc: 'SpacioHub shows every employee a live time grid of all rooms. 15-minute buffer enforcement means back-to-back meetings never clash. The AI Room Booker lets anyone find and book the right room in seconds.',
        checks: [
          '<strong>Live availability</strong> across all rooms and floors',
          '<strong>15-min buffer</strong> between meetings enforced automatically',
          '<strong>AI booking</strong> — describe your need, AI books the best room',
          '<strong>Zoom links</strong> auto-generated on every booking',
          '<strong>Booking tags</strong> — client meeting, training, all-hands, and more',
        ],
        visual: {
          bg: '#f8fafc',
          items: [
            { icon: IcoCalBooked, title: 'Board Room — Booked',          sub: '10:00 AM – 11:00 AM · Sarah J.',          badge: 'Confirmed' },
            { icon: IcoCalFree,   title: 'Focus Room — Available',        sub: 'Next: 2:00 PM · No buffer conflict' },
            { icon: IcoVideo,     title: 'Conference Room — Zoom ready',  sub: 'Link auto-generated',                     badge: 'Zoom' },
          ]
        }
      },
      {
        tag: 'Door Display',
        title: T('Smart panels on ', 'every room'),
        desc: 'Mount any iPad or Android tablet outside meeting rooms. Employees and guests can see live status, check in, extend, or book directly — no login required.',
        checks: [
          '<strong>Real-time status</strong> — red when busy, green when free',
          '<strong>Auto no-show release</strong> after 15 mins without check-in',
          '<strong>PIN-protected admin settings</strong> per display',
          '<strong>Works offline</strong> — shows last known status if connection drops',
        ],
        visual: {
          bg: '#0f172a',
          items: [
            { icon: IcoAvail, title: 'Conference Room',  sub: 'Available · Next: Team Standup 2PM',        badge: 'Available' },
            { icon: IcoInUse, title: 'Board Room',       sub: 'In Use: Leadership Review · Until 11:30',   badge: 'In Use' },
            { icon: IcoSoon,  title: 'Focus Room',       sub: 'Starting soon: Design Review · 11:45',      badge: 'Soon' },
          ]
        }
      },
      {
        tag: 'Visitor Management',
        title: T('Professional ', 'guest experience'),
        desc: 'Pre-register visitors before they arrive. When they walk in, a self-service kiosk handles check-in, prints badges, and notifies their host automatically.',
        checks: [
          '<strong>Pre-registration</strong> — hosts add visitors before arrival',
          '<strong>Self-service kiosk</strong> — visitors check in without staff help',
          '<strong>Custom visitor badges</strong> with name, company, and host',
          '<strong>Instant host notification</strong> by email when guest arrives',
        ],
        visual: {
          bg: '#f0fdf8',
          items: [
            { icon: IcoPerson, title: 'John Smith — Visitor',  sub: 'Visiting: Sarah Johnson · 10:00 AM',       badge: 'Checked in' },
            { icon: IcoBadge,  title: 'Badge printed',         sub: 'Acme Corp · Floor 3 · Expires 6PM' },
            { icon: IcoEmail,  title: 'Host notified',         sub: 'sarah@company.com — Your visitor has arrived' },
          ]
        }
      }
    ]}
    testimonial={{ quote: "SpacioHub cut our room booking conflicts by 80% in the first month. The door displays alone were worth it — people actually check in now.", name: "Operations Manager", role: "250-person tech company" }}
    related={[
      { title: 'Coworking Spaces',    desc: 'Member self-booking and utilisation tracking.',      href: '/use-cases/coworking' },
      { title: 'Hotels & Hospitality',desc: 'Conference booking with catering tags.',             href: '/use-cases/hotels' },
      { title: 'SaaS Resellers',      desc: 'White-label for your clients.',                      href: '/use-cases/resellers' },
    ]}
  />
    </>
  )
}
