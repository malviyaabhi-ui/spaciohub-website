import React from 'react'
import UseCasePage from './UseCasePage'

export default function Coworking() {
  return <UseCasePage
    icon="🤝"
    subtitle="Use Case"
    title="SpacioHub for Coworking Spaces"
    desc="Give your members a seamless self-service booking experience. Track utilisation to maximise revenue per square metre, and manage guest access without extra admin overhead."
    hero_features={[
      { icon: '🚪', title: 'Member Self-Service', desc: 'Members book rooms 24/7 without contacting your team.' },
      { icon: '📊', title: 'Revenue Analytics', desc: 'See which rooms generate most bookings and peak hours.' },
      { icon: '👤', title: 'Guest Access', desc: 'Non-members book via guest booking without creating an account.' },
      { icon: '🖥️', title: 'Door Displays', desc: 'Tablets outside every room show live status and allow quick booking.' },
    ]}
    sections={[
      {
        tag: 'Member Booking',
        title: 'Self-service that actually works',
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
            { icon: '🏠', title: 'Hot Desk A4 — Available', sub: '4-person pod · Ground floor', badge: 'Book' },
            { icon: '🎯', title: 'Creative Studio — Booked', sub: '10 seats · Until 3PM · Emily K.' },
            { icon: '📞', title: 'Phone Booth 2 — Available', sub: '1 person · Soundproofed', badge: 'Book' },
          ]
        }
      },
      {
        tag: 'Space Analytics',
        title: 'Know your space, grow your revenue',
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
            { icon: '📈', title: 'Creative Studio', sub: '94% utilisation this week', badge: 'High demand' },
            { icon: '📉', title: 'Quiet Room B', sub: '23% utilisation this week', badge: 'Underused' },
            { icon: '⏰', title: 'Peak hours: 10AM–2PM', sub: '68% of all bookings in this window' },
          ]
        }
      },
    ]}
    testimonial={{ quote: "Our members love the door displays. It's the first thing visitors notice when they walk in — it makes the whole space feel professional and high-tech.", name: "Community Manager", role: "Coworking space, 45 desks" }}
    related={[
      { icon: '🏢', title: 'Corporate Offices', desc: 'Multi-floor room management with SSO.', href: '/use-cases/corporate' },
      { icon: '🏨', title: 'Hotels & Hospitality', desc: 'Conference booking with five-star guest experience.', href: '/use-cases/hotels' },
      { icon: '🛒', title: 'SaaS Resellers', desc: 'White-label SpacioHub for your clients.', href: '/use-cases/resellers' },
    ]}
  />
}
