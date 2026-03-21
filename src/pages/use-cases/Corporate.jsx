import React from 'react'
import UseCasePage from './UseCasePage'

export default function Corporate() {
  return <UseCasePage
    icon="🏢"
    subtitle="Use Case"
    title="SpacioHub for Corporate Offices"
    desc="Manage meeting rooms, hot desks, and visitor flow across multiple floors and buildings. With Google and Microsoft SSO, employees sign in with existing credentials — no new accounts needed."
    hero_features={[
      { icon: '🔑', title: 'Single Sign-On (SSO)', desc: 'Google and Microsoft SSO so employees use existing credentials.' },
      { icon: '🗺️', title: 'Interactive Floor Plans', desc: 'Visual floor map so employees find and book the right room instantly.' },
      { icon: '📊', title: 'Space Utilisation Reports', desc: 'See which rooms are over- and under-used to optimise your office layout.' },
      { icon: '👥', title: 'Role-based Access', desc: 'Admins, members, and guests — each with the right level of access.' },
    ]}
    sections={[
      {
        tag: 'Booking',
        title: 'Stop the double-booking chaos',
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
            { icon: '📅', title: 'Board Room — Booked', sub: '10:00 AM – 11:00 AM · Sarah J.', badge: 'Confirmed' },
            { icon: '📅', title: 'Focus Room — Available', sub: 'Next: 2:00 PM · No buffer conflict' },
            { icon: '🎥', title: 'Conference Room — Zoom ready', sub: 'Link auto-generated', badge: 'Zoom' },
          ]
        }
      },
      {
        tag: 'Door Display',
        title: 'Smart panels on every room',
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
            { icon: '🟢', title: 'Conference Room', sub: 'Available · Next: Team Standup 2PM', badge: 'Available' },
            { icon: '🔴', title: 'Board Room', sub: 'In Use: Leadership Review · Until 11:30', badge: 'In Use' },
            { icon: '🟡', title: 'Focus Room', sub: 'Starting soon: Design Review · 11:45', badge: 'Soon' },
          ]
        }
      },
      {
        tag: 'Visitor Management',
        title: 'Professional guest experience',
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
            { icon: '👤', title: 'John Smith — Visitor', sub: 'Visiting: Sarah Johnson · 10:00 AM', badge: 'Checked in' },
            { icon: '📛', title: 'Badge printed', sub: 'Acme Corp · Floor 3 · Expires 6PM' },
            { icon: '📧', title: 'Host notified', sub: 'sarah@company.com — Your visitor has arrived' },
          ]
        }
      }
    ]}
    testimonial={{ quote: "SpacioHub cut our room booking conflicts by 80% in the first month. The door displays alone were worth it — people actually check in now.", name: "Operations Manager", role: "250-person tech company" }}
    related={[
      { icon: '🤝', title: 'Coworking Spaces', desc: 'Member self-booking and utilisation tracking.', href: '/use-cases/coworking' },
      { icon: '🏨', title: 'Hotels & Hospitality', desc: 'Conference booking with catering tags.', href: '/use-cases/hotels' },
      { icon: '🛒', title: 'SaaS Resellers', desc: 'White-label for your clients.', href: '/use-cases/resellers' },
    ]}
  />
}
