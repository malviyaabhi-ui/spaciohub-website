import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const KB_ARTICLES = [
  { id:1, category:'Getting Started', title:'What is SpacioHub?', body:'SpacioHub is a smart workspace management platform that helps teams book meeting rooms, manage visitors, and track space utilisation — all in one place.' },
  { id:2, category:'Getting Started', title:'Setting up your organisation', body:'Sign up at go.spaciohub.com, add your rooms under the Rooms section, invite your team from Admin Panel → Members, and optionally set up door displays on tablets outside each room.' },
  { id:3, category:'Getting Started', title:'Inviting team members', body:"Go to Admin Panel → Members tab → enter your colleague's email → click Invite. They'll receive a welcome email to create their account." },
  { id:4, category:'Getting Started', title:'Understanding your 14-day free trial', body:'Every new SpacioHub account starts with a 14-day free trial of the Max plan — full access to all features including Mira AI, visitor management, analytics, and Zoom integration.' },
  { id:5, category:'Getting Started', title:'Adding and configuring rooms', body:'Go to Rooms → Add Room. Fill in the room name, capacity, floor, amenities, and a colour. Active rooms appear immediately on the booking grid.' },
  { id:6, category:'Room Booking', title:'How to book a room', body:'4 ways: (1) Time Grid — click any empty slot. (2) + New Booking button. (3) Mira AI Booker — type in plain English. (4) Door Display — book from the tablet outside the room.' },
  { id:7, category:'Room Booking', title:'Week view vs Day view', body:'Toggle between Day and Week view in the top-right of the Book a Room page. Week view shows a full Mon–Sun grid with colour-coded booking chips.' },
  { id:8, category:'Room Booking', title:'Cancelling or editing a booking', body:'Go to My Bookings, find the booking, and click Cancel or Edit. You can also resend the confirmation email from the same screen.' },
  { id:9, category:'Room Booking', title:'Using Mira — AI Room Booker', body:'Go to AI Room Booker in the sidebar. Type your request — e.g. "Book Focus Room for 4 people on Friday at 10am". Mira checks availability and creates the booking directly with a confirmation email.' },
  { id:10, category:'Integrations', title:'Zoom integration — full setup guide',
    rich:[
      { type:'text', text:'Once connected, SpacioHub automatically creates a unique Zoom meeting for every new booking and includes the join link in the confirmation email.' },
      { type:'section', text:'Part 1 — Create a Zoom OAuth App' },
      { type:'steps', items:[
        'Go to <a href="https://marketplace.zoom.us" target="_blank" style="color:#3b82f6;font-weight:600;">marketplace.zoom.us</a> and sign in with your Zoom admin account.',
        'Click <strong>Develop → Build App</strong> in the top-right corner.',
        'Choose <strong>OAuth</strong> as the app type and click Create.',
        'Name it "SpacioHub", set it to <strong>Account-level app</strong>, disable "Publish on marketplace".',
        'Under <strong>Redirect URL for OAuth</strong>, enter the redirect URL from <strong>Admin Panel → Integrations → Zoom → Copy Redirect URL</strong>.',
        'Under <strong>Scopes</strong>, add: <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:12px;">meeting:write:admin</code> and <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:12px;">user:read:admin</code>',
        'Copy your <strong>Client ID</strong> and <strong>Client Secret</strong> from the App Credentials tab.',
      ]},
      { type:'section', text:'Part 2 — Connect in SpacioHub' },
      { type:'steps', items:[
        'Go to <strong>Admin Panel → Integrations → Zoom</strong>.',
        'Paste your <strong>Client ID</strong> and <strong>Client Secret</strong> and click Connect.',
        "You'll be redirected to Zoom — click <strong>Allow</strong> to authorise.",
      ]},
      { type:'success', text:'Every new booking will now auto-generate a Zoom meeting. The join link appears in the booking detail and confirmation email.' },
      { type:'warning', text:'Must be done by a Zoom account admin. Sub-account users cannot create OAuth apps.' },
      { type:'links', items:[
        { icon:'🔷', text:'Zoom App Marketplace', desc:'Create and manage your Zoom OAuth app', url:'https://marketplace.zoom.us' },
        { icon:'📖', text:'Zoom OAuth docs', desc:'Official Zoom OAuth 2.0 guide', url:'https://developers.zoom.us/docs/integrations/oauth/' },
      ]},
    ]
  },
  { id:11, category:'Integrations', title:'Google Calendar sync — full setup guide',
    rich:[
      { type:'text', text:'Google Calendar sync adds your SpacioHub booking as a calendar event automatically — including room name, time, attendees, and Zoom link if applicable.' },
      { type:'section', text:'For individual users (simplest)' },
      { type:'steps', items:[
        'When creating a booking, tick <strong>Google Calendar</strong> under Sync to Calendars.',
        'On first use, a Google sign-in popup appears — sign in and click <strong>Allow</strong>.',
        'The booking is added to your calendar instantly. Future bookings sync automatically.',
      ]},
      { type:'section', text:'For Google Workspace admins (org-wide)' },
      { type:'steps', items:[
        'Go to <a href="https://console.cloud.google.com" target="_blank" style="color:#3b82f6;font-weight:600;">console.cloud.google.com</a> → create a project → enable <strong>Google Calendar API</strong>.',
        'Go to <strong>OAuth consent screen</strong> → Internal → fill in app name "SpacioHub".',
        'Create an <strong>OAuth Client ID</strong> (Web application) and add the redirect URI from <strong>Admin Panel → Integrations → Google → Copy Redirect URL</strong>.',
        'Copy Client ID and Secret → paste into SpacioHub Admin Panel → Integrations → Google.',
      ]},
      { type:'warning', text:'Cancelling a booking in SpacioHub does NOT auto-delete the Google Calendar event — remove it manually.' },
      { type:'links', items:[
        { icon:'🔷', text:'Google Cloud Console', desc:'Create OAuth credentials for your org', url:'https://console.cloud.google.com' },
        { icon:'📖', text:'Google Calendar API docs', desc:'Official API reference', url:'https://developers.google.com/calendar/api/guides/overview' },
      ]},
    ]
  },
  { id:12, category:'Integrations', title:'Microsoft Outlook and Teams — full setup guide',
    rich:[
      { type:'text', text:'Sync bookings to Outlook Calendar and optionally create Microsoft Teams meetings (Enterprise plan).' },
      { type:'section', text:'Part 1 — Register app in Azure AD (admin required)' },
      { type:'steps', items:[
        'Sign in to <a href="https://portal.azure.com" target="_blank" style="color:#3b82f6;font-weight:600;">portal.azure.com</a> with your Microsoft 365 admin account.',
        'Go to <strong>Azure Active Directory → App registrations → New registration</strong>.',
        'Name it "SpacioHub" → Supported account types: "This org only" → add the Redirect URI from <strong>Admin Panel → Integrations → Microsoft → Copy Redirect URL</strong>.',
        'Click Register. Copy the <strong>Application (client) ID</strong> and <strong>Directory (tenant) ID</strong>.',
        'Go to <strong>Certificates and secrets → New client secret</strong> → copy the value immediately (shown once only).',
        'Go to <strong>API permissions → Add → Microsoft Graph</strong> → add <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:12px;">Calendars.ReadWrite</code> → click <strong>Grant admin consent</strong>.',
      ]},
      { type:'section', text:'Part 2 — Connect in SpacioHub' },
      { type:'steps', items:[
        'Go to <strong>Admin Panel → Integrations → Microsoft 365</strong>.',
        'Enter your Tenant ID, Client ID, and Client Secret → click Connect.',
        "Authorise on Microsoft's page. Users can now tick Outlook Calendar when booking.",
      ]},
      { type:'note', text:'For Teams meeting auto-creation, contact contact@spaciohub.com — requires Enterprise plan.' },
      { type:'warning', text:'Must be done by a Microsoft 365 Global Administrator or Application Administrator.' },
      { type:'links', items:[
        { icon:'🔷', text:'Azure Portal', desc:'Register your SpacioHub app', url:'https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade' },
        { icon:'📖', text:'Microsoft Graph Calendar API', desc:'Official Calendar API reference', url:'https://learn.microsoft.com/en-us/graph/api/resources/calendar' },
      ]},
    ]
  },
  { id:13, category:'Door Display', title:'Setting up the door display', body:'Open go.spaciohub.com/DoorDisplay on any tablet. Tap the gear icon → enter your admin PIN → select the room → Save. Enable fullscreen and disable auto-sleep for best results.' },
  { id:14, category:'Door Display', title:'Check-in and extending meetings', body:'When a meeting is active, tap "Check In" to confirm attendance. Tap "+15 min" or "+30 min" to extend. If no one checks in within the grace period, the room is auto-released.' },
  { id:15, category:'Analytics', title:'Reading the utilisation report', body:'Go to Analytics to see utilisation by room and by floor. Click any floor to expand the per-room breakdown. Use the date range filter (7, 14, 30, 90 days) to analyse trends.' },
  { id:16, category:'Plans and Billing', title:'SpacioHub plans and pricing',
    rich:[
      { type:'text', text:'SpacioHub has 4 plans. All plans include a 14-day free trial with no credit card required.' },
      { type:'section', text:'Basic — $30/year' },
      { type:'text', text:'2 rooms, 5 users, 1 door display. Includes core booking, iCal feed, email alerts, and basic analytics. Best for small teams just getting started.' },
      { type:'section', text:'Pro — $4.99/month (billed annually) or $8/month' },
      { type:'text', text:'5 rooms (+ add-ons), 25 users. Adds visitor management, Google Calendar, Microsoft 365, Zoom meeting links, advanced analytics, floor plans, and no-show tracking.' },
      { type:'section', text:'Max — $8.99/month (billed annually) or $15/month' },
      { type:'text', text:'Unlimited rooms, unlimited users. Everything in Pro plus AI Room Booker (Mira), MS Teams links, Google SSO, Microsoft SSO, CSV export, and white-label branding.' },
      { type:'section', text:'Enterprise — Custom pricing' },
      { type:'text', text:'Unlimited rooms and users. Everything in Max plus custom domain, custom reports, SAML SSO, dedicated support, and SLA. Contact us for a quote.' },
      { type:'links', items:[
        { icon:'💳', text:'See full pricing and compare plans', desc:'spaciohub.com/pricing', url:'/pricing' },
      ]},
    ]
  },
  { id:17, category:'Troubleshooting', title:"I can't sign in", body:'Try: (1) Click "Forgot password?" — a reset link will be emailed. (2) Use the same Google/Microsoft account you signed up with. (3) Try incognito mode. Still stuck? Email contact@spaciohub.com.' },
  { id:18, category:'Troubleshooting', title:'Not receiving confirmation emails', body:'Check spam — emails come from contact@spaciohub.com. Add to safe senders. Resend from My Bookings → find the booking → Resend.' },
]

