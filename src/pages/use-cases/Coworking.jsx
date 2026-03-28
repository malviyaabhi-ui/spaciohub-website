import SEO from '../../components/SEO'
import { PAGE_SEO } from '../../components/pageSEO'
import React from 'react'
import UseCasePage from './UseCasePage'

const AC = '#00c07a'
const AL = '#ecfdf5'
const AB = '#a7f3d0'

const T = (plain, bold) => (
  <>{plain}<span style={{ background: 'linear-gradient(135deg,#00c07a,#0F799B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>{bold}</span></>
)

// Hero icons
const IcoDoor = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="10" y="6" width="16" height="24" rx="2.5" fill={AC} opacity="0.15"/><rect x="10" y="6" width="16" height="24" rx="2.5" stroke={AC} strokeWidth="1.5"/><rect x="12" y="8" width="12" height="4" rx="0.5" fill={AC} opacity="0.3"/><circle cx="22" cy="18" r="1.5" fill={AC}/></svg>
const IcoBars = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="8" y="22" width="5" height="8" rx="1" fill={AC} opacity="0.4"/><rect x="15" y="16" width="5" height="14" rx="1" fill={AC} opacity="0.65"/><rect x="22" y="11" width="5" height="19" rx="1" fill={AC}/><path d="M9 21l6-6 6-4 6-3" stroke={AC} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
const IcoPerson = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="18" cy="13" r="5" fill={AC} opacity="0.7"/><path d="M8 30c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke={AC} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
const IcoTablet = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="10" y="5" width="16" height="26" rx="2.5" fill={AC} opacity="0.15"/><rect x="10" y="5" width="16" height="26" rx="2.5" stroke={AC} strokeWidth="1.5"/><rect x="12" y="8" width="12" height="3" rx="0.5" fill={AC} opacity="0.5"/><rect x="12" y="13" width="12" height="10" rx="1" fill={AC} opacity="0.1"/><rect x="12" y="14" width="12" height="3" rx="0.5" fill={AC} opacity="0.4"/><circle cx="18" cy="27" r="1.2" fill={AC}/></svg>

// Section 1 visual icons (member booking)
const IcoDesk = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="7" y="14" width="22" height="10" rx="2" fill={AC} opacity="0.2"/><rect x="7" y="14" width="22" height="10" rx="2" stroke={AC} strokeWidth="1.5"/><rect x="11" y="24" width="3" height="5" rx="1" fill={AC} opacity="0.5"/><rect x="22" y="24" width="3" height="5" rx="1" fill={AC} opacity="0.5"/><rect x="10" y="10" width="6" height="4" rx="1" fill={AC} opacity="0.4"/></svg>
const IcoStudio = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><path d="M18 9l2.2 6.8h7.1L22 20l2.2 6.8L18 23l-6.2 3.8L14 20l-5.3-4.2h7.1z" fill={AC} opacity="0.25"/><path d="M18 9l2.2 6.8h7.1L22 20l2.2 6.8L18 23l-6.2 3.8L14 20l-5.3-4.2h7.1z" stroke={AC} strokeWidth="1.3" strokeLinejoin="round"/></svg>
const IcoPhone = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><path d="M12 8h12a2 2 0 012 2v16a2 2 0 01-2 2H12a2 2 0 01-2-2V10a2 2 0 012-2z" fill={AC} opacity="0.15"/><path d="M12 8h12a2 2 0 012 2v16a2 2 0 01-2 2H12a2 2 0 01-2-2V10a2 2 0 012-2z" stroke={AC} strokeWidth="1.5"/><circle cx="18" cy="24" r="1.5" fill={AC} opacity="0.6"/><rect x="14" y="11" width="8" height="2" rx="1" fill={AC} opacity="0.4"/></svg>

// Section 2 visual icons (analytics)
const IcoTrendUp = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><path d="M8 26l6-7 5 3 9-10" stroke={AC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 12h6v6" stroke={AC} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoTrendDown = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill="#fff1f2"/><path d="M8 12l6 7 5-3 9 10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 26h6v-6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoClock = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="18" cy="18" r="9" fill={AC} opacity="0.1"/><circle cx="18" cy="18" r="9" stroke={AC} strokeWidth="1.5"/><path d="M18 12v6l4 3" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/></svg>

export default function Coworking() {
  return (<><SEO {...PAGE_SEO.useCaseCoworking} /><UseCasePage
    icon={<svg viewBox="0 0 80 80" width="72" height="72" fill="none"><rect width="80" height="80" rx="20" fill="#ecfdf5"/><circle cx="30" cy="30" r="11" fill="#00c07a" opacity="0.8"/><circle cx="52" cy="30" r="11" fill="#00c07a" opacity="0.4"/><path d="M10 66c0-11 9-20 20-20h20c11 0 20 9 20 20" stroke="#00c07a" strokeWidth="4" strokeLinecap="round" fill="none"/><circle cx="40" cy="58" r="6" fill="#00c07a"/></svg>}
    subtitle="Use Case"
    title="SpacioHub for Coworking Spaces"
    accentColor={AC}
    accentLight={AL}
    accentBorder={AB}
    desc="Give your members a seamless self-service booking experience. Track utilisation to maximise revenue per square metre, and manage guest access without extra admin overhead."
    hero_features={[
      { icon: IcoDoor,    title: 'Member Self-Service',  desc: 'Members book rooms 24/7 without contacting your team.' },
      { icon: IcoBars,    title: 'Revenue Analytics',    desc: 'See which rooms generate most bookings and peak hours.' },
      { icon: IcoPerson,  title: 'Guest Access',         desc: 'Non-members book via guest booking without creating an account.' },
      { icon: IcoTablet,  title: 'Door Displays',        desc: 'Tablets outside every room show live status and allow quick booking.' },
    ]}
    sections={[
      {
        tag: 'Member Booking',
        title: T('Self-service that ', 'actually works'),
        desc: 'Members see every available room in real-time. AI booking suggestions, Zoom links, and instant email confirmations — all without involving your staff.',
        checks: [
          '<strong>24/7 self-booking</strong> via web app or mobile',
          '<strong>Room filters</strong> by amenity, capacity, and floor',
          '<strong>Instant email confirmation</strong> with all booking details',
          '<strong>Easy cancellation and rescheduling</strong> by members',
          '<strong>Guest booking</strong> for non-members without accounts',
        ],
        visual: {
          bg: '#f8fafc',
          items: [
            { icon: IcoDesk,   title: 'Hot Desk A4 — Available',    sub: '4-person pod · Ground floor',  badge: 'Book' },
            { icon: IcoStudio, title: 'Creative Studio — Booked',   sub: '10 seats · Until 3PM · Emily K.' },
            { icon: IcoPhone,  title: 'Phone Booth 2 — Available',  sub: '1 person · Soundproofed',      badge: 'Book' },
          ]
        }
      },
      {
        tag: 'Space Analytics',
        title: T('Know your space, ', 'grow your revenue'),
        desc: 'See exactly how your space is being used. Identify under-utilised rooms and peak hours so you can optimise pricing, layouts, and staffing.',
        checks: [
          '<strong>Utilisation rate</strong> per room per week',
          '<strong>Peak hours heatmap</strong> — know your busiest times',
          '<strong>No-show tracking</strong> — catch ghost bookings automatically',
          '<strong>Booking tag breakdown</strong> — what types of meetings happen most',
          '<strong>CSV export</strong> for your own reporting',
        ],
        visual: {
          bg: '#f0fdf8',
          items: [
            { icon: IcoTrendUp,   title: 'Creative Studio',        sub: '94% utilisation this week',      badge: 'High demand' },
            { icon: IcoTrendDown, title: 'Quiet Room B',           sub: '23% utilisation this week',      badge: 'Underused' },
            { icon: IcoClock,     title: 'Peak hours: 10AM–2PM',   sub: '68% of all bookings in this window' },
          ]
        }
      },
    ]}
    testimonial={{ quote: "Our members love the door displays. It's the first thing visitors notice when they walk in — it makes the whole space feel professional and high-tech.", name: "Community Manager", role: "Coworking space, 45 desks" }}
    related={[
      { title: 'Corporate Offices',    desc: 'Multi-floor room management with SSO.',              href: '/use-cases/corporate' },
      { title: 'Hotels & Hospitality', desc: 'Conference booking with five-star guest experience.', href: '/use-cases/hotels' },
      { title: 'SaaS Resellers',       desc: 'White-label SpacioHub for your clients.',            href: '/use-cases/resellers' },
    ]}
  />
    </>
  )
}
