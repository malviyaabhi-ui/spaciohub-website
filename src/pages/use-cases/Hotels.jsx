import SEO from '../../components/SEO'
import { PAGE_SEO } from '../../components/pageSEO'
import React from 'react'
import UseCasePage from './UseCasePage'

const AC = '#f59e0b'
const AL = '#fff7ed'
const AB = '#fed7aa'

const T = (plain, bold) => (
  <>{plain}<span style={{ background: 'linear-gradient(135deg,#f59e0b,#ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>{bold}</span></>
)

// Hero icons
const IcoTag = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><path d="M9 9h11l9 9-9 9H9V9z" fill={AC} opacity="0.2"/><path d="M9 9h11l9 9-9 9H9V9z" stroke={AC} strokeWidth="1.5" strokeLinejoin="round"/><circle cx="15" cy="18" r="2" fill={AC}/></svg>
const IcoDisplay = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="10" y="5" width="16" height="26" rx="2.5" fill={AC} opacity="0.15"/><rect x="10" y="5" width="16" height="26" rx="2.5" stroke={AC} strokeWidth="1.5"/><rect x="12" y="8" width="12" height="3" rx="0.5" fill={AC} opacity="0.5"/><rect x="12" y="13" width="12" height="10" rx="1" fill={AC} opacity="0.15"/><rect x="12" y="14" width="12" height="2.5" rx="0.5" fill={AC} opacity="0.5"/><circle cx="18" cy="27" r="1.2" fill={AC}/></svg>
const IcoGuest = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="18" cy="12" r="5" fill={AC} opacity="0.7"/><path d="M8 29c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke={AC} strokeWidth="1.5" strokeLinecap="round" fill="none"/><rect x="14" y="21" width="8" height="5" rx="1" fill={AC} opacity="0.3"/></svg>
const IcoBars = <svg viewBox="0 0 36 36" width="22" height="22" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="8" y="22" width="5" height="8" rx="1" fill={AC} opacity="0.4"/><rect x="15" y="16" width="5" height="14" rx="1" fill={AC} opacity="0.65"/><rect x="22" y="11" width="5" height="19" rx="1" fill={AC}/></svg>

// Section 1 visual icons (event booking)
const IcoCatering = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><circle cx="18" cy="18" r="9" fill={AC} opacity="0.1"/><circle cx="18" cy="18" r="9" stroke={AC} strokeWidth="1.5"/><path d="M14 13v6a4 4 0 008 0v-6" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/><rect x="17.5" y="10" width="1.5" height="3" rx="0.75" fill={AC}/></svg>
const IcoAV = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="7" y="11" width="22" height="14" rx="2" fill={AC} opacity="0.15"/><rect x="7" y="11" width="22" height="14" rx="2" stroke={AC} strokeWidth="1.5"/><path d="M15 15l7 4-7 4V15z" fill={AC}/><rect x="14" y="25" width="8" height="2" rx="1" fill={AC} opacity="0.4"/><rect x="17" y="27" width="2" height="3" rx="1" fill={AC} opacity="0.4"/></svg>
const IcoChairs = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="8" y="14" width="7" height="5" rx="1.5" fill={AC} opacity="0.6"/><rect x="21" y="14" width="7" height="5" rx="1.5" fill={AC} opacity="0.6"/><rect x="8" y="20" width="7" height="2.5" rx="1" fill={AC} opacity="0.4"/><rect x="21" y="20" width="7" height="2.5" rx="1" fill={AC} opacity="0.4"/><rect x="9" y="9" width="5" height="5" rx="1" fill={AC} opacity="0.3"/><rect x="22" y="9" width="5" height="5" rx="1" fill={AC} opacity="0.3"/><rect x="8" y="24" width="3" height="5" rx="1" fill={AC} opacity="0.5"/><rect x="12" y="24" width="3" height="5" rx="1" fill={AC} opacity="0.5"/><rect x="21" y="24" width="3" height="5" rx="1" fill={AC} opacity="0.5"/><rect x="25" y="24" width="3" height="5" rx="1" fill={AC} opacity="0.5"/></svg>

// Section 2 visual icons (guest experience)
const IcoBadge = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="9" y="10" width="18" height="18" rx="2" fill={AC} opacity="0.15"/><rect x="9" y="10" width="18" height="18" rx="2" stroke={AC} strokeWidth="1.5"/><rect x="13" y="8" width="10" height="5" rx="1.5" fill={AC}/><rect x="12" y="19" width="12" height="1.5" rx="0.75" fill={AC} opacity="0.5"/><rect x="12" y="22" width="8" height="1.5" rx="0.75" fill={AC} opacity="0.35"/></svg>
const IcoEmail = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="7" y="11" width="22" height="16" rx="2" fill={AC} opacity="0.15"/><rect x="7" y="11" width="22" height="16" rx="2" stroke={AC} strokeWidth="1.5"/><path d="M7 13l11 9 11-9" stroke={AC} strokeWidth="1.5" strokeLinecap="round"/></svg>
const IcoLog = <svg viewBox="0 0 36 36" width="20" height="20" fill="none"><rect width="36" height="36" rx="9" fill={AL}/><rect x="10" y="7" width="16" height="22" rx="2" fill={AC} opacity="0.1"/><rect x="10" y="7" width="16" height="22" rx="2" stroke={AC} strokeWidth="1.5"/><rect x="13" y="5" width="10" height="4" rx="1.5" fill={AC}/><rect x="13" y="14" width="10" height="1.5" rx="0.75" fill={AC} opacity="0.5"/><rect x="13" y="18" width="7" height="1.5" rx="0.75" fill={AC} opacity="0.4"/><rect x="13" y="22" width="9" height="1.5" rx="0.75" fill={AC} opacity="0.35"/></svg>

export default function Hotels() {
  return (<><SEO {...PAGE_SEO.useCaseHotels} /><UseCasePage
    icon={<svg viewBox="0 0 80 80" width="72" height="72" fill="none"><rect width="80" height="80" rx="20" fill="#fff7ed"/><path d="M40 12l5 15h16l-13 9.5 5 15L40 43l-13 8.5 5-15L19 27h16z" fill="#f59e0b"/><rect x="22" y="54" width="36" height="16" rx="3" fill="#f59e0b" opacity="0.3"/><rect x="22" y="54" width="36" height="7" rx="2" fill="#f59e0b" opacity="0.5"/><rect x="32" y="61" width="8" height="9" rx="2" fill="#f59e0b" opacity="0.7"/><rect x="44" y="61" width="9" height="6" rx="2" fill="#f59e0b" opacity="0.4"/></svg>}
    subtitle="Use Case"
    title="SpacioHub for Hotels & Hospitality"
    accentColor={AC}
    accentLight={AL}
    accentBorder={AB}
    desc="Deliver a five-star conference and event experience. From booking with catering tags to live door displays and professional guest check-in — SpacioHub handles every detail."
    hero_features={[
      { icon: IcoTag,     title: 'Catering & Setup Tags',  desc: 'Tag bookings with catering needs, room setup style, and AV requirements.' },
      { icon: IcoDisplay, title: 'Premium Door Displays',  desc: 'Full-screen displays outside every function room show live status and schedule.' },
      { icon: IcoGuest,   title: 'Guest Check-in Flow',    desc: 'Self-service kiosk with custom branded badges for a professional arrival experience.' },
      { icon: IcoBars,    title: 'Revenue Reporting',      desc: 'Track function room utilisation, peak periods, and booking patterns.' },
    ]}
    sections={[
      {
        tag: 'Event Booking',
        title: T('Every detail ', 'captured at booking'),
        desc: 'When event planners book a function room, they can add catering requirements, AV setup notes, room layout preferences, and special requests — all saved with the booking and visible to your operations team.',
        checks: [
          '<strong>Booking tags</strong> for catering, AV, layout, and custom needs',
          '<strong>Notes field</strong> for detailed setup instructions',
          '<strong>Attendee count</strong> captured for catering estimates',
          '<strong>Zoom integration</strong> for hybrid events',
          '<strong>Email confirmation</strong> to organiser with all details',
        ],
        visual: {
          bg: '#f8fafc',
          items: [
            { icon: IcoCatering, title: 'Ballroom A — Corporate Lunch',   sub: '50 guests · Catering: Buffet setup',   badge: 'Catering tag' },
            { icon: IcoAV,       title: 'Boardroom — Product Launch',     sub: '20 guests · AV: Full setup required',  badge: 'AV tag' },
            { icon: IcoChairs,   title: 'Event Suite — Workshop',         sub: '30 guests · Layout: U-shape',          badge: 'Setup tag' },
          ]
        }
      },
      {
        tag: 'Guest Experience',
        title: T('A professional ', 'arrival every time'),
        desc: 'Pre-register event attendees before they arrive. A self-service check-in kiosk handles arrival, prints branded badges, and instantly notifies the event host.',
        checks: [
          '<strong>Pre-registered guest list</strong> — upload or add individually',
          '<strong>Self-service kiosk</strong> — guests check in independently',
          '<strong>Custom branded badges</strong> with hotel or event logo',
          '<strong>Instant host notification</strong> when VIP guests arrive',
          '<strong>Visitor log</strong> for security and compliance',
        ],
        visual: {
          bg: '#fff7ed',
          items: [
            { icon: IcoBadge, title: 'Badge printed',               sub: 'James Wilson · Microsoft · Rm: Ballroom A' },
            { icon: IcoEmail, title: 'Event coordinator notified',   sub: 'Your first guest has arrived — Ballroom A' },
            { icon: IcoLog,   title: 'Visitor log updated',          sub: '12 of 50 guests checked in · 9:32 AM' },
          ]
        }
      }
    ]}
    testimonial={{ quote: "The combination of door displays and visitor badges completely transformed how our conference centre looks and feels to corporate clients.", name: "Events Manager", role: "4-star hotel, Dubai" }}
    related={[
      { title: 'Corporate Offices',  desc: 'Multi-floor room management with SSO.',        href: '/use-cases/corporate' },
      { title: 'Coworking Spaces',   desc: 'Member self-booking and utilisation tracking.', href: '/use-cases/coworking' },
      { title: 'SaaS Resellers',     desc: 'White-label SpacioHub for your clients.',       href: '/use-cases/resellers' },
    ]}
  />
    </>
  )
}