const FAQS = [
  { q:'What is SpacioHub?', a:'A smart workspace platform for booking meeting rooms, managing visitors, and tracking space usage.' },
  { q:'Is there a free trial?', a:'Yes — 14 days free, full access, no credit card required.' },
  { q:'How does pricing work?', a:'Basic $30/year (2 rooms, 5 users) · Pro $4.99/month annual (5 rooms, 25 users) · Max $8.99/month annual (unlimited) · Enterprise custom. Annual billing saves ~40%.' },
  { q:'What is Mira?', a:"Mira is SpacioHub's AI booking assistant. Tell her what you need — Book a room for 6 tomorrow at 2pm — and she'll create the booking." },
  { q:'How do I set up Zoom?', a:'Admin Panel → Integrations → Zoom → Connect. See the full Zoom guide in the Integrations section.' },
  { q:'Does it sync with Google Calendar?', a:'Yes — tick "Google Calendar" when booking. Full setup in the Integrations section.' },
  { q:'Does it work with Outlook/Teams?', a:'Yes — tick "Outlook Calendar" when booking. Teams meeting creation on Enterprise plan.' },
  { q:'Can I book from my phone?', a:'Yes — works on any mobile browser. iOS and Android apps also available.' },
  { q:'How does the door display work?', a:'Open go.spaciohub.com/DoorDisplay on any tablet, pair it to a room, shows live availability and lets people book or check in.' },
  { q:'How do I contact support?', a:'Use the chat widget, WhatsApp +971585889306, or email contact@spaciohub.com.' },
]

