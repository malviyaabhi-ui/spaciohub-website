// Centralised SEO config for every page
// Import SEO component and spread these as props: <SEO {...PAGE_SEO.home} />

export const PAGE_SEO = {

  home: {
    title: 'Smart Workspace Management Software',
    description: 'SpacioHub makes room booking effortless. Visual time grid, AI booker, door displays, visitor management and analytics — all in one platform. Free 14-day trial.',
    path: '/',
  },

  pricing: {
    title: 'Pricing — Simple, Transparent Plans',
    description: 'Start free. Scale as you grow. SpacioHub offers Starter, Pro, Max and Enterprise plans with no hidden fees. 14-day free trial, no credit card required.',
    path: '/pricing',
  },

  roles: {
    title: 'Who SpacioHub Is For',
    description: 'SpacioHub works for office managers, IT teams, facility managers, and employees. See how every role benefits from smarter workspace management.',
    path: '/roles',
  },

  // Platform pages
  platformBooking: {
    title: 'Room Booking System — Visual Grid & Smart Scheduling',
    description: 'Book meeting rooms in seconds with SpacioHub\'s visual time grid. AI suggestions, Zoom auto-links, approval workflows, conflict prevention and no-show auto-release.',
    path: '/platform/booking',
  },

  platformVisitors: {
    title: 'Visitor Management — Check-in, Kiosk & Badges',
    description: 'Welcome visitors professionally with SpacioHub. Self-service iPad kiosk, pre-registration, visitor badges, host notifications and full audit logs.',
    path: '/platform/visitors',
  },

  platformDoorDisplay: {
    title: 'Door Display Panels — Live Room Status on Any Tablet',
    description: 'Mount any iPad or Android tablet outside your meeting rooms. Live colour-coded status, no-login booking, guest access and PIN-protected admin settings.',
    path: '/platform/door-display',
  },

  platformSignage: {
    title: 'Digital Signage — Every Screen, One Dashboard',
    description: 'Design slides in the Canvas Editor, build playlists, schedule them across every screen in your building, and push emergency alerts with one click. Scrolling ticker layer and Media Library included. No hardware box — runs on any smart TV, Fire stick or tablet.',
    path: '/platform/signage',
  },

  platformAnalytics: {
    title: 'Space Analytics — Utilisation Insights & Reports',
    description: 'See exactly how your spaces are used. Room utilisation rates, peak hour heatmaps, no-show tracking, tag breakdowns and CSV export. Make data-driven decisions.',
    path: '/platform/analytics',
  },

  platformAIBooker: {
    title: 'AI Room Booker — Book Meeting Rooms in Plain Language',
    description: 'Describe what you need and SpacioHub\'s AI finds and books the best available room instantly. No browsing, no conflicts, no guesswork.',
    path: '/platform/ai-booker',
  },

  platformIntegrations: {
    title: 'Integrations — Google, Microsoft, Zoom, SSO and More',
    description: 'SpacioHub connects with Google Calendar, Microsoft 365, Outlook, Zoom, MS Teams, Google SSO, Azure AD and iCal. All integrations included on Pro and above.',
    path: '/platform/integrations',
  },

  // Use case pages
  useCaseCorporate: {
    title: 'Meeting Room Booking for Corporate Offices',
    description: 'SpacioHub helps corporate teams eliminate double bookings, reduce ghost meetings and optimise space utilisation. Integrates with Microsoft 365 and Google Workspace.',
    path: '/use-cases/corporate',
  },

  useCaseCoworking: {
    title: 'Room Booking Software for Coworking Spaces',
    description: 'Manage multiple members, spaces and organisations with SpacioHub. White-label, multi-org dashboard and guest booking — built for coworking operators.',
    path: '/use-cases/coworking',
  },

  useCaseHotels: {
    title: 'Meeting Room Management for Hotels & Venues',
    description: 'SpacioHub helps hotels and venues manage meeting rooms, event spaces and guest bookings. Door displays, visitor check-in and analytics included.',
    path: '/use-cases/hotels',
  },

  useCaseResellers: {
    title: 'White-Label Workspace Management for Resellers',
    description: 'Resell SpacioHub under your own brand. White-label, multi-tenant, custom domains and a super admin dashboard to manage all your clients from one place.',
    path: '/use-cases/resellers',
  },
}
