import React from 'react'
import UseCasePage from './UseCasePage'

export default function Hotels() {
  return <UseCasePage
    icon="🏨"
    subtitle="Use Case"
    title="SpacioHub for Hotels & Hospitality"
    desc="Deliver a five-star conference and event experience. From booking with catering tags to live door displays and professional guest check-in — SpacioHub handles every detail."
    hero_features={[
      { icon: '🏷️', title: 'Catering & Setup Tags', desc: 'Tag bookings with catering needs, room setup style, and AV requirements.' },
      { icon: '🖥️', title: 'Premium Door Displays', desc: 'Full-screen displays outside every function room show live status and schedule.' },
      { icon: '👔', title: 'Guest Check-in Flow', desc: 'Self-service kiosk with custom branded badges for a professional arrival experience.' },
      { icon: '📊', title: 'Revenue Reporting', desc: 'Track function room utilisation, peak periods, and booking patterns.' },
    ]}
    sections={[
      {
        tag: 'Event Booking',
        title: 'Every detail captured at booking',
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
            { icon: '🍽️', title: 'Ballroom A — Corporate Lunch', sub: '50 guests · Catering: Buffet setup', badge: 'Catering tag' },
            { icon: '📽️', title: 'Boardroom — Product Launch', sub: '20 guests · AV: Full setup required', badge: 'AV tag' },
            { icon: '🪑', title: 'Event Suite — Workshop', sub: '30 guests · Layout: U-shape', badge: 'Setup tag' },
          ]
        }
      },
      {
        tag: 'Guest Experience',
        title: 'A professional arrival every time',
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
            { icon: '📛', title: 'Badge printed', sub: 'James Wilson · Microsoft · Rm: Ballroom A' },
            { icon: '📧', title: 'Event coordinator notified', sub: 'Your first guest has arrived — Ballroom A' },
            { icon: '📋', title: 'Visitor log updated', sub: '12 of 50 guests checked in · 9:32 AM' },
          ]
        }
      }
    ]}
    testimonial={{ quote: "The combination of door displays and visitor badges completely transformed how our conference centre looks and feels to corporate clients.", name: "Events Manager", role: "4-star hotel, Dubai" }}
    related={[
      { icon: '🏢', title: 'Corporate Offices', desc: 'Multi-floor room management with SSO.', href: '/use-cases/corporate' },
      { icon: '🤝', title: 'Coworking Spaces', desc: 'Member self-booking and utilisation tracking.', href: '/use-cases/coworking' },
      { icon: '🛒', title: 'SaaS Resellers', desc: 'White-label SpacioHub for your clients.', href: '/use-cases/resellers' },
    ]}
  />
}