const CAT_ICONS = {
  'Getting Started':'🚀', 'Room Booking':'📅', 'Integrations':'🔗',
  'Door Display':'🚪', 'Analytics':'📊', 'Plans and Billing':'💳', 'Troubleshooting':'🔧',
}

const ACCENT = '#00c07a'

function RichBody({ content }) {
  if (typeof content === 'string') return <p style={{ fontSize:14, color:'#374151', lineHeight:1.7, margin:0 }}>{content}</p>
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {content.map((block, i) => {
        if (block.type === 'text') return <p key={i} style={{ fontSize:14, color:'#374151', lineHeight:1.7, margin:0 }}>{block.text}</p>
        if (block.type === 'section') return <div key={i} style={{ fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.07em', paddingBottom:8, borderBottom:'1px solid #f1f5f9', marginTop:4 }}>{block.text}</div>
        if (block.type === 'steps') return (
          <div key={i} style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {block.items.map((step, j) => (
              <div key={j} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:24, height:24, borderRadius:'50%', background:ACCENT, color:'#fff', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>{j+1}</div>
                <div style={{ flex:1, fontSize:14, color:'#374151', lineHeight:1.65, paddingTop:2 }} dangerouslySetInnerHTML={{ __html:step }} />
              </div>
            ))}
          </div>
        )
        if (block.type === 'note')    return <div key={i} style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, padding:'12px 14px', fontSize:13, color:'#15803d', lineHeight:1.6 }}><strong>💡 Note:</strong> {block.text}</div>
        if (block.type === 'warning') return <div key={i} style={{ background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:10, padding:'12px 14px', fontSize:13, color:'#c2410c', lineHeight:1.6 }}><strong>⚠️ Important:</strong> {block.text}</div>
        if (block.type === 'success') return <div key={i} style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, padding:'12px 14px', fontSize:13, color:'#15803d', lineHeight:1.6 }}><strong>✅ Result:</strong> {block.text}</div>
        if (block.type === 'links')   return (
          <div key={i} style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {block.items.map((lnk, j) => (
              <a key={j} href={lnk.url} target="_blank" rel="noopener noreferrer"
                style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:10, textDecoration:'none', transition:'all 0.15s' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='#ecfdf5'; e.currentTarget.style.borderColor='#a7f3d0' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='#f8fafc'; e.currentTarget.style.borderColor='#e2e8f0' }}>
                <span style={{ fontSize:18 }}>{lnk.icon || '🔗'}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, color:'#111827', fontSize:13 }}>{lnk.text}</div>
                  {lnk.desc && <div style={{ color:'#6b7280', fontSize:12, marginTop:1 }}>{lnk.desc}</div>}
                </div>
                <span style={{ color:'#9ca3af', fontSize:13 }}>↗</span>
              </a>
            ))}
          </div>
        )
        return null
      })}
    </div>
  )
}

