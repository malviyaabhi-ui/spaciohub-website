import React from 'react'
import UseCasePage from './UseCasePage'

export default function Resellers() {
  return <UseCasePage
    icon="🛒"
    subtitle="Use Case"
    title="SpacioHub for SaaS Resellers"
    desc="White-label SpacioHub for your clients. Each organisation gets their own workspace, branding, and subdomain. You manage everything from one super admin dashboard — and keep the margin."
    hero_features={[
      { icon: '🏷️', title: 'White-label Branding', desc: 'Your logo, your colours, your domain. Clients never see SpacioHub.' },
      { icon: '🔑', title: 'Super Admin Dashboard', desc: 'Manage all client organisations, plans, and licenses from one place.' },
      { icon: '💰', title: 'Your Pricing', desc: 'Set your own pricing for each client. SpacioHub charges you wholesale.' },
      { icon: '🌐', title: 'Custom Domains', desc: 'Each client gets their own subdomain or custom domain.' },
    ]}
    sections={[
      {
        tag: 'Multi-tenant Architecture',
        title: 'One platform, unlimited clients',
        desc: 'SpacioHub is built multi-tenant from the ground up. Every client organisation is completely isolated — separate data, separate rooms, separate users, separate analytics. Add new clients in seconds.',
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
            { icon: '🏢', title: 'Acme Corp', sub: 'Max plan · 12 rooms · 45 users', badge: 'Active' },
            { icon: '🤝', title: 'StartupHub', sub: 'Pro plan · 8 rooms · 30 users', badge: 'Active' },
            { icon: '🏨', title: 'Grand Hotel', sub: 'Enterprise · Unlimited · Custom domain', badge: 'Enterprise' },
          ]
        }
      },
      {
        tag: 'Super Admin',
        title: 'Full control from one dashboard',
        desc: 'Your super admin dashboard gives you a bird\'s-eye view of all clients — MRR, plan status, room counts, user counts, and the ability to change plans, suspend, or generate license keys in one click.',
        checks: [
          '<strong>MRR and ARR overview</strong> across all clients',
          '<strong>Plan management</strong> — upgrade, downgrade, suspend any client',
          '<strong>License key generation</strong> for enterprise clients',
          '<strong>Impersonate any client</strong> to see their view and troubleshoot',
          '<strong>Usage analytics</strong> across your entire client base',
        ],
        visual: {
          bg: '#f0fdf8',
          items: [
            { icon: '💰', title: 'MRR: $2,840', sub: 'ARR: $34,080 · 8 active clients' },
            { icon: '📊', title: 'Plan breakdown', sub: '3× Max · 4× Pro · 1× Enterprise' },
            { icon: '🔑', title: 'License key generated', sub: 'SPH-ACME-CORP-X7K9 · Expires 2027' },
          ]
        }
      }
    ]}
    testimonial={{ quote: "We resell SpacioHub to our facility management clients at a 3x markup. The super admin dashboard makes it effortless to manage 12 clients simultaneously.", name: "Director", role: "Facility management software company" }}
    related={[
      { icon: '🏢', title: 'Corporate Offices', desc: 'Multi-floor room management with SSO.', href: '/use-cases/corporate' },
      { icon: '🤝', title: 'Coworking Spaces', desc: 'Member self-booking and revenue analytics.', href: '/use-cases/coworking' },
      { icon: '🏨', title: 'Hotels & Hospitality', desc: 'Conference booking with catering tags.', href: '/use-cases/hotels' },
    ]}
  />
}