function ArticleModal({ article, onClose }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', padding:16 }} onClick={onClose}>
      <div style={{ background:'#fff', borderRadius:20, boxShadow:'0 20px 60px rgba(0,0,0,0.2)', width:'100%', maxWidth:680, maxHeight:'88vh', overflowY:'auto', fontFamily:'Inter,sans-serif' }} onClick={e=>e.stopPropagation()}>
        <div style={{ position:'sticky', top:0, background:'#fff', borderBottom:'1px solid #f1f5f9', padding:'20px 24px', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, borderRadius:'20px 20px 0 0' }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:ACCENT, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:4 }}>{article.category}</div>
            <h2 style={{ fontSize:18, fontWeight:700, color:'#111827', margin:0 }}>{article.title}</h2>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:20, color:'#9ca3af', cursor:'pointer', padding:0, marginTop:2 }}>✕</button>
        </div>
        <div style={{ padding:24 }}>
          <RichBody content={article.rich || article.body} />
          <div style={{ marginTop:24, padding:'14px 16px', background:'#ecfdf5', borderRadius:12, fontSize:13, color:'#065f46' }}>
            Still need help? Email <a href="mailto:contact@spaciohub.com" style={{ color:'#065f46', fontWeight:600 }}>contact@spaciohub.com</a> or <a href="https://wa.me/971585889306" target="_blank" rel="noreferrer" style={{ color:'#065f46', fontWeight:600 }}>WhatsApp us</a>.
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HelpCentre() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  const categories = ['All', ...Object.keys(CAT_ICONS)]

  const filtered = KB_ARTICLES.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory
    const q = search.toLowerCase()
    const matchSearch = !search || a.title.toLowerCase().includes(q) || (a.body||'').toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <>
      <SEO title="Help Centre — SpacioHub Knowledge Base" description="Find answers to all your SpacioHub questions. Guides, setup instructions, integrations, and troubleshooting." path="/help" />
      <main style={{ paddingTop:64, fontFamily:'Inter,sans-serif' }}>

        {/* Hero — branded gradient like the app */}
        <section style={{ background:'linear-gradient(135deg,#0d2b6b 0%,#0a7a8a 60%,#00c07a 100%)', padding:'72px 0 56px', textAlign:'center' }}>
          <div className="container">
            <h1 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:800, color:'#fff', marginBottom:12, letterSpacing:-1 }}>Help Centre</h1>
            <p style={{ color:'rgba(255,255,255,0.8)', marginBottom:32, fontSize:16 }}>Guides, integrations, and answers to common questions</p>
            {/* Search */}
            <div style={{ maxWidth:520, margin:'0 auto', position:'relative' }}>
              <div style={{ display:'flex', alignItems:'center', background:'rgba(255,255,255,0.12)', backdropFilter:'blur(8px)', border:'1.5px solid rgba(255,255,255,0.25)', borderRadius:12, padding:'13px 18px', gap:10 }}>
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none"><circle cx="9" cy="9" r="6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/><path d="M15 15l3 3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <input value={search} onChange={e=>{ setSearch(e.target.value); setActiveCategory('All') }}
                  placeholder="Search articles... e.g. Zoom setup, booking a room"
                  style={{ flex:1, border:'none', outline:'none', fontSize:14, color:'#fff', fontFamily:'Inter,sans-serif', background:'transparent' }}
                />
                {search && <button onClick={()=>setSearch('')} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.6)', fontSize:18, lineHeight:1 }}>×</button>}
              </div>
            </div>
          </div>
        </section>

        {/* Category pills */}
        <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'16px 0', position:'sticky', top:64, zIndex:100 }}>
          <div className="container" style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={()=>setActiveCategory(cat)}
                style={{ padding:'6px 16px', borderRadius:20, border:`1px solid ${activeCategory===cat ? ACCENT : '#e2e8f0'}`, background:activeCategory===cat ? ACCENT : '#fff', color:activeCategory===cat ? '#fff' : '#374151', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.15s', whiteSpace:'nowrap' }}>
                {cat !== 'All' && CAT_ICONS[cat]+' '}{cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <section style={{ padding:'48px 0', background:'#f8fafc', minHeight:500 }}>
          <div className="container">

            {(search || activeCategory !== 'All') ? (
              /* Filtered view — flat grid */
              <>
                <p style={{ fontSize:13, color:'#94a3b8', marginBottom:16 }}>{filtered.length} article{filtered.length !== 1 ? 's' : ''} found</p>
                {filtered.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'60px 0', color:'#94a3b8' }}>
                    <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
                    <p style={{ fontSize:15 }}>No articles found for "{search}"</p>
                    <Link to="/contact" style={{ color:ACCENT, fontWeight:600, textDecoration:'none', fontSize:14 }}>Contact support →</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {filtered.map(a => (
                      <button key={a.id} onClick={()=>setSelectedArticle(a)}
                        style={{ textAlign:'left', padding:16, background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.2s' }}
                        onMouseEnter={e=>{ e.currentTarget.style.borderColor=ACCENT; e.currentTarget.style.boxShadow='0 4px 12px rgba(0,192,122,0.12)' }}
                        onMouseLeave={e=>{ e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none' }}>
                        <div style={{ fontSize:11, fontWeight:700, color:ACCENT, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>{CAT_ICONS[a.category]} {a.category}</div>
                        <div style={{ fontSize:14, fontWeight:600, color:'#111827', marginBottom:4 }}>{a.title}</div>
                        <div style={{ fontSize:12, color:'#6b7280', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{a.body || 'Click to read →'}</div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Default view — grouped by category */
              <>
                {Object.keys(CAT_ICONS).map(cat => {
                  const items = KB_ARTICLES.filter(a => a.category === cat)
                  return (
                    <div key={cat} style={{ marginBottom:40 }}>
                      <h2 style={{ fontSize:16, fontWeight:700, color:'#0f172a', display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                        <span>{CAT_ICONS[cat]}</span> {cat}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {items.map(a => (
                          <button key={a.id} onClick={()=>setSelectedArticle(a)}
                            style={{ textAlign:'left', padding:'14px 16px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.2s' }}
                            onMouseEnter={e=>{ e.currentTarget.style.borderColor=ACCENT; e.currentTarget.style.boxShadow='0 4px 12px rgba(0,192,122,0.12)' }}
                            onMouseLeave={e=>{ e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none' }}>
                            <div style={{ fontSize:13, fontWeight:600, color:'#111827', marginBottom:3 }}>{a.title}</div>
                            <div style={{ fontSize:12, color:'#6b7280', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{a.body || 'Click to read →'}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {/* FAQs */}
                <div style={{ marginTop:16 }}>
                  <h2 style={{ fontSize:16, fontWeight:700, color:'#0f172a', marginBottom:14 }}>❓ Frequently Asked Questions</h2>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {FAQS.map((faq, i) => (
                      <div key={i} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden' }}>
                        <button onClick={()=>setOpenFaq(openFaq===i ? null : i)}
                          style={{ width:'100%', textAlign:'left', padding:'14px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, background:'none', border:'none', cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
                          <span style={{ fontSize:14, fontWeight:600, color:'#111827' }}>{faq.q}</span>
                          <span style={{ fontSize:18, color:ACCENT, flexShrink:0 }}>{openFaq===i ? '−' : '+'}</span>
                        </button>
                        {openFaq===i && (
                          <div style={{ padding:'0 18px 14px', fontSize:13, color:'#374151', lineHeight:1.65, borderTop:'1px solid #f1f5f9' }}>
                            <div style={{ paddingTop:12 }}>{faq.a}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div style={{ marginTop:48, background:'linear-gradient(135deg,#0f172a,#1e293b)', borderRadius:20, padding:40, textAlign:'center' }}>
                  <h3 style={{ fontSize:20, fontWeight:700, color:'#fff', marginBottom:8 }}>Still need help?</h3>
                  <p style={{ fontSize:14, color:'#94a3b8', marginBottom:24 }}>Can't find what you're looking for? Our team replies within a few hours.</p>
                  <Link to="/contact" className="btn btn-primary">Contact support →</Link>
                </div>

                <p style={{ textAlign:'center', fontSize:12, color:'#94a3b8', marginTop:32 }}>
                  SpacioHub Help Centre · <a href="mailto:contact@spaciohub.com" style={{ color:ACCENT }}>contact@spaciohub.com</a>
                </p>
              </>
            )}
          </div>
        </section>
      </main>

      {selectedArticle && <ArticleModal article={selectedArticle} onClose={()=>setSelectedArticle(null)} />}
    </>
  )
}
